import { NextFunction, Request, Response } from "express";
import { RequestExtended } from "../middleware/verifyAuth";
import {
  PaymentSchema,
  Payment,
  PaymentRegisterSchema,
  PaymentCancelSchema,
} from "../../shared/zodSchemas";
import {
  paymentProcessing,
  paymentSucceeded,
  paymentFailed,
} from "../utils/emails";
import { AppError, AppErrorName } from "../utils/AppError";
import prisma from "../prisma/client";
import cron from "node-cron";
import Stripe from "stripe";
import { env } from "process";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// TODO
// Ensure 2 day payment lag-time -> hold money for 2 days until after the event passed
export const createPaymentIntent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.body.userId;
  const parsedPaymentData = PaymentRegisterSchema.parse(req.body);

  const newPayment = await prisma.$transaction(async (prisma) => {
    try {
      // pull event from db
      const event = await prisma.event.findUnique({
        where: {
          id: parsedPaymentData.eventId,
        },
      });

      // check if event exists
      if (!event) {
        throw new AppError(
          AppErrorName.NOT_FOUND_ERROR,
          "Event not found",
          404,
          true,
        );
      }

      // check if event is paid -> throws error if not
      if (!event.isPaid) {
        throw new AppError(
          AppErrorName.EVENT_NOT_PAID_ERROR,
          "Event is already paid",
          400,
          true,
        );
      }

      // check if event price is set and not null or undefined or negative or 0
      if (
        event.price === null ||
        event.price === undefined ||
        event.price === 0
      ) {
        throw new AppError(
          AppErrorName.INVALID_INPUT_ERROR,
          "Event price is not set",
          400,
          true,
        );
      }

      // increment date of collection by 2 days
      // after the event
      let paymentDate = new Date(event.startTime.getDate());
      paymentDate.setDate(paymentDate.getDate() + 2);

      // create payment in db
      const newPayment = await prisma.payment.create({
        data: {
          userId: userId,
          eventId: event.id,
          paymentIntentId: "",
          paymentDate: paymentDate,
          amount: event.price,
          currency: "cad",
          status: "pending",
        },
      });

      return newPayment;
    } catch (error) {
      next(error);
    }
  });

  res.status(201).json(newPayment);
};

export const verifyPayment = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const { paymentIntentId } = req.body;

  try {
    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.retrieve(paymentIntentId);

    res.status(200).json(paymentIntent.status);
  } catch (error) {
    next(error);
  }
};

export const cancelPayment = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const paymentId = PaymentCancelSchema.parse(req.body).id;

  const cancelledPayment = await prisma.$transaction(async (prisma) => {
    try {
      const payment = await prisma.payment.findUnique({
        where: {
          id: paymentId,
          paymentIntentId: "",
        },
      });

      if (!payment) {
        throw new AppError(
          AppErrorName.NOT_FOUND_ERROR,
          "Payment not found",
          404,
          true,
        );
      }

      // check if payment is already cancelled
      if (payment.status === "cancelled") {
        throw new AppError(
          AppErrorName.INVALID_INPUT_ERROR,
          "Payment is already cancelled",
          400,
          true,
        );
      }

      // check if payment is already succeeded
      if (payment.status === "succeeded") {
        throw new AppError(
          AppErrorName.INVALID_INPUT_ERROR,
          "Payment is already succeeded",
          400,
          true,
        );
      }

      // check if current date is after event date
      const currentDate = new Date();
      const event = await prisma.event.findUnique({
        where: {
          id: payment.eventId,
        },
      });

      if (event === null) {
        throw new AppError(
          AppErrorName.NOT_FOUND_ERROR,
          "Event not found",
          404,
          true,
        );
      } else {
        if (currentDate > event.startTime) {
          throw new AppError(
            AppErrorName.INVALID_INPUT_ERROR,
            "Event already passed",
            400,
            true,
          );
        }

        // cancel payment
        const cancelledPayment = await prisma.payment.update({
          where: {
            id: paymentId,
          },
          data: {
            status: "cancelled",
          },
        });

        return cancelledPayment;
      }
    } catch (error) {
      next(error);
    }

    res.status(200).json(cancelledPayment);
  });
};

export const paymentProcessor = cron.schedule("0 0 * * *", async () => {
  try {
    const pendingPayments = await prisma.payment.findMany({
      where: {
        status: "pending",
      },
    });

    for (const pendingPayment of pendingPayments) {
      // filter pendingPayments to only those that are 2 days after the event
      if (new Date().getDate() === pendingPayment.paymentDate.getDate()) {
        const paymentIntent: Stripe.PaymentIntent =
          await stripe.paymentIntents.create({
            amount: pendingPayment.amount * 100, // convert to cents
            currency: pendingPayment.currency,
            payment_method_types: ["card"],
            capture_method: "automatic",
            metadata: {
              paymentId: pendingPayment.id,
            },
          });

        await prisma.payment.update({
          where: {
            id: pendingPayment.id,
          },
          data: {
            paymentIntentId: paymentIntent.id,
          },
        });
      }
    }
  } catch (error) {
    throw new AppError(
      AppErrorName.INTERNAL_SERVER_ERROR,
      `Payment processor error -> ${error}`,
      500,
      true,
    );
  }
});

// This endpoint's URL needs to be registered with Stripe
export const stripeWebhook = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  let event;

  // Verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig || "",
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
  } catch (error) {
    console.error(`Webhook Error: ${error}`);
    return res.status(400).send(`Webhook Error: ${error}`);
  }

  // reasons of scoping
  let payment;
  let user;

  // Handle the event - example for 'payment_intent.succeeded'
  switch (event.type) {
    case "payment_intent.processing":
      const paymentIntentProcessing = event.data.object;

      // update payment in db to processing
      await prisma.payment.update({
        where: {
          id: paymentIntentProcessing.metadata.paymentId,
        },
        data: {
          status: "processing",
        },
      });

      // get payment from db
      payment = await prisma.payment.findUnique({
        where: {
          id: paymentIntentProcessing.id,
        },
      });

      // get user from db
      user = await prisma.user.findUnique({
        where: {
          id: payment?.userId,
        },
      });

      // send email to user
      await paymentProcessing(payment!, user!);

      // logging statement for testing -> take our during production
      console.log("Payment processing:", paymentIntentProcessing.id);
      break;

    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;

      // update payment in db to succeeded
      await prisma.payment.update({
        where: {
          id: paymentIntentSucceeded.metadata.paymentId,
        },
        data: {
          status: "succeeded",
        },
      });

      payment = await prisma.payment.findUnique({
        where: {
          id: paymentIntentSucceeded.id,
        },
      });

      user = await prisma.user.findUnique({
        where: {
          id: payment?.userId,
        },
      });

      await paymentSucceeded(payment!, user!);

      console.log("Payment succeeded:", paymentIntentSucceeded.id);
      break;

    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;

      // update payment in db to succeeded
      await prisma.payment.update({
        where: {
          id: paymentIntentFailed.metadata.paymentId,
        },
        data: {
          status: "failed",
        },
      });

      payment = await prisma.payment.findUnique({
        where: {
          id: paymentIntentFailed.id,
        },
      });

      user = await prisma.user.findUnique({
        where: {
          id: payment?.userId,
        },
      });

      await paymentFailed(payment!, user!);

      console.log("Payment failed:", paymentIntentFailed.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};

export const getPublishableKey = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  res.status(200).json(process.env.STRIPE_PK);
};

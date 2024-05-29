import { NextFunction, Request, Response } from "express";
import { RequestExtended } from "../middleware/verifyAuth";
import { PaymentSchema, Payment } from "../../shared/zodSchemas";
import {
  paymentProcessing,
  paymentSucceeded,
  paymentFailed,
} from "../utils/emails";
import { AppError, AppErrorName } from "../utils/AppError";
import prisma from "../prisma/client";

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
  const parsedPaymentData = PaymentSchema.parse(req.body);

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

      // create payment intent
      const paymentIntent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create({
          amount: event.price * 100,
          capture_method: "manual", // hold money until 2 days after event -> logic to be implemented via a cron
          currency: "cad",
          metadata: {
            userId: userId,
            eventId: event.id,
          },
        });

      // create payment in db
      const newPayment = await prisma.payment.create({
        data: {
          userId: userId,
          eventId: event.id,
          paymentIntentId: paymentIntent.id,
          amount: event.price,
          currency: "cad",
          status: paymentIntent.status,
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

      payment = await prisma.payment.findUnique({
        where: {
          id: paymentIntentProcessing.id,
        },
      });

      user = await prisma.user.findUnique({
        where: {
          id: payment?.userId,
        },
      });

      await paymentProcessing(payment!, user!);

      console.log("Payment processing:", paymentIntentProcessing.id);
      break;

    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;

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

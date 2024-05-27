import { NextFunction, Request, Response } from "express";
import { RequestExtended } from "../middleware/verifyAuth";
import { PaymentSchema, Payment } from "../../shared/zodSchemas";
import {
  paymentProcessing,
  paymentSucceeded,
  paymentFailed,
} from "../utils/emails";
import prisma from "../prisma/client";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// TODO
// Ensure 2 day payment lag-time -> hold money for 2 days until after the event passed
export const createPaymentIntent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const parsedPaymentData = PaymentSchema.parse(req.body);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parsedPaymentData.amount,
      currency: parsedPaymentData.currency,
    });

    const evnetDate = await prisma.event.findUnique({
      where: {
        id: parsedPaymentData.eventId,
      },
    });

    await prisma.payment.create({
      data: {
        userId: parsedPaymentData.userId,
        eventId: parsedPaymentData.eventId,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
      },
    });

    res.status(201).json(paymentIntent.client_secret);
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const { paymentIntentId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

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

import { NextFunction, Request, Response } from "express";
import { RequestExtended } from "../middleware/verifyAuth";
import prisma from "../prisma/client";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createPaymentIntent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
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

export const getPublishableKey = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  res.status(200).json(process.env.STRIPE_PK);
};

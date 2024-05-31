import express from "express";
import {
  createPaymentIntent,
  verifyPayment,
  cancelPayment,
  stripeWebhook,
  getPublishableKey,
} from "../controllers/payment.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.use(verifyAuthentication); // Use auth middleware for all routes below
router.post("/createPaymentIntent", createPaymentIntent);
router.post("/verifyPayment", verifyPayment);
router.post("/cancelPayment", cancelPayment);
router.post("/stripeWebhook", stripeWebhook);
router.get("/getPublishableKey", getPublishableKey);

export default router;

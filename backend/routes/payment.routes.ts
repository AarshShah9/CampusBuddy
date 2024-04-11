import express from "express";
import {
  createPaymentIntent,
  verifyPayment,
} from "../controllers/payment.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.use(verifyAuthentication); // Use auth middleware for all routes below
router.post("/createPaymentIntent", createPaymentIntent);
router.post("/verifyPayment", verifyPayment);

export default router;

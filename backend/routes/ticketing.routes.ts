import express from "express";
import {
  purchaseTicket,
  getQRCodePayload,
  verifyTicket,
} from "../controllers/ticketing.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.use(verifyAuthentication); // Use auth middleware for all routes below
router.post("/purchaseTicket", purchaseTicket);
router.post("/getQRCodePayload", getQRCodePayload);
router.post("/verifyTicket", verifyTicket);

export default router;

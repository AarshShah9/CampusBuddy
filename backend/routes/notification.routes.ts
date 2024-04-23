import express from "express";
import {
  sendUpcomingEventRemindersTest,
  storePushToken,
  testNotification,
} from "../controllers/notification.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/test/:pushToken", testNotification);
router.post("/storePushToken", verifyAuthentication, storePushToken);
router.get("/sendUpcomingEventReminders", sendUpcomingEventRemindersTest); // TODO: remove, for testing

export default router;

import express from "express";
import {
  getFlaggedItems,
  approveFlaggedItem,
  rejectFlaggedItem,
  getFlaggedPosts,
  approveFlaggedPost,
  rejectFlaggedPost,
  getFlaggedEvents,
  approveFlaggedEvent,
  rejectFlaggedEvent,
} from "../controllers/moderation.controller";

const router = express.Router();

router.get("/items", getFlaggedItems);
router.post("/items/approve", approveFlaggedItem);
router.post("/items/reject", rejectFlaggedItem);
router.get("/posts", getFlaggedPosts);
router.post("/posts/approve", approveFlaggedPost);
router.post("/posts/reject", rejectFlaggedPost);
router.get("/events", getFlaggedEvents);
router.post("/events/approve", approveFlaggedEvent);
router.post("/events/reject", rejectFlaggedEvent);

export default router;

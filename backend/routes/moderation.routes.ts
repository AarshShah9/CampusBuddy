import express from "express";
import {
  getFlaggedItems,
  getFlaggedPosts,
  getFlaggedEvents,
} from "../controllers/moderation.controller";

const router = express.Router();

router.get("/items", getFlaggedItems);
router.get("/posts", getFlaggedPosts);
router.get("/events", getFlaggedEvents);

export default router;

import express from "express";
import {
  recommendEvents,
  recommendPosts,
  recommendUsers,
} from "../controllers/rec.controller";

const router = express.Router();

router.get("/recommendEvents", recommendEvents);
router.get("/recommendPosts", recommendPosts);
router.get("/recommendUsers", recommendUsers);

export default router;

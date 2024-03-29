import express from "express";
import {
  profileSavedData,
  getUserProfileData,
  getProfileEvents,
} from "../controllers/profile.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/saved", verifyAuthentication, profileSavedData);
router.get("/user/:id", verifyAuthentication, getUserProfileData);
router.get("/events/:id", verifyAuthentication, getProfileEvents);

export default router;

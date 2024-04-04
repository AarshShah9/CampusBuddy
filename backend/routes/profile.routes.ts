import express from "express";
import {
  profileSavedData,
  getUserProfileData,
  getProfileEvents,
  getProfilePosts,
  getProfileItems,
  getOrganizationProfileData,
} from "../controllers/profile.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/saved", verifyAuthentication, profileSavedData);
router.get("/user/:id", verifyAuthentication, getUserProfileData);
router.get("/events/:id", verifyAuthentication, getProfileEvents);
router.get("/posts/:id", verifyAuthentication, getProfilePosts);
router.get("/items/:id", verifyAuthentication, getProfileItems);
router.get("/orgItems/:id", verifyAuthentication, getOrganizationProfileData);

export default router;

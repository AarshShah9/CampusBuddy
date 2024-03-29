import express from "express";
import {
  profileSavedData,
  getUserProfileData,
} from "../controllers/profile.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/saved", verifyAuthentication, profileSavedData);
router.get("/user/:id", verifyAuthentication, getUserProfileData);

export default router;

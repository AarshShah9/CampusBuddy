import express from "express";
import { profileSavedData } from "../controllers/profile.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/saved", verifyAuthentication, profileSavedData);

export default router;

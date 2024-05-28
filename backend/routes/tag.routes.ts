import express from "express";
import {
  getAllTags,
  modifyUserTags,
  getUserSubscriptions,
} from "../controllers/tag.controller";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.use(verifyAuthentication);
router.get("/getAllTags", getAllTags);
router.get("/readUserTags", getUserSubscriptions);
router.post("/modifyUserTags", modifyUserTags);

export default router;

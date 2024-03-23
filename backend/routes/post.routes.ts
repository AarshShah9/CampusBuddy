import express from "express";
import {
  postTest,
  getAllPosts,
  updatePost,
  deletePost,
  createLookingForPost,
} from "../controllers/post.controller";
import { upload } from "../utils/S3Uploader";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/test", postTest);
router.use(verifyAuthentication); // Use auth middleware for all routes below
router.get("/", getAllPosts);
router.post("/", createLookingForPost);
router.patch("/:id", upload.single("file"), updatePost);
router.delete("/:id", deletePost);
export default router;

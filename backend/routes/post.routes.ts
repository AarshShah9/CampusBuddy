import express from "express";
import {
  postTest,
  getAllPosts,
  updatePost,
  deletePost,
  createLookingForPost,
  getPostById,
  getPostCommentsById,
  createPostComment,
  updatePostComment,
  deletePostComment,
} from "../controllers/post.controller";
import { upload } from "../utils/S3Uploader";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/test", postTest);
router.use(verifyAuthentication); // Use auth middleware for all routes below
router.get("/", getAllPosts);
router.post("/", createLookingForPost);
router.get("/:id", getPostById);
router.get("/:id/comments/", getPostCommentsById);
router.post("/:id/comments/", createPostComment);
router.patch("/:postId/comments/:commentId", updatePostComment);
router.delete("/:postId/comments/:commentId", deletePostComment);
router.patch("/:id", upload.single("file"), updatePost);
router.delete("/:id", deletePost);
export default router;

// make sure delete post still works
// test get, create, update, delete

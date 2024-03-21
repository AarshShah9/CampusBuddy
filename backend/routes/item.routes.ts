import express from "express";
import {
  itemTest,
  getAllItems,
  updateItem,
  deleteItem,
  createItem,
} from "../controllers/item.controller";
import { upload } from "../utils/S3Uploader";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/test", itemTest);
router.use(verifyAuthentication); // Use auth middleware for all routes below
router.get("/", getAllItems);
router.post("/", upload.array("file", 10), createItem);
router.patch("/:id", upload.single("file"), updateItem);
router.delete("/:id", deleteItem);
export default router;

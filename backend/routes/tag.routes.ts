import express from "express";
import {
  readUserTags,
  modifyUserTags,
  readEventTags,
  modifyEventTags,
  readPostTags,
  modifyPostTags,
} from "../controllers/tag.controller";

const router = express.Router();

router.get("/readUserTags", readUserTags);
router.post("/modifyUserTags", modifyUserTags);
router.get("/readEventTags", readEventTags);
router.post("/modifyEventTags", modifyEventTags);
router.get("/readPostTags", readPostTags);
router.post("/modifyPostTags", modifyPostTags);

export default router;

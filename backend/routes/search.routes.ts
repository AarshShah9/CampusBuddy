import express from "express";
import { verifyAuthentication } from "../middleware/verifyAuth";
import { search } from "../controllers/search.controller";

const router = express.Router();

router.post("/", verifyAuthentication, search);

export default router;

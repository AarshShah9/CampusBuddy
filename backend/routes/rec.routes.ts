import express from "express";
import { recommendEvents } from "../controllers/rec.controller";

const router = express.Router();

router.get("/recommendEvents", recommendEvents);

export default router;

import express from "express";
import { seedDB } from "../controllers/seed.controller";

const router = express.Router();

router.post("/", seedDB);

export default router;

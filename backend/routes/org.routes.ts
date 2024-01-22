import express from "express";
import {
  createNewOrganization,
  organizationTest,
} from "../controllers/org.controller";

const router = express.Router();

router.get("/test", organizationTest);
router.post("/", createNewOrganization);

export default router;

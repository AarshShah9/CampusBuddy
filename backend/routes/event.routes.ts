import express from "express";
import {
  createEvent,
  createVerifiedEvent,
  deleteEvent,
  eventTest,
  getAllEvents,
  getAllEventsByOrganization,
  getAllVerifiedEvents,
  getEventById,
  getRecentEvents,
  updateEvent,
} from "../controllers/event.controller";
import { upload } from "../utils/fileUpload";

const router = express.Router();

// app.use(verifyAuthentication); // Use auth middleware for all routes

router.get("/test", eventTest);
router.get("/", getAllEvents);
router.get("/verified", getAllVerifiedEvents);
router.get("/organization/:id", getAllEventsByOrganization);
router.get("/recent/", getRecentEvents); // with pagination params
router.get("/:id", getEventById);

router.post("/organization/:id", upload.single("file"), createVerifiedEvent);
router.post("/", upload.single("image"), createEvent);
router.patch("/:id", upload.single("image"), updateEvent);
router.delete("/:id", deleteEvent);

export default router;

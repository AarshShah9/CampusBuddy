import express from "express";
import {
  createEvent,
  createVerifiedEvent,
  deleteEvent,
  eventTest,
  getAllEvents,
  getAllEventsByOrganization,
  getAllMapEvents,
  getAllVerifiedEvents,
  getEventById,
  getEventByUserId,
  getMainPageEvents,
  getRecentEvents,
  updateEvent,
} from "../controllers/event.controller";
import { upload } from "../utils/S3Uploader";
import { verifyAuthentication } from "../middleware/verifyAuth";

const router = express.Router();

router.get("/test", eventTest);
router.use(verifyAuthentication); // Use auth middleware for all routes below
router.get("/mainPage", getMainPageEvents);
router.get("/", getAllEvents);
router.get("/mapEvents", getAllMapEvents);
router.get("/verified", getAllVerifiedEvents);
router.get("/organization/:id", getAllEventsByOrganization);
router.get("/recent/", getRecentEvents); // with pagination params
router.get("/:id", getEventById);
router.get("/user/:id", getEventByUserId);

router.post("/organization/:id", upload.single("file"), createVerifiedEvent);
router.post("/", upload.single("file"), createEvent);
router.patch("/:id", upload.single("file"), updateEvent);
router.delete("/:id", deleteEvent);

export default router;

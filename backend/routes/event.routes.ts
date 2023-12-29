import express from 'express';
// const { upload } = require("../utils/fileUpload");
import { upload } from '../utils/fileUpload';
// import { verifyAuthentication } from '../middleware/verifyAuth';
import {
    createNewEvent,
    createNewVerifiedEvent,
    deleteEvent,
    eventTest,
    getAllEvents,
    getEventById,
    updateEvent,
} from '../controllers/event.controller';

const router = express.Router();

// app.use(verifyAuthentication); // Use auth middleware for all routes

router.get('/test', eventTest);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', upload.single('image'), createNewEvent);
router.post(
    '/organization/:id',
    upload.single('image'),
    createNewVerifiedEvent
);
router.patch('/:id', upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);

export default router;

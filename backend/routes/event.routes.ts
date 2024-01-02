import express from 'express';
import { upload } from '../utils/fileUpload';
import { verifyAuthentication } from '../middleware/verifyAuth';
import {
    createNewEvent,
    createNewVerifiedEvent,
    deleteEvent,
    eventTest,
    getAllEvents,
    getAllEventsByOrganization,
    getAllVerifiedEvents,
    getEventById,
    getRecentEvents,
    updateEvent,
    updateEventImage,
} from '../controllers/event.controller';

const router = express.Router();

// app.use(verifyAuthentication); // Use auth middleware for all routes

router.get('/test', eventTest);
router.get('/', getAllEvents);
router.get('/verified', getAllVerifiedEvents);
router.get('/organization/:id', getAllEventsByOrganization);
router.get('/recent/', getRecentEvents); // with pagination params
router.get('/:id', getEventById);

router.post(
    '/organization/:id',
    upload.single('image'),
    createNewVerifiedEvent
);
router.post('/', upload.single('image'), createNewEvent);
router.patch('/image/:id', upload.single('image'), updateEventImage);
router.patch('/:id', upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);

export default router;

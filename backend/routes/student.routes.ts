import express from 'express';
import {
    studentTest,
    createNewStudent,
    verifyOTP,
    loginStudent,
    logoutStudent,
    getAllStudents
} from '../controllers/student.controller';
import { verifyAuthentication } from '../middleware/verifyAuth';

const router = express.Router();

router.get('/studentTest', studentTest);
router.post('/createNewStudent', createNewStudent);
router.post('/verifyOTP', verifyOTP);
router.post('/loginStudent', loginStudent);
router.post('/logoutStudent', verifyAuthentication, logoutStudent);
router.get('/getAllStudents', getAllStudents);

export default router;
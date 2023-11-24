import express from 'express';
import {
    studentTest,
    verifyOTP,
    createNewStudent,
    getAllStudents,
} from '../controllers/student.controller';

const router = express.Router();

router.get('/studentTest', studentTest);
router.post('/verifyOTP', verifyOTP);
router.post('/createNewStudent', createNewStudent);
router.get('/getAllStudents', getAllStudents);

export default router;
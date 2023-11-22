import express from 'express';
import {
    studentTest,
    createNewStudent,
    getAllStudents,
} from '../controllers/student.controller';

const router = express.Router();

router.get('/studentTest', studentTest);
router.post('/createNewStudent', createNewStudent);
router.get('/getAllStudents', getAllStudents);

export default router;
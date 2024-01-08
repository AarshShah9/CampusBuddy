import express from 'express';
import {
    studentTest,
    createNewStudent,
    resendOTP,
    verifyOTP,
    loginStudent,
    logoutStudent,
    resetPassword,
    getAllStudents,
    updateUser
} from '../controllers/user.controller';
import { verifyAuthentication } from '../middleware/verifyAuth';

const router = express.Router();

router.get('/studentTest', studentTest);
router.post('/createNewStudent', createNewStudent);
router.post('/resendOTP', resendOTP);
router.post('/verifyOTP', verifyOTP);
router.post('/loginStudent', loginStudent);
router.post('/logoutStudent', verifyAuthentication, logoutStudent);
router.post('/resetPassword', resetPassword);
router.get('/getAllStudents', getAllStudents);
router.patch('/updateUser/:id', updateUser);

export default router;
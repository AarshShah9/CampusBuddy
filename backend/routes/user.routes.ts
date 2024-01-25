import express from 'express';
import {
    createNewUser,
    resendOTP,
    verifyOTP,
    loginUser,
    logoutUser,
    resetPassword,
    removeUserByID,
    getAllUsers
} from '../controllers/user.controller';
import { verifyAuthentication } from '../middleware/verifyAuth';

const router = express.Router();

router.post('/createNewUser', createNewUser);
router.post('/resendOTP', resendOTP);
router.post('/verifyOTP', verifyOTP);
router.post('/loginStudent', loginUser);
router.post('/logoutStudent', verifyAuthentication, logoutUser);
router.post('/resetPassword', resetPassword);
router.delete('/removeUserByID', removeUserByID);
router.get('/getAllStudents', getAllUsers);

export default router;
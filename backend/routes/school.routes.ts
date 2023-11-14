import express from "express";
import { 
    schoolTest, 
    createNewSchool,
    getSchoolIDFromName,
    getAllSchools
} from '../controllers/school.controller';

const router = express.Router();

router.get('/schoolTest', schoolTest);
router.post('/createNewSchool', createNewSchool);
router.get('/getSchoolIDFromName', getSchoolIDFromName);
router.get('/getAllSchools', getAllSchools);

export default router;
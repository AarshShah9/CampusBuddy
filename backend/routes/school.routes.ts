import Express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Express.Router();
const prisma = new PrismaClient();

// test School
router.get('/schoolTest', async (req: Request, res: Response) => {
    res.send("Schools valid");
})

// create new School
router.post('/createNewSchool', async (req: Request, res: Response) => {
    const { school } = req.body;
    
    const newSchool = await prisma.school.create({
        data : {
            name: school,
        },
    });
    
    res.json(school);
});

// get SchoolID using School name
router.post('/getSchoolIDUsingSchoolName', async (req: Request, res: Response) => {
    
    
    const schoolID = await prisma.school.findUnique({
        where : {
            name: 
        }
    })
})

// get all Schools
router.get('/getAllSchools', async (req: Request, res: Response) => {
    const allSchools = await prisma.school.findMany();

    res.json(allSchools);
});

module.exports = router;
import Express, { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const router = Express.Router();
const prisma = new PrismaClient();

// test User
router.get('/schoolTest', async (req: Request, res: Response) => {
    res.send("Schools valid");
})

// create new User
router.post('/newSchool', async (req: Request, res: Response) => {
    const { school } = req.body;
    
    const newSchool = await prisma.school.create({
        data: {
            name: school,
        },
    });
    
    res.json(school);
});

// get all Users
router.get('/getAllSchools', async (req: Request, res: Response) => {
    const allSchools = await prisma.school.findMany();

    res.json(allSchools);
});

module.exports = router;
import Express, { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const router = Express.Router();
const prisma = new PrismaClient();

// test User
router.get('/studentTest', async (req: Request , res: Response) => {
    res.send("User -> Valid");
})

// create new User
router.post('/createNewStudent', async (req: Request, res: Response) => {
    const { school, email, username, name } = req.body;

    // get school ID
    

    // create and add user
    const student = await prisma.student.create({
        data : {
            
        },
    })
});

// get all Users
router.get('/getAllStudents', async (req: Request, res: Response) => {
    const allStudents = await prisma.student.findMany();

    res.json(allStudents);
});

module.exports = router;
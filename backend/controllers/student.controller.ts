import { Request, Response, response } from 'express';
import { PrismaClient } from '@prisma/client';

import { getSchoolIDFromName } from './school.controller';

const prisma = new PrismaClient();

// test User
export const studentTest = async (req: Request , res: Response) => {
    res.status(200).json({success: true, message: 'Endpoint works'});
}

// create new User
export const createNewStudent = async (req: Request, res: Response) => {
    const { schoolName, email, username, name } = req.body;

    const schoolID = await prisma.school.findFirst({
        where: {
            name: schoolName,
        },
    });

    // schoolName is valid
    if (schoolID !== null) {
        const newStudent = await prisma.student.create({
            data: {
                schoolID: schoolID.id,
                email: email,
                username: username,
                name: name,
            },
        });

        res.status(200).json(newStudent);
    }
}

// get all Users
export const getAllStudents = async (req: Request, res: Response) => {
    const allStudents = await prisma.student.findMany();

    res.status(200).json(allStudents);
};
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// test School
export const schoolTest = async (req: Request, res: Response) => {
    res.status(200).json({success: true, message: 'Endpoint works'});
}

// create new School
export const createNewSchool = async (req: Request, res: Response) => {
    const { school, domain } = req.body;
    
    const newSchool = await prisma.school.create({
        data : {
            name: school,
            domain: domain
        },
    });
    
    res.status(200).json(school);
}

// get SchoolID using School name
export const getSchoolIDFromName = async (req: Request, res: Response) => {
    const { schoolName } = req.body;

    const schoolID = await prisma.school.findFirst({
        where: {
            name: schoolName,
        },
    });

    res.status(200).json(schoolID);
}

// get all Schools
export const getAllSchools = async (req: Request, res: Response) => {
    const allSchools = await prisma.school.findMany();

    res.status(200).json(allSchools);
}
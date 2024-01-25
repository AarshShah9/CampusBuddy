import {NextFunction, Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';
import {
    SchoolCreateSchema,
    SchoolSchema} from "../../shared/zodSchemas";
import {AppError, AppErrorName} from "../utils/AppError";

const prisma = new PrismaClient();

// test School
export const schoolTest = async (req: Request, res: Response) => {
    res.status(200).json({success: true, message: 'Endpoint works'});
}

// create new School
export const createNewSchool = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        // Validate the School data
        const validatedSchoolData = SchoolCreateSchema.parse(req.body);

        const newSchool = await prisma.school.create({
            data: {
                ...validatedSchoolData,
            },
        });

        if (newSchool) {
            // School created successfully
            res.status(201).json({
                message: "School created successfully",
                data: newSchool,
            });
        } else {
            // Throw an error if the school creation returned an empty result
            throw new AppError(
                AppErrorName.EMPTY_RESULT_ERROR,
                "School creation returned empty result.",
                500,
                true,
            );
        }
    }catch (error: any){
        // hand error over to error handling middleware
            next(error);
        }
};


// get SchoolID using School name
export const getSchoolIDFromName = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const schoolName = SchoolSchema.parse(req.body).name;

        const schoolID = await prisma.school.findFirst({
            where: {
                name: schoolName,
            },
        });
        if(!schoolName){
            const notFoundError = new AppError(
                AppErrorName.NOT_FOUND_ERROR,
                `School with name ${schoolName} not found`,
                404,
                true,
            );

            throw notFoundError;
        }

        res.status(200).json(schoolID);
    } catch (error){
        next(error);
    }
};

// get all Schools
export const getAllSchools = async (req: Request, res: Response) => {
    try {
        const allSchools = await prisma.school.findMany();
        res.status(200).json(allSchools);
    } catch (error) {
        console.error("Error fetching schools:",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}
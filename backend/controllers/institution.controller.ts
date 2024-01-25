import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import {
    createInstitutionSchema,
    institutionDomainSchema,
    institutionNameSchema,
    institutionIDSchema
} from '@shared/zodSchemas';
import { AppError, AppErrorName } from '../utils/AppError';
import transporter from '../utils/mailer';

// create new Institution
export const createInstitution = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validShape = createInstitutionSchema.safeParse(req.body);

        if (!validShape.success) {
            const invalidShapeError = new AppError(
                AppErrorName.INVALID_INPUT_ERROR,
                "Input data shape is invalid",
                400,
                true
            );

            throw invalidShapeError;
        }

        const { institutionName, institutionDomain } = req.body;

        const validName = institutionNameSchema.safeParse(institutionName);
        const validDomain = institutionDomainSchema.safeParse(institutionDomain);

        if (!validName.success) {
            const invalidLengthError = new AppError(
                AppErrorName.INVALID_INPUT_ERROR,
                "Institution name cannot be empty",
                400,
                true
            );

            throw invalidLengthError;
        }

        if (!validDomain.success) {
            const invalidLengthError = new AppError(
                AppErrorName.INVALID_INPUT_ERROR,
                "Institution domain cannot be empty",
                400,
                true
            );

            throw invalidLengthError;
        }

        const newInstitution = await prisma.institution.create({
            data: {
                name: institutionName,
                domain: institutionDomain
            },
        });

        const message = {
            from: 'nomansanjari2001@gmail.com',
            to: 'mdnoman.sanjari@ucalgary.ca',
            subject: 'Verify OTP - CampusBuddy',
            html: "New Institution created!"
        }

        transporter.sendMail(message);
        res.status(200).json(newInstitution);
    }
    catch (error) {
        next(error);
    }
}

// get Institution from Institution ID
export const getInstitutionByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validID = institutionIDSchema.safeParse(req.body.institutionID);

        if (!validID.success) {
            const invalidInputError = new AppError(
                AppErrorName.INVALID_INPUT_ERROR,
                "Institution ID is invalid",
                400,
                true
            );

            throw invalidInputError;
        }

        const { institutionID } = req.body;

        const institution = await prisma.institution.findUnique({
            where: {
                id: institutionID,
            },
        });

        res.status(200).json(institution);
    }
    catch (error) {
        next(error);
    }
}

// get Institution from Institution Name
export const getInstitutionByName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validName = institutionNameSchema.safeParse(req.body.institutionName);

        if (!validName.success) {
            const invalidInputError = new AppError(
                AppErrorName.INVALID_INPUT_ERROR,
                "Institution ID is invalid",
                400,
                true
            );

            throw invalidInputError;
        }

        const { institutionName } = req.body;

        const institution = await prisma.institution.findFirst({
            where: {
                name: institutionName,
            },
        });

        res.status(200).json(institution);
    }
    catch (error) {
        next(error);
    }
}

// delete Instituion using InstitutionID
export const removeInstitutionByID = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validID = institutionIDSchema.safeParse(req.body.institutionID);

        if(!validID.success) {
            const invalidInputError = new AppError(
                AppErrorName.INVALID_INPUT_ERROR,
                "Institution ID is invalid",
                400,
                true
            );

            throw invalidInputError;
        }

        const { institutionID } = req.body;

        const institution = await prisma.institution.delete({
            where: {
                id: institutionID,
            },
        });

        res.status(200).json(`Deleted institution with ID: ${institutionID}`);
    }
    catch(error) {
        next(error);
    }
}

// get all Institutions
export const getAllInstitutions = async (req: Request, res: Response) => {
    const allSchools = await prisma.institution.findMany();

    res.status(200).json(allSchools);
}
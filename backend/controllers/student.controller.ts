import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import otpGenerator from 'otp-generator';

const prisma = new PrismaClient();

// test User
export const studentTest = async (req: Request, res: Response) => {
    res.status(200).json({success: true, message: 'Endpoint works'});
}

// generate OTP
export const generateOTP = async (req: Request, res: Response) => {
    // getting email to verify from the request body
    const { email } = req.body;

    // generating the OTP
    const OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    // writing the OTP to the database

    // email OTP

    res.status(200).json(OTP);
}

// verify OTP
export const verifyOTP = async (req: Request, res: Response) => {

}

// TODO implement JWT persistence and checking
// TODO implement login
// login existing User

// TODO implement JWT persistence and checking
// create new User
export const createNewStudent = async (req: Request, res: Response) => {
    const { schoolName, email, username, name, password } = req.body;

    const schoolID = await prisma.school.findFirst({
        where: {
            name: schoolName,
        },
    });

    // schoolName is valid
    if (schoolID !== null) {
        // creating newStudent object to write to DB
        const newStudent = await prisma.student.create({
            data: {
                schoolID: schoolID.id,
                email: email,
                username: username,
                name: name,
                password: password, // test purposes
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
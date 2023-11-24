import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import otpGenerator from 'otp-generator';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
const result = dotenv.config();

// could use refactoring later
// nodemailer config -> transport
const config = {
    service: 'gmail',
    auth: {
        user: 'nomansanjari2001@gmail.com',
        pass: 'ttfgnbtjykxedjzp'
    }
}

// mail transporter
let transporter = nodemailer.createTransport(config);

// test User
export const studentTest = async (req: Request, res: Response) => {
    res.status(200).json({success: true, message: 'Endpoint works'});
}

// verify OTP
export const verifyOTP = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    // find student according to email and match otp
    const student = await prisma.student.findFirst({
        where: {
            email: email,
            otp: otp,
        }
    });

    // if student exists
    if (student) {
        // generate user specific jwt
        const token = jwt.sign(email, process.env.JWT_SECRET ?? "testSecret");

        // update user record to be verified and update token
        await prisma.student.update({
            where: {
                email: email,
            },
            data: {
                jwt: token,
                status: true,
            },
        });

        res.status(200).cookie('authToken', token).send("JWT Set!");
    }
    else {
        res.status(401);
    }
}

// TODO implement JWT persistence and checking
// TODO implement login
// login existing User

// TODO implement JWT persistence and checking
// create new User
export const createNewStudent = async (req: Request, res: Response) => {
    const { schoolName, email, username, name, password } = req.body;
    const domain = email.slice(email.indexOf('@') + 1);

    // generating the OTP
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    // verify if school is accepted
    const schoolID = await prisma.school.findFirst({
        where: {
            name: schoolName,
            domain: domain
        },
    });

    // schoolName is valid
    if (schoolID) {
        // creating newStudent object to write to DB
        const newStudent = await prisma.student.create({
            data: {
                schoolID: schoolID.id,
                email: email,
                username: username,
                name: name,
                password: password,
                otp: otp,
                status: false
            },
        });

        const message = {
            from: 'nomansanjari2001@gmail.com',
            to: email,
            subject: 'Verify OTP - CampusBuddy',
            html: `<b>${otp}</b>`
        }

        transporter.sendMail(message).then((info) => {
            return res.status(201).json(
                {
                    otp: otp,
                    msg: "Email sent",
                    info: info.messageId,
                    preview: nodemailer.getTestMessageUrl(info)
                }
            )
        }).catch((err) => {
            return res.status(500).json({ msg: err });
        }
        );
    }
}

// get all Users
export const getAllStudents = async (req: Request, res: Response) => {
    const allStudents = await prisma.student.findMany();

    res.status(200).json(allStudents);
};
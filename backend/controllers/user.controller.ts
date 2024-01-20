import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import{
    IdParamSchema,
    UserUpdateSchema
} from "@shared/src/zodSchemas";
import { PrismaClient, User } from '@prisma/client';
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
    res.status(200).json({ success: true, message: 'Endpoint works' });
}

// create new User
export const createNewStudent = async (req: Request, res: Response) => {
    const { schoolName,
        email,
        firstName,
        lastName,
        username,
        yearOfStudy,
        password } = req.body;

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

    // verify if email doesnt exist
    const studentExists = await prisma.user.findFirst({
        where: {
            email: email
        }
    })

    // if student doesn't exist
    if (!studentExists) {
        // if schoolName is valid
        if (schoolID) {
            // creating newStudent object to write to DB
            const newStudent = await prisma.user.create({
                data: {
                    schoolId: schoolID.id,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    username: username,
                    yearOfStudy: yearOfStudy,
                    password: password,
                    otp: otp,
                    jwt: "",
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
        else {
            res.status(400).json({ success: false, message: 'Invalid email account' });
        }
    }
    // if student exists but status is false -> send OTP
    else if (studentExists.status === false) {
        // update user record with new otp
        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                otp: otp
            }
        })

        // send user an email with new otp
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

        res.status(200).json({
            status: true,
            message: 'New OTP sent'
        });
    }
    else {
        res.status(400).json({ success: false, message: 'User email already exists and is verified' });
    }
}

// send new OTP
export const resendOTP = async (req: Request, res: Response) => {
    const { email } = req.body;

    // generating the OTP
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });

    // update user record with new otp
    await prisma.user.update({
        where: {
            email: email
        },
        data: {
            otp: otp
        }
    })

    // send user an email with new otp
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

    res.status(200).json({
        status: true,
        message: 'New OTP sent'
    });
}

// verify OTP
export const verifyOTP = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    // find student according to email and match otp
    const student = await prisma.user.findFirst({
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
        await prisma.user.updateMany({
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

// login existing Student
export const loginStudent = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // check if email exists and password matches
    const existingStudent = await prisma.user.findFirst({
        where: {
            email: email,
            password: password
        },
    });

    // if user isn't verified -> resend OTP
    if (existingStudent?.status === false) {
        // generating the OTP
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        // update user record with new otp
        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                otp: otp
            }
        })

        // send user an email with new otp
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
    // if user is verified -> proceed with login
    else {
        if (existingStudent) {
            // generate student specific jwt
            const token = jwt.sign(email, process.env.JWT_SECRET ?? "testSecret");

            // update jwt on the database
            const updateJwt = await prisma.user.updateMany({
                where: {
                    email: email,
                    password: password
                },
                data: {
                    jwt: token
                }
            });

            // send jwt to client
            res.status(200).cookie('authToken', token).send("JWT Set!");
        }
        else {
            res.status(401);
        }
    }
}

// logout Student
// protected route
// client will have to send jwt in header
export const logoutStudent = async (req: Request, res: Response) => {
    const { email } = req.body;

    // set jwt to null 
    const loggedOut = await prisma.user.updateMany({
        where: {
            email: email,
        },
        data: {
            jwt: ""
        }
    });

    res.status(200).cookie('authToken', null).send("JWT Reset -> user logged out");

}

// reset password
export const resetPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    await prisma.user.update({
        where: {
            email: email
        },
        data: {
            password: password
        }
    });
}

// get all Users
export const getAllStudents = async (req: Request, res: Response) => {
    const allStudents = await prisma.user.findMany();

    res.status(200).json(allStudents);
};
 
//update User Information
export const updateUser = async (
    req:Request,
    res:Response,
    next: NextFunction
)=> {
    try {
        const userId = IdParamSchema.parse(req.params).id;

        //Validated user data
        const validatedUpdateUserData = UserUpdateSchema.parse(req.body);

        //validation checks
        // get the user from the database
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!existingUser) {
            return res.status(404);
        }

        // Update the user
        let updatedUser: User;

        updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                ...validatedUpdateUserData,
            },
        });
        // send back the updated user
        if (updatedUser) {
            // User updated successfully
            res.status(200).json({
                message: 'User updated successfully',
                data: updatedUser,
         });
        }else{
            return res.status(400).json({error: 'User could not be updated'});
        }
    }
    catch(error:any){
        next(error);
    }
};
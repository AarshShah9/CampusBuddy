import { NextFunction, Request, Response } from "express";
import {
  createUserSchema,
  deleteSchema,
  emailSchema,
  IdParamSchema,
  loginSchema,
  otpRequestSchema,
  otpVerifySchema,
  UserUpdateSchema,
} from "../../shared/zodSchemas";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import transporter from "../utils/mailer";

import jwt, { JwtPayload } from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { User } from "@prisma/client";

// In-Memory database for JWT verification
// One holds the JWT and the other holds the associated OTP
// Redis was a good idea apparently...oh well, this'll do for now
const inMemoryJWT = new Map();
const inMemoryOTP = new Map();

// create new User
export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { institutionId, username, firstName, lastName, email, password } =
      createUserSchema.parse(req.body);

    const domain = email.slice(email.indexOf("@") + 1);

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const institution = await prisma.institution.findFirst({
      where: {
        id: institutionId,
        domain: domain,
      },
    });

    if (!institution) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Institution does not exist",
        400,
        true,
      );
    }

    const studentExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (studentExists) {
      if (studentExists.isVerified) {
        throw new AppError(
          AppErrorName.RECORD_EXISTS_ERROR,
          "User already exists",
          400,
          true,
        );
      } else if (studentExists.isVerified === false) {
        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            otp: otp,
          },
        });

        const message = {
          from: "nomansanjari2001@gmail.com",
          to: email,
          subject: "Verify OTP - CampusBuddy",
          html: `<b>${otp}</b>`,
        };

        await transporter.sendMail(message);

        res.status(100).json({
          success: false,
          message: "User not verified, otp sent",
        });
      }
    }

    // sign jwt
    const token = jwt.sign(
      {
        institutionID: institutionId,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      process.env.JWT_SECRET ?? "testSecret",
      {
        expiresIn: "2d",
        mutatePayload: false,
      },
    );

    inMemoryJWT.set(email, token);
    inMemoryOTP.set(email, otp);

    const message = {
      from: "nomansanjari2001@gmail.com",
      to: email,
      subject: "Verify OTP - CampusBuddy",
      html: `<b>${otp}</b>`,
    };

    await transporter.sendMail(message);

    res.status(200).json({
      success: true,
      message: "User created, awaiting verification",
    });
  } catch (error) {
    next(error);
  }
};

// send new OTP
export const resendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = otpRequestSchema.parse(req.body);

    if (!inMemoryOTP.has(email)) {
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "User record doesn't exist",
        400,
        true,
      );
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // await prisma.user.update({
    //   where: {
    //     email: email,
    //   },
    //   data: {
    //     otp: otp,
    //   },
    // });

    const message = {
      from: "nomansanjari2001@gmail.com",
      to: email,
      subject: "Verify OTP - CampusBuddy",
      html: `<b>${otp}</b>`,
    };

    await transporter.sendMail(message);

    res.status(200).json({
      success: true,
      message: "New OTP sent",
    });
  } catch (error) {
    next(error);
  }
};

// verify OTP
export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, otp } = otpVerifySchema.parse(req.body);

    // verify if record exits
    if (!inMemoryOTP.has(email)) {
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "User record does not exist",
        404,
        true,
      );
    }

    try {
      const payload: string | JwtPayload = jwt.verify(
        inMemoryJWT.get(email),
        process.env.JWT_SECRET ?? "testSecret",
      );

      const user = await prisma.user.findUnique({
        where: {
          email: email,
          isVerified: "Verified",
        },
      });

      if (user) {
        res.status(400).json({
          success: true,
          message: "User already verified",
        });
      }

      if (
        typeof payload === "object" &&
        payload !== null &&
        "username" in payload &&
        "firstName" in payload &&
        "lastName" in payload &&
        "email" in payload &&
        "password" in payload &&
        "institutionID" in payload
      ) {
        const newUser = await prisma.user.create({
          data: {
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            password: payload.password,
            isVerified: "Verified",
            institutionID: payload.institutionID,
          },
        });

        inMemoryJWT.delete(email);
        inMemoryOTP.delete(email);
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// login existing Student
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });

    if (existingUser) {
      if (existingUser.isVerified === false) {
        const otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });

        await prisma.user.update({
          where: {
            email: email,
          },
          data: {
            otp: otp,
          },
        });

        // send user an email with new otp
        const message = {
          from: "nomansanjari2001@gmail.com",
          to: email,
          subject: "Verify OTP - CampusBuddy",
          html: `<b>${otp}</b>`,
        };

        await transporter.sendMail(message);

        res.status(100).json({
          success: false,
          message: "User not verified, otp sent",
        });
      } else if (existingUser.isVerified) {
        const token = jwt.sign(
          { ID: existingUser.id },
          process.env.JWT_SECRET ?? "testSecret",
        );

        await prisma.user.update({
          where: {
            email: email,
            password: password,
          },
          data: {
            jwt: token,
          },
        });

        // send jwt to client
        res.status(200).cookie("authToken", token).json({
          success: true,
          message: "JWT set",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

// logout Student -> protected route
export const logoutUser = async (req: Request, res: Response) => {
  const { email } = emailSchema.parse(req.body);

  await prisma.user.updateMany({
    where: {
      email: email,
    },
    data: {
      jwt: "",
    },
  });

  res.status(200).cookie("authToken", null).json({
    success: true,
    message: "User logged out",
  });
};

// will have to be changed later
// reset password
export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = loginSchema.parse(req.body);

  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password: password,
    },
  });
};

// remove User
export const removeUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = IdParamSchema.parse(req.params).id;

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  res.status(200).send(deletedUser);
};

// get all Users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const allStudents = await prisma.user.findMany();

  res.status(200).json(allStudents);
};

//update User Information
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
        message: "User updated successfully",
        data: updatedUser,
      });
    } else {
      return res.status(400).json({ error: "User could not be updated" });
    }
  } catch (error: any) {
    next(error);
  }
};

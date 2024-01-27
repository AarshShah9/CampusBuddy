import { NextFunction, Request, Response } from "express";
import {
  createUserSchema,
  IdParamSchema,
  loginSchema,
  otpRequestSchema,
  otpVerifySchema,
  UserUpdateSchema,
} from "../../shared/zodSchemas";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import transporter from "../utils/mailer";

import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { User } from "@prisma/client";

// create new User
export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validUser = createUserSchema.safeParse(req.body);

    if (!validUser.success) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Input data shape is invalid",
        400,
        true,
      );
    }

    const {
      institutionName,
      username,
      firstName,
      lastName,
      email,
      password,
      yearOfStudy,
    } = req.body;

    const domain = email.slice(email.indexOf("@") + 1);

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const institution = await prisma.institution.findFirst({
      where: {
        name: institutionName,
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

    const newUser = await prisma.user.create({
      data: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        otp: otp,
        isVerified: false,
        institutionId: institution.id,
        status: false,
        yearOfStudy: yearOfStudy,
      },
    });

    const message = {
      from: "nomansanjari2001@gmail.com",
      to: email,
      subject: "Verify OTP - CampusBuddy",
      html: `<b>${otp}</b>`,
    };

    await transporter.sendMail(message);

    res.status(200).json({
      success: true,
      message: "User created",
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
    const validEmail = otpRequestSchema.safeParse(req.body);

    if (!validEmail.success) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Email cannot be null",
        400,
        true,
      );
    }

    const { email } = req.body;

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
    const validEmail = otpRequestSchema.safeParse(req.body.email);
    const validOTP = otpVerifySchema.safeParse(req.body.otp);

    if (!validEmail.success) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Email cannot be null",
        400,
        true,
      );
    }

    if (!validOTP.success) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Email cannot be null",
        400,
        true,
      );
    }

    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
        otp: otp,
      },
    });

    if (user) {
      const token = jwt.sign(
        { ID: user.id },
        process.env.JWT_SECRET ?? "testSecret",
      );

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          jwt: token,
          isVerified: false,
        },
      });

      res.status(200).json({
        success: true,
        message: "User verified",
      });
    } else {
      res.status(400).json({
        success: true,
        message: "Wrong otp",
      });
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
    const validLogin = loginSchema.safeParse(req.body);

    if (!validLogin.success) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Email cannot be null",
        400,
        true,
      );
    }

    const { email, password } = req.body;

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
  const { email } = req.body;

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
  const { email, password } = req.body;

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
export const removeUserByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userID } = req.body;

  const deletedUser = await prisma.user.delete({
    where: {
      id: userID,
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

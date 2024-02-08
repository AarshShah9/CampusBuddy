import { NextFunction, Request, Response } from "express";
import {
  createUserSchema,
  IdParamSchema,
  loginSchema,
  UserUpdateSchema,
} from "../../shared/zodSchemas";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import transporter from "../utils/mailer";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@prisma/client";

// create new User
export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { institutionName, username, firstName, lastName, email, password } =
      createUserSchema.parse(req.body);

    const domain = email.slice(email.indexOf("@") + 1);

    const institution = await prisma.institution.findFirst({
      where: {
        name: institutionName,
        domain: domain,
      },
    });

    if (!institution) {
      res.status(400).json({
        success: false,
        message: "Institution doesn't exist",
      });

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
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const token = jwt.sign(
      {
        institutionID: institution.id,
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      process.env.JWT_SECRET ?? "testSecret",
      {
        expiresIn: "1h",
        mutatePayload: false,
      },
    );

    const message = {
      from: "nomansanjari2001@gmail.com",
      to: email,
      subject: "Verify your account - CampusBuddy",
      html: `Verify your account by clicking the link!<br>
      <a href="http://localhost:3000/api/user/verifyAccount/${token}></a>"`,
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

// verify OTP
export const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.params.token;

    try {
      const payload: string | JwtPayload = jwt.verify(
        token,
        process.env.JWT_SECRET ?? "testSecret",
      );

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
        const institution = await prisma.institution.findUnique({
          where: {
            id: payload.institutionID,
          },
        });

        if (institution) {
          const newUser = await prisma.user.create({
            data: {
              username: payload.username,
              firstName: payload.firstName,
              lastName: payload.lastName,
              email: payload.email,
              password: payload.password,
              institutionId: payload.institutionID,
            },
          });
        }

        res.status(200).json({
          html: '<img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Beijing_bouddhist_monk_2009_IMG_1486.JPG" alt="Word bruh word...">',
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "JWT timed out",
      });
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

    if (!existingUser) {
      res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    } else {
      const token = jwt.sign(
        {
          ID: existingUser.id,
          institutionID: existingUser.institutionId,
          username: existingUser.username,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          password: existingUser.password,
        },
        process.env.JWT_SECRET ?? "testSecret",
      );

      res.status(200).cookie("token", token).json({
        success: true,
        message: "Login successful",
      });
    }
  } catch (error) {
    next(error);
  }
};

// logout Student
export const logoutUser = async (req: Request, res: Response) => {
  res.status(200).cookie("token", null).json({
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

import { NextFunction, Request, Response } from "express";
import {
  IdParamSchema,
  loginSchema,
  OrganizationCreateSchema,
  OrganizationCreateType,
  OrgSignupPayloadSchema,
  AuthTokenSchema,
  UserCreateSchema,
  UserCreateType,
  UserUpdateSchema,
} from "../../shared/zodSchemas";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import transporter from "../utils/mailer";
import {
  ParticipationStatus,
  User,
  UserOrgStatus,
  UserRole,
  UserType,
} from "@prisma/client";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { createOrganizationWithDefaults } from "../services/org.service";
import { loginJwtPayloadType, RequestExtended } from "../middleware/verifyAuth";
import { comparePassword, hashPassword } from "../utils/hasher";
import { users } from "../prisma/data";
import { alreadyVerifiedMessage, thankYouMessage } from "../utils/emails";
import UploadToS3, {
  deleteFromS3,
  generateUniqueFileName,
} from "../utils/S3Uploader";

const jwtSecret = process.env.JWT_SECRET as Secret;

// create new User
export const signupAsStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { institutionId, firstName, lastName, email, password } =
      UserCreateSchema.parse(req.body);

    // Check if the user already exists
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

    if (!institutionId) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Institution id is required",
        400,
        true,
      );
    }

    // Verify that institution exists
    const institution = await prisma.institution.findUnique({
      where: {
        id: institutionId,
      },
    });

    // Verify that institution exists
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

    const domain = email.slice(email.indexOf("@") + 1);

    // check if the student has the correct email domain for the institution
    if (institution.domain !== domain) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        `Invalid student email domain: ${domain}`,
        400,
        true,
      );
    }

    const payload: UserCreateType = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      institutionId: institution.id,
    };

    const token = jwt.sign({ ...payload }, jwtSecret, {
      expiresIn: "10m",
      mutatePayload: false,
    });
    const url = `${process.env.URL}/api/user/verify/student/${token}`;
    const message = {
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "Verify your account - CampusBuddy",
      html: `Verify your account by clicking the link!<br>
      <a href="${url}">Click here</a>`,
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

// verify a new Student user
export const verifyStudentSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = AuthTokenSchema.parse(req.params).token;

    // Verify jwt
    const payload: string | JwtPayload = jwt.verify(
      token,
      jwtSecret ?? "testSecret",
    );

    // Validate the jwt payload
    const validatedUserData = UserCreateSchema.parse(payload);

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: validatedUserData.email,
      },
    });

    if (userExists) {
      throw new AppError(
        AppErrorName.RECORD_EXISTS_ERROR,
        "User already exists",
        400,
        true,
      );
    }

    if (!validatedUserData.institutionId) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Institution id is required",
        400,
        true,
      );
    }

    // Verify that the institution exists
    const institution = await prisma.institution.findUnique({
      where: {
        id: validatedUserData.institutionId,
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

    const hashedPassword = await hashPassword(validatedUserData.password);

    // Create new student
    const newStudent = await prisma.user.create({
      data: {
        firstName: validatedUserData.firstName,
        lastName: validatedUserData.lastName,
        email: validatedUserData.email,
        password: hashedPassword,
        accountType: UserType.Student,
        institutionId: institution.id,
      },
    });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(thankYouMessage);
    res.end();
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
        email,
      },
      include: {
        institution: true,
        enrollments: {
          include: {
            program: {
              select: {
                programName: true,
              },
            },
          },
        },
        UserOrganizationRole: {
          include: {
            organization: {
              select: {
                organizationName: true,
                description: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!existingUser || existingUser.institution === null) {
      res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
      //checks if user is a student
    } else if (existingUser.accountType === "Student") {
      // Confirm password matches
      const isCorrectPassword = await comparePassword(
        password,
        existingUser.password,
      );

      if (!isCorrectPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // find the amount of events the user has attended (participationStatus = Going, and endDate is in the past) inside the userEventResponse table
      const attendedEvents = await prisma.userEventResponse.count({
        where: {
          userId: existingUser.id,
          participationStatus: ParticipationStatus.Going,
          event: {
            endTime: {
              lte: new Date(),
            },
          },
        },
      });

      // find the number of organizations the user is a member of
      const orgs = await prisma.userOrganizationRole.count({
        where: {
          userId: existingUser.id,
          role: {
            roleName: "Member",
          },
        },
      });

      const loginTokenPayload: loginJwtPayloadType = {
        id: existingUser.id,
        institutionId: existingUser.institution.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        password: existingUser.password,
      };
      const authToken = jwt.sign({ ...loginTokenPayload }, jwtSecret);

      res.status(200).json({
        authToken,
        data: {
          id: existingUser.id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          image: existingUser.profilePic,
          programs: existingUser.enrollments.map(
            (enrollment) => enrollment.program.programName,
          ),
          attended: attendedEvents,
          following: orgs,
          type: "Student",
        },
      });
      //checks if user is organization owner
    } else if (existingUser.accountType === "ApprovedOrg") {
      // Confirm password matches
      const loginTokenPayload: loginJwtPayloadType = {
        id: existingUser.id,
        institutionId: existingUser.institution.id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        password: existingUser.password,
      };
      const authToken = jwt.sign({ ...loginTokenPayload }, jwtSecret);

      res.status(200).json({
        authToken,
        data: {
          id: existingUser.id,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          organizationName: existingUser?.UserOrganizationRole.map(
            (UserOrganizationRole) =>
              UserOrganizationRole.organization.organizationName,
          ),
          organizationDescription: existingUser?.UserOrganizationRole.map(
            (UserOrganizationRole) =>
              UserOrganizationRole.organization.description,
          ),
          organizationImage: existingUser?.UserOrganizationRole.map(
            (UserOrganizationRole) => UserOrganizationRole.organization.image,
          ),
          type: "Organization_Admin",
        },
      });
      //user not a student, or an approved organization owner
    } else if (existingUser.accountType === "PendingOrg") {
      res
        .status(401)
        .json({ error: "Organization has not been approved, login failed." });
    } else {
      res.status(401).json({ error: "Invalid user account type" });
    }
  } catch (error) {
    next(error);
  }
};

// logout Student
export const logoutUser = async (req: Request, res: Response) => {
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
  try {
    const { email, password } = loginSchema.parse(req.body);

    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: password,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

// remove User
export const removeUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //TODO: check permission -> who can delete a user? Admin + the user themself?
    const userId = IdParamSchema.parse(req.params).id;

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error: any) {
    next(error);
  }

  res.status(204).end();
};

// get all Users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allUsers = await prisma.user.findMany();

    res.status(200).json({
      message: "All users",
      data: allUsers,
    });
  } catch (error: any) {
    next(error);
  }
};

// get Users by Id
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const userId = IdParamSchema.parse(req.params).id;

    // Get user from db
    const user = await prisma.user.findMany({
      where: {
        id: userId,
      },
    });

    if (!user) {
      // Throw error if user not found
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `User with id ${userId} not found`,
        404,
        true,
      );
    }

    res.status(200).json({
      message: `User with id ${userId}`,
      data: user,
    });
  } catch (error: any) {
    next(error);
  }
};

// Update User Information
// Only the logged in user can update their own information
export const updateUser = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    //Validated user data
    const validatedUpdateUserData = UserUpdateSchema.parse(req.body);

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: loggedInUserId! },
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

// Signup a new org user with an existing organization
export const signupWithExistingOrg = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request organization id param
    const organizationId = IdParamSchema.parse(req.params).id;

    // Validate request body
    const { institutionId, firstName, lastName, email, password } =
      UserCreateSchema.parse(req.body);

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new AppError(
        AppErrorName.RECORD_EXISTS_ERROR,
        "User already exists",
        400,
        true,
      );
    }

    if (!institutionId) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Institution id is required",
        400,
        true,
      );
    }
    // Verify that institution exists
    const institution = await prisma.institution.findUnique({
      where: {
        id: institutionId,
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

    // Verify that the organization exists
    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    if (!organization) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Organization with id ${organizationId} not found`,
        404,
        true,
      );
    }

    const payload: UserCreateType = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      institutionId: institution.id,
    };

    // Create the jwt for verifying email, contains user data as payload
    const token = jwt.sign({ ...payload }, jwtSecret, {
      expiresIn: "10m",
      mutatePayload: false,
    });
    const url = `${process.env.URL}/api/user/verify/organization/${organizationId}/${token}`;

    const message = {
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "Verify your account - CampusBuddy",
      html: `Verify your account by clicking the link!<br>
            <a href="${url}">Click here</a>`,
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

// Signup a new org user with a new organization
// Creates both a new user and a new organization
export const signupAsNewOrg = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // NOTE!: request data nested in req.body.user and req.body.organization

    // Validate the new user data
    const { institutionId, firstName, lastName, email, password } =
      UserCreateSchema.parse(req.body.user);

    // Validate the new organization data
    // We have both institution name and id just bcs we are re-using same zod schemas
    const validatedOrgData = OrganizationCreateSchema.parse(
      req.body.organization,
    );
    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new AppError(
        AppErrorName.RECORD_EXISTS_ERROR,
        "User already exists",
        400,
        true,
      );
    }

    if (!institutionId) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Institution id is required",
        400,
        true,
      );
    }
    // Verify that the institution exists
    const institution = await prisma.institution.findUnique({
      where: {
        id: institutionId,
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

    // Construct payload for jwt
    const payload: {
      user: UserCreateType;
      organization: OrganizationCreateType;
    } = {
      user: {
        firstName,
        lastName,
        email,
        password,
        institutionId: institution.id,
      },
      organization: {
        description: validatedOrgData.description,
        organizationName: validatedOrgData.organizationName,
        institutionId,
      },
    };

    // Create the jwt for verifying email, contains both user and organization data in payload
    const token = jwt.sign({ ...payload }, jwtSecret, {
      expiresIn: "10m",
      mutatePayload: false,
    });

    const url = `${process.env.URL}/api/user/verify/organization/new/${token}`;
    const message = {
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "Verify your account - CampusBuddy",
      html: `Verify your account by clicking the link!<br>
     <a href="${url}">Click here</a>`,
    };

    await transporter.sendMail(message);

    res.status(200).json({
      success: true,
      message: "New user and organization created, awaiting verification",
    });
  } catch (error) {
    next(error);
  }
};

// Verify a new organization user signing up with an existing organization
// User is created as a pending moderator for the organization
export const verifyExistingOrgSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = AuthTokenSchema.parse(req.params).token;

    // Verify jwt
    const payload: string | JwtPayload = jwt.verify(token, jwtSecret);

    // Validate the jwt payload
    const validatedUserData = UserCreateSchema.parse(payload);

    // Validate request organization id param
    const organizationId = IdParamSchema.parse(req.params).id;

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: validatedUserData.email,
      },
    });

    if (userExists) {
      throw new AppError(
        AppErrorName.RECORD_EXISTS_ERROR,
        "User already exists",
        400,
        true,
      );
    }

    if (!validatedUserData.institutionId) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Institution id is required",
        400,
        true,
      );
    }

    // Verify that the institution exists
    const institution = await prisma.institution.findUnique({
      where: {
        id: validatedUserData.institutionId,
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

    // Verify that the organization exists
    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    if (!organization) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Organization with id ${organizationId} not found`,
        404,
        true,
      );
    }

    // Fetch the roleId for the moderator role
    const { id: roleId } = await prisma.role.findUniqueOrThrow({
      where: {
        roleName: UserRole.Moderator,
      },
      select: {
        id: true,
      },
    });

    const hashedPassword = await hashPassword(validatedUserData.password);

    // Perform a transaction to create the user and add their userOrganizationRole
    let newUser: User | undefined;
    await prisma.$transaction(async (tx) => {
      // Create a new Org user
      newUser = await tx.user.create({
        data: {
          firstName: validatedUserData.firstName,
          lastName: validatedUserData.lastName,
          email: validatedUserData.email,
          password: hashedPassword,
          accountType: UserType.PendingOrg,
          institutionId: institution.id,
        },
      });

      // Add the user to the organization as a Moderator (pending approval from the organization)
      await tx.userOrganizationRole.create({
        data: {
          userId: newUser.id,
          organizationId: organizationId,
          roleId,
          status: UserOrgStatus.Pending,
        },
      });
    });

    res.status(200).json({
      message: `JWT verified and a new org user was created as a pending moderator for orgId: ${organizationId}`,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// Verify a new organization user signing up with a new organization
// User is created as a pending owner for the organization
export const verifyNewOrgSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = AuthTokenSchema.parse(req.params).token;

    // Verify jwt
    const payload: string | JwtPayload = jwt.verify(
      token,
      jwtSecret ?? "testSecret",
    );

    // Validate the jwt payload
    const { user: validatedUserData, organization: validatedorganizationData } =
      OrgSignupPayloadSchema.parse(payload);

    // Check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: validatedUserData.email,
      },
    });

    if (userExists) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(alreadyVerifiedMessage);
      res.end();
      return;
    }
    if (!validatedUserData.institutionId) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "Institution id is required",
        400,
        true,
      );
    }

    // Verify that the institution exists
    const institution = await prisma.institution.findUnique({
      where: {
        id: validatedUserData.institutionId,
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

    const hashedPassword = await hashPassword(validatedUserData.password);

    // Create the new Org user
    const newUser = await prisma.user.create({
      data: {
        firstName: validatedUserData.firstName,
        lastName: validatedUserData.lastName,
        email: validatedUserData.email,
        password: hashedPassword,
        accountType: UserType.PendingOrg,
        institutionId: institution.id,
      },
    });

    // Create the new organization
    const newOrganization = await createOrganizationWithDefaults(
      validatedorganizationData,
      newUser.id,
    );

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(thankYouMessage);
    res.end();
  } catch (error) {
    next(error);
  }
};

// Get the logged in user's info
export const getLoggedInUser = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    // Get user from db
    const user = await prisma.user.findMany({
      where: {
        id: loggedInUserId!,
      },
    });

    if (!user) {
      // Throw error if user not found -> should never happen since user is already authenticated
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `User with id ${loggedInUserId} not found`,
        404,
        true,
      );
    }

    res.status(200).json({ data: user });
  } catch (error: any) {
    next(error);
  }
};

export const verify = async (req: Request, res: Response) => {
  res.status(200).json({ message: "User is verified" });
};

export const generateJWT = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: users[0].id,
    },
    include: {
      enrollments: {
        include: {
          program: {
            select: {
              programName: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User doesn't exist",
    });
  }

  // find the amount of events the user has attended (participationStatus = Going, and endDate is in the past) inside the userEventResponse table
  const attendedEvents = await prisma.userEventResponse.count({
    where: {
      userId: user.id,
      participationStatus: ParticipationStatus.Going,
      event: {
        endTime: {
          lte: new Date(),
        },
      },
    },
  });

  // find the number of organizations the user is a member of
  const orgs = await prisma.userOrganizationRole.count({
    where: {
      userId: user.id,
      role: {
        roleName: "Member",
      },
    },
  });

  const authToken = jwt.sign(user as JwtPayload, jwtSecret);

  res.status(200).json({
    authToken,
    data: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.profilePic,
      programs: user.enrollments.map(
        (enrollment) => enrollment.program.programName,
      ),
      attended: attendedEvents,
      following: orgs,
    },
  });
};

export const loginAsAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    if (existingUser.accountType !== UserType.Admin) {
      return res.status(401).json({
        success: false,
        message: "User is not an admin",
      });
    }

    // Confirm password matches
    const isCorrectPassword = await comparePassword(
      password,
      existingUser.password,
    );

    if (!isCorrectPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const loginTokenPayload: loginJwtPayloadType = {
      id: existingUser.id,
      institutionId: null,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      password: existingUser.password,
    };
    const authToken = jwt.sign(
      { ...loginTokenPayload },
      process.env.JWT_SECRET as Secret,
    );

    res.status(200).json({ authToken });
  } catch (error) {
    res.status(500).json({ message: `Internal server error - ${error}` });
  }
};

export const uploadProfilePic = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    if (!req.file) {
      throw new AppError(
        AppErrorName.INVALID_INPUT_ERROR,
        "No file uploaded",
        400,
        true,
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: loggedInUserId!,
      },
    });

    if (!user) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `User with id ${loggedInUserId} not found`,
        404,
        true,
      );
    }

    const updatedUser = await prisma.$transaction(async (prisma) => {
      if (user.profilePic) {
        await deleteFromS3(user.profilePic);
      }

      const uniqueFileName = generateUniqueFileName(
        req.file!.originalname,
        user.id,
      );
      const path = `images/profilePictures/${uniqueFileName}`;

      await UploadToS3(req.file!, path);

      return prisma.user.update({
        where: { id: user.id },
        data: {
          profilePic: path,
        },
      });
    });

    res.status(200).json({
      message: "Profile picture updated successfully",
      data: {
        image: updatedUser.profilePic,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const removeProfilePic = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: loggedInUserId!,
      },
    });

    if (!user || !user.profilePic) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `User with id ${loggedInUserId} not found or has no profile picture`,
        404,
        true,
      );
    }

    await prisma.$transaction(async (prisma) => {
      await deleteFromS3(user.profilePic!);
      return prisma.user.update({
        where: { id: user.id },
        data: {
          profilePic: null,
        },
      });
    });

    res.status(200).json({
      message: "Profile picture removed successfully",
      data: {
        image: null,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const profilePageData = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: loggedInUserId!,
      },
    });

    const eventResponses = await prisma.userEventResponse.findMany({
      where: {
        userId: loggedInUserId,
      },
      include: {
        event: true,
      },
    });

    // filter only those that have attended in the past base on the endTime
    const attended: number = eventResponses.filter((eventRes) => {
      return (
        eventRes.event.endTime < new Date() &&
        eventRes.participationStatus === ParticipationStatus.Going
      );
    }).length;

    const savedEvents = eventResponses
      .filter((eventRes) => {
        return eventRes.participationStatus === ParticipationStatus.Interested;
      })
      .map((eventRes) => {
        return eventRes.event;
      });

    if (!user) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `User with id ${loggedInUserId} not found`,
        404,
        true,
      );
    }

    res.status(200).json({
      message: "User profile page data",
      data: { user, attended, savedEvents },
    });
  } catch (error: any) {
    next(error);
  }
};

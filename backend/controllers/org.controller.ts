import {
  IdParamSchema,
  OrganizationCreateSchema,
  OrganizationMembershipApprovalSchema,
  OrganizationUpdateSchema,
} from "../../shared/zodSchemas";
import { NextFunction, Request, Response } from "express";
import { createOrganizationWithDefaults } from "../services/org.service";
import { AppError, AppErrorName } from "../utils/AppError";
import prisma from "../prisma/client";
import {
  AppPermissionName,
  OrganizationStatus,
  User,
  UserOrgStatus,
  UserType,
} from "@prisma/client";
import { checkUserPermission } from "../utils/checkUserPermission";
import UploadToS3, {
  deleteFromS3,
  generateUniqueFileName,
} from "../utils/S3Uploader";

// NOTE: Placeholder, remove later
const userId = "db365290-c550-11ee-83fd-6f8d6c450910";
// User1: "db365290-c550-11ee-83fd-6f8d6c450910", owner of org1: ""6d3ff6d0-c553-11ee-83fd-6f8d6c450910""

// test Organization
export const organizationTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Organization endpoint works" });
};

// Create a new Organization
export const createNewOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate the organization data
    const validatedOrganization = OrganizationCreateSchema.parse(req.body);

    // If we want to make image upload mandatory upon organization creation
    if (!req.file) {
      throw new AppError(
        AppErrorName.FILE_UPLOAD_ERROR,
        "No file uploaded.",
        400,
        true,
      );
    }

    // Create the new organization
    const newOrganization = await createOrganizationWithDefaults(
      validatedOrganization,
      userId,
      req.file!,
    );

    if (newOrganization) {
      // Organization was created successfully
      res.status(201).json({
        message: "Organization created successfully",
        data: newOrganization,
      });
    } else {
      // createOrganizationWithDefaults returned undefined, something went wrong
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Organization creation returned empty result.",
        500,
        true,
      );
    }
  } catch (error) {
    next(error);
  }
};

// Get Organization by id
export const getOrganizationById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;

    // Get organization from db
    const organization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    if (!organization) {
      // Throw error if organization not found
      const notFoundError = new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Organization with id ${organizationId} not found`,
        404,
        true,
      );

      throw notFoundError;
    }

    res.status(200).json({ data: organization });
  } catch (error) {
    next(error);
  }
};

// Get all Organizations
export const getAllOrganizations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Retrieves array of entire org objects
    const allOrgs = await prisma.organization.findMany();
    res.status(200).json({ data: allOrgs });
  } catch (error) {
    next(error);
  }
};

// Get all Organizations by institution
export const getAllOrganizationsByInstitution = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const institutionId = IdParamSchema.parse(req.params).id;

    const allOrgsByInstitution = await prisma.organization.findMany({
      where: {
        institutionId,
      },
    });

    res.status(200).json({ data: allOrgsByInstitution });
  } catch (error) {
    next(error);
  }
};

// update organization
export const updateOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;

    //TODO: Get user id from somewhere...
    // const userId = req.userId;

    // Validate organization data
    const validatedUpdateOrganizationData = OrganizationUpdateSchema.parse(
      req.body,
    );

    // get the organization from the database
    const existingOrganization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });
    if (!existingOrganization) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Organization with id ${organizationId} not found`,
        404,
        true,
      );
    }

    // Check if the user has permission to update the organization details
    const hasPermission = await checkUserPermission(
      userId,
      existingOrganization.id,
      AppPermissionName.MANAGE_ORGANIZATION,
    );

    if (!hasPermission) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to update the organization`,
        403,
        true,
      );
    }

    if (req.file) {
      // update the file
      if (existingOrganization?.image) {
        await deleteFromS3(existingOrganization.image);
      }
      const uniqueFileName = generateUniqueFileName(
        req.file!.originalname,
        organizationId,
      );
      const path = `images/organizations/${uniqueFileName}`;
      await UploadToS3(req.file!, path);
      validatedUpdateOrganizationData.image = path;
    }

    // Update the organization
    const updatedOrganization = await prisma.organization.update({
      where: { id: organizationId },
      data: {
        ...validatedUpdateOrganizationData,
      },
    });
    // send back the updated organization
    if (updatedOrganization) {
      // Organization updated successfully
      res.status(200).json({
        message: "Organization updated successfully",
        data: updatedOrganization,
      });
    } else {
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Organization update returned empty result.",
        500,
        true,
      );
    }
  } catch (error: any) {
    next(error);
  }
};

// Delete organizationw -> make sure permission/roles tables are cleared appropriately
export const deleteOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;
    // const userId = req.user.id; //TODO: Get user id from somewhere...

    // get the organization from the database
    const existingOrganization = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    if (!existingOrganization) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Organization not found",
        404,
        true,
      );
    }

    // check if the user has permission to delete the organization
    const hasPermission = await checkUserPermission(
      userId,
      existingOrganization.id,
      AppPermissionName.DELETE_ORGANIZATION,
    );

    if (!hasPermission) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to delete the organization`,
        403,
        true,
      );
    }

    // Delete the organization
    await prisma.organization.delete({
      where: { id: organizationId },
    });

    res.status(204).end(); // No content after sucessful deletion
  } catch (error: any) {
    next(error);
  }
};

// Get all Pending Organizations
// Will be used by an admin dashboard
export const getAllPendingOrganizations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: check the users system-level permissions (admin, not yet implemented)

    const allOrgs = await prisma.organization.findMany({
      where: {
        status: OrganizationStatus.Pending,
      },
      orderBy: {
        createdAt: "asc", // show oldest org requests first
      },
    });
    res.status(200).json({ data: allOrgs });
  } catch (error) {
    next(error);
  }
};

// Get all users who have requested to join the organization
// createNewOrgUser should get orgid from req.params
// maybe create a new role for pending mod (probably without any permissions)
export const getAllPendingOrgUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request organization id param
    const organizationId = IdParamSchema.parse(req.params).id;

    //TODO: Get user id from somewhere...
    // const userId = req.userId;

    // Check if the user has permission to view this data
    const hasPermission = await checkUserPermission(
      userId,
      organizationId,
      AppPermissionName.MANAGE_MEMBERS,
    );

    if (!hasPermission) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission`,
        403,
        true,
      );
    }

    // get users who are pending approval
    const pendingOrgUsers = await prisma.userOrganizationRole.findMany({
      where: {
        organizationId,
        status: UserOrgStatus.Pending,
      },
      include: {
        role: {
          select: {
            roleName: true,
          },
        },
      },
    });

    res.status(200).json({ data: pendingOrgUsers });
  } catch (error) {
    next(error);
  }
};

// Reject or approve a user's request to join an organization
export const manageMembershipRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request organization id param
    const organizationId = IdParamSchema.parse(req.params).id;

    // Validate membership approval data
    const validatedMembershipApprovalData =
      OrganizationMembershipApprovalSchema.parse(req.body);

    //TODO: Get user id from somewhere...
    // const userId = req.userId;

    // Check if the user has permission to approve or reject membership requests
    const hasPermission = await checkUserPermission(
      userId,
      organizationId,
      AppPermissionName.MANAGE_MEMBERS,
    );

    if (!hasPermission) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission`,
        403,
        true,
      );
    }

    // Check if the user exists (the pending user)
    const requestingUser = await prisma.user.findFirst({
      where: {
        id: validatedMembershipApprovalData.userId,
      },
    });

    if (requestingUser) {
      // Throw error if the user is not found
      const notFoundError = new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `User not found`,
        404,
        true,
      );

      throw notFoundError;
    }

    // Handle user request
    if (validatedMembershipApprovalData.status === UserOrgStatus.Approved) {
      // approve the user
      await approveUserRequest(requestingUser!, organizationId);
      // TODO: email user that their account has been approved
      res.status(200).json({
        message: `Membership of user: ${
          requestingUser!.username
        } successfully approved`,
      });
    } else if (
      validatedMembershipApprovalData.status === UserOrgStatus.Rejected
    ) {
      // reject the users membership request
      await rejectUserRequest(requestingUser!, organizationId);
      // TODO: email user that their account has been approvedres
      res.status(200).json({
        message: `Membership of user: ${
          requestingUser!.username
        } successfully rejected`,
      });
    }
  } catch (error) {
    next(error);
  }
};

//Helper functions

async function approveUserRequest(user: User, organizationId: string) {
  await prisma.$transaction(async (tx) => {
    // change user account status to "ApprovedOrg"
    if (user.accountType === UserType.PendingOrg) {
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          accountType: UserType.ApprovedOrg,
        },
      });
    }

    // Change user role status in the organization to approved
    await tx.userOrganizationRole.update({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId,
        },
      },
      data: {
        status: UserOrgStatus.Approved,
      },
    });
  });
}

// Reject a user's request to join an organization (eg )
async function rejectUserRequest(user: User, organizationId: string) {
  await prisma.$transaction(async (tx) => {
    // change user account status to "Rejected"
    if (user.accountType === UserType.PendingOrg) {
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          accountType: UserType.ApprovedOrg,
        },
      });
    }

    // Change user role status in the organization to rejected
    // await tx.userOrganizationRole.update({
    //   where: {
    //     userId_organizationId: {
    //       userId: user.id,
    //       organizationId,
    //     },
    //   },
    //   data: {
    //     status: UserOrgStatus.Rejected,
    //   },
    // });

    // Delete the user's role in the organization
    await tx.userOrganizationRole.delete({
      where: {
        userId_organizationId: {
          userId: user.id,
          organizationId,
        },
      },
    });
  });

  // TODO: set user type to rejected org or just delete the user?
  // should we send an email to the user letting them know their request was rejected?
}

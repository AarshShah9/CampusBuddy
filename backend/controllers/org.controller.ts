import {
  IdParamSchema,
  OrganizationApprovalSchema,
  OrganizationCreateSchema,
  OrganizationMembershipApprovalSchema,
  OrganizationType,
  OrganizationUpdateSchema,
  UserWithoutPasswordType,
} from "../../shared/zodSchemas";
import { NextFunction, Request, Response } from "express";
import {
  addMemberToOrganization,
  approveOrganizationRequest,
  approveUserRequest,
  createOrganizationWithDefaults,
  getOrgById,
  getRoleIdFromName,
  getUserRolesInOrganization,
  rejectOrganizationRequest,
  rejectUserRequest,
  removeUserFromOrganization,
} from "../services/org.service";
import {
  emailMembershipRequestApproved,
  emailMembershipRequestRejected,
  emailOrganizationRequestApproved,
  emailOrganizationRequestRejected,
} from "../utils/emails";
import { AppError, AppErrorName } from "../utils/AppError";
import prisma from "../prisma/client";
import {
  AppPermissionName,
  OrganizationStatus,
  UserOrgStatus,
  UserRole,
} from "@prisma/client";
import { checkUserPermission } from "../utils/checkUserPermission";
import UploadToS3, {
  deleteFromS3,
  generateUniqueFileName,
} from "../utils/S3Uploader";
import { RequestExtended } from "../middleware/verifyAuth";

// test Organization
export const organizationTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Organization endpoint works" });
};

// Create a new Organization
export const createNewOrganization = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate the organization data
    const validatedOrganization = OrganizationCreateSchema.parse(req.body);

    const loggedInUserId = req.userId;

    // Verify that the institution exists
    const institution = await prisma.institution.findUnique({
      where: {
        id: validatedOrganization.institutionId,
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

    // Create the new organization
    const newOrganization = await createOrganizationWithDefaults(
      validatedOrganization,
      loggedInUserId!,
      req.file,
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
    // Fetch the organization by its id
    const organization = await getOrgById(organizationId);

    res.status(200).json({
      message: "Organization retrieved successfully",
      data: organization,
    });
  } catch (error) {
    next(error);
  }
};

// Get all Approved Organizations
export const getAllOrganizations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Retrieves array of entire org objects
    const allOrgs = await prisma.organization.findMany();
    res.status(200).json({
      message: "All organizations retrieved successfully",
      data: allOrgs,
    });
  } catch (error) {
    next(error);
  }
};

// Get all Approved Organizations by institution
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
        status: OrganizationStatus.Approved, // only get the approved organizations
      },
    });

    res.status(200).json({
      message: "All organizations retrieved successfully",
      data: allOrgsByInstitution,
    });
  } catch (error) {
    next(error);
  }
};

// update organization
export const updateOrganization = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;

    const loggedInUserId = req.userId;

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
      loggedInUserId!,
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

// Delete organization
export const deleteOrganization = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;

    const loggedInUserId = req.userId;

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
      loggedInUserId!,
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

    res.status(204).end(); // No content after successful deletion
  } catch (error: any) {
    next(error);
  }
};

// Get all Pending Organizations
// Will be used by an admin dashboard
export const getAllPendingOrganizations = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.userId;
    const admin = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    if (admin.accountType !== "Admin") {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission`,
        403,
        true,
      );
    }

    // Fetch the roleId for the owner role
    const { id: roleId } = await prisma.role.findUniqueOrThrow({
      where: {
        roleName: UserRole.Owner,
      },
      select: {
        id: true,
      },
    });

    const pendingOrgData = await prisma.organization.findMany({
      where: {
        status: OrganizationStatus.Pending,
      },
      // Include owner information in the results:
      include: {
        userOrganizationRoles: {
          where: {
            roleId,
          },
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc", // show oldest org requests first
      },
    });

    // Format the query data to include only the organization and owner's information
    const formattedPendingOrgData = pendingOrgData.map((data) => {
      const ownerRole = data.userOrganizationRoles[0]; // Access first element as there will always be only one owner

      // omit the user's password from the user data being sent in the response
      const ownerInfo: UserWithoutPasswordType = (({ password, ...rest }) =>
        rest)(ownerRole.user);

      // extract the org info
      const orgInfo: OrganizationType = {
        id: data.id,
        organizationName: data.organizationName,
        description: data.description,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        status: data.status,
        image: data.image,
        institutionId: data.institutionId,
      };

      return {
        organization: orgInfo,
        owner: ownerInfo,
      };
    });

    res.status(200).json({
      message: "All pending organizations retrieved successfully",
      data: formattedPendingOrgData,
    });
  } catch (error) {
    next(error);
  }
};

// Get all users who have requested to join the organization
export const getAllPendingOrgUsers = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request organization id param
    const organizationId = IdParamSchema.parse(req.params).id;

    const loggedInUserId = req.userId;

    // Check if the user has permission to view this data
    const hasPermission = await checkUserPermission(
      loggedInUserId!,
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
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            accountType: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "All pending organization users retrieved successfully",
      data: pendingOrgUsers,
    });
  } catch (error) {
    next(error);
  }
};

// Reject or approve a user's request to join an organization
export const manageMembershipRequest = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request organization id param
    const organizationId = IdParamSchema.parse(req.params).id;

    // Validate membership approval data
    const validatedMembershipApprovalData =
      OrganizationMembershipApprovalSchema.parse(req.body);

    const loggedInUserId = req.userId;

    // Check if the user has permission to approve or reject membership requests
    const hasPermission = await checkUserPermission(
      loggedInUserId!,
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
    const requestingUser = await prisma.user.findUnique({
      where: {
        id: validatedMembershipApprovalData.userId,
      },
    });

    if (!requestingUser) {
      // Throw error if the user is not found
      const notFoundError = new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `User not found`,
        404,
        true,
      );

      throw notFoundError;
    }

    // Fetch role name
    const role = await prisma.role.findUniqueOrThrow({
      where: {
        id: validatedMembershipApprovalData.roleId,
      },
    });

    // Fetch organization name (used for sending an email)
    const organization = await prisma.organization.findUniqueOrThrow({
      where: {
        id: organizationId,
      },
      select: {
        organizationName: true,
      },
    });

    // Approve the request
    if (validatedMembershipApprovalData.decision === UserOrgStatus.Approved) {
      // approve the user
      await approveUserRequest(requestingUser, organizationId, role.id);

      // Send email to notify the user
      await emailMembershipRequestApproved(
        requestingUser,
        organization.organizationName,
        role.roleName,
      );

      // Reject the request
    } else if (
      validatedMembershipApprovalData.decision === UserOrgStatus.Rejected
    ) {
      // Send email to notify the user
      await emailMembershipRequestRejected(
        requestingUser,
        organization.organizationName,
        role.roleName,
        validatedMembershipApprovalData.rejectionReason,
      );

      // reject the users membership request
      await rejectUserRequest(requestingUser, organizationId, role.id);
    }

    res.status(200).json({
      message: `Role request of user: ${requestingUser!.firstName} ${
        requestingUser!.lastName
      } for ${organization.organizationName} as a ${
        role.roleName
      } has been ${validatedMembershipApprovalData.decision.toLowerCase()}`,
    });
  } catch (error) {
    next(error);
  }
};

// Reject or approve a new organization
export const manageNewOrganizationRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // TODO: check the users system-level permissions (admin, not yet implemented)

    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;
    // Validate org approval decision
    const { decision, rejectionReason } = OrganizationApprovalSchema.parse(
      req.body,
    );

    // Check if the organization exists
    const pendingOrg = await prisma.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    if (!pendingOrg) {
      // Throw error if the organization is not found
      const notFoundError = new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Organization not found id: ${organizationId}`,
        404,
        true,
      );

      throw notFoundError;
    }

    // Fetch the organizations owner
    const userOrgRole = await prisma.userOrganizationRole.findFirst({
      where: {
        organizationId,
        role: {
          roleName: UserRole.Owner,
        },
      },
      include: {
        user: true,
        organization: true,
        // role: true,
      },
    });

    if (!userOrgRole) {
      // should never happen
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Organization owner does not exist",
        400,
        true,
      );
    }

    // Handle the request
    if (decision === OrganizationStatus.Approved) {
      // Approve the request
      await approveOrganizationRequest(
        pendingOrg.id,
        userOrgRole.user,
        userOrgRole.roleId,
      );

      // Send email to notify the user
      await emailOrganizationRequestApproved(
        userOrgRole.user,
        userOrgRole.organization.organizationName,
      );
    } else if (decision === OrganizationStatus.Rejected) {
      // Reject the request
      await rejectOrganizationRequest(pendingOrg.id, userOrgRole.user);

      // Send email to notify the user
      await emailOrganizationRequestRejected(
        userOrgRole.user,
        userOrgRole.organization.organizationName,
        rejectionReason,
      );
    }

    res.status(200).json({
      message: `Organization creation request successfully ${decision.toLowerCase()}`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user requests to join or leave an organization.

 * Based on the user's membership status:
 *    - If the user is not part of the organization it adds them as a member 
 *    - If the user is already a member (or some other role) it removes them from the organization.
 *    - Owners cannot leave their own organization.
 */
export const toggleJoinOrganization = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request organization id param
    const organizationId = IdParamSchema.parse(req.params).id;
    const loggedInUserId = req.userId;

    // Get the organization if it exists
    const existingOrganization = await getOrgById(organizationId);

    // check if the user is already a member
    // Get all of the roles a user has within an organization
    const existingUserOrgRoles = await getUserRolesInOrganization(
      loggedInUserId!,
      organizationId,
    );

    // Join the organization
    if (!existingUserOrgRoles.length) {
      // Add user to the organization as a member (no approval required for now)
      const newMemberRole = await addMemberToOrganization(
        loggedInUserId!,
        organizationId,
      );

      if (!newMemberRole) {
        throw new AppError(
          AppErrorName.INTERNAL_SERVER_ERROR,
          `Failed to add user as a member`,
          500,
          true,
        );
      }
      res.status(200).json({
        message: `User added as member to ${existingOrganization.organizationName}`,
      });
    } else {
      // Leave organization if user already has a role in the org

      // Fetch owner role
      const ownerRole = await getRoleIdFromName(UserRole.Owner);
      // check if the user is the owner of the organization
      const isOwner = existingUserOrgRoles.some(
        (userRole) => userRole.roleId === ownerRole.id,
      );
      if (isOwner) {
        return res
          .status(400)
          .json({ error: "Owner cannot leave their own organization." });
      }

      // Remove the user from the organization
      await removeUserFromOrganization(loggedInUserId!, organizationId);

      res
        .status(200)
        .json({ message: "User left the organization successfully." });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteOrganizationProfileImage = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!organization) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Organization not found",
        404,
        true,
      );
    }

    if (!organization.image) {
      throw new AppError(
        AppErrorName.FILE_DELETE_ERROR,
        "Organization does not have a profile picture",
        400,
        true,
      );
    }

    await prisma.$transaction(async (prisma) => {
      await deleteFromS3(organization.image!);
      return prisma.organization.update({
        where: { id: organizationId },
        data: {
          image: null,
        },
      });
    });

    res.status(200).json({
      message: "Profile picture removed successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

export const uploadOrgProfilePic = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;

    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    if (!organization) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Organization not found",
        404,
        true,
      );
    }

    const updatedOrganization = await prisma.$transaction(async (prisma) => {
      if (organization.image) {
        await deleteFromS3(organization.image);
      }

      const uniqueFileName = generateUniqueFileName(
        req.file!.originalname,
        organization.id,
      );
      const path = `images/profilePictures/${uniqueFileName}`;

      await UploadToS3(req.file!, path);

      return prisma.organization.update({
        where: { id: organizationId },
        data: {
          image: path,
        },
      });
    });
    res.status(200).json({
      message: "Profile picture uploaded successfully",
      data: {
        image: updatedOrganization.image,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

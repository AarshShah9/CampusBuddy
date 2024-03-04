import {
  IdParamSchema,
  OrganizationApprovalSchema,
  OrganizationCreateSchema,
  OrganizationMembershipApprovalSchema,
  OrganizationUpdateSchema,
} from "../../shared/zodSchemas";
import { NextFunction, Request, Response } from "express";
import {
  approveUserRequest,
  rejectUserRequest,
  createOrganizationWithDefaults,
  approveOrganizationRequest,
  rejectOrganizationRequest,
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

// Get all Approved Organizations
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

    res.status(200).json({ data: allOrgsByInstitution });
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

    res.status(204).end(); // No content after sucessful deletion
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
      const ownerInfo = ownerRole
        ? (({ password, ...rest }) => rest)(ownerRole.user)
        : null;

      // extract the org info
      const orgInfo = {
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
    res.status(200).json({ data: formattedPendingOrgData });
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
            username: true,
            accountType: true,
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
      message: `Role request of user: ${requestingUser!.username} for ${
        organization.organizationName
      } as a ${
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

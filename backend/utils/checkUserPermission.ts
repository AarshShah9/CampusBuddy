import { AppPermissionName, UserOrgStatus } from "@prisma/client";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "./AppError";

// Utility function for checking if the user has the required permissions for an organization
export const checkUserPermission = async (
  userId: string,
  organizationId: string,
  requiredPermission: AppPermissionName,
): Promise<boolean> => {
  try {
    // Get the user's roles in the organization if they are in good standing
    const userRoles = await prisma.userOrganizationRole.findMany({
      where: {
        userId,
        organizationId,
        status: UserOrgStatus.Approved, // user only has role's permissions if they are approved
      },
    });

    if (!userRoles.length) {
      // The user is not an approved member of the organization
      return false;
    }

    let hasPermission = false;
    // Check permissions against all roles, stopping if a match is found
    for (const userRole of userRoles) {
      const rolePermissions = await prisma.organizationRolePermission.findMany({
        where: { roleId: userRole.roleId, organizationId },
        select: { permission: { select: { permissionName: true } } },
      });

      hasPermission = rolePermissions.some(
        (rolePermission) =>
          rolePermission.permission.permissionName === requiredPermission,
      );

      if (hasPermission) {
        break; // Exit loop if permission found
      }
    }
    return hasPermission;
  } catch (error: any) {
    throw new AppError(
      AppErrorName.PRISMA_ERROR,
      `Error checking user permission: ${error.message}`,
      500,
      true,
    );
  }
};

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
    // Get the user's role in the organization if they are in good standing
    const userRole = await prisma.userOrganizationRole.findFirst({
      where: {
        userId,
        organizationId,
        status: UserOrgStatus.Approved, // user only has role's permissions if they are approved
      },
    });

    if (!userRole) {
      // The user is not an approved member of the organization
      return false;
    }

    // Retrieve the role-based permissions
    const rolePermissions = await prisma.organizationRolePermission.findMany({
      where: { roleId: userRole.roleId },
      select: { permission: { select: { permissionName: true } } },
    });

    // Check if the required permission matches any of the role permissions
    return rolePermissions.some(
      (rolePermission) =>
        rolePermission.permission.permissionName === requiredPermission,
    );
  } catch (error: any) {
    throw new AppError(
      AppErrorName.PRISMA_ERROR,
      `Error checking user permission: ${error.message}`,
      500,
      true,
    );
  }
};

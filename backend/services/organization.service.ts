import {
  UserRole,
  Organization,
  Permission,
  AppPermissionName,
} from "@prisma/client";
import prisma from "../prisma/client";
import { OrganizationCreateInput } from "@lib/schemas";
import { defaultRolePermissions } from "../constants";
import { AppError, AppErrorName } from "../utils/AppError";

// Create a new organization and add the default role permissions
// This is horrible but it works
export const createOrganizationWithDefaults = async (
  organizationData: OrganizationCreateInput,
  userId: number,
): Promise<Organization | undefined> => {
  let newOrganization: Organization | undefined;

  // Fetch default permissions from the permission table in database
  const defaultPermissions = await fetchDefaultPermissions(
    defaultRolePermissions,
  );

  // start transaction
  await prisma.$transaction(async (tx) => {
    // Create the organization
    newOrganization = await tx.organization.create({
      data: {
        ...organizationData,
      },
    });

    const newOrgId = newOrganization.id;

    // Get roleId of the Owner role
    const roleId = (
      await tx.role.findFirst({
        where: {
          roleName: UserRole.Owner,
        },
      })
    )?.id;

    if (roleId) {
      // Set the user as the owner of the organization
      await tx.userOrganizationRole.create({
        data: {
          userId,
          organizationId: newOrganization.id,
          roleId: roleId,
        },
      });
    } else {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `RoleId for ${UserRole.Owner} not found`,
        404,
        true,
      );
    }

    // associate default permissions with the newly created organization for each role
    await Promise.all(
      // promise.all used to manage concurrency due to the multiple async operations. Here we await the return of all role-related operations

      // iterate over each role and its associated permissions
      Object.entries(defaultRolePermissions).map(
        async ([roleName, permissions]) => {
          // fetch the roleId corresponding to the roleName from db
          const roleId = (
            await tx.role.findFirst({
              // need to use type assertion here so typescript knows its a valid enum key
              where: {
                roleName: UserRole[roleName as keyof typeof UserRole],
              },
            })
          )?.id;

          if (roleId && newOrganization) {
            await Promise.all(
              // await the return of all permission-related operations for a specific role
              // iterate over the permissions for the role
              permissions.map(async (permission) => {
                // fetch the permissionId corresponding the permission in current iteration
                const permissionId = defaultPermissions.find(
                  (p) => p.permissionName === permission,
                )?.id;

                if (permissionId) {
                  // create records to associate org with its roles and permissions
                  await tx.organizationRolePermission.create({
                    data: {
                      // organizationId: newOrganization?.id,
                      organizationId: newOrgId,
                      roleId,
                      permissionId,
                    },
                  });
                }
              }),
            );
          }
        },
      ),
    );
    // log success
    console.log(
      `Organization ${newOrganization.id} created with default permissions:`,
      newOrganization,
    );
  }); // end of prisma transaction
  return newOrganization;
};

// helper function to get the permission record for each value in rolePermissions
async function fetchDefaultPermissions(
  rolePermissions: Record<UserRole, readonly AppPermissionName[]>,
): Promise<Permission[]> {
  // call slice() to create shallow copy so we can deal with read only role permissions
  const allPermissions = Object.values(rolePermissions).flat().slice();
  return prisma.permission.findMany({
    where: {
      permissionName: {
        in: allPermissions,
      },
    },
  });
}

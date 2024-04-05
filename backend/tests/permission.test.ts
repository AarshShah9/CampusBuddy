import { AppPermissionName, UserOrgStatus } from "@prisma/client";
import { checkUserPermission } from "../utils/checkUserPermission";
import { prismaMock } from "../prisma/singleton";
import { AppError, AppErrorName } from "../utils/AppError";

describe("checkUserPermission", () => {
  const userId = "ha3679a0-c550-11ee-83fd-6f8d6c450910";
  const organizationId = "7d3ff6d0-c553-11ee-83fd-6f8d6c450910";
  const requiredPermission = AppPermissionName.CREATE_EVENTS;

  test("should return true if user has a role with the required permission", async () => {
    // Mock prisma to return roles with the required permission
    (prismaMock.userOrganizationRole.findMany as jest.Mock).mockResolvedValue([
      {
        userId,
        organizationId,
        roleId: "30012ed0-c5f2-11ee-83fd-6f8d6c450910",
        status: UserOrgStatus.Approved,
      },
    ]);
    (
      prismaMock.organizationRolePermission.findMany as jest.Mock
    ).mockResolvedValue([
      { permission: { permissionName: requiredPermission } },
    ]);

    const hasPermission = await checkUserPermission(
      userId,
      organizationId,
      requiredPermission,
    );
    expect(hasPermission).toBe(true);
  });

  test("should return false if user does not have a role with the required permission", async () => {
    // Mock prisma to return roles without the required permission
    (prismaMock.userOrganizationRole.findMany as jest.Mock).mockResolvedValue([
      {
        userId,
        organizationId,
        roleId: "30012ed0-c5f2-11ee-83fd-6f8d6c450910",
        status: UserOrgStatus.Approved,
      },
    ]);
    (
      prismaMock.organizationRolePermission.findMany as jest.Mock
    ).mockResolvedValue([{ permission: { permissionName: "CREATE_EVENTS" } }]);

    const hasPermission = await checkUserPermission(
      userId,
      organizationId,
      AppPermissionName.MANAGE_EVENTS,
    );
    expect(hasPermission).toBe(false);
  });

  test("should return false if user does not have any roles in the organization", async () => {
    // Mock prisma to return empty user roles
    (prismaMock.userOrganizationRole.findMany as jest.Mock).mockResolvedValue(
      [],
    );

    const hasPermission = await checkUserPermission(
      userId,
      organizationId,
      requiredPermission,
    );
    expect(hasPermission).toBe(false);
  });

  test("should throw error for Prisma error", async () => {
    (prismaMock.userOrganizationRole.findMany as jest.Mock).mockRejectedValue(
      new AppError(
        AppErrorName.PRISMA_ERROR,
        `Error checking user permission: `,
        500,
        true,
      ),
    );

    await expect(
      checkUserPermission(userId, organizationId, requiredPermission),
    ).rejects.toThrow("Error checking user permission: ");
  });
});

import { AppPermissionName, UserRole } from "@prisma/client";

// The default role permissions used when a new organization is created
//  These should be modified as neccessary. There is probably a better way of doing this
export const defaultRolePermissions: Record<
  UserRole,
  readonly AppPermissionName[]
> = {
  [UserRole.Admin]: [
    AppPermissionName.DELETE_ORGANIZATION,
    AppPermissionName.MANAGE_ORGANIZATION,
    AppPermissionName.MANAGE_MEMBERS, // could be for changing user roles, banning members
    AppPermissionName.APPROVE_MEMBER_REQUESTS,
    AppPermissionName.VIEW_ANALYTICS,
    AppPermissionName.CREATE_EVENTS,
    AppPermissionName.MANAGE_EVENTS,
    AppPermissionName.CREATE_POSTS,
    AppPermissionName.MANAGE_POSTS,
  ],
  [UserRole.Owner]: [
    // given to user who creates the organization
    AppPermissionName.DELETE_ORGANIZATION,
    AppPermissionName.MANAGE_ORGANIZATION,
    AppPermissionName.MANAGE_MEMBERS,
    AppPermissionName.APPROVE_MEMBER_REQUESTS,
    AppPermissionName.VIEW_ANALYTICS,
    AppPermissionName.CREATE_EVENTS,
    AppPermissionName.MANAGE_EVENTS,
    AppPermissionName.CREATE_POSTS,
    AppPermissionName.MANAGE_POSTS,
  ],
  [UserRole.Moderator]: [
    AppPermissionName.MANAGE_MEMBERS,
    AppPermissionName.APPROVE_MEMBER_REQUESTS,
    AppPermissionName.CREATE_EVENTS,
    AppPermissionName.MANAGE_EVENTS,
    AppPermissionName.CREATE_POSTS,
    AppPermissionName.MANAGE_POSTS,
  ],
  [UserRole.Member]: [AppPermissionName.CREATE_POSTS],
} as const; // make constant readonly

// The radius to look for events around the user (institution)
export const defaultDistance = 75;

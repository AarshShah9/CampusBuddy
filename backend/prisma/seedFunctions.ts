import { PrismaClient, User } from "@prisma/client";
import {
  comments,
  enrollments,
  events,
  eventTags,
  institutes,
  locations,
  organizationRolePermissions,
  organizations,
  permissions,
  posts,
  postTags,
  items,
  programs,
  roles,
  topics,
  topicSubscriptions,
  userEventResponses,
  userOrganizationRoles,
  users,
  images,
} from "./data";
import { hashPassword } from "../utils/hasher";

async function hashAllPasswords(users: User[]) {
  // Hash passwords before seeding
  await Promise.all(
    users.map(async (user) => {
      user.password = await hashPassword(user.password);
    }),
  );
}

export const load = async (prisma: PrismaClient) => {
  try {
    await prisma.user.deleteMany();
    console.log("Deleted records in the User table");

    await prisma.event.deleteMany();
    console.log("Deleted records in the Event table");

    await prisma.userEventResponse.deleteMany();
    console.log("Deleted records in the User Event Response table");

    await prisma.post.deleteMany();
    console.log("Deleted records in the Post table");

    await prisma.image.deleteMany();
    console.log("Deleted records in the User table");

    await prisma.item.deleteMany();
    console.log("Deleted records in the Item table");

    await prisma.comment.deleteMany();
    console.log("Deleted records in the Comment table");

    await prisma.organization.deleteMany();
    console.log("Deleted records in the Organization table");

    await prisma.userOrganizationRole.deleteMany();
    console.log("Deleted records in the User Organization Role table");

    await prisma.role.deleteMany();
    console.log("Deleted records in the Role table");

    await prisma.organizationRolePermission.deleteMany();
    console.log("Deleted records in the Organization Role Permission table");

    await prisma.permission.deleteMany();
    console.log("Deleted records in the Permission table");

    await prisma.enrollment.deleteMany();
    console.log("Deleted records in the Enrollment table");

    await prisma.program.deleteMany();
    console.log("Deleted records in the Program table");

    await prisma.topic.deleteMany();
    console.log("Deleted records in the Topic table");

    await prisma.eventTag.deleteMany();
    console.log("Deleted records in the Event Tag table");

    await prisma.postTag.deleteMany();
    console.log("Deleted records in the Post Tag table");

    await prisma.topicSubscription.deleteMany();
    console.log("Deleted records in the Topic Subscription table");

    await prisma.institution.deleteMany();
    console.log("Deleted records in the Institution table");

    await prisma.location.deleteMany();
    console.log("Deleted records in the Location table");

    await prisma.location.createMany({
      data: locations,
    });

    await prisma.institution.createMany({
      data: institutes,
    });
    console.log("Added institution data");

    await hashAllPasswords(users);
    console.log("Hashed user passwords");

    await prisma.user.createMany({
      data: users,
    });
    console.log("Added User data");

    await prisma.event.createMany({
      data: events,
    });
    console.log("Added Event data");

    await prisma.userEventResponse.createMany({
      data: userEventResponses,
    });
    console.log("Added UserEventResponses data");

    await prisma.post.createMany({
      data: posts,
    });
    console.log("Added Post data");

    await prisma.image.createMany({
      data: images,
    });
    console.log("Added Image data");

    await prisma.item.createMany({
      data: items,
    });
    console.log("Added Item data");

    await prisma.comment.createMany({
      data: comments,
    });
    console.log("Added Comment data");

    await prisma.organization.createMany({
      data: organizations,
    });
    console.log("Added Organization data");

    await prisma.role.createMany({
      data: roles,
    });
    console.log("Added Role data");

    await prisma.userOrganizationRole.createMany({
      data: userOrganizationRoles,
    });
    console.log("Added User Organization Roles data");

    await prisma.organizationRolePermission.createMany({
      data: organizationRolePermissions,
    });
    console.log("Added Organization Role Permissions data");

    await prisma.permission.createMany({
      data: permissions,
    });
    console.log("Added Permissions data");

    await prisma.enrollment.createMany({
      data: enrollments,
    });
    console.log("Added Enrollment data");

    await prisma.program.createMany({
      data: programs,
    });
    console.log("Added Program data");

    await prisma.topic.createMany({
      data: topics,
    });
    console.log("Added Topic data");

    await prisma.eventTag.createMany({
      data: eventTags,
    });
    console.log("Added Event Tag data");

    await prisma.postTag.createMany({
      data: postTags,
    });
    console.log("Added Post Tag data");

    await prisma.topicSubscription.createMany({
      data: topicSubscriptions,
    });
    console.log("Added Topic Subscription data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

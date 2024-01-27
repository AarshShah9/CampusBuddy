import { PrismaClient } from "@prisma/client";
import {
  comments,
  enrollments,
  events,
  eventTags,
  institutes,
  organizationRolePermissions,
  organizations,
  permissions,
  posts,
  postTags,
  programs,
  roles,
  topics,
  topicSubscriptions,
  userEventResponses,
  userOrganizationRoles,
  users,
} from "./data";

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.institution.deleteMany();
    console.log("Deleted records in the Institution table");

    await prisma.user.deleteMany();
    console.log("Deleted records in the User table");

    await prisma.event.deleteMany();
    console.log("Deleted records in the Event table");

    await prisma.userEventResponse.deleteMany();
    console.log("Deleted records in the User Event Response table");

    await prisma.post.deleteMany();
    console.log("Deleted records in the Post table");

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

    await prisma.$queryRaw`ALTER TABLE institution AUTO_INCREMENT = 1`;
    console.log("reset Institute auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE user AUTO_INCREMENT = 1`;
    console.log("reset User auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE event AUTO_INCREMENT = 1`;
    console.log("reset Event auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE post AUTO_INCREMENT = 1`;
    console.log("reset Post auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE comment AUTO_INCREMENT = 1`;
    console.log("reset Comment auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE organization AUTO_INCREMENT = 1`;
    console.log("reset Group auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE role AUTO_INCREMENT = 1`;
    console.log("reset Role auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE permission AUTO_INCREMENT = 1`;
    console.log("reset Permission auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE program AUTO_INCREMENT = 1`;
    console.log("reset Program auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE topic AUTO_INCREMENT = 1`;
    console.log("reset Topic auto increment to 1");

    await prisma.institution.createMany({
      data: institutes,
    });
    console.log("Added institution data");

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

    // await prisma.role.createMany({
    //     data: roles,
    // });
    // console.log('Added Role data');

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
load();

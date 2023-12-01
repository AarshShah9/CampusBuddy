const { PrismaClient } = require('@prisma/client');
const { schools,
    users,
    events,
    userEventResponses,
    posts,
    comments,
    organizations,
    userGroupRoles,
    roles,
    groupRolePermissions,
    permissions,
    enrollments,
    programs,
    topics,
    eventTags,
    postTags,
    topicSubscriptions } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.$queryRaw`DELETE FROM school`;
        console.log('Deleted records in the School table')

        await prisma.$queryRaw`DELETE FROM user`;
        console.log('Deleted records in the User table')

        await prisma.$queryRaw`DELETE FROM event`;
        console.log('Deleted records in the Event table')

        await prisma.$queryRaw`DELETE FROM user_event_response`;
        console.log('Deleted records in the User Event Response table')

        await prisma.$queryRaw`DELETE FROM post`;
        console.log('Deleted records in the Post table')

        await prisma.$queryRaw`DELETE FROM comment`;
        console.log('Deleted records in the Comment table')

        await prisma.$queryRaw`DELETE FROM organization`;
        console.log('Deleted records in the Group table')

        await prisma.$queryRaw`DELETE FROM user_group_role`;
        console.log('Deleted records in the User Group Role table')

        await prisma.$queryRaw`DELETE FROM role`;
        console.log('Deleted records in the Role table')

        await prisma.$queryRaw`DELETE FROM group_role_permission`;
        console.log('Deleted records in the Group Role Permission table')

        await prisma.$queryRaw`DELETE FROM permission`;
        console.log('Deleted records in the Permission table')

        await prisma.$queryRaw`DELETE FROM enrollment`;
        console.log('Deleted records in the Enrollment table')

        await prisma.$queryRaw`DELETE FROM Program`;
        console.log('Deleted records in the Program table')

        await prisma.$queryRaw`DELETE FROM Topic`;
        console.log('Deleted records in the Topic table')

        await prisma.$queryRaw`DELETE FROM event_tag`;
        console.log('Deleted records in the Event Tag table')

        await prisma.$queryRaw`DELETE FROM post_tag`;
        console.log('Deleted records in the Post Tag table')

        await prisma.$queryRaw`DELETE FROM topic_subscription`;
        console.log('Deleted records in the Topic Subscription table')

        await prisma.$queryRaw`ALTER TABLE school AUTO_INCREMENT = 1`;
        console.log('reset School auto increment to 1');

        await prisma.$queryRaw`ALTER TABLE user AUTO_INCREMENT = 1`;
        console.log('reset User auto increment to 1');

        await prisma.$queryRaw`ALTER TABLE event AUTO_INCREMENT = 1`;
        console.log('reset Event auto increment to 1');

        await prisma.$queryRaw`ALTER TABLE post AUTO_INCREMENT = 1`;
        console.log('reset Post auto increment to 1');

        await prisma.$queryRaw`ALTER TABLE comment AUTO_INCREMENT = 1`;
        console.log('reset Comment auto increment to 1');

        await prisma.$queryRaw`ALTER TABLE organization AUTO_INCREMENT = 1`;
        console.log('reset Group auto increment to 1');

        await prisma.$queryRaw`ALTER TABLE role AUTO_INCREMENT = 1`;
        console.log('reset Role auto increment to 1');

        await prisma.$queryRaw`ALTER TABLE permission AUTO_INCREMENT = 1`;
        console.log('reset Permission auto increment to 1');

        await prisma.$queryRaw`ALTER TABLE Program AUTO_INCREMENT = 1`;
        console.log('reset Program auto increment to 1');

        await prisma.$queryRaw`ALTER TABLE Topic AUTO_INCREMENT = 1`;
        console.log('reset Topic auto increment to 1');

        await prisma.school.createMany({
            data: schools,
        });
        console.log('Added School data');

        await prisma.user.createMany({
            data: users,
        });
        console.log('Added User data');

        await prisma.event.createMany({
            data: events,
        });
        console.log('Added Event data');

        await prisma.userEventResponse.createMany({
            data: userEventResponses,
        });
        console.log('Added UserEventResponses data');

        await prisma.post.createMany({
            data: posts,
        });
        console.log('Added post data');

        await prisma.comment.createMany({
            data: comments,
        });
        console.log('Added Comment data');

        await prisma.organization.createMany({
            data: organizations,
        });
        console.log('Added group data');

        await prisma.userGroupRole.createMany({
            data: userGroupRoles,
        });
        console.log('Added User Group Roles data');

        await prisma.role.createMany({
            data: roles,
        });
        console.log('Added Role data');

        await prisma.groupRolePermission.createMany({
            data: groupRolePermissions,
        });
        console.log('Added Group Role Permissions data');

        await prisma.permission.createMany({
            data: permissions,
        });
        console.log('Added Group Role Permissions data');

        await prisma.enrollment.createMany({
            data: enrollments,
        });
        console.log('Added enrollment data');

        await prisma.program.createMany({
            data: programs,
        });
        console.log('Added program data');

        await prisma.topic.createMany({
            data: topics,
        });
        console.log('Added Topic data');

        await prisma.eventTag.createMany({
            data: eventTags,
        });
        console.log('Added Event Tag data');

        await prisma.postTag.createMany({
            data: postTags,
        });
        console.log('Added Post Tag data');

        await prisma.topicSubscription.createMany({
            data: topicSubscriptions,
        });
        console.log('Added Topic Subscription data');


    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
};
load();
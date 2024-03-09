import {
  AppPermissionName,
  EventStatus,
  Institution,
  User,
  OrganizationStatus,
  ParticipationStatus,
  UserOrgStatus,
  UserRole,
  UserType,
} from "@prisma/client";

export const ids = {
  userIds: {
    1: "db365290-c550-11ee-83fd-6f8d6c450910",
    2: "db3679a0-c550-11ee-83fd-6f8d6c450910",
    3: "db3679a1-c550-11ee-83fd-6f8d6c450910",
    4: "db3679a2-c550-11ee-83fd-6f8d6c450910",
    5: "db3679a3-c550-11ee-83fd-6f8d6c450910",
    6: "db3679a4-c550-11ee-83fd-6f8d6c450910",
    7: "db3679a5-c550-11ee-83fd-6f8d6c450910",
    8: "db3679a6-c550-11ee-83fd-6f8d6c450910",
    9: "db3679a7-c550-11ee-83fd-6f8d6c450910",
    10: "db3679a8-c550-11ee-83fd-6f8d6c450910",
  },
  eventIds: {
    1: "79bc4af0-c551-11ee-83fd-6f8d6c450910",
    2: "79bc4af1-c551-11ee-83fd-6f8d6c450910",
    3: "79bc4af2-c551-11ee-83fd-6f8d6c450910",
    4: "79bc7200-c551-11ee-83fd-6f8d6c450910",
  },
  instituteIds: {
    1: "d1300780-c552-11ee-83fd-6f8d6c450910",
  },
  organizationIds: {
    1: "6d3ff6d0-c553-11ee-83fd-6f8d6c450910",
    2: "6d3ff6d1-c553-11ee-83fd-6f8d6c450910",
    3: "6d3ff6d2-c553-11ee-83fd-6f8d6c450910",
    4: "6d3ff6d3-c553-11ee-83fd-6f8d6c450910",
  },
  roleIds: {
    [UserRole.Owner]: "200107c0-c5f2-11ee-83fd-6f8d6c450910",
    [UserRole.Moderator]: "20012ed0-c5f2-11ee-83fd-6f8d6c450910",
    [UserRole.Member]: "20012ed1-c5f2-11ee-83fd-6f8d6c450910",
    [UserRole.Admin]: "20012ed2-c5f2-11ee-83fd-6f8d6c450910",
  },
  permissionIds: {
    [AppPermissionName.CREATE_EVENTS]: "d006dea0-c5f3-11ee-83fd-6f8d6c450910",
    [AppPermissionName.MANAGE_EVENTS]: "d006dea1-c5f3-11ee-83fd-6f8d6c450910",
    [AppPermissionName.CREATE_POSTS]: "d006dea2-c5f3-11ee-83fd-6f8d6c450910",
    [AppPermissionName.MANAGE_POSTS]: "d00705b0-c5f3-11ee-83fd-6f8d6c450910",
    [AppPermissionName.MANAGE_MEMBERS]: "d00705b1-c5f3-11ee-83fd-6f8d6c450910",
    [AppPermissionName.APPROVE_MEMBER_REQUESTS]:
      "d00705b2-c5f3-11ee-83fd-6f8d6c450910",
    [AppPermissionName.VIEW_ANALYTICS]: "d00705b3-c5f3-11ee-83fd-6f8d6c450910",
    [AppPermissionName.MANAGE_ORGANIZATION]:
      "d00705b4-c5f3-11ee-83fd-6f8d6c450910",
    [AppPermissionName.DELETE_ORGANIZATION]:
      "d0072cc0-c5f3-11ee-83fd-6f8d6c450910",
  },
  postIds: {
    1: "20909dd0-c553-11ee-83fd-6f8d6c450910",
    2: "20909dd1-c553-11ee-83fd-6f8d6c450910",
  },
  commentIds: {
    1: "37e11780-c553-11ee-83fd-6f8d6c450910",
    2: "37e11781-c553-11ee-83fd-6f8d6c450910",
  },
  programIds: {
    1: "c5ba3bc0-c5f5-11ee-83fd-6f8d6c450910",
    2: "c5ba62d0-c5f5-11ee-83fd-6f8d6c450910",
    3: "c5ba89e0-c5f5-11ee-83fd-6f8d6c450910",
    4: "c5ba89e1-c5f5-11ee-83fd-6f8d6c450910",
  },
  topicIds: {
    1: "f66fde50-c5f5-11ee-83fd-6f8d6c450910",
    2: "f6700560-c5f5-11ee-83fd-6f8d6c450910",
    3: "f6700561-c5f5-11ee-83fd-6f8d6c450910",
    4: "f6700562-c5f5-11ee-83fd-6f8d6c450910",
  },
  tagIds: {
    1: "1a574339-f3fc-49d5-8db0-564289f26c19",
    2: "1a574339-f3fc-49d5-8db0-564289f26c20",
    3: "1a574339-f3fc-49d5-8db0-564289f26c21",
    4: "1a574339-f3fc-49d5-8db0-564289f26c22",
    5: "1a574339-f3fc-49d5-8db0-564289f26c23",
    6: "1a574339-f3fc-49d5-8db0-564289f26c24",
    7: "1a574339-f3fc-49d5-8db0-564289f26c25",
    8: "1a574339-f3fc-49d5-8db0-564289f26c26",
    9: "1a574339-f3fc-49d5-8db0-564289f26c27",
    10: "1a574339-f3fc-49d5-8db0-564289f26c28",
    11: "1a574339-f3fc-49d5-8db0-564289f26c29",
    12: "1a574339-f3fc-49d5-8db0-564289f26c30",
    13: "1a574339-f3fc-49d5-8db0-564289f26c31",
    14: "1a574339-f3fc-49d5-8db0-564289f26c32",
    15: "1a574339-f3fc-49d5-8db0-564289f26c33",
    16: "1a574339-f3fc-49d5-8db0-564289f26c34",
    17: "1a574339-f3fc-49d5-8db0-564289f26c35",
    18: "1a574339-f3fc-49d5-8db0-564289f26c36",
    19: "1a574339-f3fc-49d5-8db0-564289f26c37",
    20: "1a574339-f3fc-49d5-8db0-564289f26c38",
  },
};

export const tags = [
  {
    id: ids.tagIds[1],
    name: "sports",
  },
  {
    id: ids.tagIds[2],
    name: "fitness",
  },
  {
    id: ids.tagIds[3],
    name: "culture",
  },
  {
    id: ids.tagIds[4],
    name: "theatre",
  },
  {
    id: ids.tagIds[5],
    name: "academic",
  },
  {
    id: ids.tagIds[6],
    name: "music",
  },
  {
    id: ids.tagIds[7],
    name: "community",
  },
  {
    id: ids.tagIds[8],
    name: "tech",
  },
  {
    id: ids.tagIds[9],
    name: "food",
  },
  {
    id: ids.tagIds[10],
    name: "wellness",
  },
  {
    id: ids.tagIds[11],
    name: "science",
  },
  {
    id: ids.tagIds[12],
    name: "business",
  },
  {
    id: ids.tagIds[13],
    name: "engineering",
  },
  {
    id: ids.tagIds[14],
    name: "art",
  },
  {
    id: ids.tagIds[15],
    name: "games",
  },
  {
    id: ids.tagIds[16],
    name: "social",
  },
  {
    id: ids.tagIds[17],
    name: "software",
  },
  {
    id: ids.tagIds[18],
    name: "mechanical",
  },
  {
    id: ids.tagIds[19],
    name: "electrical",
  },
  {
    id: ids.tagIds[20],
    name: "outdoors",
  },
];

export const institutes = [
  {
    id: ids.instituteIds[1],
    name: "University of Calgary",
    domain: "ucalgary.ca",
  },
];

export const users: User[] = [
  {
    id: ids.userIds[1],
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "hashed-password123",
    institutionId: ids.instituteIds[1],
    accountType: UserType.ApprovedOrg,
    profilePic: null,
  },
  {
    id: ids.userIds[2],
    username: "jane_smith",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "hashed-password4569",
    institutionId: ids.instituteIds[1],
    accountType: UserType.PendingOrg,
    profilePic: null,
  },
  {
    id: ids.userIds[3],
    username: "tom_dee",
    firstName: "Tom",
    lastName: "Dee",
    email: "tom@example.com",
    password: "hashed-password1238",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: null,
  },
  {
    id: ids.userIds[4],
    username: "CampusBuddyAdmin",
    firstName: "Aarsh",
    lastName: "Shah",
    email: "aarsh@live.ca",
    password: "password123",
    institutionId: null,
    accountType: UserType.Admin,
    profilePic: null,
  },
  {
    id: ids.userIds[5],
    username: "Wooki",
    firstName: "Wendy",
    lastName: "Kim",
    email: "wendyk@example.com",
    password: "hashed-password8893",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: null,
  },
  {
    id: ids.userIds[6],
    username: "d_smith",
    firstName: "Doug",
    lastName: "Smith",
    email: "d_smith@example.com",
    password: "hashed-password2814",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: null,
  },
  {
    id: ids.userIds[7],
    username: "k_stock",
    firstName: "Kamil",
    lastName: "Stock",
    email: "k_stock@example.com",
    password: "hashed-password7510",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: null,
  },
  {
    id: ids.userIds[8],
    username: "p_johnson",
    firstName: "Peter",
    lastName: "Johnson",
    email: "p_johnson@example.com",
    password: "hashed-password1110",
    institutionId: ids.instituteIds[1],
    accountType: UserType.PendingOrg,
    profilePic: null,
  },
  {
    id: ids.userIds[9],
    username: "g_scott",
    firstName: "Gary",
    lastName: "Scott",
    email: "g_scott@example.com",
    password: "hashed-password1111",
    institutionId: ids.instituteIds[1],
    accountType: UserType.PendingOrg,
    profilePic: null,
  },
  {
    id: ids.userIds[10],
    username: "m_galvan",
    firstName: "Michael",
    lastName: "Galvan",
    email: "m_galvan@example.com",
    password: "hashed-password1112",
    institutionId: ids.instituteIds[1],
    accountType: UserType.PendingOrg,
    profilePic: null,
  },
];

export const events = [
  {
    id: ids.eventIds[1],
    userId: ids.userIds[3],
    title: "Event 1",
    description: "First event description.",
    location: "Event Location 1",
    createdAt: "2023-10-10T09:00:00Z", // must be unique
    startTime: "2023-12-01T09:00:00Z",
    endTime: "2023-12-01T18:00:00Z",
    isPublic: true,
    status: EventStatus.NonVerified,
    // Other event details
  },
  {
    id: ids.eventIds[2],
    userId: ids.userIds[1],
    title: "Event 2",
    description: "Second event description.",
    location: "Event Location 2",
    createdAt: "2023-10-10T10:00:00Z",
    startTime: "2023-12-15T10:00:00Z",
    endTime: "2023-12-15T16:00:00Z",
    isPublic: true,
    status: EventStatus.NonVerified,
  },
  {
    id: ids.eventIds[3],
    userId: ids.userIds[4],
    title: "Event 3",
    description: "Third event description.",
    location: "Event Location 3",
    createdAt: "2023-10-10T11:00:00Z",
    startTime: "2023-12-17T10:00:00Z",
    endTime: "2023-12-17T16:00:00Z",
    isPublic: true,
    status: EventStatus.NonVerified,
  },
  {
    id: ids.eventIds[4],
    userId: ids.userIds[1],
    title: "Event 4, Verified",
    organizationId: ids.organizationIds[1],
    description: "Fourth event description.",
    location: "Event Location 4",
    createdAt: "2023-10-10T12:00:00Z",
    startTime: "2023-12-17T12:30:00Z",
    endTime: "2023-12-17T13:00:00Z",
    isPublic: true,
    status: EventStatus.Verified,
  },
];

export const userEventResponses = [
  {
    userId: ids.userIds[1],
    eventId: ids.eventIds[1],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[1],
    eventId: ids.eventIds[2],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[1],
    eventId: ids.eventIds[3],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[2],
    eventId: ids.eventIds[1],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[2],
    eventId: ids.eventIds[2],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[2],
    eventId: ids.eventIds[3],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[3],
    eventId: ids.eventIds[1],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[3],
    eventId: ids.eventIds[2],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[3],
    eventId: ids.eventIds[3],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[4],
    eventId: ids.eventIds[1],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[4],
    eventId: ids.eventIds[2],
    participationStatus: ParticipationStatus.Interested,
  },
  {
    userId: ids.userIds[4],
    eventId: ids.eventIds[3],
    participationStatus: ParticipationStatus.Interested,
  },
];

export const posts = [
  {
    id: ids.postIds[1],
    userId: ids.userIds[3],
    title: "First Post",
    text: "This is the first post!",
    createdAt: "2023-10-10T09:00:00Z",
    // Other post details
  },
  {
    id: ids.postIds[2],
    userId: ids.userIds[4],
    title: "Second Post",
    text: "Another post here!",
    createdAt: "2023-10-10T10:00:00Z",
    // Other post details
  },
];

export const comments = [
  {
    userId: ids.userIds[1],
    postId: ids.postIds[1],
    text: "This is the first comment!",
    createdAt: "2023-10-10T18:00:00Z",
    // Other post details
  },
  {
    userId: ids.userIds[2],
    postId: ids.postIds[2],
    text: "Another post here!",
    createdAt: "2023-10-10T19:00:00Z",
    // Other post details
  },
];

export const organizations = [
  {
    id: ids.organizationIds[1],
    organizationName: "Group A",
    description: "Description for Group A.",
    createdAt: "2023-06-11T02:00:00Z",
    status: OrganizationStatus.Approved,
    institutionId: ids.instituteIds[1],
  },
  {
    id: ids.organizationIds[2],
    organizationName: "Group B",
    description: "Description for Group B.",
    createdAt: "2023-07-03T14:30:00Z",
    status: OrganizationStatus.Approved,
    institutionId: ids.instituteIds[1],
  },
  {
    id: ids.organizationIds[3],
    organizationName: "Group C",
    description: "Description for Group C.",
    createdAt: "2023-07-15T10:30:00Z",
    status: OrganizationStatus.Pending,
    institutionId: ids.instituteIds[1],
  },
  {
    id: ids.organizationIds[4],
    organizationName: "Group D",
    description: "Description for Group D.",
    createdAt: "2023-07-15T11:31:00Z",
    status: OrganizationStatus.Pending,
    institutionId: ids.instituteIds[1],
  },
];

export const userOrganizationRoles = [
  {
    userId: ids.userIds[1],
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Owner],
    status: UserOrgStatus.Approved,
  },
  {
    userId: ids.userIds[2],
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    status: UserOrgStatus.Approved,
  },
  {
    userId: ids.userIds[3],
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Member],
    status: UserOrgStatus.Approved,
  },
  {
    userId: ids.userIds[4],
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Moderator],
    status: UserOrgStatus.Approved,
  },
  // banned member (student account)
  {
    userId: ids.userIds[7],
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Member],
    status: UserOrgStatus.Banned,
  },
  // pending moderator (pending org account)
  {
    userId: ids.userIds[8],
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Moderator],
    status: UserOrgStatus.Pending,
  },
  // Pending owners
  {
    userId: ids.userIds[9],
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Owner],
    status: UserOrgStatus.Pending,
  },
  {
    userId: ids.userIds[10],
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Owner],
    status: UserOrgStatus.Pending,
  },
];

export const roles = [
  {
    id: ids.roleIds[UserRole.Owner],
    roleName: UserRole.Owner,
  },
  {
    id: ids.roleIds[UserRole.Moderator],
    roleName: UserRole.Moderator,
  },
  {
    id: ids.roleIds[UserRole.Member],
    roleName: UserRole.Member,
  },
  {
    id: ids.roleIds[UserRole.Admin],
    roleName: UserRole.Admin,
  },
];

export const organizationRolePermissions = [
  // add all permissions for owner of org1
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_POSTS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_MEMBERS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.APPROVE_MEMBER_REQUESTS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.VIEW_ANALYTICS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_ORGANIZATION],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.DELETE_ORGANIZATION],
  },
  // Org 1 moderator
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_POSTS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_MEMBERS],
  },
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.APPROVE_MEMBER_REQUESTS],
  },
  // org2
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_EVENTS],
  },
];

// create the permissions array
export const permissions = Object.entries(ids.permissionIds).map(
  ([permissionName, id]: [string, string]) => ({
    permissionName: permissionName as AppPermissionName,
    id,
  }),
);

export const enrollments = [
  {
    programId: ids.programIds[1], // wrong
    userId: ids.userIds[3],
    degreeType: "Bachelor",
    yearOfStudy: 1,
  },
  {
    programId: ids.programIds[1],
    userId: ids.userIds[5],
    degreeType: "Bachelor",
    yearOfStudy: 5,
  },
  {
    programId: ids.programIds[2],
    userId: ids.userIds[5],
    degreeType: "Bachelor",
    yearOfStudy: 5,
  },
  {
    programId: ids.programIds[4],
    userId: ids.userIds[6],
    degreeType: "Bachelor",
    yearOfStudy: 4,
  },
  {
    programId: ids.programIds[4],
    userId: ids.userIds[7],
    degreeType: "Masters",
    yearOfStudy: 1,
  },
];

export const programs = [
  {
    id: ids.programIds[1],
    programName: "Computer Science",
    department: "Science Department",
    // Other program details
  },
  {
    id: ids.programIds[2],
    programName: "Business Administration",
    department: "Business Department",
    // Other program details
  },
  {
    id: ids.programIds[3],
    programName: "Engineering",
    department: "Engineering Department",
    // Other program details
  },
  {
    id: ids.programIds[4],
    programName: "Education",
    department: "Education Department",
  },
];

export const topics = [
  {
    id: ids.topicIds[1],
    topicName: "computer",
  },
  {
    id: ids.topicIds[2],
    topicName: "business",
  },
  {
    id: ids.topicIds[3],
    topicName: "engineer",
  },
  {
    id: ids.topicIds[4],
    topicName: "teacher",
  },
];

export const eventTags = [
  {
    eventId: ids.eventIds[1],
    topicId: ids.topicIds[3],
  },
  {
    eventId: ids.eventIds[2],
    topicId: ids.topicIds[4],
  },
  {
    eventId: ids.eventIds[3],
    topicId: ids.topicIds[4],
  },
];
export const postTags = [
  {
    postId: ids.postIds[1],
    topicId: ids.topicIds[2],
  },
  {
    postId: ids.postIds[2],
    topicId: ids.topicIds[1],
  },
];
export const topicSubscriptions = [
  {
    userId: ids.userIds[1],
    topicId: ids.topicIds[1],
  },
  {
    userId: ids.userIds[2],
    topicId: ids.topicIds[2],
  },
  {
    userId: ids.userIds[3],
    topicId: ids.topicIds[3],
  },
  {
    userId: ids.userIds[4],
    topicId: ids.topicIds[4],
  },
];

import {
  AppPermissionName,
  EventStatus,
  OrganizationStatus,
  UserRole,
} from "@prisma/client";

export const institutes = [
  {
    id: "1",
    name: "University of Calgary",
    domain: "ucalgary.ca",
  },
];

export const users = [
  {
    id: "1",
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "hashed-password123",
    yearOfStudy: 1,
    isVerified: true,
    institutionId: "1",
    otp: "234123",
    jwt: "",
    status: true,
  },
  {
    id: "2",
    username: "jane_smith",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "hashed-password4569",
    yearOfStudy: 2,
    isVerified: true,
    institutionId: "1",
    otp: "234123",
    jwt: "",
    status: true,
  },
  {
    id: "3",
    username: "tom_dee",
    firstName: "Tom",
    lastName: "Dee",
    email: "tom@example.com",
    password: "hashed-password1238",
    yearOfStudy: 3,
    isVerified: true,
    institutionId: "1",
    otp: "234123",
    jwt: "",
    status: true,
  },
  {
    id: "4",
    username: "tiffany_smalls",
    firstName: "Tiffany",
    lastName: "Smalls",
    email: "tiffany@example.com",
    password: "hashed-password4560",
    yearOfStudy: 4,
    isVerified: true,
    institutionId: "1",
    otp: "234123",
    jwt: "",
    status: true,
  },
];

export const events = [
  {
    id: "1",
    userId: "3",
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
    id: "2",
    userId: "1",
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
    id: "3",
    userId: "4",
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
    id: "4",
    userId: "1",
    title: "Event 4, Verified",
    organizationId: "1",
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
    userId: "1",
    eventId: "1",
    participationStatus: "Not Coming",
  },
  {
    userId: "1",
    eventId: "2",
    participationStatus: "Not Coming",
  },
  {
    userId: "1",
    eventId: "3",
    participationStatus: "Not Coming",
  },
  {
    userId: "2",
    eventId: "1",
    participationStatus: "Not Coming",
  },
  {
    userId: "2",
    eventId: "2",
    participationStatus: "Coming",
  },
  {
    userId: "2",
    eventId: "3",
    participationStatus: "Not Coming",
  },
  {
    userId: "3",
    eventId: "1",
    participationStatus: "Coming",
  },
  {
    userId: "3",
    eventId: "2",
    participationStatus: "Not Coming",
  },
  {
    userId: "3",
    eventId: "3",
    participationStatus: "Not Coming",
  },
  {
    userId: "4",
    eventId: "1",
    participationStatus: "Not Coming",
  },
  {
    userId: "4",
    eventId: "2",
    participationStatus: "Coming",
  },
  {
    userId: "4",
    eventId: "3",
    participationStatus: "Coming",
  },
];

export const posts = [
  {
    id: "1",
    userId: "3",
    title: "First Post",
    text: "This is the first post!",
    createdAt: "2023-10-10T09:00:00Z",
    // Other post details
  },
  {
    id: "2",
    userId: "4",
    title: "Second Post",
    text: "Another post here!",
    createdAt: "2023-10-10T10:00:00Z",
    // Other post details
  },
];

export const comments = [
  {
    userId: "1",
    postId: "1",
    text: "This is the first comment!",
    createdAt: "2023-10-10T18:00:00Z",
    // Other post details
  },
  {
    userId: "2",
    postId: "2",
    text: "Another post here!",
    createdAt: "2023-10-10T19:00:00Z",
    // Other post details
  },
];

export const organizations = [
  {
    id: "1",
    organizationName: "Group A",
    description: "Description for Group A.",
    createdAt: "2023-06-11T02:00:00Z",
    status: OrganizationStatus.Verified,
  },
  {
    id: "2",
    organizationName: "Group B",
    description: "Description for Group B.",
    createdAt: "2023-07-03T14:30:00Z",
    status: OrganizationStatus.Verified,
  },
];

export const userOrganizationRoles = [
  {
    userId: "1",
    organizationId: "1",
    roleId: "1",
  },
  {
    userId: "2",
    organizationId: "2",
    roleId: "2",
  },
  {
    userId: "3",
    organizationId: "1",
    roleId: "1",
  },
  {
    userId: "4",
    organizationId: "2",
    roleId: "1",
  },
];

export const roles = [
  {
    id: "1",
    roleName: UserRole.Admin,
  },
  {
    id: "2",
    roleName: UserRole.Owner,
  },
  {
    id: "3",
    roleName: UserRole.Moderator,
  },
  {
    id: "4",
    roleName: UserRole.Member,
  },
];

// should add the default role permissions

export const organizationRolePermissions = [
  {
    organizationId: "1",
    roleId: "1",
    permissionId: "1",
  },
  {
    organizationId: "2",
    roleId: "1",
    permissionId: "1",
  },
];

export const permissions = Object.values(AppPermissionName).map(
  (permissionName, key) => ({
    permissionName,
    id: key.toString(),
  }),
);

export const enrollments = [
  {
    programId: "1",
    userId: "1",
    degreeType: "Bachelor",
    yearOfStudy: 4,
    // Other enrollment details
  },
  {
    programId: "2",
    userId: "2",
    degreeType: "Bachelor",
    yearOfStudy: 2,
    // Other enrollment details
  },
  {
    programId: "3",
    userId: "3",
    degreeType: "Bachelor",
    yearOfStudy: 1,
    // Other enrollment details
  },
  {
    programId: "4",
    userId: "4",
    degreeType: "Bachelor",
    yearOfStudy: 3,
  },
];

export const programs = [
  {
    id: "1",
    programName: "Computer Science",
    department: "Science Department",
    // Other program details
  },
  {
    id: "2",
    programName: "Business Administration",
    department: "Business Department",
    // Other program details
  },
  {
    id: "3",
    programName: "Engineering",
    department: "Engineering Department",
    // Other program details
  },
  {
    id: "4",
    programName: "Education",
    department: "Education Department",
  },
];

export const topics = [
  {
    id: "1",
    topicName: "computer",
  },
  {
    id: "2",
    topicName: "business",
  },
  {
    id: "3",
    topicName: "engineer",
  },
  {
    id: "4",
    topicName: "teacher",
  },
];
export const eventTags = [
  {
    eventId: "1",
    topicId: "3",
  },
  {
    eventId: "2",
    topicId: "4",
  },
  {
    eventId: "3",
    topicId: "4",
  },
];
export const postTags = [
  {
    postId: "1",
    topicId: "2",
  },
  {
    postId: "2",
    topicId: "1",
  },
];
export const topicSubscriptions = [
  {
    userId: "1",
    topicId: "1",
  },
  {
    userId: "2",
    topicId: "2",
  },
  {
    userId: "3",
    topicId: "3",
  },
  {
    userId: "4",
    topicId: "4",
  },
];

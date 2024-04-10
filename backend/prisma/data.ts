import {
  AppPermissionName,
  EventStatus,
  OrganizationStatus,
  ParticipationStatus,
  PostType,
  State,
  User,
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
  itemIds: {
    1: "376a4ee0-e6df-11ee-bd3d-0242ac120002",
    2: "376a5160-e6df-11ee-bd3d-0242ac120002",
    3: "376a5161-e6df-11ee-bd3d-0242ac120002",
    4: "376a5162-e6df-11ee-bd3d-0242ac120002",
    5: "376a5163-e6df-11ee-bd3d-0242ac120002",
    6: "376a5164-e6df-11ee-bd3d-0242ac120002",
    7: "376a5165-e6df-11ee-bd3d-0242ac120002",
    8: "376a5166-e6df-11ee-bd3d-0242ac120002",
  },
  commentIds: {
    1: "37e11780-c553-11ee-83fd-6f8d6c450910",
    2: "37e11781-c553-11ee-83fd-6f8d6c450910",
    3: "37e11782-c553-11ee-83fd-6f8d6c450910",
    4: "37e11783-c553-11ee-83fd-6f8d6c450910",
    5: "37e11784-c553-11ee-83fd-6f8d6c450910",
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
  imageIds: {
    1: "018e6294-e53a-73b7-bf04-aca8524ebf91",
    2: "018e6295-0c32-722b-b2de-aae793e11db1",
    3: "018e6295-257e-7a2a-a393-59d51c342c24",
    4: "018e6295-3efb-7adb-8342-cf05070d31ec",
    5: "018e6295-4d4a-7a2b-9e11-0f2d8e6e1c6e",
    6: "018e6295-5b3d-7a2a-9e11-0f2d8e6e1c6e",
    7: "018e6295-6a3d-7a2a-9e11-0f2d8e6e1c6e",
    8: "018e6295-7a3d-7a2a-9e11-0f2d8e6e1c6e",
  },
};

export const locations = [
  {
    placeId: "ChIJ1T-EnwNwcVMROrZStrE7bSY",
    longitude: -114.0718831,
    latitude: 51.04473309999999,
    name: "Calgary",
  },
  {
    placeId: "ChIJT4ox6w5vcVMRZiOpVJka3KA",
    longitude: -114.1304021,
    latitude: 51.0801184,
    name: "ICT Building",
  },
];

export const institutes = [
  {
    id: ids.instituteIds[1],
    name: "University of Calgary",
    domain: "ucalgary.ca",
    locationPlaceId: locations[0].placeId,
  },
];

export const users: User[] = [
  {
    id: ids.userIds[1],
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "Hashed-password123",
    institutionId: ids.instituteIds[1],
    accountType: UserType.ApprovedOrg,
    profilePic: "https://d2epenzoyf672m.cloudfront.net/pfp/doctorstrange.webp",
    degreeName: null,
  },
  {
    id: ids.userIds[2],
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "Hashed-password4569",
    institutionId: ids.instituteIds[1],
    accountType: UserType.PendingOrg,
    profilePic: null,
    degreeName: null,
  },
  {
    id: ids.userIds[3],
    firstName: "Tom",
    lastName: "Dee",
    email: "tom@example.com",
    password: "Hashed-password1238",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: null,
    degreeName: "Computer Science",
  },
  {
    id: ids.userIds[4],
    firstName: "Aarsh",
    lastName: "Shah",
    email: "aarsh@live.ca",
    password: "password123",
    institutionId: null,
    accountType: UserType.Admin,
    profilePic: null,
    degreeName: null,
  },
  {
    id: ids.userIds[5],
    firstName: "Wendy",
    lastName: "Kim",
    email: "wendyk@example.com",
    password: "Hashed-password8893",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: null,
    degreeName: null,
  },
  {
    id: ids.userIds[6],
    firstName: "Doug",
    lastName: "Smith",
    email: "d_smith@example.com",
    password: "Hashed-password2814",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: null,
    degreeName: "Arts",
  },
  {
    id: ids.userIds[7],
    firstName: "Kamil",
    lastName: "Stock",
    email: "k_stock@example.com",
    password: "Hashed-password7510",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: null,
    degreeName: null,
  },
  {
    id: ids.userIds[8],
    firstName: "Peter",
    lastName: "Johnson",
    email: "p_johnson@example.com",
    password: "Hashed-password1110",
    institutionId: ids.instituteIds[1],
    accountType: UserType.PendingOrg,
    profilePic: null,
    degreeName: null,
  },
  {
    id: ids.userIds[9],
    firstName: "Gary",
    lastName: "Scott",
    email: "g_scott@example.com",
    password: "Hashed-password1111",
    institutionId: ids.instituteIds[1],
    accountType: UserType.PendingOrg,
    profilePic: null,
    degreeName: null,
  },
  {
    id: ids.userIds[10],
    firstName: "Michael",
    lastName: "Galvan",
    email: "m_galvan@example.com",
    password: "Hashed-password1112",
    institutionId: ids.instituteIds[1],
    accountType: UserType.PendingOrg,
    profilePic: null,
    degreeName: null,
  },
];

export const events = [
  {
    id: ids.eventIds[1],
    userId: ids.userIds[3],
    title: "Law School Info Night",
    description: "First event description.",
    locationPlaceId: locations[0].placeId,
    createdAt: "2024-10-10T09:00:00Z", // must be unique
    startTime: "2024-12-01T09:00:00Z",
    endTime: "2024-12-01T18:00:00Z",
    isPublic: true,
    status: EventStatus.NonVerified,
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/lawBook.png",
    // Other event details
  },
  {
    id: ids.eventIds[2],
    userId: ids.userIds[1],
    title: "Spikeball 4 Cause",
    description: "Second event description.",
    locationPlaceId: locations[0].placeId,
    createdAt: "2024-10-10T10:00:00Z",
    startTime: "2024-12-15T10:00:00Z",
    endTime: "2024-12-15T16:00:00Z",
    isPublic: true,
    status: EventStatus.NonVerified,
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/spikeball.jpg",
  },
  {
    id: ids.eventIds[3],
    userId: ids.userIds[4],
    title: "Event 3",
    description: "Third event description.",
    locationPlaceId: locations[0].placeId,
    createdAt: "2024-10-10T11:00:00Z",
    startTime: "2024-12-17T10:00:00Z",
    endTime: "2024-12-17T16:00:00Z",
    isPublic: true,
    status: EventStatus.NonVerified,
  },
  {
    id: ids.eventIds[4],
    userId: ids.userIds[1],
    title: "Career Fair",
    organizationId: ids.organizationIds[1],
    description: "Fourth event description.",
    locationPlaceId: locations[0].placeId,
    createdAt: "2024-10-10T12:00:00Z",
    startTime: "2024-12-17T12:30:00Z",
    endTime: "2024-12-17T13:00:00Z",
    isPublic: true,
    status: EventStatus.Verified,
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/calgaryExpo.jpg",
  },
];

export const userEventResponses = [
  {
    userId: ids.userIds[1],
    eventId: ids.eventIds[1],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[1],
    eventId: ids.eventIds[2],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[1],
    eventId: ids.eventIds[3],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[2],
    eventId: ids.eventIds[1],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[2],
    eventId: ids.eventIds[2],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[2],
    eventId: ids.eventIds[3],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[3],
    eventId: ids.eventIds[1],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[3],
    eventId: ids.eventIds[2],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[3],
    eventId: ids.eventIds[3],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[4],
    eventId: ids.eventIds[1],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[4],
    eventId: ids.eventIds[2],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[4],
    eventId: ids.eventIds[3],
    participationStatus: ParticipationStatus.Going,
  },
];

export const posts = [
  {
    id: ids.postIds[1],
    userId: ids.userIds[3],
    institutionId: ids.instituteIds[1],
    title: "First Post",
    description: "This is the first post!",
    createdAt: "2024-10-10T09:00:00Z",
    expiresAt: "2024-10-10T18:00:00Z",
    type: PostType.LookingFor,
    numberOfSpots: 5,

    // Other post details
  },
  {
    id: ids.postIds[2],
    userId: ids.userIds[4],
    institutionId: ids.instituteIds[1],
    title: "Second Post",
    description: "Another post here!",
    createdAt: "2024-10-10T10:00:00Z",
    expiresAt: "2024-10-10T19:00:00Z",
    type: PostType.LookingFor,
    numberOfSpots: 8,
    // Other post details
  },
];

export const items = [
  {
    id: ids.itemIds[1],
    userId: ids.userIds[1],
    institutionId: ids.instituteIds[1],
    title: "Old Textbooks",
    description: "Old textbooks, used for 1 semester, in good condition",
    price: 50,
    createdAt: "2024-10-10T11:00:00Z",
    condition: "Used_Good",
    locationPlaceId: locations[1].placeId,
    state: State.Available,
  },
  {
    id: ids.itemIds[2],
    userId: ids.userIds[2],
    institutionId: ids.instituteIds[1],
    title: "Air Fryer",
    description: "Brand new air fryer, never used",
    price: 30,
    createdAt: "2024-10-10T12:00:00Z",
    condition: "New",
    locationPlaceId: locations[1].placeId,
    state: State.Available,
  },
  {
    id: ids.itemIds[3],
    userId: ids.userIds[3],
    institutionId: ids.instituteIds[1],
    title: "Nintendo Switch",
    description: "Nintendo Switch, used for 2 years, in good condition",
    price: 150,
    createdAt: "2024-10-10T13:00:00Z",
    condition: "Used_Good",
    locationPlaceId: locations[1].placeId,
    state: State.Available,
  },
  {
    id: ids.itemIds[4],
    userId: ids.userIds[2],
    institutionId: ids.instituteIds[1],
    title: "Old HP Laptop",
    description: "Old HP Laptop, used for 3 years, in good condition",
    price: 75,
    createdAt: "2024-10-10T14:00:00Z",
    condition: "Used_Good",
    locationPlaceId: locations[1].placeId,
    state: State.Available,
  },
  {
    id: ids.itemIds[5],
    userId: ids.userIds[1],
    institutionId: ids.instituteIds[1],
    title: "2006 Toyota Corolla",
    description: "2006 Toyota Corolla, used for 10 years, in good condition",
    price: 1250,
    createdAt: "2024-10-10T15:00:00Z",
    condition: "Used_Good",
    locationPlaceId: locations[0].placeId,
    state: State.Available,
  },
  {
    id: ids.itemIds[6],
    userId: ids.userIds[1],
    institutionId: ids.instituteIds[1],
    title: "Old Bed",
    description: "Old Bed, used for 5 years, in good condition",
    price: 65,
    createdAt: "2024-10-10T16:00:00Z",
    condition: "Used_Good",
    locationPlaceId: locations[1].placeId,
    state: State.Available,
  },
  {
    id: ids.itemIds[7],
    userId: ids.userIds[1],
    institutionId: ids.instituteIds[1],
    title: "Old Textbooks",
    description: "Old textbooks, used for 1 semester, in good condition",
    price: 150,
    createdAt: "2024-10-10T17:00:00Z",
    condition: "Used_Good",
    locationPlaceId: locations[0].placeId,
    state: State.Available,
  },
  {
    id: ids.itemIds[8],
    userId: ids.userIds[1],
    institutionId: ids.instituteIds[1],
    title: "Ikea Lamp",
    description: "Ikea Lamp, used for 1 year, in good condition",
    price: 12,
    createdAt: "2024-10-10T18:00:00Z",
    condition: "Used_Good",
    locationPlaceId: locations[1].placeId,
    state: State.Available,
  },
];

export const images = [
  {
    id: ids.imageIds[1],
    url: "https://d2epenzoyf672m.cloudfront.net/pfp/more_textbook.jpg",
    itemId: ids.itemIds[1],
  },
  {
    id: ids.imageIds[2],
    url: "https://d2epenzoyf672m.cloudfront.net/pfp/air_fryer.png",
    itemId: ids.itemIds[2],
  },
  {
    id: ids.imageIds[3],
    url: "https://d2epenzoyf672m.cloudfront.net/pfp/nintendo_switch.jpg",
    itemId: ids.itemIds[3],
  },
  {
    id: ids.imageIds[4],
    url: "https://d2epenzoyf672m.cloudfront.net/pfp/laptop.jpg",
    itemId: ids.itemIds[4],
  },
  {
    id: ids.imageIds[5],
    url: "https://d2epenzoyf672m.cloudfront.net/pfp/toyota_corolla.jpg",
    itemId: ids.itemIds[5],
  },
  {
    id: ids.imageIds[6],
    url: "https://d2epenzoyf672m.cloudfront.net/pfp/fancy_bed.jpg",
    itemId: ids.itemIds[6],
  },
  {
    id: ids.imageIds[7],
    url: "https://d2epenzoyf672m.cloudfront.net/pfp/old_books.jpg",
    itemId: ids.itemIds[7],
  },
  {
    id: ids.imageIds[8],
    url: "https://d2epenzoyf672m.cloudfront.net/pfp/lamp.jpg",
    itemId: ids.itemIds[8],
  },
];

export const comments = [
  {
    id: ids.commentIds[1],
    userId: ids.userIds[1],
    postId: ids.postIds[1],
    content: "This is the first comment!",
    createdAt: "2024-10-10T18:00:00Z",
  },
  {
    id: ids.commentIds[2],
    userId: ids.userIds[2],
    postId: ids.postIds[1],
    content: "Cool post",
    createdAt: "2024-10-10T18:30:00Z",
  },
  {
    id: ids.commentIds[3],
    userId: ids.userIds[3],
    postId: ids.postIds[1],
    content: "Hello!",
    createdAt: "2024-10-10T18:40:00Z",
  },
  {
    id: ids.commentIds[4],
    userId: ids.userIds[2],
    postId: ids.postIds[2],
    content: "Another post here!",
    createdAt: "2024-10-10T19:00:00Z",
  },
  {
    id: ids.commentIds[5],
    userId: ids.userIds[1],
    postId: ids.postIds[2],
    content: ":D",
    createdAt: "2024-10-10T19:21:00Z",
  },
];

export const organizations = [
  {
    id: ids.organizationIds[1],
    organizationName: "Group A",
    description: "Description for Group A.",
    createdAt: "2024-06-11T02:00:00Z",
    status: OrganizationStatus.Approved,
    institutionId: ids.instituteIds[1],
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/hockey.png",
  },
  {
    id: ids.organizationIds[2],
    organizationName: "TechStart",
    description: "Description for Group B.",
    createdAt: "2024-07-03T14:30:00Z",
    status: OrganizationStatus.Approved,
    institutionId: ids.instituteIds[1],
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/techstartLogo.jpg",
  },
  {
    id: ids.organizationIds[3],
    organizationName: "Group C",
    description: "Description for Group C.",
    createdAt: "2024-07-15T10:30:00Z",
    status: OrganizationStatus.Pending,
    institutionId: ids.instituteIds[1],
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/calgaryExpo.jpg",
  },
  {
    id: ids.organizationIds[4],
    organizationName: "Group D",
    description: "Description for Group D.",
    createdAt: "2024-07-15T11:31:00Z",
    status: OrganizationStatus.Pending,
    institutionId: ids.instituteIds[1],
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/calgaryExpo.jpg",
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
  // add all default permissions for owner of org1
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
  // org 1 member -> can only create posts
  {
    organizationId: ids.organizationIds[1],
    roleId: ids.roleIds[UserRole.Member],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },

  // org2
  // add all default permissions for owner of org2
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_POSTS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_MEMBERS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.APPROVE_MEMBER_REQUESTS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.VIEW_ANALYTICS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_ORGANIZATION],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.DELETE_ORGANIZATION],
  },
  // Org 2 moderator
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_POSTS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_MEMBERS],
  },
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.APPROVE_MEMBER_REQUESTS],
  },
  // org 2 member -> can only create posts
  {
    organizationId: ids.organizationIds[2],
    roleId: ids.roleIds[UserRole.Member],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },

  // org3
  // add all default permissions for owner of org3
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_POSTS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_MEMBERS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.APPROVE_MEMBER_REQUESTS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.VIEW_ANALYTICS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_ORGANIZATION],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.DELETE_ORGANIZATION],
  },
  // Org 3 moderator
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_POSTS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_MEMBERS],
  },
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.APPROVE_MEMBER_REQUESTS],
  },
  // org 3 member -> can only create posts
  {
    organizationId: ids.organizationIds[3],
    roleId: ids.roleIds[UserRole.Member],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },

  // org4
  // add all default permissions for owner of org4
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_POSTS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_MEMBERS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.APPROVE_MEMBER_REQUESTS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.VIEW_ANALYTICS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_ORGANIZATION],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Owner],
    permissionId: ids.permissionIds[AppPermissionName.DELETE_ORGANIZATION],
  },
  // Org 4 moderator
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_EVENTS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_POSTS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.MANAGE_MEMBERS],
  },
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Moderator],
    permissionId: ids.permissionIds[AppPermissionName.APPROVE_MEMBER_REQUESTS],
  },
  // org 4 member -> can only create posts
  {
    organizationId: ids.organizationIds[4],
    roleId: ids.roleIds[UserRole.Member],
    permissionId: ids.permissionIds[AppPermissionName.CREATE_POSTS],
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

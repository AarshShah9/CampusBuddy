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
    5: "79bc7201-c551-11ee-83fd-6f8d6c450910",
    6: "79bc7202-c551-11ee-83fd-6f8d6c450910",
    7: "79bc7203-c551-11ee-83fd-6f8d6c450910",
    8: "79bc7204-c551-11ee-83fd-6f8d6c450910",
    9: "79bc7205-c551-11ee-83fd-6f8d6c450910",
    10: "79bc7206-c551-11ee-83fd-6f8d6c450910",
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
    3: "20909dd2-c553-11ee-83fd-6f8d6c450910",
    4: "20909dd3-c553-11ee-83fd-6f8d6c450910",
    5: "20909dd4-c553-11ee-83fd-6f8d6c450910",
    6: "20909dd5-c553-11ee-83fd-6f8d6c450910",
    7: "20909dd6-c553-11ee-83fd-6f8d6c450910",
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
    6: "37e11785-c553-11ee-83fd-6f8d6c450910",
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
  {
    placeId: "ChIJSSZkCAlvcVMR2yTYBUAy6l4",
    latitude: 51.0786832,
    longitude: -114.1298876,
    name: "MacEwan Hall Concerts",
  },
  {
    placeId: "ChIJ4ahvBQlvcVMRXhQo70mP-Xw",
    latitude: 51.0775973,
    longitude: -114.1298886,
    name: "Taylor Family Digital Library",
  },
  {
    placeId: "ChIJ16910gVvcVMRhNrDN1LQ0uw",
    latitude: 51.0779373,
    longitude: -114.1399387,
    name: "Field 7 University Of Calgary",
  },
  {
    placeId: "ChIJjx1MdQlvcVMR-smkkRwC9bw",
    latitude: 51.0770681,
    longitude: -114.128375,
    name: "Murray Fraser Hall",
  },
  {
    placeId: "ChIJXypBNgFwcVMR01L8X8CHXdk",
    latitude: 51.0408876,
    longitude: -114.0550099,
    name: "Cowboys Casino",
  },
  {
    placeId: "ChIJYSc47RJvcVMRFZ37s8qYTDY",
    latitude: 51.0861506,
    longitude: -114.12847,
    name: "Jamesons Pub",
  },
  {
    placeId: "ChIJqbwMe8tvcVMRimMB39Gv1-8",
    latitude: 51.0780974,
    longitude: -114.1453265,
    name: "The Canadian Brewhouse",
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
    otp: null,
    otpExpiry: null,
    firstTimeLogin: true,
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
    otp: null,
    otpExpiry: null,
    firstTimeLogin: true,
  },
  {
    id: ids.userIds[3],
    firstName: "Aarsh",
    lastName: "Shah",
    email: "aarsh.shah@ucalgary.ca",
    password: "Hashed-password1238",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: null,
    degreeName: "Computer Science",
    otp: null,
    otpExpiry: null,
    firstTimeLogin: false,
  },
  {
    id: ids.userIds[4],
    firstName: "AS",
    lastName: "Shah",
    email: "aarsh@live.ca",
    password: "password123",
    institutionId: null,
    accountType: UserType.Admin,
    profilePic: null,
    degreeName: null,
    otp: null,
    otpExpiry: null,
    firstTimeLogin: false,
  },
  {
    id: ids.userIds[5],
    firstName: "Wendy",
    lastName: "Kim",
    email: "wendyk@example.com",
    password: "Hashed-password8893",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: "https://d2epenzoyf672m.cloudfront.net/pfp/jarvis.webp",
    degreeName: null,
    otp: null,
    otpExpiry: null,
    firstTimeLogin: false,
  },
  {
    id: ids.userIds[6],
    firstName: "Doug",
    lastName: "Smith",
    email: "d_smith@example.com",
    password: "Hashed-password2814",
    institutionId: ids.instituteIds[1],
    accountType: UserType.Student,
    profilePic: "https://d2epenzoyf672m.cloudfront.net/pfp/tonystark.jpg",
    degreeName: "Arts",
    otp: null,
    otpExpiry: null,
    firstTimeLogin: false,
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
    otp: null,
    otpExpiry: null,
    firstTimeLogin: false,
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
    otp: null,
    otpExpiry: null,
    firstTimeLogin: false,
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
    otp: null,
    otpExpiry: null,
    firstTimeLogin: false,
  },
  {
    id: ids.userIds[10],
    firstName: "Michael",
    lastName: "Galvan",
    email: "m_galvan@example.com",
    password: "Hashed-password1112",
    institutionId: ids.instituteIds[1],
    accountType: UserType.ApprovedOrg,
    profilePic: null,
    degreeName: null,
    otp: null,
    otpExpiry: null,
    firstTimeLogin: false,
  },
];

export const events = [
  {
    id: ids.eventIds[1],
    userId: ids.userIds[3],
    title: "Law School Info Night",
    organizationId: ids.organizationIds[1],
    description:
      "Learn about the exciting world of law! Get all your questions answered by admissions staff, current students, and faculty. Explore the JD program, application process, and life as a law student.",
    locationPlaceId: locations[5].placeId,
    createdAt: "2024-01-10T09:00:00Z", // must be unique
    startTime: "2024-04-27T22:00:00Z", // time in UTC
    endTime: "2024-04-27T23:30:00Z",
    isPublic: true,
    status: EventStatus.Verified,
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/lawBook.png",
  },
  {
    id: ids.eventIds[2],
    userId: ids.userIds[1],
    title: "Spikeball 4 Cause",
    organizationId: ids.organizationIds[1],
    description:
      "Calling all Spikeball enthusiasts! Join us for a fun tournament where you can spike your way to victory for a good cause. All proceeds will go to Calgary Humane Society.",
    locationPlaceId: locations[4].placeId,
    createdAt: "2024-01-12T10:00:00Z",
    startTime: "2024-04-28T18:00:00Z",
    endTime: "2024-04-28T22:00:00Z",
    isPublic: true,
    status: EventStatus.Verified,
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/spikeball.jpg",
  },
  {
    id: ids.eventIds[3],
    userId: ids.userIds[4],
    title: "Hackathon 2024",
    organizationId: ids.organizationIds[2],
    description:
      "This is our annual hackathon! Feel free to sign up in app, and then join us for a weekend of coding and fun! Prizes, pizza, and all the caffeine you can handle.",
    locationPlaceId: locations[1].placeId,
    createdAt: "2024-02-10T11:00:00Z",
    startTime: "2024-05-04T15:00:00Z",
    endTime: "2024-05-05T23:00:00Z",
    isPublic: true,
    status: EventStatus.Verified,
    image:
      "https://edison365.com/wp-content/uploads/2022/03/How-do-hackathons-work.png",
  },
  {
    id: ids.eventIds[4],
    userId: ids.userIds[1],
    title: "Career Fair",
    organizationId: ids.organizationIds[1],
    description:
      "Connect with top employers and find student opportunities for a wide range of faculties. It's an excellent way to start exploring your options for part-time or summer jobs, co-op or internship positions, and even opportunities after graduation.",
    locationPlaceId: locations[2].placeId,
    createdAt: "2024-03-10T12:00:00Z",
    startTime: "2024-09-17T18:00:00Z",
    endTime: "2024-09-17T20:30:00Z",
    isPublic: true,
    status: EventStatus.Verified,
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/calgaryExpo.jpg",
  },
  {
    id: ids.eventIds[5],
    userId: ids.userIds[1],
    title: "Halloween Party",
    organizationId: ids.organizationIds[1],
    description:
      "Forget about midterms, dust off your best (or laziest) costume and get ready for a great time! Costume contest with epic prizes!",
    locationPlaceId: locations[1].placeId,
    createdAt: "2024-10-10T13:00:00Z",
    startTime: "2024-10-31T18:00:00Z",
    endTime: "2024-10-31T23:00:00Z",
    isPublic: true,
    status: EventStatus.Verified,
    image:
      "https://tlc.sndimg.com/content/dam/images/tlc/tlcme/fullset/2022/october/rx_spooky%20bash%20lead.jpg.rend.hgtvcom.616.411.suffix/1665424517308.jpeg",
  },
  {
    id: ids.eventIds[6],
    userId: ids.userIds[1],
    title: "Christmas Party",
    organizationId: ids.organizationIds[2],
    description:
      "Lets celebrate Christmas! Join us for drinks and wings at Jamesons",
    locationPlaceId: locations[7].placeId,
    createdAt: "2024-04-20T11:00:00Z",
    startTime: "2024-12-25T02:00:00Z",
    endTime: "2024-12-25T05:00:00Z",
    isPublic: true,
    status: EventStatus.Verified,
    image:
      "https://hips.hearstapps.com/hmg-prod/images/christmas-party-christmas-party-ideas-6500abe3c7c45.jpg",
  },
  {
    id: ids.eventIds[7],
    userId: ids.userIds[1],
    title: "New Year's Celebration!",
    organizationId: ids.organizationIds[3],
    description:
      "Call in the new year at Canadian Brewhouse. Enjoy live music and get 25% off all drinks",
    locationPlaceId: locations[8].placeId,
    createdAt: "2024-04-21T15:00:00Z",
    startTime: "2024-12-31T18:00:00Z",
    endTime: "2025-01-01T09:00:00Z",
    isPublic: true,
    status: EventStatus.Verified,
    image:
      "https://www.windowworld.com/uploads/images/news/new-years-eve-friends-sparklers.jpg",
  },
  {
    id: ids.eventIds[8],
    userId: ids.userIds[10],
    title: "Nursing X Engg",
    organizationId: ids.organizationIds[4],
    description:
      "Calling all Nurses and Engineers for the combination made in heaven!!!",
    locationPlaceId: locations[8].placeId,
    createdAt: "2024-04-10T15:00:00Z",
    startTime: "2024-04-27T18:00:00Z",
    endTime: "2024-04-27T09:00:00Z",
    isPublic: true,
    status: EventStatus.Verified,
    image:
      "https://www.betterup.com/hs-fs/hubfs/Dinner-With-Friends.jpg?width=957&name=Dinner-With-Friends.jpg",
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
  // nursing event
  {
    userId: ids.userIds[3],
    eventId: ids.eventIds[8],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[4],
    eventId: ids.eventIds[8],
    participationStatus: ParticipationStatus.Going,
  },
  {
    userId: ids.userIds[5],
    eventId: ids.eventIds[8],
    participationStatus: ParticipationStatus.Going,
  },
];

export const posts = [
  {
    id: ids.postIds[1],
    userId: ids.userIds[3],
    institutionId: ids.instituteIds[1],
    title: "Math 277 study group",
    description:
      "That midterm destroyed me. Lets get a group together to study in TFDL",
    createdAt: "2024-04-14T09:00:00Z",
    expiresAt: "2024-06-10T18:00:00Z",
    type: PostType.LookingFor,
    numberOfSpots: 5,
    numberOfSpotsLeft: 5,
  },
  {
    id: ids.postIds[2],
    userId: ids.userIds[3],
    institutionId: ids.instituteIds[1],
    title: "Looking for a gym buddy",
    description:
      "I'm a first year and I have never gone to the gym before. Can someone come with me and show me how not to embarass myself 🤦‍♂️ 💪",
    createdAt: "2024-04-20T10:00:00Z",
    expiresAt: "2024-05-20T20:00:00Z",
    type: PostType.LookingFor,
    numberOfSpots: 1,
    numberOfSpotsLeft: 1,
  },
  {
    id: ids.postIds[3],
    userId: ids.userIds[4],
    institutionId: ids.instituteIds[1],
    title: "Lets play ping pong",
    description:
      "The tables in engineering at the bottom of the big stairs. Msg me and we'll figure out the time",
    createdAt: "2024-04-21T10:00:00Z",
    expiresAt: "2024-06-10T19:00:00Z",
    type: PostType.LookingFor,
    numberOfSpots: 3,
    numberOfSpotsLeft: 3,
  },
  {
    id: ids.postIds[4],
    userId: ids.userIds[4],
    institutionId: ids.instituteIds[1],
    title: "Squash partner",
    description: "Lets play squash together. I've booked a court for 5pm",
    createdAt: "2024-04-22T11:00:00Z",
    expiresAt: "2024-05-11T19:00:00Z",
    type: PostType.LookingFor,
    numberOfSpots: 1,
    numberOfSpotsLeft: 1,
  },
  {
    id: ids.postIds[5],
    userId: ids.userIds[1],
    institutionId: ids.instituteIds[1],
    title: "Casual Chess Match",
    description:
      "Looking for 1 person to play chess with between noon and 1:30",
    createdAt: "2024-04-23T11:00:00Z",
    expiresAt: "2024-05-19T19:00:00Z",
    type: PostType.LookingFor,
    numberOfSpots: 1,
    numberOfSpotsLeft: 1,
  },
  {
    id: ids.postIds[6],
    userId: ids.userIds[1],
    institutionId: ids.instituteIds[1],
    title: "Found lost headphones in TFDL",
    description:
      "I found them on the fourth floor near the elevator. Msg me if you think its yours",
    createdAt: "2024-04-24T06:00:00Z",
    expiresAt: "2024-07-10T12:00:00Z",
    type: PostType.LookingFor,
  },
  {
    id: ids.postIds[7],
    userId: ids.userIds[6],
    institutionId: ids.instituteIds[1],
    title: "Disc Golf - Baker Park",
    description:
      "I'm playing disc golf with a buddy of mine at 4pm tomorrow at Baker Park. Feel free to join us!",
    createdAt: "2024-04-25T06:00:00Z",
    expiresAt: "2024-07-10T12:00:00Z",
    type: PostType.LookingFor,
    numberOfSpots: 6,
    numberOfSpotsLeft: 6,
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
    createdAt: "2024-03-10T11:00:00Z",
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
    createdAt: "2024-04-10T12:00:00Z",
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
    createdAt: "2024-04-10T13:00:00Z",
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
    createdAt: "2024-04-10T14:00:00Z",
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
    createdAt: "2024-04-10T15:00:00Z",
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
    createdAt: "2024-04-10T16:00:00Z",
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
    createdAt: "2024-04-20T17:00:00Z",
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
    createdAt: "2024-04-20T18:00:00Z",
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
    userId: ids.userIds[6],
    postId: ids.postIds[1],
    content: "Me too man, that exam killed me. ",
    createdAt: "2024-04-15T18:00:00Z",
  },
  {
    id: ids.commentIds[2],
    userId: ids.userIds[5],
    postId: ids.postIds[1],
    content: "Can my friend and I join too?",
    createdAt: "2024-04-15T18:30:00Z",
  },
  {
    id: ids.commentIds[3],
    userId: ids.userIds[1],
    postId: ids.postIds[2],
    content: "I would be happy to go with you teach you a few things",
    createdAt: "2024-04-20T19:00:00Z",
  },
  {
    id: ids.commentIds[4],
    userId: ids.userIds[3],
    postId: ids.postIds[2],
    content: "Thanks :D",
    createdAt: "2024-04-20T19:21:00Z",
  },
  {
    id: ids.commentIds[5],
    userId: ids.userIds[3],
    postId: ids.postIds[3],
    content: "I'm down for a few games",
    createdAt: "2024-04-21T18:40:00Z",
  },
  {
    id: ids.commentIds[6],
    userId: ids.userIds[3],
    postId: ids.postIds[7],
    content:
      "Do you have any discs that I could borrow? I've never played before.",
    createdAt: "2024-04-25T18:40:00Z",
  },
];

export const organizations = [
  {
    id: ids.organizationIds[1],
    organizationName: "University of Calgary",
    description:
      "University of Calgary official. The University of Calgary is a place to start something—a career, a company, a new cure, or a new skill. We're Canada's entrepreneurial university. Join us!",
    createdAt: "2024-06-11T02:00:00Z",
    status: OrganizationStatus.Approved,
    institutionId: ids.instituteIds[1],
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/hockey.png",
  },
  {
    id: ids.organizationIds[2],
    organizationName: "Tech Start UCalgary",
    description:
      "We're a software club at the University of Calgary. Through multidisciplinary teams, we take on interesting problems and use technology to solve them.",
    createdAt: "2024-07-03T14:30:00Z",
    status: OrganizationStatus.Approved,
    institutionId: ids.instituteIds[1],
    image: "https://d2epenzoyf672m.cloudfront.net/pfp/techstartLogo.jpg",
  },
  {
    id: ids.organizationIds[3],
    organizationName: "University District",
    description:
      "A community that combines residential, retail and office, shopping, dining and entertainment, with inspiring parks and breathtaking natural scenery.",
    createdAt: "2024-07-15T10:30:00Z",
    status: OrganizationStatus.Pending,
    institutionId: ids.instituteIds[1],
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTql5J8SFDJ_2CfxjvkZ75f6jTtE5UHL9ZlZAHwYUh9KA&s",
  },
  {
    id: ids.organizationIds[4],
    organizationName: "ESS",
    description:
      "The University of Calgary Engineering Student Society (ESS) works hard to ensure engineering students have the information and services they need.",
    createdAt: "2024-07-15T11:31:00Z",
    status: OrganizationStatus.Pending,
    institutionId: ids.instituteIds[1],
    image: "https://essucalgary.com/images/ess-logo.png",
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
    status: UserOrgStatus.Approved,
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

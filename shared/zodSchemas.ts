import { z } from "zod";
import { BooleanSchema } from "./utils";

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const EventStatusSchema = z.enum(["Verified", "NonVerified"]);

export const ParticipationStatusSchema = z.enum([
  "Going",
  "Interested",
  "NotInterested",
]);

export const OrganizationStatusSchema = z.enum(["Pending", "Verified"]);

export const UserRoleSchema = z.enum(["Owner", "Admin", "Moderator", "Member"]);

export const AppPermissionNameSchema = z.enum([
  "CREATE_EVENTS",
  "MANAGE_EVENTS",
  "CREATE_POSTS",
  "MANAGE_POSTS",
  "MANAGE_MEMBERS",
  "APPROVE_MEMBER_REQUESTS",
  "VIEW_ANALYTICS",
  "MANAGE_ORGANIZATION",
  "DELETE_ORGANIZATION",
]);

///////////////////////////////
// EVENT SCHEMAS
///////////////////////////////

export const EventSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  organizationId: z.string().uuid().nullable(),
  createdAt: z.coerce.date(),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, { message: "Title must contain 3 or more characters" })
    .max(255),
  description: z.string().min(3).max(255).nullable(),
  location: z.string().min(3).max(255),
  startTime: z.coerce
    .date({
      required_error: "Please select a date and time",
      invalid_type_error: "Invalid datetime string",
    })
    .refine((value) => value > new Date(), {
      message: "Start time must be in the future",
    }),
  endTime: z.coerce.date({
    required_error: "Please select a date and time",
    invalid_type_error: "Invalid datetime string",
  }),
  isPublic: BooleanSchema,
  image: z.string().nullable(),
});

export type Event = z.infer<typeof EventSchema>;

/**
 * Create Verified Event Schema
 * omit not available on EventCustomValidatorsSchema -> z.ZodEffects
 * so we apply refine constraint to enforce endTime later than startTime here
 */
export const EventCreateSchema = EventSchema.omit({
  id: true, // Default value autoincrement
  userId: true, // get from authtoken
  createdAt: true, // default value is current date, handled by the db
  image: true, // Update value after image is created
  organizationId: true, // get from req.params if creating verified event
}).refine((data) => data.endTime > data.startTime, {
  message: "End time must be later than start time.",
  path: ["endTime"],
});

export type EventCreateInput = z.infer<typeof EventCreateSchema>;

/**
 * Update Event Schema
 * partial makes all fields optional, useful for update (patch request)
 */
export const EventUpdateSchema = EventSchema.partial();

export type EventUpdateInput = z.infer<typeof EventUpdateSchema>;

///////////////////////////////
// USER SCHEMAS
///////////////////////////////

export const UserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(20),
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email address" }).min(5),
  password: z
    .string()
    .min(8, { message: "Password must be greater than 8 characters long" }),
  yearOfStudy: z.coerce
    .number()
    .min(1, { message: "Year of Study must be greater than 0" })
    .max(10, { message: "Year of Study must be less than 11" }),
  institutionId: z.string().uuid(),
  isVerified: BooleanSchema,
  profilePic: z.string().nullable(),
  otp: z.string(),
  jwt: z.string(),
  status: BooleanSchema,
});

export type User = z.infer<typeof UserSchema>;

/**
 * Update User Schema
 * partial makes all fields optional, useful for update (patch request)
 */
export const UserUpdateSchema = UserSchema.partial();

export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;

///////////////////////////////
// ORGANIZATION SCHEMAS
///////////////////////////////

export const OrganizationSchema = z.object({
  status: OrganizationStatusSchema,
  id: z.string().uuid(),
  organizationName: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
});

export type Organization = z.infer<typeof OrganizationSchema>;

// Create a new schema based on OrganizationSchema, omitting id and createdAt
export const OrganizationCreateSchema = OrganizationSchema.omit({
  id: true,
  createdAt: true,
});

export type OrganizationCreateInput = z.infer<typeof OrganizationCreateSchema>;

/////////////////////////////////////////
// SCHOOL SCHEMAS
/////////////////////////////////////////

export const SchoolSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  domain: z.string(),
});

export type School = z.infer<typeof SchoolSchema>;

/////////////////////////////////////////
// USER EVENT RESPONSE SCHEMAS
/////////////////////////////////////////

export const UserEventResponseSchema = z.object({
  userId: z.string().uuid(),
  eventId: z.string().uuid(),
  participationStatus: z.string(),
});

export type UserEventResponse = z.infer<typeof UserEventResponseSchema>;

/////////////////////////////////////////
// POST SCHEMAS
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  image: z.string().nullable(),
  organizationId: z.string().uuid().nullable(),
  createdAt: z.coerce.date(),
  title: z.string(),
  text: z.string().nullable(),
  public: z.boolean(),
});

export type Post = z.infer<typeof PostSchema>;

/////////////////////////////////////////
// COMMENT SCHEMAS
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  postId: z.string().uuid(),
  createdAt: z.coerce.date(),
  text: z.string(),
});

export type Comment = z.infer<typeof CommentSchema>;

/////////////////////////////////////////
// USER ORGANIZATION ROLE SCHEMAS
/////////////////////////////////////////

export const UserOrganizationRoleSchema = z.object({
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
  roleId: z.string().uuid(),
});

export type UserOrganizationRole = z.infer<typeof UserOrganizationRoleSchema>;

/////////////////////////////////////////
// ROLE SCHEMAS
/////////////////////////////////////////

export const RoleSchema = z.object({
  roleName: UserRoleSchema,
  id: z.string().uuid(),
});

export type Role = z.infer<typeof RoleSchema>;

/////////////////////////////////////////
// ORGANIZATION ROLE PERMISSION SCHEMAS
/////////////////////////////////////////

export const OrganizationRolePermissionSchema = z.object({
  organizationId: z.string().uuid(),
  roleId: z.string().uuid(),
  permissionId: z.string().uuid(),
});

export type OrganizationRolePermission = z.infer<
  typeof OrganizationRolePermissionSchema
>;

/////////////////////////////////////////
// PERMISSION SCHEMAS
/////////////////////////////////////////

export const PermissionSchema = z.object({
  permissionName: AppPermissionNameSchema,
  id: z.string().uuid(),
});

export type Permission = z.infer<typeof PermissionSchema>;

/////////////////////////////////////////
// ENROLLMENT SCHEMAS
/////////////////////////////////////////

export const EnrollmentSchema = z.object({
  programId: z.string().uuid(),
  userId: z.string().uuid(),
  degreeType: z.string(),
});

export type Enrollment = z.infer<typeof EnrollmentSchema>;

/////////////////////////////////////////
// PROGRAM SCHEMAS
/////////////////////////////////////////

export const ProgramSchema = z.object({
  id: z.string().uuid(),
  programName: z.string(),
  department: z.string(),
});

export type Program = z.infer<typeof ProgramSchema>;

/////////////////////////////////////////
// TOPIC SCHEMAS
/////////////////////////////////////////

export const TopicSchema = z.object({
  id: z.string().uuid(),
  topicName: z.string(),
});

export type Topic = z.infer<typeof TopicSchema>;

/////////////////////////////////////////
// EVENT TAG SCHEMAS
/////////////////////////////////////////

export const EventTagSchema = z.object({
  eventId: z.string().uuid(),
  topicId: z.string().uuid(),
});

export type EventTag = z.infer<typeof EventTagSchema>;

/////////////////////////////////////////
// POST TAG SCHEMAS
/////////////////////////////////////////

export const PostTagSchema = z.object({
  postId: z.string().uuid(),
  topicId: z.string().uuid(),
});

export type PostTag = z.infer<typeof PostTagSchema>;

/////////////////////////////////////////
// TOPIC SUBSCRIPTION SCHEMAS
/////////////////////////////////////////

export const TopicSubscriptionSchema = z.object({
  userId: z.string().uuid(),
  topicId: z.string().uuid(),
});

export type TopicSubscription = z.infer<typeof TopicSubscriptionSchema>;

///////////////////////////////
// UTILITY SCHEMAS
///////////////////////////////

// Schema for validating an ID integer parameter
export const IdParamSchema = z.object({
  id: z.coerce
    .string()
    .uuid()
    .refine((data) => data.length > 0, {
      message: "ID is invalid",
    }),
});

///////////////////////////////
// PAGINATION SCHEMAS
///////////////////////////////

const PAGINATION_DEFAULT_PAGE_SIZE = 10;

export const CursorPaginationSchema = z.object({
  cursor: z.string().optional(),
  pageSize: z.coerce.number().default(PAGINATION_DEFAULT_PAGE_SIZE),
});

export type CursorPaginationParams = z.infer<typeof CursorPaginationSchema>;

export const CursorPaginationDatetimeSchema = CursorPaginationSchema.extend({
  cursor: z.string().datetime().optional(), // overwrites cursor to add .datetime() constraint
});

export type CursorPaginationDatetimeParams = z.infer<
  typeof CursorPaginationDatetimeSchema
>;

///////////////////////////////
// INSTITUTION SCHEMAS
///////////////////////////////
export const InstitutionSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z
    .string()
    .min(3, { message: "Institution name must at least 3 characters " }),
  domain: z
    .string()
    .min(3, { message: "Institution domain must at least 3 characters " }),
});

export const createInstitutionSchema = InstitutionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const institutionNameSchema = z
  .string()
  .refine((data) => data.length > 0, {
    message: "Institution name cannot be null",
  });

export const institutionDomainSchema = z
  .string()
  .refine((data) => data.length > 0, {
    message: "Institution domain cannot be null",
  });

export const institutionIDSchema = z
  .string()
  .uuid()
  .refine((data) => data.length > 0, {
    message: "ID is invalid",
  });

///////////////////////////////
// USER SCHEMAS
///////////////////////////////
export const createUserSchema = UserSchema.omit({
  id: true,
  isVerified: true,
  otp: true,
  jwt: true,
});

export const otpRequestSchema = z.object({
  email: z.string().email().min(1, { message: "Invalid OTP" }),
});

export const otpVerifySchema = z.object({
  otp: z
    .string()
    .length(6)
    .refine((data) => data.length === 6, {
      message: "OTP is invalid",
    }),
  email: z.string().email().min(1, { message: "Invalid OTP" }),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const emailSchema = z.object({
  email: z.string(),
});

export const deleteSchema = z.object({
  userId: z.string().uuid(),
});

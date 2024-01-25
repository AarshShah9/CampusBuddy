import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { zodStringToNumberOrNull, BooleanSchema } from '@shared/utils'

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const InstitutionScalarFieldEnumSchema = z.enum(['id','name','domain','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','firstName','lastName','email','password','otp','jwt','isVerified','profilePic','institutionID']);

export const EnrollmentScalarFieldEnumSchema = z.enum(['id','userID','programID']);

export const ProgramScalarFieldEnumSchema = z.enum(['id','program','department']);

export const EventScalarFieldEnumSchema = z.enum(['id','userId','organizationId','createdAt','title','description','location','startTime','endTime','isPublic','status','image']);

export const UserEventResponseScalarFieldEnumSchema = z.enum(['userId','eventId','participationStatus']);

export const PostScalarFieldEnumSchema = z.enum(['id','userId','image','organizationId','createdAt','title','text','public']);

export const CommentScalarFieldEnumSchema = z.enum(['id','userId','postId','createdAt','text']);

export const OrganizationScalarFieldEnumSchema = z.enum(['id','organizationName','description','createdAt','status']);

export const UserOrganizationRoleScalarFieldEnumSchema = z.enum(['userId','organizationId','roleId']);

export const RoleScalarFieldEnumSchema = z.enum(['id','roleName']);

export const OrganizationRolePermissionScalarFieldEnumSchema = z.enum(['organizationId','roleId','permissionId']);

export const PermissionScalarFieldEnumSchema = z.enum(['id','permissionName']);

export const TopicScalarFieldEnumSchema = z.enum(['id','topicName']);

export const EventTagScalarFieldEnumSchema = z.enum(['eventId','topicId']);

export const PostTagScalarFieldEnumSchema = z.enum(['postId','topicId']);

export const TopicSubscriptionScalarFieldEnumSchema = z.enum(['userId','topicId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const VerificationStatusSchema = z.enum(['Pending','Verified']);

export type VerificationStatusType = `${z.infer<typeof VerificationStatusSchema>}`

export const ParticipationStatusSchema = z.enum(['Going','Interested','NotInterested']);

export type ParticipationStatusType = `${z.infer<typeof ParticipationStatusSchema>}`

export const ProgramTypeSchema = z.enum(['Bachelors','Masters']);

export type ProgramTypeType = `${z.infer<typeof ProgramTypeSchema>}`

export const FacultyNameSchema = z.enum(['Science','Arts','Schulich']);

export type FacultyNameType = `${z.infer<typeof FacultyNameSchema>}`

export const OrganizationStatusSchema = z.enum(['Pending','Verified']);

export type OrganizationStatusType = `${z.infer<typeof OrganizationStatusSchema>}`

export const UserRoleSchema = z.enum(['Owner','Admin','Moderator','Member']);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

export const AppPermissionNameSchema = z.enum(['CREATE_EVENTS','MANAGE_EVENTS','CREATE_POSTS','MANAGE_POSTS','MANAGE_MEMBERS','APPROVE_MEMBER_REQUESTS','VIEW_ANALYTICS','MANAGE_ORGANIZATION','DELETE_ORGANIZATION']);

export type AppPermissionNameType = `${z.infer<typeof AppPermissionNameSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// INSTITUTION SCHEMA
/////////////////////////////////////////

export const InstitutionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  domain: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Institution = z.infer<typeof InstitutionSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  isVerified: VerificationStatusSchema,
  id: z.string().uuid(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  otp: z.string().nullable(),
  jwt: z.string().nullable(),
  profilePic: z.string().nullable(),
  institutionID: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ENROLLMENT SCHEMA
/////////////////////////////////////////

export const EnrollmentSchema = z.object({
  id: z.string().uuid(),
  userID: z.string(),
  programID: z.string(),
})

export type Enrollment = z.infer<typeof EnrollmentSchema>

/////////////////////////////////////////
// PROGRAM SCHEMA
/////////////////////////////////////////

export const ProgramSchema = z.object({
  program: ProgramTypeSchema,
  department: FacultyNameSchema,
  id: z.string().uuid(),
})

export type Program = z.infer<typeof ProgramSchema>

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  status: ParticipationStatusSchema,
  id: z.number().int(),
  userId: z.string(),
  organizationId: zodStringToNumberOrNull.pipe(z.number().int().positive().nullable()).nullable(),
  createdAt: z.coerce.date(),
  title: z.string({ required_error: "Title is required", invalid_type_error: "Title must be a string"}).min(3, { message: "Title must contain 3 or more characters" }).max(255),
  description: z.string().min(3).max(255).nullable(),
  location: z.string().min(3).max(255),
  startTime: z.coerce.date({required_error: "Please select a date and time", invalid_type_error: "Invalid datetime string",}).refine((value) => value > new Date(), { message: 'Start time must be in the future', }),
  endTime: z.coerce.date({required_error: "Please select a date and time", invalid_type_error: "Invalid datetime string",}),
  isPublic: BooleanSchema,
  image: z.string().nullable(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// EVENT CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const EventCustomValidatorsSchema = EventSchema

export type EventCustomValidators = z.infer<typeof EventCustomValidatorsSchema>

/////////////////////////////////////////
// USER EVENT RESPONSE SCHEMA
/////////////////////////////////////////

export const UserEventResponseSchema = z.object({
  userId: z.string(),
  eventId: z.number().int(),
  participationStatus: z.string(),
})

export type UserEventResponse = z.infer<typeof UserEventResponseSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  image: z.string().nullable(),
  organizationId: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  title: z.string(),
  text: z.string().nullable(),
  public: z.boolean(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.number().int(),
  userId: z.string(),
  postId: z.number().int(),
  createdAt: z.coerce.date(),
  text: z.string(),
})

export type Comment = z.infer<typeof CommentSchema>

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  status: OrganizationStatusSchema,
  id: z.number().int(),
  organizationName: z.string(),
  description: z.string().nullable(),
  createdAt: z.coerce.date(),
})

export type Organization = z.infer<typeof OrganizationSchema>

/////////////////////////////////////////
// USER ORGANIZATION ROLE SCHEMA
/////////////////////////////////////////

export const UserOrganizationRoleSchema = z.object({
  userId: z.string(),
  organizationId: z.number().int(),
  roleId: z.number().int(),
})

export type UserOrganizationRole = z.infer<typeof UserOrganizationRoleSchema>

/////////////////////////////////////////
// ROLE SCHEMA
/////////////////////////////////////////

export const RoleSchema = z.object({
  roleName: UserRoleSchema,
  id: z.number().int(),
})

export type Role = z.infer<typeof RoleSchema>

/////////////////////////////////////////
// ORGANIZATION ROLE PERMISSION SCHEMA
/////////////////////////////////////////

export const OrganizationRolePermissionSchema = z.object({
  organizationId: z.number().int(),
  roleId: z.number().int(),
  permissionId: z.number().int(),
})

export type OrganizationRolePermission = z.infer<typeof OrganizationRolePermissionSchema>

/////////////////////////////////////////
// PERMISSION SCHEMA
/////////////////////////////////////////

export const PermissionSchema = z.object({
  permissionName: AppPermissionNameSchema,
  id: z.number().int(),
})

export type Permission = z.infer<typeof PermissionSchema>

/////////////////////////////////////////
// TOPIC SCHEMA
/////////////////////////////////////////

export const TopicSchema = z.object({
  id: z.number().int(),
  topicName: z.string(),
})

export type Topic = z.infer<typeof TopicSchema>

/////////////////////////////////////////
// EVENT TAG SCHEMA
/////////////////////////////////////////

export const EventTagSchema = z.object({
  eventId: z.number().int(),
  topicId: z.number().int(),
})

export type EventTag = z.infer<typeof EventTagSchema>

/////////////////////////////////////////
// POST TAG SCHEMA
/////////////////////////////////////////

export const PostTagSchema = z.object({
  postId: z.number().int(),
  topicId: z.number().int(),
})

export type PostTag = z.infer<typeof PostTagSchema>

/////////////////////////////////////////
// TOPIC SUBSCRIPTION SCHEMA
/////////////////////////////////////////

export const TopicSubscriptionSchema = z.object({
  userId: z.string(),
  topicId: z.number().int(),
})

export type TopicSubscription = z.infer<typeof TopicSubscriptionSchema>

import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const SchoolScalarFieldEnumSchema = z.enum(['id','name','domain']);

export const StudentScalarFieldEnumSchema = z.enum(['id','schoolID','email','username','name','password','otp','jwt','status']);

export const UserScalarFieldEnumSchema = z.enum(['id','username','firstName','lastName','email','password','pictureUrl','yearOfStudy','schoolId','isVerified','otp','jwt','status']);

export const EventScalarFieldEnumSchema = z.enum(['id','userId','organizationId','createdAt','title','description','location','startDate','endDate','mediaUrl','isPublic']);

export const UserEventResponseScalarFieldEnumSchema = z.enum(['userId','eventId','participationStatus']);

export const PostScalarFieldEnumSchema = z.enum(['id','userId','organizationId','createdAt','title','text','mediaUrl','public']);

export const CommentScalarFieldEnumSchema = z.enum(['id','userId','postId','createdAt','text']);

export const OrganizationScalarFieldEnumSchema = z.enum(['id','organizationName','description','createdAt','status']);

export const UserOrganizationRoleScalarFieldEnumSchema = z.enum(['userId','organizationId','roleId']);

export const RoleScalarFieldEnumSchema = z.enum(['id','roleName']);

export const OrganizationRolePermissionScalarFieldEnumSchema = z.enum(['organizationId','roleId','permissionId']);

export const PermissionScalarFieldEnumSchema = z.enum(['id','permissionName']);

export const EnrollmentScalarFieldEnumSchema = z.enum(['programId','userId','degreeType']);

export const ProgramScalarFieldEnumSchema = z.enum(['id','programName','department']);

export const TopicScalarFieldEnumSchema = z.enum(['id','topicName']);

export const EventTagScalarFieldEnumSchema = z.enum(['eventId','topicId']);

export const PostTagScalarFieldEnumSchema = z.enum(['postId','topicId']);

export const TopicSubscriptionScalarFieldEnumSchema = z.enum(['userId','topicId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const ParticipationStatusSchema = z.enum(['Going','Interested','NotInterested']);

export type ParticipationStatusType = `${z.infer<typeof ParticipationStatusSchema>}`

export const OrganizationStatusSchema = z.enum(['Pending','Verified']);

export type OrganizationStatusType = `${z.infer<typeof OrganizationStatusSchema>}`

export const UserRoleSchema = z.enum(['Owner','Admin','Moderator','Member']);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// SCHOOL SCHEMA
/////////////////////////////////////////

export const SchoolSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  domain: z.string(),
})

export type School = z.infer<typeof SchoolSchema>

/////////////////////////////////////////
// STUDENT SCHEMA
/////////////////////////////////////////

export const StudentSchema = z.object({
  id: z.number().int(),
  schoolID: z.number().int(),
  email: z.string(),
  username: z.string(),
  name: z.string(),
  password: z.string(),
  otp: z.string(),
  jwt: z.string(),
  status: z.boolean(),
})

export type Student = z.infer<typeof StudentSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  pictureUrl: z.string().nullable(),
  yearOfStudy: z.number().int(),
  schoolId: z.number().int(),
  isVerified: z.boolean(),
  otp: z.string(),
  jwt: z.string(),
  status: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  organizationId: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  title: z.string(),
  description: z.string().max(255).nullable(),
  location: z.string(),
  startDate: z.coerce.date().refine((value) => value > new Date(), { message: 'Start date must be in the future', }),
  endDate: z.coerce.date(),
  mediaUrl: z.string().nullable(),
  isPublic: z.boolean(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// EVENT CUSTOM VALIDATORS SCHEMA
/////////////////////////////////////////

export const EventCustomValidatorsSchema = EventSchema.refine((data) => data.endDate > data.startDate, { message: 'End date cannot be earlier than start date.', path: ['endDate'], })

export type EventCustomValidators = z.infer<typeof EventCustomValidatorsSchema>

/////////////////////////////////////////
// USER EVENT RESPONSE SCHEMA
/////////////////////////////////////////

export const UserEventResponseSchema = z.object({
  userId: z.number().int(),
  eventId: z.number().int(),
  participationStatus: z.string(),
})

export type UserEventResponse = z.infer<typeof UserEventResponseSchema>

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  organizationId: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  title: z.string(),
  text: z.string().nullable(),
  mediaUrl: z.string().nullable(),
  public: z.boolean(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// COMMENT SCHEMA
/////////////////////////////////////////

export const CommentSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
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
  userId: z.number().int(),
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
  id: z.number().int(),
  permissionName: z.string(),
})

export type Permission = z.infer<typeof PermissionSchema>

/////////////////////////////////////////
// ENROLLMENT SCHEMA
/////////////////////////////////////////

export const EnrollmentSchema = z.object({
  programId: z.number().int(),
  userId: z.number().int(),
  degreeType: z.string(),
})

export type Enrollment = z.infer<typeof EnrollmentSchema>

/////////////////////////////////////////
// PROGRAM SCHEMA
/////////////////////////////////////////

export const ProgramSchema = z.object({
  id: z.number().int(),
  programName: z.string(),
  department: z.string(),
})

export type Program = z.infer<typeof ProgramSchema>

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
  userId: z.number().int(),
  topicId: z.number().int(),
})

export type TopicSubscription = z.infer<typeof TopicSubscriptionSchema>

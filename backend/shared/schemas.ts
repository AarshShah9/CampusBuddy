import { z } from 'zod';
import * as generatedSchemas from '../prisma/generated/zod/index';

/**
 * Manually created Zod schemas
 * Schemas based off of generated schemas for consistency with database
 */

///////////////////////////////
// EVENT SCHEMAS
///////////////////////////////

// omit not available on EventCustomValidatorsSchema -> z.ZodEffects
// apply constraint for endDate later than startDate here
export const EventCreateSchema = generatedSchemas.EventSchema.omit({
    id: true,
    createdAt: true,
}).refine((data) => data.endDate > data.startDate, {
    message: 'End date cannot be earlier than start date.',
    path: ['endDate'],
});

export type EventCreateInput = z.infer<typeof EventCreateSchema>;

/**
 * Update Event Schema
 * partial makes all fields optional
 */
export const EventUpdateSchema = generatedSchemas.EventSchema.partial();

export type EventUpdateInput = z.infer<typeof EventUpdateSchema>;

///////////////////////////////
// ORGANIZATION SCHEMAS
///////////////////////////////
// Create a new schema based on OrganizationSchema, omitting id and createdAt
export const OrganizationCreateSchema =
    generatedSchemas.OrganizationSchema.omit({
        id: true,
        createdAt: true,
    });

export type OrganizationCreateInput = z.infer<typeof OrganizationCreateSchema>;

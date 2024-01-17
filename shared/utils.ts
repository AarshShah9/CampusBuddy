import { z } from 'zod';

/////////////////////////////// s
// UTILITY SCHEMAS
// Useful for validating form data
///////////////////////////////

/**
 * Zod schema for validating boolean values represented in various formats.
 *
 * This schema accepts values of the following types:
 * - Actual booleans: true or false.
 * - String literals: 'true' or 'false'.
 *
 * The transformation function ensures that the resulting value is a strict boolean (true or false).
 *
 * @example
 * ```typescript
 * const result1 = BooleanSchema.parse(true);      // Result: true
 * const result2 = BooleanSchema.parse('false');   // Result: false
 * const result3 = BooleanSchema.parse('true');    // Result: true
 * const result4 = BooleanSchema.parse('invalid'); // Throws a ZodError
 * ```
 */
export const BooleanSchema = z
    .union([z.boolean(), z.literal('true'), z.literal('false')])
    .transform((value) => value === true || value === 'true');

/**
 * Utility schema for wrapping optional number field when it may recieve a value as a string, such as from form data.
 *  z.coerce.number().nullable() defaults an empty string to 0 instead of optional (null)
 * this is because javascript Number("") returns 0
 * sage: const mySchema = zodInputStringPipe(z.number().positive('Number must be positive').nullable());
 */
export const zodStringToNumberOrNull = z
    .string()
    .transform((value) => (value === '' ? null : value.trim())) // transform empty string to null or remove whitespace
    .nullable()
    .refine((value) => value === null || !isNaN(Number(value)), {
        message: 'Invalid Number',
    })
    .transform((value) => (value === null ? null : Number(value)));

import * as zod from "zod";
import { validDomains } from "~/lib/constants";

export const PasswordSchema = zod
  .string({ required_error: "Password is required." })
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" });

export const EmailSchema = zod
  .string({ required_error: "Email is required." })
  .email({ message: "Invalid email format" })
  .max(254); // RFC 5321 max 256 with angle brackets

export const StudentRegistrationSchema = zod
  .object({
    email: EmailSchema.refine(
      (email) => {
        const domain = email.substring(email.lastIndexOf("@"));
        return validDomains.includes(domain);
      },
      { message: "Email domain is not from a valid domain" },
    ),
    institutionId: zod.string({ required_error: "School is required." }).uuid(),
    firstName: zod
      .string({ required_error: "First name is required." })
      .max(50),
    lastName: zod.string({ required_error: "Last name is required." }).max(50),
    password: PasswordSchema,
    confirmPassword: zod.string({ required_error: "Password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const OrganizationRegistrationSchema = zod
  .object({
    orgEmail: EmailSchema,
    organizationName: zod.string({
      required_error: "Organization name is required.",
    }),
    description: zod.string({
      required_error: "Description is required.",
    }),
    firstName: zod
      .string({ required_error: "First name is required." })
      .max(50, { message: "Max 50 characters" }),
    lastName: zod
      .string({ required_error: "Last name is required." })
      .max(50, { message: "Max 50 characters" }),
    institutionId: zod.string({ required_error: "School is required." }).uuid(),
    password: PasswordSchema,
    confirmPassword: zod.string({ required_error: "Password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

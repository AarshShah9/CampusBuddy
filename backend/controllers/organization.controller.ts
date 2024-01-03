import { Request, Response, NextFunction } from "express";
import { OrganizationCreateSchema } from "@lib/schemas";
import { createOrganizationWithDefaults } from "../services/organization.service";
import { AppError, AppErrorName } from "../utils/AppError";

// test Organization
export const organizationTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Organization endpoint works" });
};

// Create a new Organization
export const createNewOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // const userId = req.userId; // get userId from the request
    const userId = 1; // Placeholder
    // Validate the organization data
    const validatedOrganization = OrganizationCreateSchema.parse(req.body);

    // const validatedOrganization = OrganizationCreateSchema.safeParse(
    //     req.body
    // );
    // if (!validatedOrganization.success) {
    //     console.error(validatedOrganization.error);
    //     return res.status(400).json({
    //         message: 'Invalid input',
    //         error: validatedOrganization.error,
    //     });
    // }

    // Create the new organization
    const newOrganization = await createOrganizationWithDefaults(
      validatedOrganization,
      userId,
    );

    if (newOrganization) {
      // Organization was created successfully
      res.status(201).json({
        message: "Organization created successfully",
        data: newOrganization,
      });
    } else {
      // createOrganizationWithDefaults returned undefined, something went wrong
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Event creation returned empty result.",
        500,
        true,
      );
    }
  } catch (error) {
    next(error);
  }
};

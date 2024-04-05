import { NextFunction, Response } from "express";
import { searchSchema } from "../../shared/zodSchemas";
import prisma from "../prisma/client";
import { RequestExtended } from "../middleware/verifyAuth";

export const search = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedSearchBody = searchSchema.parse(req.body);
    const { query, page = 1, limit = 10 } = validatedSearchBody;

    const skip = ((page as number) - 1) * (limit as number);

    // Search for users
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: query as string,
            },
          },
          {
            lastName: {
              contains: query as string,
            },
          },
        ],
        AND: {
          accountType: "Student",
        },
      },
      take: limit as number,
      skip,
    });

    // Search for organizations
    const organizations = await prisma.organization.findMany({
      where: {
        organizationName: {
          contains: query as string,
        },
      },
      take: limit as number,
      skip,
    });

    // Map the results to include a type field
    const mappedUsers = users.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      image: user.profilePic,
      id: user.id,
      type: "User",
    }));

    const mappedOrganizations = organizations.map((organization) => ({
      name: organization.organizationName,
      image: organization.image,
      id: organization.id,
      type: "Organization",
    }));

    // Combine and return the results
    const results = [...mappedUsers, ...mappedOrganizations];

    res.status(200).json({
      data: results,
      message: "Search results fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

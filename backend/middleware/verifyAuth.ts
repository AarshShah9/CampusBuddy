import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../utils/validateEnv";
import prisma from "../prisma/client";
import { z } from "zod";
import { users } from "../prisma/data";

export interface RequestExtended extends Request {
  userId?: string;
}

const MyJwtPayloadSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
  institutionId: z.string().uuid(),
});

type MyJwtPayload = JwtPayload & z.infer<typeof MyJwtPayloadSchema>;

export const verifyAuthentication = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  let authToken = req.headers.authorization?.split(" ")[1] ?? "";
  const secret = env.JWT_SECRET;

  try {
    const decoded = jwt.verify(authToken, secret) as MyJwtPayload;
    const result = MyJwtPayloadSchema.parse(decoded);

    // Check if the user exists
    const userExists = await prisma.user.findUnique({
      where: {
        id: result.id,
      },
    });
    if (!userExists) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.userId = decoded.id;
    next();
    console.log("userExists", userExists);
  } catch (error) {
    console.log("Error in verifyAuth", error);
    res.status(401).send({ message: `Invalid JWT - ${error}` });
  }
};

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import prisma from "../prisma/client";
import { z } from "zod";
import { loginJwtPayloadSchema } from "../../shared/zodSchemas";

export interface RequestExtended extends Request {
  userId?: string;
}

export type loginJwtPayloadType = JwtPayload &
  z.infer<typeof loginJwtPayloadSchema>;

export const verifyAuthentication = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  let authToken = req.headers.authorization?.split(" ")[1] ?? "";
  const secret = process.env.JWT_SECRET as Secret;

  try {
    const decoded = jwt.verify(authToken, secret) as loginJwtPayloadType;
    const result = loginJwtPayloadSchema.parse(decoded);

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

    req.userId = result.id;
    next();
  } catch (error) {
    res.status(401).send({ message: `Invalid JWT - ${error}` });
  }
};

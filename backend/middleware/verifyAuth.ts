import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../utils/validateEnv";
import prisma from "../prisma/client";

export interface RequestExtended extends Request {
  userID?: string;
}

interface MyJwtPayload extends JwtPayload {
  id?: string;
  username?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  institutionName: string;
}

export const verifyAuthentication = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  let authToken = req.headers.authorization?.split(" ")[1] ?? "";
  const secret = env.JWT_SECRET;

  try {
    const decoded = jwt.verify(authToken, secret) as MyJwtPayload;
    if (decoded.id) {
      // Check if the user exists
      const userExists = await prisma.user.findUnique({
        where: {
          id: decoded.ID,
        },
      });

      if (!userExists) {
        return res.status(401).json({
          message: "User not found or invalid credentials",
        });
      }

      req.userID = decoded.id;
      next();
    } else {
      res.status(401).send({ message: "Invalid JWT: ID not found" });
    }
  } catch (error) {
    res.status(401).send({ message: "Invalid JWT" });
  }
};

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../utils/validateEnv";

export interface RequestExtended extends Request {
  userID?: string;
}

interface MyJwtPayload extends JwtPayload {
  ID?: string;
}

export const verifyAuthentication = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.cookies.authToken ?? null;
  const secret = env.JWT_SECRET;

  try {
    const decoded = jwt.verify(authToken, secret) as MyJwtPayload;
    if (decoded.ID) {
      req.userID = decoded.ID;
      next();
    } else {
      res.status(403).send("Invalid JWT: ID not found");
    }
  } catch (error) {
    res.status(403).send("Invalid JWT");
  }
};

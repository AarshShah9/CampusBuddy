import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../utils/validateEnv";

export interface RequestExtended extends Request {
  userID?: string;
}

export const verifyAuthentication = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.cookies.authToken ?? null;
  const secret = env.JWT_SECRET;

  jwt.verify(authToken, secret, (err: any, decoded: any) => {
    try {
      const decoded = jwt.verify(authToken, secret);
      const ID = decoded.ID;

      req.userID = ID;
    } catch (error) {
      res.status(403).send("Invalid JWT");
    }
  });
};

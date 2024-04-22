import { RequestExtended } from "../middleware/verifyAuth";
import { NextFunction, Response } from "express";
import prisma from "../prisma/client";
import { load } from "../prisma/seedFunctions";

export const seedDB = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    load(prisma).then(() => {
      res.status(200).json({ message: "Database seeded successfully" });
    });
  } catch (error) {
    next(error);
  }
};

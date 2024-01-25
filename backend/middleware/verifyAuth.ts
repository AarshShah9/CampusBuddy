import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';
import prisma from "../prisma/client";

export const verifyAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const userID = req.cookies.userID;
    const authToken = req.cookies.authToken;

    // check if token exists in headers
    if (authToken && userID) {
        const status = await prisma.user.findMany({
            where: {
                id: userID,
                jwt: authToken
            },
        });

        // jwt is valid
        if (status) {
            next();
        }
        else {
            res.status(401).send("Authentication token invalid");
        }
    }
    else {
        res.status(401).send("Authentication token not found");
    }
}
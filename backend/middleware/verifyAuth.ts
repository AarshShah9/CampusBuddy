import { Request, Response, NextFunction } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.cookies.authToken;

    // check if token exists in headers
    if (authToken) {

        const status = await prisma.student.findMany({
            where: {
                jwt: authToken
            }
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
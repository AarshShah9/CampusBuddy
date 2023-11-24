import { Request, Response, NextFunction } from "express";

export const verifyAuthentication = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authToken;

    // check if token exists in headers
    if (authToken) {
        // check if token is valid against specific user
        next();
    }
    else {
        res.status(401).send("Authentication token not found");
    }
}
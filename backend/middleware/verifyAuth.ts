import { Request, Response, NextFunction } from "express";

export const verifyAuthentication = (req: Request, res: Response, next: NextFunction) => {
    
    
    next();
}
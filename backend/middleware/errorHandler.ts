import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const errorHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // log the error
    console.error(error);
    const stack =
        process.env.NODE_ENV === 'development' ? error.stack : undefined; // show stack in dev environment only

    // Handle custom AppError
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message,
            stack,
        });
    }

    // Handle Zod validation error
    if (error instanceof ZodError) {
        // const formattedErrors = error.errors.map((validationError) => {
        //     return {
        //         field: validationError.path.join('.'),
        //         message: validationError.message,
        //     };
        // });
        const formattedErrors = error.errors.map((validationError) => ({
            field: validationError.path.join('.'),
            message: validationError.message,
        }));

        return res.status(400).json({
            message: 'Zod Validation error',
            details: formattedErrors,
            stack,
        });
    }

    // Handle PrismaClientKnownRequestError errors
    if (error instanceof PrismaClientKnownRequestError) {
        return res.status(500).json({
            message: 'PrismaClientKnownRequestError: ' + error.message,
            stack,
        });
    }

    // Handle any other errors
    // determine the status code and error message
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'Internal server error';
    res.status(statusCode);

    res.json({
        message: errorMessage,
        stack,
    });
};

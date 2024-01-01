import { File } from '@prisma/client';
import prisma from '../prisma/client';

import { FileCreateInput } from '@shared/schemas';
import { AppError, AppErrorName } from '../utils/AppError';

// Create a file
//      upload file to cloud storage (not implemented yet)
//      add file record to database
export const createFile = async (
    fileData: FileCreateInput,
    userId: number
): Promise<File> => {
    // TODO: Handle file upload to cloud storage and define filePath...

    try {
        const newFile = await prisma.file.create({
            data: {
                ...fileData,
                filePath: 'placeholder_path', // replace with path for cloudinary or s3
                uploadedBy: userId,
            },
        });
        if (!newFile) {
            throw new AppError(
                AppErrorName.PRISMA_ERROR,
                `Error saving file to database: File creation returned empty result.`,
                500,
                true
            );
        }
        return newFile;
    } catch (error: any) {
        throw new AppError(
            AppErrorName.PRISMA_ERROR,
            `Error saving file to database: ${error.message}`,
            500,
            true
        );
    }
};

import {Request} from 'express';
import multer from 'multer';
import path from 'path';

// Configure the file storage
const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, 'uploads'); // 'uploads' specified in index.ts
    },
    // concatenate hyphenated date string to ensure unique file name
    filename: (req: Request, file, cb) => {
        // Limit the input file name size to 50 characters
        const maxFilenameSize = 50;

        // Check if the original filename exceeds the limit
        if (file.originalname.length > maxFilenameSize) {
            const error = new Error('Filename too long');
            cb(error, '');
        } else {
            // Generate the filename by adding date string to original name
            const generatedFilename =
                new Date().toISOString().replace(/:/g, '-') +
                '-' +
                file.originalname;
            cb(null, generatedFilename);
        }
    },
});

// Configure file size limits
const limits = {
    fileSize: 1024 * 1024 * 2, // 2 MB limit
    files: 1, // 1 file upload limit
};

// Configure the allowed file formats
// Validates both the file extension and type for security
const fileFilter = (req: Request, file: any, cb: any) => {
    try {
        if (!file || !file.originalname) {
            throw new Error('Invalid file object');
        }
        const allowedExtensions = new RegExp(/\.(jpg|png|jpeg|gif)$/i);
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        const fileExtension = path.extname(file.originalname);
        const mime = file.mimetype.toLowerCase();

        if (
            allowedExtensions.test(fileExtension) &&
            allowedMimeTypes.includes(mime)
        ) {
            // accept the file
            cb(null, true);
        } else {
            // reject the file
            // cb(null, false); // reject without an error
            cb(
                new Error(
                    'Invalid file format. Please upload a valid JPEG or PNG file.'
                )
            );
        }
    } catch (error) {
        console.error(error);
        cb(new Error('An unexpected error occurred during file filtering.'));
    }
}

// add properties to multer upload instance
const upload = multer({ storage, limits, fileFilter });

/**
 * Formats a file size in bytes into a human-readable string with an appropriate unit.
 *
 * @param bytes - The file size in bytes.
 * @param [decimal=2] - The number of decimal places to include in the output (default is 2).
 * @returns A formatted string representing the file size with an appropriate unit (e.g., "1.23 MB").
 *
 */
const fileSizeFormatter = (bytes: number, decimal?: number): string => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2; // default to 2 decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];

    // calculates the appropriate size unit index
    const index = Math.floor(Math.log(bytes) / Math.log(1000));

    return convertBytesToSize(bytes, dm, index) + ' ' + sizes[index];
};

/**
 * Converts a given number of bytes to a formatted string with a specified decimal precision and size unit.
 *
 * @param {number} bytes - The number of bytes to convert.
 * @param {number} decimal - The number of decimal places to include in the output.
 * @param {number} sizeUnit - The size unit index (e.g., 0 for Bytes, 1 for KB, etc.).
 * @returns {string} A formatted string representing the converted size with the specified unit (e.g., "1.23 MB").
 * Helper function
 */
const convertBytesToSize = (
    bytes: number,
    decimal: number,
    sizeUnit: number
): string => {
    return parseFloat(
        (bytes / Math.pow(1000, sizeUnit)).toFixed(sizeUnit === 0 ? 0 : decimal)
    ).toString();
};

export { upload, fileSizeFormatter };

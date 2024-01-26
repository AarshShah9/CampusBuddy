// work around because Babel doesn't support extending from a built in class
class ExtendableError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(
    name: string,
    message: string,
    statusCode: number = 500,
    isOperational: boolean,
  ) {
    super(message);

    // ensure prototype chain is set properly
    Object.setPrototypeOf(this, ExtendableError.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

class AppError extends ExtendableError {
  constructor(
    name: string,
    message: string,
    statusCode: number,
    isOperational: boolean,
  ) {
    super(name, message, statusCode, isOperational);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

// Error names
enum AppErrorName {
  INVALID_INPUT_ERROR = "InvalidInputError",
  NOT_FOUND_ERROR = "NotFoundError",
  RECORD_EXISTS_ERROR = "RecordExistsError",
  UNAUTHORIZED_ACCESS_ERROR = "UnauthorizedAccessError",
  FILE_UPLOAD_ERROR = "FileUploadError",
  VALIDATION_ERROR = "ValidationError",
  PERMISSION_ERROR = "PermissionError",
  EMPTY_RESULT_ERROR = "EmptyResultError",
  DATABASE_ERROR = "DatabaseError",
  PRISMA_ERROR = "PrismaError",
}

export { AppError, AppErrorName };

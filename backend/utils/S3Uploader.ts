import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";
import { promisify } from "util";
import { AppError, AppErrorName } from "./AppError";
import multer from "multer";

const unlinkAsync = promisify(fs.unlink);

const UploadToS3 = async (file: Express.Multer.File, path: string) => {
  try {
    // AWS Credentials and bucket information
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
    const region = process.env.AWS_REGION!;
    const Bucket = process.env.AWS_BUCKET_NAME!;

    // Initialize S3 Client
    const s3Client = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });
    const fileStream = fs.createReadStream(file.path);

    // Create an instance of the Upload class
    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket,
        Key: path,
        Body: fileStream,
        ContentType: file.mimetype,
        ACL: "public-read",
      },
    });

    await upload.done();
    console.log("File uploaded successfully.");

    // Delete the file from local storage after successful upload
    await unlinkAsync(file.path);
    console.log("Local file deleted successfully.");
  } catch (error) {
    console.log("Error has occured in the S3 Uploader", error);
    throw new AppError(
      AppErrorName.FILE_UPLOAD_ERROR,
      "Error occurred while uploading file to S3",
      500,
      true,
    );
  }
};

const deleteFromS3 = async (path: string) => {
  try {
    // AWS Credentials and bucket information
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
    const region = process.env.AWS_REGION!;
    const Bucket = process.env.AWS_BUCKET_NAME!;

    // Initialize S3 Client
    const s3Client = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });

    // Create and send a delete object command
    const deleteCommand = new DeleteObjectCommand({
      Bucket,
      Key: path,
    });

    const response = await s3Client.send(deleteCommand);
    console.log("File deleted successfully from S3.");
  } catch (error) {
    console.error("Error occurred while deleting file from S3:", error);
    throw new AppError(
      AppErrorName.FILE_DELETE_ERROR,
      "Error occurred while deleting file from S3",
      500,
      true,
    );
  }
};

const generateUniqueFileName = (originalName: string, id: string) => {
  if (originalName.length > 100) {
    originalName = originalName.substring(0, 100);
  }

  // Create a timestamp
  const timestamp = new Date().toISOString().replace(/:/g, "-");

  // Extract the file extension
  const extension = originalName.split(".").pop();

  // Construct the unique file name
  return `${id}_${timestamp}_${originalName}`;
};

const upload = multer({ dest: "uploads/" });

export default UploadToS3;
export { generateUniqueFileName, upload, deleteFromS3 };

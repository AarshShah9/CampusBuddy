import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";
import { promisify } from "util";
import { env } from "./validateEnv";
import { AppError, AppErrorName } from "./AppError";

const unlinkAsync = promisify(fs.unlink);

const UploadToS3 = async (file: Express.Multer.File, path: string) => {
  try {
    // AWS Credentials and bucket information
    const accessKeyId = env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = env.AWS_SECRET_ACCESS_KEY;
    const region = env.AWS_REGION;
    const Bucket = env.AWS_BUCKET_NAME;

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
  return `${id}-${timestamp}_${originalName}`;
};

export default UploadToS3;
export { generateUniqueFileName };

import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";
import { promisify } from "util";
import { env } from "./validateEnv";

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

export default UploadToS3;

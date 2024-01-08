import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { env } from "./validateEnv";

const UploadToS3 = async (file: Express.Multer.File, path: string) => {
  try {
    // AWS Credentials and bucket information
    const accessKeyId = env.AWS_ACCESS_KEY_ID!;
    const secretAccessKey = env.AWS_SECRET_ACCESS_KEY!;
    const region = env.AWS_REGION!;
    const Bucket = env.AWS_BUCKET_NAME!;

    // Initialize S3 Client
    const s3Client = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });
    // Create an instance of the Upload class
    const uploader = new Upload({
      client: s3Client,
      params: {
        Bucket,
        Key: path,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      },
    });
  } catch (error) {
    console.log("Error has occured in the S3 Uploader", error);
  }
};

export default UploadToS3;

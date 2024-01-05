import {Upload} from "@aws-sdk/lib-storage";
import {S3Client} from "@aws-sdk/client-s3";

// AWS Credentials and bucket information
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const Bucket = process.env.AWS_BUCKET_NAME;

if (!accessKeyId || !secretAccessKey || !region || !Bucket) {
    throw new Error('AWS Credentials and bucket information are required, the error is in backend\\util\\S3Uploader.ts');
}

const UploadToS3 = async (file: Express.Multer.File, path: string) => {
    // Initialize S3 Client
    const s3Client = new S3Client({
        credentials: {
            accessKeyId,
            secretAccessKey
        },
        region
    });
        // Create an instance of the Upload class
        const uploader = new Upload({
            client: s3Client,
            params: {
                Bucket,
                Key: path,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
            }
        });
};

export default UploadToS3;
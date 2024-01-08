import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import school from "./routes/school.routes";
import student from "./routes/user.routes";
import UploadToS3 from "./utils/S3Uploader";
// import { upload } from "./utils/fileUpload";
import multer from "multer";
import { env, validateEnv } from "./utils/validateEnv";

const app = express();
const upload = multer({ dest: "uploads/" });
const result = dotenv.config();

try {
  // Validates the Env file
  validateEnv(process.env);
  console.log("ENV FILE: ", env);
} catch (error) {
  throw new Error("Failed to validate environment variables");
}

const port = env.PORT;
const ip = env.IP_ADDRESS ?? "localhost";

// middleware
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  }),
);

app.use(express.json()); // parsing JSON in the request body
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // parsing URL-encoded form data
app.use("/api/upload", express.static(path.join(__dirname, "uploads"))); // file upload path

// routes
app.use("/api", student);
app.use("/api", school);

app.get("/Test", (req: Request, res: Response) => {
  console.log("The backend is hit");
  res.json({ message: "Hello World!" });
});

app.post(
  "/api/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    try {
      console.log(req.file.originalname);
      const path = `new/path/${req.file.originalname}`;
      await UploadToS3(req.file, path);
      console.log("Success HERE");
      res.status(200).send("File uploaded successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error uploading the file");
    }
  },
);

// server start
const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

export default app;
export { server };

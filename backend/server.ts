import ngrok from "@ngrok/ngrok";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { errorHandler } from "./middleware/errorHandler";
import event from "./routes/event.routes";
import institution from "./routes/institution.routes";
import user from "./routes/user.routes";
import org from "./routes/org.routes";
import UploadToS3 from "./utils/S3Uploader";
import { env, validateEnv } from "./utils/validateEnv";

const app = express();
const upload = multer({ dest: "uploads/" });
const result = dotenv.config();

try {
  // Validates the Env file
  validateEnv(process.env);
} catch (error) {
  throw new Error("Failed to validate environment variables" + error);
}

const port = env.PORT;

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
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Content-Type", "application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

// routes
app.use("/api/user", user);
app.use("/api/institution", institution);
app.use("/api/events", event);
app.use("/api/orgs", org);

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

      // Would need to generate a proper path here
      const path = `new/path/${req.file.originalname}`;
      await UploadToS3(req.file, path);
      res.status(200).send("File uploaded successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error uploading the file");
    }
  },
);

// Global error handling middleware - Must be the last middleware
app.use(errorHandler);

// server start
const server = app.listen(5000, () => {
  console.log(`App listening at http://localhost:${port} !`);
});

if (env.ENV === "dev") {
  ngrok
    .forward({
      addr: port,
      authtoken: env.NGROK_AUTHTOKEN,
      domain: env.URL,
      schemes: ["http", "https"],
    })
    .then((listener) =>
      console.log(`Ingress established at: ${listener.url()}`),
    );
}
export default app;
export { server };

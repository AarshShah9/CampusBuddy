import ngrok from "@ngrok/ngrok";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { errorHandler } from "./middleware/errorHandler";
import event from "./routes/event.routes";
import institution from "./routes/institution.routes";
import user from "./routes/user.routes";
import org from "./routes/org.routes";
import post from "./routes/post.routes";
import item from "./routes/item.routes";
import profile from "./routes/profile.routes";
import notification from "./routes/notification.routes";
import moderation from "./routes/moderation.routes";
import search from "./routes/search.routes";
import tag from "./routes/tag.routes";
import { validateEnv } from "./utils/validateEnv";
import { upcomingEventReminderTask } from "./utils/cronTasks";
import { initializeApp } from "firebase-admin/app";
import * as admin from "firebase-admin";
import seed from "./routes/seed.route";

const app = express();
const result = dotenv.config();

try {
  // Validates the Env file
  validateEnv(process.env);
} catch (error) {
  throw new Error("Failed to validate environment variables" + error);
}

// const serviceAccountKeyString = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
// if (!serviceAccountKeyString) {
//   throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY environment variable not found");
// }
// const serviceAccountKey = JSON.parse(serviceAccountKeyString);
// // Initialize firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
// });

const port = process.env.PORT;

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
app.use("/api/upload", express.static(path.join(__dirname, "uploads"))); // file upload path - deprecated
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
app.use("/api/post", post);
app.use("/api/item", item);
app.use("/api/profile", profile);
app.use("/api/notification", notification);
app.use("/api/moderation", moderation);
app.use("/api/search", search);
app.use("/api/seed", seed);
app.use("/api/tags", tag);

app.get("/Test", (req: Request, res: Response) => {
  console.log("The backend is hit");
  res.json({ message: "Hello World!" });
});

// Global error handling middleware - Must be the last middleware
app.use(errorHandler);

// Start task to send out event reminders
if (process.env.ENV !== "GA") {
  console.log("Starting CRON Job");
  upcomingEventReminderTask.start();
}

// server start
const server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

if (process.env.ENV === "dev") {
  ngrok
    .forward({
      addr: port,
      authtoken: process.env.NGROK_AUTHTOKEN,
      domain: process.env.URL,
      schemes: ["http", "https"],
    })
    .then((listener) =>
      console.log(`Ingress established at: ${listener.url()}`),
    );
}

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  server.close();
  process.exit(0);
});

export default app;
export { server };

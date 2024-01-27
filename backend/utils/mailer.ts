import nodemailer from "nodemailer";
import { env } from "./validateEnv";

const config = {
  service: "gmail",
  auth: {
    user: env.MAILER_EMAIL,
    pass: env.MAILER_PASS,
  },
};

const transporter = nodemailer.createTransport(config);

export default transporter;

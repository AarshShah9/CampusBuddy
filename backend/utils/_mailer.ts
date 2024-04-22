import nodemailer from "nodemailer";

const config = {
  service: "gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASS,
  },
};

const _transporter = nodemailer.createTransport(config);

export default _transporter;

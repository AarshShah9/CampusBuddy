import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

type SendMailProps = {
  to: string;
  from?: string;
  subject: string;
  text?: string;
  html: string;
};

const sendMail = async ({ to, subject, text, html }: SendMailProps) => {
  const msg = {
    to,
    from: process.env.SENDGRID_EMAIL!,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};

const transporter = {
  sendMail,
};

export default transporter;

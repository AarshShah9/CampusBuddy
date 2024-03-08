import * as z from "zod";

const envSchema = z.object({
  URL: z.string(),
  DATABASE_URL: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
  PORT: z.string(),
  NGROK_AUTHTOKEN: z.string(),
  ENV: z.string(),
  JWT_SECRET: z.string(),
  MAILER_EMAIL: z.string(),
  MAILER_PASS: z.string(),
  GOOGLE_MAPS_API_KEY: z.string(),
  // Add more environment variables as needed
});

type EnvType = z.infer<typeof envSchema>;

const validateEnv = (config: Record<string, unknown>): EnvType => {
  return envSchema.parse(config);
};

const env = {
  URL: process.env.URL!,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
  AWS_REGION: process.env.AWS_REGION!,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME!,
  PORT: process.env.PORT ?? "3000",
  ENV: process.env.ENV!,
  NGROK_AUTHTOKEN: process.env.NGROK_AUTHTOKEN!,
  JWT_SECRET: process.env.JWT_SECRET!,
  MAILER_EMAIL: process.env.MAILER_EMAIL!,
  MAILER_PASS: process.env.MAILER_PASS!,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY!,
};

export { env, validateEnv };

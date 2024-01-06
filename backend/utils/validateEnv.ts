import * as z from "zod";

const envSchema = z.object({
  IP_ADDRESS: z.string(),
  DATABASE_URL: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
  // Add more environment variables as needed
});

type EnvType = z.infer<typeof envSchema>;

const validateEnv = (config: Record<string, unknown>): EnvType => {
  return envSchema.parse(config);
};

const env = {
  IP_ADDRESS: process.env.IP_ADDRESS!,
};

export { env, validateEnv };

// this file is used to get environment variables and validate them using zod.
// whenever you add a new environment variable, make sure to update this file.
import { z } from "zod";

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
  NEXT_AUTH_SECRET: z.string().min(1, "NEXT_AUTH_SECRET is required"),
  DB_URL: z.string().url("DB_URL must be a valid URL"),
})

export const env = envSchema.parse({
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET || "",
  DB_URL: process.env.DB_URL || "",
})

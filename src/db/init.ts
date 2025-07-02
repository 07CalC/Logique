import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema"

export const db = drizzle(env.DB_URL, {
  schema: { ...schema }
});

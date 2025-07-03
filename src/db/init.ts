// this file exports the db instance
// do no touch this until its very important (dont touch)
import { env } from "@/lib/env";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/db/schema"

export const db = drizzle(env.DB_URL, {
  schema: { ...schema }
});

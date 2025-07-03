// drizzle config
// do not touch this until its very important (dont touch)
import { env } from "@/lib/env"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dbCredentials: {
    url: env.DB_URL
  },
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
})

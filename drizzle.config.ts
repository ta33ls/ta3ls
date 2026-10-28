import { defineConfig } from "drizzle-kit";
import { normalizePostgresUrl } from "./src/lib/db-url";

const databaseUrl = process.env.DATABASE_URL_UNPOOLED;

if (!databaseUrl) {
  throw new Error("DATABASE_URL_UNPOOLED is not set");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: normalizePostgresUrl(databaseUrl),
  },
});

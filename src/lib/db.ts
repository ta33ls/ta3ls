import "server-only";
import { attachDatabasePool } from "@vercel/functions";
import { Pool } from "pg";
import { normalizePostgresUrl } from "@/lib/db-url";

const rawConnectionString = process.env.DATABASE_URL;

if (!rawConnectionString) {
  throw new Error(
    "DATABASE_URL is not set. Run `neon deploy` or add it to .env.local."
  );
}

const connectionString = normalizePostgresUrl(rawConnectionString);

const globalForDb = globalThis as unknown as {
  ta3lsPostgresPool?: Pool;
};

export const pool =
  globalForDb.ta3lsPostgresPool ??
  new Pool({
    connectionString,
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 30_000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.ta3lsPostgresPool = pool;
}

if (process.env.VERCEL) {
  attachDatabasePool(pool);
}

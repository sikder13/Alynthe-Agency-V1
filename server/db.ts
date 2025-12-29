import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
// FIX: Must import as .js for Vercel Runtime
// @ts-ignore
import * as schema from "../shared/schema.js";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Keep this SSL setting!
  max: 10,
});

export const db = drizzle({ client: pool, schema });

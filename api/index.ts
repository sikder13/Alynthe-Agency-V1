// @ts-ignore
import { app, setupApp } from "../server/index.js";
// @ts-ignore
import { db } from "../server/db.js";
import { sql } from "drizzle-orm";

// 1. Start setup immediately
const setupPromise = setupApp();

// FIX: Added ': any' to prevent TypeScript errors
export default async function handler(req: any, res: any) {
  console.log(`[Vercel Route] Incoming request: ${req.url}`);

  // 2. DIAGNOSTIC HEALTH CHECK
  if (req.url === "/api/health") {
    // Check if keys are present (True/False only, don't reveal them)
    const diagnostics = {
      status: "alive",
      env: {
        openai: !!process.env.OPENAI_API_KEY,
        resend: !!process.env.RESEND_API_KEY,
        database_url: !!process.env.DATABASE_URL,
      },
      db_connection: "unknown",
    };

    // Test Database Connection
    try {
      await db.execute(sql`SELECT 1`);
      diagnostics.db_connection = "connected";
    } catch (err: any) {
      diagnostics.db_connection = `failed: ${err.message}`;
      console.error("DB Check Failed:", err);
    }

    return res.status(200).json(diagnostics);
  }

  // 3. Wait for the app to initialize
  try {
    await setupPromise;
  } catch (err) {
    console.error("[Critical Startup Error]:", err);
    return res
      .status(500)
      .json({ error: "Server startup failed", details: String(err) });
  }

  // 4. Hand off to Express
  app(req, res);
}

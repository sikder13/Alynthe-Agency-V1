// @ts-ignore
import { app, setupApp } from "../server/index.js";

// 1. Start setup immediately
const setupPromise = setupApp();

export default async function handler(req, res) {
  // DEBUG LOG: This will show up in Vercel logs if the request hits the server
  console.log(`[Vercel Route] Incoming request: ${req.url}`);

  // 2. Add a simple Health Check that bypasses the App (sanity check)
  if (req.url === "/api/health") {
    return res
      .status(200)
      .json({ status: "alive", message: "Backend is running" });
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

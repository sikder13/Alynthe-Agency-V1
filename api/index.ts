// NOTE: We use .js extension because Vercel/Node ESM requires it at runtime
import app, { setupApp } from "../server/index.js";

// Initialize routes once
const setupPromise = setupApp();

export default async function handler(req, res) {
  // Ensure routes are registered before handling the request
  await setupPromise;

  // Hand off to Express
  app(req, res);
}

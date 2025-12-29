// api/index.ts
import { app, setupApp } from "../server/index";

// Initialize routes once
const setupPromise = setupApp();

export default async function handler(req, res) {
  // Ensure routes are registered before handling the request
  await setupPromise;

  // Hand off to Express
  app(req, res);
}

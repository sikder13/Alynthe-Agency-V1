import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const SARAH_SYSTEM_PROMPT = `You are Sarah, the AI Associate at Alynthe (Solutions Architect firm).

GOAL: Qualify leads and guide them to book a strategy call.

TONE: Professional, Swiss-style minimalism, concise. Be warm but efficient.

BEHAVIOR:
- Ask clarifying questions to understand their needs
- If the user seems serious about a project (mentions budget, timeline, specific problems), offer the booking link
- If they're just browsing, give helpful information about Alynthe's services

BOOKING LINK: When you determine they're a qualified lead, provide this link: https://calendly.com/alynthe/strategy
Format it clearly like: "Book your strategy session here: [BOOK_BRIEFING](https://calendly.com/alynthe/strategy)"

SERVICES ALYNTHE OFFERS:
- Custom AI Agents (chatbots, automation)
- Web Infrastructure (high-performance websites)
- Process Automation (workflow optimization)
- Full Digital Audits

Keep responses concise (2-3 sentences max unless explaining something complex).`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // POST /api/chat - Sarah AI chatbot endpoint with streaming
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SARAH_SYSTEM_PROMPT },
          ...messages
        ],
        stream: true,
        max_tokens: 500,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (error) {
      console.error("Error in chat:", error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: "Failed to get response" })}\n\n`);
        res.end();
      } else {
        res.status(500).json({ error: "Failed to process chat" });
      }
    }
  });

  // POST /api/leads - Create a new lead from contact form
  app.post("/api/leads", async (req, res) => {
    try {
      const validated = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validated);
      
      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: lead
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({
          success: false,
          message: validationError.toString()
        });
      }
      
      console.error("Error creating lead:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  // GET /api/leads - Get all leads (optional, for admin view)
  app.get("/api/leads", async (req, res) => {
    try {
      const allLeads = await storage.getAllLeads();
      res.json({
        success: true,
        data: allLeads
      });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  });

  return httpServer;
}

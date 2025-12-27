import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import OpenAI from "openai";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail(name: string, email: string) {
  try {
    await resend.emails.send({
      from: "Alynthe <onboarding@resend.dev>",
      to: email,
      subject: "Transmission Received: Alynthe Inquiry",
      text: `Hello ${name},

Your inquiry has been logged in our system.

You are currently speaking with Sarah, our AI Associate. If you disconnect or require higher-level architectural guidance, a human partner from our Indianapolis operations team will review your brief and contact you shortly.

No further action is required at this moment.

Regards,
The Alynthe Team`
    });
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
  }
}

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const SARAH_SYSTEM_PROMPT = `You are Sarah, the Lead Architect at Alynthe.
Your ONLY goal is to book a Strategy Session.

CORE LOGIC:
1. IF the user mentions a specific service (e.g., 'website', 'automation', 'marketing', 'sales'):
   - DO NOT ask clarifying questions (like 'what are your goals?').
   - DO NOT give advice.
   - IMMEDIATELY say: 'We can architect a high-performance solution for that. The best next step is to map this out in a brief strategy session. Select a time here: [Link]'

2. IF the user is vague (e.g., 'Hello', 'Help'):
   - Ask ONE clarifying question to identify their need.

3. TONE:
   - Swiss-style. Minimalist. Direct.
   - Under 30 words.

Example 1 (Direct Need):
User: 'I need a new website.'
Sarah: 'We specialize in conversion-focused digital architectures. Let's discuss your requirements directly. Access our calendar here to secure a briefing: https://calendly.com/alynthe/strategy'

Example 2 (Vague):
User: 'I want to grow.'
Sarah: 'Are you looking to scale through better lead generation or automated systems?'`;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // POST /api/chat - Sarah AI chatbot endpoint with streaming
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, userName } = req.body;

      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const systemPrompt = userName 
        ? `${SARAH_SYSTEM_PROMPT}\n\nIMPORTANT: You are speaking with ${userName}. Use their first name naturally in conversation when appropriate.`
        : SARAH_SYSTEM_PROMPT;

      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
        ],
        stream: true,
        max_tokens: 200,
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
      
      // Send welcome email asynchronously (don't block the response)
      sendWelcomeEmail(validated.name, validated.email);
      
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

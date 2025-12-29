import type { Express } from "express";
import { createServer, type Server } from "http";
//@ts-ignore
import { storage } from "./storage.js";
import { insertLeadSchema } from "../shared/schema.js";
import { fromError } from "zod-validation-error";
import OpenAI from "openai";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_FROM = "Alynthe AI <no-reply@alynthe.com>";
const ADMIN_EMAIL = "alyntheinfo@gmail.com";
const REPLY_TO = "info@alynthe.com";

const emailFooter = `
  <div style="border-top: 1px solid #e5e7eb; padding-top: 32px; margin-top: 32px;">
    <p style="margin: 0; font-size: 14px; color: #9ca3af; line-height: 1.6;">
      <strong style="color: #111827;">Alynthe</strong> | The Infrastructure of Growth<br>
      1438 Spann Ave, Indianapolis, IN 46203
    </p>
  </div>
`;

async function sendContactFormEmails(lead: {
  name: string;
  email: string;
  projectType?: string;
  challenge?: string;
}) {
  const welcomeEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafafa;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #ffffff; border-radius: 8px; padding: 48px; border: 1px solid #e5e7eb;">
      <h1 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 600; color: #111827; letter-spacing: -0.5px;">
        We have your coordinates.
      </h1>
      
      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7; color: #4b5563;">
        Hello ${lead.name},
      </p>
      
      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7; color: #4b5563;">
        Thank you for initiating contact. Your project details have been securely logged in our intake system.
      </p>
      
      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7; color: #4b5563;">
        We are not a faceless offshore firm. We are proud to be an <strong>American-built agency</strong>, engineered right here in the Midwest (Indianapolis). We believe in hard work & honesty.
      </p>
      
      <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.7; color: #4b5563;">
        A Strategist will review your brief and deploy a response within <strong>24 hours</strong>.
      </p>
      
      ${emailFooter}
    </div>
  </div>
</body>
</html>
  `;

  const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="margin: 0; padding: 20px; font-family: monospace; background-color: #111; color: #0f0;">
  <h2 style="color: #0f0; margin-bottom: 20px;">NEW LEAD CAPTURED</h2>
  <pre style="background: #222; padding: 20px; border-radius: 4px; overflow-x: auto;">
Name: ${lead.name}
Email: ${lead.email}
Project Type: ${lead.projectType || "Not specified"}
Challenge: ${lead.challenge || "Not specified"}
Source: Contact Form
Timestamp: ${new Date().toISOString()}
  </pre>
</body>
</html>
  `;

  const results = await Promise.allSettled([
    resend.emails.send({
      from: EMAIL_FROM,
      to: lead.email,
      replyTo: REPLY_TO,
      subject: "Transmission Received: Welcome to Alynthe.",
      html: welcomeEmailHtml,
    }),
    resend.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `New Lead: ${lead.name}`,
      html: adminEmailHtml,
    }),
  ]);

  results.forEach((result, index) => {
    const target = index === 0 ? lead.email : ADMIN_EMAIL;
    if (result.status === "fulfilled") {
      console.log(`Email sent successfully to ${target}`);
    } else {
      console.error(`Failed to send email to ${target}:`, result.reason);
    }
  });
}

async function sendSarahSessionEmail(name: string, email: string) {
  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: "Your Session with Sarah (Alynthe AI)",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafafa;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #ffffff; border-radius: 8px; padding: 48px; border: 1px solid #e5e7eb;">
      <h1 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 600; color: #111827; letter-spacing: -0.5px;">
        Session Logged
      </h1>
      
      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7; color: #4b5563;">
        Hello ${name},
      </p>
      
      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7; color: #4b5563;">
        Sarah has logged your request. A human strategist will review the chat logs and deploy a strategy within <strong>24 hours</strong>.
      </p>
      
      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.7; color: #4b5563;">
        We are not a faceless offshore firm. We are proud to be an <strong>American-built agency</strong>, engineered right here in the Midwest (Indianapolis). We believe in hard work & honesty.
      </p>
      
      <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 1.7; color: #4b5563;">
        If you need immediate assistance, you can <a href="https://calendly.com/ud-sikder/30min" style="color: #4f46e5;">book a strategy call directly</a>.
      </p>
      
      ${emailFooter}
    </div>
  </div>
</body>
</html>
      `,
    });
    console.log(`Sarah session email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send Sarah session email:", error);
  }
}

/*
const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});*/

// FIX: Use standard Vercel environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Changed from AI_INTEGRATIONS_...
  // Removed baseURL so it goes directly to OpenAI, not Replit's proxy
});

const CALENDLY_LINK = "https://calendly.com/ud-sikder/30min";

const SARAH_SYSTEM_PROMPT = `You are Sarah, the Lead Architect at Alynthe.
Your ONLY goal is to book a Strategy Session.

CORE LOGIC:
1. IF the user mentions a specific service (e.g., 'website', 'automation', 'marketing', 'sales', 'AI', 'chatbot'):
   - DO NOT ask clarifying questions (like 'what are your goals?').
   - DO NOT give advice.
   - IMMEDIATELY offer the Strategy Session.

2. IF the user asks for a meeting, pricing, timeline, or expresses intent to start a project:
   - Offer a Strategy Session immediately.
   - Say: 'I have access to our strategists' calendar. You can secure a 30-minute session here: [Book Strategy Session](${CALENDLY_LINK})'
   - DO NOT ask 'what time works for you?' - just provide the link.

3. IF the user is vague (e.g., 'Hello', 'Help'):
   - Ask ONE clarifying question to identify their need.

4. TONE:
   - Swiss-style. Minimalist. Direct.
   - Under 30 words.

5. LINK FORMAT:
   - Always format booking links as Markdown: [Book Strategy Session](${CALENDLY_LINK})
   - This ensures the link is clickable.

Example 1 (Direct Need):
User: 'I need a new website.'
Sarah: 'We specialize in conversion-focused architectures. I have access to our strategists' calendar. Secure a 30-minute session here: [Book Strategy Session](${CALENDLY_LINK})'

Example 2 (Pricing/Meeting Request):
User: 'What are your prices?' or 'Can we schedule a call?'
Sarah: 'Pricing depends on scope. I have access to our calendar—secure a 30-minute strategy session here: [Book Strategy Session](${CALENDLY_LINK})'

Example 3 (Vague):
User: 'I want to grow.'
Sarah: 'Are you looking to scale through better lead generation or automated systems?'`;

export async function registerRoutes(
  httpServer: Server,
  app: Express,
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
        messages: [{ role: "system", content: systemPrompt }, ...messages],
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
    } catch (error: any) {
      console.error("Error in chat:", error);

      const fallbackMessage =
        "I am currently recalibrating. Please use the contact form below, or book a call directly: [Book Strategy Session](https://calendly.com/ud-sikder/30min)";

      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ content: fallbackMessage })}\n\n`);
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
      } else {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.write(`data: ${JSON.stringify({ content: fallbackMessage })}\n\n`);
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
      }
    }
  });

  // POST /api/leads - Create a new lead from contact form or chatbot
  app.post("/api/leads", async (req, res) => {
    try {
      const validated = insertLeadSchema.parse(req.body);
      const isFromChatbot = validated.projectType === "Chat Inquiry";
      const source = isFromChatbot ? "Sarah Agent" : "Contact Form";

      // Run DB insert and email sending in parallel
      const results = await Promise.allSettled([
        // Database insert
        storage.createLead(validated).then((lead) => {
          console.log(
            `Lead saved to DB: ${validated.email} | Source: ${source}`,
          );
          return lead;
        }),
        // Email sending (different based on source)
        isFromChatbot
          ? sendSarahSessionEmail(validated.name, validated.email)
          : sendContactFormEmails({
              name: validated.name,
              email: validated.email,
              projectType: validated.projectType,
              challenge: validated.challenge,
            }),
      ]);

      // Check if DB insert succeeded
      const dbResult = results[0];
      if (dbResult.status === "rejected") {
        console.error("Failed to save lead to DB:", dbResult.reason);
        throw dbResult.reason;
      }

      // Log email status (but don't fail the request if email fails)
      const emailResult = results[1];
      if (emailResult.status === "rejected") {
        console.error("Email send failed (non-blocking):", emailResult.reason);
      }

      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: dbResult.value,
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        const validationError = fromError(error);
        return res.status(400).json({
          success: false,
          message: validationError.toString(),
        });
      }

      console.error("Error creating lead:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // GET /api/leads - Get all leads (optional, for admin view)
  app.get("/api/leads", async (req, res) => {
    try {
      const allLeads = await storage.getAllLeads();
      res.json({
        success: true,
        data: allLeads,
      });
    } catch (error) {
      console.error("Error fetching leads:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  return httpServer;
}

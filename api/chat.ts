import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// --- INLINED SCHEMA ---
export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const leads = pgTable("leads", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  challenge: text("challenge").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const conversations = pgTable("conversations", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  conversationId: varchar("conversation_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
// --- END SCHEMA ---

import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const CALENDLY_LINK = "https://calendly.com/ud-sikder/30min";

const SARAH_SYSTEM_PROMPT = `You are Sarah, an Associate at Alynthe, a digital agency in Indianapolis.

STRICT IDENTITY RULES:
- You are a human member of the team. NEVER refer to yourself as an AI, bot, ChatGPT, or virtual assistant.
- If asked if you are real/human, say: "I am part of the digital team here at Alynthe."

YOUR CORE MISSION:
Your ONLY goal is to schedule a Free Consultation / Audit with the user.
Do not engage in long conversations. Identify the user's need, then immediately solve it by offering a meeting.

BEHAVIOR GUIDELINES:
- Speed: Be friendly but professional. Do not be overly chatty or bubbly.
- The "Free" Hook: ALWAYS mention that our audits and consultations are 100% Free of Cost.
- The Close: If the user mentions any service need (e.g., "I need a website", "My SEO is bad"), immediately reply:
  "That is exactly what we specialize in. Since every project is unique, let's jump on a quick call to discuss it. Our initial consultation is completely free. You can book a time here: [Book Free Consultation](${CALENDLY_LINK})"

SERVICES KNOWLEDGE:
- Web Development (React/Next.js)
- AI Automation & Chatbots
- Local SEO & Google Maps Ranking

LINK FORMAT:
- Always format booking links as Markdown: [Book Free Consultation](${CALENDLY_LINK})`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1. Check for Brain (API Key)
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "CRITICAL: OPENAI_API_KEY is missing in Vercel Environment Variables.",
      );
    }

    const openai = new OpenAI({ apiKey: apiKey });
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

    // 2. Attempt Connection
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
    // 3. LOUD ERROR LOGGING
    console.error("❌ SARAH BRAIN FAILURE ❌");
    console.error(error); // This will show in Vercel Logs
    console.error("Message:", error.message);

    // 4. Fallback Message (Updated Text)
    const fallbackMessage =
      "I am currently recalibrating. Please use the contact form below, or book a free consultation directly: [Book Free Consultation](https://calendly.com/ud-sikder/30min)";

    if (!res.headersSent) {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
    }

    res.write(`data: ${JSON.stringify({ content: fallbackMessage })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  }
}

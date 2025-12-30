import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || undefined,
});

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
}
//FORCE UPDATE: Vercel Persona Fix.

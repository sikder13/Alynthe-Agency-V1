import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL || undefined,
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

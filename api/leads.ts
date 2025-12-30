import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { leads, insertLeadSchema } from "../shared/schema";

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

  await Promise.allSettled([
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
}

async function sendSarahSessionEmail(name: string, email: string) {
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
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const sql = neon(process.env.DATABASE_URL!);
      const db = drizzle(sql);
      const allLeads = await db.select().from(leads);
      return res.status(200).json({ success: true, data: allLeads });
    } catch (error) {
      console.error("Error fetching leads:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const validated = insertLeadSchema.parse(req.body);
    const isFromChatbot = validated.projectType === "Chat Inquiry";

    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);

    const [newLead] = await db.insert(leads).values(validated).returning();
    console.log(`Lead saved: ${validated.email} | Source: ${isFromChatbot ? "Sarah Agent" : "Contact Form"}`);

    if (isFromChatbot) {
      await sendSarahSessionEmail(validated.name, validated.email);
    } else {
      await sendContactFormEmails({
        name: validated.name,
        email: validated.email,
        projectType: validated.projectType,
        challenge: validated.challenge,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: newLead,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Error creating lead:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

import connectDB from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const POST = async (req: NextRequest) => {
  try {
    const { message, ownerId } = await req.json();
    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "message and ownerId is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    await connectDB();
    const settings = await Settings.findOne({ ownerId });
    if (!settings) {
      return NextResponse.json(
        { message: "chatbot is not configured yet" },
        { status: 400, headers: corsHeaders }
      );
    }

    const systemInstruction = `
You are the official AI customer support assistant for a business using Support AI.

## Business Information
- Name: ${settings.businessName}
- Email: ${settings.supportEmail}
- Knowledge Base: ${settings.knowledge}

## Instructions
1. Greet customers politely and assist them with their questions.
2. Answer using the knowledge base above.
3. Help with FAQs, products, services, delivery, refunds, and policies when the information is available.
4. Keep a friendly, professional, conversational tone.
5. Keep responses clear, concise, and helpful.
6. Ask follow-up questions when a query is unclear.
7. Never invent business information, prices, policies, or product details.
8. If information is unavailable, say so politely and direct the customer to ${settings.supportEmail}.
9. Never pretend to be a human or claim an action was completed without confirmation.
`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
      contents: message, // the visitor's question
      config: { systemInstruction },
    });

    return NextResponse.json(result.text, { headers: corsHeaders });
  } catch (error) {
    console.error("chat error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500, headers: corsHeaders }
    );
  }
};

export const OPTIONS = async () =>
  new NextResponse(null, { status: 204, headers: corsHeaders });
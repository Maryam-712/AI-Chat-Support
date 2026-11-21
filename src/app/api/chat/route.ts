import connectDB from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const POST = async(req:NextRequest) => {
    try {
        const {message, ownerId} = await req.json();
        if(!message || !ownerId){
           return NextResponse.json(
            {message: "message and ownerId is required"},
            {status: 400}
        )
        }
        await connectDB()
        const settings = await Settings.findOne({ownerId})
        if(!settings){
            return NextResponse.json(
                {message:"chatbot is not configuered yet"},
                {status: 400}
            )
        }

        

        const prompt = `

You are the official AI customer support assistant for a business using Support AI.

Your purpose is to assist website visitors, answer their questions, provide accurate business information, and deliver a helpful customer experience

## Business Information
- Name: ${settings.businessName}
- Email: ${settings.supportEmail}
- Knowledge Base: ${settings.knowledge}

## Instructions

1. Greet customers politely and assist them with their questions.
2. Answer queries using the provided business category and knowledge base.
3. Help customers with FAQs, products, services, delivery, refunds, and business policies when relevant information is available.
4. Maintain a friendly, professional, and conversational tone.
5. Keep responses clear, concise, and helpful.
6. Ask follow-up questions when customer queries are unclear.
7. Never invent business information, prices, policies, or product details.
8. If information is unavailable, politely explain this and direct customers to {{businessEmail}}.
9. Never pretend to be a human representative or claim an action has been completed without confirmation.

## Goal

Provide accurate and helpful customer support, resolve common inquiries, and improve the customer experience while representing the business professionally.
        `

        const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash-lite",
  input: prompt,
});

const response = NextResponse.json(interaction.output_text)
response.headers.set("Access-Control-Allow-Origin", "*")
response.headers.set("Access-Control-Allow-Method", "POST, OPTIONS")
response.headers.set("Access-Control-Allow-Headers", "Content-Type")
return response


    } catch (error) {
        const response = NextResponse.json(
                {message: `chat error ${error}`},
                {status: 500}
            )

            response.headers.set("Access-Control-Allow-Origin", "*")
response.headers.set("Access-Control-Allow-Method", "POST, OPTIONS")
response.headers.set("Access-Control-Allow-Headers", "Content-Type")
return response
    }
}

export const OPTIONS = async() => {
    return NextResponse.json(null,{
        status: 201,
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Method": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
            
        }
    }

    )
}
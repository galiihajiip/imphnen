// AI Client - Server-side only
// NEVER import this file in client components

import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate environment variables
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL_NAME || "gemini-1.5-pro",
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("Gagal menghasilkan respons AI. Silakan coba lagi.");
  }
}

// AI Client - Server-side only
// NEVER import this file in client components

import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate environment variables
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export async function generateAIResponse(prompt: string): Promise<string> {
  // Check if API key is configured
  if (!genAI || !process.env.GEMINI_API_KEY) {
    console.error("Gemini API key not configured");
    throw new Error(
      "API key Gemini belum dikonfigurasi. Silakan tambahkan GEMINI_API_KEY di environment variables."
    );
  }

  try {
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL_NAME || "gemini-1.5-pro",
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    if (!text || text.trim().length === 0) {
      throw new Error("AI response is empty");
    }
    
    return text;
  } catch (error: any) {
    console.error("AI generation error:", error);
    
    // More specific error messages
    if (error?.message?.includes("API_KEY_INVALID")) {
      throw new Error(
        "API key Gemini tidak valid. Silakan periksa kembali GEMINI_API_KEY Anda."
      );
    }
    
    if (error?.message?.includes("RATE_LIMIT")) {
      throw new Error(
        "Terlalu banyak permintaan. Silakan tunggu beberapa saat dan coba lagi."
      );
    }
    
    if (error?.message?.includes("model not found")) {
      throw new Error(
        "Model AI tidak ditemukan. Silakan periksa GEMINI_MODEL_NAME di environment variables."
      );
    }
    
    // Generic error
    throw new Error(
      `Gagal menghasilkan respons AI: ${error?.message || "Silakan coba lagi."}`
    );
  }
}

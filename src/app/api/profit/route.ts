// API Route for Profit Analysis

import { NextRequest, NextResponse } from "next/server";
import { profitInputSchema } from "@/lib/validations";
import { analyzeProfitWithAI } from "@/services/financeService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedInput = profitInputSchema.parse(body);
    
    // Process with AI
    const result = await analyzeProfitWithAI(validatedInput);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Profit analysis error:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Data tidak valid", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan saat menganalisis profit" },
      { status: 500 }
    );
  }
}

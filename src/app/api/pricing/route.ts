// API Route for Pricing Decision

import { NextRequest, NextResponse } from "next/server";
import { pricingInputSchema } from "@/lib/validations";
import { generatePricingAdviceWithAI } from "@/services/financeService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validatedInput = pricingInputSchema.parse(body);
    
    // Process with AI
    const result = await generatePricingAdviceWithAI(validatedInput);
    
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Pricing decision error:", error);
    
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Data tidak valid", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan saat menghasilkan rekomendasi harga" },
      { status: 500 }
    );
  }
}

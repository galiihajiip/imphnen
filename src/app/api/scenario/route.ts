// API Route for Scenario Analysis

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { analyzeScenarioWithAI } from "@/services/financeService";

const scenarioSchema = z.object({
  productName: z.string().min(1, "Nama produk harus diisi"),
  costPerUnit: z.number().min(0, "HPP harus positif"),
  currentPrice: z.number().min(0, "Harga saat ini harus positif"),
  dailySalesUnits: z.number().min(0, "Jumlah penjualan harus positif"),
  newPrice: z.number().min(0, "Harga baru harus positif"),
  volumeChangePercent: z.number().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedInput = scenarioSchema.parse(body);

    const result = await analyzeScenarioWithAI(validatedInput);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Scenario analysis error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Data tidak valid", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Gagal menganalisis skenario" },
      { status: 500 }
    );
  }
}

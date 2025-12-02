// API Route for Trend Analysis

import { NextRequest, NextResponse } from "next/server";
import { analyzeTrendWithAI } from "@/services/financeService";
import { prisma } from "@/db/client";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const days = parseInt(searchParams.get("days") || "7");

    // Get summaries
    const summaries = await prisma.dailySummary.findMany({
      take: days,
      orderBy: { date: "desc" },
    });

    // Get AI insight
    const insightText = await analyzeTrendWithAI(days);

    return NextResponse.json({
      summaries,
      insightText,
    });
  } catch (error: any) {
    console.error("Trend analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Gagal menganalisis tren" },
      { status: 500 }
    );
  }
}

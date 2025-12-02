// Service Layer - Orchestrates domain logic, AI, and database

import { ProfitInput, PricingInput, ScenarioInput, DailySummary } from "@/domain/finance/models";
import { calculateProfit } from "@/domain/finance/profitCalculator";
import { calculatePricing } from "@/domain/finance/pricingEngine";
import { calculateScenario } from "@/domain/finance/scenarioEngine";
import { generateAIResponse } from "@/server/ai/llmClient";
import { buildProfitInsightPrompt } from "@/server/ai/prompts/profitInsightPrompt";
import { buildPricingAdvicePrompt } from "@/server/ai/prompts/pricingAdvicePrompt";
import { buildTrendInsightPrompt } from "@/server/ai/prompts/trendInsightPrompt";
import { buildScenarioAdvicePrompt } from "@/server/ai/prompts/scenarioAdvicePrompt";
import { prisma } from "@/db/client";

export interface ProfitAnalysisResponse {
  profit: number;
  profitMargin: number;
  status: string;
  insightText: string;
}

export interface PricingDecisionResponse {
  currentMargin: number;
  suggestedPrices: Array<{
    price: number;
    margin: number;
    label: string;
    description: string;
  }>;
  adviceText: string;
}

export interface ScenarioAnalysisResponse {
  current: {
    price: number;
    margin: number;
    dailyProfit: number;
  };
  simulated: {
    price: number;
    margin: number;
    estimatedVolume: number;
    dailyProfit: number;
  };
  difference: {
    profitChange: number;
    profitChangePercent: number;
  };
  adviceText: string;
}

export async function analyzeProfitWithAI(
  input: ProfitInput,
  date?: Date
): Promise<ProfitAnalysisResponse> {
  // Step 1: Calculate profit using pure domain logic
  const result = calculateProfit(input);

  // Step 2: Generate AI insight
  const prompt = buildProfitInsightPrompt(input, result);
  const insightText = await generateAIResponse(prompt);

  // Step 3: Save to database (optional for demo)
  try {
    await prisma.profitAnalysis.create({
      data: {
        salesTotal: input.salesTotal,
        cogsTotal: input.cogsTotal,
        operationalCost: input.operationalCost,
        profit: result.profit,
        profitMargin: result.profitMargin,
        insightText,
      },
    });

    // Also save/update daily summary
    const summaryDate = date || new Date();
    summaryDate.setHours(0, 0, 0, 0);

    await prisma.dailySummary.upsert({
      where: { date: summaryDate },
      update: {
        totalSales: input.salesTotal,
        totalCogs: input.cogsTotal,
        operationalCost: input.operationalCost,
        profit: result.profit,
        marginPercent: result.profitMargin,
      },
      create: {
        date: summaryDate,
        totalSales: input.salesTotal,
        totalCogs: input.cogsTotal,
        operationalCost: input.operationalCost,
        profit: result.profit,
        marginPercent: result.profitMargin,
      },
    });
  } catch (error) {
    console.warn("Database write skipped:", error);
  }

  return {
    profit: result.profit,
    profitMargin: result.profitMargin,
    status: result.status,
    insightText,
  };
}

export async function generatePricingAdviceWithAI(
  input: PricingInput
): Promise<PricingDecisionResponse> {
  // Step 1: Calculate pricing using pure domain logic
  const result = calculatePricing(input);

  // Step 2: Generate AI advice
  const prompt = buildPricingAdvicePrompt(input, result);
  const adviceText = await generateAIResponse(prompt);

  // Step 3: Save to database (optional for demo)
  try {
    await prisma.pricingDecision.create({
      data: {
        productName: input.productName,
        costPerUnit: input.costPerUnit,
        currentPrice: input.currentPrice,
        desiredMarginMin: input.desiredMarginMin,
        desiredMarginMax: input.desiredMarginMax,
        suggestedPrices: JSON.stringify(result.suggestedPrices),
        adviceText,
      },
    });
  } catch (error) {
    console.warn("Database write skipped:", error);
  }

  return {
    currentMargin: result.currentMargin,
    suggestedPrices: result.suggestedPrices,
    adviceText,
  };
}

export async function analyzeTrendWithAI(days: number = 7): Promise<string> {
  try {
    const summaries = await prisma.dailySummary.findMany({
      take: days,
      orderBy: { date: "desc" },
    });

    if (summaries.length === 0) {
      return "Belum ada data historis. Mulai catat keuangan harian Anda untuk melihat tren.";
    }

    const prompt = buildTrendInsightPrompt(summaries);
    return await generateAIResponse(prompt);
  } catch (error) {
    console.warn("Trend analysis error:", error);
    return "Tidak dapat menganalisis tren saat ini. Silakan coba lagi.";
  }
}

export async function analyzeScenarioWithAI(
  input: ScenarioInput
): Promise<ScenarioAnalysisResponse> {
  // Step 1: Calculate scenario
  const result = calculateScenario(input);

  // Step 2: Generate AI advice
  const prompt = buildScenarioAdvicePrompt(input, result);
  const adviceText = await generateAIResponse(prompt);

  return {
    ...result,
    adviceText,
  };
}

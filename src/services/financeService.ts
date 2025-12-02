// Service Layer - Orchestrates domain logic, AI, and database

import { ProfitInput, PricingInput } from "@/domain/finance/models";
import { calculateProfit } from "@/domain/finance/profitCalculator";
import { calculatePricing } from "@/domain/finance/pricingEngine";
import { generateAIResponse } from "@/server/ai/llmClient";
import { buildProfitInsightPrompt } from "@/server/ai/prompts/profitInsightPrompt";
import { buildPricingAdvicePrompt } from "@/server/ai/prompts/pricingAdvicePrompt";
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

export async function analyzeProfitWithAI(
  input: ProfitInput
): Promise<ProfitAnalysisResponse> {
  // Step 1: Calculate profit using pure domain logic
  const result = calculateProfit(input);

  // Step 2: Generate AI insight
  const prompt = buildProfitInsightPrompt(input, result);
  const insightText = await generateAIResponse(prompt);

  // Step 3: Save to database
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

  // Step 3: Save to database
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

  return {
    currentMargin: result.currentMargin,
    suggestedPrices: result.suggestedPrices,
    adviceText,
  };
}

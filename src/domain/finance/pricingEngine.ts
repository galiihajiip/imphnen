// Pure business logic for pricing decisions

import { PricingInput, PricingResult, PriceSuggestion } from "./models";

export function calculatePricing(input: PricingInput): PricingResult {
  const { costPerUnit, currentPrice, desiredMarginMin, desiredMarginMax } = input;
  
  // Calculate current margin
  const currentMargin = currentPrice > 0 
    ? ((currentPrice - costPerUnit) / currentPrice) * 100 
    : 0;
  
  // Generate price suggestions
  const suggestedPrices: PriceSuggestion[] = [];
  
  // Conservative price (minimum margin)
  const conservativePrice = costPerUnit / (1 - desiredMarginMin / 100);
  suggestedPrices.push({
    price: Math.ceil(conservativePrice / 100) * 100, // Round up to nearest 100
    margin: desiredMarginMin,
    label: "Konservatif",
    description: "Harga aman dengan margin minimum",
  });
  
  // Balanced price (average margin)
  const avgMargin = (desiredMarginMin + desiredMarginMax) / 2;
  const balancedPrice = costPerUnit / (1 - avgMargin / 100);
  suggestedPrices.push({
    price: Math.ceil(balancedPrice / 100) * 100,
    margin: avgMargin,
    label: "Seimbang",
    description: "Harga ideal untuk keuntungan stabil",
  });
  
  // Aggressive price (maximum margin)
  const aggressivePrice = costPerUnit / (1 - desiredMarginMax / 100);
  suggestedPrices.push({
    price: Math.ceil(aggressivePrice / 100) * 100,
    margin: desiredMarginMax,
    label: "Agresif",
    description: "Harga maksimal untuk profit tinggi",
  });
  
  return {
    currentMargin,
    suggestedPrices,
  };
}

export function calculateMargin(price: number, cost: number): number {
  if (price <= 0) return 0;
  return ((price - cost) / price) * 100;
}

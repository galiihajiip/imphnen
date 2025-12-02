// Domain Models - Pure TypeScript types

export interface ProfitInput {
  salesTotal: number;
  cogsTotal: number;
  operationalCost: number;
}

export interface ProfitResult {
  profit: number;
  profitMargin: number;
  status: "profit" | "loss" | "breakeven";
}

export interface PricingInput {
  productName: string;
  costPerUnit: number;
  currentPrice: number;
  desiredMarginMin: number;
  desiredMarginMax: number;
}

export interface PriceSuggestion {
  price: number;
  margin: number;
  label: string;
  description: string;
}

export interface PricingResult {
  currentMargin: number;
  suggestedPrices: PriceSuggestion[];
}

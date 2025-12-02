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

export interface DailySummary {
  id: string;
  date: Date;
  totalSales: number;
  totalCogs: number;
  operationalCost: number;
  profit: number;
  marginPercent: number;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  category?: string;
  costPerUnit: number;
  pricePerUnit: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductWithMargin extends Product {
  margin: number;
  status: "healthy" | "thin" | "danger";
}

export interface ScenarioInput {
  productName: string;
  costPerUnit: number;
  currentPrice: number;
  dailySalesUnits: number;
  newPrice: number;
  volumeChangePercent?: number;
}

export interface ScenarioResult {
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
}

// Pure business logic - no dependencies, fully testable

import { ProfitInput, ProfitResult } from "./models";

export function calculateProfit(input: ProfitInput): ProfitResult {
  const { salesTotal, cogsTotal, operationalCost } = input;
  
  // Calculate net profit
  const profit = salesTotal - cogsTotal - operationalCost;
  
  // Calculate profit margin percentage
  const profitMargin = salesTotal > 0 ? (profit / salesTotal) * 100 : 0;
  
  // Determine status
  let status: "profit" | "loss" | "breakeven";
  if (profit > 0) {
    status = "profit";
  } else if (profit < 0) {
    status = "loss";
  } else {
    status = "breakeven";
  }
  
  return {
    profit,
    profitMargin,
    status,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

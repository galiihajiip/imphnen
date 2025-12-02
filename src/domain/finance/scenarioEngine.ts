// Scenario simulation logic

import { ScenarioInput, ScenarioResult } from "./models";
import { calculateMargin } from "./pricingEngine";

export function calculateScenario(input: ScenarioInput): ScenarioResult {
  const {
    costPerUnit,
    currentPrice,
    dailySalesUnits,
    newPrice,
    volumeChangePercent = -5, // Default: assume 5% volume drop if price increases
  } = input;

  // Current scenario
  const currentMargin = calculateMargin(currentPrice, costPerUnit);
  const currentDailyProfit = (currentPrice - costPerUnit) * dailySalesUnits;

  // Simulated scenario
  const priceChangePercent = ((newPrice - currentPrice) / currentPrice) * 100;
  
  // Simple volume elasticity: if price goes up X%, volume goes down by volumeChangePercent
  const volumeMultiplier = priceChangePercent > 0 
    ? 1 + (volumeChangePercent / 100)
    : 1 + Math.abs(volumeChangePercent / 100); // If price drops, volume increases
  
  const estimatedVolume = Math.max(0, dailySalesUnits * volumeMultiplier);
  const simulatedMargin = calculateMargin(newPrice, costPerUnit);
  const simulatedDailyProfit = (newPrice - costPerUnit) * estimatedVolume;

  // Difference
  const profitChange = simulatedDailyProfit - currentDailyProfit;
  const profitChangePercent = currentDailyProfit > 0
    ? (profitChange / currentDailyProfit) * 100
    : 0;

  return {
    current: {
      price: currentPrice,
      margin: currentMargin,
      dailyProfit: currentDailyProfit,
    },
    simulated: {
      price: newPrice,
      margin: simulatedMargin,
      estimatedVolume,
      dailyProfit: simulatedDailyProfit,
    },
    difference: {
      profitChange,
      profitChangePercent,
    },
  };
}

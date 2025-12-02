// Unit tests for profit calculator

import { calculateProfit, formatCurrency, formatPercentage } from "../profitCalculator";

describe("calculateProfit", () => {
  it("should calculate profit correctly", () => {
    const result = calculateProfit({
      salesTotal: 5000000,
      cogsTotal: 3000000,
      operationalCost: 1000000,
    });

    expect(result.profit).toBe(1000000);
    expect(result.profitMargin).toBe(20);
    expect(result.status).toBe("profit");
  });

  it("should detect loss", () => {
    const result = calculateProfit({
      salesTotal: 2000000,
      cogsTotal: 3000000,
      operationalCost: 1000000,
    });

    expect(result.profit).toBe(-2000000);
    expect(result.status).toBe("loss");
  });

  it("should detect breakeven", () => {
    const result = calculateProfit({
      salesTotal: 4000000,
      cogsTotal: 3000000,
      operationalCost: 1000000,
    });

    expect(result.profit).toBe(0);
    expect(result.status).toBe("breakeven");
  });

  it("should handle zero sales", () => {
    const result = calculateProfit({
      salesTotal: 0,
      cogsTotal: 0,
      operationalCost: 0,
    });

    expect(result.profit).toBe(0);
    expect(result.profitMargin).toBe(0);
  });
});

describe("formatCurrency", () => {
  it("should format currency correctly", () => {
    expect(formatCurrency(1000000)).toBe("Rp1.000.000");
    expect(formatCurrency(500)).toBe("Rp500");
  });
});

describe("formatPercentage", () => {
  it("should format percentage correctly", () => {
    expect(formatPercentage(25.5)).toBe("25.50%");
    expect(formatPercentage(100)).toBe("100.00%");
  });
});

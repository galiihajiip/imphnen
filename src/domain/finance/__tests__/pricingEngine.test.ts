// Unit tests for pricing engine

import { calculatePricing, calculateMargin } from "../pricingEngine";

describe("calculatePricing", () => {
  it("should generate price suggestions correctly", () => {
    const result = calculatePricing({
      productName: "Kue Brownies",
      costPerUnit: 15000,
      currentPrice: 25000,
      desiredMarginMin: 20,
      desiredMarginMax: 40,
    });

    expect(result.currentMargin).toBeCloseTo(40, 1);
    expect(result.suggestedPrices).toHaveLength(3);
    expect(result.suggestedPrices[0].label).toBe("Konservatif");
    expect(result.suggestedPrices[1].label).toBe("Seimbang");
    expect(result.suggestedPrices[2].label).toBe("Agresif");
  });

  it("should calculate conservative price correctly", () => {
    const result = calculatePricing({
      productName: "Test Product",
      costPerUnit: 10000,
      currentPrice: 15000,
      desiredMarginMin: 30,
      desiredMarginMax: 50,
    });

    const conservativePrice = result.suggestedPrices[0].price;
    const calculatedMargin = calculateMargin(conservativePrice, 10000);
    
    expect(calculatedMargin).toBeGreaterThanOrEqual(29);
  });

  it("should handle zero current price", () => {
    const result = calculatePricing({
      productName: "New Product",
      costPerUnit: 5000,
      currentPrice: 0,
      desiredMarginMin: 25,
      desiredMarginMax: 35,
    });

    expect(result.currentMargin).toBe(0);
    expect(result.suggestedPrices.length).toBeGreaterThan(0);
  });
});

describe("calculateMargin", () => {
  it("should calculate margin correctly", () => {
    expect(calculateMargin(25000, 15000)).toBeCloseTo(40, 1);
    expect(calculateMargin(20000, 10000)).toBeCloseTo(50, 1);
  });

  it("should handle zero price", () => {
    expect(calculateMargin(0, 10000)).toBe(0);
  });
});

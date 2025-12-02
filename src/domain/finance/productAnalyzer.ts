// Product margin analysis logic

import { Product, ProductWithMargin } from "./models";
import { calculateMargin } from "./pricingEngine";

export function analyzeProduct(product: Product): ProductWithMargin {
  const margin = calculateMargin(product.pricePerUnit, product.costPerUnit);
  
  let status: "healthy" | "thin" | "danger";
  if (margin >= 20) {
    status = "healthy";
  } else if (margin >= 10) {
    status = "thin";
  } else {
    status = "danger";
  }

  return {
    ...product,
    margin,
    status,
  };
}

export function analyzeProducts(products: Product[]): ProductWithMargin[] {
  return products.map(analyzeProduct);
}

// Input validation schemas using Zod

import { z } from "zod";

export const profitInputSchema = z.object({
  salesTotal: z.number().min(0, "Total penjualan harus positif"),
  cogsTotal: z.number().min(0, "Biaya pokok harus positif"),
  operationalCost: z.number().min(0, "Biaya operasional harus positif"),
});

export const pricingInputSchema = z.object({
  productName: z.string().min(1, "Nama produk harus diisi"),
  costPerUnit: z.number().min(0, "Biaya produksi harus positif"),
  currentPrice: z.number().min(0, "Harga saat ini harus positif"),
  desiredMarginMin: z.number().min(0).max(100, "Margin minimum harus antara 0-100%"),
  desiredMarginMax: z.number().min(0).max(100, "Margin maksimum harus antara 0-100%"),
}).refine(
  (data) => data.desiredMarginMax >= data.desiredMarginMin,
  {
    message: "Margin maksimum harus lebih besar dari margin minimum",
    path: ["desiredMarginMax"],
  }
);

export type ProfitInputSchema = z.infer<typeof profitInputSchema>;
export type PricingInputSchema = z.infer<typeof pricingInputSchema>;

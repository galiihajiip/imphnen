// Prompt template for pricing advice

import { PricingInput, PricingResult } from "@/domain/finance/models";
import { formatCurrency, formatPercentage } from "@/domain/finance/profitCalculator";

export function buildPricingAdvicePrompt(
  input: PricingInput,
  result: PricingResult
): string {
  const { productName, costPerUnit, currentPrice, desiredMarginMin, desiredMarginMax } = input;
  const { currentMargin, suggestedPrices } = result;

  const suggestionsText = suggestedPrices
    .map(s => `- ${s.label}: ${formatCurrency(s.price)} (margin ${formatPercentage(s.margin)}) - ${s.description}`)
    .join("\n");

  return `Kamu adalah konsultan bisnis yang membantu pemilik UMKM menentukan harga jual yang tepat.

DATA PRODUK:
- Nama Produk: ${productName}
- Biaya Produksi per Unit: ${formatCurrency(costPerUnit)}
- Harga Jual Saat Ini: ${formatCurrency(currentPrice)}
- Margin Saat Ini: ${formatPercentage(currentMargin)}
- Target Margin: ${formatPercentage(desiredMarginMin)} - ${formatPercentage(desiredMarginMax)}

OPSI HARGA YANG DISARANKAN:
${suggestionsText}

TUGAS:
Berikan rekomendasi harga dengan bahasa yang mudah dipahami oleh pemilik UMKM.

STRUKTUR REKOMENDASI:
1. Evaluasi harga saat ini - apakah sudah baik atau perlu disesuaikan? (2-3 kalimat)
2. Jelaskan 2-3 opsi harga dengan kelebihan dan kekurangannya (4-5 kalimat)
3. Berikan rekomendasi final dengan alasan yang jelas (2-3 kalimat)

ATURAN PENTING:
- Gunakan bahasa Indonesia yang sangat sederhana
- Hindari jargon bisnis yang rumit
- Pertimbangkan realitas pasar dan daya beli pelanggan UMKM
- Bersikap praktis dan realistis
- Total panjang: 150-220 kata
- Jangan gunakan bullet points, tulis dalam paragraf mengalir

Berikan rekomendasi sekarang:`;
}

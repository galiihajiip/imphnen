// Prompt template for scenario comparison

import { ScenarioInput, ScenarioResult } from "@/domain/finance/models";
import { formatCurrency, formatPercentage } from "@/domain/finance/profitCalculator";

export function buildScenarioAdvicePrompt(
  input: ScenarioInput,
  result: ScenarioResult
): string {
  const { productName } = input;
  const { current, simulated, difference } = result;

  return `Kamu adalah konsultan bisnis yang membantu pemilik UMKM memahami dampak perubahan harga.

PRODUK: ${productName}

SKENARIO SEKARANG:
- Harga jual: ${formatCurrency(current.price)}
- Margin: ${formatPercentage(current.margin)}
- Profit harian: ${formatCurrency(current.dailyProfit)}

SKENARIO SIMULASI:
- Harga jual baru: ${formatCurrency(simulated.price)}
- Margin: ${formatPercentage(simulated.margin)}
- Estimasi volume: ${simulated.estimatedVolume.toFixed(0)} unit/hari
- Profit harian: ${formatCurrency(simulated.dailyProfit)}

PERUBAHAN:
- Selisih profit: ${formatCurrency(difference.profitChange)} (${formatPercentage(difference.profitChangePercent)})

TUGAS:
Jelaskan trade-off dari perubahan harga ini dengan bahasa yang mudah dipahami.

STRUKTUR PENJELASAN:
1. Apakah perubahan ini menguntungkan atau tidak? (1-2 kalimat)
2. Apa risiko dan keuntungannya? (2-3 kalimat)
3. Rekomendasi: sebaiknya dilakukan atau tidak? (2-3 kalimat)

ATURAN PENTING:
- Gunakan bahasa Indonesia yang sangat sederhana
- Tekankan bahwa ini simulasi kasar, bukan jaminan
- Bersikap hati-hati dan realistis
- Pertimbangkan daya beli pelanggan
- Total panjang: 120-180 kata
- Jangan gunakan bullet points, tulis dalam paragraf mengalir

Berikan analisis sekarang:`;
}

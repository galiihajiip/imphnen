// Prompt template for trend analysis

import { DailySummary } from "@/domain/finance/models";
import { formatCurrency, formatPercentage } from "@/domain/finance/profitCalculator";

export function buildTrendInsightPrompt(summaries: DailySummary[]): string {
  if (summaries.length === 0) {
    return "";
  }

  const trendData = summaries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((s) => {
      const date = new Date(s.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      });
      return `- ${date}: Profit ${formatCurrency(s.profit)} (margin ${formatPercentage(s.marginPercent)})`;
    })
    .join("\n");

  const days = summaries.length;
  const totalProfit = summaries.reduce((sum, s) => sum + s.profit, 0);
  const avgMargin = summaries.reduce((sum, s) => sum + s.marginPercent, 0) / days;

  return `Kamu adalah konsultan keuangan yang membantu pemilik UMKM memahami tren bisnis mereka.

DATA TREN ${days} HARI TERAKHIR:
${trendData}

RINGKASAN:
- Total profit ${days} hari: ${formatCurrency(totalProfit)}
- Rata-rata margin: ${formatPercentage(avgMargin)}

TUGAS:
Jelaskan tren ini dengan bahasa yang sangat sederhana dan mudah dipahami.

STRUKTUR PENJELASAN:
1. Apakah tren naik, turun, atau stabil? (1-2 kalimat)
2. Apa yang mungkin menyebabkan pola ini? (2-3 kalimat)
3. Apa yang sebaiknya dilakukan pemilik usaha? (2-3 kalimat)

ATURAN PENTING:
- Gunakan bahasa Indonesia yang sangat sederhana
- Hindari istilah teknis
- Bersikap empatik dan mendukung
- Fokus pada insight praktis
- Total panjang: 100-150 kata
- Jangan gunakan bullet points, tulis dalam paragraf mengalir

Berikan analisis tren sekarang:`;
}

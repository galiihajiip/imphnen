// Prompt template for profit insights

import { ProfitInput, ProfitResult } from "@/domain/finance/models";
import { formatCurrency, formatPercentage } from "@/domain/finance/profitCalculator";

export function buildProfitInsightPrompt(
  input: ProfitInput,
  result: ProfitResult
): string {
  const { salesTotal, cogsTotal, operationalCost } = input;
  const { profit, profitMargin, status } = result;

  return `Kamu adalah asisten keuangan yang membantu pemilik UMKM memahami kondisi keuangan mereka.

DATA KEUANGAN:
- Total Penjualan: ${formatCurrency(salesTotal)}
- Biaya Pokok Penjualan (HPP): ${formatCurrency(cogsTotal)}
- Biaya Operasional: ${formatCurrency(operationalCost)}
- Profit Bersih: ${formatCurrency(profit)}
- Margin Profit: ${formatPercentage(profitMargin)}
- Status: ${status === "profit" ? "UNTUNG" : status === "loss" ? "RUGI" : "IMPAS"}

TUGAS:
Jelaskan kondisi keuangan ini dengan bahasa yang sederhana, empatik, dan mudah dipahami oleh pemilik UMKM yang mungkin tidak memiliki latar belakang pendidikan tinggi.

STRUKTUR PENJELASAN:
1. Mulai dengan menyampaikan apakah hari ini untung atau rugi (1-2 kalimat)
2. Jelaskan penyebab utama kondisi ini (2-3 kalimat)
3. Berikan 1-2 langkah praktis yang bisa dilakukan (2-3 kalimat)

ATURAN PENTING:
- Gunakan bahasa Indonesia yang sangat sederhana
- Hindari istilah teknis atau akuntansi yang rumit
- Bersikap empatik dan mendukung, bukan menggurui
- Fokus pada solusi praktis yang bisa langsung diterapkan
- Total panjang: 120-180 kata
- Jangan gunakan bullet points, tulis dalam paragraf mengalir

Berikan penjelasan sekarang:`;
}

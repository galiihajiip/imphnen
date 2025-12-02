"use client";

import { LayoutShell } from "@/components/layout/LayoutShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/layout/SectionCard";

const lessons = [
  {
    title: "Apa itu Margin?",
    content:
      "Margin adalah selisih antara harga jual dan biaya produksi, dihitung dalam persen. Rumusnya: (Harga Jual - HPP) / Harga Jual × 100%. Margin yang sehat (minimal 20%) memastikan usaha Anda bisa bertahan dan berkembang. Margin ini digunakan untuk menutupi biaya operasional, gaji, dan keuntungan bersih.",
    icon: "💰",
  },
  {
    title: "Kenapa Margin Tipis Berbahaya?",
    content:
      "Margin tipis (<10%) membuat usaha sangat rapuh. Sedikit kenaikan biaya bahan baku atau penurunan penjualan bisa langsung bikin rugi. Usaha butuh 'bantalan' untuk menghadapi situasi tak terduga seperti kenaikan harga, kompetitor baru, atau musim sepi. Dengan margin sehat, Anda punya ruang untuk bertahan dan berkembang.",
    icon: "⚠️",
  },
  {
    title: "Jangan Campur Uang Pribadi & Usaha",
    content:
      "Mencampur uang pribadi dan usaha adalah kesalahan fatal yang sering dilakukan UMKM. Akibatnya, Anda tidak tahu apakah usaha benar-benar untung atau hanya terlihat untung karena Anda terus 'nyuntik' modal pribadi. Pisahkan rekening, catat semua keluar-masuk uang usaha, dan bayar diri Anda sendiri dengan 'gaji' tetap dari usaha.",
    icon: "🏦",
  },
  {
    title: "Pentingnya Catat Keuangan Harian",
    content:
      "Mencatat keuangan setiap hari adalah kebiasaan paling penting untuk UMKM. Dengan catatan harian, Anda bisa melihat pola: hari mana yang ramai, produk mana yang laris, kapan harus stok ulang, dan kapan kas menipis. Tanpa catatan, Anda hanya menebak-nebak dan mudah tertipu oleh 'perasaan' bahwa usaha sedang baik-baik saja.",
    icon: "📝",
  },
  {
    title: "Cara Menentukan Harga Jual yang Tepat",
    content:
      "Harga jual = HPP + Margin + Biaya Operasional. Jangan hanya ikut harga kompetitor tanpa hitung biaya Anda sendiri. Pertimbangkan: 1) Berapa HPP produk Anda? 2) Berapa biaya operasional per unit? 3) Berapa margin yang Anda inginkan? 4) Apakah harga ini masuk akal untuk pelanggan? Jangan takut jual lebih mahal jika kualitas Anda lebih baik.",
    icon: "💵",
  },
  {
    title: "Kapan Harus Naik Harga?",
    content:
      "Naikkan harga jika: 1) HPP naik signifikan, 2) Margin Anda sudah tipis (<15%), 3) Permintaan tinggi tapi kapasitas terbatas, 4) Anda menambah nilai (kualitas, layanan, kemasan). Jangan takut kehilangan pelanggan - pelanggan yang loyal akan tetap beli jika kenaikan wajar dan Anda komunikasikan dengan baik. Yang penting, jangan naikkan harga tanpa alasan jelas.",
    icon: "📈",
  },
];

export default function LearnPage() {
  return (
    <LayoutShell>
      <div className="p-4 md:p-8 space-y-6">
        <PageHeader
          title="Belajar Keuangan"
          description="Tingkatkan literasi keuangan untuk usaha yang lebih sehat"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson, index) => (
            <SectionCard key={index}>
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0">{lesson.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-200 mb-3">
                    {lesson.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {lesson.content}
                  </p>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      </div>
    </LayoutShell>
  );
}

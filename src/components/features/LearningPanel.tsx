"use client";

import { useState } from "react";
import { SectionCard } from "@/components/layout/SectionCard";

const lessons = [
  {
    id: 1,
    title: "Apa itu Margin?",
    content:
      "Margin adalah selisih antara harga jual dan biaya produksi, dihitung dalam persen. Margin yang sehat (minimal 20%) memastikan usaha Anda bisa bertahan dan berkembang.",
    icon: "💰",
  },
  {
    id: 2,
    title: "Kenapa Margin Tipis Berbahaya?",
    content:
      "Margin tipis (<10%) membuat usaha rapuh. Sedikit kenaikan biaya atau penurunan penjualan bisa langsung bikin rugi. Usaha butuh 'bantalan' untuk menghadapi situasi tak terduga.",
    icon: "⚠️",
  },
  {
    id: 3,
    title: "Jangan Campur Uang Pribadi & Usaha",
    content:
      "Mencampur uang pribadi dan usaha membuat Anda tidak tahu apakah usaha benar-benar untung. Pisahkan rekening dan catat semua keluar-masuk uang usaha.",
    icon: "🏦",
  },
  {
    id: 4,
    title: "Pentingnya Catat Keuangan Harian",
    content:
      "Mencatat keuangan setiap hari membantu Anda melihat pola dan tren. Anda bisa tahu hari mana yang ramai, produk mana yang laris, dan kapan harus stok ulang.",
    icon: "📝",
  },
];

export function LearningPanel() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <SectionCard title="Tips Keuangan" description="Pelajari dasar-dasar mengelola keuangan usaha">
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const isExpanded = expandedId === lesson.id;
          return (
            <div
              key={lesson.id}
              className="bg-slate-800/50 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() =>
                  setExpandedId(isExpanded ? null : lesson.id)
                }
                className="w-full flex items-start gap-3 p-4 text-left hover:bg-slate-800/70 transition-colors"
              >
                <span className="text-2xl flex-shrink-0">{lesson.icon}</span>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-200">
                    {lesson.title}
                  </h3>
                  {isExpanded && (
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">
                      {lesson.content}
                    </p>
                  )}
                </div>
                <span className="text-gray-500 text-sm">
                  {isExpanded ? "−" : "+"}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

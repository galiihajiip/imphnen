"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/layout/StatCard";
import { SectionCard } from "@/components/layout/SectionCard";
import { ProfitAnalysisForm } from "@/components/features/ProfitAnalysisForm";
import { TrendChart } from "@/components/features/TrendChart";
import { LearningPanel } from "@/components/features/LearningPanel";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const [showTrendInsight, setShowTrendInsight] = useState(false);

  const { data: trendData, refetch: refetchTrend } = useQuery({
    queryKey: ["trend"],
    queryFn: async () => {
      const res = await fetch("/api/profit/trend?days=7");
      if (!res.ok) throw new Error("Failed to fetch trend");
      return res.json();
    },
  });

  const todaySummary = trendData?.summaries?.[0];

  return (
    <LayoutShell>
      <div className="p-4 md:p-8 space-y-6">
        <PageHeader
          title="Dashboard"
          description="Pantau keuangan usaha Anda hari ini"
        />

        {/* Today's Summary */}
        {todaySummary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Profit Hari Ini"
              value={formatCurrency(todaySummary.profit)}
              trend={todaySummary.profit > 0 ? "up" : todaySummary.profit < 0 ? "down" : "neutral"}
              icon="💰"
            />
            <StatCard
              label="Margin"
              value={`${todaySummary.marginPercent.toFixed(1)}%`}
              trend={todaySummary.marginPercent >= 20 ? "up" : "down"}
              icon="📊"
            />
            <StatCard
              label="Penjualan"
              value={formatCurrency(todaySummary.totalSales)}
              icon="🛒"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            <SectionCard title="Hitung Profit Hari Ini">
              <ProfitAnalysisForm />
            </SectionCard>

            <SectionCard
              title="Tren 7 Hari Terakhir"
              description="Lihat perkembangan profit usaha Anda"
            >
              {trendData?.summaries && (
                <>
                  <TrendChart summaries={trendData.summaries} />
                  <div className="mt-4">
                    <Button
                      onClick={() => setShowTrendInsight(!showTrendInsight)}
                      variant="secondary"
                      className="w-full"
                    >
                      {showTrendInsight ? "Sembunyikan" : "Minta"} Analisis Tren dari AI
                    </Button>
                  </div>
                  {showTrendInsight && trendData.insightText && (
                    <div className="mt-4 p-4 bg-slate-800/50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">💡</span>
                        <div>
                          <h4 className="font-semibold text-gray-200 mb-2">
                            Analisis Tren
                          </h4>
                          <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
                            {trendData.insightText}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </SectionCard>
          </div>

          {/* Right Column - Learning & Tips */}
          <div className="space-y-6">
            <LearningPanel />
          </div>
        </div>
      </div>
    </LayoutShell>
  );
}

"use client";

import { DailySummary } from "@/domain/finance/models";
import { formatCurrency } from "@/lib/utils";

interface TrendChartProps {
  summaries: DailySummary[];
}

export function TrendChart({ summaries }: TrendChartProps) {
  if (summaries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>Belum ada data historis</p>
        <p className="text-sm mt-1">Mulai catat keuangan harian Anda</p>
      </div>
    );
  }

  const sorted = [...summaries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const maxProfit = Math.max(...sorted.map((s) => Math.abs(s.profit)));
  const minProfit = Math.min(...sorted.map((s) => s.profit));

  return (
    <div className="space-y-4">
      {/* Simple bar chart */}
      <div className="flex items-end justify-between h-32 gap-2">
        {sorted.map((summary, index) => {
          const height = maxProfit > 0
            ? (Math.abs(summary.profit) / maxProfit) * 100
            : 0;
          const isProfit = summary.profit >= 0;

          return (
            <div key={summary.id} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full rounded-t transition-all hover:opacity-80 ${
                  isProfit ? "bg-emerald-500" : "bg-red-500"
                }`}
                style={{ height: `${Math.max(height, 5)}%` }}
                title={formatCurrency(summary.profit)}
              />
              <p className="text-xs text-gray-500 mt-2">
                {new Date(summary.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span>Untung</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>Rugi</span>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2 mt-4">
        {sorted.reverse().slice(0, 5).map((summary) => {
          const isProfit = summary.profit >= 0;
          return (
            <div
              key={summary.id}
              className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl"
            >
              <div>
                <p className="text-sm text-gray-300">
                  {new Date(summary.date).toLocaleDateString("id-ID", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Margin {summary.marginPercent.toFixed(1)}%
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${
                    isProfit ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {formatCurrency(summary.profit)}
                </p>
                <span
                  className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                    isProfit
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {isProfit ? "Untung" : "Rugi"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

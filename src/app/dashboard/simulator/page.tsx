"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/layout/SectionCard";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export default function SimulatorPage() {
  const [formData, setFormData] = useState({
    productName: "",
    costPerUnit: 0,
    currentPrice: 0,
    dailySalesUnits: 0,
    newPrice: 0,
  });

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to analyze scenario");
      return res.json();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const result = mutation.data;

  return (
    <LayoutShell>
      <div className="p-4 md:p-8 space-y-6">
        <PageHeader
          title="Simulasi Harga"
          description="Lihat dampak perubahan harga terhadap profit Anda"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <SectionCard title="Data Simulasi">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nama Produk"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                required
              />
              <Input
                label="HPP (Biaya Produksi per Unit)"
                type="number"
                value={formData.costPerUnit}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    costPerUnit: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
              <Input
                label="Harga Jual Sekarang"
                type="number"
                value={formData.currentPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentPrice: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
              <Input
                label="Penjualan Harian (unit)"
                type="number"
                value={formData.dailySalesUnits}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dailySalesUnits: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
              <Input
                label="Harga Jual Baru (Simulasi)"
                type="number"
                value={formData.newPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newPrice: parseFloat(e.target.value) || 0,
                  })
                }
                required
              />
              <Button type="submit" isLoading={mutation.isPending}>
                Simulasikan
              </Button>
            </form>
          </SectionCard>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Current */}
                <SectionCard title="Sekarang" className="bg-slate-800/50">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Harga</p>
                      <p className="text-lg font-semibold text-gray-200">
                        {formatCurrency(result.current.price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Margin</p>
                      <p className="text-lg font-semibold text-gray-200">
                        {result.current.margin.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Profit Harian</p>
                      <p className="text-lg font-semibold text-emerald-400">
                        {formatCurrency(result.current.dailyProfit)}
                      </p>
                    </div>
                  </div>
                </SectionCard>

                {/* Simulated */}
                <SectionCard title="Simulasi" className="bg-emerald-500/5 border-emerald-500/20">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Harga</p>
                      <p className="text-lg font-semibold text-gray-200">
                        {formatCurrency(result.simulated.price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Margin</p>
                      <p className="text-lg font-semibold text-gray-200">
                        {result.simulated.margin.toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Profit Harian</p>
                      <p className={`text-lg font-semibold ${
                        result.simulated.dailyProfit > result.current.dailyProfit
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}>
                        {formatCurrency(result.simulated.dailyProfit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Est. Volume</p>
                      <p className="text-sm text-gray-400">
                        {result.simulated.estimatedVolume.toFixed(0)} unit/hari
                      </p>
                    </div>
                  </div>
                </SectionCard>
              </div>

              {/* Difference */}
              <SectionCard>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-400 mb-2">Perubahan Profit</p>
                  <p className={`text-3xl font-bold ${
                    result.difference.profitChange >= 0
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}>
                    {result.difference.profitChange >= 0 ? "+" : ""}
                    {formatCurrency(result.difference.profitChange)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    ({result.difference.profitChangePercent >= 0 ? "+" : ""}
                    {result.difference.profitChangePercent.toFixed(1)}%)
                  </p>
                </div>
              </SectionCard>

              {/* AI Advice */}
              <SectionCard>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">
                      Analisis AI
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-300 whitespace-pre-line">
                      {result.adviceText}
                    </p>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}
        </div>
      </div>
    </LayoutShell>
  );
}

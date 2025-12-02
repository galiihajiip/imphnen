"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { ProfitAnalysisForm } from "@/components/features/ProfitAnalysisForm";
import { PricingDecisionForm } from "@/components/features/PricingDecisionForm";

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "profit";
  const [activeTab, setActiveTab] = useState<"profit" | "pricing">(
    initialTab as "profit" | "pricing"
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Dashboard Keuangan
          </h1>
          <p className="text-gray-400">
            Kelola keuangan usaha Anda dengan bantuan AI
          </p>
        </div>

        {/* Tabs */}
        <Card className="p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("profit")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === "profit"
                  ? "bg-primary text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Analisis Profit
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === "pricing"
                  ? "bg-warning text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Rekomendasi Harga
            </button>
          </div>
        </Card>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === "profit" ? (
            <ProfitAnalysisForm />
          ) : (
            <PricingDecisionForm />
          )}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

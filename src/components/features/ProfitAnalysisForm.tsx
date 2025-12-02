"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface ProfitFormData {
  salesTotal: number;
  cogsTotal: number;
  operationalCost: number;
}

interface ProfitResult {
  profit: number;
  profitMargin: number;
  status: string;
  insightText: string;
}

export function ProfitAnalysisForm() {
  const [result, setResult] = useState<ProfitResult | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<ProfitFormData>();

  const mutation = useMutation({
    mutationFn: async (data: ProfitFormData) => {
      const response = await fetch("/api/profit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal menganalisis profit");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const onSubmit = (data: ProfitFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Analisis Profit Harian</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Total Penjualan (Rp)"
            type="number"
            placeholder="Contoh: 5000000"
            {...register("salesTotal", { 
              required: "Total penjualan harus diisi",
              valueAsNumber: true,
              min: { value: 0, message: "Harus positif" }
            })}
            error={errors.salesTotal?.message}
          />
          
          <Input
            label="Biaya Pokok Penjualan / HPP (Rp)"
            type="number"
            placeholder="Contoh: 3000000"
            {...register("cogsTotal", { 
              required: "Biaya pokok harus diisi",
              valueAsNumber: true,
              min: { value: 0, message: "Harus positif" }
            })}
            error={errors.cogsTotal?.message}
          />
          
          <Input
            label="Biaya Operasional (Rp)"
            type="number"
            placeholder="Contoh: 1000000"
            {...register("operationalCost", { 
              required: "Biaya operasional harus diisi",
              valueAsNumber: true,
              min: { value: 0, message: "Harus positif" }
            })}
            error={errors.operationalCost?.message}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            isLoading={mutation.isPending}
          >
            Analisis Sekarang
          </Button>
        </form>

        {mutation.isError && (
          <div className="mt-4 p-4 bg-danger/10 border border-danger rounded-xl">
            <p className="text-danger text-sm">
              {mutation.error?.message || "Terjadi kesalahan"}
            </p>
          </div>
        )}
      </Card>

      {result && (
        <Card className="p-6 space-y-6">
          <h3 className="text-xl font-bold text-white">Hasil Analisis</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-input rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Profit Bersih</p>
              <p className={`text-2xl font-bold ${
                result.profit > 0 ? "text-primary" : 
                result.profit < 0 ? "text-danger" : "text-gray-300"
              }`}>
                {formatCurrency(result.profit)}
              </p>
            </div>
            
            <div className="p-4 bg-input rounded-xl">
              <p className="text-sm text-gray-400 mb-1">Margin Profit</p>
              <p className={`text-2xl font-bold ${
                result.profitMargin > 0 ? "text-primary" : 
                result.profitMargin < 0 ? "text-danger" : "text-gray-300"
              }`}>
                {formatPercentage(result.profitMargin)}
              </p>
            </div>
          </div>

          <div className="p-6 bg-input rounded-xl">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Penjelasan AI</h4>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {result.insightText}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

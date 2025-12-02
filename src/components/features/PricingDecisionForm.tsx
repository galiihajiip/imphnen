"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface PricingFormData {
  productName: string;
  costPerUnit: number;
  currentPrice: number;
  desiredMarginMin: number;
  desiredMarginMax: number;
}

interface PriceSuggestion {
  price: number;
  margin: number;
  label: string;
  description: string;
}

interface PricingResult {
  currentMargin: number;
  suggestedPrices: PriceSuggestion[];
  adviceText: string;
}

export function PricingDecisionForm() {
  const [result, setResult] = useState<PricingResult | null>(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm<PricingFormData>({
    defaultValues: {
      desiredMarginMin: 20,
      desiredMarginMax: 40,
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: PricingFormData) => {
      const response = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Gagal menghasilkan rekomendasi");
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  const onSubmit = (data: PricingFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Rekomendasi Harga Jual</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Nama Produk"
            type="text"
            placeholder="Contoh: Kue Brownies"
            {...register("productName", { 
              required: "Nama produk harus diisi"
            })}
            error={errors.productName?.message}
          />
          
          <Input
            label="Biaya Produksi per Unit (Rp)"
            type="number"
            placeholder="Contoh: 15000"
            {...register("costPerUnit", { 
              required: "Biaya produksi harus diisi",
              valueAsNumber: true,
              min: { value: 0, message: "Harus positif" }
            })}
            error={errors.costPerUnit?.message}
          />
          
          <Input
            label="Harga Jual Saat Ini (Rp)"
            type="number"
            placeholder="Contoh: 25000"
            {...register("currentPrice", { 
              required: "Harga saat ini harus diisi",
              valueAsNumber: true,
              min: { value: 0, message: "Harus positif" }
            })}
            error={errors.currentPrice?.message}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Target Margin Min (%)"
              type="number"
              placeholder="20"
              {...register("desiredMarginMin", { 
                required: "Margin minimum harus diisi",
                valueAsNumber: true,
                min: { value: 0, message: "Minimal 0%" },
                max: { value: 100, message: "Maksimal 100%" }
              })}
              error={errors.desiredMarginMin?.message}
            />
            
            <Input
              label="Target Margin Max (%)"
              type="number"
              placeholder="40"
              {...register("desiredMarginMax", { 
                required: "Margin maksimum harus diisi",
                valueAsNumber: true,
                min: { value: 0, message: "Minimal 0%" },
                max: { value: 100, message: "Maksimal 100%" }
              })}
              error={errors.desiredMarginMax?.message}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            variant="secondary"
            isLoading={mutation.isPending}
          >
            Dapatkan Rekomendasi
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
          <h3 className="text-xl font-bold text-white">Rekomendasi Harga</h3>
          
          <div className="p-4 bg-input rounded-xl">
            <p className="text-sm text-gray-400 mb-1">Margin Saat Ini</p>
            <p className="text-2xl font-bold text-warning">
              {formatPercentage(result.currentMargin)}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Opsi Harga
            </p>
            {result.suggestedPrices.map((suggestion, index) => (
              <div 
                key={index}
                className="p-4 bg-input rounded-xl border-2 border-transparent hover:border-warning transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-block px-3 py-1 bg-warning/20 text-warning text-xs font-semibold rounded-full mb-2">
                      {suggestion.label}
                    </span>
                    <p className="text-2xl font-bold text-white">
                      {formatCurrency(suggestion.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Margin</p>
                    <p className="text-lg font-semibold text-warning">
                      {formatPercentage(suggestion.margin)}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-400">{suggestion.description}</p>
              </div>
            ))}
          </div>

          <div className="p-6 bg-input rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Saran AI</h4>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {result.adviceText}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

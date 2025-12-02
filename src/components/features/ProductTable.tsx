"use client";

import { useState } from "react";
import { ProductWithMargin } from "@/domain/finance/models";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface ProductTableProps {
  products: ProductWithMargin[];
  onEdit: (product: ProductWithMargin) => void;
  onPriceAdvice: (product: ProductWithMargin) => void;
}

export function ProductTable({ products, onEdit, onPriceAdvice }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <p>Belum ada produk</p>
        <p className="text-sm mt-1">Tambahkan produk pertama Anda</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      healthy: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      thin: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      danger: "bg-red-500/10 text-red-400 border-red-500/20",
    };

    const labels = {
      healthy: "Sehat",
      thin: "Tipis",
      danger: "Bahaya",
    };

    return (
      <span
        className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${
          styles[status as keyof typeof styles]
        }`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                Nama Produk
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                HPP
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                Harga Jual
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                Margin
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-400">
                Status
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
              >
                <td className="py-3 px-4">
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      {product.name}
                    </p>
                    {product.category && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {product.category}
                      </p>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-right text-sm text-gray-300">
                  {formatCurrency(product.costPerUnit)}
                </td>
                <td className="py-3 px-4 text-right text-sm text-gray-300">
                  {formatCurrency(product.pricePerUnit)}
                </td>
                <td className="py-3 px-4 text-right text-sm font-medium text-gray-200">
                  {product.margin.toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-center">
                  {getStatusBadge(product.status)}
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onPriceAdvice(product)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Saran Harga
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-slate-800/50 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-200">
                  {product.name}
                </h3>
                {product.category && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {product.category}
                  </p>
                )}
              </div>
              {getStatusBadge(product.status)}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-gray-500">HPP</p>
                <p className="text-gray-300 font-medium">
                  {formatCurrency(product.costPerUnit)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Harga Jual</p>
                <p className="text-gray-300 font-medium">
                  {formatCurrency(product.pricePerUnit)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-700">
              <div>
                <p className="text-xs text-gray-500">Margin</p>
                <p className="text-sm font-semibold text-gray-200">
                  {product.margin.toFixed(1)}%
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(product)}
                  className="px-3 py-1.5 text-xs bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onPriceAdvice(product)}
                  className="px-3 py-1.5 text-xs bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors"
                >
                  Saran
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

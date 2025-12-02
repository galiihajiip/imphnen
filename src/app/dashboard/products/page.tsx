"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionCard } from "@/components/layout/SectionCard";
import { ProductTable } from "@/components/features/ProductTable";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ProductWithMargin } from "@/domain/finance/models";
import { analyzeProducts } from "@/domain/finance/productAnalyzer";

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    costPerUnit: 0,
    pricePerUnit: 0,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return analyzeProducts(data);
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowAddForm(false);
      setFormData({ name: "", category: "", costPerUnit: 0, pricePerUnit: 0 });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate(formData);
  };

  const handleEdit = (product: ProductWithMargin) => {
    // TODO: Implement edit modal
    console.log("Edit product:", product);
  };

  const handlePriceAdvice = (product: ProductWithMargin) => {
    // TODO: Implement price advice modal
    console.log("Price advice for:", product);
  };

  const dangerProducts = products.filter((p) => p.status === "danger");
  const thinProducts = products.filter((p) => p.status === "thin");

  return (
    <LayoutShell>
      <div className="p-4 md:p-8 space-y-6">
        <PageHeader
          title="Produk"
          description="Kelola produk dan pantau margin keuntungan"
          action={
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? "Batal" : "+ Tambah Produk"}
            </Button>
          }
        />

        {/* Alerts */}
        {dangerProducts.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-sm text-red-400">
              ⚠️ {dangerProducts.length} produk dengan margin bahaya (&lt;10%)
            </p>
          </div>
        )}

        {thinProducts.length > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
            <p className="text-sm text-yellow-400">
              ⚠️ {thinProducts.length} produk dengan margin tipis (10-20%)
            </p>
          </div>
        )}

        {/* Add Form */}
        {showAddForm && (
          <SectionCard title="Tambah Produk Baru">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nama Produk"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <Input
                label="Kategori (opsional)"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="HPP (Biaya Produksi)"
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
                  label="Harga Jual"
                  type="number"
                  value={formData.pricePerUnit}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pricePerUnit: parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>
              <Button type="submit" isLoading={addMutation.isPending}>
                Simpan Produk
              </Button>
            </form>
          </SectionCard>
        )}

        {/* Product Table */}
        <SectionCard title="Daftar Produk">
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onPriceAdvice={handlePriceAdvice}
          />
        </SectionCard>
      </div>
    </LayoutShell>
  );
}

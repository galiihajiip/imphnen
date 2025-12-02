// API Route for Products

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(1, "Nama produk harus diisi"),
  category: z.string().optional(),
  costPerUnit: z.number().min(0, "HPP harus positif"),
  pricePerUnit: z.number().min(0, "Harga jual harus positif"),
});

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedInput = productSchema.parse(body);

    const product = await prisma.product.create({
      data: validatedInput,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error("Create product error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Data tidak valid", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Gagal menambah produk" },
      { status: 500 }
    );
  }
}

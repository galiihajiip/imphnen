// API Route for Single Product

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { z } from "zod";

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  category: z.string().optional(),
  costPerUnit: z.number().min(0).optional(),
  pricePerUnit: z.number().min(0).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedInput = updateProductSchema.parse(body);

    const product = await prisma.product.update({
      where: { id: params.id },
      data: validatedInput,
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Update product error:", error);

    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Data tidak valid", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Gagal mengupdate produk" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}

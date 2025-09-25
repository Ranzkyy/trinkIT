// app/api/menu/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET -> ambil semua menu
export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      where: { isAvailable: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(menus);
  } catch (error) {
    return NextResponse.json({ error: "Gagal ambil menu" }, { status: 500 });
  }
}

// POST -> tambah menu baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const menu = await prisma.menu.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
        category: body.category,
        isAvailable: body.isAvailable ?? true,
      },
    });
    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json({ error: "Gagal tambah menu" }, { status: 500 });
  }
}

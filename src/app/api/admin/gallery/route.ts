import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { galleryInputSchema } from "@/lib/validators";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.galleryItem.findMany({
    orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const parsed = galleryInputSchema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }

  const item = await prisma.galleryItem.create({
    data: parsed.data,
  });

  return NextResponse.json({ item }, { status: 201 });
}

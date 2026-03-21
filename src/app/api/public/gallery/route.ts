import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.galleryItem.findMany({
    where: { isPublished: true },
    orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
  });

  return NextResponse.json({ items });
}

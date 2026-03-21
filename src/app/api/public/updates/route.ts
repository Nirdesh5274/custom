import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const allowedTypes = ["NOTICE", "NEWS", "EVENT"] as const;
type UpdateType = (typeof allowedTypes)[number];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const typeParam = searchParams.get("type");
  const limitParam = Number(searchParams.get("limit") ?? "20");

  const where = {
    isPublished: true,
    ...(typeParam && allowedTypes.includes(typeParam as UpdateType)
      ? { type: typeParam as UpdateType }
      : {}),
  };

  const items = await prisma.updateItem.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: Number.isNaN(limitParam) ? 20 : Math.min(Math.max(limitParam, 1), 100),
  });

  return NextResponse.json({ items });
}

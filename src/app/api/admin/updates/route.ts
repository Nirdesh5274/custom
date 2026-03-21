import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { updateInputSchema } from "@/lib/validators";

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.updateItem.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });

  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const parsed = updateInputSchema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }

  const item = await prisma.updateItem.create({
    data: {
      ...parsed.data,
      publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null,
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}

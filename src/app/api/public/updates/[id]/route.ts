import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const item = await prisma.updateItem.findUnique({
    where: { id },
  });

  if (!item || !item.isPublished) {
    return NextResponse.json({ message: "Update not found" }, { status: 404 });
  }

  return NextResponse.json({ item });
}

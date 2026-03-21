import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { updatePatchSchema } from "@/lib/validators";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const item = await prisma.updateItem.findUnique({ where: { id } });

  if (!item) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ item });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const data = await request.json();
  const parsed = updatePatchSchema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }

  const item = await prisma.updateItem.update({
    where: { id },
    data: {
      ...parsed.data,
      ...(parsed.data.publishedAt !== undefined
        ? { publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : null }
        : {}),
    },
  });

  return NextResponse.json({ item });
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  await prisma.updateItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

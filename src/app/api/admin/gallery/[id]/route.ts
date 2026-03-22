import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { galleryPatchSchema } from "@/lib/validators";
import { enforceIpRateLimit, enforceTrustedOrigin } from "@/lib/request-security";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const item = await prisma.galleryItem.findUnique({ where: { id } });

  if (!item) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ item });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const originBlock = enforceTrustedOrigin(request);
  if (originBlock) {
    return originBlock;
  }

  const rateLimitBlock = enforceIpRateLimit(request, {
    keyPrefix: "admin-gallery-write",
    limit: 50,
    windowMs: 60_000,
  });
  if (rateLimitBlock) {
    return rateLimitBlock;
  }

  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const data = await request.json();
  const parsed = galleryPatchSchema.safeParse(data);

  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.flatten() }, { status: 400 });
  }

  const item = await prisma.galleryItem.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json({ item });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const originBlock = enforceTrustedOrigin(request);
  if (originBlock) {
    return originBlock;
  }

  const rateLimitBlock = enforceIpRateLimit(request, {
    keyPrefix: "admin-gallery-write",
    limit: 50,
    windowMs: 60_000,
  });
  if (rateLimitBlock) {
    return rateLimitBlock;
  }

  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await prisma.galleryItem.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}

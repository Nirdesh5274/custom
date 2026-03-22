import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { galleryInputSchema } from "@/lib/validators";
import { enforceIpRateLimit, enforceTrustedOrigin } from "@/lib/request-security";

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

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { updateInputSchema } from "@/lib/validators";
import { enforceIpRateLimit, enforceTrustedOrigin } from "@/lib/request-security";

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
  const originBlock = enforceTrustedOrigin(request);
  if (originBlock) {
    return originBlock;
  }

  const rateLimitBlock = enforceIpRateLimit(request, {
    keyPrefix: "admin-updates-write",
    limit: 60,
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

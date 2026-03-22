import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { enforceIpRateLimit, enforceTrustedOrigin } from "@/lib/request-security";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const originBlock = enforceTrustedOrigin(req);
  if (originBlock) {
    return originBlock;
  }

  const rateLimitBlock = enforceIpRateLimit(req, {
    keyPrefix: "admin-files-delete",
    limit: 30,
    windowMs: 60_000,
  });
  if (rateLimitBlock) {
    return rateLimitBlock;
  }

  const session = await requireAdmin();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  try {
    await prisma.fileStorage.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
}

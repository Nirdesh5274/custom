import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const file = await prisma.fileStorage.findUnique({ where: { id } });

    if (!file) {
      return new NextResponse("File not found", { status: 404 });
    }

    const buffer = Buffer.from(file.data, "base64");
    const isSvg = file.mimetype === "image/svg+xml";
    const disposition = isSvg ? "attachment" : "inline";

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": file.mimetype,
        "Content-Disposition": `${disposition}; filename="${file.filename}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(buffer.length),
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; sandbox;",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch {
    return new NextResponse("Error serving file", { status: 500 });
  }
}

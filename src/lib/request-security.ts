import { NextResponse } from "next/server";

type RateLimitOptions = {
  keyPrefix: string;
  limit: number;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateLimitBucket>();

function cleanupExpiredBuckets(now: number) {
  for (const [key, bucket] of rateBuckets) {
    if (bucket.resetAt <= now) {
      rateBuckets.delete(key);
    }
  }
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export function enforceTrustedOrigin(request: Request): NextResponse | null {
  const origin = request.headers.get("origin");
  if (!origin) {
    return NextResponse.json({ message: "Forbidden origin" }, { status: 403 });
  }

  let requestOrigin = "";
  try {
    requestOrigin = new URL(request.url).origin;
  } catch {
    return NextResponse.json({ message: "Invalid request URL" }, { status: 400 });
  }

  const configuredOrigins = (process.env.ALLOWED_ADMIN_ORIGINS ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const nextAuthUrl = process.env.NEXTAUTH_URL?.trim();
  if (nextAuthUrl) {
    configuredOrigins.push(nextAuthUrl);
  }

  const allowedOrigins = new Set<string>([requestOrigin, ...configuredOrigins]);

  if (!allowedOrigins.has(origin)) {
    return NextResponse.json({ message: "Forbidden origin" }, { status: 403 });
  }

  return null;
}

export function enforceIpRateLimit(request: Request, options: RateLimitOptions): NextResponse | null {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const ip = getClientIp(request);
  const key = `${options.keyPrefix}:${ip}`;
  const existing = rateBuckets.get(key);

  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  if (existing.count >= options.limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    return NextResponse.json(
      { message: "Too many requests. Please retry later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfterSeconds),
        },
      },
    );
  }

  existing.count += 1;
  rateBuckets.set(key, existing);
  return null;
}

import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const requestId = randomUUID();

  logger.info(
    {requestId, method: "POST", route: "/api/auth/sync" },
    "Auth sync request received"
  );

  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      logger.warn({requestId, route: "/api/auth/sync" }, "missing authorization header");
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = await getAdminAuth().verifyIdToken(token);

    const user = await prisma.user.upsert({
      where: { firebaseUid: decoded.uid },
      update: {
        email: decoded.email!,
        name: decoded.name ?? null,
      },
      create: {
        firebaseUid: decoded.uid,
        email: decoded.email!,
        name: decoded.name ?? null,
      },
    });

    logger.info(
      {
        requestId,
        userId: user.id,
        firebaseUid: decoded.uid,
      },
      "user synced successfully"
    );

    return NextResponse.json({ user });
  } catch (error) {
    logger.error({requestId, error, route: "/api/auth/sync" }, "Auth sync error");
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
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

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Auth sync error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

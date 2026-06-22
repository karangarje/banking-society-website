import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any)?.role;
    if (userRole !== "MANAGER" && userRole !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const logs = await prisma.auditLog.findMany({
      orderBy: { timestamp: "desc" },
      take: 200, // Limit to recent 200 logs
    });

    return NextResponse.json(logs);
  } catch (error: any) {
    console.error("GET /api/admin/audit-logs error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

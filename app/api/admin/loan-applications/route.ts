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

    const applications = await prisma.loanApplication.findMany({
      include: {
        member: {
          select: {
            name: true,
            email: true,
            phone: true,
            memberId: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(applications);
  } catch (error: any) {
    console.error("GET /api/admin/loan-applications error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

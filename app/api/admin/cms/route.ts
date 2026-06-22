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

    const settings = await prisma.cMSSetting.findMany({
      orderBy: { key: "asc" },
    });

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("GET /api/admin/cms error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any)?.role;
    const { key, valueEn, valueMr, group } = await req.json();

    if (!key || valueEn === undefined || valueMr === undefined || !group) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const setting = await prisma.cMSSetting.upsert({
      where: { key },
      update: { valueEn, valueMr, group },
      create: { key, valueEn, valueMr, group },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "UPDATE_CMS",
        details: `Updated CMS setting for key: ${key}`,
      },
    });

    return NextResponse.json(setting);
  } catch (error: any) {
    console.error("POST /api/admin/cms error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

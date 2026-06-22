import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.cMSSetting.findMany({
      where: { group: "about" },
    });
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any)?.role !== "MANAGER" && (session.user as any)?.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    
    // Upsert by key
    const item = await prisma.cMSSetting.upsert({
      where: { key: data.key },
      update: {
        valueEn: data.valueEn,
        valueMr: data.valueMr,
        group: "about",
      },
      create: {
        key: data.key,
        valueEn: data.valueEn,
        valueMr: data.valueMr,
        group: "about",
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "UPSERT_ABOUT_CONTENT",
        details: `Saved about content setting: ${item.key}`,
      },
    });

    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

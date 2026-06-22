import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any)?.role !== "MANAGER" && (session.user as any)?.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const data = await req.json();

    const item = await prisma.cMSSetting.update({
      where: { id },
      data: {
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
        action: "UPDATE_ABOUT_CONTENT",
        details: `Updated about content: ${item.key}`,
      },
    });

    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any)?.role !== "MANAGER" && (session.user as any)?.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    const target = await prisma.cMSSetting.findUnique({ where: { id } });
    if (!target) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await prisma.cMSSetting.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "DELETE_ABOUT_CONTENT",
        details: `Deleted about content: ${target.key}`,
      },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

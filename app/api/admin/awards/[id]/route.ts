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

    const item = await prisma.award.update({
      where: { id },
      data: {
        titleEn: data.titleEn,
        titleMr: data.titleMr,
        year: data.year,
        descriptionEn: data.descriptionEn,
        descriptionMr: data.descriptionMr,
        imageUrl: data.imageUrl,
        isActive: data.isActive,
        sortingOrder: parseInt(data.sortingOrder) || 0,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "UPDATE_AWARD",
        details: `Updated award: ${item.titleEn}`,
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
    
    const target = await prisma.award.findUnique({ where: { id } });
    if (!target) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await prisma.award.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "DELETE_AWARD",
        details: `Deleted award: ${target.titleEn}`,
      },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

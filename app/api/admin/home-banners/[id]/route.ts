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

    const banner = await prisma.homeBanner.update({
      where: { id },
      data: {
        titleEn: data.titleEn,
        titleMr: data.titleMr,
        subtitleEn: data.subtitleEn,
        subtitleMr: data.subtitleMr,
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl,
        isActive: data.isActive,
        sortingOrder: parseInt(data.sortingOrder) || 0,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "UPDATE_HOME_BANNER",
        details: `Updated home banner: ${banner.titleEn}`,
      },
    });

    return NextResponse.json(banner);
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
    
    const target = await prisma.homeBanner.findUnique({ where: { id } });
    if (!target) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await prisma.homeBanner.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "DELETE_HOME_BANNER",
        details: `Deleted home banner: ${target.titleEn}`,
      },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

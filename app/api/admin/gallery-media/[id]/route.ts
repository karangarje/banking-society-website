import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;
    const allowedRoles = ["SUPER_ADMIN", "MANAGER", "EMPLOYEE"];
    if (!session || !allowedRoles.includes(userRole)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const data = await req.json();

    const sortOrderValue = typeof data.sortOrder === "number" 
      ? data.sortOrder 
      : (parseInt(data.sortOrder, 10) || 0);

    const media = await prisma.galleryMedia.update({
      where: { id },
      data: {
        titleEn: data.titleEn,
        titleMr: data.titleMr,
        descriptionEn: data.descriptionEn ?? "",
        descriptionMr: data.descriptionMr ?? "",
        imageUrl: data.imageUrl,
        category: data.category,
        sortOrder: sortOrderValue,
        isActive: data.isActive,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "UPDATE_GALLERY_MEDIA",
        details: `Updated gallery media: ${media.titleEn}`,
      },
    });

    return NextResponse.json(media);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;
    const allowedRoles = ["SUPER_ADMIN", "MANAGER", "EMPLOYEE"];
    if (!session || !allowedRoles.includes(userRole)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    
    const target = await prisma.galleryMedia.findUnique({ where: { id } });
    if (!target) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    await prisma.galleryMedia.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "DELETE_GALLERY_MEDIA",
        details: `Deleted gallery media: ${target.titleEn}`,
      },
    });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

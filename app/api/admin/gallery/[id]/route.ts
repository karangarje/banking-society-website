import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { titleEn, titleMr, category, imageUrl, sortingOrder, isActive } = await req.json();

    const targetImage = await prisma.galleryImage.findUnique({ where: { id } });
    if (!targetImage) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    const updated = await prisma.galleryImage.update({
      where: { id },
      data: {
        titleEn: titleEn !== undefined ? titleEn : targetImage.titleEn,
        titleMr: titleMr !== undefined ? titleMr : targetImage.titleMr,
        category: category !== undefined ? category : targetImage.category,
        imageUrl: imageUrl !== undefined ? imageUrl : targetImage.imageUrl,
        sortingOrder: sortingOrder !== undefined ? parseInt(sortingOrder) : targetImage.sortingOrder,
        isActive: isActive !== undefined ? isActive : targetImage.isActive,
      },
    });

    const userRole = (session.user as any)?.role;
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "UPDATE_GALLERY_IMAGE",
        details: `Updated gallery image: ${updated.titleEn}`,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /api/admin/gallery/[id] error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const targetImage = await prisma.galleryImage.findUnique({ where: { id } });
    if (!targetImage) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    await prisma.galleryImage.delete({ where: { id } });

    const userRole = (session.user as any)?.role;
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "DELETE_GALLERY_IMAGE",
        details: `Deleted gallery image: ${targetImage.titleEn}`,
      },
    });

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/admin/gallery/[id] error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

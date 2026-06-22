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
    const { titleEn, titleMr, youtubeUrl, isFeatured } = await req.json();

    const targetVideo = await prisma.galleryVideo.findUnique({ where: { id } });
    if (!targetVideo) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    const updated = await prisma.galleryVideo.update({
      where: { id },
      data: {
        titleEn: titleEn !== undefined ? titleEn : targetVideo.titleEn,
        titleMr: titleMr !== undefined ? titleMr : targetVideo.titleMr,
        youtubeUrl: youtubeUrl !== undefined ? youtubeUrl : targetVideo.youtubeUrl,
        isFeatured: isFeatured !== undefined ? isFeatured : targetVideo.isFeatured,
      },
    });

    const userRole = (session.user as any)?.role;
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "UPDATE_GALLERY_VIDEO",
        details: `Updated gallery video: ${updated.titleEn}`,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /api/admin/videos/[id] error:", error);
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

    const targetVideo = await prisma.galleryVideo.findUnique({ where: { id } });
    if (!targetVideo) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    await prisma.galleryVideo.delete({ where: { id } });

    const userRole = (session.user as any)?.role;
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "DELETE_GALLERY_VIDEO",
        details: `Deleted gallery video: ${targetVideo.titleEn}`,
      },
    });

    return NextResponse.json({ message: "Video deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/admin/videos/[id] error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

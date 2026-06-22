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

    const videos = await prisma.galleryVideo.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(videos);
  } catch (error: any) {
    console.error("GET /api/admin/videos error:", error);
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
    const { titleEn, titleMr, youtubeUrl, isFeatured } = await req.json();

    if (!titleEn || !titleMr || !youtubeUrl) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newVideo = await prisma.galleryVideo.create({
      data: {
        titleEn,
        titleMr,
        youtubeUrl,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "ADD_GALLERY_VIDEO",
        details: `Added gallery video: ${titleEn}`,
      },
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/videos error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

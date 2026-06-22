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

    const images = await prisma.galleryImage.findMany({
      orderBy: { sortingOrder: "asc" },
    });

    return NextResponse.json(images);
  } catch (error: any) {
    console.error("GET /api/admin/gallery error:", error);
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
    const { titleEn, titleMr, category, imageUrl, sortingOrder, isActive } = await req.json();

    if (!titleEn || !titleMr || !category || !imageUrl) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newImage = await prisma.galleryImage.create({
      data: {
        titleEn,
        titleMr,
        category,
        imageUrl,
        sortingOrder: sortingOrder ? parseInt(sortingOrder) : 0,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "ADD_GALLERY_IMAGE",
        details: `Added gallery image: ${titleEn}`,
      },
    });

    return NextResponse.json(newImage, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/gallery error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

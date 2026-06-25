import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;
    const allowedRoles = ["SUPER_ADMIN", "MANAGER", "EMPLOYEE"];
    if (!session || !allowedRoles.includes(userRole)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const items = await prisma.downloadDocument.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;
    const allowedRoles = ["SUPER_ADMIN", "MANAGER", "EMPLOYEE"];
    if (!session || !allowedRoles.includes(userRole)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    const sortOrderValue = typeof data.sortOrder === "number" 
      ? data.sortOrder 
      : (parseInt(data.sortOrder, 10) || 0);

    const item = await prisma.downloadDocument.create({
      data: {
        titleEn: data.titleEn,
        titleMr: data.titleMr,
        descriptionEn: data.descriptionEn || "",
        descriptionMr: data.descriptionMr || "",
        fileUrl: data.fileUrl,
        category: data.category,
        documentType: data.documentType || data.category,
        fileSize: data.fileSize || "0 KB",
        fileFormat: data.fileFormat || "PDF",
        sortOrder: sortOrderValue,
        isActive: data.isActive ?? true,
        downloadCount: 0,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "CREATE_DOWNLOAD_DOCUMENT",
        details: `Created download document: ${item.titleEn}`,
      },
    });

    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

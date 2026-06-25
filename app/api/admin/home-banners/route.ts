import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;
    const allowedRoles = ["MANAGER", "EMPLOYEE"];
    if (!session || !allowedRoles.includes(userRole)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const banners = await prisma.homeBanner.findMany({
      orderBy: { sortingOrder: "asc" },
    });
    return NextResponse.json(banners);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;
    const allowedRoles = ["MANAGER", "EMPLOYEE"];
    if (!session || !allowedRoles.includes(userRole)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    
    const sortingOrderValue = typeof data.sortingOrder === "number" 
      ? data.sortingOrder 
      : (parseInt(data.sortingOrder, 10) || 0);

    const banner = await prisma.homeBanner.create({
      data: {
        titleEn: "",
        titleMr: "",
        subtitleEn: "",
        subtitleMr: "",
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl || null,
        isActive: true,
        sortingOrder: sortingOrderValue,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "CREATE_HOME_BANNER",
        details: `Created home banner ID: ${banner.id}`,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

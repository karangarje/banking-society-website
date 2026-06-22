import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const banners = await prisma.homeBanner.findMany({
      orderBy: { sortingOrder: 'asc' },
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
    const allowedRoles = ["SUPER_ADMIN", "MANAGER", "EMPLOYEE"];
    if (!session || !allowedRoles.includes(userRole)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    const banner = await prisma.homeBanner.create({
      data: {
        titleEn: data.titleEn,
        titleMr: data.titleMr,
        subtitleEn: data.subtitleEn,
        subtitleMr: data.subtitleMr,
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl,
        isActive: data.isActive ?? true,
        sortingOrder: parseInt(data.sortingOrder) || 0,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "CREATE_HOME_BANNER",
        details: `Created home banner: ${banner.titleEn}`,
      },
    });

    return NextResponse.json(banner);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

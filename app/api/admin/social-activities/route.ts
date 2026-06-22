import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.socialActivity.findMany({
      orderBy: { sortingOrder: 'asc' },
    });
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any)?.role !== "MANAGER" && (session.user as any)?.role !== "SUPER_ADMIN")) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    const item = await prisma.socialActivity.create({
      data: {
        titleEn: data.titleEn,
        titleMr: data.titleMr,
        date: new Date(data.date),
        descriptionEn: data.descriptionEn,
        descriptionMr: data.descriptionMr,
        imageUrl: data.imageUrl,
        isActive: data.isActive ?? true,
        sortingOrder: parseInt(data.sortingOrder) || 0,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "CREATE_SOCIAL_ACTIVITY",
        details: `Created social activity: ${item.titleEn}`,
      },
    });

    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

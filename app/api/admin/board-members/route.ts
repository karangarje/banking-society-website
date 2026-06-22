import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.boardMember.findMany({
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
    const item = await prisma.boardMember.create({
      data: {
        name: data.name,
        designationEn: data.designationEn,
        designationMr: data.designationMr,
        imageUrl: data.imageUrl,
        isActive: data.isActive ?? true,
        sortingOrder: parseInt(data.sortingOrder) || 0,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "CREATE_BOARD_MEMBER",
        details: `Created board member: ${item.name}`,
      },
    });

    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

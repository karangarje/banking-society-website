import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.branch.findMany({
      orderBy: { createdAt: 'desc' },
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
    const item = await prisma.branch.create({
      data: {
        nameEn: data.nameEn,
        nameMr: data.nameMr,
        addressEn: data.addressEn,
        addressMr: data.addressMr,
        cityEn: data.cityEn,
        cityMr: data.cityMr,
        contact: data.contact,
        managerNameEn: data.managerNameEn,
        managerNameMr: data.managerNameMr,
        googleMapUrl: data.googleMapUrl,
        imageUrl: data.imageUrl,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "CREATE_BRANCH",
        details: `Created branch: ${item.nameEn}`,
      },
    });

    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.interestRate.findMany({
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
    const rateVal = data.interestRate !== undefined && data.interestRate !== null ? data.interestRate : data.rate;
    const item = await prisma.interestRate.create({
      data: {
        type: data.type,
        schemeNameEn: data.schemeNameEn,
        schemeNameMr: data.schemeNameMr,
        durationEn: data.durationEn,
        durationMr: data.durationMr,
        rate: rateVal,
        seniorCitizenRate: data.seniorCitizenRate !== undefined && data.seniorCitizenRate !== null ? parseFloat(data.seniorCitizenRate as any) : null,
        isActive: data.isActive ?? true,
        sortingOrder: parseInt(data.sortingOrder) || 0,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole: (session.user as any)?.role,
        action: "CREATE_INTEREST_RATE",
        details: `Created interest rate: ${item.schemeNameEn}`,
      },
    });

    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

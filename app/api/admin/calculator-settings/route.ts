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

    let setting = await prisma.loanCalculatorSetting.findFirst();
    if (!setting) {
      // Create a default settings record
      setting = await prisma.loanCalculatorSetting.create({
        data: {
          titleEn: "Home & Personal Loan Calculator",
          titleMr: "गृह आणि वैयक्तिक कर्ज कॅल्क्युलेटर",
          subtitleEn: "Calculate your monthly EMI easily",
          subtitleMr: "तुमचे मासिक ईएमआय सहज मोजा",
          defaultAmount: 100000,
          defaultInterestRate: 9.5,
          defaultTenure: 12,
          emiType: "MONTHLY",
        },
      });
    }

    return NextResponse.json(setting);
  } catch (error: any) {
    console.error("GET /api/admin/calculator-settings error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { titleEn, titleMr, subtitleEn, subtitleMr, defaultAmount, defaultInterestRate, defaultTenure, emiType } = await req.json();

    let setting = await prisma.loanCalculatorSetting.findFirst();

    if (setting) {
      setting = await prisma.loanCalculatorSetting.update({
        where: { id: setting.id },
        data: {
          titleEn: titleEn !== undefined ? titleEn : setting.titleEn,
          titleMr: titleMr !== undefined ? titleMr : setting.titleMr,
          subtitleEn: subtitleEn !== undefined ? subtitleEn : setting.subtitleEn,
          subtitleMr: subtitleMr !== undefined ? subtitleMr : setting.subtitleMr,
          defaultAmount: defaultAmount !== undefined ? defaultAmount : setting.defaultAmount,
          defaultInterestRate: defaultInterestRate !== undefined ? defaultInterestRate : setting.defaultInterestRate,
          defaultTenure: defaultTenure !== undefined ? parseInt(defaultTenure) : setting.defaultTenure,
          emiType: emiType !== undefined ? emiType : setting.emiType,
        },
      });
    } else {
      setting = await prisma.loanCalculatorSetting.create({
        data: {
          titleEn,
          titleMr,
          subtitleEn,
          subtitleMr,
          defaultAmount: defaultAmount || 100000,
          defaultInterestRate: defaultInterestRate || 9.5,
          defaultTenure: defaultTenure ? parseInt(defaultTenure) : 12,
          emiType: emiType || "MONTHLY",
        },
      });
    }

    // Audit log
    const userRole = (session.user as any)?.role;
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "UPDATE_CALCULATOR_SETTINGS",
        details: `Updated loan calculator settings`,
      },
    });

    return NextResponse.json(setting);
  } catch (error: any) {
    console.error("PUT /api/admin/calculator-settings error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

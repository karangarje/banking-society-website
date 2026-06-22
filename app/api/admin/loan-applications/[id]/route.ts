import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status, remarks } = await req.json();

    if (!status) {
      return NextResponse.json({ message: "Status is required" }, { status: 400 });
    }

    const targetApp = await prisma.loanApplication.findUnique({ where: { id } });
    if (!targetApp) {
      return NextResponse.json({ message: "Loan application not found" }, { status: 404 });
    }

    const updated = await prisma.loanApplication.update({
      where: { id },
      data: {
        status,
        remarks: remarks !== undefined ? remarks : targetApp.remarks,
      },
    });

    const userRole = (session.user as any)?.role;
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "UPDATE_LOAN_STATUS",
        details: `Updated loan application ${id} status to ${status}. Remarks: ${remarks || "None"}`,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /api/admin/loan-applications/[id] error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

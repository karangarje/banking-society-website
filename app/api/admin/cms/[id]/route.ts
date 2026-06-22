import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const setting = await prisma.cMSSetting.findUnique({ where: { id } });
    if (!setting) {
      return NextResponse.json({ message: "Setting not found" }, { status: 404 });
    }

    await prisma.cMSSetting.delete({ where: { id } });

    // Audit log
    const userRole = (session.user as any)?.role;
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "DELETE_CMS",
        details: `Deleted CMS setting with key: ${setting.key}`,
      },
    });

    return NextResponse.json({ message: "Setting deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/admin/cms/[id] error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

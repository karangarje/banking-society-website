import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any)?.role;
    if (userRole !== "MANAGER" && userRole !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const { name, username, email, password, role, status } = await req.json();

    const targetEmployee = await prisma.employee.findUnique({ where: { id } });
    if (!targetEmployee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }

    // Check unique username/email if changed
    if (username !== targetEmployee.username || email !== targetEmployee.email) {
      const existing = await prisma.employee.findFirst({
        where: {
          NOT: { id },
          OR: [
            username !== targetEmployee.username ? { username } : null,
            email !== targetEmployee.email ? { email } : null,
          ].filter(Boolean) as any[],
        },
      });
      if (existing) {
        return NextResponse.json({ message: "Username or email already in use" }, { status: 400 });
      }
    }

    const updateData: any = {
      name,
      username,
      email,
      role,
      status: status === "ACTIVE" || status === true || status === "true" ? "ACTIVE" : "INACTIVE",
    };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
      updateData.isLocked = false;
      updateData.failedAttempts = 0;
      updateData.lockUntil = null;
    }

    const updated = await prisma.employee.update({
      where: { id },
      data: updateData,
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "UPDATE_EMPLOYEE",
        details: `Updated employee ${username} (${role}). Status: ${updated.status}`,
      },
    });

    const { password: _, ...sanitized } = updated;
    return NextResponse.json(sanitized);
  } catch (error: any) {
    console.error("PUT /api/admin/employees/[id] error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any)?.role;
    if (userRole !== "MANAGER" && userRole !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    const targetEmployee = await prisma.employee.findUnique({ where: { id } });
    if (!targetEmployee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 });
    }

    // Can't delete self
    if (targetEmployee.id === (session.user as any)?.id) {
      return NextResponse.json({ message: "Cannot delete your own account" }, { status: 400 });
    }

    await prisma.employee.delete({ where: { id } });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "DELETE_EMPLOYEE",
        details: `Deleted employee ${targetEmployee.username}`,
      },
    });

    return NextResponse.json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/admin/employees/[id] error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

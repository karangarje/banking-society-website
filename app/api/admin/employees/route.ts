import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any)?.role;
    if (userRole !== "MANAGER" && userRole !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Exclude password hashes from response
    const sanitized = employees.map(({ password, ...rest }) => rest);
    return NextResponse.json(sanitized);
  } catch (error: any) {
    console.error("GET /api/admin/employees error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any)?.role;
    if (userRole !== "MANAGER" && userRole !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { name, username, email, password, role, status } = await req.json();

    if (!name || !username || !email || !password || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Check existing
    const existing = await prisma.employee.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existing) {
      return NextResponse.json({ message: "Username or email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = await prisma.employee.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role,
        status: status === "ACTIVE" || status === true || status === "true" ? "ACTIVE" : "INACTIVE",
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: (session.user as any)?.id,
        userRole,
        action: "CREATE_EMPLOYEE",
        details: `Created employee ${username} (${role})`,
      },
    });

    const { password: _, ...sanitized } = newEmployee;
    return NextResponse.json(sanitized, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/admin/employees error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { fullName, email, mobileNumber, subject, message } = data;

    if (!fullName || !email || !subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        fullName,
        email,
        mobileNumber: mobileNumber || null,
        subject,
        message,
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/public/contact-inquiries error:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

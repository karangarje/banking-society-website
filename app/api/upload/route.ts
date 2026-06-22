import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const filename = file.name.toLowerCase();
    const isImage = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    const isDocument = file.type === "application/pdf" ||
                       file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                       file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                       filename.endsWith(".pdf") ||
                       filename.endsWith(".docx") ||
                       filename.endsWith(".xlsx");

    if (!isImage && !isDocument) {
      return NextResponse.json({ message: "Invalid file type. Allowed: JPG, PNG, WEBP, PDF, DOCX, XLSX" }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ message: "File size exceeds 10MB limit." }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
    });

    return NextResponse.json({ url: blob.url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: error.message || "Failed to upload file" }, { status: 500 });
  }
}

import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;
    const allowedRoles = ["SUPER_ADMIN", "MANAGER", "EMPLOYEE"];
    if (!session || !allowedRoles.includes(userRole)) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    const filename = file.name.toLowerCase();
    const isImage = ["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
                     filename.endsWith(".jpg") ||
                     filename.endsWith(".jpeg") ||
                     filename.endsWith(".png") ||
                     filename.endsWith(".webp");

    const isDocument = file.type === "application/pdf" ||
                       file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
                       file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                       filename.endsWith(".pdf") ||
                       filename.endsWith(".docx") ||
                       filename.endsWith(".xlsx");

    if (!isImage && !isDocument) {
      return NextResponse.json({ message: "Invalid file type. Allowed: JPG, JPEG, PNG, WEBP, PDF, DOCX, XLSX" }, { status: 400 });
    }

    const maxSize = isImage ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB limit for images, 10MB for documents
    if (file.size > maxSize) {
      return NextResponse.json({ message: `File size exceeds the limit (${isImage ? "5MB" : "10MB"}).` }, { status: 400 });
    }

    // Use Vercel Blob if token is configured
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(file.name, file, {
          access: "public",
        });
        return NextResponse.json({ url: blob.url });
      } catch (blobError) {
        console.error("Vercel Blob upload failed, falling back to local:", blobError);
      }
    }

    // Local upload fallback
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    await writeFile(filePath, buffer);
    return NextResponse.json({ url: `/uploads/${uniqueFilename}` });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: error.message || "Failed to upload file" }, { status: 500 });
  }
}

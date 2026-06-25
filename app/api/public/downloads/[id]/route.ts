import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const item = await prisma.downloadDocument.update({
      where: { id },
      data: {
        downloadCount: { increment: 1 },
      },
    });
    return NextResponse.json({ downloadCount: item.downloadCount });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

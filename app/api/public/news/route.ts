import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.news.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [
        { isPinned: 'desc' },
        { createdAt: 'desc' }
      ],
    });
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

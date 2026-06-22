import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const items = await prisma.cMSSetting.findMany();
    // Convert array of settings into a key-value object for easy frontend access
    const settingsMap = items.reduce((acc, item) => {
      acc[item.key] = { en: item.valueEn, mr: item.valueMr };
      return acc;
    }, {} as any);
    return NextResponse.json(settingsMap);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

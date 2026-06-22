import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const item = await prisma.loanCalculatorSetting.findFirst();
    return NextResponse.json(item || {});
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

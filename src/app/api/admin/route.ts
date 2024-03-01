import { currentRole } from "@/shared/lib/auth/actions/get/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const role = await currentRole();

  if (role === "ADMIN") {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}

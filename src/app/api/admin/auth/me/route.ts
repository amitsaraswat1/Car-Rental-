import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuthFromRequest, verifyToken, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const { valid, email } = verifyToken(token);
  if (!valid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email,
      role: "Super Admin",
      businessName: "Royal Route",
    },
  });
}

import { NextRequest, NextResponse } from "next/server";
import { 
  DEFAULT_ADMIN_EMAIL, 
  DEFAULT_ADMIN_PASSWORD, 
  generateToken, 
  ADMIN_COOKIE_NAME 
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    const expectedEmail = DEFAULT_ADMIN_EMAIL.toLowerCase();

    // Verify credentials
    if (trimmedEmail !== expectedEmail || password !== DEFAULT_ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password. Please try again." },
        { status: 401 }
      );
    }

    const token = generateToken(trimmedEmail);

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful",
      user: { email: trimmedEmail, role: "Super Admin" },
    });

    // Set secure cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "Server error occurred during login" },
      { status: 500 }
    );
  }
}

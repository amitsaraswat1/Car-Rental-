import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "royal_admin_session";
const ADMIN_SECRET = process.env.ADMIN_SESSION_SECRET || "royal_route_car_rental_super_secret_session_key_2025";

export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@royalroute.in";
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export function generateToken(email: string): string {
  const timestamp = Date.now();
  const payload = `${email}:${timestamp}:${ADMIN_SECRET}`;
  return Buffer.from(payload).toString("base64");
}

export function verifyToken(token: string): { valid: boolean; email?: string } {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [email, timestampStr, secret] = decoded.split(":");

    if (secret !== ADMIN_SECRET) {
      return { valid: false };
    }

    const timestamp = parseInt(timestampStr, 10);
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    if (Date.now() - timestamp > maxAge) {
      return { valid: false };
    }

    return { valid: true, email };
  } catch {
    return { valid: false };
  }
}

export async function checkAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return false;
    const { valid } = verifyToken(token);
    return valid;
  } catch {
    return false;
  }
}

export function checkAdminAuthFromRequest(req: NextRequest): boolean {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return false;
    const { valid } = verifyToken(token);
    return valid;
  } catch {
    return false;
  }
}

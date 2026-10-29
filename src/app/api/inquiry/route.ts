import { NextRequest, NextResponse } from "next/server";
import { inquirySchema } from "@/lib/validation";
import { dispatchInquiryNotification } from "@/lib/email";
import { siteConfig } from "@/data/site";
import { addInquiry } from "@/lib/admin-store";

// Simple in-memory rate limiting map for spam protection (per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 10;

  const current = rateLimitMap.get(ip);
  if (!current || now > current.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (current.count >= maxRequests) {
    return true;
  }

  current.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Too many inquiries submitted from this device. Please call our 24x7 helpline directly at " + siteConfig.displayPhone 
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Anti-spam honeypot check: if bot filled this hidden field, return 200 silently
    if (body.honeypot && String(body.honeypot).trim() !== "") {
      console.warn(`[Anti-Spam] Honeypot triggered from IP ${ip}. Silently dropping payload.`);
      return NextResponse.json({
        success: true,
        message: siteConfig.inquiryNotice.responseTime,
        honeypot: true,
      });
    }

    // Validate payload with Zod
    const validationResult = inquirySchema.safeParse(body);
    if (!validationResult.success) {
      const errorDetails = validationResult.error.format();
      const firstErrorMessage = validationResult.error.issues?.[0]?.message || "Invalid form data";
      return NextResponse.json(
        { success: false, error: firstErrorMessage, details: errorDetails },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Persist inquiry in admin store for dashboard management
    const savedRecord = addInquiry(validatedData);

    // Dispatch email to owner & optional Google Sheet
    const dispatchResult = await dispatchInquiryNotification(validatedData);

    return NextResponse.json({
      success: true,
      message: siteConfig.inquiryNotice.responseTime,
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        tripType: validatedData.tripType,
        city: validatedData.city,
        pickupDate: validatedData.pickupDate,
        carType: validatedData.carType,
      },
      meta: {
        emailSent: dispatchResult.emailSent,
        simulated: dispatchResult.simulated,
      },
    });
  } catch (error: any) {
    console.error("[API /api/inquiry] Unhandled error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "We could not process your inquiry right now. Please call or WhatsApp us directly at " + siteConfig.displayPhone,
      },
      { status: 500 }
    );
  }
}

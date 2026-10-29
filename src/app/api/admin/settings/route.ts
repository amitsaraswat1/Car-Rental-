import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuthFromRequest } from "@/lib/admin-auth";
import { getStoredSettings, saveStoredSettings } from "@/lib/admin-store";
import { SiteConfig } from "@/data/site";

export async function GET(req: NextRequest) {
  if (!checkAdminAuthFromRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const settings = getStoredSettings();
  return NextResponse.json({ success: true, settings });
}

export async function PUT(req: NextRequest) {
  if (!checkAdminAuthFromRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updated = await req.json() as SiteConfig;
    saveStoredSettings(updated);
    return NextResponse.json({ success: true, message: "Settings updated successfully", settings: updated });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuthFromRequest } from "@/lib/admin-auth";
import { getStoredRates, saveStoredRates, StoredRatesData } from "@/lib/admin-store";

export async function GET(req: NextRequest) {
  if (!checkAdminAuthFromRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const rates = getStoredRates();
  return NextResponse.json({
    success: true,
    localPackageRates: rates.localRates,
    outstationRates: rates.outstation,
    airportBenchmarks: rates.airport,
  });
}

export async function PUT(req: NextRequest) {
  if (!checkAdminAuthFromRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json() as StoredRatesData;
    saveStoredRates(body);

    return NextResponse.json({
      success: true,
      message: "Rate benchmark updated successfully and synced with user website",
      rates: body,
    });
  } catch (error) {
    console.error("Rates update error:", error);
    return NextResponse.json({ success: false, error: "Failed to update rates" }, { status: 500 });
  }
}

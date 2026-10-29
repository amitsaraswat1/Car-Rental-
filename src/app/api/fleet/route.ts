import { NextResponse } from "next/server";
import { getStoredCars } from "@/lib/admin-store";

export async function GET() {
  const cars = getStoredCars();
  return NextResponse.json({
    success: true,
    cars,
  });
}

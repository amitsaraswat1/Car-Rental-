import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuthFromRequest } from "@/lib/admin-auth";
import { getStoredCars, saveStoredCars } from "@/lib/admin-store";
import { CarItem } from "@/data/cars";

export async function GET(req: NextRequest) {
  if (!checkAdminAuthFromRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const cars = getStoredCars();
  return NextResponse.json({ success: true, cars });
}

export async function POST(req: NextRequest) {
  if (!checkAdminAuthFromRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newCar = await req.json() as CarItem;

    if (!newCar.name || !newCar.category || !newCar.perKmRateOutstation) {
      return NextResponse.json({ success: false, error: "Name, category, and outstation rate are required" }, { status: 400 });
    }

    const cars = getStoredCars();
    const id = newCar.id || newCar.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    // Check if duplicate ID
    if (cars.some(c => c.id === id)) {
      return NextResponse.json({ success: false, error: "A car with this ID or name already exists" }, { status: 400 });
    }

    const createdCar: CarItem = {
      ...newCar,
      id,
      seats: Number(newCar.seats) || 4,
      luggage: Number(newCar.luggage) || 2,
      perKmRateOutstation: Number(newCar.perKmRateOutstation) || 12,
      localPackage8hr80km: Number(newCar.localPackage8hr80km) || 2000,
      airportTransferStarting: Number(newCar.airportTransferStarting) || 1200,
      minKmPerDay: Number(newCar.minKmPerDay) || 250,
      features: Array.isArray(newCar.features) ? newCar.features : ["Experienced Driver", "Clean AC Car"],
      imageUrl: newCar.imageUrl || "/images/cars/sedan.jpg",
    };

    cars.push(createdCar);
    saveStoredCars(cars);

    return NextResponse.json({ success: true, car: createdCar });
  } catch (error) {
    console.error("Error adding car:", error);
    return NextResponse.json({ success: false, error: "Failed to add vehicle" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!checkAdminAuthFromRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedCar = await req.json() as CarItem;

    if (!updatedCar.id) {
      return NextResponse.json({ success: false, error: "Car ID required for update" }, { status: 400 });
    }

    const cars = getStoredCars();
    const index = cars.findIndex(c => c.id === updatedCar.id);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Car not found" }, { status: 404 });
    }

    cars[index] = {
      ...cars[index],
      ...updatedCar,
      seats: Number(updatedCar.seats) || cars[index].seats,
      luggage: Number(updatedCar.luggage) || cars[index].luggage,
      perKmRateOutstation: Number(updatedCar.perKmRateOutstation) || cars[index].perKmRateOutstation,
      localPackage8hr80km: Number(updatedCar.localPackage8hr80km) || cars[index].localPackage8hr80km,
      airportTransferStarting: Number(updatedCar.airportTransferStarting) || cars[index].airportTransferStarting,
      minKmPerDay: Number(updatedCar.minKmPerDay) || cars[index].minKmPerDay,
    };

    saveStoredCars(cars);
    return NextResponse.json({ success: true, car: cars[index] });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json({ success: false, error: "Failed to update vehicle" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAdminAuthFromRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Car ID required" }, { status: 400 });
    }

    const cars = getStoredCars();
    const filtered = cars.filter(c => c.id !== id);

    if (filtered.length === cars.length) {
      return NextResponse.json({ success: false, error: "Car not found" }, { status: 404 });
    }

    saveStoredCars(filtered);
    return NextResponse.json({ success: true, message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json({ success: false, error: "Failed to delete vehicle" }, { status: 500 });
  }
}

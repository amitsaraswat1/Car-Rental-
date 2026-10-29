import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuthFromRequest } from "@/lib/admin-auth";
import { 
  getStoredInquiries, 
  updateInquiryStatus, 
  deleteInquiry, 
  InquiryStatus,
  StoredInquiry
} from "@/lib/admin-store";

export async function GET(req: NextRequest) {
  if (!checkAdminAuthFromRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const tripType = searchParams.get("tripType");
    const search = searchParams.get("search")?.toLowerCase();

    let list = getStoredInquiries();

    if (status && status !== "all") {
      list = list.filter((i) => i.status === status);
    }

    if (tripType && tripType !== "all") {
      list = list.filter((i) => i.tripType === tripType);
    }

    if (search) {
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(search) ||
          i.phone.includes(search) ||
          i.city.toLowerCase().includes(search) ||
          i.carType.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, inquiries: list });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!checkAdminAuthFromRequest(req)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Inquiry ID and status required" }, { status: 400 });
    }

    const updated = updateInquiryStatus(id, status as InquiryStatus, notes);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json({ success: false, error: "Failed to update inquiry" }, { status: 500 });
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
      return NextResponse.json({ success: false, error: "Inquiry ID required" }, { status: 400 });
    }

    const deleted = deleteInquiry(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Inquiry not found or could not be deleted" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json({ success: false, error: "Failed to delete inquiry" }, { status: 500 });
  }
}

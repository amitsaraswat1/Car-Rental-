import { InquiryFormData } from "./validation";
import { siteConfig } from "@/data/site";

export interface DispatchResult {
  success: boolean;
  emailSent: boolean;
  googleSheetAppended: boolean;
  simulated?: boolean;
  error?: string;
}

export async function dispatchInquiryNotification(data: InquiryFormData): Promise<DispatchResult> {
  let emailSent = false;
  let googleSheetAppended = false;
  let simulated = false;

  const resendApiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL || siteConfig.email;
  const googleSheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK_URL;

  // 1. Send Email Notification
  if (resendApiKey) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Royal Route Inquiries <onboarding@resend.dev>",
          to: [ownerEmail],
          reply_to: data.email || undefined,
          subject: `🚗 New Royal Route Inquiry from ${data.name} (${data.tripType.toUpperCase()} - ${data.city})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
              <h2 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">
                New Car Rental With Driver Inquiry
              </h2>
              
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Customer Name:</strong> ${data.name}</p>
                <p style="margin: 5px 0;"><strong>Phone (WhatsApp):</strong> <a href="tel:+91${data.phone}" style="color: #1e3a8a; font-weight: bold;">+91 ${data.phone}</a></p>
                ${data.email ? `<p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>` : ""}
              </div>

              <h3 style="color: #1e3a8a; margin-bottom: 10px;">Trip Specifications</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Trip Type:</td><td style="padding: 8px 0; font-weight: bold; text-transform: uppercase;">${data.tripType}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">City:</td><td style="padding: 8px 0; font-weight: bold;">${data.city}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Pickup Address:</td><td style="padding: 8px 0;">${data.pickupLocation}</td></tr>
                ${data.dropLocation ? `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Drop Destination:</td><td style="padding: 8px 0;">${data.dropLocation}</td></tr>` : ""}
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Pickup Date & Time:</td><td style="padding: 8px 0; font-weight: bold;">${data.pickupDate} at ${data.pickupTime}</td></tr>
                ${data.returnDate ? `<tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Return Date:</td><td style="padding: 8px 0;">${data.returnDate}</td></tr>` : ""}
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Passengers:</td><td style="padding: 8px 0;">${data.passengers}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Preferred Vehicle:</td><td style="padding: 8px 0; font-weight: bold; color: #d97706;">${data.carType}</td></tr>
              </table>

              ${data.message ? `
                <div style="margin-top: 20px; padding: 12px; background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 4px;">
                  <strong style="color: #92400e; font-size: 13px;">Special Requests / Notes:</strong>
                  <p style="margin: 5px 0 0; color: #78350f; font-size: 14px;">${data.message}</p>
                </div>
              ` : ""}

              <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center;">
                <a href="https://wa.me/91${data.phone}?text=${encodeURIComponent(`Hello ${data.name}, this is Royal Route regarding your ${data.tripType} inquiry for ${data.city}.`)}" 
                   style="display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 14px;">
                   Open WhatsApp Chat with Customer
                </a>
              </div>
            </div>
          `,
        }),
      });

      if (response.ok) {
        emailSent = true;
      } else {
        console.warn("[Email Notification] Resend API responded with error:", await response.text());
      }
    } catch (err) {
      console.error("[Email Notification] Error connecting to Resend:", err);
    }
  } else {
    // Development or missing API key: log cleanly to server console
    simulated = true;
    console.log("==================================================================");
    console.log("📬 [SIMULATED INQUIRY NOTIFICATION - ADD RESEND_API_KEY IN .env]");
    console.log(`To: ${ownerEmail}`);
    console.log(`Customer: ${data.name} (+91 ${data.phone})`);
    console.log(`Trip: ${data.tripType.toUpperCase()} | City: ${data.city} | Car: ${data.carType}`);
    console.log(`Pickup: ${data.pickupLocation} on ${data.pickupDate} at ${data.pickupTime}`);
    if (data.dropLocation) console.log(`Drop: ${data.dropLocation}`);
    if (data.message) console.log(`Notes: ${data.message}`);
    console.log("==================================================================");
    emailSent = true;
  }

  // 2. Optional Google Sheets Webhook Dispatch
  if (googleSheetWebhook) {
    try {
      const gSheetResponse = await fetch(googleSheetWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: data.name,
          phone: `+91${data.phone}`,
          email: data.email || "",
          tripType: data.tripType,
          city: data.city,
          pickupLocation: data.pickupLocation,
          dropLocation: data.dropLocation || "",
          pickupDate: data.pickupDate,
          pickupTime: data.pickupTime,
          returnDate: data.returnDate || "",
          passengers: data.passengers,
          carType: data.carType,
          message: data.message || "",
        }),
      });
      if (gSheetResponse.ok) {
        googleSheetAppended = true;
      }
    } catch (err) {
      console.warn("[Google Sheet Webhook] Error pushing row:", err);
    }
  }

  return {
    success: true,
    emailSent,
    googleSheetAppended,
    simulated,
  };
}

import React from "react";
import InquiryForm from "@/components/shared/InquiryForm";
import { siteConfig } from "@/data/site";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2,
  Calendar
} from "lucide-react";

export const metadata = {
  title: "Contact & Free Quote | Royal Route",
  description: `Get in touch with ${siteConfig.businessName} for all-inclusive Royal Route car rental quotes across Delhi NCR, Jaipur, Agra, and Chandigarh. 24x7 phone & WhatsApp helpline.`,
};

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 to-blue-950 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>24x7 Royal Route Helpline Available</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Contact Us & Get a Free Quote
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Planning a trip? Fill our simple inquiry form below or connect directly via Phone or WhatsApp. We reply within 15–30 minutes with guaranteed vehicle availability.
          </p>
        </div>
      </section>

      {/* Main Content: Split Form + Contact Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column (7 cols): The Core Inquiry Form */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>

          {/* Right Column (5 cols): Office Details, Direct Channels & Map */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Contact Cards */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                Direct Contact Channels
              </h3>

              {/* Call Helpline */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    24x7 Booking Helpline
                  </span>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="text-base font-extrabold text-slate-900 hover:text-blue-900 transition-colors"
                  >
                    {siteConfig.displayPhone}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Round-the-clock booking assistance & dispatch</p>
                </div>
              </div>

              {/* WhatsApp Assistant */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    WhatsApp Chat
                  </span>
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Royal Route, I would like to inquire about a car rental with driver.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-extrabold text-emerald-700 hover:text-emerald-600 transition-colors"
                  >
                    {siteConfig.displayWhatsapp}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Instant quotes, car photos & itinerary advice</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-900 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Official Email
                  </span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-base font-extrabold text-slate-900 hover:text-blue-900 transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Corporate agreements & GST invoices</p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4 pt-2 border-t border-slate-100">
                <div className="p-3 rounded-2xl bg-slate-100 text-slate-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-600 space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Head Operations Office
                  </span>
                  <p className="font-bold text-slate-900">{siteConfig.businessName}</p>
                  <p>{siteConfig.address.street}, {siteConfig.address.locality}</p>
                  <p>{siteConfig.address.city}, {siteConfig.address.state} - {siteConfig.address.pincode}</p>
                  <p className="text-amber-700 font-medium">({siteConfig.address.landmark})</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 pt-2 border-t border-slate-100">
                <div className="p-3 rounded-2xl bg-slate-100 text-slate-700 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-xs text-slate-600 space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Operating Schedule
                  </span>
                  <p><strong>Royal Route Dispatch:</strong> {siteConfig.workingHours.serviceAvailability}</p>
                  <p><strong>Office Walk-in:</strong> {siteConfig.workingHours.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map Placeholder */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-900" />
                <span>Our Operations Office Location</span>
              </span>

              {/* Visual Map Mockup / Iframe placeholder */}
              <div className="w-full h-52 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative flex flex-col items-center justify-center text-center p-4">
                <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center mb-2 shadow-md">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <p className="font-bold text-slate-900 text-xs">Royal Route Hub</p>
                <p className="text-[11px] text-slate-500 max-w-xs mt-0.5">
                  A6, Street No. 3, Hindon Vihar, Sector 49, Noida - 201304
                </p>
                <a
                  href={siteConfig.socialLinks.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-[11px] font-bold text-blue-900 hover:bg-slate-50 shadow-2xs transition-all"
                >
                  View on Google Maps
                </a>
              </div>
            </div>

            {/* 15-30 Min Guarantee Box */}
            <div className="p-6 rounded-3xl bg-blue-950 text-white space-y-2">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Quick Response Guarantee</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                During operating hours, our travel coordinators review and respond to every online inquiry within 15 to 30 minutes with locked-in quotes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/data/site";
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Car, 
  ArrowRight, 
  MessageCircle,
  Clock
} from "lucide-react";

export default function QuickInquiryStrip() {
  const router = useRouter();
  const [tripType, setTripType] = useState("outstation");
  const [city, setCity] = useState("delhi-ncr");
  const [pickupDate, setPickupDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent, method: "quote" | "whatsapp") => {
    e.preventDefault();
    setError("");

    // Validate 10-digit Indian phone if provided
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length > 0 && cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    const selectedCityObj = siteConfig.serviceCities.find(c => c.slug === city) || siteConfig.serviceCities[0];

    if (method === "whatsapp") {
      const message = `Hello Royal Route, I want a quick quote for:\n- Trip Type: ${tripType.toUpperCase()}\n- City: ${selectedCityObj.name}\n- Date: ${pickupDate || "Not specified"}\n- Phone: ${phone || "Will share on chat"}`;
      const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
      return;
    }

    // Redirect to detailed contact inquiry form with query params
    const query = new URLSearchParams({
      tripType,
      city: selectedCityObj.slug,
      date: pickupDate,
      phone: cleanPhone,
    }).toString();

    router.push(`/contact?${query}`);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200/80 -mt-8 relative z-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-5 mb-5 border-b border-slate-100 gap-2">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Fast Track Booking Assistance
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            Get an Indicative Quote in 2 Minutes
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
          <Clock className="w-3.5 h-3.5" />
          <span>Call back within 15–30 mins</span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={(e) => handleSubmit(e, "quote")}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Trip Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-blue-900" />
              <span>Trip Type</span>
            </label>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
            >
              <option value="airport">Airport Transfer (Fixed Fare)</option>
              <option value="local">Local Hourly (8h / 80km)</option>
              <option value="outstation">Outstation (One-Way / Round)</option>
              <option value="wedding">Wedding & Event Royal Route</option>
              <option value="corporate">Corporate Travel</option>
            </select>
          </div>

          {/* City Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-900" />
              <span>Pickup City</span>
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
            >
              {siteConfig.serviceCities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.state.split("/")[0]})
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-900" />
              <span>Pickup Date</span>
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={minDate || undefined}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-900" />
              <span>Phone (WhatsApp)</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-bold">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="90124 64250"
                maxLength={10}
                className="w-full px-3.5 py-3 rounded-r-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-xs text-rose-600 font-semibold">{error}</p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            No advance required to request a quote • Zero spam guaranteed
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "whatsapp")}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Get Full Quote</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

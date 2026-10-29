"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/data/site";
import { carsData } from "@/data/cars";
import { routesData } from "@/data/routes";
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Car, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";

function InquiryFormContent() {
  const searchParams = useSearchParams();

  // URL query prefill values
  const prefillCarId = searchParams.get("car") || "";
  const prefillRouteSlug = searchParams.get("route") || "";
  const prefillTripType = searchParams.get("type") || searchParams.get("tripType") || "outstation";
  const prefillCitySlug = searchParams.get("city") || "delhi-ncr";
  const prefillPhone = searchParams.get("phone") || "";

  // Find matching car or route name for prefill
  const matchedCar = carsData.find(c => c.id === prefillCarId);
  const matchedRoute = routesData.find(r => r.slug === prefillRouteSlug);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(prefillPhone);
  const [email, setEmail] = useState("");
  const [tripType, setTripType] = useState(prefillTripType);
  const [city, setCity] = useState(prefillCitySlug);
  const [pickupLocation, setPickupLocation] = useState(matchedRoute ? matchedRoute.sourceCity : "");
  const [dropLocation, setDropLocation] = useState(matchedRoute ? matchedRoute.destinationCity : "");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("09:00");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [fleetCars, setFleetCars] = useState(carsData);
  const [carType, setCarType] = useState(matchedCar ? matchedCar.name : "Prime Sedan (Dzire / Aura)");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // Anti-spam hidden field

  const [minDate, setMinDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
    async function loadLiveFleet() {
      try {
        const res = await fetch("/api/fleet");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.cars)) {
            setFleetCars(data.cars);
          }
        }
      } catch (err) {
        // silent fallback to carsData
      }
    }
    loadLiveFleet();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Simple frontend phone validation
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number (e.g. 9012464250)");
      return;
    }

    if (!pickupDate) {
      setErrorMessage("Please select a pickup date");
      return;
    }

    if (!pickupLocation.trim()) {
      setErrorMessage("Please enter your pickup location");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim(),
        tripType,
        city,
        pickupLocation: pickupLocation.trim(),
        dropLocation: dropLocation.trim(),
        pickupDate,
        pickupTime,
        returnDate: tripType === "outstation" ? returnDate : "",
        passengers: Number(passengers),
        carType,
        message: message.trim(),
        honeypot,
      };

      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit inquiry. Please try again.");
      }

      setSubmittedData({
        ...payload,
        submittedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred. Please call or WhatsApp us directly.");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS STATE SCREEN
  if (submittedData) {
    const whatsappPrefillText = `Hello Royal Route, I just submitted an inquiry on your website:\n- Name: ${submittedData.name}\n- Trip: ${submittedData.tripType.toUpperCase()} in ${submittedData.city}\n- Car: ${submittedData.carType}\n- Pickup: ${submittedData.pickupLocation}\n- Date: ${submittedData.pickupDate} at ${submittedData.pickupTime}\n- Phone: +91 ${submittedData.phone}\nCould you please share the quote?`;
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(whatsappPrefillText)}`;

    return (
      <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-emerald-500 shadow-2xl text-center space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Inquiry Successfully Received
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Thank You, {submittedData.name}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            {siteConfig.inquiryNotice.responseTime}
          </p>
        </div>

        {/* Submitted Summary Snapshot */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Trip Category:</span>
            <span className="font-bold uppercase text-blue-900">{submittedData.tripType}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Vehicle Selected:</span>
            <span className="font-bold text-slate-900">{submittedData.carType}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Pickup Date & Time:</span>
            <span className="font-bold text-slate-900">{submittedData.pickupDate} at {submittedData.pickupTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Contact Number:</span>
            <span className="font-bold text-slate-900">+91 {submittedData.phone}</span>
          </div>
        </div>

        {/* Immediate Direct Actions */}
        <div className="space-y-3 pt-2 max-w-md mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp Regarding This Inquiry</span>
          </a>

          <a
            href={`tel:${siteConfig.phone}`}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Need Urgent Confirmation? Call {siteConfig.displayPhone}</span>
          </a>

          <button
            type="button"
            onClick={() => setSubmittedData(null)}
            className="text-xs text-slate-500 hover:text-slate-800 underline font-medium pt-2 block mx-auto cursor-pointer"
          >
            Submit Another Trip Inquiry
          </button>
        </div>
      </div>
    );
  }

  // MAIN FORM
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Instant Quotation Request
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
          Request Your Free Royal Route Quote
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          No advance payment required. We will call you with a transparent all-inclusive quote.
        </p>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <p className="font-bold">Unable to process inquiry:</p>
            <p>{errorMessage}</p>
            <div className="pt-2 flex items-center gap-3">
              <a href={`tel:${siteConfig.phone}`} className="font-bold text-blue-900 underline">
                Call Us Directly
              </a>
              <span>•</span>
              <a 
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Royal Route, I need a car quote.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 underline"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Honeypot field (hidden from real users to catch automated spam bots) */}
      <div style={{ display: "none" }} aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-900" />
            <span>Full Name <span className="text-rose-500">*</span></span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Vikram Malhotra"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
          />
        </div>

        {/* 10-Digit Mobile */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-blue-900" />
            <span>Mobile Number (WhatsApp) <span className="text-rose-500">*</span></span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-slate-600 text-xs font-bold">
              +91
            </span>
            <input
              type="tel"
              required
              placeholder="90124 64250"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-r-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Email Address (Optional) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-900" />
            <span>Email Address <span className="text-slate-400 font-normal">(Optional, for GST invoice)</span></span>
          </label>
          <input
            type="email"
            placeholder="vikram@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
          />
        </div>

        {/* Trip Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-blue-900" />
            <span>Trip Type <span className="text-rose-500">*</span></span>
          </label>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
          >
            <option value="outstation">Outstation (One-Way or Round Trip)</option>
            <option value="airport">Airport Transfer (Fixed Fare)</option>
            <option value="local">Local Hourly Package (8h / 80km)</option>
            <option value="wedding">Wedding & Special Event Royal Route</option>
            <option value="corporate">Corporate & Executive Travel</option>
          </select>
        </div>

        {/* City Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-900" />
            <span>City Hub <span className="text-rose-500">*</span></span>
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
          >
            {siteConfig.serviceCities.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name} ({c.state.split("/")[0]})
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Car Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5 text-blue-900" />
            <span>Preferred Vehicle <span className="text-rose-500">*</span></span>
          </label>
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
          >
            {fleetCars.map((c) => (
              <option key={c.id} value={`${c.name} (${c.modelExamples || c.category})`}>
                {c.name} ({c.modelExamples || c.category}) - ₹{c.perKmRateOutstation}/km
              </option>
            ))}
            <option value="Any Available (Best Economy Quote)">Any Available (Best Economy Quote)</option>
          </select>
        </div>

        {/* Pickup Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-900" />
            <span>Pickup Address / Landmark <span className="text-rose-500">*</span></span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. IGI Airport Terminal 3 / Hotel or Home Address"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
          />
        </div>

        {/* Drop Address (Optional) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-900" />
            <span>Drop Destination <span className="text-slate-400 font-normal">(Optional for Local)</span></span>
          </label>
          <input
            type="text"
            placeholder="e.g. Taj East Gate Agra / Jaipur City Palace"
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
          />
        </div>

        {/* Pickup Date */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-blue-900" />
            <span>Pickup Date <span className="text-rose-500">*</span></span>
          </label>
          <input
            type="date"
            required
            min={minDate || undefined}
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
          />
        </div>

        {/* Pickup Time */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-900" />
            <span>Pickup Time <span className="text-rose-500">*</span></span>
          </label>
          <input
            type="time"
            required
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
          />
        </div>

        {/* Return Date (Shown for Outstation) */}
        {tripType === "outstation" && (
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Return Date <span className="text-slate-400 font-normal">(Leave empty if One-Way)</span></span>
            </label>
            <input
              type="date"
              min={pickupDate || minDate || undefined}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
            />
          </div>
        )}

        {/* Number of Passengers */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-900" />
            <span>Passengers (Excl. Driver)</span>
          </label>
          <input
            type="number"
            min={1}
            max={26}
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Special Requests & Notes */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          Special Requests or Add-Ons <span className="text-slate-400 font-normal">(e.g. child seat, roof carrier, flight number, extra stops)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Mention any specific stopovers, flight arrival numbers, or luggage requirements..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-medium focus:ring-2 focus:ring-blue-900 focus:outline-none transition-all"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm sm:text-base shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Submitting Your Inquiry...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>Submit Inquiry for Free Custom Quote</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </div>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-400 mt-3">
          🔒 Your contact details are safe. No credit card or advance required to request a quote.
        </p>
      </div>
    </form>
  );
}

export default function InquiryForm() {
  return (
    <Suspense fallback={
      <div className="p-12 text-center text-slate-500 bg-white rounded-3xl border border-slate-200">
        <span className="w-6 h-6 border-2 border-blue-900 border-t-transparent rounded-full animate-spin inline-block mb-2"></span>
        <p className="text-xs">Loading inquiry form...</p>
      </div>
    }>
      <InquiryFormContent />
    </Suspense>
  );
}

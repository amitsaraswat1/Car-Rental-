import React from "react";
import Link from "next/link";
import { CarItem } from "@/data/cars";
import { siteConfig } from "@/data/site";
import { 
  Users, 
  Luggage, 
  Check, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Fuel
} from "lucide-react";

interface CarCardProps {
  car: CarItem;
  featured?: boolean;
}

export default function CarCard({ car, featured = false }: CarCardProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello Royal Route, I want to inquire about booking the ${car.name} (${car.modelExamples}) with driver.`
  )}`;

  return (
    <div className={`rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden bg-white ${
      featured 
        ? "border-blue-900/40 shadow-xl ring-2 ring-blue-900/10" 
        : "border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300"
    }`}>
      {/* Card Header & Category Badge */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {car.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Commercial Driver
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">{car.name}</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">{car.modelExamples}</p>
        <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">{car.tagline}</p>
      </div>

      {/* Capacity & Fuel Row */}
      <div className="px-4 sm:px-6 py-3 bg-slate-50/80 border-y border-slate-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-700 font-semibold">
        <div className="flex items-center gap-1.5" title="Passenger Seating Capacity">
          <Users className="w-3.5 h-3.5 text-blue-900 shrink-0" />
          <span>{car.seats} Seats</span>
        </div>
        <div className="flex items-center gap-1.5" title="Luggage Capacity">
          <Luggage className="w-3.5 h-3.5 text-blue-900 shrink-0" />
          <span>{car.luggage} Bags</span>
        </div>
        <div className="flex items-center gap-1.5" title="Fuel Type">
          <Fuel className="w-3.5 h-3.5 text-blue-900 shrink-0" />
          <span>{car.fuelType.split("/")[0]}</span>
        </div>
      </div>

      {/* Pricing Benchmarks Grid */}
      <div className="p-6 py-4 grid grid-cols-2 gap-3 bg-white">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium block">Outstation Rate</span>
          <span className="text-lg font-extrabold text-slate-900">
            ₹{car.perKmRateOutstation}
            <span className="text-xs font-normal text-slate-500"> / km</span>
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">(Min {car.minKmPerDay} km/day)</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[11px] text-slate-500 font-medium block">Local 8h / 80km</span>
          <span className="text-lg font-extrabold text-blue-900">
            ₹{car.localPackage8hr80km.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">(Unlimited city stops)</span>
        </div>
      </div>

      {/* Features Checklist */}
      <div className="px-6 pb-6 pt-1 flex-1">
        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
          Vehicle Highlights
        </span>
        <ul className="space-y-1.5 text-xs text-slate-600">
          {car.features.slice(0, 4).map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Footer */}
      <div className="p-4 sm:p-6 pt-0 mt-auto flex items-center gap-2">
        <Link
          href={`/contact?car=${encodeURIComponent(car.id)}`}
          className="flex-1 py-3 px-3 sm:px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm text-center shadow-md transition-all flex items-center justify-center gap-1.5"
        >
          <span>Enquire for This Car</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shrink-0"
          title="Chat on WhatsApp about this car"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>

        <a
          href={`tel:${siteConfig.phone}`}
          className="p-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all shrink-0"
          title="Call helpline for instant quote"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
        </a>
      </div>
    </div>
  );
}

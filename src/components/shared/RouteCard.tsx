import React from "react";
import Link from "next/link";
import { RouteItem } from "@/data/routes";
import { siteConfig } from "@/data/site";
import { 
  Navigation, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle,
  Car
} from "lucide-react";

interface RouteCardProps {
  route: RouteItem;
}

export default function RouteCard({ route }: RouteCardProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello Royal Route, I want to inquire about a car with driver for the ${route.sourceCity} to ${route.destinationCity} trip.`
  )}`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="p-6 pb-4">
        {/* Route Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-3">
          <span className="flex items-center gap-1.5 text-blue-900 font-bold bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            <Navigation className="w-3.5 h-3.5" />
            <span>{route.distanceKm} km</span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{route.estimatedHours}</span>
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-900 transition-colors">
          {route.sourceCity} <span className="text-amber-500">→</span> {route.destinationCity}
        </h3>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">{route.highwayName}</span>
        </p>

        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {route.description}
        </p>
      </div>

      {/* Starting Rates Benchmarks */}
      <div className="px-6 py-3 bg-slate-50 border-y border-slate-100 grid grid-cols-2 gap-2 text-center">
        <div>
          <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Sedan (Dzire)</span>
          <span className="text-base font-extrabold text-slate-900">
            ₹{route.startingSedanPrice.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="border-l border-slate-200">
          <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Innova Crysta</span>
          <span className="text-base font-extrabold text-blue-900">
            ₹{route.startingInnovaPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Popular Stops & Action */}
      <div className="p-6 pt-4 mt-auto flex flex-col gap-3">
        <div className="text-[11px] text-slate-500">
          <span className="font-bold text-slate-700">En-route Highlights: </span>
          <span>{route.popularStops[0]}</span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Link
            href={`/routes/${route.slug}`}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition-all flex items-center justify-center gap-1.5"
          >
            <span>View Route Details</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
            title="Inquire about this route on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

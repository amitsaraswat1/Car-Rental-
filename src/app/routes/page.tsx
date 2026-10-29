import React from "react";
import Link from "next/link";
import { routesData } from "@/data/routes";
import { siteConfig } from "@/data/site";
import RouteCard from "@/components/shared/RouteCard";
import { Navigation, ShieldCheck, Phone, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Intercity Highway Routes & Cab Rates | Royal Route",
  description: "Browse popular outstation cab routes from Delhi NCR, Jaipur, Agra, and Chandigarh. Transparent sedan, SUV, and Innova Crysta rates with professional driver.",
};

export default function RoutesIndexPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold tracking-wide">
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Smooth Expressway & Highway Journeys</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Popular Intercity Routes & Fares
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Enjoy door-to-door highway travel in clean, commercial AC cars driven by expert highway chauffeurs. Transparent rates with zero surge pricing.
          </p>
        </div>
      </section>

      {/* Routes Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {routesData.map((route) => (
            <RouteCard key={route.slug} route={route} />
          ))}
        </div>
      </section>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { citiesData } from "@/data/cities";
import { siteConfig } from "@/data/site";
import { MapPin, Plane, Clock, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Operating Cities & Service Hubs | Royal Route",
  description: "Royal Route operates verified car rental with driver services across Delhi NCR, Jaipur, Agra, and Chandigarh. Doorstep pickup and airport transfers.",
};

export default function CitiesIndexPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-wide">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>North India Operating Hubs</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Our Service Cities & Hubs
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Ready fleet with verified commercial chauffeurs stationed across key metro areas and heritage hubs.
          </p>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {citiesData.map((city) => (
            <div
              key={city.slug}
              className="bg-white rounded-3xl border border-slate-200/90 p-7 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    {city.state.split("/")[0]}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {city.airport.code} Airport Hub
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {city.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {city.tagline}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Airport Transfer</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900">
                      From ₹{city.airport.transferStartingPrice}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[11px] text-slate-500 block">Local 8h / 80km</span>
                    <span className="text-sm sm:text-base font-extrabold text-blue-900">
                      From ₹{city.localPackageStartingPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <Link
                  href={`/cities/${city.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-700 group"
                >
                  <span>Explore {city.name} Fleet & Rates</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/contact?city=${encodeURIComponent(city.slug)}`}
                  className="w-full sm:w-auto px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl text-center transition-all"
                >
                  Book Cab
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

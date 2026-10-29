"use client";

import React, { useState } from "react";
import Link from "next/link";
import { carsData, CarCategory } from "@/data/cars";
import { siteConfig } from "@/data/site";
import CarCard from "@/components/shared/CarCard";
import { 
  Car, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function FleetPage() {
  const [cars, setCars] = useState(carsData);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  React.useEffect(() => {
    async function loadLiveFleet() {
      try {
        const res = await fetch("/api/fleet");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.cars)) {
            setCars(data.cars);
          }
        }
      } catch (err) {
        console.error("Error fetching live fleet:", err);
      }
    }
    loadLiveFleet();
  }, []);

  const categories = ["All", "Sedan", "SUV", "Premium SUV", "Hatchback", "Tempo Traveller"];

  const filteredCars = selectedCategory === "All" 
    ? cars 
    : cars.filter(car => car.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-slate-950 to-blue-950 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Commercial Yellow Plate Fleet • Royal Route Driven Only</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Our Premium Fleet & Indicative Rates
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Every car in our fleet is commercially registered, routinely inspected, sanitized, and driven by an experienced, courteous Royal Route driver. Zero self-drive stress.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 shadow-lg scale-105"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} featured={car.isPopular} />
          ))}
        </div>

        {/* Fleet Standards & Hygiene Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-blue-900/5 border border-blue-900/20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-blue-900 text-white shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Valid Commercial Permits</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                All vehicles carry All-India Tourist Permits (AITP) and yellow commercial registration. No illegal private vehicles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-blue-900 text-white shrink-0">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Chilled AC & Sanitization</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Powerful air-conditioning tested for peak Indian summers. Deep vacuumed seat covers, bottled water, and tissue boxes.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-blue-900 text-white shrink-0">
              <CheckCircle2 className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Highway Safety Gear</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Emergency first aid kit, fire extinguisher, stepney spare tyre, and FASTag enabled on every car for seamless toll pass.
              </p>
            </div>
          </div>
        </div>

        {/* Custom Vehicle Request Callout */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Need a Specific Vehicle or Luxury Fleet?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Looking for a Mercedes, BMW, Toyota Camry, or a 26-seater Force Traveller for a corporate convention or wedding baraat? Contact our fleet coordinator directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
            >
              Request Custom Vehicle Quote
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Royal Route, I need a luxury / custom vehicle with driver.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

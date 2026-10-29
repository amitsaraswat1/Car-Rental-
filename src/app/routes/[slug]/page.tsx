import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { routesData, RouteItem } from "@/data/routes";
import { siteConfig } from "@/data/site";
import { 
  Navigation, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Phone, 
  MessageCircle,
  Car,
  Fuel,
  Info
} from "lucide-react";

interface RoutePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return routesData.map((route) => ({
    slug: route.slug,
  }));
}

export async function generateMetadata({ params }: RoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = routesData.find((r) => r.slug === slug);
  if (!route) return {};

  return {
    title: `${route.sourceCity} to ${route.destinationCity} Car Rental with Driver | Starting ₹${route.startingSedanPrice}`,
    description: `Book a clean AC car with professional driver for ${route.sourceCity} to ${route.destinationCity} (${route.distanceKm} km, ${route.estimatedHours}). Sedan from ₹${route.startingSedanPrice}, Innova Crysta from ₹${route.startingInnovaPrice}. Zero hidden fees.`,
  };
}

export default async function RoutePage({ params }: RoutePageProps) {
  const { slug } = await params;
  const route = routesData.find((r) => r.slug === slug);

  if (!route) {
    notFound();
  }

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello Royal Route, I want to book a car with driver for ${route.sourceCity} to ${route.destinationCity} (${route.distanceKm} km).`
  )}`;

  return (
    <div className="w-full">
      {/* Route Hero */}
      <section className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-xs font-bold">
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Highway Express Royal Route</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            {route.sourceCity} to {route.destinationCity} <span className="text-amber-400">Car Rental with Driver</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal">
            {route.description}
          </p>

          {/* Metric Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-blue-400" />
              <span>Distance: <strong>{route.distanceKm} km</strong></span>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Travel Time: <strong>{route.estimatedHours}</strong></span>
            </div>

            <div className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Route: <strong>{route.highwayName}</strong></span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href={`/contact?route=${encodeURIComponent(route.slug)}`}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all"
            >
              Get Free Quote for this Route
            </Link>

            <a
              href={`tel:${siteConfig.phone}`}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Helpline</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        {/* Vehicle Comparison Cards for this Route */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Vehicle Options & Indicative Fares
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Choose Your Vehicle for {route.sourceCity} → {route.destinationCity}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Indicative base fares include driver allowance and fuel. FASTag tolls are billed at actuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sedan */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase text-blue-900 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                  Sedan (Dzire / Aura)
                </span>
                <h3 className="text-xl font-bold text-slate-900">Prime Sedan</h3>
                <p className="text-xs text-slate-600">
                  Ideal for couples, solo business executives, or families with up to 4 passengers and 2 suitcases.
                </p>

                <div className="py-2 border-y border-slate-100 space-y-1">
                  <span className="text-[11px] text-slate-500 block">Indicative Starting Fare:</span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    ₹{route.startingSedanPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>4 Passengers + Driver</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Chilled AC & Boot Space</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`/contact?route=${encodeURIComponent(route.slug)}&car=comfort-sedan`}
                className="mt-6 w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold text-center transition-colors block"
              >
                Enquire for Sedan
              </Link>
            </div>

            {/* SUV */}
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Family SUV (Ertiga)
                </span>
                <h3 className="text-xl font-bold text-slate-900">6-Seater Family SUV</h3>
                <p className="text-xs text-slate-600">
                  Perfect for joint families with extra legroom, flexible 3rd row, and dual AC vents.
                </p>

                <div className="py-2 border-y border-slate-100 space-y-1">
                  <span className="text-[11px] text-slate-500 block">Indicative Starting Fare:</span>
                  <span className="text-2xl font-extrabold text-emerald-800">
                    ₹{route.startingSuvPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>6 Passengers + Driver</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Dual Air Conditioning</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`/contact?route=${encodeURIComponent(route.slug)}&car=family-suv`}
                className="mt-6 w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold text-center transition-colors block"
              >
                Enquire for SUV
              </Link>
            </div>

            {/* Innova Crysta */}
            <div className="bg-white rounded-3xl p-7 border-2 border-amber-400 shadow-md hover:shadow-xl transition-all flex flex-col justify-between relative">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                  VIP Luxury (Most Popular)
                </span>
                <h3 className="text-xl font-bold text-slate-900">Toyota Innova Crysta</h3>
                <p className="text-xs text-slate-600">
                  The gold standard of Indian highway travel with plush captain seats and whisper-quiet suspension.
                </p>

                <div className="py-2 border-y border-slate-100 space-y-1">
                  <span className="text-[11px] text-slate-500 block">Indicative Starting Fare:</span>
                  <span className="text-2xl font-extrabold text-amber-600">
                    ₹{route.startingInnovaPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>6 Passengers + Large Boot</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Plush Reclining Captain Seats</span>
                  </li>
                </ul>
              </div>

              <Link
                href={`/contact?route=${encodeURIComponent(route.slug)}&car=premium-innova`}
                className="mt-6 w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold text-center transition-colors block shadow-sm"
              >
                Enquire for Innova Crysta
              </Link>
            </div>
          </div>
        </section>

        {/* Toll Note & En-route Stops */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-100/80 p-8 rounded-3xl border border-slate-200 space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-900" />
              <span>Toll Plazas & State Entry Taxes</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {route.tollNote}. FASTag receipts are provided by the driver or itemized on your final GST invoice without markup.
            </p>
          </div>

          <div className="bg-slate-100/80 p-8 rounded-3xl border border-slate-200 space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span>Recommended En-Route Stops</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {route.popularStops.map((stop, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{stop}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Outstation Royal Route Driver Benefits */}
        <section className="p-8 rounded-3xl bg-blue-900/5 border border-blue-900/20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-10 h-10 rounded-full bg-blue-900 text-white mx-auto flex items-center justify-center font-bold text-sm mb-2">
              ✓
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Door-to-Door Pickup</h4>
            <p className="text-xs text-slate-600 mt-1">Direct from your home, hotel, or office.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-blue-900 text-white mx-auto flex items-center justify-center font-bold text-sm mb-2">
              ✓
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Sightseeing Flexibility</h4>
            <p className="text-xs text-slate-600 mt-1">Stop anywhere en-route for tea, food, or photos.</p>
          </div>
          <div>
            <div className="w-10 h-10 rounded-full bg-blue-900 text-white mx-auto flex items-center justify-center font-bold text-sm mb-2">
              ✓
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Senior Highway Driver</h4>
            <p className="text-xs text-slate-600 mt-1">Familiar with speed limits, road diversions, and dhabas.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

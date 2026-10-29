import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { citiesData, CityData } from "@/data/cities";
import { routesData } from "@/data/routes";
import { siteConfig } from "@/data/site";
import { 
  MapPin, 
  Plane, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageCircle,
  Car,
  Navigation
} from "lucide-react";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return citiesData.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesData.find((c) => c.slug === slug);
  if (!city) return {};

  return {
    title: `Car Rental with Driver in ${city.name} | Verified Drivers`,
    description: `Book commercial yellow-plate car rental with driver in ${city.name}. Punctual airport transfers, local 8h/80km packages, and outstation trips to ${city.topDestinations.slice(0, 3).join(", ")}.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = citiesData.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  // Find routes originating or terminating in this city
  const cityRoutes = routesData.filter(
    (r) => r.sourceCity.toLowerCase().includes(city.name.toLowerCase()) || 
           r.destinationCity.toLowerCase().includes(city.name.toLowerCase())
  );

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hello Royal Route, I would like to inquire about booking a car with driver in ${city.name}.`
  )}`;

  return (
    <div className="w-full">
      {/* City Hero */}
      <section className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-bold">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Service Hub: {city.state}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Car Rental with Driver in <span className="text-amber-400">{city.name}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal">
            {city.heroSnippet}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs">
            <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <Plane className="w-4 h-4 text-blue-400" />
              <span>Airport Transfer from <strong>₹{city.airport.transferStartingPrice}</strong></span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Local 8h/80km from <strong>₹{city.localPackageStartingPrice}</strong></span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Commercial Driver Only</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-3">
            <Link
              href={`/contact?city=${encodeURIComponent(city.slug)}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all text-center"
            >
              Get Free Quote for {city.name}
            </Link>

            <a
              href={`tel:${siteConfig.phone}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Helpline</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main City Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        {/* City Overview & Key Highlights */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              City Royal Route Overview
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Reliable Royal Route Mobility in {city.name}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {city.localOverview}
            </p>

            <div className="pt-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Service Highlights in {city.name}:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {city.keyHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Airport Details Box */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Plane className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Airport Transfer Hub</span>
              </div>
              <h3 className="text-xl font-bold">{city.airport.name}</h3>
              <p className="text-xs text-slate-400">
                Airport Code: <span className="text-white font-mono font-bold">{city.airport.code}</span>
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Includes complimentary 45-minute flight delay buffer from landing, terminal gate greeting, and luggage loading.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block">Fixed Fare Starts at:</span>
              <span className="text-2xl font-extrabold text-amber-400">₹{city.airport.transferStartingPrice}</span>
              <Link
                href={`/contact?city=${encodeURIComponent(city.slug)}&type=airport`}
                className="mt-3 block w-full py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold text-center transition-colors"
              >
                Book Airport Transfer
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Pickup Points */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-900" />
            <span>Frequent Pickup & Drop Points in {city.name}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {city.popularPickupPoints.map((point, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 text-xs font-medium text-slate-700 flex items-center gap-2.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-blue-900 shrink-0"></span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Outstation Routes from this City */}
        {cityRoutes.length > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Intercity Road Journeys
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-emerald-700" />
                  <span>Popular Highway Routes Connecting {city.name}</span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityRoutes.map((route) => (
                <div key={route.slug} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full inline-block">
                      {route.distanceKm} km • {route.estimatedHours}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {route.sourceCity} → {route.destinationCity}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{route.description}</p>
                    <p className="text-xs font-extrabold text-blue-900 pt-2">
                      Starts at ₹{route.startingSedanPrice.toLocaleString("en-IN")} (Sedan)
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/routes/${route.slug}`}
                      className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>Route Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/contact?route=${encodeURIComponent(route.slug)}`}
                      className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold">Need a Car with Driver in {city.name}?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Get an instant customized quote with driver allowance and transparent toll estimates.
            </p>
          </div>
          <Link
            href={`/contact?city=${encodeURIComponent(city.slug)}`}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm text-center shadow-lg transition-all"
          >
            Request Instant Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { routesData } from "@/data/routes";
import { 
  Car, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  Heart
} from "lucide-react";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-28 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Overview Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shadow-md">
                <Car className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight">
                Royal <span className="text-amber-400">Route</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {siteConfig.subTagline}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-amber-300">
              <ShieldCheck className="w-4 h-4" />
              <span>Car Rental with Driver • Commercial Yellow Plate Cars</span>
            </div>

            <div className="pt-2 space-y-2 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="text-xs text-slate-400">
                  {siteConfig.address.street}, {siteConfig.address.locality}, {siteConfig.address.city}, {siteConfig.address.state} - {siteConfig.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-slate-400">{siteConfig.workingHours.serviceAvailability}</span>
              </div>
            </div>
          </div>

          {/* Quick Links & Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services#airport-transfers" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Airport Transfers</span>
                </Link>
              </li>
              <li>
                <Link href="/services#local-hourly-packages" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Local Hourly Packages (8h/80km)</span>
                </Link>
              </li>
              <li>
                <Link href="/services#outstation-trips" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Outstation One-Way & Round Trips</span>
                </Link>
              </li>
              <li>
                <Link href="/services#wedding-and-event-cars" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Wedding & Event Luxury Cars</span>
                </Link>
              </li>
              <li>
                <Link href="/services#corporate-travel" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>Corporate Travel with Driver</span>
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 font-semibold text-slate-300">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>View Complete Fleet</span>
                </Link>
              </li>
              <li>
                <Link href="/rates" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 font-semibold text-slate-300">
                  <ChevronRight className="w-3 h-3 text-amber-400" />
                  <span>Tariff & Pricing Cards</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities & Routes */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-400 pl-2">
              Popular Routes
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              {routesData.slice(0, 5).map((route) => (
                <li key={route.slug}>
                  <Link href={`/routes/${route.slug}`} className="hover:text-white transition-colors flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                    <span>{route.sourceCity} to {route.destinationCity}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Service Hubs
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {siteConfig.serviceCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/cities/${city.slug}`}
                      className="px-2 py-0.5 bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 rounded border border-slate-800"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Direct Help & Trust */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-400 pl-2">
              Quick Helpline
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have an urgent requirement or custom itinerary? Talk directly to our trip coordinators.
            </p>

            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl border border-slate-800 text-xs font-semibold transition-all"
            >
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{siteConfig.displayPhone}</span>
            </a>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Royal Route, I need an urgent car booking quote.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 rounded-xl border border-emerald-800 text-xs font-semibold transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{siteConfig.email}</span>
            </a>
          </div>
        </div>

        {/* Legal & Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {siteConfig.businessName}. All rights reserved. Commercial Car Rental with Driver.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/cancellation-policy" className="hover:text-white transition-colors">
              Cancellation & Refund Policy
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Indicative Rates Disclaimer Note */}
        <div className="mt-6 p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 text-center leading-relaxed">
          <strong>Important Notice:</strong> All fares and rates listed on this website are indicative benchmarks. Final quotes are confirmed at the time of inquiry based on exact itinerary, peak holiday dates, and vehicle availability. FASTag tolls, interstate border taxes, and municipal parking fees are billed at actuals.
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { 
  Phone, 
  MessageCircle, 
  Car, 
  Menu, 
  X, 
  Clock, 
  MapPin, 
  ShieldCheck,
  ChevronDown,
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [citiesDropdownOpen, setCitiesDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Fleet", href: "/fleet" },
    { label: "Services", href: "/services" },
    { label: "Tariff / Rates", href: "/rates" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80">
      {/* 1. TOP UTILITY STRIP */}
      <div className="bg-slate-950 text-slate-300 text-[11px] sm:text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Operating Hours & Trust Badge */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{siteConfig.workingHours.bookingHelpline}</span>
            </span>

            <span className="hidden md:inline-block text-slate-700">•</span>

            <span className="hidden md:inline-flex items-center gap-1.5 text-amber-300 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              <ShieldCheck className="w-3 h-3 text-amber-400" />
              <span>100% Yellow-Plate Commercial Fleet (With Driver Only)</span>
            </span>
          </div>

          {/* Right: Direct Helplines */}
          <div className="flex items-center gap-4 ml-auto font-medium">
            <a 
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
              title="Call Helpline"
            >
              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{siteConfig.displayPhone}</span>
            </a>

            <span className="text-slate-700">|</span>

            <a 
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Royal Route, I would like to inquire about a car rental with driver.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            {/* Crest Emblem */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 p-0.5 shadow-md group-hover:shadow-lg transition-all ring-1 ring-amber-400/40 shrink-0">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                <Car className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Brand Title & Subtitle */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 whitespace-nowrap">
                  Royal <span className="text-blue-900">Route</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 whitespace-nowrap">
                  <ShieldCheck className="w-2.5 h-2.5 text-amber-700" />
                  With Driver
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide whitespace-nowrap">
                Commercial Yellow-Plate Fleet
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-xs xl:text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                    active
                      ? "text-blue-900 bg-blue-50/80 font-extrabold"
                      : "text-slate-700 hover:text-blue-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Cities / Hubs Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCitiesDropdownOpen(!citiesDropdownOpen)}
                onBlur={() => setTimeout(() => setCitiesDropdownOpen(false), 200)}
                className={`flex items-center gap-1 px-3 py-2 text-xs xl:text-sm font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  pathname.startsWith("/cities")
                    ? "text-blue-900 bg-blue-50/80 font-extrabold"
                    : "text-slate-700 hover:text-blue-900 hover:bg-slate-50"
                }`}
              >
                <span>Cities</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${citiesDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {citiesDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Service Hubs
                  </div>
                  {siteConfig.serviceCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/cities/${city.slug}`}
                      className="flex items-center justify-between px-3.5 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-900 font-semibold transition-colors"
                      onClick={() => setCitiesDropdownOpen(false)}
                    >
                      <span>{city.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{city.state}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Call & Inquiry CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Helpline Quick Call */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:text-blue-900 hover:bg-slate-50 border border-slate-200 text-xs xl:text-sm font-bold transition-all whitespace-nowrap"
              title={`Call Helpline: ${siteConfig.displayPhone}`}
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="hidden xl:inline">{siteConfig.displayPhone}</span>
            </a>

            {/* Primary Quote CTA */}
            <Link
              href="/contact"
              className="flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs xl:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 shadow-2xl space-y-5 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 px-3 rounded-xl text-base font-bold transition-colors ${
                    active 
                      ? "text-blue-900 bg-blue-50 font-extrabold" 
                      : "text-slate-800 hover:text-blue-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Service Cities Mobile Strip */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">
              Service Hubs
            </p>
            <div className="grid grid-cols-2 gap-2">
              {siteConfig.serviceCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 text-xs font-semibold rounded-xl text-center border border-slate-200 transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-transform"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Helpline</span>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Royal Route, I need a car with driver quote.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-transform"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs sm:text-sm shadow-md active:scale-95 transition-all"
          >
            Request Instant Custom Quote
          </Link>
        </div>
      )}
    </header>
  );
}

import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { siteConfig } from "@/data/site";
import { 
  ShieldCheck, 
  Check, 
  X, 
  Users, 
  ArrowRight, 
  Phone, 
  MessageCircle,
  Clock,
  Sparkles,
  Plane,
  Navigation,
  Briefcase
} from "lucide-react";

export const metadata = {
  title: "Royal Route Services | Airport, Local Packages & Outstation",
  description: "Explore our professional car rental with driver services: fixed-fare airport transfers, local 8h/80km packages, outstation trips, wedding cars, and corporate travel.",
};

export default function ServicesPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 to-blue-950 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Dedicated Royal Route Drivers • 100% Doorstep Service</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Professional Royal Route Services
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Whether navigating heavy city traffic, catching a midnight flight, or heading out on a scenic highway holiday, our trained drivers ensure safe and restful transit.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
        {servicesData.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              id={service.slug}
              className={`rounded-3xl border border-slate-200/90 bg-white p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 scroll-mt-28`}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                {/* Left Description Column */}
                <div className="lg:w-7/12 space-y-5">
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-900 font-extrabold text-xs border border-blue-200">
                    {service.badge}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {service.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Indicative Pricing</span>
                      <span className="text-base sm:text-lg font-extrabold text-slate-950">{service.startingPrice}</span>
                    </div>

                    <Link
                      href={`/contact?service=${encodeURIComponent(service.id)}`}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Get Free Quote</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    </Link>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                      Popular Hubs & Routes
                    </span>
                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {service.popularChoices}
                    </p>
                  </div>
                </div>

                {/* Right Inclusions / Exclusions Column */}
                <div className="lg:w-5/12 bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-6 w-full">
                  {/* Inclusions */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-3">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>What is Included</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {service.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="pt-4 border-t border-slate-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5 mb-3">
                      <X className="w-4 h-4 text-rose-600" />
                      <span>Exclusions (Paid at Actuals)</span>
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {service.exclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <X className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For */}
                  <div className="pt-4 border-t border-slate-200">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5 mb-3">
                      <Users className="w-4 h-4 text-blue-900" />
                      <span>Best Suited For</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {service.idealFor.map((item, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white text-[11px] font-medium text-slate-700 rounded-lg border border-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom Call to Action */}
        <div className="p-8 sm:p-12 rounded-3xl bg-blue-950 text-white text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold">Have a Custom Itinerary in Mind?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Planning a multi-city Golden Triangle circuit, Rajasthan palace tour, or family pilgrimage to Haridwar? Our trip specialists will design a personalized, all-inclusive quote.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-all"
            >
              Request Custom Route Quote
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Helpline ({siteConfig.displayPhone})</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

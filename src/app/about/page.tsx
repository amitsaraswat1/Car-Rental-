import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { 
  ShieldCheck, 
  Car, 
  Users, 
  Award, 
  Clock, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  HeartHandshake,
  Star
} from "lucide-react";

export const metadata = {
  title: "About Us | Premium Car Rental with Driver in India",
  description: `Learn about ${siteConfig.businessName}: India's trusted commercial car rental with driver service. Background-verified Royal Route drivers, 100% sanitized AC cars, and 24x7 trip support across North India.`,
};

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 to-blue-950 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Serving India with Trust & Hospitality</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            About {siteConfig.businessName}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Bridging the gap between unpredictable street taxis and expensive luxury rentals. We deliver reliable, background-verified Royal Route transport across North India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        {/* Story & Mission Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Our Journey
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why We Exclusively Provide Cars <span className="text-blue-900">WITH DRIVER</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Navigating Indian traffic, unpredictable highway road works, and chaotic city parking can turn even a short weekend getaway into an exhausting chore. We founded {siteConfig.businessName} with a simple conviction: <em>travel should be about relaxing with family or preparing for your next business meeting, not battling highway traffic.</em>
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike app-based aggregators with surging prices and abrupt ride cancellations, we operate as a dedicated Royal Route service. Every vehicle in our fleet is commercially permitted with yellow plates, and every driver is an experienced professional who treats passenger safety and hospitality as paramount.
            </p>
          </div>

          {/* Stats Box */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-blue-900 text-white text-center space-y-1 shadow-lg">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">{siteConfig.trustStats.tripsCompleted}</span>
              <p className="text-xs text-blue-200 font-medium">Safe Highway & City Trips</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-900 text-white text-center space-y-1 shadow-lg">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">{siteConfig.trustStats.rating}</span>
              <p className="text-xs text-slate-400 font-medium">Customer Satisfaction Score</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-900 text-white text-center space-y-1 shadow-lg">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">{siteConfig.trustStats.verifiedDrivers}</span>
              <p className="text-xs text-slate-400 font-medium">Police-Verified Drivers</p>
            </div>
            <div className="p-6 rounded-3xl bg-blue-900 text-white text-center space-y-1 shadow-lg">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">{siteConfig.trustStats.fleetSize}</span>
              <p className="text-xs text-blue-200 font-medium">Modern Commercial Fleet</p>
            </div>
          </div>
        </section>

        {/* 4 Pillars of Royal Route Standards */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Zero Compromise on Quality
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Our 4 Pillars of Royal Route Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Background Checked</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every Royal Route driver undergoes police criminal verification, residential address verification, and permanent commercial driving badge verification.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Punctuality Commitment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We mandate that drivers report 15 minutes before the scheduled pickup time. Live flight tracking buffer prevents waiting charges for delayed arrivals.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Fleet Hygiene</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vehicles are inspected after every trip. Seat covers are washed, air filters are serviced, and cabins are vacuumed and deodorized before dispatch.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Courteous Etiquette</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our Royal Route drivers are soft-spoken, non-intrusive, dressed in clean attire, and respect passenger privacy, whether you are on a client call or family trip.
              </p>
            </div>
          </div>
        </section>

        {/* Legal & Regulatory Compliance */}
        <section className="p-8 rounded-3xl bg-slate-900 text-white space-y-4">
          <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Strict Commercial Transport Compliance</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold">100% Legal Commercial Yellow Plate Operations</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Many unauthorized car rental operators ply private white-number-plate vehicles illegally, putting passengers at serious legal risk and invalidating passenger insurance during highway checkpoints. At {siteConfig.businessName}, every single car is registered with commercial yellow plates under the Motor Vehicles Act, carrying valid All-India Tourist Permits (AITP), passenger liability insurance, and road fitness certificates.
          </p>
        </section>

        {/* Contact Strip */}
        <div className="p-8 rounded-3xl bg-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">Have Questions or Need an Urgent Booking?</h3>
            <p className="text-xs text-slate-300">Speak directly with our operations manager in Noida Sector 49 (Delhi NCR).</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Call Helpline</span>
            </a>
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

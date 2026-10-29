import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Cancellation & Refund Policy | Royal Route",
  description: `Transparent cancellation and refund terms for car rental with driver services by ${siteConfig.businessName}. Free cancellation up to 12 hours before pickup.`,
};

export default function CancellationPolicyPage() {
  return (
    <div className="w-full bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xs text-slate-500 mt-1">Customer-Friendly & Fair Travel Policies</p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm space-y-1">
          <div className="flex items-center gap-2 font-bold text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Customer First Promise: Zero Cancellation Fee up to 12 Hours Prior</span>
          </div>
          <p className="text-emerald-900">
            Plans change unexpectedly. You can cancel or reschedule your booking at no charge up to 12 hours before the scheduled pickup time.
          </p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Standard Cancellation Timelines</h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-200/80 font-bold text-slate-800">
                    <th className="p-3">Notice Given Before Scheduled Pickup</th>
                    <th className="p-3">Cancellation Fee</th>
                    <th className="p-3">Refund Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">12 Hours or More</td>
                    <td className="p-3 text-emerald-700 font-bold">₹0 (Zero Fee)</td>
                    <td className="p-3">100% Refund of Token Advance</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Between 4 and 12 Hours</td>
                    <td className="p-3 text-amber-700 font-bold">15% of Token Advance</td>
                    <td className="p-3">85% Refunded (or full credit voucher for future trip)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-900">Less than 4 Hours / After Driver Dispatched</td>
                    <td className="p-3 text-rose-700 font-bold">Token Advance Forfeited</td>
                    <td className="p-3">Compensation allocated directly to driver for reporting</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Flight Delay Protection (Airport Pickups)</h2>
            <p>
              We know domestic and international flights often experience delays. For all confirmed airport arrival bookings:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Our dispatch team tracks your flight number in real time.</li>
              <li>A complimentary <strong>45-minute waiting period</strong> is provided starting from the actual flight landing timestamp, NOT the scheduled time.</li>
              <li>No cancellation or penalty fees apply if your flight is officially delayed or rescheduled by the airline.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Refund Processing Timelines</h2>
            <p>
              Any refund due under this policy is initiated within <strong>24 business hours</strong> of cancellation. Funds will reflect in your original UPI account, bank account, or card within 3 to 5 business days, subject to standard Indian banking clearing cycles.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. How to Request Cancellation</h2>
            <p>
              To cancel or reschedule a trip, simply call our 24x7 helpline at <a href={`tel:${siteConfig.phone}`} className="text-blue-900 font-bold underline">{siteConfig.displayPhone}</a> or send a WhatsApp message to <a href={`https://wa.me/${siteConfig.whatsappNumber}`} className="text-emerald-700 font-bold underline">{siteConfig.displayWhatsapp}</a> with your name and pickup details.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

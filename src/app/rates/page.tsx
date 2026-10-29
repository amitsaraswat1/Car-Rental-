import React from "react";
import Link from "next/link";
import { localPackageRates, outstationRates, airportBenchmarks, extraChargesPolicy } from "@/data/rates";
import { getStoredRates } from "@/lib/admin-store";
import { siteConfig } from "@/data/site";
import { 
  ShieldCheck, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  MessageCircle,
  Clock,
  Car,
  Navigation,
  Plane
} from "lucide-react";

export const metadata = {
  title: "Tariff & Rates | Transparent Car Rental with Driver India",
  description: "Transparent indicative tariff tables for local 8h/80km packages, outstation per-km rates, airport transfer benchmarks, and driver allowances. Zero hidden charges.",
};

export default function RatesPage() {
  const storedRates = getStoredRates();
  const localPackages = storedRates.localRates || localPackageRates;
  const outstationPackages = storedRates.outstation || outstationRates;
  const airportPoints = storedRates.airport || airportBenchmarks;

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 to-blue-950 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>100% Transparent Billing • Zero Surge Pricing</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Tariff & Indicative Pricing Cards
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Clear, honest pricing benchmarks for local hourly packages, airport transfers, and intercity highway travel. All fares include dedicated Royal Route driver and sanitized AC car.
          </p>

          {/* Important Indicative Notice Callout */}
          <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs text-center max-w-2xl mx-auto leading-relaxed">
            <span className="font-bold text-amber-400">Notice: </span>
            All fares listed below are indicative baseline benchmarks. Peak holiday dates (e.g. Diwali, New Year) or custom itineraries will receive a transparent, locked-in quote prior to confirmation.
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-16">
        {/* Table 1: Local Hourly Packages */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                City Disposal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-900" />
                <span>Local Hourly Package Rates</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Keep car & driver at your disposal within municipal city limits with unlimited stops.
              </p>
            </div>
            <Link
              href="/contact?type=local"
              className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Book a Local Package</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="py-4 px-6 rounded-tl-3xl">Vehicle Category</th>
                  <th className="py-4 px-4">Popular Models</th>
                  <th className="py-4 px-4 text-center">8 Hrs / 80 Km</th>
                  <th className="py-4 px-4 text-center">12 Hrs / 120 Km</th>
                  <th className="py-4 px-4 text-center">Extra Km Rate</th>
                  <th className="py-4 px-6 text-center rounded-tr-3xl">Extra Hour Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {localPackages.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-extrabold text-slate-900">{item.category}</td>
                    <td className="py-4 px-4 text-slate-500">{item.exampleCars}</td>
                    <td className="py-4 px-4 text-center font-bold text-blue-900">
                      ₹{item.rate8hr80km.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-slate-900">
                      ₹{item.rate12hr120km.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-4 text-center text-slate-600">
                      ₹{item.extraKmRate} / km
                    </td>
                    <td className="py-4 px-6 text-center text-slate-600">
                      ₹{item.extraHourRate} / hr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500">
            * Day driver allowance included. Parking charges and municipal toll fees are paid at actuals per receipts.
          </p>
        </section>

        {/* Table 2: Outstation Highway Travel Rates */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Intercity Highways
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
                <Navigation className="w-6 h-6 text-emerald-700" />
                <span>Outstation Per-Km Rates (One-Way & Round Trip)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Indian commercial benchmark rates with seasoned highway Royal Route drivers and minimum daily running.
              </p>
            </div>
            <Link
              href="/contact?type=outstation"
              className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Get Outstation Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="py-4 px-6 rounded-tl-3xl">Vehicle Category</th>
                  <th className="py-4 px-4">Example Models</th>
                  <th className="py-4 px-4 text-center">Per-Km Rate</th>
                  <th className="py-4 px-4 text-center">Min. Daily Run</th>
                  <th className="py-4 px-4 text-center">Driver Day Allowance</th>
                  <th className="py-4 px-6 text-center rounded-tr-3xl">Driver Night Charge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {outstationPackages.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-extrabold text-slate-900">{item.category}</td>
                    <td className="py-4 px-4 text-slate-500">{item.exampleCars}</td>
                    <td className="py-4 px-4 text-center font-extrabold text-emerald-700">
                      ₹{item.perKmRate} / km
                    </td>
                    <td className="py-4 px-4 text-center text-slate-700 font-semibold">
                      {item.minKmPerDay} km / day
                    </td>
                    <td className="py-4 px-4 text-center text-slate-600">
                      ₹{item.driverDayAllowance} / day
                    </td>
                    <td className="py-4 px-6 text-center text-slate-600">
                      ₹{item.driverNightAllowance} (10 PM–6 AM)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500">
            * For round trips, total billed km is round-trip distance or (Days × Min Km/Day), whichever is higher. FASTag toll taxes and state border taxes are charged at actual government rates.
          </p>
        </section>

        {/* Table 3: Airport Transfer Benchmarks */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Punctual Pickups
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 flex items-center gap-2">
                <Plane className="w-6 h-6 text-amber-600" />
                <span>Airport Transfer Fixed Fares</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fixed zone-to-zone rates including complimentary 45-minute flight delay buffer and luggage help.
              </p>
            </div>
            <Link
              href="/contact?type=airport"
              className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>Book Airport Royal Route</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 shadow-xs bg-white">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="py-4 px-6 rounded-tl-3xl">Popular Airport Route</th>
                  <th className="py-4 px-4 text-center">Prime Sedan (Dzire)</th>
                  <th className="py-4 px-4 text-center">Family SUV (Ertiga)</th>
                  <th className="py-4 px-6 text-center rounded-tr-3xl">Toyota Innova Crysta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {airportPoints.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">{item.route}</td>
                    <td className="py-4 px-4 text-center font-bold text-blue-900">
                      ₹{item.sedanFare.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-slate-900">
                      ₹{item.suvFare.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6 text-center font-extrabold text-amber-700">
                      ₹{item.innovaFare.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Transparent Policy & Extra Charges Breakdown */}
        <section className="p-8 rounded-3xl bg-slate-100/90 border border-slate-200 space-y-6">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-900" />
            <h3 className="text-lg font-extrabold text-slate-900">
              Clear & Transparent Extra Charges Policy
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-700">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">FASTag Tolls & State Border Taxes</h4>
              <p className="text-slate-600 leading-relaxed">
                {extraChargesPolicy.tollsAndTaxes}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">Driver Day & Night Allowances</h4>
              <p className="text-slate-600 leading-relaxed">
                Day allowance ({extraChargesPolicy.driverAllowanceDayHours}) covers driver meals. Night allowance ({extraChargesPolicy.driverNightAllowanceHours}) applies only if driving past 10 PM.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">Free Cancellation Policy</h4>
              <p className="text-slate-600 leading-relaxed">
                {extraChargesPolicy.cancellationNotice}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900">Commercial GST Invoice</h4>
              <p className="text-slate-600 leading-relaxed">
                {extraChargesPolicy.gstNote} GST invoices with SAC code 9966 are provided for corporate tax claims.
              </p>
            </div>
          </div>
        </section>

        {/* Action Callout */}
        <div className="p-8 sm:p-10 rounded-3xl bg-blue-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold">Need a Complete Trip Quotation?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Tell us your pickup city, destination, and dates. We will calculate an all-inclusive exact quote.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/contact"
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm text-center shadow-md transition-all"
            >
              Request Quote
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm text-center border border-slate-700 transition-all flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

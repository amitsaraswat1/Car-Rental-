"use client";

import React, { useState, useEffect } from "react";
import {
  BadgePercent,
  Clock,
  Navigation,
  Plane,
  Save,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  ShieldAlert
} from "lucide-react";
import {
  localPackageRates as defaultLocal,
  outstationRates as defaultOutstation,
  airportBenchmarks as defaultAirport,
  LocalPackageRate,
  OutstationRate,
  AirportBenchmark
} from "@/data/rates";

export default function AdminRatesPage() {
  const [localRates, setLocalRates] = useState<LocalPackageRate[]>(defaultLocal);
  const [outstation, setOutstation] = useState<OutstationRate[]>(defaultOutstation);
  const [airport, setAirport] = useState<AirportBenchmark[]>(defaultAirport);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleLocalChange = (index: number, field: keyof LocalPackageRate, value: any) => {
    const updated = [...localRates];
    updated[index] = { ...updated[index], [field]: Number(value) || value };
    setLocalRates(updated);
  };

  const handleOutstationChange = (index: number, field: keyof OutstationRate, value: any) => {
    const updated = [...outstation];
    updated[index] = { ...updated[index], [field]: Number(value) || value };
    setOutstation(updated);
  };

  const handleAirportChange = (index: number, field: keyof AirportBenchmark, value: any) => {
    const updated = [...airport];
    updated[index] = { ...updated[index], [field]: Number(value) || value };
    setAirport(updated);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/rates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ localRates, outstation, airport }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Save rates error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            Tariff & Rate Cards Manager
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
              Live Benchmarks
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure standard hourly city packages, outstation per-km rates, and driver allowances.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {savedSuccess ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-950" />
              <span>Tariff Updated!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Changes..." : "Save Rate Cards"}</span>
            </>
          )}
        </button>
      </div>

      {/* 1. Local Hourly Packages Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">
                Local City Rental Packages
              </h3>
              <p className="text-xs text-slate-400">
                Standard 8 Hours / 80 KM and 12 Hours / 120 KM benchmarks
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Vehicle Category</th>
                <th className="py-3 px-3">Example Models</th>
                <th className="py-3 px-3">8h / 80km (₹)</th>
                <th className="py-3 px-3">12h / 120km (₹)</th>
                <th className="py-3 px-3">Extra KM (₹/km)</th>
                <th className="py-3 px-3">Extra Hr (₹/hr)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {localRates.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold font-sans text-slate-200">
                    {item.category}
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-400">
                    {item.exampleCars}
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.rate8hr80km}
                      onChange={(e) => handleLocalChange(idx, "rate8hr80km", e.target.value)}
                      className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-amber-400 font-bold"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.rate12hr120km}
                      onChange={(e) => handleLocalChange(idx, "rate12hr120km", e.target.value)}
                      className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.extraKmRate}
                      onChange={(e) => handleLocalChange(idx, "extraKmRate", e.target.value)}
                      className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.extraHourRate}
                      onChange={(e) => handleLocalChange(idx, "extraHourRate", e.target.value)}
                      className="w-16 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Outstation Tariff Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">
              Outstation Tariff & Allowances
            </h3>
            <p className="text-xs text-slate-400">
              Intercity round-trip per km rates with driver day/night charges
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Per KM Rate (₹)</th>
                <th className="py-3 px-3">Min KM/Day</th>
                <th className="py-3 px-3">Driver Day Allowance (₹)</th>
                <th className="py-3 px-3">Night Charge (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {outstation.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold font-sans text-slate-200">
                    {item.category}
                    <p className="text-[11px] text-slate-400 font-normal">{item.exampleCars}</p>
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.perKmRate}
                      onChange={(e) => handleOutstationChange(idx, "perKmRate", e.target.value)}
                      className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-amber-400 font-bold"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.minKmPerDay}
                      onChange={(e) => handleOutstationChange(idx, "minKmPerDay", e.target.value)}
                      className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.driverDayAllowance}
                      onChange={(e) => handleOutstationChange(idx, "driverDayAllowance", e.target.value)}
                      className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.driverNightAllowance}
                      onChange={(e) => handleOutstationChange(idx, "driverNightAllowance", e.target.value)}
                      className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Airport Benchmarks */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Plane className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">
              Airport Transfer Benchmark Fares
            </h3>
            <p className="text-xs text-slate-400">
              Point-to-point starting rates for IGI Terminal 3 / Domestic Terminal transfers
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Airport Route</th>
                <th className="py-3 px-3">Sedan Fare (₹)</th>
                <th className="py-3 px-3">Family SUV Fare (₹)</th>
                <th className="py-3 px-3">Innova Crysta Fare (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {airport.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-sans font-medium text-slate-200">
                    {item.route}
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.sedanFare}
                      onChange={(e) => handleAirportChange(idx, "sedanFare", e.target.value)}
                      className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.suvFare}
                      onChange={(e) => handleAirportChange(idx, "suvFare", e.target.value)}
                      className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      value={item.innovaFare}
                      onChange={(e) => handleAirportChange(idx, "innovaFare", e.target.value)}
                      className="w-24 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-amber-400 font-bold"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

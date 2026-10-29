"use client";

import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Clock,
  Car,
  Search,
  ExternalLink,
  Info,
  DollarSign
} from "lucide-react";
import { routesData, RouteItem } from "@/data/routes";
import { citiesData, CityData } from "@/data/cities";

export default function AdminRoutesPage() {
  const [routes] = useState<RouteItem[]>(routesData);
  const [cities] = useState<CityData[]>(citiesData);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");

  const filteredRoutes = routes.filter((r) => {
    if (selectedCity !== "all" && !r.sourceCity.toLowerCase().includes(selectedCity.toLowerCase())) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        r.title.toLowerCase().includes(q) ||
        r.sourceCity.toLowerCase().includes(q) ||
        r.destinationCity.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          Routes & Serviced Cities
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
            {routes.length} Highways
          </span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Review popular interstate routes, driving distances, toll benchmarks, and chauffeur fares.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destination, e.g. Jaipur, Agra, Chandigarh..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="w-full sm:w-56 shrink-0">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Pickup Cities</option>
            <option value="Delhi">Delhi NCR Pickups</option>
            <option value="Jaipur">Jaipur Pickups</option>
            <option value="Agra">Agra Pickups</option>
            <option value="Chandigarh">Chandigarh Pickups</option>
          </select>
        </div>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRoutes.map((route) => (
          <div
            key={route.slug}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {route.highwayName || "Highway"}
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-1.5">
                  {route.sourceCity} to {route.destinationCity}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400 font-semibold bg-slate-800 px-2 py-1 rounded-md">
                {route.distanceKm} KM
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{route.estimatedHours}</span>
              </div>
              <div className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-slate-400" />
                <span>One-way & Round-trip</span>
              </div>
            </div>

            {/* Pricing benchmarks */}
            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans">Sedan Starting:</span>
                <strong className="text-amber-400 font-bold">₹{route.startingSedanPrice}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans">Family SUV Starting:</span>
                <strong className="text-slate-200">₹{route.startingSuvPrice}</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-sans">Innova Crysta Starting:</span>
                <strong className="text-slate-200">₹{route.startingInnovaPrice}</strong>
              </div>
            </div>

            {/* Toll note */}
            {route.tollNote && (
              <p className="text-[11px] text-slate-400 flex items-start gap-1.5">
                <Info className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
                <span>{route.tollNote}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Serviced City Hubs */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          Operating City Hubs & Airports
        </h3>
        <p className="text-xs text-slate-400">
          Chauffeurs and fleet bases ready for 30-minute pickup dispatch.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cities.map((city: CityData) => (
            <div
              key={city.slug}
              className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2"
            >
              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-100 text-sm">{city.name}</p>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-bold">
                  {city.airport.code} Hub
                </span>
              </div>
              <p className="text-xs text-amber-400 font-medium">{city.airport.name}</p>
              <div className="pt-2 border-t border-slate-700/50 flex justify-between text-xs text-slate-400 font-mono">
                <span>Airport Transfer:</span>
                <span className="text-slate-200 font-bold">From ₹{city.airport.transferStartingPrice}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

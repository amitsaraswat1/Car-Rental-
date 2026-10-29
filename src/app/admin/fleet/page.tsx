"use client";

import React, { useState, useEffect } from "react";
import {
  Car,
  Plus,
  Users,
  Briefcase,
  Fuel,
  Wind,
  Edit2,
  Trash2,
  Star,
  X,
  Check,
  AlertCircle
} from "lucide-react";
import { CarItem, CarCategory } from "@/data/cars";

export default function AdminFleetPage() {
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit/Add modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<CarItem | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<Partial<CarItem>>({
    name: "",
    category: "Sedan",
    modelExamples: "",
    tagline: "",
    seats: 4,
    luggage: 2,
    fuelType: "CNG / Petrol / Diesel",
    hasAc: true,
    perKmRateOutstation: 12,
    localPackage8hr80km: 2100,
    airportTransferStarting: 1199,
    minKmPerDay: 250,
    features: [
      "Experienced Professional Chauffeur",
      "Air Conditioning with Climate Control",
      "Clean & Sanitized Interiors",
    ],
    imageUrl: "/images/cars/sedan.jpg",
    description: "",
    isPopular: false,
  });

  const fetchFleet = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/fleet");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setCars(data.cars);
        }
      }
    } catch (err) {
      console.error("Fleet fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFleet();
  }, []);

  const openAddModal = () => {
    setEditingCar(null);
    setForm({
      name: "",
      category: "Sedan",
      modelExamples: "",
      tagline: "",
      seats: 4,
      luggage: 2,
      fuelType: "CNG / Petrol / Diesel",
      hasAc: true,
      perKmRateOutstation: 12,
      localPackage8hr80km: 2100,
      airportTransferStarting: 1199,
      minKmPerDay: 250,
      features: [
        "Experienced Professional Chauffeur",
        "Air Conditioning with Climate Control",
        "Clean & Sanitized Interiors",
      ],
      imageUrl: "/images/cars/sedan.jpg",
      description: "",
      isPopular: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (car: CarItem) => {
    setEditingCar(car);
    setForm({ ...car });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this vehicle model from the fleet catalog?")) return;
    try {
      const res = await fetch(`/api/admin/fleet?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setCars((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error("Delete car error:", err);
    }
  };

  const handleSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = editingCar ? "PUT" : "POST";
      const res = await fetch("/api/admin/fleet", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setModalOpen(false);
          fetchFleet();
        }
      }
    } catch (err) {
      console.error("Save fleet vehicle error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            Fleet Catalog Management
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
              {cars.length} Models
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage cars, per km outstation benchmarks, local packages, and seating capacity.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Fleet Cards Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 text-xs">
          Loading fleet catalog...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all relative group"
            >
              {/* Popular Badge */}
              {car.isPopular && (
                <div className="absolute top-4 right-4 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  Popular
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                    {car.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {car.id}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-100">{car.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{car.modelExamples}</p>

                {/* Specs Pill row */}
                <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md">
                    <Users className="w-3 h-3 text-slate-400" />
                    <span>{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md">
                    <Briefcase className="w-3 h-3 text-slate-400" />
                    <span>{car.luggage} Bags</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md">
                    <Fuel className="w-3 h-3 text-slate-400" />
                    <span>{car.fuelType}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md">
                    <Wind className="w-3 h-3 text-emerald-400" />
                    <span>AC</span>
                  </div>
                </div>

                {/* Pricing Benchmarks */}
                <div className="mt-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Outstation Rate:</span>
                    <strong className="text-amber-400 font-bold">₹{car.perKmRateOutstation}/km</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Local (8hr/80km):</span>
                    <strong className="text-slate-200">₹{car.localPackage8hr80km}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Airport Transfer:</span>
                    <strong className="text-slate-200">₹{car.airportTransferStarting}</strong>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 mt-3 line-clamp-2">
                  {car.description || car.tagline}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => openEditModal(car)}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-400 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  onClick={() => handleDelete(car.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                  title="Delete Vehicle"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100">
                {editingCar ? `Edit: ${editingCar.name}` : "Add New Fleet Vehicle"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Vehicle Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Innova Crysta ZX"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as CarCategory })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                  >
                    <option value="Hatchback">Hatchback</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Premium SUV">Premium SUV</option>
                    <option value="Tempo Traveller">Tempo Traveller</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Model Examples</label>
                <input
                  type="text"
                  value={form.modelExamples}
                  onChange={(e) => setForm({ ...form, modelExamples: e.target.value })}
                  placeholder="e.g. Maruti Dzire, Hyundai Aura, Honda Amaze"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Seats (Pax)</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={form.seats}
                    onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Luggage Bags</label>
                  <input
                    type="number"
                    min={0}
                    max={20}
                    value={form.luggage}
                    onChange={(e) => setForm({ ...form, luggage: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Min KM / Day</label>
                  <input
                    type="number"
                    min={100}
                    max={500}
                    value={form.minKmPerDay}
                    onChange={(e) => setForm({ ...form, minKmPerDay: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Pricing section */}
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-3">
                <span className="font-semibold text-amber-400 block">Pricing Benchmarks (₹ INR)</span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Per KM Outstation</label>
                    <input
                      type="number"
                      required
                      value={form.perKmRateOutstation}
                      onChange={(e) => setForm({ ...form, perKmRateOutstation: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-amber-400 text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">8hr/80km Package</label>
                    <input
                      type="number"
                      value={form.localPackage8hr80km}
                      onChange={(e) => setForm({ ...form, localPackage8hr80km: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Airport Base</label>
                    <input
                      type="number"
                      value={form.airportTransferStarting}
                      onChange={(e) => setForm({ ...form, airportTransferStarting: Number(e.target.value) })}
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  placeholder="e.g. India's favorite executive highway cruiser"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="popularToggle"
                  checked={form.isPopular || false}
                  onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
                  className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="popularToggle" className="text-slate-300 cursor-pointer">
                  Feature as "Popular Choice" on homepage
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

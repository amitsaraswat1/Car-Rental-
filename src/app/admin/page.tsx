"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Inbox,
  Clock,
  CheckCircle2,
  Car,
  MessageCircle,
  Phone,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Calendar,
  AlertCircle,
  Sparkles,
  RefreshCw,
  Plus
} from "lucide-react";
import { StoredInquiry, InquiryStatus } from "@/lib/admin-store";
import { CarItem } from "@/data/cars";

export default function AdminDashboardPage() {
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [cars, setCars] = useState<CarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [inqRes, carsRes] = await Promise.all([
        fetch("/api/admin/inquiries"),
        fetch("/api/admin/fleet"),
      ]);

      if (inqRes.ok) {
        const inqData = await inqRes.json();
        if (inqData.success) {
          setInquiries(inqData.inquiries);
        }
      }

      if (carsRes.ok) {
        const carsData = await carsRes.json();
        if (carsData.success) {
          setCars(carsData.cars);
        }
      }
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Metrics calculation
  const totalInquiries = inquiries.length;
  const newLeads = inquiries.filter((i) => i.status === "new").length;
  const contactedLeads = inquiries.filter((i) => i.status === "contacted").length;
  const confirmedLeads = inquiries.filter((i) => i.status === "confirmed").length;
  const completedTrips = inquiries.filter((i) => i.status === "completed").length;

  // Breakdown by trip type
  const tripTypeCounts = inquiries.reduce((acc, curr) => {
    acc[curr.tripType] = (acc[curr.tripType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case "new":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold";
      case "contacted":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "confirmed":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold";
      case "completed":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  const getWhatsAppLink = (inquiry: StoredInquiry) => {
    const text = `Hello ${inquiry.name}, greetings from Royal Route! Regarding your car rental inquiry for ${inquiry.city} (${inquiry.tripType.toUpperCase()} on ${inquiry.pickupDate} with ${inquiry.carType}), we are pleased to confirm vehicle availability with our professional driver. May I share the detailed fare quote?`;
    return `https://wa.me/91${inquiry.phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Operations Control
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Feed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time inquiries, booking conversions, and fleet dispatch status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700/60 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-amber-400" : ""}`} />
            <span>{refreshing ? "Updating..." : "Refresh Data"}</span>
          </button>

          <Link
            href="/admin/fleet"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vehicle</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Total Inquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-100">{totalInquiries}</span>
            <span className="text-xs text-slate-400">leads logged</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>{contactedLeads} in follow-up</span>
            <Link href="/admin/inquiries" className="text-amber-400 hover:underline flex items-center gap-0.5">
              View all <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Action Needed (New Leads) */}
        <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-400 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              Action Needed
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400">{newLeads}</span>
            <span className="text-xs text-amber-400/80 font-semibold">New Callbacks</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Awaiting quote confirmation</span>
            <Link href="/admin/inquiries?status=new" className="text-amber-400 font-semibold hover:underline flex items-center gap-0.5">
              Call Now <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Confirmed Trips
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400">{confirmedLeads}</span>
            <span className="text-xs text-slate-400">active bookings</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>{completedTrips} completed safely</span>
            <span className="text-emerald-400 font-medium">98% Satisfied</span>
          </div>
        </div>

        {/* Fleet Ready */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Active Fleet Models
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-100">{cars.length || 5}</span>
            <span className="text-xs text-slate-400">categories live</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Sedan, SUV, Innova & Tempo</span>
            <Link href="/admin/fleet" className="text-amber-400 hover:underline flex items-center gap-0.5">
              Manage <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content: Recent Inquiries Table & Trip Types Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Inquiries Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Recent Inquiries Feed
              </h3>
              <p className="text-xs text-slate-400">
                Latest customer quote requests received via web forms.
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <span>View All ({totalInquiries})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {inquiries.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No inquiries recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-800/50 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Trip & Vehicle</th>
                      <th className="py-3.5 px-4">Travel Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Quick Dispatch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {inquiries.slice(0, 6).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                        {/* Customer */}
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-100">{item.name}</p>
                          <a
                            href={`tel:+91${item.phone}`}
                            className="text-slate-400 hover:text-amber-400 font-mono transition-colors"
                          >
                            +91 {item.phone}
                          </a>
                        </td>

                        {/* Trip & Vehicle */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                              {item.tripType}
                            </span>
                            <span className="text-amber-400 font-semibold">
                              {item.carType}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate max-w-[200px] mt-0.5">
                            {item.city} • {item.pickupLocation}
                          </p>
                        </td>

                        {/* Date */}
                        <td className="py-3 px-4 text-slate-300">
                          <div className="flex items-center gap-1 font-mono">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            <span>{item.pickupDate}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{item.pickupTime}</span>
                        </td>

                        {/* Status Select */}
                        <td className="py-3 px-4">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value as InquiryStatus)
                            }
                            className={`text-[11px] px-2 py-1 rounded-md font-medium border cursor-pointer focus:outline-hidden ${getStatusBadge(
                              item.status
                            )}`}
                          >
                            <option value="new" className="bg-slate-900 text-amber-400">New</option>
                            <option value="contacted" className="bg-slate-900 text-blue-400">Contacted</option>
                            <option value="confirmed" className="bg-slate-900 text-emerald-400">Confirmed</option>
                            <option value="completed" className="bg-slate-900 text-purple-400">Completed</option>
                            <option value="cancelled" className="bg-slate-900 text-red-400">Cancelled</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={getWhatsAppLink(item)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                              title="Chat on WhatsApp with Pre-filled Quote"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={`tel:+91${item.phone}`}
                              className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors"
                              title="Call Customer Directly"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Quick Actions & Trip Type Distribution */}
        <div className="space-y-6">
          {/* Quick Operations Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Quick Shortcuts
            </h3>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <Link
                href="/admin/inquiries?status=new"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-200 transition-colors group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Follow Up Pending Callbacks
                </span>
                <span className="font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md text-[11px]">
                  {newLeads}
                </span>
              </Link>

              <Link
                href="/admin/fleet"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-200 transition-colors group"
              >
                <span className="flex items-center gap-2.5">
                  <Car className="w-4 h-4 text-blue-400" />
                  Edit Fleet Pricing & Models
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-100 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/admin/rates"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-200 transition-colors group"
              >
                <span className="flex items-center gap-2.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Tariff & Driver Allowance Cards
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-100 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 text-slate-200 transition-colors group"
              >
                <span className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-purple-400" />
                  Helpline Numbers & Office Address
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-100 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Trip Type Demand Breakdown */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-100">
              Trip Category Demand
            </h3>

            <div className="space-y-3">
              {[
                { type: "outstation", label: "Outstation Round-Trip", color: "bg-amber-500" },
                { type: "local", label: "Local 8hr/80km Package", color: "bg-blue-500" },
                { type: "airport", label: "Airport Taxi Transfer", color: "bg-emerald-500" },
                { type: "wedding", label: "Wedding Convoy / Events", color: "bg-purple-500" },
                { type: "corporate", label: "Corporate Executive Travel", color: "bg-cyan-500" },
              ].map((item) => {
                const count = tripTypeCounts[item.type] || 0;
                const percent = totalInquiries > 0 ? Math.round((count / totalInquiries) * 100) : 0;
                return (
                  <div key={item.type} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{item.label}</span>
                      <span className="text-slate-400 font-mono">
                        {count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

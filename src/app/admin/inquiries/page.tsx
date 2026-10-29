"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  Phone,
  MessageCircle,
  Eye,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Car,
  FileText,
  X,
  CheckCircle,
  Plus,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { StoredInquiry, InquiryStatus } from "@/lib/admin-store";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<StoredInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [tripTypeFilter, setTripTypeFilter] = useState<string>("all");

  // Selected Inquiry for Modal View & Edit
  const [selectedInquiry, setSelectedInquiry] = useState<StoredInquiry | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState<InquiryStatus>("new");
  const [savingEdit, setSavingEdit] = useState(false);

  // Manual Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newForm, setNewForm] = useState({
    name: "",
    phone: "",
    email: "",
    tripType: "outstation",
    city: "Delhi NCR",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    pickupTime: "08:00 AM",
    returnDate: "",
    passengers: 4,
    carType: "Prime Sedan",
    message: "",
  });
  const [addingInquiry, setAddingInquiry] = useState(false);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setInquiries(data.inquiries);
        }
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      // Status filter
      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }
      // Trip type filter
      if (tripTypeFilter !== "all" && item.tripType !== tripTypeFilter) {
        return false;
      }
      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesPhone = item.phone.includes(q);
        const matchesCity = item.city.toLowerCase().includes(q);
        const matchesCar = item.carType.toLowerCase().includes(q);
        const matchesPickup = item.pickupLocation.toLowerCase().includes(q);
        return matchesName || matchesPhone || matchesCity || matchesCar || matchesPickup;
      }
      return true;
    });
  }, [inquiries, statusFilter, tripTypeFilter, search]);

  const openDetailsModal = (item: StoredInquiry) => {
    setSelectedInquiry(item);
    setEditStatus(item.status);
    setEditNotes(item.notes || "");
  };

  const handleSaveModal = async () => {
    if (!selectedInquiry) return;
    setSavingEdit(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedInquiry.id,
          status: editStatus,
          notes: editNotes,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setInquiries((prev) =>
            prev.map((i) => (i.id === selectedInquiry.id ? data.inquiry : i))
          );
          setSelectedInquiry(null);
        }
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleManualAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingInquiry(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newForm),
      });
      if (res.ok) {
        setShowAddModal(false);
        fetchInquiries();
        setNewForm({
          name: "",
          phone: "",
          email: "",
          tripType: "outstation",
          city: "Delhi NCR",
          pickupLocation: "",
          dropLocation: "",
          pickupDate: "",
          pickupTime: "08:00 AM",
          returnDate: "",
          passengers: 4,
          carType: "Prime Sedan",
          message: "",
        });
      }
    } catch (err) {
      console.error("Manual add inquiry error:", err);
    } finally {
      setAddingInquiry(false);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = [
      "Inquiry ID",
      "Date Created",
      "Customer Name",
      "Phone",
      "Email",
      "Trip Type",
      "City",
      "Pickup Location",
      "Drop Location",
      "Pickup Date",
      "Pickup Time",
      "Return Date",
      "Passengers",
      "Car Type",
      "Status",
      "Special Requests",
      "Staff Notes",
    ];

    const rows = inquiries.map((i) => [
      i.id,
      i.createdAt || "",
      `"${i.name.replace(/"/g, '""')}"`,
      i.phone,
      i.email || "",
      i.tripType,
      `"${i.city.replace(/"/g, '""')}"`,
      `"${i.pickupLocation.replace(/"/g, '""')}"`,
      `"${(i.dropLocation || "").replace(/"/g, '""')}"`,
      i.pickupDate,
      i.pickupTime,
      i.returnDate || "",
      i.passengers,
      `"${i.carType.replace(/"/g, '""')}"`,
      i.status,
      `"${(i.message || "").replace(/"/g, '""')}"`,
      `"${(i.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `royal_route_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case "new":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      case "contacted":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "confirmed":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      case "completed":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border border-red-500/30";
      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  const getWhatsAppLink = (inquiry: StoredInquiry) => {
    const text = `Namaste ${inquiry.name}, thank you for contacting Royal Route. We have received your booking request for ${inquiry.city} (${inquiry.tripType.toUpperCase()} on ${inquiry.pickupDate} with ${inquiry.carType}). Here is our transparent quote with professional driver included...`;
    return `https://wa.me/91${inquiry.phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            Inquiries & Booking Leads
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
              {filteredInquiries.length} Total
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track customer requests, quote prices on WhatsApp, and assign chauffeurs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/60 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Offline Lead</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer name, 10-digit mobile, city, or car..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Trip Type Select */}
          <div className="w-full md:w-48 shrink-0">
            <select
              value={tripTypeFilter}
              onChange={(e) => setTripTypeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">All Trip Types</option>
              <option value="outstation">Outstation Round-Trip</option>
              <option value="local">Local 8hr/80km Package</option>
              <option value="airport">Airport Taxi Transfer</option>
              <option value="wedding">Wedding / Events</option>
              <option value="corporate">Corporate Travel</option>
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/60">
          {[
            { id: "all", label: "All Leads" },
            { id: "new", label: "New (Action Required)" },
            { id: "contacted", label: "Contacted" },
            { id: "confirmed", label: "Confirmed" },
            { id: "completed", label: "Completed" },
            { id: "cancelled", label: "Cancelled" },
          ].map((tab) => {
            const count =
              tab.id === "all"
                ? inquiries.length
                : inquiries.filter((i) => i.status === tab.id).length;
            const active = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? "bg-amber-500 text-slate-950 font-bold shadow-xs shadow-amber-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? "bg-slate-950 text-amber-400 font-bold" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-16 text-center text-slate-400 text-xs">
            Loading inquiries...
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-16 text-center text-slate-400 space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-200">No Inquiries Found</p>
            <p className="text-xs text-slate-400">
              Try adjusting your search criteria or filter options.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800/60 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Trip Details</th>
                  <th className="py-3.5 px-4">Vehicle & Pax</th>
                  <th className="py-3.5 px-4">Travel Date/Time</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredInquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-100 text-sm">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <a
                          href={`tel:+91${item.phone}`}
                          className="text-amber-400 hover:underline font-mono font-medium"
                        >
                          +91 {item.phone}
                        </a>
                      </div>
                      {item.email && (
                        <p className="text-[11px] text-slate-400 truncate max-w-[160px]">{item.email}</p>
                      )}
                    </td>

                    {/* Trip Details */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                          {item.tripType}
                        </span>
                        <span className="text-slate-300 font-semibold">{item.city}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate max-w-[220px] mt-1" title={item.pickupLocation}>
                        📍 {item.pickupLocation}
                      </p>
                      {item.dropLocation && (
                        <p className="text-[11px] text-slate-400 truncate max-w-[220px]" title={item.dropLocation}>
                          🏁 {item.dropLocation}
                        </p>
                      )}
                    </td>

                    {/* Vehicle & Pax */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-amber-400">{item.carType}</span>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Users className="w-3 h-3 text-slate-400" />
                        <span>{item.passengers} Passengers</span>
                      </p>
                    </td>

                    {/* Travel Date */}
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-100">{item.pickupDate}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{item.pickupTime}</span>
                      {item.returnDate && (
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Ret: {item.returnDate}
                        </p>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                      {item.notes && (
                        <p className="text-[10px] text-slate-400 italic truncate max-w-[120px] mt-1" title={item.notes}>
                          Note: {item.notes}
                        </p>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={getWhatsAppLink(item)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
                          title="WhatsApp Quote"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:+91${item.phone}`}
                          className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-colors"
                          title="Call"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openDetailsModal(item)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                          title="View & Edit Notes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail / Edit Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Lead Details & Follow-up
                </h3>
                <p className="text-xs text-slate-400">ID: {selectedInquiry.id}</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                <div>
                  <span className="text-slate-400">Customer:</span>
                  <p className="font-bold text-slate-100 text-sm">{selectedInquiry.name}</p>
                  <p className="text-amber-400 font-mono">+91 {selectedInquiry.phone}</p>
                  {selectedInquiry.email && <p className="text-slate-400">{selectedInquiry.email}</p>}
                </div>
                <div>
                  <span className="text-slate-400">Vehicle & Pax:</span>
                  <p className="font-bold text-amber-400">{selectedInquiry.carType}</p>
                  <p className="text-slate-300">{selectedInquiry.passengers} Passengers</p>
                  <p className="text-slate-400 capitalize">{selectedInquiry.tripType} ({selectedInquiry.city})</p>
                </div>
              </div>

              <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/40 space-y-1.5">
                <p><span className="text-slate-400">Pickup Date/Time:</span> <strong className="text-slate-200">{selectedInquiry.pickupDate} at {selectedInquiry.pickupTime}</strong></p>
                {selectedInquiry.returnDate && (
                  <p><span className="text-slate-400">Return Date:</span> <strong className="text-slate-200">{selectedInquiry.returnDate}</strong></p>
                )}
                <p><span className="text-slate-400">Pickup:</span> <span className="text-slate-200">{selectedInquiry.pickupLocation}</span></p>
                {selectedInquiry.dropLocation && (
                  <p><span className="text-slate-400">Drop:</span> <span className="text-slate-200">{selectedInquiry.dropLocation}</span></p>
                )}
                {selectedInquiry.message && (
                  <div className="mt-2 pt-2 border-t border-slate-700/60">
                    <span className="text-amber-400 font-semibold">Special Request:</span>
                    <p className="text-slate-300 italic mt-0.5">{selectedInquiry.message}</p>
                  </div>
                )}
              </div>

              {/* Status Update */}
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Update Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as InquiryStatus)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs focus:ring-2 focus:ring-amber-500"
                >
                  <option value="new">New (Awaiting callback)</option>
                  <option value="contacted">Contacted (Quote sent)</option>
                  <option value="confirmed">Confirmed (Advance/Booking done)</option>
                  <option value="completed">Completed (Trip finished)</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Staff Notes */}
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Internal Staff Notes & Driver Assignment
                </label>
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="e.g., Quoted ₹3,200. Driver Ramesh assigned (DL-1Z-9988). Customer requested child seat."
                  rows={3}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs focus:ring-2 focus:ring-amber-500 placeholder-slate-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <a
                href={getWhatsAppLink(selectedInquiry)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveModal}
                  disabled={savingEdit}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Lead Logging Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                Log Offline Call / Walk-in Lead
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newForm.name}
                    onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                    placeholder="e.g. Rahul Gupta"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">10-Digit Mobile *</label>
                  <input
                    type="tel"
                    required
                    pattern="[6-9][0-9]{9}"
                    value={newForm.phone}
                    onChange={(e) => setNewForm({ ...newForm, phone: e.target.value })}
                    placeholder="9810123456"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Trip Type</label>
                  <select
                    value={newForm.tripType}
                    onChange={(e) => setNewForm({ ...newForm, tripType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                  >
                    <option value="outstation">Outstation Round-Trip</option>
                    <option value="local">Local 8hr/80km Package</option>
                    <option value="airport">Airport Taxi</option>
                    <option value="wedding">Wedding / Events</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newForm.city}
                    onChange={(e) => setNewForm({ ...newForm, city: e.target.value })}
                    placeholder="Delhi NCR / Jaipur / Agra"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Preferred Vehicle</label>
                  <select
                    value={newForm.carType}
                    onChange={(e) => setNewForm({ ...newForm, carType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                  >
                    <option value="Prime Sedan">Prime Sedan (Dzire / Aura)</option>
                    <option value="Family SUV">Family SUV (Ertiga / Carens)</option>
                    <option value="Innova Crysta">Innova Crysta Premium</option>
                    <option value="Luxury Tempo Traveller">Luxury Tempo Traveller</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Passengers</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={newForm.passengers}
                    onChange={(e) => setNewForm({ ...newForm, passengers: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Pickup Date *</label>
                  <input
                    type="date"
                    required
                    value={newForm.pickupDate}
                    onChange={(e) => setNewForm({ ...newForm, pickupDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Pickup Time</label>
                  <input
                    type="text"
                    value={newForm.pickupTime}
                    onChange={(e) => setNewForm({ ...newForm, pickupTime: e.target.value })}
                    placeholder="06:00 AM"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Pickup Address *</label>
                <input
                  type="text"
                  required
                  value={newForm.pickupLocation}
                  onChange={(e) => setNewForm({ ...newForm, pickupLocation: e.target.value })}
                  placeholder="e.g. Sector 18, Noida / IGI Airport T3"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Drop Location (Optional)</label>
                <input
                  type="text"
                  value={newForm.dropLocation}
                  onChange={(e) => setNewForm({ ...newForm, dropLocation: e.target.value })}
                  placeholder="e.g. Taj Mahal, Agra"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addingInquiry}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                >
                  {addingInquiry ? "Saving Lead..." : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

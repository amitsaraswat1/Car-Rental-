"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Save,
  CheckCircle,
  Sparkles,
  Lock
} from "lucide-react";
import { siteConfig as defaultSiteConfig, SiteConfig } from "@/data/site";

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.settings) {
            setConfig(data.settings);
          }
        }
      } catch (err) {
        console.error("Error loading settings:", err);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Save settings error:", err);
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
            Business Settings & Contact Profiles
            <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
              Live Brand Config
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Update customer helplines, WhatsApp numbers, dispatch office addresses, and trust counters.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {savedSuccess ? (
            <>
              <CheckCircle className="w-4 h-4 text-emerald-950" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Changes..." : "Save Configuration"}</span>
            </>
          )}
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Contact Helplines Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-400" />
            Customer Helpline & WhatsApp Numbers
          </h3>
          <p className="text-xs text-slate-400">
            These numbers are dynamically used across the website, quick dial buttons, and WhatsApp quote openers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1.5 font-medium">
                Calling Number (E.164 with +91)
              </label>
              <input
                type="text"
                value={config.phone}
                onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Format: +919012464250</span>
            </div>

            <div>
              <label className="block text-slate-300 mb-1.5 font-medium">
                Display Phone (Website Header/Footer)
              </label>
              <input
                type="text"
                value={config.displayPhone}
                onChange={(e) => setConfig({ ...config, displayPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Format: +91 90124 64250</span>
            </div>

            <div>
              <label className="block text-slate-300 mb-1.5 font-medium">
                WhatsApp API Number (Without +)
              </label>
              <input
                type="text"
                value={config.whatsappNumber}
                onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Format: 919012464250</span>
            </div>

            <div>
              <label className="block text-slate-300 mb-1.5 font-medium">
                Customer Support Email
              </label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 font-mono"
              />
            </div>
          </div>
        </div>

        {/* 2. Dispatch Office Address Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            Headquarters & Fleet Dispatch Office
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 mb-1">Street / Building Address</label>
              <input
                type="text"
                value={config.address.street}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    address: { ...config.address, street: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Locality / Sector</label>
              <input
                type="text"
                value={config.address.locality}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    address: { ...config.address, locality: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">City</label>
              <input
                type="text"
                value={config.address.city}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    address: { ...config.address, city: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-xs"
              />
            </div>
          </div>
        </div>

        {/* 3. Social Proof & Trust Counters */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Homepage Trust Counters & Social Proof
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Trips Completed</label>
              <input
                type="text"
                value={config.trustStats.tripsCompleted}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    trustStats: { ...config.trustStats, tripsCompleted: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-amber-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Customer Rating</label>
              <input
                type="text"
                value={config.trustStats.rating}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    trustStats: { ...config.trustStats, rating: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 font-bold"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Verified Chauffeurs</label>
              <input
                type="text"
                value={config.trustStats.verifiedDrivers}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    trustStats: { ...config.trustStats, verifiedDrivers: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Cities Covered</label>
              <input
                type="text"
                value={config.trustStats.citiesCovered}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    trustStats: { ...config.trustStats, citiesCovered: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Fleet Size</label>
              <input
                type="text"
                value={config.trustStats.fleetSize}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    trustStats: { ...config.trustStats, fleetSize: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* 4. Admin Security Notice */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            Admin Security & Credentials
          </h3>
          <p className="text-xs text-slate-400">
            Current default login is <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono">admin@royalroute.in</code> / <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400 font-mono">admin123</code>.
            To change the admin password for production, set the environment variable <code className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">ADMIN_PASSWORD</code> in your <code className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-mono">.env.local</code> file.
          </p>
        </div>
      </form>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Menu, ExternalLink, Bell, Sparkles } from "lucide-react";

interface AdminHeaderProps {
  onOpenMobileMenu: () => void;
  title: string;
  subtitle?: string;
  newCount?: number;
}

export default function AdminHeader({
  onOpenMobileMenu,
  title,
  subtitle,
  newCount = 0,
}: AdminHeaderProps) {
  const currentDate = new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile hamburger & title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
            {title}
            {newCount > 0 && (
              <span className="text-xs bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                {newCount} New Leads
              </span>
            )}
          </h1>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
      </div>

      {/* Right: Date, Inquiries Indicator & Website link */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{currentDate}</span>
        </div>

        <Link
          href="/admin/inquiries"
          className="relative p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title="Inquiries"
        >
          <Bell className="w-4 h-4" />
          {newCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900 animate-ping" />
          )}
        </Link>

        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-amber-500/20"
        >
          <span>View Site</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </header>
  );
}

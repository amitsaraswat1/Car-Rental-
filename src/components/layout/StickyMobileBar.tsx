"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Phone, MessageCircle, FileText } from "lucide-react";

export default function StickyMobileBar() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hello Royal Route, I would like to get a quote for a car rental with driver."
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2.5 shadow-2xl safe-area-bottom">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Now */}
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all text-center active:scale-95"
        >
          <Phone className="w-5 h-5 text-amber-400 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Call Now</span>
        </a>

        {/* WhatsApp Chat */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-center active:scale-95 shadow-xs"
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Get Quote */}
        <Link
          href="/#quick-inquiry"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold transition-all text-center active:scale-95 shadow-xs"
        >
          <FileText className="w-5 h-5 mb-0.5 text-slate-950" />
          <span className="text-[11px] tracking-tight">Get Quote</span>
        </Link>
      </div>
    </div>
  );
}

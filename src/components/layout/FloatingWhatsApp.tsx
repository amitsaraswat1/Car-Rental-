"use client";

import React from "react";
import { siteConfig } from "@/data/site";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hello Royal Route, I would like to inquire about booking a car with driver."
  )}`;

  return (
    <aside aria-label="WhatsApp Assistant" className="hidden md:block fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white pl-4 pr-5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
        title="Chat with Royal Route Trip Coordinator on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>

        <MessageCircle className="w-6 h-6 text-white" />
        
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-medium text-emerald-100 leading-none">Need quick assistance?</span>
          <span className="text-xs font-bold leading-tight">Chat on WhatsApp</span>
        </div>
      </a>
    </aside>
  );
}

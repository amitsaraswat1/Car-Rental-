"use client";

import React, { useState } from "react";
import Link from "next/link";
import { faqsData, FaqItem } from "@/data/faqs";
import { siteConfig } from "@/data/site";
import FaqAccordion from "@/components/shared/FaqAccordion";
import { 
  HelpCircle, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  Search
} from "lucide-react";

export default function FaqPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Booking & Payments", "Pricing & Taxes", "Fleet & Driver", "Trip Policies"];

  const filteredFaqs = faqsData.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === "" || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-950 to-blue-950 text-white py-16 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-wide">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Clear & Honest Policies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Find answers to common questions about our Royal Route car rental services, transparent pricing, payment methods, and luggage allowances.
          </p>

          {/* Search Input */}
          <div className="pt-4 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. tolls, cancellation, luggage)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main FAQ Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        {filteredFaqs.length > 0 ? (
          <FaqAccordion items={filteredFaqs} defaultOpenIndex={0} />
        ) : (
          <div className="text-center py-12 p-8 bg-white rounded-3xl border border-slate-200">
            <p className="text-sm text-slate-600">No questions found matching &ldquo;{searchQuery}&rdquo;.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-3 text-xs font-bold text-blue-900 underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Still Have Questions Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-extrabold text-white">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak with our travel coordinators. We are available 24 hours a day, 7 days a week.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline</span>
            </a>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Royal Route, I have a question regarding booking a car with driver.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

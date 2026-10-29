"use client";

import React, { useState } from "react";
import { FaqItem } from "@/data/faqs";
import { ChevronDown } from "lucide-react";

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenIndex?: number;
}

export default function FaqAccordion({ items, defaultOpenIndex = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3 w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen 
                ? "border-blue-900/30 bg-blue-50/30 shadow-xs" 
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-slate-900 text-sm sm:text-base pr-4">
                {item.question}
              </span>
              <span className={`p-1.5 rounded-full shrink-0 transition-transform duration-200 ${
                isOpen ? "bg-blue-900 text-white rotate-180" : "bg-slate-100 text-slate-500"
              }`}>
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

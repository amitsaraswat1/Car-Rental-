import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Car, Compass, ArrowRight, Phone, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-8 bg-slate-50">
      <div className="max-w-lg mx-auto text-center space-y-6 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-900 mx-auto flex items-center justify-center">
          <Compass className="w-8 h-8 text-amber-500 animate-spin-slow" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Looks Like You Took an Unexpected Turn!
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          The page or route you are looking for does not exist or has been relocated. Don&apos;t worry, our Royal Route drivers know the way back!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>

          <Link
            href="/fleet"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-all"
          >
            Browse Fleet
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-500">
          <span>Need immediate assistance? Call our 24x7 dispatch: </span>
          <a href={`tel:${siteConfig.phone}`} className="font-bold text-blue-900 underline">
            {siteConfig.displayPhone}
          </a>
        </div>
      </div>
    </div>
  );
}

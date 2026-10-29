import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Royal Route",
  description: `Privacy policy and passenger data protection standards for ${siteConfig.businessName}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: January 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you submit a quote inquiry or contact us via WhatsApp or Phone, we collect the basic operational information required to coordinate your Royal Route driver:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name and 10-digit mobile phone number</li>
              <li>Optional email address for invoice delivery</li>
              <li>Pickup address, drop destination, dates, and vehicle preferences</li>
              <li>Special travel requests (e.g., child booster seats, extra luggage space)</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. How We Use Your Information</h2>
            <p>
              Your personal information is strictly used for trip operational logistics:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Calling or WhatsApping you with your custom trip quotation</li>
              <li>Sharing vehicle registration and driver contact details 2 hours before pickup</li>
              <li>Issuing GST invoices and receipt confirmations</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Zero Spam & No Third-Party Selling</h2>
            <p>
              We despise spam as much as you do. <strong>We will NEVER sell, rent, or trade your mobile number or email address</strong> to third-party telemarketers, insurance agents, or external advertising platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Data Security</h2>
            <p>
              All online inquiries are transmitted over secure HTTPS encryption. Access to passenger contact details is restricted strictly to authorized operations and dispatch managers on a need-to-know basis.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Contact Information</h2>
            <p>
              If you have any questions or wish to request deletion of your contact data from our records, please email our privacy officer at <a href={`mailto:${siteConfig.email}`} className="text-blue-900 font-bold underline">{siteConfig.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

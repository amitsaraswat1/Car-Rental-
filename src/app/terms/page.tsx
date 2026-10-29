import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Car Rental with Driver India",
  description: `Terms and conditions for commercial Royal Route service provided by ${siteConfig.businessName}.`,
};

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-500 mt-1">Last Updated: January 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">1. Nature of Service</h2>
            <p>
              {siteConfig.businessName} provides passenger road transport services exclusively <strong>WITH DRIVER (Royal Route service)</strong>. We do NOT provide self-drive vehicles. All vehicles are commercially registered under yellow number plates with valid All-India Tourist Permits (AITP) as mandated by Indian transport regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">2. Indicative Pricing & Final Quotes</h2>
            <p>
              All prices, packages, and per-km rates listed on this website are indicative baseline benchmarks. A final binding quote is provided via phone, WhatsApp, or written email confirmation based on the specific travel dates, requested pickup location, and itinerary. Peak holiday dates (e.g. Diwali, New Year, Long Weekends) may carry adjusted seasonal pricing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">3. Inclusions & Tolls / Taxes Policy</h2>
            <p>
              Unless explicitly packaged in a special corporate all-inclusive contract:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Included:</strong> Vehicle hire, Royal Route driver service, vehicle fuel for billed kilometers, and standard driver day allowance.</li>
              <li><strong>Excluded (Paid at Actuals):</strong> National Highway FASTag toll charges, state border entry taxes (e.g., Delhi MCD tax, Uttar Pradesh entry tax, Rajasthan entry tax), and municipal/airport parking receipts. The customer is responsible for settling these charges based on physical or digital receipts.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">4. Payment Terms & Settlement</h2>
            <p>
              We accept payments via UPI (Google Pay, PhonePe, Paytm), Net Banking, major Credit/Debit Cards, or Direct Cash to the Royal Route Driver. A nominal token advance may be requested for outstation multi-day trips to hold the vehicle. The balance fare must be settled directly with the Royal Route driver upon trip conclusion.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">5. Passenger Conduct & Prohibited Items</h2>
            <p>
              Smoking, consumption of alcohol, or transport of contraband/illegal substances inside the vehicle is strictly prohibited under Indian law. The Royal Route driver reserves the right to refuse service or terminate the journey if passengers engage in abusive, disorderly, or unlawful conduct.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">6. Limitation of Liability</h2>
            <p>
              While our operations team plans buffer times and tracks flights carefully, {siteConfig.businessName} shall not be held liable for missed flights, train departures, or appointment delays resulting from extreme weather, natural calamities, national highway blockages, road accidents caused by third parties, or civil unrest beyond our control.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">7. Contact & Grievance Redressal</h2>
            <p>
              For any billing disputes or inquiries regarding these terms, please contact our operations office at <a href={`mailto:${siteConfig.email}`} className="text-blue-900 font-bold underline">{siteConfig.email}</a> or call our 24x7 helpline at <a href={`tel:${siteConfig.phone}`} className="text-blue-900 font-bold underline">{siteConfig.displayPhone}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

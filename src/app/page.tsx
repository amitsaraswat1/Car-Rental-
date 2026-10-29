import Link from "next/link";
import { siteConfig } from "@/data/site";
import { carsData } from "@/data/cars";
import { getStoredCars } from "@/lib/admin-store";
import { servicesData } from "@/data/services";
import { routesData } from "@/data/routes";
import { faqsData } from "@/data/faqs";
import { testimonialsData } from "@/data/testimonials";
import QuickInquiryStrip from "@/components/home/QuickInquiryStrip";
import CarCard from "@/components/shared/CarCard";
import RouteCard from "@/components/shared/RouteCard";
import FaqAccordion from "@/components/shared/FaqAccordion";
import { 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  Star, 
  MapPin, 
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ThumbsUp,
  Car,
  HeartHandshake
} from "lucide-react";

export default function HomePage() {
  const liveCars = getStoredCars();
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white pt-16 pb-24 px-4 sm:px-8 overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>100% Royal Route Driven • Commercial Yellow Plate Fleet</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Rent a Car <span className="text-amber-400">WITH DRIVER</span> in India
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal">
              Premium, sanitized, and commercial Royal Route service across <strong>Delhi NCR, Jaipur, Agra, and Chandigarh</strong>. No self-drive stress, no surge pricing, and no sudden ride cancellations.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="#quick-inquiry"
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4 text-slate-950 shrink-0" />
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Call {siteConfig.displayPhone}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Royal Route, I would like to inquire about a car rental with driver.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md text-center"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span><strong>4.9 / 5.0</strong> Customer Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>25,000+</strong> Safe Trips</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span><strong>150+</strong> Verified Royal Route Drivers</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>24x7</strong> Trip Helpline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK INQUIRY STRIP (OVERLAYS HERO) */}
      <section id="quick-inquiry" className="max-w-7xl mx-auto px-4 sm:px-8">
        <QuickInquiryStrip />
      </section>

      {/* 3. SERVICES OVERVIEW SECTION */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Tailored Royal Route Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Royal Route Services for Every Journey
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Whether you need a punctual airport transfer, an all-day car at disposal, or a multi-day highway tour, our experienced drivers ensure absolute comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-900 font-extrabold text-[11px] border border-blue-200">
                  {service.badge}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{service.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.shortDescription}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 inline-block">
                    {service.startingPrice}
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/services#${service.slug}`}
                  className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 group"
                >
                  <span>View Details & Inclusions</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.id)}`}
                  className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Enquire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FLEET PREVIEW SECTION */}
      <section className="py-20 px-4 sm:px-8 bg-slate-100/70 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                Commercial Yellow Plate Fleet
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
                Our Popular Royal Route Vehicles
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                All vehicles feature chilled air conditioning, verified Royal Route drivers, and All-India Tourist Permits.
              </p>
            </div>
            <Link
              href="/fleet"
              className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
            >
              <span>View All 5 Fleet Categories</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {liveCars.slice(0, 4).map((car) => (
              <CarCard key={car.id} car={car} featured={car.isPopular} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. POPULAR HIGHWAY ROUTES WITH STARTING FARES */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              Intercity Highway Travel
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              Popular Routes with Indicative Fares
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Fixed door-to-door transit without the hassle of crowded train stations or bus terminals.
            </p>
          </div>
          <Link
            href="/rates"
            className="text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 group"
          >
            <span>See Complete Tariff & Rates</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routesData.slice(0, 4).map((route) => (
            <RouteCard key={route.slug} route={route} />
          ))}
        </div>
      </section>

      {/* 6. WHY CHOOSE US (6 PILLARS) */}
      <section className="py-20 px-4 sm:px-8 bg-blue-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
              The Royal Route Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
              Why Discerning Travelers Prefer Us
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3">
              We never cut corners on vehicle cleanliness, driver background verification, or billing transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Verified Highway Drivers</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every driver undergoes criminal police verification, commercial driving license checks, and expressway defensive driving training.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">100% Commercial Yellow Plates</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Zero illegal private white plates. All vehicles hold valid All-India Tourist Permits (AITP), passenger liability insurance, and fitness certificates.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <ThumbsUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Zero Hidden Charges</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                What you see is what you pay. Transparent per-km benchmarks, standard driver day/night allowances, and government tolls billed at actuals.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Punctual Doorstep Arrival</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our Royal Route drivers arrive 15 minutes before your scheduled pickup. Live flight tracking buffer ensures no waiting fees for landing delays.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Spotless Sanitized AC Cabins</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Clean seat upholstery, crisp chilled air conditioning in peak Indian summers, complimentary bottled water, and tissue boxes.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">24x7 Dedicated Trip Support</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A human travel coordinator is on call throughout your journey to assist with route updates, emergency changes, or billing queries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS IN 3 SIMPLE STEPS */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Hassle-Free Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            How It Works in 3 Easy Steps
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            No registration, no password creation, and no mandatory app downloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-900 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
              1
            </div>
            <h3 className="text-xl font-bold text-slate-900">Send Your Inquiry</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fill our quick inquiry form, tap click-to-call, or ping us on WhatsApp with your travel date, city, and vehicle preference.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xl flex items-center justify-center shadow-lg">
              2
            </div>
            <h3 className="text-xl font-bold text-slate-900">Confirm Quote & Details</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our travel coordinator reviews vehicle availability and calls or whatsapps you within 15–30 minutes with an all-inclusive transparent quote.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm relative text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg">
              3
            </div>
            <h3 className="text-xl font-bold text-slate-900">Driver Arrives on Time</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Your polite, verified Royal Route driver arrives at your doorstep, loads your luggage, and you travel in air-conditioned comfort. Settle payment easily.
            </p>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS SECTION */}
      <section className="py-20 px-4 sm:px-8 bg-slate-100/70 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
              Verified Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              What Our Travelers Say
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Over 25,000 satisfied passengers trust us for family road trips, airport transfers, and corporate mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonialsData.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    {item.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">{item.location}</p>
                    <span className="text-[10px] text-blue-900 font-semibold block">{item.tripType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ PREVIEW SECTION */}
      <section className="py-20 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Clear, upfront information on our Royal Route booking and pricing policies.
          </p>
        </div>

        <FaqAccordion items={faqsData.slice(0, 4)} />

        <div className="text-center pt-8">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <span>View All FAQs & Policies</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </section>

      {/* 10. FINAL CONVERSION CTA BAND */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white py-16 px-4 sm:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">
            24x7 Royal Route Dispatch
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Experience Stress-Free Travel?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Get an instant custom quote for your airport pickup, city tour, or outstation journey. Our travel experts are available 24 hours a day.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-3">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl transition-all text-center"
            >
              Request Free Custom Quote
            </Link>

            <a
              href={`tel:${siteConfig.phone}`}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 text-center"
            >
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Call Helpline ({siteConfig.displayPhone})</span>
            </a>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Royal Route, I need an urgent car booking quote.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md text-center"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* CREATOR ATTRIBUTION STRIP */}
      <div className="bg-slate-950 py-4 px-4 text-center border-t border-slate-800/80">
        <p className="text-xs sm:text-sm font-medium text-slate-300 tracking-wide">
          It is Created By <span className="text-amber-400 font-bold tracking-wider">Amit Saraswat</span>
        </p>
      </div>
    </div>
  );
}

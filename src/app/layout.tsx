import type { Metadata } from "next";
import "./globals.css";
import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.businessName} | Premium Car Rental with Driver in India`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description: `${siteConfig.tagline}. Reliable Royal Route car rentals in Delhi NCR, Jaipur, Agra, and Chandigarh. Verified drivers, clean commercial AC cars, transparent pricing.`,
  keywords: [
    "car rental with driver india",
    "royal route car service delhi ncr",
    "delhi to agra car rental",
    "delhi to jaipur cab with driver",
    "airport taxi transfer delhi",
    "innova crysta with driver",
    "car hire with driver jaipur",
    "outstation car rental with driver",
    "tempo traveller on rent delhi",
  ],
  authors: [{ name: siteConfig.businessName }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://royalroute.in",
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} - Car Rental with Driver in India`,
    description: siteConfig.subTagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRental",
    name: siteConfig.businessName,
    description: siteConfig.subTagline,
    url: "https://royalroute.in",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.street}, ${siteConfig.address.locality}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.pincode,
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: ["Delhi NCR", "Jaipur", "Agra", "Chandigarh"],
  };

  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-900">
        <PublicLayoutWrapper>
          {children}
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}

// Centralized site & business configuration for Indian Car Rental with Driver Service
// Edit values here once to update business contact, cities, and brand placeholders across the entire website.

export interface ServiceCity {
  id: string;
  name: string;
  slug: string;
  state: string;
  isPopular: boolean;
}

export interface SiteConfig {
  businessName: string;
  tagline: string;
  subTagline: string;
  phone: string;              // Standard E.164 for tel: link, e.g. +919012464250
  displayPhone: string;       // Formatted for Indian callers, e.g. +91 90124 64250
  whatsappNumber: string;     // Without '+' for wa.me API link, e.g. 919012464250
  displayWhatsapp: string;    // Display string
  email: string;
  address: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  workingHours: {
    bookingHelpline: string;
    officeHours: string;
    serviceAvailability: string;
  };
  serviceCities: ServiceCity[];
  trustStats: {
    tripsCompleted: string;
    rating: string;
    verifiedDrivers: string;
    citiesCovered: string;
    fleetSize: string;
  };
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    googleBusiness?: string;
  };
  inquiryNotice: {
    responseTime: string;
    confirmationText: string;
  };
}

export const siteConfig: SiteConfig = {
  businessName: "Royal Route",
  tagline: "Premium Car Rental with Professional Driver",
  subTagline: "Reliable, sanitized, and commercial yellow-plate Royal Route car rental service with driver across North India. No self-drive hassles, just sit back and relax.",
  phone: "+919012464250",
  displayPhone: "+91 90124 64250",
  whatsappNumber: "919012464250",
  displayWhatsapp: "+91 90124 64250",
  email: "bookings@royalroute.in",
  address: {
    street: "A6, Street No. 3, Hindon Vihar",
    locality: "Baraula, Sector 49",
    city: "Noida",
    state: "Uttar Pradesh",
    pincode: "201304",
    landmark: "Sector 49, Noida (Delhi NCR)",
  },
  workingHours: {
    bookingHelpline: "24 Hours / 7 Days a week",
    officeHours: "8:00 AM – 10:00 PM (Mon – Sun)",
    serviceAvailability: "24x7 Royal Route Dispatch",
  },
  serviceCities: [
    { id: "delhi-ncr", name: "Delhi NCR", slug: "delhi-ncr", state: "Delhi / Haryana / UP", isPopular: true },
    { id: "jaipur", name: "Jaipur", slug: "jaipur", state: "Rajasthan", isPopular: true },
    { id: "agra", name: "Agra", slug: "agra", state: "Uttar Pradesh", isPopular: true },
    { id: "chandigarh", name: "Chandigarh", slug: "chandigarh", state: "Punjab / Haryana", isPopular: true },
  ],
  trustStats: {
    tripsCompleted: "25,000+",
    rating: "4.9 / 5.0",
    verifiedDrivers: "150+",
    citiesCovered: "4+ Major Hubs",
    fleetSize: "120+ Cars",
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    googleBusiness: "https://maps.google.com",
  },
  inquiryNotice: {
    responseTime: "We will call you within 15–30 minutes with an all-inclusive custom quote.",
    confirmationText: "Your inquiry has been received! Our trip coordinator is checking car availability and will reach out shortly.",
  },
};

// Centralized service offerings catalog for Indian Car Rental with Driver

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  startingPrice: string;
  inclusions: string[];
  exclusions: string[];
  idealFor: string[];
  popularChoices: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "airport-transfer",
    slug: "airport-transfers",
    title: "Airport Transfers (Fixed Fares)",
    badge: "Flight Tracking Included",
    shortDescription: "Punctual airport pick-and-drop with doorstep luggage assistance and free flight delay buffer.",
    fullDescription: "Never miss a flight or wait in serpentine airport taxi queues. Our uniformed Royal Route driver arrives 15 minutes before your scheduled pickup or flight landing, monitors live flight arrival status, and assists with heavy luggage right at the terminal gate.",
    iconName: "Plane",
    startingPrice: "Starting at ₹899 (Fixed Zone Pricing)",
    inclusions: [
      "Doorstep pickup or Terminal gate greeting",
      "Complimentary 45-minute waiting time on airport arrivals for flight delays",
      "Luggage loading and unloading assistance",
      "Clean sanitized car with air conditioning",
      "Professional, background-verified Royal Route driver",
    ],
    exclusions: [
      "Airport parking ticket charges (charged at actuals per receipt)",
      "State border permit tax (if crossing outside city boundary, e.g. Delhi to Noida/Gurugram)",
      "Extra drop points not declared during booking",
    ],
    idealFor: [
      "Business executives with early morning departures",
      "Families traveling with senior citizens and infants",
      "NRI and international travelers needing reliable airport pickup",
    ],
    popularChoices: "IGI Airport T1/T2/T3, Jaipur International Airport (Sanganer), Chandigarh Shaheed Bhagat Singh Airport.",
  },
  {
    id: "local-hourly-packages",
    slug: "local-hourly-packages",
    title: "Local Hourly Packages (Car at Disposal)",
    badge: "Unlimited City Stops",
    shortDescription: "Keep car & driver at your disposal for 4, 8, or 12 hours with transparent per-km and per-hour overage rates.",
    fullDescription: "Enjoy complete freedom within the city. Your dedicated Royal Route driver stays on standby while you attend client meetings, indulge in shopping sprees at local bazaars, or visit relatives. No surge pricing, no multiple ride cancellations.",
    iconName: "Clock",
    startingPrice: "Starting at ₹1,750 for 8 Hrs / 80 Km",
    inclusions: [
      "Dedicated car and driver at your beck and call",
      "Specified package hours and kilometer allowance included",
      "Unlimited stops within the selected city boundary",
      "Driver allowance during day hours (6:00 AM – 10:00 PM)",
    ],
    exclusions: [
      "Kilometers and hours exceeding the selected package (billed at clear per-km and per-hr rates)",
      "Municipal parking fees and toll plaza charges (paid at actuals)",
      "Night allowance (₹300) if trip extends beyond 10:00 PM",
    ],
    idealFor: [
      "Multi-meeting corporate visits across industrial hubs",
      "Wedding shopping and family hospital appointments",
      "City sightseeing and monument photography tours",
    ],
    popularChoices: "8 Hrs / 80 Km (Day package), 12 Hrs / 120 Km (Full day extended city disposal).",
  },
  {
    id: "outstation-trips",
    slug: "outstation-trips",
    title: "Outstation Trips (One-Way & Round Trip)",
    badge: "Highway Specialists",
    shortDescription: "Intercity highway travel with seasoned drivers who know rest stops, scenic routes, and expressways.",
    fullDescription: "Long distance journeys made effortless. Our outstation Royal Route drivers are experienced highway drivers trained in defensive driving, familiar with key national expressways (Delhi-Mumbai Expressway, Yamuna Expressway, NH-44), and aware of safe, family-friendly food stops.",
    iconName: "Navigation",
    startingPrice: "Starting at ₹10.5 / Km (Min 250 Km / day)",
    inclusions: [
      "Vehicle with driver for the entire intercity duration",
      "Choice of One-Way drop or Round-Trip return journey",
      "Fuel costs for running kilometers",
      "Assistance with regional language communication and route advice",
    ],
    exclusions: [
      "State Border Entry Permits / Taxes (MCD, Rajasthan Tax, UP Tax at actuals)",
      "FASTag Toll charges paid at actuals",
      "Driver night allowance (₹300/night if driving or halted past 10:00 PM)",
      "Driver day allowance (₹300/day)",
    ],
    idealFor: [
      "Weekend family holidays to Jaipur, Agra, Kasauli, or Rishikesh",
      "One-way intercity relocations or airport drop-offs",
      "Multi-day Rajasthan or Golden Triangle tourist circuits",
    ],
    popularChoices: "Delhi to Agra (Same-day Taj Mahal), Delhi to Jaipur, Delhi to Chandigarh / Shimla.",
  },
  {
    id: "wedding-and-events",
    slug: "wedding-and-event-cars",
    title: "Wedding & Special Event Royal Route",
    badge: "Premium & Decorated Fleets",
    shortDescription: "Immaculate luxury cars for bride & groom entries, VIP relatives, and coordinated guest logistics.",
    fullDescription: "Make wedding transport seamless. From decorated luxury sedans for the couple to a fleet of Ertigas and Tempo Travellers shuttling guests between hotels and the banquet hall, our operations team ensures coordinated arrivals without panic.",
    iconName: "Sparkles",
    startingPrice: "Custom quote based on event timeline",
    inclusions: [
      "Spotless, freshly detailed vehicles inside-out",
      "Well-groomed, courteous Royal Route drivers in formal attire",
      "Dedicated trip coordinator on call for dispatch management",
      "Flower decoration coordination available upon request",
    ],
    exclusions: [
      "Fresh floral decoration charges (if opted as external add-on)",
      "Overtime beyond scheduled event hours",
      "Banquets/Venue parking tokens",
    ],
    idealFor: [
      "Baraat processions and guest transport",
      "VIP delegate movement for large destination weddings",
      "Anniversary and pre-wedding photo shoots",
    ],
    popularChoices: "Innova Crysta convoys, decorated luxury sedans, 16-seater Tempo Travellers for relatives.",
  },
  {
    id: "corporate-travel",
    slug: "corporate-travel",
    title: "Corporate & Executive Royal Route",
    badge: "Monthly Billing Available",
    shortDescription: "Professional Royal Route logistics for corporate delegations, client site visits, and airport pickups.",
    fullDescription: "Empower your visiting executives, clients, and board members with discrete, high-caliber Royal Route service. Clean air-conditioned cabins equipped for on-the-go laptop work, reliable WiFi hotspot coordination, and punctual dispatch.",
    iconName: "Briefcase",
    startingPrice: "Contractual and on-demand day rates",
    inclusions: [
      "Punctual executive-class vehicle dispatch",
      "Non-intrusive, English/Hindi speaking vetted driver",
      "Bottled water, daily newspaper, and phone charging docks",
      "GST tax invoice provided for corporate tax credit",
    ],
    exclusions: [
      "Tolls, state taxes, and airport parking (itemized on GST invoice)",
      "Waiting beyond scheduled pickup window",
    ],
    idealFor: [
      "Visiting international and domestic business delegations",
      "High-profile client plant and factory visits",
      "Regular CEO and senior leadership city mobility",
    ],
    popularChoices: "Corporate Innova Crysta rentals, Honda City / Ciaz executive sedans.",
  },
];

import fs from "fs";
import path from "path";
import { carsData as defaultCars, CarItem } from "@/data/cars";
import { 
  localPackageRates as defaultLocalRates, 
  outstationRates as defaultOutstationRates, 
  airportBenchmarks as defaultAirportBenchmarks,
  LocalPackageRate, 
  OutstationRate, 
  AirportBenchmark 
} from "@/data/rates";
import { siteConfig as defaultSiteConfig, SiteConfig } from "@/data/site";
import { InquiryFormData } from "./validation";

export type InquiryStatus = "new" | "contacted" | "confirmed" | "completed" | "cancelled";

export interface StoredInquiry extends InquiryFormData {
  id: string;
  status: InquiryStatus;
  notes?: string;
  createdAt: string;
}

const STORE_DIR = path.join(process.cwd(), "src", "data", "store");
const INQUIRIES_FILE = path.join(STORE_DIR, "inquiries.json");
const CARS_FILE = path.join(STORE_DIR, "cars.json");
const RATES_FILE = path.join(STORE_DIR, "rates.json");
const SETTINGS_FILE = path.join(STORE_DIR, "settings.json");

const CARS_TS_FILE = path.join(process.cwd(), "src", "data", "cars.ts");
const RATES_TS_FILE = path.join(process.cwd(), "src", "data", "rates.ts");
const SITE_TS_FILE = path.join(process.cwd(), "src", "data", "site.ts");

function ensureStoreDir() {
  if (!fs.existsSync(STORE_DIR)) {
    fs.mkdirSync(STORE_DIR, { recursive: true });
  }
}

// ----------------- INQUIRIES -----------------
export function getStoredInquiries(): StoredInquiry[] {
  try {
    ensureStoreDir();
    if (!fs.existsSync(INQUIRIES_FILE)) {
      return [];
    }
    const data = fs.readFileSync(INQUIRIES_FILE, "utf-8");
    return JSON.parse(data) as StoredInquiry[];
  } catch (error) {
    console.error("Error reading inquiries file:", error);
    return [];
  }
}

export function saveStoredInquiries(inquiries: StoredInquiry[]): boolean {
  try {
    ensureStoreDir();
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving inquiries file:", error);
    return false;
  }
}

export function addInquiry(formData: InquiryFormData): StoredInquiry {
  const current = getStoredInquiries();
  const newInquiry: StoredInquiry = {
    ...formData,
    id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    status: "new",
    notes: "",
    createdAt: new Date().toISOString(),
  };

  current.unshift(newInquiry);
  saveStoredInquiries(current);
  return newInquiry;
}

export function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  notes?: string
): StoredInquiry | null {
  const current = getStoredInquiries();
  const index = current.findIndex((item) => item.id === id);
  if (index === -1) return null;

  current[index].status = status;
  if (notes !== undefined) {
    current[index].notes = notes;
  }
  saveStoredInquiries(current);
  return current[index];
}

export function deleteInquiry(id: string): boolean {
  const current = getStoredInquiries();
  const filtered = current.filter((item) => item.id !== id);
  if (filtered.length === current.length) return false;
  return saveStoredInquiries(filtered);
}

// ----------------- CARS / FLEET -----------------
function syncCarsToTypeScript(cars: CarItem[]) {
  try {
    const content = `// Centralized fleet catalog for Indian Car Rental with Driver
// All rates are indicative benchmarks. Professional drivers are included in every booking.

export type CarCategory = "Hatchback" | "Sedan" | "SUV" | "Premium SUV" | "Tempo Traveller";

export interface CarItem {
  id: string;
  name: string;
  category: CarCategory;
  modelExamples: string; // e.g. "Maruti Suzuki Dzire / Hyundai Aura"
  tagline: string;
  seats: number;         // Passengers excluding driver
  luggage: number;       // Number of large bags
  fuelType: string;      // CNG / Petrol / Diesel
  hasAc: boolean;
  perKmRateOutstation: number; // in INR
  localPackage8hr80km: number; // in INR
  airportTransferStarting: number; // in INR
  minKmPerDay: number;   // Indian standard outstation minimum km (250 km)
  features: string[];
  imageUrl: string;
  description: string;
  isPopular?: boolean;
}

export const carsData: CarItem[] = ${JSON.stringify(cars, null, 2)};
`;
    fs.writeFileSync(CARS_TS_FILE, content, "utf-8");
  } catch (err) {
    console.error("Failed to sync cars to cars.ts:", err);
  }
}

export function getStoredCars(): CarItem[] {
  try {
    ensureStoreDir();
    if (!fs.existsSync(CARS_FILE)) {
      fs.writeFileSync(CARS_FILE, JSON.stringify(defaultCars, null, 2), "utf-8");
      return defaultCars;
    }
    const data = fs.readFileSync(CARS_FILE, "utf-8");
    return JSON.parse(data) as CarItem[];
  } catch (error) {
    console.error("Error reading cars file, fallback to static:", error);
    return defaultCars;
  }
}

export function saveStoredCars(cars: CarItem[]): boolean {
  try {
    ensureStoreDir();
    // 1. Update JSON store
    fs.writeFileSync(CARS_FILE, JSON.stringify(cars, null, 2), "utf-8");
    // 2. Synchronize cars.ts so user-facing pages, components and SSR update immediately
    syncCarsToTypeScript(cars);
    return true;
  } catch (error) {
    console.error("Error saving cars file:", error);
    return false;
  }
}

// ----------------- TARIFF & RATES -----------------
export interface StoredRatesData {
  localRates: LocalPackageRate[];
  outstation: OutstationRate[];
  airport: AirportBenchmark[];
}

function syncRatesToTypeScript(rates: StoredRatesData) {
  try {
    const content = `// Centralized tariff benchmarks and rate cards for Indian Car Rental with Driver
// All prices are indicative benchmarks; exact final quote is confirmed based on route & travel dates.

export interface LocalPackageRate {
  category: string;
  exampleCars: string;
  rate8hr80km: number;
  rate12hr120km: number;
  extraKmRate: number;
  extraHourRate: number;
}

export interface OutstationRate {
  category: string;
  exampleCars: string;
  perKmRate: number;
  minKmPerDay: number;
  driverDayAllowance: number;
  driverNightAllowance: number;
}

export interface AirportBenchmark {
  route: string;
  sedanFare: number;
  suvFare: number;
  innovaFare: number;
}

export const localPackageRates: LocalPackageRate[] = ${JSON.stringify(rates.localRates, null, 2)};

export const outstationRates: OutstationRate[] = ${JSON.stringify(rates.outstation, null, 2)};

export const airportBenchmarks: AirportBenchmark[] = ${JSON.stringify(rates.airport, null, 2)};

export const extraChargesPolicy = {
  driverAllowanceDayHours: "6:00 AM to 10:00 PM (billed once per calendar day for outstation journeys)",
  driverNightAllowanceHours: "10:00 PM to 6:00 AM (applied if travel crosses 10 PM or starts before 6 AM)",
  tollsAndTaxes: "FASTag toll taxes, state border entry permits (e.g. MCD, Rajasthan Tax, UP Tax), and parking receipts are charged at actual government rates without markup.",
  gstNote: "Standard 5% GST applicable on commercial passenger road transport without ITC.",
  cancellationNotice: "Free cancellation up to 12 hours before scheduled pickup. No cancellation penalties for flight delays.",
  indicativeDisclaimer: "All rates displayed are indicative baseline benchmarks. Peak holiday seasons (Diwali, New Year, Wedding season) or specific route conditions may have adjusted quotes. We always provide a transparent, all-inclusive quote before booking confirmation.",
};
`;
    fs.writeFileSync(RATES_TS_FILE, content, "utf-8");
  } catch (err) {
    console.error("Failed to sync rates to rates.ts:", err);
  }
}

export function getStoredRates(): StoredRatesData {
  try {
    ensureStoreDir();
    if (!fs.existsSync(RATES_FILE)) {
      const defaultRates: StoredRatesData = {
        localRates: defaultLocalRates,
        outstation: defaultOutstationRates,
        airport: defaultAirportBenchmarks,
      };
      fs.writeFileSync(RATES_FILE, JSON.stringify(defaultRates, null, 2), "utf-8");
      return defaultRates;
    }
    const data = fs.readFileSync(RATES_FILE, "utf-8");
    return JSON.parse(data) as StoredRatesData;
  } catch (error) {
    console.error("Error reading rates file, fallback to static:", error);
    return {
      localRates: defaultLocalRates,
      outstation: defaultOutstationRates,
      airport: defaultAirportBenchmarks,
    };
  }
}

export function saveStoredRates(rates: StoredRatesData): boolean {
  try {
    ensureStoreDir();
    fs.writeFileSync(RATES_FILE, JSON.stringify(rates, null, 2), "utf-8");
    syncRatesToTypeScript(rates);
    return true;
  } catch (error) {
    console.error("Error saving rates file:", error);
    return false;
  }
}

// ----------------- SITE SETTINGS -----------------
function syncSettingsToTypeScript(settings: SiteConfig) {
  try {
    const content = `// Centralized site & business configuration for Indian Car Rental with Driver Service
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
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  displayWhatsapp: string;
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

export const siteConfig: SiteConfig = ${JSON.stringify(settings, null, 2)};
`;
    fs.writeFileSync(SITE_TS_FILE, content, "utf-8");
  } catch (err) {
    console.error("Failed to sync settings to site.ts:", err);
  }
}

export function getStoredSettings(): SiteConfig {
  try {
    ensureStoreDir();
    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSiteConfig, null, 2), "utf-8");
      return defaultSiteConfig;
    }
    const data = fs.readFileSync(SETTINGS_FILE, "utf-8");
    return JSON.parse(data) as SiteConfig;
  } catch (error) {
    console.error("Error reading settings file, fallback to static:", error);
    return defaultSiteConfig;
  }
}

export function saveStoredSettings(settings: SiteConfig): boolean {
  try {
    ensureStoreDir();
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
    syncSettingsToTypeScript(settings);
    return true;
  } catch (error) {
    console.error("Error saving settings file:", error);
    return false;
  }
}

// Centralized tariff benchmarks and rate cards for Indian Car Rental with Driver
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

export const localPackageRates: LocalPackageRate[] = [
  {
    category: "Hatchback",
    exampleCars: "WagonR, Tiago",
    rate8hr80km: 1750,
    rate12hr120km: 2450,
    extraKmRate: 11,
    extraHourRate: 120,
  },
  {
    category: "Prime Sedan",
    exampleCars: "Dzire, Aura, Amaze",
    rate8hr80km: 2100,
    rate12hr120km: 2900,
    extraKmRate: 12,
    extraHourRate: 150,
  },
  {
    category: "Family SUV (6-Seater)",
    exampleCars: "Ertiga, Carens",
    rate8hr80km: 2800,
    rate12hr120km: 3800,
    extraKmRate: 15,
    extraHourRate: 180,
  },
  {
    category: "Premium SUV",
    exampleCars: "Innova Crysta",
    rate8hr80km: 3600,
    rate12hr120km: 4900,
    extraKmRate: 20,
    extraHourRate: 250,
  },
  {
    category: "Luxury Tempo Traveller",
    exampleCars: "Force Traveller 12-Seater",
    rate8hr80km: 5500,
    rate12hr120km: 7500,
    extraKmRate: 28,
    extraHourRate: 400,
  },
];

export const outstationRates: OutstationRate[] = [
  {
    category: "Hatchback",
    exampleCars: "WagonR, Tiago",
    perKmRate: 10.5,
    minKmPerDay: 250,
    driverDayAllowance: 300,
    driverNightAllowance: 300,
  },
  {
    category: "Prime Sedan",
    exampleCars: "Dzire, Aura, Amaze",
    perKmRate: 12.0,
    minKmPerDay: 250,
    driverDayAllowance: 300,
    driverNightAllowance: 300,
  },
  {
    category: "Family SUV (6-Seater)",
    exampleCars: "Ertiga, Carens",
    perKmRate: 15.0,
    minKmPerDay: 250,
    driverDayAllowance: 350,
    driverNightAllowance: 300,
  },
  {
    category: "Premium SUV",
    exampleCars: "Innova Crysta",
    perKmRate: 20.0,
    minKmPerDay: 250,
    driverDayAllowance: 400,
    driverNightAllowance: 300,
  },
  {
    category: "Luxury Tempo Traveller",
    exampleCars: "12/16 Seater Force Traveller",
    perKmRate: 28.0,
    minKmPerDay: 300,
    driverDayAllowance: 500,
    driverNightAllowance: 400,
  },
];

export const airportBenchmarks: AirportBenchmark[] = [
  {
    route: "Delhi IGI Airport T3 <-> Central Delhi / Connaught Place",
    sedanFare: 1199,
    suvFare: 1699,
    innovaFare: 2299,
  },
  {
    route: "Delhi IGI Airport T3 <-> Noida Sector 18 / Expressway",
    sedanFare: 1399,
    suvFare: 1899,
    innovaFare: 2499,
  },
  {
    route: "Delhi IGI Airport T3 <-> Gurugram Cyber City / Golf Course",
    sedanFare: 1099,
    suvFare: 1599,
    innovaFare: 2199,
  },
  {
    route: "Jaipur Airport (Sanganer) <-> City Palace / Mansarovar",
    sedanFare: 899,
    suvFare: 1299,
    innovaFare: 1799,
  },
  {
    route: "Chandigarh Airport <-> Sector 17 / Panchkula",
    sedanFare: 999,
    suvFare: 1499,
    innovaFare: 1999,
  },
];

export const extraChargesPolicy = {
  driverAllowanceDayHours: "6:00 AM to 10:00 PM (billed once per calendar day for outstation journeys)",
  driverNightAllowanceHours: "10:00 PM to 6:00 AM (applied if travel crosses 10 PM or starts before 6 AM)",
  tollsAndTaxes: "FASTag toll taxes, state border entry permits (e.g. MCD, Rajasthan Tax, UP Tax), and parking receipts are charged at actual government rates without markup.",
  gstNote: "Standard 5% GST applicable on commercial passenger road transport without ITC.",
  cancellationNotice: "Free cancellation up to 12 hours before scheduled pickup. No cancellation penalties for flight delays.",
  indicativeDisclaimer: "All rates displayed are indicative baseline benchmarks. Peak holiday seasons (Diwali, New Year, Wedding season) or specific route conditions may have adjusted quotes. We always provide a transparent, all-inclusive quote before booking confirmation.",
};

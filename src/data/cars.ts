// Centralized fleet catalog for Indian Car Rental with Driver
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

export const carsData: CarItem[] = [
  {
    "id": "comfort-sedan",
    "name": "Prime Sedan",
    "category": "Sedan",
    "modelExamples": "Maruti Dzire, Hyundai Aura, Honda Amaze",
    "tagline": "India's favorite choice for executive city runs and couple/small family getaways",
    "seats": 4,
    "luggage": 2,
    "fuelType": "CNG / Petrol / Diesel",
    "hasAc": true,
    "perKmRateOutstation": 12,
    "localPackage8hr80km": 2100,
    "airportTransferStarting": 1199,
    "minKmPerDay": 250,
    "features": [
      "Experienced Professional Driver",
      "Air Conditioning with Climate Control",
      "Spacious Boot Space (2 Large Suitcases)",
      "Mobile Charging Ports",
      "Clean & Sanitized Interiors",
      "Bottled Water & Tissue Box"
    ],
    "imageUrl": "/images/cars/sedan.jpg",
    "description": "The classic Indian car with driver. Smooth suspension, quiet cabin, and reliable highway fuel efficiency. Ideal for corporate travelers, couple airport transfers, and round trips to Agra or Jaipur.",
    "isPopular": true
  },
  {
    "id": "family-suv",
    "name": "Spacious Family SUV",
    "category": "SUV",
    "modelExamples": "Maruti Ertiga, Kia Carens",
    "tagline": "Extra legroom and flexible 6-seater capacity for family road trips",
    "seats": 6,
    "luggage": 3,
    "fuelType": "Diesel / CNG / Petrol",
    "hasAc": true,
    "perKmRateOutstation": 15,
    "localPackage8hr80km": 2800,
    "airportTransferStarting": 1699,
    "minKmPerDay": 250,
    "features": [
      "Uniformed Verified Driver",
      "Dual AC Vents (Rear Rows)",
      "Flexible Foldable 3rd Row",
      "Push-back Comfortable Seating",
      "Music System & Auxiliary Input",
      "Ample Overhead Headroom"
    ],
    "imageUrl": "/images/cars/suv.jpg",
    "description": "Great value multi-utility vehicle designed for Indian joint families and luggage-heavy airport pickups. Effortless performance on expressways with dual air conditioning vents for every row.",
    "isPopular": true
  },
  {
    "id": "premium-innova",
    "name": "Toyota Innova Crysta",
    "category": "Premium SUV",
    "modelExamples": "Toyota Innova Crysta / Hycross",
    "tagline": "The undisputed gold standard of Indian highway travel and VIP Royal Route comfort",
    "seats": 6,
    "luggage": 4,
    "fuelType": "Diesel / Hybrid",
    "hasAc": true,
    "perKmRateOutstation": 20,
    "localPackage8hr80km": 3600,
    "airportTransferStarting": 2299,
    "minKmPerDay": 250,
    "features": [
      "Senior Highway Driver",
      "Plush Captain Seats (Mid Row)",
      "Independent Digital Climate Control",
      "Heavy-Duty Suspension for Bumpy Terrains",
      "High Safety Rating & Multiple Airbags",
      "Whisper-Quiet Expressway Ride"
    ],
    "imageUrl": "/images/cars/innova.jpg",
    "description": "Whether it is Delhi to Jaipur or Agra to Chandigarh, the Innova Crysta is revered for its unmatched ride comfort, generous legroom, commanding road presence, and safety.",
    "isPopular": true
  },
  {
    "name": "Fortuner",
    "category": "Sedan",
    "modelExamples": "Toyota",
    "tagline": "the best cars of india",
    "seats": 4,
    "luggage": 2,
    "fuelType": "CNG / Petrol / Diesel",
    "hasAc": true,
    "perKmRateOutstation": 25,
    "localPackage8hr80km": 2100,
    "airportTransferStarting": 1199,
    "minKmPerDay": 250,
    "features": [
      "Experienced Professional Chauffeur",
      "Air Conditioning with Climate Control",
      "Clean & Sanitized Interiors"
    ],
    "imageUrl": "/images/cars/sedan.jpg",
    "description": "Jai shree ram",
    "isPopular": false,
    "id": "fortuner"
  }
];

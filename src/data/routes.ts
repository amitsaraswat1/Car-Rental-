// Centralized popular intercity routes catalog for Indian Car Rental with Driver
// Seeded with top North Indian highway routes, distances, travel times, and benchmark rates.

export interface RouteItem {
  slug: string;
  title: string;
  sourceCity: string;
  destinationCity: string;
  distanceKm: number;
  estimatedHours: string;
  highwayName: string;
  startingSedanPrice: number;
  startingSuvPrice: number;
  startingInnovaPrice: number;
  tollNote: string;
  popularStops: string[];
  description: string;
  isPopular?: boolean;
}

export const routesData: RouteItem[] = [
  {
    slug: "delhi-to-agra",
    title: "Delhi to Agra Car Rental with Driver",
    sourceCity: "Delhi NCR",
    destinationCity: "Agra",
    distanceKm: 235,
    estimatedHours: "3.5 to 4 Hours",
    highwayName: "Yamuna Expressway (6-lane access controlled)",
    startingSedanPrice: 2850,
    startingSuvPrice: 3850,
    startingInnovaPrice: 4950,
    tollNote: "Yamuna Expressway FASTag toll (approx. ₹435 one-way) paid at actuals",
    popularStops: [
      "Yamuna Expressway Food Plaza (Starbucks, Subway, Haldiram's)",
      "Mathura & Vrindavan Krishna Janmabhoomi detour",
      "Sikandra (Akbar's Tomb) on Agra outskirts",
    ],
    description: "The most famous same-day road excursion in India. Cruise down the smooth Yamuna Expressway in an air-conditioned sedan or Innova Crysta. Visit the Taj Mahal at sunrise or sunset, explore Agra Fort, and return to Delhi comfortably on the same evening without catching crowded trains.",
    isPopular: true,
  },
  {
    slug: "delhi-to-jaipur",
    title: "Delhi to Jaipur Car Rental with Driver",
    sourceCity: "Delhi NCR",
    destinationCity: "Jaipur",
    distanceKm: 280,
    estimatedHours: "4 to 4.5 Hours",
    highwayName: "Delhi-Mumbai Expressway / NH-48",
    startingSedanPrice: 3400,
    startingSuvPrice: 4600,
    startingInnovaPrice: 5900,
    tollNote: "Expressway FASTag toll (approx. ₹580) and Rajasthan State tax paid at actuals",
    popularStops: [
      "Neemrana Fort Palace for heritage lunch",
      "Expressway wayside amenities at Dausa & Alwar exits",
      "Kukas heritage craft showrooms",
    ],
    description: "Travel from the capital to the Pink City with complete peace of mind. The new Delhi-Mumbai Expressway has slashed travel times dramatically. Your experienced Royal Route driver navigates expressway speed radars and delivers you straight to your Jaipur hotel or heritage haveli.",
    isPopular: true,
  },
  {
    slug: "delhi-to-chandigarh",
    title: "Delhi to Chandigarh Car Rental with Driver",
    sourceCity: "Delhi NCR",
    destinationCity: "Chandigarh",
    distanceKm: 250,
    estimatedHours: "4 to 4.5 Hours",
    highwayName: "Grand Trunk Road / NH-44",
    startingSedanPrice: 3100,
    startingSuvPrice: 4200,
    startingInnovaPrice: 5400,
    tollNote: "NH-44 tolls (approx. ₹390 total) paid at actuals via FASTag",
    popularStops: [
      "Murthal Dhabas (Amrik Sukhdev, Haveli) for hot tandoori paranthas and white butter",
      "Karnal Oasis Food Hub",
      "Kurukshetra Brahma Sarovar view",
    ],
    description: "The classic Grand Trunk road trip. Enjoy legendary Murthal paranthas for breakfast while your driver keeps the AC chilled and handles NH-44 diversions smoothly. Ideal for family visits, business meetings in Mohali IT Park, or as an overnight stop before heading into Himachal Pradesh.",
    isPopular: true,
  },
  {
    slug: "jaipur-to-agra",
    title: "Jaipur to Agra Car Rental with Driver",
    sourceCity: "Jaipur",
    destinationCity: "Agra",
    distanceKm: 240,
    estimatedHours: "4 to 4.5 Hours",
    highwayName: "Bikaner-Agra Road / NH-21",
    startingSedanPrice: 2950,
    startingSuvPrice: 3950,
    startingInnovaPrice: 5100,
    tollNote: "NH-21 tolls and UP state entry permit paid at actuals",
    popularStops: [
      "Abhaneri Chand Baori (Ancient Stepwell)",
      "Bharatpur Keoladeo National Bird Sanctuary",
      "Fatehpur Sikri Mughal ghost city (UNESCO World Heritage)",
    ],
    description: "Complete the iconic Golden Triangle route between Rajasthan and Uttar Pradesh. Take advantage of your private car to stop at the breathtaking Chand Baori stepwell in Abhaneri and Emperor Akbar's sandstone palace at Fatehpur Sikri along the way.",
    isPopular: true,
  },
  {
    slug: "delhi-to-haridwar-rishikesh",
    title: "Delhi to Haridwar & Rishikesh Car Rental with Driver",
    sourceCity: "Delhi NCR",
    destinationCity: "Haridwar / Rishikesh",
    distanceKm: 245,
    estimatedHours: "4.5 to 5 Hours",
    highwayName: "Delhi-Meerut Expressway / NH-58",
    startingSedanPrice: 3200,
    startingSuvPrice: 4400,
    startingInnovaPrice: 5600,
    tollNote: "Expressway & NH-58 tolls (approx. ₹320) + Uttarakhand entry tax at actuals",
    popularStops: [
      "Cheetal Grand (Khatauli) for classic garden breakfast",
      "Muzaffarnagar bypass wayside food court",
      "Har Ki Pauri drop point in Haridwar",
    ],
    description: "Spiritual pilgrimage and adventure gateway. Reach Haridwar for evening Ganga Aarti or continue straight up to Rishikesh for river rafting and yoga retreats. Your Royal Route driver stays on standby throughout your holy dip without parking worries.",
    isPopular: false,
  },
  {
    slug: "delhi-to-shimla",
    title: "Delhi to Shimla Car Rental with Driver",
    sourceCity: "Delhi NCR",
    destinationCity: "Shimla",
    distanceKm: 350,
    estimatedHours: "7.5 to 8.5 Hours",
    highwayName: "NH-44 & Himalayan Expressway (NH-5)",
    startingSedanPrice: 4900,
    startingSuvPrice: 6500,
    startingInnovaPrice: 8200,
    tollNote: "Plains & Himalayan Expressway tolls + Himachal Green Tax at actuals",
    popularStops: [
      "Murthal for morning paranthas",
      "Timber Trail cable car resort at Parwanoo",
      "Solan / Dharampur hill cafes",
    ],
    description: "Ascend from the plains into the cool pines of Himachal Pradesh. Our mountain-certified drivers handle winding ghats, foggy patches, and hairpin bends with patient skill, so your family can sit back and soak in panoramic Himalayan vistas.",
    isPopular: false,
  },
];

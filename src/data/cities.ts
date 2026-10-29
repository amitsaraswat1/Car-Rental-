// Centralized City Profiles for Indian Car Rental with Driver
// Editable demo data for Delhi NCR, Jaipur, Agra, and Chandigarh

export interface CityData {
  slug: string;
  name: string;
  state: string;
  tagline: string;
  heroSnippet: string;
  airport: {
    name: string;
    code: string;
    transferStartingPrice: number;
  };
  localPackageStartingPrice: number;
  popularPickupPoints: string[];
  topDestinations: string[];
  keyHighlights: string[];
  localOverview: string;
}

export const citiesData: CityData[] = [
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    state: "National Capital Region (Delhi, Noida, Gurugram, Faridabad)",
    tagline: "India's Political & Corporate Hub with Seamless Expressway Connectivity",
    heroSnippet: "Book commercial yellow-plate Royal Route cars with driver across Delhi, Gurugram Cyber City, and Noida Expressways without surge pricing or ride cancellations.",
    airport: {
      name: "Indira Gandhi International Airport (T1, T2, T3)",
      code: "DEL",
      transferStartingPrice: 1099,
    },
    localPackageStartingPrice: 2100,
    popularPickupPoints: [
      "IGI Airport Terminal 3 & Terminal 1",
      "New Delhi Railway Station (NDLS) & Hazrat Nizamuddin",
      "Gurugram DLF CyberHub / Golf Course Road",
      "Noida Sector 18 & Greater Noida",
      "Connaught Place & South Delhi (Saket, Vasant Kunj)",
    ],
    topDestinations: [
      "Agra (Taj Mahal via Yamuna Expressway)",
      "Jaipur (Pink City via Delhi-Mumbai Expressway)",
      "Chandigarh & Shimla (via NH-44)",
      "Haridwar & Rishikesh",
      "Neemrana Fort Palace",
    ],
    keyHighlights: [
      "24x7 Airport terminal pickups with flight tracking",
      "Clean commercial yellow-plate AC cars with all-India permits",
      "Uniformed Royal Route drivers trained for corporate executive etiquette",
      "Transparent FASTag toll breakdown with zero surge pricing",
    ],
    localOverview: "Whether you need an executive sedan for business meetings between Gurugram Cyber Hub and Connaught Place or a dependable early-morning pickup for an international flight at IGI Terminal 3, our Delhi NCR Royal Route fleet guarantees punctual dispatch and courteous service.",
  },
  {
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    tagline: "The Royal Pink City & Gateway to Rajasthan's Grand Heritage",
    heroSnippet: "Explore Jaipur's royal forts, palatial havelis, and vibrant handicraft bazaars with a polite local Royal Route driver who knows every shortcut.",
    airport: {
      name: "Jaipur International Airport (Sanganer)",
      code: "JAI",
      transferStartingPrice: 899,
    },
    localPackageStartingPrice: 1950,
    popularPickupPoints: [
      "Jaipur International Airport (JAI)",
      "Jaipur Junction Railway Station & Gandhinagar",
      "C-Scheme & MI Road hotels",
      "Mansarovar & Vaishali Nagar",
      "Amer / Kukas luxury heritage resorts",
    ],
    topDestinations: [
      "Delhi NCR (via newly opened Delhi-Mumbai Expressway)",
      "Agra (Golden Triangle heritage circuit)",
      "Pushkar & Ajmer Sharif",
      "Udaipur & Jodhpur (Royal Rajasthan tour)",
      "Ranthambore National Park (Tiger Safari)",
    ],
    keyHighlights: [
      "Local Royal Route drivers familiar with Amber Fort, City Palace & Jal Mahal parking",
      "Full-day 8 hr / 80 km shopping disposal for Johari Bazaar & Bapu Bazaar",
      "Heritage resort guest transfers across Kukas and Samode",
      "Reliable AC cooling for scorching desert summer days",
    ],
    localOverview: "Jaipur's majestic monuments and bustling markets are best enjoyed at your own pace without haggling with street autos. Our drivers ensure smooth access to hill fort parking zones and guide you to authentic Rajasthani dining spots.",
  },
  {
    slug: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    tagline: "City of the Taj Mahal & Mughal Architectural Splendors",
    heroSnippet: "Experience same-day Taj Mahal tours and Fatehpur Sikri excursions with reliable, punctual Royal Route car rental service with driver.",
    airport: {
      name: "Agra Kheria Civil Air Terminal / Connected via Delhi Airport",
      code: "AGR",
      transferStartingPrice: 999,
    },
    localPackageStartingPrice: 1850,
    popularPickupPoints: [
      "Agra Cantt Railway Station (Vande Bharat / Gatimaan drop)",
      "Fatehabad Road & Taj East Gate hotel zone",
      "Yamuna Expressway Agra Toll exit",
      "Sanjay Place business district",
    ],
    topDestinations: [
      "Delhi NCR (Yamuna Expressway 3.5 hour transit)",
      "Jaipur (Golden Triangle road journey)",
      "Fatehpur Sikri & Bharatpur Bird Sanctuary",
      "Mathura & Vrindavan (Braj pilgrimage circuit)",
      "Gwalior Fort & Orchha",
    ],
    keyHighlights: [
      "Taj Mahal sunrise pickup coordination at Taj East Gate",
      "Luggage safe-keeping in car boot during monument sightseeing",
      "Fast connectivity via Yamuna Expressway and Agra-Lucknow Expressway",
      "Driver knows pre-approved tourist parking spots near Agra Fort",
    ],
    localOverview: "Home to the world-famous Taj Mahal, Agra is the premier tourist destination in North India. Our Royal Route drivers take the stress out of monument visiting, offering luggage security while you tour the Taj Mahal, Agra Fort, and Fatehpur Sikri.",
  },
  {
    slug: "chandigarh",
    name: "Chandigarh",
    state: "Punjab & Haryana",
    tagline: "The Beautiful Planned City & Gateway to Himachal Hills",
    heroSnippet: "Clean, wide avenues and swift access to Himachal hill stations (Shimla, Kasauli, Manali) with experienced mountain drivers.",
    airport: {
      name: "Shaheed Bhagat Singh International Airport",
      code: "IXC",
      transferStartingPrice: 999,
    },
    localPackageStartingPrice: 2000,
    popularPickupPoints: [
      "Chandigarh International Airport (Mohali side)",
      "Chandigarh Junction Railway Station",
      "Sector 17 City Centre & Sector 35",
      "Panchkula & Mohali IT City",
      "Zirakpur Himalayan Expressway junction",
    ],
    topDestinations: [
      "Delhi NCR (via smooth NH-44 highway)",
      "Shimla, Kufri & Chail (Himachal hills)",
      "Kasauli & Barog weekend retreats",
      "Manali & Kullu Valley",
      "Amritsar Golden Temple",
    ],
    keyHighlights: [
      "Drivers experienced in hilly hairpin turns and Himalayan weather",
      "Clean commercial vehicles adhering to strict Chandigarh traffic guidelines",
      "Fast airport pickups for Mohali and Panchkula IT parks",
      "Multi-day Himachal hill station holiday packages",
    ],
    localOverview: "Le Corbusier's planned city is known for its tree-lined boulevards and strict traffic compliance. It is also the most popular launchpad for family holidays to Himachal Pradesh. Our mountain-tested Royal Route drivers ensure a smooth transition from plains to alpine roads.",
  },
];

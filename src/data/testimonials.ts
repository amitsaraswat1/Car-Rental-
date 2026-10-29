// Centralized customer testimonials for Indian Car Rental with Driver

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  tripType: string;
  carBooked: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  avatarInitials: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    name: "Vikram Malhotra",
    location: "Gurugram, Haryana",
    tripType: "Delhi to Jaipur Round Trip",
    carBooked: "Toyota Innova Crysta",
    rating: 5,
    comment: "Booked an Innova Crysta for a family trip to Jaipur. Driver Rajesh Ji arrived 15 mins before time in clean uniform. He drove at safe expressway speeds on the new Delhi-Mumbai Expressway and recommended a fantastic Dhaba for lunch. Zero stress!",
    date: "February 2026",
    avatarInitials: "VM",
  },
  {
    id: "2",
    name: "Dr. Ananya Sengupta",
    location: "New Delhi",
    tripType: "IGI Airport T3 Pickup & Noida Drop",
    carBooked: "Prime Sedan (Dzire)",
    rating: 5,
    comment: "Our flight from Bangalore was delayed by nearly an hour at night. To our relief, the driver sent a WhatsApp message confirming he was tracking the flight and waiting at pillar 4. No airport taxi line hassles. Truly professional.",
    date: "January 2026",
    avatarInitials: "AS",
  },
  {
    id: "3",
    name: "Harpreet Singh Sodhi",
    location: "Chandigarh",
    tripType: "Family Wedding Guest Shuttle",
    carBooked: "16-Seater Luxury Tempo Traveller",
    rating: 5,
    comment: "Coordinating transport for 25 relatives coming for my daughter's wedding was daunting. Royal Route provided two immaculate Tempo Travellers with polite drivers who stayed punctual across all ceremonies. Reasonable rates and clear billing.",
    date: "January 2026",
    avatarInitials: "HS",
  },
  {
    id: "4",
    name: "Aditya & Neha Sharma",
    location: "Mumbai",
    tripType: "Same-Day Delhi to Agra Taj Mahal Tour",
    carBooked: "Prime Sedan",
    rating: 5,
    comment: "Took a same-day Taj Mahal trip from Delhi. The Royal Route driver knew the best parking entrance near the East Gate to save us walking in the heat, and safeguarded our bags while we toured Agra Fort. Top marks for hospitality!",
    date: "December 2025",
    avatarInitials: "AN",
  },
];

// Centralized FAQ content for Indian Car Rental with Driver

export interface FaqItem {
  question: string;
  answer: string;
  category: "Booking & Payments" | "Pricing & Taxes" | "Fleet & Drivers" | "Trip Policies";
}

export const faqsData: FaqItem[] = [
  {
    category: "Booking & Payments",
    question: "Do I need to create an account or login to book a car?",
    answer: "No! There is no signup, password, or login required. Simply fill our quick inquiry form, send us a WhatsApp message, or call our 24x7 helpline. Our travel coordinator immediately confirms car availability and locks in your quote.",
  },
  {
    category: "Booking & Payments",
    question: "What payment options are accepted?",
    answer: "We support maximum flexibility. You can pay via UPI (Google Pay, PhonePe, Paytm), Net Banking, Credit/Debit card, or settle directly in Cash with the driver at the end of the trip. For outstation journeys or peak dates, a nominal token advance may be requested to hold the car.",
  },
  {
    category: "Pricing & Taxes",
    question: "Are toll taxes, parking fees, and state permits included in the quote?",
    answer: "By default, fuel and driver allowances are included in your base quote. Toll charges (FASTag), municipal monument/airport parking tickets, and interstate border entry permits (e.g. MCD tax, UP/Rajasthan state tax) are paid at actuals per government receipts to keep your base fare as low and transparent as possible.",
  },
  {
    category: "Pricing & Taxes",
    question: "What is driver day and night allowance?",
    answer: "For outstation trips, a driver day allowance (₹300 to ₹400/day depending on vehicle) covers the driver's daily food expenses so you never have to worry about buying food for the driver. A night allowance (₹300) applies only if travel extends between 10:00 PM and 6:00 AM.",
  },
  {
    category: "Fleet & Drivers",
    question: "Are your drivers police verified and trained for highway travel?",
    answer: "Yes, 100%. Every Royal Route driver in our fleet undergoes criminal background verification, valid commercial heavy/light badge checks, and defensive highway driving assessments. They are polite, non-intrusive, well-groomed, and familiar with family-friendly highway rest stops.",
  },
  {
    category: "Fleet & Drivers",
    question: "Can I request a child safety seat or roof carrier?",
    answer: "Yes! Child booster seats and luggage roof carriers (for SUVs or Tempo Travellers) are available on advance request. Please mention this in the special requests section of your inquiry form so our team assigns the right vehicle.",
  },
  {
    category: "Trip Policies",
    question: "What happens if my flight is delayed for an airport pickup?",
    answer: "We offer a complimentary 45-minute waiting buffer from the actual flight touchdown time for all airport arrivals. Our dispatch team tracks your flight number in real time, so our driver adjusts arrival timing automatically without extra waiting charges.",
  },
  {
    category: "Trip Policies",
    question: "What is your cancellation and refund policy?",
    answer: "We believe in customer-friendly policies. Cancellations made 12 hours or more before scheduled pickup time incur zero cancellation fee. Any token advance paid is promptly refunded within 24 hours.",
  },
  {
    category: "Trip Policies",
    question: "Are the cars commercial yellow-plate vehicles?",
    answer: "Yes. All our vehicles carry valid All-India Tourist Permits (AITP) or state commercial yellow number plates, commercial passenger insurance, and fitness certificates as mandated by Indian transport authorities. No illegal white-plate commercial operations.",
  },
];

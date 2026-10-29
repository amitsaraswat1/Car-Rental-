# 🚗 Royal Route — Car Rental WITH DRIVER Website

A fast, modern, mobile-first **Information & Inquiry website** for a commercial "Car Rental WITH DRIVER" business in North India (Delhi NCR, Jaipur, Agra, Chandigarh).

> **Business Model:** 100% Chauffeur-driven passenger transport. Yellow commercial number plates with All-India Tourist Permits (AITP). Zero self-drive. Zero user accounts or database needed. Visitors explore the fleet, transparent rate benchmarks, popular routes, and send inquiries via Web Form, Phone Call, or WhatsApp.

---

## 🌟 Key Features

1. **Information & Inquiry Architecture (Zero DB)**:
   - All content (business details, cars, rates, packages, routes, cities, FAQs, testimonials) lives in centralized TypeScript data files under `src/data/`.
   - The business owner can edit rates, phone numbers, and content by hand without modifying UI components.
2. **Instant Inquiries with Multi-Channel Conversion**:
   - Sticky mobile contact bar (Call Now + WhatsApp).
   - Floating WhatsApp button with pre-filled message.
   - Comprehensive inquiry form with Indian 10-digit phone validation (`^[6-9]\d{9}$`), trip type selector, vehicle picker, and spam honeypot.
3. **Dispatch & Notification System**:
   - `POST /api/inquiry` route with rate limiting.
   - Sends email notification to the business owner via [Resend](https://resend.com) (falls back to clean terminal console simulation in development).
   - Optional webhook hook to append customer inquiries directly to a **Google Sheet**.
4. **Complete SEO & Dynamic Pages**:
   - Dynamic city landing pages (`/cities/[slug]`) for Delhi NCR, Jaipur, Agra, and Chandigarh.
   - Dynamic route landing pages (`/routes/[slug]`) for top North India highways (Delhi-Agra, Delhi-Jaipur, Delhi-Chandigarh, etc.).
   - XML Sitemap (`/sitemap.xml`), `robots.txt`, and Google JSON-LD structured schema (`AutoRental`).

---

## 📁 How to Update Rates & Text (`src/data/`)

You never need to edit JSX/TSX components to change business details or prices:

| File | What you can edit |
| :--- | :--- |
| `src/data/site.ts` | Brand name, phone numbers, WhatsApp, office address, operating hours, and trust badges. |
| `src/data/cars.ts` | Fleet models (Dzire, Ertiga, Crysta, Fortuner, Tempo Traveller), seating, luggage, and rates. |
| `src/data/services.ts` | Airport transfer, local hourly packages (8h/80km), outstation, wedding, and corporate travel details. |
| `src/data/rates.ts` | Exact per-km outstation tariffs, driver day/night charges, and airport fixed fares. |
| `src/data/cities.ts` | Hub city overviews, local package starting prices, airports, and popular destinations. |
| `src/data/routes.ts` | Highway routes, distance in km, travel time, and starting fares. |
| `src/data/faqs.ts` | Questions and answers regarding billing, tolls, night charges, and baggage. |
| `src/data/testimonials.ts`| Customer reviews, ratings, and vehicle feedback. |

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your `RESEND_API_KEY` and `OWNER_EMAIL`. If omitted, inquiries will automatically be logged to your terminal console for testing.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📬 Setting up Lead Notifications

### 1. Resend Email Setup
1. Create a free account at [resend.com](https://resend.com).
2. Generate an API Key and add it to your `.env.local` or Vercel Environment Variables:
   ```env
   RESEND_API_KEY=re_123456789
   OWNER_EMAIL=your-email@example.com
   EMAIL_FROM=Royal Route Inquiries <onboarding@resend.dev>
   ```

### 2. Google Sheets Webhook (Optional)
To send every inquiry automatically to a Google Sheet:
1. Open Google Sheets $\rightarrow$ **Extensions** $\rightarrow$ **Apps Script**.
2. Paste a simple `doPost(e)` script to append `JSON.parse(e.postData.contents)` to row 1.
3. Deploy as a Web App (set access to "Anyone").
4. Add the deployment URL to `.env.local`:
   ```env
   GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/your-id/exec
   ```

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import this repository.
4. Add environment variables (`RESEND_API_KEY`, `OWNER_EMAIL`, `EMAIL_FROM`) under **Environment Variables**.
5. Click **Deploy**. The site will be live worldwide in under 60 seconds with SSL enabled.

---

## ✅ Before You Launch Checklist

- [x] Real phone number configured: `+91 90124 64250` and WhatsApp number: `919012464250` in `src/data/site.ts`.
- [ ] Update your office address in `src/data/site.ts`.
- [ ] Review baseline per-km pricing in `src/data/rates.ts` and adjust to match your local market.
- [ ] Test the inquiry form at `/contact` or on the homepage and check that you receive the email.
- [ ] Verify that clicking the WhatsApp buttons opens WhatsApp with pre-filled text.

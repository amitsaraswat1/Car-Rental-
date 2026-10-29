import { z } from "zod";

// Indian 10-digit mobile number validation (starts with 6, 7, 8, or 9)
export const indianPhoneRegex = /^[6-9]\d{9}$/;

export const inquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters"),
  phone: z
    .string()
    .transform((val) => val.replace(/[\s\-\+]/g, "").replace(/^91/, "")) // Strip country code and spaces
    .refine((val) => indianPhoneRegex.test(val), {
      message: "Please enter a valid 10-digit Indian mobile number (e.g. 9012464250)",
    }),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  tripType: z.enum(["airport", "local", "outstation", "wedding", "corporate"] as const),
  city: z.string().min(2, "Please select or enter your city"),
  pickupLocation: z
    .string()
    .min(3, "Please enter your pickup location / address")
    .max(200, "Pickup location is too long"),
  dropLocation: z.string().max(200).optional().or(z.literal("")),
  pickupDate: z.string().min(4, "Please select a pickup date"),
  pickupTime: z.string().min(2, "Please select a pickup time"),
  returnDate: z.string().optional().or(z.literal("")),
  passengers: z
    .coerce
    .number()
    .min(1, "Minimum 1 passenger required")
    .max(30, "Maximum 30 passengers supported"),
  carType: z.string().min(2, "Please select a preferred car"),
  message: z.string().max(1000, "Special request is too long").optional().or(z.literal("")),
  honeypot: z.string().optional().or(z.literal("")), // Anti-spam hidden field
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

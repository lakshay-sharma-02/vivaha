import * as z from "zod"

export const onboardingSchema = z.object({
  // Step 1: Basic
  full_name: z.string().min(2, "Name is too short"),
  date_of_birth: z.string().date("A valid date of birth is required"),
  gender: z.enum(["male", "female"]),
  phone_number: z.string().regex(/^\+?[0-9]{10,15}$/, "Enter a valid phone number"),
  height_cm: z.preprocess((val) => Number(val), z.number().min(100).max(250)),
  avatar_url: z.string().optional().or(z.literal("")),

  // Step 2: Location
  city: z.string().min(1, "Town/City is required"),
  religion: z.string().min(1, "Religion is required"),
  caste: z.string().min(1, "Caste is required"),
  sub_caste: z.string().optional().or(z.literal("")),

  // Step 3: Personal
  education: z.string().min(1, "Education is required"),
  occupation: z.string().min(1, "Profession is required"),
  income_annual: z.preprocess((val) => Number(val), z.number().min(0)),
  bio: z.string().min(10, "Tell us more about yourself"),

  // Step 4: Family
  family_type: z.enum(["nuclear", "joint"]),
  father_occupation: z.string().min(1, "Father's occupation is required"),
  siblings: z.string().min(1, "Siblings info is required"),
  gotra: z.string().optional().or(z.literal("")),
  mothers_gotra: z.string().optional().or(z.literal("")),
  grandmothers_gotra: z.string().optional().or(z.literal("")),

  // Step 5: Horoscope & Lifestyle
  manglik: z.string().min(1, "Manglik status is required"),
  horoscope_details: z.string().optional().or(z.literal("")),
  diet: z.string().optional().or(z.literal("")),
  smoking: z.string().optional().or(z.literal("")),
  drinking: z.string().optional().or(z.literal("")),
  hobbies: z.string().optional().or(z.literal("")),
  
  // Step 6: Preferences
  partner_age_min: z.preprocess((val) => Number(val), z.number().min(18).max(100)),
  partner_age_max: z.preprocess((val) => Number(val), z.number().min(18).max(100)),
  partner_location: z.string().min(1, "Location preference is required"),
  partner_religion: z.string().min(1, "Religion preference is required"),
  partner_caste: z.string().min(1, "Caste preference is required"),

  // Step 7: Verification & Photos
  aadhaar_last_four: z.string().regex(/^\d{4}$/, "Enter exactly 4 digits"),
  verification_doc_url: z.string().min(1, "Aadhaar document is required"),
  photo_2: z.string().optional().or(z.literal("")),
  photo_3: z.string().optional().or(z.literal("")),
}).refine((data) => data.partner_age_min <= data.partner_age_max, {
  message: "Minimum age cannot be greater than maximum age",
  path: ["partner_age_max"],
})

export type OnboardingData = z.infer<typeof onboardingSchema>

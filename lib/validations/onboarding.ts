import * as z from "zod"

export const onboardingSchema = z.object({
  // Step 1: Basic
  full_name: z.string().min(2, "Name is too short"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"]),
  phone_number: z.string().min(10, "Valid phone number is required"),
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
  family_type: z.string().min(1, "Family type is required"),
  father_occupation: z.string().min(1, "Father's occupation is required"),
  siblings: z.string().min(1, "Siblings info is required"),

  // Step 5: Horoscope
  manglik: z.string().min(1, "Manglik status is required"),
  horoscope_details: z.string().optional().or(z.literal("")),

  // Step 6: Preferences
  partner_age_min: z.preprocess((val) => Number(val), z.number().min(18).max(100)),
  partner_age_max: z.preprocess((val) => Number(val), z.number().min(18).max(100)),
  partner_location: z.string().min(1, "Location preference is required"),
  partner_religion: z.string().min(1, "Religion preference is required"),
  partner_caste: z.string().min(1, "Caste preference is required"),

  // Step 7: Verification
  aadhaar_last_four: z.string().length(4, "Exactly 4 digits required"),
  verification_doc_url: z.string().optional().or(z.literal("")),
})

export type OnboardingData = z.infer<typeof onboardingSchema>

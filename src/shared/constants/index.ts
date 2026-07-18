export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/dashboard",
  MATCHES: "/matches",
  PREMIUM: "/premium",
  APPLY: "/apply",
  CREDENTIALS: "/credentials",
  PENDING: "/pending",
  SUCCESS_STORIES: "/success-stories",
} as const

export const DASHBOARD_ROUTES = {
  ROOT: "/dashboard",
  INTERESTS: "/dashboard/interests",
  MESSAGES: "/dashboard/messages",
  SHORTLISTED: "/dashboard/shortlisted",
  SETTINGS: "/dashboard/settings",
  ADMIN_VERIFICATIONS: "/dashboard/admin/verifications",
} as const

export const PUBLIC_ROUTES = new Set([
  "/", "/login", "/register", "/forgot-password", "/reset-password",
  "/auth/callback", "/premium", "/matches", "/success-stories",
])

export const PROTECTED_ROUTE_PREFIXES = ["/dashboard", "/apply", "/credentials"]

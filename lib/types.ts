export type ActionErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "NOT_VERIFIED"
  | "VALIDATION_ERROR"
  | "CONFLICT"
  | "INTERNAL_ERROR"

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: { code: ActionErrorCode; message: string; field?: string } }

export type ProfileStatus = "DRAFT" | "PENDING_VERIFICATION" | "VERIFIED" | "REJECTED"
export type InterestStatus = "PENDING" | "ACCEPTED" | "DECLINED"

export interface ProfileSummary {
  id: string
  full_name: string | null
  profile_photo_path: string | null
  date_of_birth: string | null
  town: string | null
  religion: string | null
  caste: string | null
  education: string | null
  profession: string | null
  about_me: string | null
}

export interface BrowseResult {
  profiles: ProfileSummary[]
  page: number
  pageSize: number
  totalCount: number
  hasMore: boolean
}

export interface BrowseFilters {
  search?: string
  religion?: string
  caste?: string
  town?: string
  ageMin?: number
  ageMax?: number
}

export interface InterestPerson {
  id: string
  full_name: string | null
  gender: "male" | "female" | null
  profile_photo_path: string | null
  phone_number: string | null
}

export interface DashboardInterest {
  id: string
  status: InterestStatus
  created_at: string
  person: InterestPerson
}

export interface InterestDashboard {
  received: DashboardInterest[]
  sent: DashboardInterest[]
}

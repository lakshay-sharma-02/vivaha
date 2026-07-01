import { redirect } from "next/navigation"
import { checkIsAdmin, getPendingVerifications } from "@/app/actions/admin"
import VerificationAdminClient from "./verification-admin-client"

export const metadata = {
  title: "Verification Admin | Vivaha",
  description: "Review and manage user verification requests",
}

export default async function AdminVerificationPage() {
  const { isAdmin } = await checkIsAdmin()

  if (!isAdmin) {
    redirect('/dashboard')
  }

  const { verifications } = await getPendingVerifications()

  return <VerificationAdminClient verifications={verifications || []} />
}

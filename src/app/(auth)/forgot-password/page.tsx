import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form"
import { AuthLayout } from "@/features/auth/components/auth-layout"

export const metadata = {
  title: "Forgot Password — Vivaha",
  description: "Reset your Vivaha account password.",
}

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      quote="Every new beginning comes from some other beginning's end."
      author="Seneca"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  )
}

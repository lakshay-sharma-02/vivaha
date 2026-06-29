import { LoginForm } from "@/features/auth/components/login-form"
import { AuthLayout } from "@/features/auth/components/auth-layout"

export default function LoginPage() {
  return (
    <AuthLayout 
      quote="To love and be loved is to feel the sun from both sides."
      author="David Viscott"
    >
      <LoginForm />
    </AuthLayout>
  )
}

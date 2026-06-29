import { RegisterForm } from "@/features/auth/components/register-form"
import { AuthLayout } from "@/features/auth/components/auth-layout"

export default function RegisterPage() {
  return (
    <AuthLayout 
      quote="The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed."
      author="Carl Jung"
    >
      <RegisterForm />
    </AuthLayout>
  )
}

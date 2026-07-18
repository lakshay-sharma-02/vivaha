import { Suspense } from "react"
import LoginForm from "./LoginForm"

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen bg-maroon-deep flex items-center justify-center">
        <div className="text-gold-light/50 font-body italic text-sm">Preparing the foyer...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}

"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormValues } from "../schemas/auth-schemas"

import { Button } from "@/shared/ui/button/button"
import { Input } from "@/shared/ui/input/input"
import { Label } from "@/shared/ui/label/label"
import { motion } from "framer-motion"
import Link from "next/link"

export function LoginForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    // Simulate secure API call delay
    setTimeout(() => {
      setIsLoading(false)
      console.log("Login data:", data)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className="glass rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      
      <div className="flex flex-col space-y-3 text-center mb-12 relative z-10">
        <h1 className="font-playfair text-4xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-[15px] text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 relative z-10">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            disabled={isLoading}
            {...register("email")}
            className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.email && (
            <p className="text-[13px] text-destructive">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            {...register("password")}
            className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.password && (
            <p className="text-[13px] text-destructive">{errors.password.message}</p>
          )}
        </div>

        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? "Verifying..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Apply for Membership
        </Link>
      </div>
    </motion.div>
  )
}

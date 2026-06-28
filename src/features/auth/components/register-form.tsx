"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormValues } from "../schemas/auth-schemas"

import { Button } from "@/shared/ui/button/button"
import { Input } from "@/shared/ui/input/input"
import { Label } from "@/shared/ui/label/label"
import { motion } from "framer-motion"
import Link from "next/link"

export function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true)
    // Simulate secure API call delay
    setTimeout(() => {
      setIsLoading(false)
      console.log("Register data:", data)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="flex flex-col space-y-2 text-center mb-10">
        <h1 className="font-playfair text-3xl font-semibold tracking-tight text-foreground">
          Apply for Membership
        </h1>
        <p className="text-sm text-muted-foreground">
          Join an exclusive community of verified individuals.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              disabled={isLoading}
              {...register("firstName")}
              className={errors.firstName ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.firstName && <p className="text-[13px] text-destructive">{errors.firstName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              disabled={isLoading}
              {...register("lastName")}
              className={errors.lastName ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {errors.lastName && <p className="text-[13px] text-destructive">{errors.lastName.message}</p>}
          </div>
        </div>

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
          {errors.email && <p className="text-[13px] text-destructive">{errors.email.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            {...register("password")}
            className={errors.password ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.password && <p className="text-[13px] text-destructive">{errors.password.message}</p>}
        </div>

        <Button className="w-full mt-2" type="submit" disabled={isLoading}>
          {isLoading ? "Encrypting Data..." : "Begin Application"}
        </Button>
      </form>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        Already a member?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </motion.div>
  )
}

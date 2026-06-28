"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ShieldCheck, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/shared/ui/button/button"
import { Card } from "@/shared/ui/card/card"

interface ProfileCardProps {
  name: string
  age: number
  location: string
  profession: string
  education: string
  imageUrl?: string
  isVerified?: boolean
  matchPercentage?: number
}

export function ProfileCard({
  name,
  age,
  location,
  profession,
  education,
  imageUrl,
  isVerified = true,
  matchPercentage,
}: ProfileCardProps) {
  return (
    <Card className="group relative overflow-hidden flex flex-col h-[520px] border-border/40 bg-card/40 backdrop-blur-md">
      {/* Image Container with Hover Scale Effect */}
      <div className="relative h-[65%] w-full overflow-hidden bg-muted">
        <motion.div
          className="h-full w-full bg-cover bg-center transition-transform duration-[800ms] ease-[0.32,0.72,0,1] group-hover:scale-105"
          style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800")' }}
        />
        {/* Subtle Gradient Overlay to ensure the match badge always pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {matchPercentage && (
          <div className="absolute top-4 right-4 rounded-full bg-background/80 px-3 py-1 text-[11px] uppercase tracking-wider font-semibold text-primary backdrop-blur-md border border-white/10">
            {matchPercentage}% Match
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-playfair text-2xl font-semibold text-foreground">
              {name}, {age}
            </h3>
            {isVerified && <ShieldCheck className="h-5 w-5 text-primary" />}
          </div>
          
          <div className="mt-3 flex flex-col space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>{profession} | {education}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center space-x-3">
          <Button className="flex-1">View Profile</Button>
          <Button variant="outline" className="px-4">Pass</Button>
        </div>
      </div>
    </Card>
  )
}

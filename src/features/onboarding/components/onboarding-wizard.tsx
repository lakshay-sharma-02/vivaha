"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/shared/ui/button/button"
import { Input } from "@/shared/ui/input/input"
import { Label } from "@/shared/ui/label/label"
import { useRouter } from "next/navigation"

const STEPS = [
  { id: "intro", title: "Welcome to Vivaha" },
  { id: "basics", title: "The Basics" },
  { id: "location", title: "Where are you?" },
  { id: "profession", title: "Your Calling" },
  { id: "bio", title: "Your Story" },
  { id: "complete", title: "Review" },
]

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [direction, setDirection] = React.useState(1)
  const router = useRouter()

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1)
      setCurrentStep(c => c + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(c => c - 1)
    }
  }

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)"
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 40 : -40,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
    })
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden h-screen w-full">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-black pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      <div className="w-full max-w-2xl px-6 relative z-10 flex flex-col items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {currentStep === 0 && (
              <div className="text-center space-y-6">
                <h1 className="font-playfair text-5xl md:text-6xl font-medium tracking-tight">
                  Welcome to Vivaha
                </h1>
                <p className="text-lg text-white/60 max-w-lg mx-auto">
                  Before you enter the inner circle, we need to know a little more about who you are. This ensures absolute exclusivity and trust.
                </p>
                <div className="pt-8">
                  <Button onClick={nextStep} size="lg" className="px-12 text-md h-14 rounded-full">
                    Begin Interview
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center space-y-2 mb-10">
                  <h2 className="font-playfair text-4xl font-medium">The Basics</h2>
                  <p className="text-white/50">Tell us about your physical presence.</p>
                </div>
                <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Gender</Label>
                    <select defaultValue="" className="flex h-12 w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
                      <option value="" disabled>Select...</option>
                      <option value="male" className="bg-zinc-900">Male</option>
                      <option value="female" className="bg-zinc-900">Female</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Height (cm)</Label>
                    <Input type="number" placeholder="175" className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-primary" />
                  </div>
                  <div className="col-span-2 space-y-3">
                    <Label className="text-white/70 ml-1">Date of Birth</Label>
                    <Input type="date" className="h-12 rounded-xl bg-white/5 border-white/10 text-white focus-visible:ring-primary [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center space-y-2 mb-10">
                  <h2 className="font-playfair text-4xl font-medium">Location</h2>
                  <p className="text-white/50">Where in the world are you based?</p>
                </div>
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Country</Label>
                    <Input placeholder="e.g. United States, India, UK" className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">City</Label>
                    <Input placeholder="e.g. New York, Mumbai, London" className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center space-y-2 mb-10">
                  <h2 className="font-playfair text-4xl font-medium">Your Calling</h2>
                  <p className="text-white/50">What do you do, and what are your roots?</p>
                </div>
                <div className="space-y-6 max-w-md mx-auto">
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Profession</Label>
                    <Input placeholder="e.g. Software Architect, Surgeon, CEO" className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/70 ml-1">Religion / Community</Label>
                    <Input placeholder="e.g. Hindu, Christian, Muslim, None" className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/30" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center space-y-2 mb-10">
                  <h2 className="font-playfair text-4xl font-medium">Your Story</h2>
                  <p className="text-white/50">In a few sentences, describe yourself.</p>
                </div>
                <div className="space-y-6 max-w-lg mx-auto">
                  <div className="space-y-3">
                    <textarea 
                      placeholder="I am passionate about..." 
                      className="w-full h-40 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 p-4 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="text-center space-y-6">
                <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/50 mx-auto flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h1 className="font-playfair text-5xl font-medium tracking-tight">
                  Profile Complete
                </h1>
                <p className="text-lg text-white/60 max-w-lg mx-auto">
                  Your details have been securely encrypted and saved. The curation committee will review your application shortly.
                </p>
                <div className="pt-8">
                  <Button onClick={nextStep} size="lg" className="px-12 text-md h-14 rounded-full">
                    Enter Dashboard
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        {currentStep > 0 && currentStep < STEPS.length - 1 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute bottom-[-100px] w-full flex justify-between items-center px-4 max-w-lg"
          >
            <Button variant="ghost" onClick={prevStep} className="text-white/50 hover:text-white hover:bg-white/10">
              Back
            </Button>
            <Button onClick={nextStep} className="rounded-full px-8">
              Continue
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

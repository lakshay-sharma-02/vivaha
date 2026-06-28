"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/shared/ui/button/button"
import { Input } from "@/shared/ui/input/input"
import { Label } from "@/shared/ui/label/label"

const STEPS = [
  { id: "basic", title: "Basic Information", description: "Let's start with the essentials. This helps us find aligned matches." },
  { id: "education", title: "Education & Career", description: "Tell us about your professional journey and aspirations." },
  { id: "family", title: "Family Background", description: "Family is at the heart of Vivaha. Tell us about your roots." },
]

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [direction, setDirection] = React.useState(1)

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
    }
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 20 : -20,
      opacity: 0,
    }),
  }

  return (
    <div className="flex flex-col space-y-8">
      {/* Progress Indicator */}
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Step {currentStep + 1} of {STEPS.length}</span>
          <span className="hidden sm:inline-block">{STEPS[currentStep].title}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="relative min-h-[420px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-0"
          >
            <div className="mb-10">
              <h2 className="font-playfair text-4xl font-semibold tracking-tight text-foreground">
                {STEPS[currentStep].title}
              </h2>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                {STEPS[currentStep].description}
              </p>
            </div>

            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Input placeholder="e.g. Male, Female" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Current Location</Label>
                  <Input placeholder="City, Country" />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Highest Education</Label>
                  <Input placeholder="e.g. Masters in Computer Science" />
                </div>
                <div className="space-y-2">
                  <Label>Current Profession</Label>
                  <Input placeholder="e.g. Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label>Annual Income (Optional)</Label>
                  <Input placeholder="e.g. $150,000" />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Religion / Community</Label>
                  <Input placeholder="e.g. Hindu, Punjabi" />
                </div>
                <div className="space-y-2">
                  <Label>Family Type</Label>
                  <Input placeholder="e.g. Nuclear, Joint" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 border-t border-border/50">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={currentStep === 0}
          className={currentStep === 0 ? "invisible" : ""}
        >
          Back
        </Button>
        <Button onClick={handleNext}>
          {currentStep === STEPS.length - 1 ? "Submit for Verification" : "Continue"}
        </Button>
      </div>
    </div>
  )
}

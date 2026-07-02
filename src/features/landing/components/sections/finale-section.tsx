"use client"

import { CinematicSection } from "../experience"
import { motion } from "framer-motion"
import { Button } from "@/shared/ui/button/button"
import { scaleIn, fadeInUp } from "@/shared/animations"

export function FinaleSection() {
  return (
    <CinematicSection>
      <div className="relative flex items-center justify-center w-full h-full py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-black/0 to-black/0 opacity-40 pointer-events-none" />

        <motion.div
          className="relative w-[90vw] max-w-xl rounded-[2rem] border border-white/10 overflow-hidden bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-12 shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/10 to-transparent border border-amber-500/20 flex items-center justify-center mb-8">
            <span className="font-playfair text-2xl text-amber-50/90 font-light drop-shadow-md">V</span>
          </div>

          <h2 className="font-playfair text-3xl md:text-5xl font-light text-white tracking-wide mb-4">
            Begin Your Legacy
          </h2>
          <p className="text-zinc-400 font-light mb-12">
            By exclusive invitation or rigorous application.
          </p>

          <motion.div
            className="flex flex-col md:flex-row gap-6 w-full max-w-xs md:max-w-none justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="default"
              size="lg"
              className="px-12 w-full md:w-auto hover:scale-105 transition-transform"
            >
              Apply for Membership
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-12 w-full md:w-auto border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white hover:border-white/20 transition-all"
            >
              Member Sign In
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </CinematicSection>
  )
}

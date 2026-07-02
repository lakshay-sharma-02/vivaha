"use client"

import { motion, MotionValue, useTransform } from "framer-motion"
import { Button } from "@/shared/ui/button/button"

export function SceneFinale({ progress }: { progress: MotionValue<number> }) {

  const finaleOpacity = useTransform(progress, [0.95, 0.98, 1], [0, 1, 1])
  const cardScale = useTransform(progress, [0.95, 1], [0.9, 1])
  const foilOpacity = useTransform(progress, [0.96, 1], [0, 1])

  // Enhanced animation transforms
  const spotlightOpacity = useTransform(progress, [0.96, 1], [0, 0.4])
  const emblemScale = useTransform(progress, [0.96, 0.98], [0.8, 1])
  const emblemOpacity = useTransform(progress, [0.96, 0.98], [0, 1])
  const titleOpacity = useTransform(progress, [0.97, 0.99], [0, 1])
  const titleY = useTransform(progress, [0.97, 0.99], [20, 0])
  const subtitleOpacity = useTransform(progress, [0.98, 1], [0, 1])
  const buttonsOpacity = useTransform(progress, [0.98, 1], [0, 1])
  const buttonsY = useTransform(progress, [0.98, 1], [20, 0])

  return (
    <motion.div style={{ opacity: finaleOpacity, transform: "translateZ(0)" }} className="absolute inset-0 flex items-center justify-center pointer-events-auto z-50">

      {/* Radial spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: spotlightOpacity,
          background: "radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 60%)"
        }}
      />

      <motion.div style={{ scale: cardScale, transform: "translateZ(0)" }} className="relative w-[90vw] max-w-xl h-96 md:h-[32rem] glass rounded-[2rem] border-white/10 overflow-hidden bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-12 group cursor-pointer shadow-2xl">

        {/* Animated Gold Foil Reflection - Enhanced */}
        <motion.div
          style={{ opacity: foilOpacity }}
          className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-500/30 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"
        />

        {/* Pulsing ambient glow */}
        <motion.div
          className="absolute inset-0 opacity-50 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(245,158,11,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 70%, rgba(245,158,11,0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 30%, rgba(245,158,11,0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/10 to-transparent border border-amber-500/20 flex items-center justify-center mb-8 relative"
          style={{ scale: emblemScale, opacity: emblemOpacity }}
          animate={{
            boxShadow: [
              "0 0 30px rgba(245,158,11,0.2)",
              "0 0 50px rgba(245,158,11,0.4)",
              "0 0 30px rgba(245,158,11,0.2)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-playfair text-2xl text-amber-50/90 font-light">V</span>
        </motion.div>

        <motion.h2
          className="font-playfair text-3xl md:text-5xl font-light text-white tracking-wide mb-4"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          Begin Your Legacy
        </motion.h2>
        <motion.p
          className="text-zinc-400 font-light mb-12"
          style={{ opacity: subtitleOpacity }}
        >
          By exclusive invitation or rigorous application.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row gap-6 w-full max-w-xs md:max-w-none justify-center"
          style={{ opacity: buttonsOpacity, y: buttonsY }}
        >
          <Button variant="default" size="lg" className="px-12 w-full md:w-auto group/btn relative overflow-hidden">
            <span className="relative z-10">Apply for Membership</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </Button>
          <Button variant="outline" size="lg" className="px-12 w-full md:w-auto border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white hover:border-white/20 transition-all">
            Member Sign In
          </Button>
        </motion.div>

      </motion.div>

    </motion.div>
  )
}

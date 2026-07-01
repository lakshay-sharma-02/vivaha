"use client"

import { motion, MotionValue, useTransform } from "framer-motion"
import { Button } from "@/shared/ui/button/button"
import { useMemo } from "react"

export function SceneFinale({ progress, rawProgress }: { progress: MotionValue<number>; rawProgress: MotionValue<number> }) {

  const shouldRender = useMemo(() => {
    return rawProgress.get() >= 0.93
  }, [rawProgress])

  const finaleOpacity = useTransform(progress, [0.95, 0.98, 1], [0, 1, 1])
  const cardScale = useTransform(progress, [0.95, 1], [0.9, 1])
  const foilOpacity = useTransform(progress, [0.96, 1], [0, 1])

  if (!shouldRender) return null

  return (
    <motion.div style={{ opacity: finaleOpacity, willChange: "opacity" }} className="absolute inset-0 flex items-center justify-center pointer-events-auto z-50">
      
      <motion.div style={{ scale: cardScale, willChange: "transform" }} className="relative w-[90vw] max-w-xl h-96 md:h-[32rem] glass rounded-[2rem] border-white/10 overflow-hidden bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-12 group cursor-pointer">
        {/* GPU Friendly Faked Drop Shadow */}
        <div className="absolute -inset-20 bg-black/90 blur-3xl -z-10 rounded-full pointer-events-none" />
        
        {/* Animated Gold Foil Reflection */}
        <motion.div 
          style={{ opacity: foilOpacity }}
          className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 via-amber-500/20 to-amber-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" 
        />

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/10 to-transparent border border-amber-500/20 flex items-center justify-center mb-8">
          <span className="font-playfair text-2xl text-amber-50/90 font-light">V</span>
        </div>

        <h2 className="font-playfair text-3xl md:text-5xl font-light text-white tracking-wide mb-4">
          Begin Your Legacy
        </h2>
        <p className="text-zinc-400 font-light mb-12">
          By exclusive invitation or rigorous application.
        </p>

        <div className="flex flex-col md:flex-row gap-6 w-full max-w-xs md:max-w-none justify-center">
          <Button variant="default" size="lg" className="px-12 w-full md:w-auto">
            Apply for Membership
          </Button>
          <Button variant="outline" size="lg" className="px-12 w-full md:w-auto border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white">
            Member Sign In
          </Button>
        </div>

      </motion.div>

    </motion.div>
  )
}

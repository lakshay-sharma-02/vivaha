"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/shared/ui/button/button"

interface ProfileGalleryProps {
  images: string[]
}

export function ProfileGallery({ images }: ProfileGalleryProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  
  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  if (!images?.length) return null

  return (
    <div className="group relative h-[60vh] min-h-[500px] w-full overflow-hidden rounded-2xl bg-muted border border-border/30 shadow-2xl shadow-black/5">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

      {/* Image Controls - Visible on Hover */}
      {images.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-12 w-12 rounded-full border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-black/40 hover:text-white" 
            onClick={prev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-12 w-12 rounded-full border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-black/40 hover:text-white" 
            onClick={next}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}

      {/* Minimalist Progress Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

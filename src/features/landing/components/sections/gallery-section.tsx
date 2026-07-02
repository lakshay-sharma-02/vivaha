"use client"

import { CinematicSection, use3DTilt } from "../experience"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { staggerContainer, staggerItem } from "@/shared/animations"

const profiles = [
  { id: 1, name: "Priya", age: 28, location: "New York", imageUrl: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Anjali", age: 26, location: "London", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Rohan", age: 31, location: "Mumbai", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Neha", age: 29, location: "Delhi", imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop" },
]

function GalleryCard({ profile }: { profile: { id: number, name: string, age: number, location: string, imageUrl: string } }) {
  const ref = useRef<HTMLDivElement>(null)
  const { rotateX, rotateY } = use3DTilt(ref, 15)

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[3/4] cursor-pointer group"
    >
      <motion.div
        className="w-full h-full relative"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={profile.imageUrl}
          alt={`${profile.name}, ${profile.age}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-left transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="text-2xl font-playfair font-medium text-white mb-1">
          {profile.name}, {profile.age}
        </div>
        <div className="text-sm text-white/60 font-light">
          {profile.location}
        </div>
      </div>
    </motion.div>
  )
}

export function GallerySection() {
  return (
    <CinematicSection>
      <div className="relative flex flex-col items-center justify-center w-full h-full py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-6xl text-white font-medium mb-4 drop-shadow-md">
            The Gallery
          </h2>
          <p className="text-zinc-400 tracking-widest uppercase text-sm">
            Where art meets connection
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {profiles.map((profile) => (
            <GalleryCard key={profile.id} profile={profile} />
          ))}
        </motion.div>
      </div>
    </CinematicSection>
  )
}

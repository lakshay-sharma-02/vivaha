"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/shared/utils/cn";

interface CinematicSectionProps {
  children: React.ReactNode;
  index: number;
  className?: string;
  zIndex?: number;
}

export function CinematicSection({ children, index, className, zIndex = 1 }: CinematicSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // Progress tracks from when this section hits top, until it leaves top
  });

  // When a section is scrolling UP and AWAY, it fades out and scales down slightly.
  // We don't fade it IN from 0 because the -mt-[100vh] overlap means it is already visible BEHIND the previous section.
  // The previous section fading out reveals this one.
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[200vh] w-full",
        index > 0 && "-mt-[100vh]",
        className
      )}
      style={{ zIndex: 100 - index }} // Earlier sections have higher z-index to sit on top and fade away
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ 
            opacity, 
            scale, 
            filter,
            willChange: "transform, opacity, filter" 
          }}
          className="w-full h-full flex flex-col items-center justify-center relative"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

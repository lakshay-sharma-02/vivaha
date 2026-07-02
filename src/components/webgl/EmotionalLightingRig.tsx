"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function EmotionalLightingRig() {
  const { scene } = useThree();
  const scrollProgress = useRef(0);
  const stRef = useRef<gsap.core.Timeline>(null);
  
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const spotRef = useRef<THREE.SpotLight>(null);

  useEffect(() => {
    // Inject fog dynamically so we can control its evolution
    if (!scene.fog) {
      scene.fog = new THREE.Fog("#000000", 5, 20);
    }
    
    stRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });
    stRef.current.to(scrollProgress, { current: 1, ease: "none" });
    
    return () => {
      if (stRef.current) {
        stRef.current.scrollTrigger?.kill();
        stRef.current.kill();
      }
    };
  }, [scene]);

  useFrame(() => {
    const p = scrollProgress.current;
    
    // 1. Fog Evolution (Mystery -> Clarity)
    if (scene.fog instanceof THREE.Fog) {
      // At start (Unknown): near=5, far=20 (thick fog, suffocating slightly)
      // At end (Commitment): near=15, far=50 (vast, expansive, clear)
      scene.fog.near = THREE.MathUtils.lerp(5, 15, p);
      scene.fog.far = THREE.MathUtils.lerp(20, 50, p);
    }

    // 2. Ambient Light Evolution (Low Contrast -> Warm Expansive)
    if (ambientRef.current) {
      // Start: very dim. End: warm fill.
      ambientRef.current.intensity = THREE.MathUtils.lerp(0.05, 0.5, p);
      
      const startColor = new THREE.Color("#0a0a0c"); // Cold, stark darkness
      const endColor = new THREE.Color("#2a2015");   // Warm, inviting belonging
      ambientRef.current.color.lerpColors(startColor, endColor, p);
    }

    // 3. Key Spotlight (Guiding the eye -> Golden highlights)
    if (spotRef.current) {
      // Becomes brightest around the 60% mark (Connection & Trust), 
      // then softens as the ambient light takes over for the finale.
      let spotIntensity = 0;
      if (p < 0.6) {
        // Ramp up smoothly
        const progressToPeak = p / 0.6;
        spotIntensity = progressToPeak * progressToPeak * 8; 
      } else {
        // Soften to a gentle fill
        const progressFromPeak = (p - 0.6) / 0.4;
        spotIntensity = THREE.MathUtils.lerp(8, 3, progressFromPeak);
      }
      spotRef.current.intensity = spotIntensity;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} color="#0a0a0c" intensity={0.05} />
      <spotLight 
        ref={spotRef}
        position={[2, 10, -5]} 
        color="#e8cfa6" 
        angle={0.6} 
        penumbra={1} 
        distance={40} 
        decay={2}
        intensity={0}
      />
      {/* 
        A secondary subtle blue/graphite rim light coming from below 
        to ensure geometry doesn't get lost in the deep blacks 
      */}
      <directionalLight 
        position={[-5, -5, -10]}
        color="#2c3440"
        intensity={0.5}
      />
    </>
  );
}

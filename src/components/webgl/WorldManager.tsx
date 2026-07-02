"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";

import { CinematographerCamera } from "./CinematographerCamera";
import { SymbolicEntities } from "./SymbolicEntities";
import { EmotionalLightingRig } from "./EmotionalLightingRig";

export function WorldManager() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0c] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          alpha: false
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#0a0a0c"]} />
        {/* Fog starts dense at the top */}
        <fog attach="fog" args={["#0a0a0c", 1, 15]} />

        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.1} />
          <EmotionalLightingRig />
          
          <CinematographerCamera />
          <SymbolicEntities />
          
          <Preload all />
        </Suspense>

        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.85}
            luminanceSmoothing={0.1}
            intensity={0.4}
            mipmapBlur
          />
          <DepthOfField target={[0, 0, -5]} focalLength={0.02} bokehScale={2} height={480} />
          <Vignette eskil={false} offset={0.1} darkness={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

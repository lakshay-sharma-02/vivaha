"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload, Environment } from "@react-three/drei";

// We will import these once we build them
import { CinematographerCamera } from "./CinematographerCamera";
import { SymbolicEntities } from "./SymbolicEntities";
import { EmotionalLightingRig } from "./EmotionalLightingRig";

export function WorldManager() {
  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: false // Opaque background for performance
        }}
        dpr={[1, 1.5]} // Limit pixel ratio to 1.5 for performance
      >
        <color attach="background" args={["#000000"]} />

        <Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.1} />
          <EmotionalLightingRig />
          
          <CinematographerCamera />
          <SymbolicEntities />
          


          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

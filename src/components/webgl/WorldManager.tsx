"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Preload, Environment } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";

import { CinematographerCamera } from "./CinematographerCamera";
import { SymbolicEntities } from "./SymbolicEntities";

export function WorldManager() {
  return (
    <div className="fixed inset-0 z-0 bg-[#040405] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          alpha: false
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#040405"]} />
        <fog attach="fog" args={["#040405", 5, 25]} />

        <Suspense fallback={null}>
          {/* High contrast HDRI for realistic reflections & refractions on metal/glass */}
          <Environment preset="city" environmentIntensity={0.6} />
          
          {/* Dramatic lighting setup designed for hero geometry */}
          <ambientLight intensity={0.1} />
          
          {/* Rim light from top-right for sharp bevel highlights */}
          <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={5} color="#ffffff" castShadow />
          
          {/* Warm under-glow from bottom-left */}
          <spotLight position={[-10, -10, -10]} angle={0.2} penumbra={1} intensity={3} color="#d4af37" />
          
          {/* Directional fill for overall structural legibility */}
          <directionalLight position={[0, 10, -10]} intensity={1.5} color="#8c6b45" />

          {/* Manages smooth cinematic camera transitions */}
          <CinematographerCamera />
          
          {/* Hero 3D Objects */}
          <SymbolicEntities />
          
          <Preload all />
        </Suspense>

        <EffectComposer>
          {/* Advanced Bloom optimized for emissive threads and gold highlights */}
          <Bloom 
            luminanceThreshold={0.9}
            luminanceSmoothing={0.2}
            intensity={0.6}
            mipmapBlur
          />
          {/* Macro photography lens vibe */}
          <DepthOfField target={[0, 0, 0]} focalLength={0.05} bokehScale={3} height={480} />
          <Vignette eskil={false} offset={0.2} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

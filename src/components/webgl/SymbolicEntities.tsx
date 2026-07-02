"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Light Streams (Emotion: Unknown -> Curiosity)
function LightStreams() {
  const light1Ref = useRef<THREE.Group>(null);
  const light2Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(t * 0.2) * 4;
      light1Ref.current.position.y = Math.cos(t * 0.3) * 2;
      light1Ref.current.position.z = Math.sin(t * 0.1) * 3 - 5;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(t * 0.25) * 4;
      light2Ref.current.position.y = Math.sin(t * 0.35) * 2;
      light2Ref.current.position.z = Math.cos(t * 0.15) * 3 - 5;
    }
  });

  return (
    <>
      <group ref={light1Ref}>
        <pointLight color="#ffffff" intensity={2} distance={10} decay={2} />
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </group>
      
      <group ref={light2Ref}>
        <pointLight color="#e8cfa6" intensity={2} distance={10} decay={2} />
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#e8cfa6" transparent opacity={0.8} />
        </mesh>
      </group>
    </>
  );
}

// 2. Particle Constellations: The Signature Moment
function ParticleConstellations() {
  const count = 3000;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const scrollProgress = useRef(0);
  const stRef = useRef<gsap.core.Timeline>(null);
  
  useEffect(() => {
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
  }, []);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Pre-calculate chaotic and structured states
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // State A: Chaotic Drift (Unknown / Isolation)
      const chaoticX = (Math.random() - 0.5) * 30;
      const chaoticY = (Math.random() - 0.5) * 30;
      const chaoticZ = (Math.random() - 0.5) * 30;
      
      // State B: Structured Convergence (Double Helix for Compatibility)
      const t_helix = i / count;
      const theta = t_helix * Math.PI * 40; // 20 turns
      const r = 1.5 + (Math.random() * 0.4); // Thin, elegant ribbon
      const height = (t_helix - 0.5) * 30;
      const isStrand1 = i % 2 === 0;
      
      const targetX = Math.cos(theta + (isStrand1 ? 0 : Math.PI)) * r;
      const targetY = height;
      const targetZ = Math.sin(theta + (isStrand1 ? 0 : Math.PI)) * r;

      const speed = 0.01 + Math.random() * 0.02;
      const factor = Math.random() * 100;
      
      temp.push({ chaoticX, chaoticY, chaoticZ, targetX, targetY, targetZ, speed, factor });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current;
    
    // Convergence logic: Map scroll [0.4 to 0.75] to [0 to 1]
    let convergence = 0;
    if (p > 0.4) {
      convergence = Math.min(1, (p - 0.4) / 0.35);
    }
    // Smoothstep easing for organic magnetic pull
    convergence = convergence * convergence * (3 - 2 * convergence);
    
    particles.forEach((particle, i) => {
      const { chaoticX, chaoticY, chaoticZ, targetX, targetY, targetZ, speed, factor } = particle;
      
      // Drift is active mostly in the chaotic state, diminishing as they lock in
      const driftMult = 1 - convergence;
      const xDrift = Math.sin(t * speed + factor) * 1.5 * driftMult;
      const yDrift = Math.cos(t * speed + factor) * 1.5 * driftMult;
      const zDrift = Math.sin(t * speed + factor) * 1.5 * driftMult;
      
      // Interpolate between Chaos and Structure
      const currentX = THREE.MathUtils.lerp(chaoticX + xDrift, targetX, convergence);
      const currentY = THREE.MathUtils.lerp(chaoticY + yDrift, targetY, convergence);
      const currentZ = THREE.MathUtils.lerp(chaoticZ + zDrift, targetZ, convergence);
      
      dummy.position.set(currentX, currentY, currentZ);
      
      // Scale pulse
      const s = 1 + Math.sin(t * speed * 2 + factor) * 0.3;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 0, 0]}>
      <sphereGeometry args={[0.015, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
}

// 3. Golden Threads (Emotion: Hope -> Commitment)
function GoldenThreads() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollProgress = useRef(0);
  const stRef = useRef<gsap.core.Timeline>(null);

  useEffect(() => {
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
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
      
      // Threads only become fully visible at the end
      const p = scrollProgress.current;
      let opacity = 0;
      if (p > 0.7) {
        opacity = Math.min(1, (p - 0.7) / 0.2);
      }
      groupRef.current.scale.setScalar(0.5 + opacity * 0.5);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -12]}>
      <mesh>
        <torusGeometry args={[8, 0.02, 16, 100]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1}
          roughness={0.2}
          transparent
          opacity={0.3} // Base opacity, manipulated by scale above for reveal
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8.5, 0.01, 16, 100]} />
        <meshStandardMaterial 
          color="#d4af37" 
          metalness={1}
          roughness={0.3}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

export function SymbolicEntities() {
  return (
    <group>
      <LightStreams />
      <ParticleConstellations />
      <GoldenThreads />
    </group>
  );
}

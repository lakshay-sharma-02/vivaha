"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Phase 1: Massive Crystalline Monolith
function CrystallineMonolith({ scrollCurrent }: { scrollCurrent: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollCurrent.current;

    // Fade out / move away as we scroll past phase 1 (0 to 0.3)
    const phaseProgress = Math.min(1, p / 0.3);
    
    // Inertial mouse rotation & idle breathing
    const targetRotX = (mouse.y * 0.2) + (t * 0.1);
    const targetRotY = (mouse.x * 0.2) + (t * 0.05);
    
    meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetRotY - meshRef.current.rotation.y) * 0.05;

    // Move out of view dynamically based on scroll
    meshRef.current.position.y = THREE.MathUtils.lerp(0, 15, phaseProgress);
    meshRef.current.position.z = THREE.MathUtils.lerp(0, -10, phaseProgress);
    
    // Scale down slightly as it leaves
    const scale = THREE.MathUtils.lerp(2, 1, phaseProgress);
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={2}>
      {/* A complex, fractured monolith shape */}
      <icosahedronGeometry args={[1, 1]} />
      <MeshTransmissionMaterial 
        background={new THREE.Color("#040405")}
        thickness={2.5}
        roughness={0.15}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.08}
        anisotropy={0.4}
        color="#ffffff"
        distortion={0.2}
        distortionScale={0.5}
      />
    </mesh>
  );
}

// 2. Phase 2: Fragmented Rings Assembling
function FragmentedRings({ scrollCurrent }: { scrollCurrent: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { mouse } = useThree();

  const count = 40;
  const fragments = useMemo(() => {
    const frags = [];
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const ringR = 2.5;
      
      // Target (assembled mobius/ring)
      const targetX = Math.cos(theta) * ringR;
      const targetY = Math.sin(theta * 2) * 0.5; // Slight wave
      const targetZ = Math.sin(theta) * ringR;
      const targetRotX = Math.PI / 2;
      const targetRotY = -theta;
      const targetRotZ = Math.sin(theta) * Math.PI;

      // Chaos (shattered floating)
      const chaosX = (Math.random() - 0.5) * 20;
      const chaosY = (Math.random() - 0.5) * 20 - 10; // Start below
      const chaosZ = (Math.random() - 0.5) * 20;
      const chaosRotX = Math.random() * Math.PI * 2;
      const chaosRotY = Math.random() * Math.PI * 2;
      const chaosRotZ = Math.random() * Math.PI * 2;

      frags.push({
        targetX, targetY, targetZ, targetRotX, targetRotY, targetRotZ,
        chaosX, chaosY, chaosZ, chaosRotX, chaosRotY, chaosRotZ,
        delay: Math.random() * 0.2 // staggering
      });
    }
    return frags;
  }, [count]);

  useFrame((state) => {
    const p = scrollCurrent.current;
    
    // Assemble from 0.2 to 0.5. At 0.5 it's perfect. Then at 0.6 it moves up.
    let assembleProgress = 0;
    if (p > 0.15 && p < 0.6) {
      assembleProgress = Math.min(1, (p - 0.15) / 0.35);
    } else if (p >= 0.6) {
      assembleProgress = 1;
    }
    
    // Smooth step easing
    const ease = assembleProgress * assembleProgress * (3 - 2 * assembleProgress);

    // Group movement and mouse parallax
    if (groupRef.current) {
      // Enter from below, exit top
      let yOffset = -15 * (1 - ease);
      if (p > 0.55) {
         yOffset += (p - 0.55) * 40; // move up and out
      }
      groupRef.current.position.y = yOffset;
      
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.3 + Math.sin(t * 0.2) * 0.2, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.3 + t * 0.1, 0.05);
      groupRef.current.rotation.z = Math.cos(t * 0.1) * 0.1;
    }

    // Apply interpolated positions to each fragment
    fragments.forEach((frag, i) => {
      const mesh = meshRefs.current[i];
      if (!mesh) return;
      
      const individualEase = Math.max(0, Math.min(1, (ease - frag.delay) / (1 - frag.delay)));
      const cubicEase = individualEase * individualEase * (3 - 2 * individualEase);

      mesh.position.x = THREE.MathUtils.lerp(frag.chaosX, frag.targetX, cubicEase);
      mesh.position.y = THREE.MathUtils.lerp(frag.chaosY, frag.targetY, cubicEase);
      mesh.position.z = THREE.MathUtils.lerp(frag.chaosZ, frag.targetZ, cubicEase);

      mesh.rotation.x = THREE.MathUtils.lerp(frag.chaosRotX, frag.targetRotX, cubicEase);
      mesh.rotation.y = THREE.MathUtils.lerp(frag.chaosRotY, frag.targetRotY, cubicEase);
      mesh.rotation.z = THREE.MathUtils.lerp(frag.chaosRotZ, frag.targetRotZ, cubicEase);
    });
  });

  return (
    <group ref={groupRef}>
      {fragments.map((_, i) => (
        <mesh 
          key={i} 
          ref={(el) => { meshRefs.current[i] = el; }}
        >
          <boxGeometry args={[1.2, 0.15, 0.3]} />
          <meshStandardMaterial 
            color="#d4af37" 
            metalness={1} 
            roughness={0.2} 
            envMapIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
}

// 3. Phase 3: Volumetric Fluid Threads
function VolumetricThreads({ scrollCurrent }: { scrollCurrent: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 3000;
  const { mouse } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = Math.random() * 2 + 0.5;
      const y = (Math.random() - 0.5) * 20;
      const phase = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1.2;
      arr.push({ theta, r, y, phase, speed });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = scrollCurrent.current;

    // Reveal thread system in the second half of scroll
    let presence = 0;
    if (p > 0.45) {
      presence = Math.min(1, (p - 0.45) / 0.35);
    }
    presence = presence * presence * (3 - 2 * presence); // smoothstep

    particles.forEach((particle, i) => {
      // Dynamic weaving
      const radiusOffset = Math.sin(particle.phase + t * particle.speed) * 0.5;
      const currentR = particle.r + radiusOffset;
      const x = Math.cos(particle.theta + t * 0.2) * currentR;
      const z = Math.sin(particle.theta + t * 0.2) * currentR;
      const y = particle.y + Math.cos(particle.phase + t * particle.speed * 0.5) * 1.5;

      // Mouse repulsion physics
      const dx = x - mouse.x * 6;
      const dy = y - mouse.y * 6;
      const dist = Math.sqrt(dx*dx + dy*dy);
      const repulsion = Math.max(0, 2 - dist) * 0.8;
      
      const finalX = x + dx * repulsion;
      const finalY = y + dy * repulsion;

      // Hide them deep in Z until presence builds up, then bring them right to the camera
      const hiddenZ = z - 25;
      const revealedZ = z + Math.sin(t * 0.5 + particle.phase) * 1.5; // breathing z
      const finalZ = THREE.MathUtils.lerp(hiddenZ, revealedZ, presence);

      dummy.position.set(finalX, finalY, finalZ);
      
      // Scale based on presence and time
      const s = presence * (0.6 + Math.abs(Math.sin(particle.phase + t * 2)) * 0.4);
      dummy.scale.setScalar(s);
      
      // Orient capsule along motion (approximate by looking at center)
      dummy.lookAt(0, finalY, 0);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 0, 0]}>
      {/* Capsule shape makes it look like fluid strands/threads */}
      <capsuleGeometry args={[0.015, 0.4, 4, 8]} />
      <meshStandardMaterial 
        color="#e8cfa6" 
        emissive="#d4af37" 
        emissiveIntensity={0.6} 
        roughness={0.3} 
        metalness={0.9} 
      />
    </instancedMesh>
  );
}

export function SymbolicEntities() {
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollTarget.current = self.progress;
      },
    });
    return () => { trigger.kill(); };
  }, []);

  useFrame((_, delta) => {
    const lambda = 5;
    scrollCurrent.current += (scrollTarget.current - scrollCurrent.current) * (1 - Math.exp(-lambda * delta));
  });

  return (
    <group>
      <CrystallineMonolith scrollCurrent={scrollCurrent} />
      <FragmentedRings scrollCurrent={scrollCurrent} />
      <VolumetricThreads scrollCurrent={scrollCurrent} />
    </group>
  );
}

"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematographerCamera() {
  const { camera, scene } = useThree();
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);
  const scrollTimeline = useRef<gsap.core.Timeline>(null);

  // Define the cinematic path
  const cameraPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 10),    // Arrival
      new THREE.Vector3(1, 0.5, 5),   // Invitation
      new THREE.Vector3(0, -0.5, 0),  // Discovery
      new THREE.Vector3(-1, 0, -5),   // Connection
      new THREE.Vector3(0, 0.5, -10), // Trust
      new THREE.Vector3(0, 0, -12),   // Legacy
    ], false, "catmullrom", 0.5);
  }, []);

  const lookAtPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -5),
      new THREE.Vector3(0, 0, -10),
      new THREE.Vector3(0, 0, -15),
      new THREE.Vector3(0, 0, -15),
      new THREE.Vector3(0, 0, -15),
    ], false, "catmullrom", 0.5);
  }, []);

  const colorSlate = useMemo(() => new THREE.Color("#0a0a0c"), []);
  const colorBronze = useMemo(() => new THREE.Color("#8c6b45"), []);
  const colorCashmere = useMemo(() => new THREE.Color("#2a2015"), []);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollTarget.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useFrame((state, delta) => {
    // Exponential decay dampening
    const lambda = 5;
    scrollCurrent.current += (scrollTarget.current - scrollCurrent.current) * (1 - Math.exp(-lambda * delta));

    const t = Math.max(0, Math.min(1, scrollCurrent.current));
    
    // Camera position and lookAt
    const pos = cameraPath.getPointAt(t);
    const lookAtPos = lookAtPath.getPointAt(t);

    camera.position.copy(pos);

    const dummy = new THREE.Object3D();
    dummy.position.copy(camera.position);
    dummy.lookAt(lookAtPos);
    camera.quaternion.slerp(dummy.quaternion, 1 - Math.exp(-lambda * delta));

    // Colors: interpolate through bronze midpoint
    const currentColor = new THREE.Color();
    if (t < 0.5) {
      currentColor.copy(colorSlate).lerp(colorBronze, t * 2);
    } else {
      currentColor.copy(colorBronze).lerp(colorCashmere, (t - 0.5) * 2);
    }

    scene.background = currentColor;
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.copy(currentColor);
      // Dynamic fog near and far planes
      // Dense at top (near: 1, far: 15), vast at bottom (near: 5, far: 30)
      scene.fog.near = THREE.MathUtils.lerp(1, 5, t);
      scene.fog.far = THREE.MathUtils.lerp(15, 30, t);
    }
  });

  return null;
}

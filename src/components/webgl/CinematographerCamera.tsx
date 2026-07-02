"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematographerCamera() {
  const { camera } = useThree();
  const progress = useRef(0);
  const scrollTimeline = useRef<gsap.core.Timeline>(null);

  // Define the cinematic path using a Spline Curve
  const cameraPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 10),    // Scene 1: Arrival
      new THREE.Vector3(1, 0.5, 5),   // Scene 2: Invitation
      new THREE.Vector3(0, -0.5, 0),  // Scene 3: Discovery
      new THREE.Vector3(-1, 0, -5),   // Scene 4: Connection
      new THREE.Vector3(0, 0.5, -10), // Scene 5: Trust
      new THREE.Vector3(0, 0, -12),   // Scene 6: Legacy
    ], false, "catmullrom", 0.5);
  }, []);

  // Define where the camera should look at each point
  const lookAtPath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),     // Look straight ahead
      new THREE.Vector3(0, 0, -5),    
      new THREE.Vector3(0, 0, -10),   
      new THREE.Vector3(0, 0, -15),   
      new THREE.Vector3(0, 0, -15),   
      new THREE.Vector3(0, 0, -15),   
    ], false, "catmullrom", 0.5);
  }, []);

  useEffect(() => {
    // We attach the scroll trigger to the document body to read overall scroll
    scrollTimeline.current = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // High scrub value for extreme smoothness (inertia)
      },
    });

    // Animate our ref's current value from 0 to 1 based on scroll
    scrollTimeline.current.to(progress, {
      current: 1,
      ease: "none",
    });

    return () => {
      if (scrollTimeline.current) {
        scrollTimeline.current.scrollTrigger?.kill();
        scrollTimeline.current.kill();
      }
    };
  }, []);

  useFrame(() => {
    // Sample the paths based on the scroll progress
    const t = Math.max(0, Math.min(1, progress.current));
    
    // Get position and lookAt points from our splines
    const pos = cameraPath.getPointAt(t);
    const lookAtPos = lookAtPath.getPointAt(t);

    // Apply to camera
    camera.position.lerp(pos, 0.05); // Lerp for extra smoothness
    
    // Smoothly interpolate the rotation (using dummy object to calculate target quaternion)
    const dummy = new THREE.Object3D();
    dummy.position.copy(camera.position);
    dummy.lookAt(lookAtPos);
    camera.quaternion.slerp(dummy.quaternion, 0.05);
  });

  return null;
}

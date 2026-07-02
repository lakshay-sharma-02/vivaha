"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Nodes
  const masterGainRef = useRef<GainNode | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const airFilterRef = useRef<BiquadFilterNode | null>(null);

  useEffect(() => {
    // Only initialize Web Audio on user interaction
    if (!isPlaying) {
      if (audioCtxRef.current?.state === "running") {
        masterGainRef.current?.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 1);
        setTimeout(() => audioCtxRef.current?.suspend(), 1000);
      }
      return;
    }

    const initAudio = async () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const ctx = audioCtxRef.current;

        masterGainRef.current = ctx.createGain();
        masterGainRef.current.gain.value = 0;
        masterGainRef.current.connect(ctx.destination);

        // 1. Deep Resonance (Sine wave drone)
        droneOscRef.current = ctx.createOscillator();
        droneOscRef.current.type = "sine";
        droneOscRef.current.frequency.value = 55; // Low A
        
        const droneGain = ctx.createGain();
        droneGain.gain.value = 0.4;
        droneOscRef.current.connect(droneGain);
        droneGain.connect(masterGainRef.current);
        droneOscRef.current.start();

        // 2. Air / Breath (Filtered White Noise)
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        noiseSource.loop = true;

        airFilterRef.current = ctx.createBiquadFilter();
        airFilterRef.current.type = "lowpass";
        airFilterRef.current.frequency.value = 400; // Muffled air
        
        const airGain = ctx.createGain();
        airGain.gain.value = 0.05;
        
        noiseSource.connect(airFilterRef.current);
        airFilterRef.current.connect(airGain);
        airGain.connect(masterGainRef.current);
        noiseSource.start();
      }

      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }
      
      masterGainRef.current?.gain.setTargetAtTime(1, audioCtxRef.current.currentTime, 2);
    };

    initAudio();

    // Scroll listener to modulate audio dynamically
    const handleScroll = () => {
      if (!audioCtxRef.current || !airFilterRef.current || !droneOscRef.current) return;
      
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // As we reach connection/legacy (progress > 0.5), open the filter for more "air" 
      // and slightly raise the drone pitch to create tension and resolution.
      const targetFreq = 400 + progress * 600; // Opens up to 1000Hz
      const targetDronePitch = 55 + (progress > 0.7 ? 13.75 : 0); // Jump a subtle harmonic at the end
      
      const time = audioCtxRef.current.currentTime;
      airFilterRef.current.frequency.setTargetAtTime(targetFreq, time, 0.5);
      droneOscRef.current.frequency.setTargetAtTime(targetDronePitch, time, 2.0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPlaying]);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 2 }}
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-white/50 hover:text-white hover:border-white/50 transition-all duration-500"
      aria-label="Toggle ambient sound"
    >
      {isPlaying ? (
        <Volume2 size={18} strokeWidth={1.5} />
      ) : (
        <VolumeX size={18} strokeWidth={1.5} />
      )}
    </motion.button>
  );
}

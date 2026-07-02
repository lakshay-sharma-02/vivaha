"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, wheelMultiplier: 1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

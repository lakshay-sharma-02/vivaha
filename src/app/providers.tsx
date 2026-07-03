"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { NotificationProvider } from "@/shared/providers/NotificationProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.05, wheelMultiplier: 1, smoothWheel: true }}>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </ReactLenis>
  );
}

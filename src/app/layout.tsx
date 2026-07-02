import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import { SmoothScrollProvider } from "@/shared/providers/smooth-scroll-provider";
import { AmbientBackground } from "@/shared/components/ambient-background";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative">
        <SmoothScrollProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Toaster />
            {/* AmbientBackground from previous version might conflict with webgl, we will comment it or remove if the new 3d background replaces it. Let's assume WorldManager is what they want instead. For now let's leave it or remove it. I'll remove AmbientBackground since it's an overlay and we are doing a 3D R3F setup. Let's keep the rest as is. Wait, the prompt says "build an ultra-premium, cinematic 3D homepage", usually meaning page.tsx will have the Canvas. */}
            {children}
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

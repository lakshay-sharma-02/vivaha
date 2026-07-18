import type { Metadata } from "next";
import { Yatra_One, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const yatra = Yatra_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vivah",
    default: "Vivah — Where Meaningful Journeys Begin",
  },
  description: "An exclusive matrimony platform where trust, authenticity, and meaningful introductions create lifelong relationships.",
};

import { Toaster } from "sonner";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${yatra.variable} ${cormorant.variable}`}>
      <body className="antialiased bg-background text-text-primary">
        <Providers>
          <Navbar />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#f7ecd3',
                border: '1px solid #d4af37',
                color: '#2a1408',
                fontFamily: '"Cormorant Garamond", serif',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}

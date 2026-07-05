import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vivah",
    default: "Vivah - Meaningful relationships begin here",
  },
  description: "A digital space where meaningful relationships begin through trust, thoughtful technology, and beautifully crafted experiences.",
};

import { Providers } from "./providers";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-background text-text-primary">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

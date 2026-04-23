import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Simulacrum",
    template: "%s | Simulacrum",
  },
  description: "A static Next.js experience inspired by the downloaded Simulacrum screens.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="light">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

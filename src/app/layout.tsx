import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: {
    default: "NEURO",
    template: "%s | NEURO",
  },
  description: "A static Next.js experience inspired by the downloaded NEURO screens.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="light">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bryan Fan — Supplementary Materials",
  description:
    "Research documents, projects, websites, and honors supplementing Bryan Fan's application.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}

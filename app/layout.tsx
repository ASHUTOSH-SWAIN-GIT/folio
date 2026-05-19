import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/Navbar";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lowkeydev.me"),
  title: {
    default: "Ashutosh Swain · LowKeyDev",
    template: "%s · LowKeyDev",
  },
  description:
    "Ashutosh Swain — software engineer building reliable backend, infra and systems software. Mostly Go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${mono.variable} antialiased min-h-screen max-w-2xl mx-auto px-6 sm:px-8`}
      >
        <Navbar />
        <main className="pb-24">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}

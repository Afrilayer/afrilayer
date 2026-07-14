import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Afrilayer — Africa's API Infrastructure Platform",
    template: "%s — Afrilayer",
  },
  description:
    "Discover, compare, and evaluate trusted African APIs for payments, mobile money, identity, KYC, SMS, airtime, telecom, government, and digital infrastructure. Every listing carries verification metadata.",
  keywords:
    "Africa, API, payments, mobile money, KYC, identity, banking, SMS, airtime, developers, infrastructure, verification, uptime, latency",
  authors: [{ name: "Afrilayer" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://afrilayer.com",
    title: "Afrilayer — Africa's API Infrastructure Platform",
    description:
      "The trusted infrastructure layer connecting developers to Africa's digital ecosystem. Every API listing includes verification dates, uptime, and confidence scores.",
    siteName: "Afrilayer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Afrilayer — Africa's API Infrastructure Platform",
    description:
      "Infrastructure intelligence for Africa's digital ecosystem. Verified APIs with operational transparency.",
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
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-text antialiased">
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
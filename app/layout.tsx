import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Afrilayer — Africa's API Infrastructure Platform",
    template: "%s — Afrilayer",
  },
  description:
    "Afrilayer checks which African payment, identity, SMS and banking APIs are actually still live — verified and re-checked, not just listed.",
  keywords:
    "Africa, API, payments, mobile money, KYC, identity, banking, SMS, airtime, developers, infrastructure, verification, uptime, latency",
  authors: [{ name: "Afrilayer" }],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://afrilayer.com",
    title: "Afrilayer — Build Fast with Vetted African APIs.",
    description:
      "The trusted infrastructure layer connecting developers to Africa's digital ecosystem. Every API listing includes verification dates, uptime, and confidence scores.",
    siteName: "Afrilayer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Afrilayer - Build Fast with Vetted African APIs.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Afrilayer — Build Fast with Vetted African APIs.",
    description:
      "Infrastructure intelligence for Africa's digital ecosystem. Verified APIs with operational transparency.",
    images: ["/og-image.png"],
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
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-bg text-text antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
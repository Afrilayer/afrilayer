import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Afrilayer — Africa’s API Discovery Platform',
    template: '%s — Afrilayer',
  },
  description:
    'Discover, compare, and evaluate African APIs for payments, telecom, identity, logistics, government services, and digital infrastructure.',
  keywords: 'Africa, API, payments, mobile money, KYC, identity, banking, SMS, airtime, developers, infrastructure',
  authors: [{ name: 'Afrilayer' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://afrilayer.com',
    title: 'Afrilayer — Africa’s API Discovery Platform',
    description:
      'The trusted infrastructure layer connecting developers to Africa’s digital ecosystem.',
    siteName: 'Afrilayer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afrilayer — Africa’s API Discovery Platform',
    description:
      'The trusted infrastructure layer connecting developers to Africa’s digital ecosystem.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

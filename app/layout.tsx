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
  title: 'Afrilayer — Discover the APIs Powering Africa',
  description:
    'Search, compare and explore APIs for payments, identity, logistics, banking, SMS, Mobile Money and more built for Africa.',
  keywords: 'Africa, API, payments, mobile money, KYC, identity, banking, SMS, airtime',
  authors: [{ name: 'Afrilayer' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Afrilayer — Discover the APIs Powering Africa',
    description:
      'The developer-first platform for discovering African APIs.',
    siteName: 'Afrilayer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Afrilayer — Discover the APIs Powering Africa',
    description:
      'The developer-first platform for discovering African APIs.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
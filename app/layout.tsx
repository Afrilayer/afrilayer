import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title:"Afrilayer — What's happening across Africa",
  description:"An interactive map of activity, events and developments across Africa."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
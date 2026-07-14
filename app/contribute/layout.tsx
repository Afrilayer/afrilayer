import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Help improve Afrilayer by contributing provider data, documentation, and more.",
};

export default function ContributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
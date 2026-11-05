import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Control de acceso",
  robots: { index: false, follow: false },
};

export default function ScannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}

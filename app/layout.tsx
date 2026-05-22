import type { Metadata } from "next";
import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
  display: "swap"
})


export const metadata: Metadata = {
  title: {
    template: "%s | Coptic Deacons School",
    default: "Coptic Deacons School | Management System"
  },
  description: "Management System for the Coptic Deacons School at St. Abader & St. Ereny Coptic Orthodox Church.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning={true} className="min-h-screen w-screen">{children}</body>
    </html>
  );
}

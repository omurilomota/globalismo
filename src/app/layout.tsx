import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Globalismo - Reflexões sobre a Globalização",
    template: "%s | Globalismo"
  },
  description: "Um espaço para reflexão sobre os impactos da globalização na economia, política, cultura e sociedade.",
  keywords: ["globalização", "economia", "política", "cultura", "sociedade", "mundo"],
  authors: [{ name: "Globalismo" }],
  openGraph: {
    title: "Globalismo - Reflexões sobre a Globalização",
    description: "Um espaço para reflexão sobre os impactos da globalização.",
    type: "website",
    locale: "pt_BR",
    siteName: "Globalismo"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

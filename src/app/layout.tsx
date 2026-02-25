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
  metadataBase: new URL('https://globalismo.com.br'),
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
    siteName: "Globalismo",
    url: "https://globalismo.com.br"
  },
  alternates: {
    canonical: "https://globalismo.com.br"
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 min-h-screen flex flex-col transition-colors`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

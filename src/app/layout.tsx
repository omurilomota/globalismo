import type { Metadata } from "next";
import { Playfair_Display, Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://globalismo.com.br'),
  title: {
    default: "🌐 Globalismo - Reflexões sobre a Globalização",
    template: "%s | 🌐 Globalismo"
  },
  description: "Um espaço para reflexão sobre os impactos da globalização na economia, política, cultura e sociedade.",
  keywords: ["globalização", "economia", "política", "cultura", "sociedade", "mundo"],
  authors: [{ name: "Globalismo" }],
  openGraph: {
    title: "🌐 Globalismo - Reflexões sobre a Globalização",
    description: "Um espaço para reflexão sobre os impactos da globalização.",
    type: "website",
    locale: "pt_BR",
    siteName: "🌐 Globalismo",
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
      <body className={`${playfair.variable} ${poppins.variable} ${inter.variable} antialiased bg-white dark:bg-slate-950 min-h-screen flex flex-col transition-colors`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

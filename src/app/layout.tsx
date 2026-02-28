/**
 * @fileoverview Layout raiz da aplicação Next.js (App Router).
 *
 * @module app/layout
 * @author Globalismo
 * @version 1.0.0
 */

import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebsiteSchema from "@/components/seo/WebsiteSchema";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://globalismo.com.br'),
  title: {
    default: "Globalismo - Reflexões sobre a Globalização",
    template: "%s | Globalismo"
  },
  description: "Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade. Análises fundamentadas em fontes acadêmicas e jornalísticas.",
  keywords: ["globalização", "economia", "política", "cultura", "sociedade", "mundo", "geopolítica", "ordem mundial"],
  authors: [{ name: "Globalismo" }],
  openGraph: {
    title: "Globalismo - Reflexões sobre a Globalização",
    description: "Um espaço para reflexão crítica sobre os impactos da globalização.",
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
      <head>
        <OrganizationSchema
          sameAs={[
            "https://x.com/omurilomota",
            "https://www.linkedin.com/in/murilo-henrique-622354358/",
            "https://github.com/omurilomota"
          ]}
        />
        <WebsiteSchema />
      </head>

      <body className={`${merriweather.variable} ${inter.variable} antialiased bg-white dark:bg-gray-900 min-h-screen flex flex-col transition-colors`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

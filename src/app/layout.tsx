import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import StructuredData, { generateOrganizationData, generateWebSiteData } from "@/components/seo/StructuredData";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
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
    default: "Globalismo - Reflexões sobre a Globalização",
    template: "%s | Globalismo"
  },
  description: "Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade. Análises fundamentadas em fontes acadêmicas e jornalísticas.",
  keywords: ["globalização", "economia", "política", "cultura", "sociedade", "mundo", "geopolítica", "ordem mundial"],
  authors: [{ name: "Globalismo" }],
  creator: "Globalismo",
  publisher: "Globalismo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Globalismo - Reflexões sobre a Globalização",
    description: "Um espaço para reflexão crítica sobre os impactos da globalização.",
    type: "website",
    locale: "pt_BR",
    siteName: "Globalismo",
    url: "https://globalismo.com.br",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Globalismo - Reflexões sobre a Globalização'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Globalismo - Reflexões sobre a Globalização',
    description: 'Um espaço para reflexão crítica sobre os impactos da globalização.',
    images: ['/og-image.png'],
    creator: '@globalismo'
  },
  alternates: {
    canonical: "https://globalismo.com.br"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Adicione suas chaves de verificação aqui quando disponíveis
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <StructuredData data={generateOrganizationData()} />
        <StructuredData data={generateWebSiteData()} />
      </head>
      <body className={`${merriweather.variable} ${inter.variable} antialiased bg-white dark:bg-gray-900 min-h-screen flex flex-col transition-colors`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-blue-900 text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-4 focus:ring-blue-900/50"
        >
          Pular para o conteúdo principal
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}

/**
 * @fileoverview Layout raiz da aplicação Next.js com i18n.
 *
 * @module app/[locale]/layout
 * @author Globalismo
 * @version 1.1.0
 */

import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import WebsiteSchema from "@/components/seo/WebsiteSchema";
import "../globals.css";

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

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL('https://globalismo.com.br'),
    title: {
      default: t('title'),
      template: t('template')
    },
    description: t('description'),
    keywords: t('keywords').split(', '),
    authors: [{ name: 'Globalismo' }],
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : locale,
      siteName: 'Globalismo',
      url: 'https://globalismo.com.br'
    },
    alternates: {
      canonical: 'https://globalismo.com.br'
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function RootLayout({
  children,
  params
}: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <OrganizationSchema
          sameAs={[
            "https://x.com/omurilomota",
            "https://www.linkedin.com/in/murilo-henrique-622354358/",
            "https://github.com/omurilomota"
          ]}
        />
        <WebsiteSchema />
        {/* Umami Analytics */}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            async
            defer
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://analytics.umami.is/script.js'}
          />
        )}
      </head>

      <body className={`${merriweather.variable} ${inter.variable} antialiased bg-white dark:bg-gray-900 min-h-screen flex flex-col transition-colors`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

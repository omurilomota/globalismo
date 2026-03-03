/**
 * @fileoverview Componente de seletor de idioma.
 *
 * Permite ao usuário ver o idioma atual e selecionar um novo.
 *
 * @module components/ui/LanguageSwitcher
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleLocaleChange = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(/^\/(pt|en|de|es)/, '') || '/';
    const newPath = pathWithoutLocale === '/' ? `/${newLocale}` : `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" suppressHydrationWarning>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{localeNames[locale as Locale]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="py-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                    locale === loc
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 cursor-default'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span>{localeNames[loc]}</span>
                  {locale === loc && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

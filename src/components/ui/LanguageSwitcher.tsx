/**
 * @fileoverview Componente de seletor de idioma.
 *
 * Permite ao usuário ver o idioma atual e selecionar um novo.
 * Nota: A troca de idioma ainda está em implementação.
 *
 * @module components/ui/LanguageSwitcher
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

import { useState } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale: Locale = 'pt';

  return (
    <div className="relative" suppressHydrationWarning>
      {/* Botão principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{localeNames[currentLocale]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop para fechar ao clicar fora */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="py-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  disabled={loc === currentLocale}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                    currentLocale === loc
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-300 cursor-default'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-not-allowed'
                  }`}
                  title={loc === currentLocale ? 'Idioma atual' : 'Em breve'}
                >
                  <span>{localeNames[loc]}</span>
                  {currentLocale === loc && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
            <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
              Mais idiomas em breve
            </div>
          </div>
        </>
      )}
    </div>
  );
}

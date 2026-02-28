/**
 * @fileoverview Configuração de internacionalização (i18n) do Globalismo.
 *
 * Define os locales suportados e o locale padrão.
 *
 * @module i18n/config
 * @author Globalismo
 * @version 1.0.0
 */

export const defaultLocale: Locale = 'pt';

export const locales = ['pt', 'en', 'de', 'es'] as const;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
};

export const localeDirections: Record<Locale, string> = {
  pt: 'ltr',
  en: 'ltr',
  de: 'ltr',
  es: 'ltr',
};

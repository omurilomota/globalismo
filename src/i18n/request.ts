/**
 * @fileoverview Request handler para i18n.
 *
 * Carrega os dicionários de tradução para cada locale.
 *
 * @module i18n/request
 * @author Globalismo
 * @version 1.0.0
 */

import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, type Locale } from './config';

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = (locale || defaultLocale) as Locale;
  
  return {
    locale: currentLocale,
    messages: (
      currentLocale === defaultLocale
        ? (await import('./dictionaries/pt.json')).default
        : (await import(`./dictionaries/${currentLocale}.json`)).default
    ) as Record<string, string>
  };
});

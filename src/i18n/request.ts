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
import { defaultLocale } from './config';

export default getRequestConfig(async ({ locale }) => ({
  messages: (
    locale === defaultLocale
      ? (await import('./dictionaries/pt.json')).default
      : (await import(`./dictionaries/${locale}.json`)).default
  ) as Record<string, string>
}));

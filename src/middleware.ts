/**
 * @fileoverview Middleware para internacionalização (i18n).
 *
 * Detecta o locale da URL e carrega as traduções apropriadas.
 *
 * @module middleware
 * @author Globalismo
 * @version 1.1.0
 */

import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: [
    '/',
    '/(pt|en|de|es)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/(artigos|artigos\\/:path*)',
    '/(sobre|sobre\\/:path*)',
    '/(contato|contato\\/:path*)'
  ]
};

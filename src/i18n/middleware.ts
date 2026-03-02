/**
 * @fileoverview Middleware para internacionalização (i18n).
 * 
 * Detecta o idioma do usuário a partir da URL ou header Accept-Language
 * e redireciona para a rota com o locale apropriado.
 * 
 * @module i18n/middleware
 * @author Globalismo
 * @version 1.0.0
 */

import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix, defaultLocale } from './config';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  localeDetection: true,
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};

/**
 * @fileoverview Middleware principal do Next.js.
 * 
 * Este middleware aplica:
 * - Internacionalização (i18n)
 * - Rate limiting para APIs
 * - Headers de segurança (CSP, HSTS, etc)
 * - Redirecionamentos forçados
 * 
 * @module middleware
 * @author Globalismo
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, localePrefix, defaultLocale } from './i18n/config';
import { rateLimitMiddleware } from './rateLimit';

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://globalismo.com.br',
  'https://www.globalismo.com.br',
];

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 
    'camera=(), ' +
    'microphone=(), ' +
    'geolocation=(), ' +
    'payment=(), ' +
    'usb=()',
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://giscus.app; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' blob: data: https://images.unsplash.com https://*.unsplash.com; " +
    "connect-src 'self' https://www.google-analytics.com; " +
    "frame-src https://giscus.app; " +
    "frame-ancestors 'none';",
};

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix,
  defaultLocale,
  localeDetection: true,
});

export default function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  const response = intlMiddleware(request);
  if (response) {
    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  if (pathname.startsWith('/api/')) {
    const rateLimitResponse = rateLimitMiddleware(request);
    if (rateLimitResponse) {
      Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
        rateLimitResponse.headers.set(key, value);
      });
      return rateLimitResponse;
    }
  }

  if (pathname.startsWith('/api/') && request.method === 'OPTIONS') {
    const origin = request.headers.get('origin');
    const isAllowed = origin && ALLOWED_ORIGINS.includes(origin);

    const apiResponse = new NextResponse(null, { status: 204 });

    if (isAllowed) {
      apiResponse.headers.set('Access-Control-Allow-Origin', origin);
      apiResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      apiResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      apiResponse.headers.set('Access-Control-Max-Age', '86400');
    }

    Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
      apiResponse.headers.set(key, value);
    });

    return apiResponse;
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};

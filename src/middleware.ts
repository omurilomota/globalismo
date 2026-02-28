/**
 * @fileoverview Middleware principal do Next.js para segurança.
 * 
 * Este middleware aplica:
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
import { rateLimitMiddleware } from './rateLimit';

/**
 * Lista de.domínios permitidos para CORS.
 * Em produção, configurar com o domínio real.
 */
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://globalismo.com.br',
  'https://www.globalismo.com.br',
];

/**
 * Headers de segurança aplicados a todas as respostas.
 */
const SECURITY_HEADERS = {
  // Previne ataques de clickjacking
  'X-Frame-Options': 'DENY',
  // Protege contra XSS
  'X-XSS-Protection': '1; mode=block',
  // Previne MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  // Configura Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Permissões do navegador ( Permissions Policy)
  'Permissions-Policy': 
    'camera=(), ' +
    'microphone=(), ' +
    'geolocation=(), ' +
    'payment=(), ' +
    'usb=()',
  // Content Security Policy (CSP)
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' blob: data: https://images.unsplash.com https://*.unsplash.com; " +
    "connect-src 'self' https://www.google-analytics.com; " +
    "frame-ancestors 'none';",
  // Strict Transport Security (HSTS) - apenas em produção
  // 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
};

/**
 * Middleware principal do Next.js.
 * Executa em cada requisição.
 *
 * @function middleware
 * @param {NextRequest} request - Objeto de requisição do Next.js
 * @returns {NextResponse} Resposta com headers de segurança ou erro de rate limit
 */
export function middleware(request: NextRequest): NextResponse | undefined {
  const { pathname } = request.nextUrl;

  // 1. Aplica rate limiting para APIs
  if (pathname.startsWith('/api/')) {
    const rateLimitResponse = rateLimitMiddleware(request);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
  }

  // 2. Redirecionamentos forçados (HTTP -> HTTPS em produção)
  // Comentar em desenvolvimento
  // if (process.env.NODE_ENV === 'production' && request.headers.get('x-forwarded-proto') !== 'https') {
  //   const url = request.nextUrl.clone();
  //   url.protocol = 'https:';
  //   return NextResponse.redirect(url);
  // }

  // 3. CORS preflight para APIs
  if (pathname.startsWith('/api/') && request.method === 'OPTIONS') {
    const origin = request.headers.get('origin');
    const isAllowed = origin && ALLOWED_ORIGINS.includes(origin);

    const response = new NextResponse(null, { status: 204 });

    if (isAllowed) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.headers.set('Access-Control-Max-Age', '86400');
    }

    return response;
  }

  // 4. Aplica headers de segurança em todas as respostas
  const response = NextResponse.next();
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

/**
 * Configuração de paths que o middleware deve interceptar.
 * Inclui todas as APIs e rotas estáticas.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};

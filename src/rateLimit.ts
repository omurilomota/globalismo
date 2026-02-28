/**
 * @fileoverview Middleware de rate limiting para proteção de APIs.
 * 
 * Este middleware implementa rate limiting para evitar ataques
 * de força bruta e abuso de APIs.
 * 
 * Usa um mapa em memória para controle de requisições.
 * Em produção, considere usar Redis ou similar.
 * 
 * @module middleware/rateLimit
 * @author Globalismo
 * @version 1.0.0
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Configurações de rate limiting por rota.
 * Define o número máximo de requisições por período de tempo.
 */
interface RateLimitConfig {
  limite: number;
  janelaMs: number;
}

/**
 * Mapa de configurações de rate limiting por endpoint.
 */
const rateLimitConfigs: Record<string, RateLimitConfig> = {
  '/api/artigos': { limite: 100, janelaMs: 60 * 1000 }, // 100 req/min
  '/api/contato': { limite: 5, janelaMs: 60 * 1000 }, // 5 req/min
  '/api/newsletter': { limite: 3, janelaMs: 60 * 1000 }, // 3 req/min
  '/api/': { limite: 50, janelaMs: 60 * 1000 }, // Default: 50 req/min
};

/**
 * Mapa em memória para armazenar contadores de requisições.
 * Em produção, usar Redis ou similar.
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * Limpa entradas expiradas do mapa de rate limiting.
 * Executa a cada 5 minutos.
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requestCounts.entries()) {
    if (value.resetTime < now) {
      requestCounts.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Gera uma chave única para identificar o cliente.
 * Combina IP do cliente com o endpoint acessado.
 * 
 * @function getRateLimitKey
 * @param {string} ip - Endereço IP do cliente
 * @param {string} endpoint - Endpoint da API
 * @returns {string} Chave única para rate limiting
 */
function getRateLimitKey(ip: string, endpoint: string): string {
  return `${ip}:${endpoint}`;
}

/**
 * Obtém a configuração de rate limit para um endpoint específico.
 * 
 * @function getConfigForEndpoint
 * @param {string} path - Caminho da requisição
 * @returns {RateLimitConfig} Configuração de rate limiting
 */
function getConfigForEndpoint(path: string): RateLimitConfig {
  for (const [pattern, config] of Object.entries(rateLimitConfigs)) {
    if (path.startsWith(pattern)) {
      return config;
    }
  }
  return rateLimitConfigs['/api/'];
}

/**
 * Middleware de rate limiting.
 * Verifica se o cliente excedeu o limite de requisições.
 * 
 * @function rateLimitMiddleware
 * @param {NextRequest} request - Objeto de requisição do Next.js
 * @returns {NextResponse | undefined} Resposta de erro se excedido, ou undefined para continuar
 */
export function rateLimitMiddleware(request: NextRequest): NextResponse | undefined {
  // Obtém o IP do cliente (suporta proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  
  // Obtém o caminho da API
  const path = request.nextUrl.pathname;
  
  // Ignora requisições que não são APIs
  if (!path.startsWith('/api/')) {
    return undefined;
  }
  
  // Obtém configuração de rate limit para este endpoint
  const config = getConfigForEndpoint(path);
  const key = getRateLimitKey(ip, path);
  const now = Date.now();
  
  // Verifica se existe registro anterior
  const record = requestCounts.get(key);
  
  if (!record || record.resetTime < now) {
    // Novo período de rate limiting
    requestCounts.set(key, {
      count: 1,
      resetTime: now + config.janelaMs,
    });
    return undefined;
  }
  
  // Incrementa contador
  record.count++;
  
  // Verifica se excedeu o limite
  if (record.count > config.limite) {
    // Calcula tempo restante até reset
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    
    return NextResponse.json(
      {
        error: 'Too many requests',
        message: `Limite de requisições excedido. Tente novamente em ${retryAfter} segundos.`,
        retryAfter,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(config.limite),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(record.resetTime),
        },
      }
    );
  }
  
  // Adiciona headers de rate limit à resposta
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', String(config.limite));
  response.headers.set('X-RateLimit-Remaining', String(config.limite - record.count));
  response.headers.set('X-RateLimit-Reset', String(record.resetTime));
  
  return undefined;
}

export default rateLimitMiddleware;

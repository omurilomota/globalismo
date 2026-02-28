/**
 * @fileoverview Configurações do Next.js para otimização de performance.
 * 
 * Este arquivo define configurações para:
 * - Análise de bundle (bundle analyzer)
 * - Otimização de imagens
 * - Compressão e caching
 * - Header de security e performance
 * 
 * @module next.config
 * @author Globalismo
 * @version 1.0.0
 */

import type { NextConfig } from "next";

/**
 * Configuração principal do Next.js.
 * 
 * @constant {NextConfig} nextConfig
 */
const nextConfig: NextConfig = {
  // Otimização de imagens
  images: {
    // Patterns para允许 remote images do Unsplash
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Formats de imagem prioritários (WebP e AVIF)
    formats: ['image/avif', 'image/webp'],
    // Tamanho mínimo para device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Tamanhos de imagem para diferentes breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compressão de resposta
  compress: true,

  // Otimização de produção
  poweredByHeader: false,

  // Headers de segurança e performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Configurações experimentais de performance
  experimental: {
    // Otimização de package.json
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;

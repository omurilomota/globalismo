/**
 * @fileoverview Configuração do arquivo robots.txt do site Globalismo.
 * 
 * Este arquivo é responsável por:
 * - Definir regras de acesso para crawlers eIndex bots
 * - Permitir acesso às páginas públicas do site
 * - Bloquear acesso a rotas de API e página de contato
 * - Especificar a localização do sitemap
 * 
 * O Next.js automaticamente chama esta função para gerar /robots.txt
 * em runtime. Este arquivo é essencial para SEO e controle de crawling.
 * 
 * @module app/robots
 * @author Globalismo
 * @version 1.0.0
 */

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: 'https://globalismo.vercel.app/sitemap.xml',
    host: 'https://globalismo.vercel.app'
  };
}

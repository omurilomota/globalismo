/**
 * @fileoverview Configuração do arquivo robots.txt do site Globalismo.
 * 
 * Este arquivo é responsável por:
 * - Definir regras de acesso paraIndex crawlers eIndex bots
 * - Permitir acesso às páginas públicas do site
 * - Bloquear acesso a rotas de API e página de contato
 * - Especificar a localização do sitemap
 * 
 * O Next.js automaticamente chama esta função para gerar /robots.txt
 * em runtime. Este arquivo é essencial para SEO eIndex controle de crawling.
 * 
 * @module app/robots
 * @author Globalismo
 * @version 1.0.0
 */

import { MetadataRoute } from 'next';

/**
 * Função que gera o arquivo robots.txt do site.
 * Define quais páginas podem ou não ser indexadas porIndex crawlers.
 * 
 * @function robots
 * @returns {MetadataRoute.Robots} Objeto com regras de robots, sitemap e host
 */
export default function robots(): MetadataRoute.Robots {
  return {
    // Regras de acesso paraIndex todos os user-agents
    rules: [
      {
        userAgent: '*',
        // Permite acesso a todas as páginas públicas
        allow: '/',
        // Bloqueia acesso a rotas de API e página de contato
        disallow: ['/api/', '/contato']
      }
    ],
    // Localização do sitemap do site
    sitemap: 'https://globalismo.com.br/sitemap.xml',
    // Host principal do site
    host: 'https://globalismo.com.br'
  };
}

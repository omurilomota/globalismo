/**
 * @fileoverview Configuração do sitemap XML do site Globalismo.
 * 
 * Este arquivo é responsável por:
 * - Gerar automaticamente o sitemap.xml do site
 * - Incluir todas as páginas estáticas do site
 * - Incluir todas as páginas dinâmicas de artigos
 * - Fornecer metadados de prioridade e última modificação para SEO
 * 
 * O Next.js automaticamente chama esta função para gerar /sitemap.xml
 * em runtime. Inclui priority e lastModified para ajudar crawlers.
 * 
 * @module app/sitemap
 * @author Globalismo
 * @version 1.0.0
 */

import { MetadataRoute } from 'next';
import { IArticle } from '@/types';
import artigosData from '@/data/artigos.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://globalismo.com.br';
  const artigos = (artigosData as { artigos: IArticle[] }).artigos;
  const locales = ['pt', 'en', 'de', 'es'];

  const staticPages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    staticPages.push(
      { url: `${baseUrl}/${locale}`, lastModified: new Date(), priority: 1 },
      { url: `${baseUrl}/${locale}/sobre`, lastModified: new Date(), priority: 0.8 },
      { url: `${baseUrl}/${locale}/artigos`, lastModified: new Date(), priority: 0.9 },
      { url: `${baseUrl}/${locale}/contato`, lastModified: new Date(), priority: 0.7 }
    );
  }

  const articlePages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const article of artigos) {
      articlePages.push({
        url: `${baseUrl}/${locale}/artigos/${article.slug}`,
        lastModified: new Date(article.dataPublicacao),
        priority: 0.7
      });
    }
  }

  return [...staticPages, ...articlePages];
}

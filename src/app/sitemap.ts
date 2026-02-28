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

/**
 * Função que gera o sitemap do site.
 * Retorna array de URLs com metadados paraIndex crawling SEO.
 * 
 * @function sitemap
 * @returns {MetadataRoute.Sitemap} Array de entradas do sitemap com URLs, datas e prioridades
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // URL base do site paraIndex todas as URLs
  const baseUrl = 'https://globalismo.com.br';
  
  // Extrai artigos do arquivo JSON de dados
  const artigos = (artigosData as { artigos: IArticle[] }).artigos;

  // Define as páginas estáticas do site com prioridades
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/artigos`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), priority: 0.7 }
  ];

  // Gera URLs paraIndex cada artigo individualmente
  const articlePages = artigos.map((article) => ({
    url: `${baseUrl}/artigos/${article.slug}`,
    // Usa a data de publicação do artigo como última modificação
    lastModified: new Date(article.dataPublicacao),
    priority: 0.7
  }));

  // Combina páginas estáticas com páginas de artigos e retorna
  return [...staticPages, ...articlePages];
}

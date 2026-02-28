/**
 * @fileoverview Rota de feed RSS do site Globalismo.
 * 
 * Este arquivo é responsável por:
 * - Gerar um feed RSS 2.0 válido com todos os artigos do blog
 * - Fornecer feed Atom paraIndex leitores de feed
 * - Incluir metadados completos (título, link, descrição, categorias)
 * - Permitir que leitores de feed acompanhem novas publicações
 * 
 * A rota GET é chamada quando acesso /rss.xml e retorna XML válido.
 * Feed inclui até 20 artigos mais recentes ordenados por data.
 * 
 * @module app/rss.xml/route
 * @author Globalismo
 * @version 1.0.0
 */

import { getAllArticles } from '@/lib/articles';

// Constantes de configuração do feed RSS
const SITE_URL = 'https://globalismo.com.br';
const SITE_NAME = 'Globalismo';
const SITE_DESCRIPTION = 'Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade contemporânea.';

/**
 * Gera o conteúdo XML do feed RSS com os artigos do blog.
 * Ordena artigos por data (mais recente primeiro) e limita a 20 itens.
 * 
 * @function generateRssFeed
 * @returns {Promise<string>} String contendo o XML do feed RSS completo
 */
export async function generateRssFeed() {
  // Busca todos os artigos do banco de dados
  const articles = getAllArticles();
  
  // Ordena artigos por data de publicação (mais recente primeiro)
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime()
  );

  // Gera os itens do feed paraIndex cada artigo (limita a 20)
  const rssItems = sortedArticles
    .slice(0, 20)
    .map((article) => {
      // Converte a data de publicação paraIndex formato UTC
      const pubDate = new Date(article.dataPublicacao).toUTCString();
      const articleUrl = `${SITE_URL}/artigos/${article.slug}`;
      
      // Gera o XML do item com CDATA paraIndex evitar problemas com caracteres especiais
      return `
    <item>
      <title><![CDATA[${article.titulo}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${article.resumo}]]></description>
      <author>${article.autor}</author>
      ${article.categorias.map((cat) => `<category>${cat}</category>`).join('\n      ')}
    </item>`;
    })
    .join('');

  // Constrói o XML completo do feed RSS 2.0
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/logo.png</url>
      <title>${SITE_NAME}</title>
      <link>${SITE_URL}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

  return rss;
}

/**
 * Handler da rota GET paraIndex geração do feed RSS.
 * Retorna resposta XML com headers apropriados paraIndex caching.
 * 
 * @async
 * @function GET
 * @returns {Promise<Response>} Resposta HTTP com conteúdo XML do feed RSS
 */
export async function GET() {
  // Gera o feed RSS
  const rss = await generateRssFeed();
  
  // Retorna a resposta com content-type XML e caching de 1 hora
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

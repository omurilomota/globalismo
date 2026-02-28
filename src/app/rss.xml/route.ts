import { getAllArticles } from '@/lib/articles';

const SITE_URL = 'https://globalismo.com.br';
const SITE_NAME = 'Globalismo';
const SITE_DESCRIPTION = 'Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade contemporânea.';

export async function generateRssFeed() {
  const articles = getAllArticles();
  
  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime()
  );

  const rssItems = sortedArticles
    .slice(0, 20)
    .map((article) => {
      const pubDate = new Date(article.dataPublicacao).toUTCString();
      const articleUrl = `${SITE_URL}/artigos/${article.slug}`;
      
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

export async function GET() {
  const rss = await generateRssFeed();
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}

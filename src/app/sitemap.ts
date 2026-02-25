import { MetadataRoute } from 'next';
import { IArticle } from '@/types';
import artigosData from '@/data/artigos.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://globalismo.com.br';
  const artigos = (artigosData as { artigos: IArticle[] }).artigos;

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/artigos`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), priority: 0.7 }
  ];

  const articlePages = artigos.map((article) => ({
    url: `${baseUrl}/artigos/${article.slug}`,
    lastModified: new Date(article.dataPublicacao),
    priority: 0.7
  }));

  return [...staticPages, ...articlePages];
}

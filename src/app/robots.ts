import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/contato']
      }
    ],
    sitemap: 'https://globalismo.com.br/sitemap.xml',
    host: 'https://globalismo.com.br'
  };
}

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateOrganizationData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://globalismo.com.br';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Globalismo';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade.',
    sameAs: [
      'https://github.com/omurilomota'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contato@globalismo.com.br',
      contactType: 'customer service',
      availableLanguage: 'Portuguese'
    }
  };
}

export function generateWebSiteData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://globalismo.com.br';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Globalismo';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: 'Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/artigos?busca={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

export function generateArticleData(article: {
  titulo: string;
  slug: string;
  resumo: string;
  autor: string;
  dataPublicacao: string;
  imagemCapa?: string;
  categorias: string[];
  tags: string[];
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://globalismo.com.br';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Globalismo';

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.titulo,
    description: article.resumo,
    image: article.imagemCapa || `${siteUrl}/og-image.png`,
    author: {
      '@type': 'Person',
      name: article.autor
    },
    datePublished: article.dataPublicacao,
    dateModified: article.dataPublicacao,
    url: `${siteUrl}/artigos/${article.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/artigos/${article.slug}`
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`
      }
    },
    keywords: article.tags.join(', '),
    articleSection: article.categorias.join(', '),
    inLanguage: 'pt-BR'
  };
}

export function generateBreadcrumbData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

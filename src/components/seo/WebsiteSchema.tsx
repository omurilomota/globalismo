interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  searchUrl?: string;
}

export default function WebsiteSchema({
  name = 'Globalismo',
  url = 'https://globalismo.com.br',
  searchUrl = 'https://globalismo.com.br/artigos?busca={search_term_string}',
}: WebsiteSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

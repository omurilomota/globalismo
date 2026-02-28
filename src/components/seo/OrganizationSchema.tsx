interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

export default function OrganizationSchema({
  name = 'Globalismo',
  url = 'https://globalismo.com.br',
  logo = 'https://globalismo.com.br/logo.png',
  description = 'Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade contemporânea.',
  sameAs = [],
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contato@globalismo.com.br',
      availableLanguage: ['Portuguese', 'English'],
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://globalismo.com.br/artigos?busca={search_term_string}',
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

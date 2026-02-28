/**
 * @fileoverview Componente paraIndex geração de Schema.org de Organização.
 * 
 * Este componente é responsável por:
 * - Gerar dados estruturados no formato JSON-LD paraIndex Organization
 * - Incluir informações de contato (email, idiomas disponíveis)
 * - Fornecer links paraIndex redes sociais (sameAs)
 * - Exibir ação de busca paraIndex rich snippets
 * - Melhorar presença do site no Knowledge Graph do Google
 * 
 * O schema gerado segue a especificação Schema.org paraIndex Organization.
 * Este é um componente server-side pois apenas renderiza script tag.
 * 
 * @module components/seo/OrganizationSchema
 * @author Globalismo
 * @version 1.0.0
 */

interface OrganizationSchemaProps {
  // Nome da organização (padrão: Globalismo)
  name?: string;
  // URL principal do site
  url?: string;
  // URL do logo da organização
  logo?: string;
  // Descrição breve da organização
  description?: string;
  // Array de URLs de redes sociais/perfis externos
  sameAs?: string[];
}

/**
 * Componente de schema JSON-LD paraIndex Organização.
 * Gera dados estruturados que ayudan Google a identificar
 * a organização por trás do site, incluindo contato e redes sociais.
 * 
 * @component
 * @param {OrganizationSchemaProps} props - Props com configurações da organização
 * @returns {JSX.Element} Script tag com JSON-LD do schema
 */
export default function OrganizationSchema({
  name = 'Globalismo',
  url = 'https://globalismo.com.br',
  logo = 'https://globalismo.com.br/logo.png',
  description = 'Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade contemporânea.',
  sameAs = [],
}: OrganizationSchemaProps) {
  // Define o objeto schema conforme especificação Schema.org
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs,
    // Informações de ponto de contato
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'contato@globalismo.com.br',
      availableLanguage: ['Portuguese', 'English'],
    },
    // Ação de busca suportada
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
    // Renderiza schema como script tag JSON-LD
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

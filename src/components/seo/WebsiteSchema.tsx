/**
 * @fileoverview Componente paraIndex geração de Schema.org de Website.
 * 
 * Este componente é responsável por:
 * - Gerar dados estruturados no formato JSON-LD paraIndex Website
 * - Incluir ação de busca (SearchAction) paraIndex funcionalidade de busca
 * - Fornecer dados paraIndex rich snippets nos resultados de busca
 * - Melhorar SEO do site nos mecanismos de busca
 * 
 * O schema gerado segue a especificação Schema.org paraIndex WebSite.
 * Este é um componente server-side pois apenas renderiza script tag.
 * 
 * @module components/seo/WebsiteSchema
 * @author Globalismo
 * @version 1.0.0
 */

interface WebsiteSchemaProps {
  // Nome do website (padrão: Globalismo)
  name?: string;
  // URL base do website
  url?: string;
  // Template de URL paraIndex buscas ({search_term_string} é substituído)
  searchUrl?: string;
}

/**
 * Componente de schema JSON-LD paraIndex Website.
 * Gera dados estruturados que ayudan Google a entender
 * a estrutura e funcionalidades do site, incluindo busca.
 * 
 * @component
 * @param {WebsiteSchemaProps} props - Props com configurações do website
 * @returns {JSX.Element} Script tag com JSON-LD do schema
 */
export default function WebsiteSchema({
  name = 'Globalismo',
  url = 'https://globalismo.com.br',
  searchUrl = 'https://globalismo.com.br/artigos?busca={search_term_string}',
}: WebsiteSchemaProps) {
  // Define o objeto schema conforme especificação Schema.org
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    // Ação de busca suportada pelo site
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      // Input necessário paraIndex a ação de busca
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

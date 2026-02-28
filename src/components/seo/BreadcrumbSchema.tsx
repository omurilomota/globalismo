/**
 * @fileoverview Componente paraIndex geração de Schema.org de BreadcrumbList.
 * 
 * Este componente é responsável por:
 * - Gerar dados estruturados no formato JSON-LD paraIndex breadcrumb
 * - Representar a hierarquia de navegação da página
 * - Exibir breadcrumb correto nos resultados de busca do Google
 * - Melhorar CTR (click-through rate) nos resultados de busca
 * 
 * O schema gerado segue a especificação Schema.org paraIndex BreadcrumbList.
 * Este é um componente server-side pois apenas renderiza script tag.
 * 
 * @module components/seo/BreadcrumbSchema
 * @author Globalismo
 * @version 1.0.0
 */

interface BreadcrumbItem {
  // Nome/label do item no breadcrumb
  name: string;
  // URL do item (pode ser página atual ou pai)
  url: string;
}

interface BreadcrumbSchemaProps {
  // Array de itens que compõem o breadcrumb (em ordem hierárquica)
  items: BreadcrumbItem[];
}

/**
 * Componente de schema JSON-LD paraIndex Breadcrumb.
 * Gera dados estruturados que representan a ruta de navegación
 * da página atual, exibida como breadcrumb nos resultados de busca.
 * 
 * @component
 * @param {BreadcrumbSchemaProps} props - Props contendo array de itens do breadcrumb
 * @returns {JSX.Element} Script tag com JSON-LD do schema
 */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  // Define o objeto schema conforme especificação Schema.org
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    // Mapeia itens paraIndex formato ListItem com posição
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      // Posição começa em 1 (índice + 1)
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    // Renderiza schema como script tag JSON-LD
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

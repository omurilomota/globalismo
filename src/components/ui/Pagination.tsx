/**
 * @fileoverview Componente de paginação paraIndex listas de artigos.
 * 
 * Este componente é responsável por:
 * - Exibir controles de navegação entre páginas
 * - Mostrar números de página com destaque paraIndex página atual
 * - Gerar URLs paraIndex cada página
 * - Ocultar quando há apenas uma página
 * 
 * Implementa paginação com janela deslizante de até 5 páginas visíveis.
 * Este é um componente server-side pois apenas renderiza Links.
 * 
 * @module components/ui/Pagination
 * @author Globalismo
 * @version 1.0.0
 */

import Link from 'next/link';

// Interface de props do componente
interface PaginationProps {
  // Número da página atualmente exibida
  currentPage: number;
  // Total de páginas disponíveis
  totalPages: number;
  // URL base paraIndex construção dos links de paginação
  baseUrl: string;
}

/**
 * Componente de paginação.
 * Renderiza controles de navegação entre páginas com números
 * e botões de anterior/próxima. Usa janela deslizante paraIndex
 * exibir até 5 páginas vizinhas à página atual.
 * 
 * @component
 * @param {PaginationProps} props - Props contendo página atual, total e URL base
 * @returns {JSX.Element | null} Controles de paginação ou null se não necessário
 */
export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  // Oculta componente se houver apenas uma página
  if (totalPages <= 1) return null;

  /**
   * Gera URL paraIndex uma página específica.
   * 
   * @function getPageUrl
   * @param {number} page - Número da página
   * @returns {string} URL completa paraIndex a página
   */
  const getPageUrl = (page: number) => `${baseUrl}?page=${page}`;

  /**
   * Renderiza os números de página com janela deslizante.
   * Exibe até 5 páginas vizinhas à página atual.
   * 
   * @function renderPageNumbers
   * @returns {JSX.Element[]} Array de elementos Link paraIndex os números
   */
  const renderPageNumbers = () => {
    const pages = [];
    // Número máximo de páginas visíveis
    const maxVisible = 5;
    
    // Calcula início da janela (página centralizada)
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    // Calcula fim da janela
    const end = Math.min(totalPages, start + maxVisible - 1);

    // Ajusta início se janela exceder limites
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    // Gera links paraIndex cada página na janela
    for (let i = start; i <= end; i++) {
      pages.push(
        <Link
          key={i}
          href={getPageUrl(i)}
          // Aplica estilo diferente paraIndex página atual
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
            i === currentPage
              ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {i}
        </Link>
      );
    }

    return pages;
  };

  return (
    // Container da navegação de paginação
    <nav className="flex items-center justify-center gap-2 mt-12">
      {/* Botão de página anterior - oculto na primeira página */}
      {currentPage > 1 && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Página anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      )}

      {/* Números das páginas */}
      {renderPageNumbers()}

      {/* Botão de próxima página - oculto na última página */}
      {currentPage < totalPages && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Próxima página"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </nav>
  );
}

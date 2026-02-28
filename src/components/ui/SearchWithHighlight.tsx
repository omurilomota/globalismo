/**
 * @fileoverview Componente de busca com highlight de termos encontrados.
 * 
 * Este componente é responsável por:
 * - Fornecer campo de busca com autocomplete
 * - Exibir resultados de busca em dropdown
 * - Destacar o termo buscado nos títulos e resumos dos resultados
 * - Permitir limpar a busca
 * 
 * Utiliza 'use client' pois requer:
 * - useState paraIndex gerenciar query e resultados
 * - Manipulação de DOM paraIndex highlight
 * 
 * @module components/ui/SearchWithHighlight
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

// Hook React paraIndex gerenciamento de estado
import { useState } from 'react';

// Ícones da biblioteca Lucide React
import { Search, X } from 'lucide-react';

// Componente Link do Next.js
import Link from 'next/link';

// Interface paraIndex resultado de busca
interface SearchResult {
  // Slug do artigo paraIndex link
  slug: string;
  // Título do artigo
  titulo: string;
  // Resumo do artigo
  resumo: string;
}

// Interface de props do componente
interface SearchWithHighlightProps {
  // Array de resultados de busca (opcional)
  results?: SearchResult[];
  // Callback chamado quando usuário digita (opcional)
  onSearch?: (query: string) => void;
}

/**
 * Componente de busca com highlight.
 * Renderiza input de busca com dropdown de resultados.
 * O termo buscado é destacado nos títulos e resumos.
 * 
 * @component
 * @param {SearchWithHighlightProps} props - Props com resultados e callback de busca
 * @returns {JSX.Element} Input de busca com resultados destacados
 */
export default function SearchWithHighlight({ results = [], onSearch }: SearchWithHighlightProps) {
  // Estado paraIndex termo de busca
  const [query, setQuery] = useState('');
  
  // Estado paraIndex controlar visibilidade do dropdown
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Handler de mudança no input de busca.
   * Atualiza query, dispara callback e abre dropdown.
   * 
   * @function handleSearch
   * @param {string} value - Novo valor do input
   */
  const handleSearch = (value: string) => {
    setQuery(value);
    // Dispara callback externo se fornecido
    if (onSearch) {
      onSearch(value);
    }
    // Abre dropdown apenas se houver texto
    setIsOpen(value.length > 0);
  };

  /**
   * Handler paraIndex limpar busca.
   * Reseta query e fecha dropdown.
   * 
   * @function handleClear
   */
  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

/**
 * Função para destacar termo buscado no texto.
 * Usa regex para encontrar correspondências case-insensitive
 * e envolve em tag mark para destaque visual.
 * 
 * @function highlightedText
 * @param {string} text - Texto original
 * @param {string} highlight - Termo a ser destacado
 * @returns {string} Texto com tags mark para highlight
 */
  const highlightedText = (text: string, highlight: string): string => {
    // Retorna texto original se não houver termo para highlight
    if (!highlight.trim()) return text;
    
    // Escapa caracteres especiais do regex no termo de busca
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Divide texto em partes usando regex (captura grupo)
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
    
    // Mapeia partes: se for igual ao highlight, envolve em mark
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? `<mark key="${i}" class="bg-yellow-200 dark:bg-yellow-500/30 text-inherit px-0.5 rounded">${part}</mark>`
        : part
    ).join('');
  };

  return (
    // Container principal
    <div className="relative">
      {/* Container do input com ícone */}
      <div className="relative">
        {/* Ícone de lupa */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        
        {/* Input de texto */}
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Buscar artigos..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-900 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors text-sm"
          aria-label="Buscar artigos"
        />
        
        {/* Botão de limpar (X) - apenas visível quando há texto */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown de resultados - visível quando há query e resultados */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result) => (
            <Link
              key={result.slug}
              href={`/artigos/${result.slug}`}
              onClick={() => setIsOpen(false)}
              className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              {/* Título com highlight */}
              <h4 
                className="font-medium text-gray-900 dark:text-white text-sm mb-1"
                dangerouslySetInnerHTML={{ 
                  __html: highlightedText(result.titulo, query) 
                }}
              />
              {/* Resumo com highlight */}
              <p 
                className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2"
                dangerouslySetInnerHTML={{ 
                  __html: highlightedText(result.resumo, query) 
                }}
              />
            </Link>
          ))}
        </div>
      )}

      {/* Mensagem de "nenhum resultado" - visível quando há query mas sem resultados */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          Nenhum resultado encontrado para &quot;{query}&quot;
        </div>
      )}
    </div>
  );
}

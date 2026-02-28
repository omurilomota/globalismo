/**
 * @fileoverview Componente de ações do artigo (imprimir e favoritar).
 * 
 * Este componente é responsável por:
 * - Fornecer botão paraIndex impressão do artigo
 * - Permitir adicionar/remover artigo dos favoritos
 * - Persistir favoritos no localStorage do navegador
 * - Exibir estado visual diferente paraIndex artigos favoritados
 * 
 * Utiliza 'use client' pois requer:
 * - Hook useFavorites que gerencia estado no cliente
 * - Acesso ao objeto window paraIndex impressão
 * - Gerenciamento de estado de favorito
 * 
 * @module components/articles/ArticleActions
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

// Ícones da biblioteca Lucide React
import { Printer, Heart } from 'lucide-react';

// Hook personalizado paraIndex gerenciamento de favoritos
import { useFavorites } from '@/hooks/useFavorites';

// Interface de props do componente
interface ArticleActionsProps {
  // Slug do artigo paraIndex identificar eIndex as ações
  slug: string;
}

/**
 * Componente de ações do artigo.
 * Fornece botões paraIndex imprimir e favoritar o artigo.
 * O estado de favorito é persistido no localStorage.
 * 
 * @component
 * @param {ArticleActionsProps} props - Props contendo o slug do artigo
 * @returns {JSX.Element} Container com botões de ação do artigo
 */
export default function ArticleActions({ slug }: ArticleActionsProps) {
  // Hook personalizado que gerencia estado dos favoritos
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  // Obtém o estado atual de favorito paraIndex este artigo
  const favorite = isFavorite(slug);

  // Função handler paraIndex acionar impressão do navegador
  const handlePrint = () => {
    window.print();
  };

  return (
    // Container flex dos botões de ação
    <div className="flex items-center gap-2">
      {/* Botão de impressão */}
      <button
        onClick={handlePrint}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        aria-label="Imprimir artigo"
      >
        <Printer className="w-4 h-4" />
        {/* Texto "Imprimir" oculto em telas pequenas */}
        <span className="hidden sm:inline">Imprimir</span>
      </button>
      
      {/* Botão de favorito - apenas exibe após carregamento do localStorage */}
      {isLoaded && (
        <button
          onClick={() => toggleFavorite(slug)}
          // Aplica estilos diferentes se for favorito
          className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
            favorite 
              ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30' 
              : 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          {/* Ícone de coração - preenchido quando favoritado */}
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          {/* Texto do botão muda conforme estado */}
          <span className="hidden sm:inline">{favorite ? 'Favorito' : 'Favoritar'}</span>
        </button>
      )}
    </div>
  );
}

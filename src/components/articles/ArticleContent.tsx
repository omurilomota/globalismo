/**
 * @fileoverview Componente para renderização do conteúdo do artigo.
 * 
 * Este componente é responsável por:
 * - Renderizar o conteúdo HTML do artigo com IDs para links internos
 * - Exibir tabela de conteúdos automática
 * - Fornecer ações do artigo (compartilhar, favoritar)
 * 
 * Utiliza 'use client' pois requer:
 * - useState para gerenciar estado de favorito
 * 
 * Nota: A sanitização e geração de IDs é feita no servidor (SSR).
 * 
 * @module components/articles/ArticleContent
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

// Hooks React para gerenciamento de estado
import { useState } from 'react';

// Componentes filhos
import ArticleActions from '@/components/articles/ArticleActions';
import TableOfContents from '@/components/ui/TableOfContents';

// Interface de props do componente
interface ArticleContentProps {
  slug: string;
  content: string;
}

/**
 * Componente de conteúdo do artigo.
 * Renderiza o conteúdo HTML com tipografia do Tailwind Typography
 * e tabela de conteúdos lateral.
 * 
 * O conteúdo é esperado já sanitizado e com IDs nos títulos (via servidor).
 * 
 * @component
 * @param {ArticleContentProps} props - Props contendo slug e conteúdo do artigo
 * @returns {JSX.Element} Container com conteúdo renderizado e tabela de conteúdos
 */
export default function ArticleContent({ slug, content }: ArticleContentProps) {
  // Estado para controle de favorito (atualiza UI otimisticamente)
  const [, setFavorited] = useState(false);

  return (
    <div className="relative">
      {/* Container das ações do artigo - oculto na impressão */}
      <div className="flex justify-end mb-4 print:hidden">
        <ArticleActions slug={slug} />
      </div>
      
      {/* Grid com conteúdo e tabela de conteúdos lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Área principal do conteúdo do artigo */}
        <div className="lg:col-span-3">
          {/* Renderiza o HTML do conteúdo com tipografia do Tailwind Typography */}
          {/* processedContent já foi sanitizado e tem IDs nos títulos via sanitizeHtml no servidor */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-gray-900 dark:prose-a:text-white"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        
        {/* Sidebar com tabela de conteúdos - oculta em mobile */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents content={content} />
          </div>
        </aside>
      </div>
    </div>
  );
}

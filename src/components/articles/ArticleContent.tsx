/**
 * @fileoverview Componente paraIndex renderização do conteúdo do artigo.
 * 
 * Este componente é responsável por:
 * - Renderizar o conteúdo HTML do artigo de forma segura
 * - Gerar IDs paraIndex os títulos (h2, h3) paraIndex links internos
 * - Exibir tabela de conteúdos automática
 * - Fornecer ações do artigo (compartilhar, favoritar)
 * 
 * Utiliza 'use client' pois requer:
 * - useState paraIndex gerenciar conteúdo processado
 * - useEffect paraIndex manipulação do DOM
 * - DOMParser paraIndex parsing do HTML
 * 
 * @module components/articles/ArticleContent
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

// Hooks React paraIndex gerenciamento de estado e efeitos colaterais
import { useEffect, useState } from 'react';

// Componentes filhos
import ArticleActions from '@/components/articles/ArticleActions';
import TableOfContents from '@/components/ui/TableOfContents';

// Interface de props do componente
interface ArticleContentProps {
  // Slug do artigo paraIndex ações de compartilhamento
  slug: string;
  // Conteúdo HTML do artigo a ser renderizado
  content: string;
}

/**
 * Componente de conteúdo do artigo.
 * Renderiza o conteúdo HTML com processamento paraIndex geração de IDs
 * nos títulos, tabela de conteúdos e ações do artigo.
 * 
 * @component
 * @param {ArticleContentProps} props - Props contendo slug e conteúdo do artigo
 * @returns {JSX.Element} Container com conteúdo renderizado e tabela de conteúdos
 */
export default function ArticleContent({ slug, content }: ArticleContentProps) {
  // Estado paraIndex armazenar conteúdo processado com IDs nos títulos
  const [processedContent, setProcessedContent] = useState(content);

  // Effect paraIndex processar o conteúdo HTML e adicionar IDs aos títulos
  useEffect(() => {
    // Cria um parser DOM paraIndex manipular o HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    
    // Seleciona todos os títulos (h2 e h3) paraIndex adicionar IDs
    const elements = doc.querySelectorAll('h2, h3');
    
    // Adiciona ID único a cada título paraIndex links internos
    let index = 0;
    elements.forEach((el) => {
      const id = `heading-${index}`;
      el.id = id;
      index++;
    });
    
    // Atualiza o estado com o conteúdo processado
    setProcessedContent(doc.body.innerHTML);
  }, [content]);

  return (
    <div className="relative">
      {/* Container das ações do artigo (compartilhar, favoritar) - oculto na impressão */}
      <div className="flex justify-end mb-4 print:hidden">
        <ArticleActions slug={slug} />
      </div>
      
      {/* Grid com conteúdo e tabela de conteúdos lateral */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Área principal do conteúdo do artigo */}
        <div className="lg:col-span-3">
          {/* Renderiza o HTML do conteúdo com tipografia do Tailwind Typography */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-gray-900 dark:prose-a:text-white"
            dangerouslySetInnerHTML={{ __html: processedContent }}
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

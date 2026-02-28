/**
 * @fileoverview Componente de tabela de conteúdos para artigos.
 * 
 * Este componente é responsável por:
 * - Extrair títulos (h2, h3) do conteúdo HTML do artigo
 * - Gerar lista navegável de seções do artigo
 * - Destacar a seção ativa durante o scroll
 * - Permitir navegação suave ao clicar em um título
 * 
 * Utiliza 'use client' pois requer:
 * - useMemo para extração de títulos via regex
 * - useState para gerenciar heading ativo
 * - useEffect para IntersectionObserver
 * 
 * Nota: O conteúdo é esperado já com IDs nos headings (gerados no servidor).
 * 
 * @module components/ui/TableOfContents
 * @author Globalismo
 * @version 1.0.0
 */

'use client';

// Hooks React para estado, memoização e efeitos colaterais
import { useMemo, useState, useEffect } from 'react';

// Interface para item da tabela de conteúdos
interface TocItem {
  // ID único do heading (gerado pelo sanitizeHtml)
  id: string;
  // Texto/conteúdo do título
  text: string;
  // Nível do heading (2 para h2, 3 para h3)
  level: number;
}

// Interface de props do componente
interface TableOfContentsProps {
  // Conteúdo HTML do artigo para extrair títulos
  content: string;
}

/**
 * Componente de tabela de conteúdos.
 * Extrai títulos do artigo e exibe navegação lateral.
 * Utiliza IntersectionObserver para destacar seção ativa.
 * 
 * Usa regex para extrair headings (server-side friendly).
 * 
 * @component
 * @param {TableOfContentsProps} props - Props contendo o conteúdo do artigo
 * @returns {JSX.Element | null} Tabela de conteúdos ou null se houver menos de 2 títulos
 */
export default function TableOfContents({ content }: TableOfContentsProps) {
  // Memoiza extração de títulos para evitar re-processamento desnecessário
  const headings = useMemo<TocItem[]>(() => {
    // Extrai títulos usando regex - funciona server-side
    const headingRegex = /<(h[23])(?:\s+[^>]*)?(?:\s+id="([^"]*)")?[^>]*>([^<]*)<\/\1>/gi;
    const items: TocItem[] = [];
    let match;
    
    while ((match = headingRegex.exec(content)) !== null) {
      const [, tag, id, text] = match;
      const level = parseInt(tag.charAt(1));
      items.push({
        id: id || `heading-${items.length}`,
        text: text.trim(),
        level,
      });
    }
    
    return items;
  }, [content]);

  // Estado para armazenar ID do heading atualmente visível
  const [activeId, setActiveId] = useState<string>('');

  // Effect para observar scroll e atualizar heading ativo
  useEffect(() => {
    // Cria observer para detectar headings visíveis na viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Atualiza heading ativo quando entra na viewport
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      // Define zona ativa no topo da página (apenas 20% do topo visível)
      { rootMargin: '-80px 0px -80% 0px' }
    );

    // Observa cada heading encontrado
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    // Cleanup: desconecta observer ao desmontar ou mudar headings
    return () => observer.disconnect();
  }, [headings]);

  // Oculta componente se houver menos de 2 títulos
  if (headings.length < 2) return null;

  /**
   * Handler de clique em título.
   * Realiza scroll suave para o heading correspondente.
   * 
   * @function handleClick
   * @param {string} id - ID do heading para navegar
   */
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calcula posição com offset para considerar header fixo
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Realiza scroll suave até o elemento
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    // Container da tabela de conteúdos com navegação acessível
    <nav className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4" aria-label="Índice do artigo">
      {/* Título da seção */}
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        Neste artigo
      </h4>
      
      {/* Lista de títulos com recuo conforme nível (h2 ou h3) */}
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            // Aplica recuo para títulos h3 (nível 3)
            style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}
          >
            {/* Botão do título com estilo condicional para ativo */}
            <button
              onClick={() => handleClick(heading.id)}
              className={`text-sm text-left transition-colors ${
                activeId === heading.id
                  ? 'text-blue-900 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-white'
              }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

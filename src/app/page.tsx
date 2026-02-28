/**
 * @fileoverview Página inicial (Home) do site Globalismo.
 * 
 * Esta é a página principal do site, exibida quando o usuário
 * acessa a raiz do domínio (/)
 * 
 * Conteúdo exibido:
 * - Artigo em destaque (hero banner)
 * - Lista de artigos recentes (grid)
 * - Componente de newsletter
 * - Lista de categorias
 * 
 * Esta página é Server-Side Rendered (SSR) por padrão no Next.js,
 * ou pode ser Static Site Generated (SSG) para melhor performance.
 * 
 * @module app/page
 * @author Globalismo
 * @version 1.0.0
 */

// Funções de acesso a dados do módulo de artigos
import { getFeaturedArticle, getRecentArticles, getAllCategories } from '@/lib/articles';

// Componente de banner para artigo em destaque
import ArticleHero from '@/components/articles/ArticleHero';

// Componente de card para listagem de artigos
import ArticleCard from '@/components/articles/ArticleCard';

// Componente Link do Next.js para navegação
import Link from 'next/link';

// Componente de tag de categoria
import CategoryTag from '@/components/ui/CategoryTag';

// Componente de formulário de newsletter
import Newsletter from '@/components/ui/Newsletter';

// Ícone de seta para direita da biblioteca Lucide
import { ArrowRight } from 'lucide-react';

/**
 * Componente da página inicial.
 * 
 * Fluxo de execução:
 * 1. Busca o artigo marcado como destaque
 * 2. Busca os artigos mais recentes (excluindo o destaque)
 * 3. Busca todas as categorias únicas
 * 4. Renderiza os componentes na ordem:
 *    - ArticleHero (se houver destaque)
 *    - Grid de artigos recentes
 *    - Newsletter
 *    - Categorias
 * 
 * @function Home
 * @returns {JSX.Element} Página inicial renderizada
 */
export default function Home() {
  // Busca o artigo marcado como destaque (destaque: true)
  const featured = getFeaturedArticle();
  
  // Busca os 6 artigos mais recentes, excluindo o artigo em destaque
  const recentArticles = getRecentArticles(6, featured?.id);
  
  // Busca todas as categorias únicas dos artigos
  const categories = getAllCategories();

  /**
   * Renderização da página inicial.
   * Container principal com largura máxima e padding.
   * py-8: Padding vertical de 32px
   */
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      /**
       * Seção do artigo em destaque.
       * Renderiza o ArticleHero apenas se houver um artigo marcado como destaque.
       */
      {featured && <ArticleHero article={featured} />}
      
      /**
       * Seção de artigos recentes.
       * mb-8: Margem inferior de 32px
       */
      <section className="mb-8">
        /**
         * Cabeçalho da seção com título e link "Ver todos".
         * flex items-center justify-between: Alinha título e link
         * mb-6: Margem inferior de 24px
         */
        <div className="flex items-center justify-between mb-6">
          /**
           * Título "Últimos Artigos".
           * text-2xl: Tamanho grande
           * font-bold: Peso negrito
           * font-serif: Fonte serif (Merriweather)
           */
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-serif">
            Últimos Artigos
          </h2>
          
          /**
           * Link para página de artigos.
           * flex items-center gap-2: Alinha ícone e texto
           * text-sm: Tamanho pequeno
           * text-blue-900: Cor azul escura
           */
          <Link 
            href="/artigos" 
            className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-300 hover:underline"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        /**
         * Grid de artigos recentes.
         * grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3:
         *   - 1 coluna em mobile
         *   - 2 colunas em tablet (md)
         *   - 3 colunas em desktop (lg)
         * gap-6: Espaçamento de 24px entre cards
         */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          /**
           * Mapeia os artigos recentes para renderizar cards.
           * idx é usado para criar um delay de animação escalonado.
           */
          {recentArticles.map((article, idx) => (
            /**
             * Container do card com animação de entrada.
             * key: Identificador único do artigo
             * animate-fade-in-up: Classe de animação CSS
             * style: Delay progressivo baseado no índice
             */
            <div 
              key={article.id} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>

      /**
       * Seção de newsletter.
       * my-8: Margens vertical de 32px
       */
      <section className="my-8">
        <Newsletter />
      </section>

      /**
       * Seção de categorias.
       * bg-gray-50/dark:bg-gray-800: Fundo cinza
       * rounded-lg: Bordas arredondadas
       * p-6: Padding de 24px
       */
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        /**
         * Título da seção.
         * text-lg: Tamanho médio
         * font-semibold: Peso semi-negrito
         * mb-4: Margem inferior de 16px
         */
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 font-serif">
          Categorias
        </h2>
        
        /**
         * Container de tags de categoria.
         * flex flex-wrap: Permite quebra de linha
         * gap-2: Espaçamento de 8px entre tags
         */
        <div className="flex flex-wrap gap-2">
          /**
           * Mapeia categorias para renderizar tags.
           * size="md": Tamanho médio das tags
           */
          {categories.map((cat) => (
            <CategoryTag key={cat} category={cat} size="md" />
          ))}
        </div>
      </section>
    </div>
  );
}

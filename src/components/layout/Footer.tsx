/**
 * @fileoverview Componente de rodapé (Footer) do site Globalismo.
 * 
 * Este componente é responsável por exibir:
 * - Informações sobre o projeto/site
 * - Links de navegação principal
 * - Links para categorias de artigos
 * - Links para redes sociais
 * - Copyright com ano dinâmico
 * 
 * O rodapé aparece em todas as páginas do site, fornecendo
 * uma forma de navegação adicional e informações de contato.
 * 
 * @module components/layout/Footer
 * @author Globalismo
 * @version 1.0.0
 */

// Componente Link do Next.js para navegação interna
import Link from 'next/link';

// Ícones da biblioteca Lucide React
import { Globe, Twitter, Github, Linkedin, Mail } from 'lucide-react';

/**
 * Componente de rodapé do site.
 * 
 * Estrutura:
 * - Coluna 1: Logo, descrição e links sociais
 * - Coluna 2: Links de navegação (Home, Sobre, Artigos, Contato)
 * - Coluna 3: Links para categorias de artigos
 * - Linha inferior: Copyright
 * 
 * @function Footer
 * @returns {JSX.Element} Componente de rodapé renderizado
 */
export default function Footer() {
  // Obtém o ano atual dinamicamente
  const currentYear = new Date().getFullYear();

  return (
    /**
     * Elemento footer com estilo de fundo cinza.
     * border-t: Borda superior separadora
     */
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      /**
       * Container centralizado com largura máxima.
       * py-10: Padding vertical de 40px
       */
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        /**
         * Grid com 3 colunas em desktop, 1 coluna em mobile.
         * gap-8: Espaçamento de 32px entre colunas
         */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          /**
           * COLUNA 1: Informações do site e redes sociais
           */
          <div>
            /**
             * Logo e nome do site.
             * flex items-center gap-2: Alinha ícone e texto
             * mb-3: Margem inferior de 12px
             */
            <div className="flex items-center gap-2 mb-3">
              /**
               * Ícone de globo (logo visual).
               * w-6 h-6: Tamanho de 24px
               * text-blue-900/dark:text-blue-400: Cor conforme tema
               */
              <Globe className="w-6 h-6 text-blue-900 dark:text-blue-400" />
              /**
               * Nome do site em fonte serif.
               * text-lg: Tamanho grande
               * font-bold: Peso negrito
               */
              <h3 className="text-lg font-bold text-blue-900 dark:text-white font-serif">
                Globalismo
              </h3>
            </div>
            
            /**
             * Descrição breve do projeto.
             * text-sm: Tamanho pequeno
             * leading-relaxed: Altura de linha mais folgada
             */
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade contemporânea.
            </p>
            
            /**
             * Container de ícones de redes sociais.
             * flex gap-3: Alinha horizontalmente com espaçamento
             * mt-4: Margem superior de 16px
             */
            <div className="flex gap-3 mt-4">
              /**
               * Link para Twitter/X.
               * target="_blank": Abre em nova aba
               * rel="noopener noreferrer": Segurança para links externos
               * rounded: Bordas arredondadas
               * hover:bg-blue-900: Muda cor no hover
               */
              <a href="https://x.com/omurilomota" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-blue-900 hover:text-white transition-colors" aria-label="Twitter/X">
                <Twitter className="w-4 h-4" />
              </a>
              
              /**
               * Link para GitHub.
               */
              <a href="https://github.com/omurilomota" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-blue-900 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              
              /**
               * Link para LinkedIn.
               */
              <a href="https://www.linkedin.com/in/murilo-henrique-622354358/" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-blue-900 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              
              /**
               * Link para página de contato (internal link).
               */
              <a href="/contato" className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-blue-900 hover:text-white transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          /**
           * COLUNA 2: Links de navegação
           */
          <div>
            /**
             * Título da seção.
             * text-sm: Tamanho pequeno
             * font-semibold: Peso semi-negrito
             * uppercase: Texto em maiúsculas
             * tracking-wide: Espaçamento entre letras
             */
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
              Navegação
            </h4>
            
            /**
             * Lista de links de navegação.
             * space-y-2: Espaçamento vertical entre itens
             */
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/artigos" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-white transition-colors">
                  Artigos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          /**
           * COLUNA 3: Links de categorias
           * Cada categoria tem uma cor de hover diferente
           */
          <div>
            /**
             * Título da seção.
             */
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-3">
              Categorias
            </h4>
            
            /**
             * Lista de links de categorias.
             */
            <ul className="space-y-2">
              <li>
                {/* Categoria Economia - cor verde no hover */}
                <Link href="/artigos?categoria=economia" className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Economia
                </Link>
              </li>
              <li>
                {/* Categoria Política - cor azul no hover */}
                <Link href="/artigos?categoria=politica" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-900 dark:hover:text-white transition-colors">
                  Política
                </Link>
              </li>
              <li>
                {/* Categoria Cultura - cor roxa no hover */}
                <Link href="/artigos?categoria=cultura" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Cultura
                </Link>
              </li>
              <li>
                {/* Categoria Geopolítica - cor ciano no hover */}
                <Link href="/artigos?categoria=geopolitica" className="text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Geopolítica
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        /**
         * Linha inferior com copyright.
         * border-t: Borda superior
         * mt-8: Margem superior de 32px
         * pt-6: Padding superior de 24px
         * text-center: Centralizado
         */
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          /**
           * Texto de copyright com ano dinâmico.
           * text-xs: Tamanho extra pequeno
           */
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} Globalismo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

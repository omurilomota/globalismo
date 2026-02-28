/**
 * @fileoverview Layout raiz da aplicação Next.js (App Router).
 * 
 * Este arquivo define a estrutura base de todas as páginas do site,
 * incluindo o HTML, head, fontes, estilos globais e os componentes
 * de navegação (Header) e rodapé (Footer).
 * 
 * É o primeiro componente a ser renderizado quando uma página é acessada,
 * servindo como container para todo o conteúdo da aplicação.
 * 
 * @module app/layout
 * @author Globalismo
 * @version 1.0.0
 */

// Importa o tipo Metadata do Next.js para definição de SEO
import type { Metadata } from "next";

// Importa as fontes do Google via Next.js font optimization
// Merriweather: fonte serif para títulos
// Inter: fonte sans-serif para corpo de texto
import { Merriweather, Inter } from "next/font/google";

// Importa os estilos globais Tailwind CSS
import "./globals.css";

// Importa o componente de cabeçalho/navegação
import Header from "@/components/layout/Header";

// Importa o componente de rodapé
import Footer from "@/components/layout/Footer";

// Importa o componente de schema Organization para SEO
import OrganizationSchema from "@/components/seo/OrganizationSchema";

// Importa o componente de schema Website para SEO
import WebsiteSchema from "@/components/seo/WebsiteSchema";

/**
 * Configuração da fonte Merriweather (serif).
 * Usada para títulos e elementos que precisam de uma fonte mais elegante.
 * 
 * @constant {Object} merriweather
 * @property {string} variable - Variável CSS para uso no Tailwind
 * @property {string[]} subsets - Conjuntos de caracteres (latin para português)
 * @property {string[]} weights - Pesos da fonte disponíveis
 * @property {string} display - Estratégia de carregamento (swap para performance)
 */
const merriweather = Merriweather({
  // Variável CSS que será criada (--font-merriweather)
  variable: "--font-merriweather",
  // Suporte ao alfabeto latino
  subsets: ["latin"],
  // Pesos disponíveis: light(300), regular(400), bold(700), black(900)
  weight: ["300", "400", "700", "900"],
  // Evita FOIT (Flash of Invisible Text) - mostra texto fallback até carregar
  display: "swap",
});

/**
 * Configuração da fonte Inter (sans-serif).
 * Usada para o corpo do texto por ser mais legível em telas.
 * 
 * @constant {Object} inter
 * @property {string} variable - Variável CSS para uso no Tailwind
 * @property {string[]} subsets - Conjuntos de caracteres
 * @property {string} display - Estratégia de carregamento
 */
const inter = Inter({
  // Variável CSS que será criada (--font-inter)
  variable: "--font-inter",
  // Suporte ao alfabeto latino
  subsets: ["latin"],
  // Evita FOIT mostrando texto temporário até carregar
  display: "swap",
});

/**
 * Metadata global do site para SEO.
 * Define título, descrição, palavras-chave e configurações do OpenGraph
 * que serão usadas em todas as páginas do site.
 * 
 * @export
 * @constant {Metadata} metadata
 * @property {URL} metadataBase - URL base do site
 * @property {Object} title - Configuração de título com template
 * @property {string} description - Descrição do site para motores de busca
 * @property {string[]} keywords - Palavras-chave para SEO
 * @property {Object[]} authors - Autores do conteúdo
 * @property {Object} openGraph - Configurações do OpenGraph (Facebook, WhatsApp, etc.)
 * @property {Object} alternates - URLs alternativas e canônicas
 * @property {Object} robots - Configurações para robôs de busca
 */
export const metadata: Metadata = {
  // URL base para resolução de URLs relativas
  metadataBase: new URL('https://globalismo.com.br'),
  
  // Configuração de título com template para páginas secundárias
  title: {
    // Título padrão para a home
    default: "Globalismo - Reflexões sobre a Globalização",
    // Template para outras páginas: "Título da Página | Globalismo"
    template: "%s | Globalismo"
  },
  
  // Descrição do site (usada em resultados de busca)
  description: "Um espaço para reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade. Análises fundamentadas em fontes acadêmicas e jornalísticas.",
  
  // Palavras-chave para mecanismos de busca
  keywords: ["globalização", "economia", "política", "cultura", "sociedade", "mundo", "geopolítica", "ordem mundial"],
  
  // Autor do conteúdo
  authors: [{ name: "Globalismo" }],
  
  // Configurações do OpenGraph para compartilhamento em redes sociais
  openGraph: {
    title: "Globalismo - Reflexões sobre a Globalização",
    description: "Um espaço para reflexão crítica sobre os impactos da globalização.",
    type: "website",
    locale: "pt_BR",
    siteName: "Globalismo",
    url: "https://globalismo.com.br"
  },
  
  // URLs alternativas e canônicas
  alternates: {
    canonical: "https://globalismo.com.br"
  },
  
  // Configurações para robôs de busca
  robots: {
    index: true,    // Permite indexação
    follow: true    // Permite seguir links
  }
};

/**
 * Componente de layout raiz da aplicação.
 * Define a estrutura HTML completa com head, body e componentes de wrapper.
 * 
 * Este componente é automaticamente usado por todas as páginas do Next.js
 * através do App Router, então qualquer código aqui será executado em
 * todas as requisições.
 * 
 * @function RootLayout
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componente filho (página sendo renderizada)
 * @returns {JSX.Element} Estrutura HTML completa do site
 * @example
 * // Este componente é automaticamente usado pelo Next.js
 * // Não precisa ser importado explicitamente nas páginas
 */
export default function RootLayout({
  children,
}: Readonly<{
  // Conteúdo da página que está sendo renderizada
  children: React.ReactNode;
}>) {
  return (
    // Tag HTML principal com idioma português brasileiro
    // suppressHydrationWarning evita warnings de diferença entre servidor/cliente
    <html lang="pt-BR" suppressHydrationWarning>
      // Seção head com metadados e scripts
      <head>
        {/* Schema Organization para SEO (JSON-LD) */}
        <OrganizationSchema 
          // Links para redes sociais do autor/projeto
          sameAs={[
            "https://x.com/omurilomota",
            "https://www.linkedin.com/in/murilo-henrique-622354358/",
            "https://github.com/omurilomota"
          ]}
        />
        
        {/* Schema Website para SEO (JSON-LD) */}
        <WebsiteSchema />
      </head>
      
      // Corpo da página com classes de estilo globais
      // - Variáveis de fonte (merriweather e inter)
      // - antialiased: suavização de fontes
      // - bg-white/dark:bg-gray-900: cor de fundo
      // - min-h-screen: altura mínima da tela
      // - flex flex-col: layout flexbox vertical
      // - transition-colors: transições suaves para mudanças de cor (dark mode)
      <body className={`${merriweather.variable} ${inter.variable} antialiased bg-white dark:bg-gray-900 min-h-screen flex flex-col transition-colors`}>
        
        {/* Cabeçalho com navegação */}
        <Header />
        
        {/* Área de conteúdo principal */}
        {/* flex-1 faz o main ocupar todo o espaço disponível entre header e footer */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Rodapé do site */}
        <Footer />
        
      </body>
    </html>
  );
}

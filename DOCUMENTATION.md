# Documentação Completa do Projeto Globalismo

## Visão Geral

Globalismo é um site de artigos sobre globalização, política, economia e geopolítica. 
Desenvolvido com Next.js 16 (App Router), React 19, TypeScript e Tailwind CSS.

---

## Estrutura de Diretórios

```
src/
├── app/                    # Páginas e rotas (Next.js App Router)
│   ├── api/               # API Routes
│   ├── artigos/           # Páginas de artigos
│   ├── contato/           # Página de contato
│   ├── sobre/             # Página sobre
│   ├── rss.xml/           # Feed RSS
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Home page
│   ├── globals.css        # Estilos globais
│   ├── robots.ts          # Configuração robots.txt
│   └── sitemap.ts         # Configuração sitemap.xml
├── components/             # Componentes React
│   ├── layout/           # Header, Footer
│   ├── articles/         # Componentes de artigos
│   ├── forms/            # Formulários
│   ├── seo/              # Schemas JSON-LD
│   └── ui/               # Componentes de UI
├── hooks/                # React Hooks customizados
├── lib/                  # Funções utilitárias e acesso a dados
├── data/                 # Dados JSON estáticos
└── types/                # Definições TypeScript
```

---

## 1. Tipos TypeScript (src/types/index.ts)

Define as interfaces usadas em todo o projeto:

```typescript
interface IArticle {
  id: string;           // ID único do artigo
  titulo: string;       // Título
  slug: string;         // URL amigável
  conteudo: string;     // HTML do conteúdo
  resumo: string;       // Resumo/description
  autor: string;        // Nome do autor
  dataPublicacao: string; // Data no formato ISO
  imagemCapa: string;   // URL da imagem
  categorias: string[]; // Categorias (Economia, Política, etc)
  tags: string[];       // Tags para busca
  tempoLeitura: number; // Tempo estimado em minutos
  visualizacoes: number; // Contador de visualizações
  destaque: boolean;    // Se é artigo em destaque
}

interface IPaginatedResult {
  artigos: IArticle[];  // Artigos da página atual
  total: number;        // Total de artigos
  page: number;         // Página atual
  totalPages: number;   // Total de páginas
  hasMore: boolean;     // Se existe próxima página
}
```

---

## 2. Camada de Dados (src/lib/articles.ts)

Funções para acessar e filtrar artigos do JSON:

| Função | Descrição |
|--------|-----------|
| `getAllArticles()` | Retorna todos os artigos |
| `getArticleBySlug(slug)` | Busca artigo por slug |
| `getArticlesByCategory(cat)` | Filtra por categoria |
| `searchArticles(query)` | Busca por título, resumo ou tags |
| `getFeaturedArticle()` | Retorna artigo em destaque |
| `getRecentArticles(limit)` | Artigos recentes ordenados por data |
| `getRelatedArticles(slug)` | Artigos relacionados por categoria/tags |
| `getPaginatedArticles({page, category, search})` | Artigos paginados e filtrados |
| `getAllCategories()` | Lista de categorias únicas |
| `getCanonicalUrl(path)` | Gera URL canônica para SEO |

---

## 3. Utilitários (src/lib/utils.ts)

```typescript
cn(...inputs)        // Mescla classes Tailwind (clsx + tailwind-merge)
formatDate(date)     // Formata data para pt-BR (ex: "15 de janeiro de 2024")
slugify(text)       // Converte texto para URL amigável
getReadingTime(content) // Calcula tempo de leitura (200 palavras/min)
```

---

## 4. Hooks Personalizados

### useFavorites (src/hooks/useFavorites.ts)

Gerencia favoritos salvos no localStorage:

```typescript
const { favorites, toggleFavorite, isFavorite, isLoaded } = useFavorites();

// Usage
toggleFavorite('slug-do-artigo')  // Adiciona/remove favorito
isFavorite('slug-do-artigo')      // Verifica se é favorito
```

**Como funciona:**
1. No carregamento, lê do localStorage
2. `toggleFavorite` adiciona ou remove o slug
3. Salva automaticamente no localStorage
4. Estado persiste entre sessões

---

## 5. Componentes de Layout

### Header (src/components/layout/Header.tsx)

- **Navegação**: Links para Home, Sobre, Artigos, Contato
- **Dark Mode**: Toggle com persistência (localStorage + system preference)
- **Menu Mobile**: Drawer com navegação
- **useSyncExternalStore**: Sincroniza tema entre componentes

```typescript
// Detecção de tema
useSyncExternalStore(
  subscribeToTheme,   // Assina mudanças de classe
  getThemeSnapshot,  // Pega estado atual
  () => false         // Default para SSR
);
```

### Footer (src/components/layout/Footer.tsx)

- Logo e descrição
- Links sociais (X, GitHub, LinkedIn)
- Navegação rápida
- Links por categoria
- Copyright dinâmico

---

## 6. Componentes de Artigos

### ArticleCard (src/components/articles/ArticleCard.tsx)

Card para listagem de artigos:
- Imagem de capa (Next/Image com lazy loading)
- Categorias
- Título (link)
- Resumo
- Autor, tempo de leitura, data

### ArticleHero (src/components/articles/ArticleHero.tsx)

Artigo em destaque na home:
- Imagem de fundo com gradiente overlay
- Título grande
- Resumo
- Metadata
- Botão "Ler artigo"

### ArticleContent (src/components/articles/ArticleContent.tsx)

Wrapper do conteúdo do artigo:
- Renderiza HTML
- Adiciona IDs aos headings (para TOC)
- Inclui ArticleActions (imprimir/favoritar)
- Layout com Table of Contents lateral

### ArticleActions (src/components/articles/ArticleActions.tsx)

Botões de ação no artigo:
- **Imprimir**: `window.print()` - abre dialog nativo
- **Favoritar**: usa hook useFavorites

---

## 7. Componentes de UI

### Newsletter (src/components/ui/Newsletter.tsx)

Formulário de inscrição:
- Validação de email (regex)
- Estados: idle, loading, success, error
- Feedback visual com ícones
- Simulação de API (setTimeout)

### TableOfContents (src/components/ui/TableOfContents.tsx)

Índice dinâmico do artigo:
- **Parser**: Extrai h2/h3 do HTML
- **useMemo**: Processa apenas quando conteúdo muda
- **IntersectionObserver**: Detecta heading ativo
- **Scroll suave**: navigation.clicked

**Por que menos de 2 headings = null?**
Se o artigo tiver menos de 2 seções, o índice não faz sentido.

### SearchBar (src/components/ui/SearchBar.tsx)

Barra de busca com redirect:
- Input com ícone
- Submit redireciona para `/artigos?busca=query`
- Filtro aplicado na página de artigos

---

## 8. Páginas

### Home (src/app/page.tsx)

```tsx
// Server Component
export default function Home() {
  const featured = getFeaturedArticle();    // Artigo em destaque
  const recentArticles = getRecentArticles(6, featured?.id); // Recentes
  const categories = getAllCategories();    // Lista categorias
  
  return (
    <>
      {featured && <ArticleHero article={featured} />}
      <section> {/* Artigos recentes */} </section>
      <Newsletter />  {/* Formulário */} 
      <section> {/* Categorias */} </section>
    </>
  );
}
```

### Artigos (src/app/artigos/page.tsx)

Listagem com filtros:
- Paginação
- Filtro por categoria (query string)
- Busca por texto
- Redireciona se página inválida

### Artigo Individual (src/app/artigos/[slug]/page.tsx)

Página de artigo:
- **generateStaticParams**: Gera rotas estáticas para SSG
- **generateMetadata**: SEO dinâmico (title, description, OpenGraph)
- ArticleContent: wrapper com TOC e ações
- Artigos relacionados no footer

### API Routes (src/app/api/artigos/route.ts)

Endpoint RESTful:
- `GET /api/artigos?page=1&categoria=economia&busca=global`
- Retorna JSON paginado
- Semelhante a getPaginatedArticles mas para client-side

---

## 9. SEO e Metadata

### layout.tsx

```typescript
// Metadata global
metadata = {
  title: { default, template },  // "Artigo | Globalismo"
  description,                   // Meta description
  keywords,                      // Meta keywords
  openGraph: {                   // Facebook/LinkedIn
    title, description, type, locale, siteName, url
  },
  alternates: { canonical },    // URL canônica
  robots: { index, follow }     // Robots.txt
}
```

### Schemas JSON-LD

**OrganizationSchema** (src/components/seo/OrganizationSchema.tsx):
- Nome, URL, logo
- Links sociais (sameAs)
- ContactPoint
- SearchAction para busca internal

**WebsiteSchema** (src/components/seo/WebsiteSchema.tsx):
- WebSite schema
- potentialAction para busca

**BreadcrumbSchema** (src/components/seo/BreadcrumbSchema.tsx):
- BreadcrumbList para navegação

---

## 10. RSS Feed (src/app/rss.xml/route.ts)

Gera feed RSS 2.0:
- Lista 20 artigos mais recentes
- Inclui: title, link, guid, pubDate, description, author, category
- Content-Type: application/xml

**Acesso**: `/rss.xml`

---

## 11. Configuração de Estilos (src/app/globals.css)

### Tailwind CSS v4

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Variáveis CSS */
:root {
  --primary: #1a365d;      /* Azul marinho */
  --secondary: #2b6cb0;   /* Azul céu */
  --accent: #38a169;      /* Verde */
}

/* Dark mode */
.dark { ... }

/* Animações */
@keyframes fadeInUp { ... }
.animate-fade-in-up { ... }

/* Scrollbar personalizada */
::-webkit-scrollbar { ... }

/* Print styles */
@media print {
  /* Esconde nav, header, footer */
  /* Ajusta cores para impressão */
}
```

---

## 12. Testes (Vitest)

### Configuração (vitest.config.ts)

```typescript
{
  environment: 'jsdom',    // Simula browser
  globals: true,           // globals (describe, it)
  setupFiles: ['./src/test/setup.ts'],  // jest-dom
}
```

### Testes existentes

- **lib/utils.test.ts**: 9 testes (cn, formatDate, slugify, getReadingTime)
- **lib/articles.test.ts**: 16 testes (getAllArticles, getArticleBySlug, etc)

**Executar**:
```bash
npm run test        # modo watch
npm run test:run    # uma vez
npm run test:coverage  # com coverage
```

---

## 13. Hooks Git (Husky)

### commit-msg

Valida mensagem de commit:
- Deve começar com gitmoji válido
- Lista: ✨ 🎨 🔧 ⚡ 🚀 📦 🐛 🔨 ✏️ 🧪 ✅ ❌ 🔒 🌐 ♻️ 👕

### pre-commit

Executa `npm run test:run` antes de cada commit.

---

## 14. Fluxo de Dados

```
JSON (artigos.json)
    ↓
lib/articles.ts (funções de acesso)
    ↓
Pages (Server Components)
    ↓
Components (renderização)
    ↓
Client (useFavorites, Newsletter - localStorage)
```

---

## 15. Recursos Implementados

| Recurso | Status |
|---------|--------|
| Dark Mode | ✅ |
| Responsivo | ✅ |
| SEO completo | ✅ |
| RSS Feed | ✅ |
| Newsletter | ✅ |
| Favoritos (localStorage) | ✅ |
| Imprimir | ✅ |
| Table of Contents | ✅ |
| Artigos Relacionados | ✅ |
| Paginação | ✅ |
| Busca | ✅ |
| Testes unitários | ✅ (25 testes) |
| Validação de commit | ✅ |

---

## 16. Scripts Disponíveis

```bash
npm run dev        # Desenvolvimento
npm run build      # Produção
npm run start      # Servidor produção
npm run lint       # ESLint
npm run test       # Vitest watch
npm run test:run   # Vitest uma vez
npm run test:coverage  # Com coverage
```

---

## 17. Futuras Melhorias

- Integração com CMS (Contentful, Strapi)
- Comentários nos artigos
- Busca com Elasticsearch/Algolia
- Autenticação para favoritos sincronizados
- Newsletter com Mailchimp/ConvertKit
- Analytics (Google Analytics, Plausible)
- Progressive Web App (PWA)

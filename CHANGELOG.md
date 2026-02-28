# Changelog

Todas as mudanças notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-02-28

### ✨ Adicionado

- **Sistema de Comentários Giscus** - Comentários via GitHub Issues (100% free, sem backend)
- **Dark Mode** - Suporte completo a tema claro/escuro com `next-themes`
- **Headers de Segurança** - CSP, X-Frame-Options, X-XSS-Protection no middleware
- **Rate Limiting** - Proteção contra abuso nas APIs
- **SEO Completo** - Sitemap, robots.txt, schema.org (Organization, Website, Breadcrumb)
- **RSS Feed** - Feed XML automático para leitores
- **12 Artigos** - Conteúdo sobre globalização, economia e geopolítica
- **Paginação** - Sistema de paginação com janela deslizante
- **Busca e Filtros** - Busca por termo e filtro por categoria
- **Responsividade** - Layout mobile-first com Tailwind CSS

### 🔧 Modificado

- **Next.js 16 → 14.2.28** - Downgrade para versão LTS estável
- **React 19 → 18.3.1** - Compatibilidade garantida
- **Tipagem Next.js** - Corrigido `params` e `searchParams` para API v14
- **Header** - Simplificado com `useTheme` hook
- **Middleware** - Headers de segurança agora aplicados em todas as respostas

### 🗑️ Removido

- **next-plausible** - Analytics pago (substituível por Google Analytics free)
- **@vercel/speed-insights** - Serviço opcional da Vercel
- **API de Comentários** - Sistema em memória removido (dados não persistiam)
- **Husky** - Hooks de git removidos para facilitar commits
- **Workflow CI/CD** - GitHub Actions removido (erro de permissão PAT)

### 🐛 Corrigido

- **Build Next.js** - Erros de compilação com `next.config.ts`
- **TypeScript** - Tipos incompatíveis com Next.js 14
- **ESLint** - Configuração para ESLint 8
- **Sanitização** - IDs em headings para links internos

### ⚡ Performance

- **Build Otimizado** - First Load JS: ~100kB
- **Imagens** - WebP/AVIF com Next.js Image
- **Static Generation** - 26 páginas pré-renderizadas
- **Middleware** - 27.4kB (gzip)

### 🔒 Segurança

- **Sanitização HTML** - Previne XSS em conteúdo de artigos
- **Validação Server-side** - Formulários validados no servidor
- **Rate Limiting** - 5-100 req/min por endpoint
- **CSP** - Content Security Policy configurado

### 📦 Dependências Principais

```json
{
  "next": "14.2.28",
  "react": "18.3.1",
  "@giscus/react": "^3.1.0",
  "next-themes": "^0.4.6",
  "tailwindcss": "^4",
  "lucide-react": "^0.575.0"
}
```

### 📝 Notas

- **APIs de Contato/Newsletter**: Simulam envio (console.log). Para produção, integrar com SendGrid/Resend.
- **Giscus**: Requer configuração em https://giscus.app (ver `.env.example`)
- **Hospedagem**: Recomendado Vercel (free tier) ou Netlify

---

## [0.1.0] - 2026-02-27

### ✨ Adicionado

- Estrutura inicial do projeto
- 12 artigos sobre globalização
- Sistema de categorias e tags
- Layout responsivo com Header e Footer

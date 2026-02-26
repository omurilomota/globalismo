# Globalismo

> Um site informativo sobre globalismo, geopolítica e economia global.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Descrição

Globalismo é uma plataforma web dedicada à reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade contemporânea. O projeto busca apresentar múltiplas perspectivas sobre o tema, sempre baseadas em fontes acadêmicas e jornalísticas confiáveis.

## Objetivos

- Disponibilizar conteúdo informativo neutro e embasado
- Apresentar múltiplas perspectivas sobre globalismo
- Fornecer dados visuais interativos
- Criar recursos educacionais
- Estabelecer credibilidade através de fontes primárias

## Tecnologias

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Ícones**: Lucide React
- **Imagens**: Unsplash (CDN)
- **Hospedagem**: Vercel (recomendado)

## Características

### Acessibilidade
- ✅ Skip links para navegação por teclado
- ✅ Atributos ARIA completos
- ✅ Labels em todos os formulários
- ✅ Estilos de focus visíveis
- ✅ Suporte a leitores de tela
- ✅ Navegação por teclado otimizada
- ✅ Contraste de cores adequado

### SEO
- ✅ Meta tags completas (Open Graph, Twitter Cards)
- ✅ Structured Data (JSON-LD) para artigos
- ✅ Breadcrumbs com schema.org
- ✅ Sitemap.xml dinâmico
- ✅ Robots.txt configurado
- ✅ URLs canônicas
- ✅ Meta descrições otimizadas

### Performance
- ✅ Otimização de imagens com Next.js Image
- ✅ Lazy loading de imagens
- ✅ Compressão de assets
- ✅ Fontes otimizadas (display: swap)
- ✅ Code splitting automático
- ✅ Static Site Generation (SSG)

### UX/UI
- ✅ Modo escuro/claro
- ✅ Design responsivo
- ✅ Animações suaves
- ✅ Loading states e skeletons
- ✅ Toast notifications
- ✅ Botão "voltar ao topo"
- ✅ Breadcrumbs de navegação
- ✅ Botões de compartilhamento social

### Segurança
- ✅ Headers de segurança (CSP, X-Frame-Options, etc.)
- ✅ Sanitização de HTML
- ✅ Validação de formulários
- ✅ Proteção contra XSS
- ✅ Environment variables

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/omurilomota/globalismo.git

# Entrar no diretório
cd globalismo

# Instalar dependências
npm install

# Configurar variáveis de ambiente (opcional)
cp .env.example .env.local

# Iniciar desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start
```

## Variáveis de Ambiente

Crie um arquivo `.env.local` baseado no `.env.example`:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://globalismo.com.br
NEXT_PUBLIC_SITE_NAME=Globalismo

# Analytics (Opcional)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Contact Form (Opcional)
# CONTACT_EMAIL=contato@globalismo.com.br

# Social Media (Opcional)
# NEXT_PUBLIC_TWITTER_HANDLE=@globalismo
```

## Estrutura de Pastas

```
globalismo/
 ├── src/
 │   ├── app/                    # Páginas (App Router)
 │   │   ├── api/               # API Routes
 │   │   ├── artigos/           # Páginas de artigos
 │   │   ├── sobre/             # Página sobre
 │   │   ├── contato/           # Página contato
 │   │   ├── layout.tsx         # Layout principal
 │   │   ├── globals.css        # Estilos globais
 │   │   ├── robots.ts          # Configuração robots.txt
 │   │   └── sitemap.ts         # Configuração sitemap.xml
 │   ├── components/
 │   │   ├── layout/            # Header, Footer
 │   │   ├── articles/          # Componentes de artigos
 │   │   ├── forms/             # Formulários
 │   │   ├── seo/               # Componentes SEO
 │   │   └── ui/                # Componentes de UI reutilizáveis
 │   ├── lib/                   # Funções utilitárias
 │   ├── data/                  # Dados JSON
 │   └── types/                 # Tipos TypeScript
 ├── public/                     # Arquivos estáticos
 ├── next.config.ts              # Configuração Next.js
 ├── tsconfig.json              # Configuração TypeScript
 ├── tailwind.config.ts         # Configuração Tailwind
 ├── .env.example               # Exemplo de variáveis de ambiente
 └── package.json
```

## Páginas

| Página | URL | Descrição |
|--------|-----|-----------|
| Home | `/` | Página inicial com artigos em destaque |
| Artigos | `/artigos` | Listagem completa de artigos com filtros |
| Artigo | `/artigos/[slug]` | Página de artigo individual |
| Sobre | `/sobre` | Informações sobre o projeto |
| Contato | `/contato` | Formulário de contato |

## Componentes

### UI Components
- `BackToTop` - Botão para voltar ao topo da página
- `Breadcrumbs` - Navegação estrutural
- `CategoryTag` - Tags de categorias
- `Pagination` - Paginação de listas
- `SearchBar` - Barra de busca
- `Skeleton` - Loading states
- `SocialShare` - Botões de compartilhamento social
- `Toast` - Notificações toast

### Article Components
- `ArticleCard` - Card de artigo
- `ArticleHero` - Hero de artigo em destaque
- `RelatedArticles` - Artigos relacionados

### Form Components
- `ContactForm` - Formulário de contato com validação

### SEO Components
- `StructuredData` - JSON-LD para SEO

## Artigos Disponíveis

O site conta com artigos aprofundados sobre diversos temas relacionados ao globalismo:

1. O Poder das Empresas Transnacionais na Era da Globalização
2. Cidadania e Direitos na Sociedade Capitalista
3. A Globalização como Fenômeno Histórico Inevitável
4. Comunicação, Consumismo e Integração Social
5. A Era do Globalismo Acabou? O Que Vem Depois (2025)
6. O Colapso da Ordem Liberal Mundial
7. A Ascensão da China e Rússia na Governança Global
8. A Economia Global na Era da Incerteza
9. Refragmentação da Economia Global
10. Globalização: A Crise e as Duas Saídas Possíveis
11. O Papel das Instituições Supranacionais
12. Nacionalismo vs Globalismo: O Conflito Contemporâneo

### Categorias

- Economia
- Política
- Cultura
- Geopolítica
- Filosofia
- Mídia

## Design

### Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Azul Marinho | `#1a365d` | Primary |
| Azul Céu | `#2b6cb0` | Secondary |
| Verde | `#38a169` | Accent |
| Dourado | `#d69e2e` | Destaque |
| Cinza Gelo | `#f7fafc` | Background |
| Cinza Escuro | `#1a202c` | Dark Background |

### Tipografia

- **Títulos**: Merriweather (Serif)
- **Corpo**: Inter (Sans-serif)

## Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm start        # Inicia servidor de produção
npm run lint     # Executa ESLint
```

## Contribuição

Contribuições são bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Siga o padrão de código existente
- Use TypeScript para novos arquivos
- Adicione testes quando apropriado
- Atualize a documentação conforme necessário
- Mantenha a acessibilidade em mente

## Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Autor

**Murilo Mota**

- GitHub: [@omurilomota](https://github.com/omurilomota)
- Email: [murilomota@email.com](mailto:murilomota@email.com)

## Links Úteis

- [Organização das Nações Unidas (ONU)](https://www.un.org)
- [Fundo Monetário Internacional (FMI)](https://www.imf.org)
- [Banco Mundial](https://www.worldbank.org)
- [Organização Mundial do Comércio (OMC)](https://www.wto.org)
- [Forbes Brasil](https://forbes.com.br)
- [CEBRI - Centro Brasileiro de Relações Internacionais](https://cebri.org)

## Agradecimentos

- Next.js team pelo excelente framework
- Tailwind CSS pela excelente ferramenta de estilização
- Lucide pelos ícones
- Unsplash pelas imagens

---

Desenvolvido com Next.js e Tailwind CSS

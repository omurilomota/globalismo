# Padrão de Desenvolvimento - Globalismo

Este documento estabelece as regras e padrões para desenvolvimento do projeto Globalismo. Todos os contribuidores devem seguir estas diretrizes.

---

## 1. Sistema de Commits

### 1.1 Gitmoji + GitFlow

O projeto utiliza uma combinação de **Gitmoji** + **Conventional Commits** para criar um histórico de commits claro, intuitivo e automatizável.

**Estrutura do commit:**
```
<gitmoji> <tipo>(<escopo>): <descrição>

[corpo opcional]

[footer opcional]
```

**Exemplo completo:**
```
✨ feat(articles): adiciona компонент de artigos relacionados

Implementa a seção de artigos relacionados na página individual de artigos.
O componente busca artigos baseados em categorias e tags em comum.

Closes #123
```

**Exemplo simples:**
```
🐛 fix(header): corrige tema escuro no mobile
```

---

### 1.2 Gitmojs Disponíveis

Cada gitmoji tem um significado específico e deve ser usado adequadamente:

| Gitmoji | Código | Tipo | Quando usar |
|---------|--------|------|-------------|
| ✨ | `:sparkles:` | `feat` | Nova funcionalidade, feature ou comportamento |
| 🐛 | `:bug:` | `fix` | Correção de bug, falha ou erro |
| 📝 | `:memo:` | `docs` | Documentação (README, comentários, etc) |
| 💄 | `:lipstick:` | `style` | Estilos CSS, UI, Tailwind, formatação |
| ♻️ | `:recycle:` | `refactor` | Refatoração sem mudança de comportamento |
| ⚡️ | `:zap:` | `perf` | Melhoria de performance, otimização |
| ✅ | `:white_check_mark:` | `test` | Adição ou correção de testes |
| 🔧 | `:wrench:` | `chore` | Tarefas de manutenção, config, deps, build |
| 🌐 | `:globe_with_meridians:` | `i18n` | Internacionalização, traduções |
| ♿️ | `:wheelchair:` | `a11y` | Acessibilidade |
| 🚀 | `:rocket:` | `deploy` | Deploy, release, configuração de CI/CD |
| 🔒 | `:lock:` | `security` | Segurança, vulnerabilidades |
| 🎨 | `:art:` | `design` | Mudanças no design, UI/UX |
| 📦 | `:package:` | `deps` | Atualização de dependências |
| 🗑️ | `:wastebasket:` | `remove` | Remoção de código, arquivos |

---

### 1.3 Tipos de Commit

| Tipo | Descrição | Quando usar |
|------|-----------|-------------|
| `feat` | Nova funcionalidade | Adição de novas features, rotas, componentes |
| `fix` | Correção de bug | Bug fixes, correções de erros |
| `docs` | Documentação | Mudanças em docs, comentários JSDoc |
| `style` | Estilos | CSS, Tailwind, formatação de código |
| `refactor` | Refatoração | Mudanças que não alteram funcionalidade |
| `perf` | Performance | Otimizações, melhorias de performance |
| `test` | Testes | Adição ou correção de testes unitários |
| `chore` | Tarefas de manutenção | Configurações, build, dependências |

---

### 1.4 Escopos (Scopes)

O escopo indica **qual parte do projeto** foi afetada:

| Escopo | Descrição | Exemplos |
|--------|-----------|----------|
| `types` | Tipos TypeScript | Novas interfaces, tipos |
| `lib` | Biblioteca/utilitários | Funções em `/lib` |
| `utils` | Utilitários | Funções helpers |
| `layout` | Layout global | Header, Footer, layout raiz |
| `page` | Páginas | Novas páginas, mudanças em rotas |
| `articles` | Artigos | Componentes e lógica de artigos |
| `component` | Componentes genéricos | Componentes compartilhados |
| `ui` | Componentes UI | Botões, inputs, cards |
| `forms` | Formulários | Forms de contato, newsletter |
| `api` | Rotas de API | Endpoints, handlers |
| `seo` | SEO e metadados | Sitemap, robots, schemas |
| `hook` | Hooks personalizados | useFavorites, etc |
| `config` | Configurações | next.config, tailwind, env |
| `workflow` | CI/CD | GitHub Actions |
| `deps` | Dependências | package.json, npm install |

---

### 1.5 Regras do Commit

#### ✅ Título (Linha 1)

1. **Limite**: Máximo 72 caracteres
2. **Primeira letra minúscula** (exceto quando necessário)
3. **Impessoal**: Use "Adiciona", "Corrige", "Atualiza" (não "Adicionei", "Corrigi")
4. **Sem ponto final** no título
5. **Gitmoji no início** (obrigatório no nosso projeto)

#### ✅ Corpo (Opcional)

1. Separado do título por uma linha em branco
2. Limitado a 100 caracteres por linha
3. Explique **"o quê"** e **"por quê"**, não como
4. Use impessoal

#### ✅ Footer (Opcional)

1. Referências a issues: `Closes #123`, `Fixes #456`
2. Revisores: `Reviewed-by: @nome`
3. Breaking changes: `BREAKING CHANGE: descrição`

---

### 1.6 Exemplos de Commits

#### ✨ Nova funcionalidade
```
✨ feat(articles): adiciona paginação na listagem de artigos

Implementa componente de paginação com navegação por páginas.
Suporta filtros de categoria e busca mantendo estado.

Closes #45
```

#### 🐛 Correção de bug
```
🐛 fix(search): corrige busca vazia retornando todos artigos

O problema ocorria quando a busca tinha espaços extras.
Agora faz trim() antes de executar a query.
```

#### 📝 Documentação
```
📝 docs: adiciona README do componente ArticleCard

Explica props,用法 e exemplos de uso do componente.
```

#### ♻️ Refatoração
```
♻️ refactor(utils): extrai função de formatação de data

Cria a função formatDate() separadamente para reutilização
em múltiplos componentes.
```

#### 💄 Estilos
```
💄 style(home): ajusta espaçamento do grid de artigos

Aumenta gap de 4 para 6 para melhor separação visual
em telas de resolução média.
```

#### ⚡️ Performance
```
⚡️ perf(articles): otimiza busca com memoização

Adiciona useMemo para evitar recalculos desnecessários
na listagem de artigos filtrados.
```

#### ✅ Testes
```
✅ test(utils): adiciona testes para função slugify

Testa casos: texto normal, acentos, caracteres especiais,
múltiplos espaços.
```

#### 🔧 Chore
```
🔧 chore(deps): atualiza Next.js para v14.2

Também atualizadependências relacionadas.
```

---

## 2. Fluxo de Git (GitFlow)

### 2.1 Branchs

```
main (produção)
  │
  ├── develop (desenvolvimento)
  │     │
  │     ├── feature/nova-funcionalidade
  │     │
  │     ├── bugfix/correcao-bug
  │     │
  │     └── hotfix/correcao-urgente
```

| Branch | Propósito | Origin | Merge |
|--------|-----------|--------|-------|
| `main` | Produção/release | - | - |
| `develop` | Desenvolvimento | main | feature |
| `feature/*` | Novas funcionalidades | develop | develop |
| `bugfix/*` | Correção de bugs | develop | develop |
| `hotfix/*` | Correção urgente | main | main + develop |
| `release/*` | Preparação de release | develop | main + develop |

### 2.2 Fluxo de Trabalho

#### Criar nova feature
```bash
# 1. Atualize develop
git checkout develop
git pull origin develop

# 2. Crie branch de feature
git checkout -b feature/minha-nova-funcionalidade

# 3. Trabalhe e commite
git add .
git commit -m "✨ feat(component): adiciona novo componente"

# 4. Faça push e crie Pull Request
git push -u origin feature/minha-nova-funcionalidade
```

#### Criar hotfix
```bash
# 1. Crie branch de hotfix a partir de main
git checkout main
git pull origin main
git checkout -b hotfix/correcao-urgente

# 2. Corrija e commite
git commit -m "🐛 fix(critical): corrige erro crítico"

# 3. Merge em main E develop
git checkout main
git merge hotfix/correcao-urgente
git push origin main

git checkout develop
git merge hotfix/correcao-urgente
git push origin develop

# 4. Delete a branch
git branch -d hotfix/correcao-urgente
```

### 2.3 Nomenclatura de Branchs

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Feature | `feature/<descricao>` | `feature/adicionar-busca` |
| Bugfix | `bugfix/<descricao>` | `bugfix/corrigir-menu-mobile` |
| Hotfix | `hotfix/<descricao>` | `hotfix/corrigir-crash` |
| Release | `release/<versao>` | `release/v1.0.0` |
| Refactor | `refactor/<descricao>` | `refactor/api-artigos` |

---

## 3. Padrão de Código

### 3.1 Comentários JSDoc

Todo arquivo **deve** ter um comentário de arquivo JSDoc no topo:

```typescript
/**
 * @fileoverview Descrição breve do arquivo em 1-2 linhas
 * 
 * Explicação mais detalhada do que o arquivo faz,
 * suas dependências principais e propósito no projeto.
 * Pode ter múltiplas linhas para explicar contexto.
 * 
 * @module caminho/para/modulo
 * @author Globalismo
 * @version 1.0.0
 */
```

#### Funções e Componentes

```typescript
/**
 * Descrição clara do que a função faz
 * 
 * @function nomeDaFuncao
 * @param {tipo} paramNome - Descrição do parâmetro
 * @param {tipo} [parametroOpcional] - Descrição do opcional
 * @returns {tipo} Descrição do que retorna
 * @throws {Erro} Quando lança exceção
 * @example
 * const resultado = nomeDaFuncao('valor');
 */
function nomeDaFuncao(paramNome: tipo, parametroOpcional?: tipo): tipo {
  // implementação
}
```

#### Componentes React

```typescript
/**
 * Componente de exemplo com props específicas
 * 
 * @component
 * @param {ExampleProps} props - Propriedades do componente
 * @param {string} props.titulo - Título exibido no componente
 * @param {string} [props.subtitulo] - Subtítulo opcional
 * @param {boolean} [props.ativo=false] - Estado ativo
 * @returns {JSX.Element} Componente React
 * @example
 * <ExampleCard titulo="Meu Título" ativo={true} />
 */
export default function ExampleCard({ titulo, subtitulo, ativo = false }: ExampleProps) {
  return (
    <div className={ativo ? 'active' : ''}>
      <h1>{titulo}</h1>
      {subtitulo && <p>{subtitulo}</p>}
    </div>
  );
}
```

#### JSX (dentro de tags)

```tsx
{/* Container principal do componente de busca */}
<div className="search-container">
  
  {/* Input de busca com placeholder dinâmico */}
  <input 
    type="text"
    placeholder={placeholder}
  />
  
</div>
```

### 3.2 Tags JSDoc Comuns

| Tag | Descrição | Exemplo |
|-----|-----------|---------|
| `@fileoverview` | Descrição do arquivo | `@fileoverview Funções de API` |
| `@module` | Nome do módulo | `@module lib/articles` |
| `@author` | Autor | `@author Globalismo` |
| `@version` | Versão | `@version 1.0.0` |
| `@function` | Nome da função | `@function getArticleBySlug` |
| `@component` | Componente React | `@component Header` |
| `@param` | Parâmetro | `@param {string} nome - Descrição` |
| `@returns` | Retorno | `@returns {IArticle}` |
| `@example` | Exemplo de uso | `@example getBySlug('slug')` |
| `@throws` | Exceção | `@throws {Error} Se não encontrar` |
| `@see` | Referência | `@see getAllArticles` |
| `@since` | Versão de introdução | `@since 1.2.0` |
| `@deprecated` | Depreciado | `@deprecated Use novaFuncao` |

---

## 4. Estrutura de Arquivos

```
src/
├── app/                    # Páginas Next.js App Router (App Router)
│   ├── layout.tsx         # Layout raiz (provedores, fonts, SEO)
│   ├── page.tsx          # Home (/)
│   ├── globals.css        # Estilos globais Tailwind
│   ├── artigos/           # Rota /artigos
│   │   ├── page.tsx      # Listagem (/artigos)
│   │   └── [slug]/       # Rota dinâmica (/artigos/:slug)
│   │       └── page.tsx  # Artigo individual
│   ├── api/              # API Routes (/api/*)
│   ├── sobre/            # Página /sobre
│   ├── contato/          # Página /contato
│   ├── sitemap.ts        # Sitemap XML
│   ├── robots.ts         # Robots.txt
│   └── rss.xml/         # Feed RSS
│       └── route.ts
│
├── components/           # Componentes React
│   ├── layout/          # Componentes de layout
│   │   ├── Header.tsx   # Cabeçalho
│   │   └── Footer.tsx   # Rodapé
│   ├── articles/        # Componentes de artigos
│   │   ├── ArticleHero.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleContent.tsx
│   │   ├── ArticleActions.tsx
│   │   └── RelatedArticles.tsx
│   ├── ui/              # Componentes UI reutilizáveis
│   │   ├── CategoryTag.tsx
│   │   ├── SearchBar.tsx
│   │   ├── Pagination.tsx
│   │   ├── Newsletter.tsx
│   │   ├── TableOfContents.tsx
│   │   └── SearchWithHighlight.tsx
│   ├── forms/           # Formulários
│   │   └── ContactForm.tsx
│   └── seo/             # Schemas JSON-LD
│       ├── WebsiteSchema.tsx
│       ├── OrganizationSchema.tsx
│       └── BreadcrumbSchema.tsx
│
├── lib/                 # Funções utilitárias e lógica de negócio
│   ├── articles.ts      # Funções de acesso a artigos
│   └── utils.ts        # Funções helpers
│
├── hooks/              # Hooks personalizados React
│   └── useFavorites.ts # Gerenciamento de favoritos
│
├── types/              # Definições TypeScript
│   └── index.ts        # Interfaces e tipos
│
└── data/              # Dados estáticos
    └── artigos.json    # Banco de dados de artigos
```

---

## 5. Convenções de Nomeclatura

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componentes | PascalCase | `ArticleCard.tsx` |
| Funções | camelCase | `getAllArticles()` |
| Hooks | camelCase + use | `useFavorites.ts` |
| Utilitários | camelCase | `utils.ts` |
| Types/Interfaces | PascalCase | `IArticle.ts` |
| Constantes | UPPER_SNAKE | `ARTICLES_PER_PAGE` |
| Arquivos em geral | kebab-case | `minha-funcao.ts` |
| Componentes de página | PascalCase + Page | `ArtigosPage.tsx` |

---

## 6. Checklist Pré-Commit

Antes de fazer commit, verifique:

- [ ] **Commits atômicos**: Cada commit resolve uma coisa só
- [ ] **Mensagem clara**: Título explica o que foi feito
- [ ] **Testes passando**: `npm test` ou `npm run test`
- [ ] **Lint limpo**: `npm run lint` (se existir)
- [ ] **Typecheck**: `npm run typecheck` ou `npx tsc --noEmit`
- [ ] **Sem secrets**: Credenciais, keys não estão no código
- [ ] **Comentários JSDoc**: Arquivos novos têm documentação

---

## 7. Comandos Úteis

```bash
# Verificar status
git status

# Ver alterações
git diff

# Adicionar arquivos
git add .
git add -p  # interativo

# Commit com mensagem
git commit -m "✨ feat(component): descrição"

# Amend (apenas se não deu push!)
git commit --amend

# Criar branch
git checkout -b feature/minha-feature

# Mudar de branch
git checkout develop

# Merge de branch
git merge feature/minha-feature

# Rebase (mantém histórico linear)
git rebase develop

# Ver log bonito
git log --oneline --graph --decorate

# Stash (salvar alterações temporariamente)
git stash
git stash pop
```

---

## 8. Recursos Adicionais

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Gitmoji](https://gitmoji.dev/)
- [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)

---

**Última atualização**: Fevereiro 2026
**Versão**: 1.0.0

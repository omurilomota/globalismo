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
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React
- **Imagens**: Unsplash (CDN)
- **Hospedagem**: Vercel (recomendado)

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/omurilomota/globalismo.git

# Entrar no diretório
cd globalismo

# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev
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
│   │   └── layout.tsx         # Layout principal
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── articles/          # Componentes de artigos
│   │   └── ui/                # Componentes de UI
│   ├── lib/                   # Funções utilitárias
│   ├── data/                  # Dados JSON
│   └── types/                 # Tipos TypeScript
├── public/                     # Arquivos estáticos
├── next.config.ts              # Configuração Next.js
├── tailwind.config.ts          # Configuração Tailwind
└── package.json
```

## Páginas

| Página | URL | Descrição |
|--------|-----|-----------|
| Home | `/` | Página inicial com artigos em destaque |
| Artigos | `/artigos` | Listagem completa de artigos |
| Artigo | `/artigos/[slug]` | Página de artigo individual |
| Sobre | `/sobre` | Informações sobre o projeto |
| Contato | `/contato` | Formulário de contato |

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

## Contribuição

Contribuições são bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

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

---

Desenvolvido com Next.js e Tailwind CSS

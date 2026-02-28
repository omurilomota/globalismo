# Globalismo

> Um site informativo sobre globalização, geopolítica e economia global.

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/omurilomota/globalismo/releases/tag/v1.0.0)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 🚀 Demo

**[https://globalismo.com.br](https://globalismo.com.br)**

## 📖 Descrição

Globalismo é uma plataforma web dedicada à reflexão crítica sobre os impactos da globalização na economia, política, cultura e sociedade contemporânea. O projeto apresenta múltiplas perspectivas sobre o tema, sempre baseadas em fontes acadêmicas e jornalísticas confiáveis.

## ✨ Features

- 📝 **12 Artigos** sobre globalização, economia e geopolítica
- 💬 **Comentários** via Giscus (GitHub Issues)
- 🌓 **Dark Mode** automático
- 📱 **100% Responsivo** (mobile-first)
- 🔍 **Busca e Filtros** por categoria
- 📧 **Newsletter** e formulário de contato
- 🎨 **SEO Otimizado** (sitemap, RSS, schema.org)
- ⚡ **Performance** (Static Site Generation)
- 🔒 **Seguro** (headers, rate limiting, sanitização)
- 🆓 **100% Free** (sem serviços pagos, sem login)

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Next.js** | 14.2.28 | Framework React com SSG |
| **TypeScript** | 5.x | Type safety |
| **Tailwind CSS** | 4.x | Estilização utilitária |
| **Giscus** | 3.1.0 | Comentários (GitHub) |
| **Lucide React** | 0.575.0 | Ícones |

## 📦 Instalação

```bash
# Clonar repositório
git clone https://github.com/omurilomota/globalismo.git
cd globalismo

# Instalar dependências
npm install

# Desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## 🚀 Deploy (Vercel)

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório `omurilomota/globalismo`
3. Clique em **Deploy**

**Pronto!** Site no ar em segundos.

### Variáveis de Ambiente (Opcional)

Para ativar comentários Giscus:

```env
# .env.local
NEXT_PUBLIC_GISCUS_REPO="seu-usuario/globalismo"
NEXT_PUBLIC_GISCUS_REPO_ID="R_kgDO..."
NEXT_PUBLIC_GISCUS_CATEGORY="Comments"
NEXT_PUBLIC_GISCUS_CATEGORY_ID="DIC_kwDO..."
```

Obtenha as credenciais em: [giscus.app/pt](https://giscus.app/pt)

## 📁 Estrutura

```
globalismo/
├── src/
│   ├── app/                    # Páginas (App Router)
│   │   ├── api/               # APIs (contato, newsletter)
│   │   ├── artigos/           # Páginas de artigos
│   │   ├── contato/           # Página contato
│   │   ├── sobre/             # Página sobre
│   │   └── layout.tsx         # Layout raiz
│   ├── components/
│   │   ├── articles/          # Componentes de artigos
│   │   ├── forms/             # Formulários
│   │   ├── layout/            # Header, Footer
│   │   ├── seo/               # Schema.org
│   │   └── ui/                # UI components
│   ├── lib/                   # Utilitários
│   ├── data/                  # Dados JSON
│   └── types/                 # TypeScript types
├── public/                     # Estáticos
├── CHANGELOG.md               # Histórico de versões
└── .env.example               # Variáveis de ambiente
```

## 📄 Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Start servidor produção |
| `npm run lint` | ESLint |
| `npm run test` | Testes (Vitest) |
| `npm run test:run` | Testes (CI mode) |

## 📊 Status

- ✅ Build: Passando
- ✅ Testes: 25/25
- ✅ TypeScript: Sem erros
- ✅ ESLint: 2 warnings (anonymous exports)

## 📝 Artigos Incluídos

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

## ⚠️ Limitações (v1.0.0)

- **APIs de Contato/Newsletter**: Simulam envio. Para produção, integrar com SendGrid/Resend.
- **Comentários**: Requer configuração no Giscus (GitHub OAuth)
- **Analytics**: Não incluído (pode adicionar Google Analytics)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit (`git commit -m '✨ feat: nova funcionalidade'`)
4. Push (`git push origin feature/nova-funcionalidade`)
5. Pull Request

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autores

| | |
|---|---|
| **Murilo Mota** | **Matheus Pereira** |
| [@omurilomota](https://github.com/omurilomota) | [@MatheusPereira77](https://github.com/MatheusPereira77) |
| [@omurilomota](https://x.com/omurilomota) | |
| [LinkedIn](https://www.linkedin.com/in/murilo-henrique-622354358/) | |

## 🤝 Contribuidores

Agradecemos a todos que contribuem para o projeto! Veja como [contribuir](CONTRIBUTING.md).

## 🔗 Links Úteis

- [ONU](https://www.un.org)
- [FMI](https://www.imf.org)
- [Banco Mundial](https://www.worldbank.org)
- [OMC](https://www.wto.org)

---

**Feito com ❤️ usando Next.js e Tailwind CSS**

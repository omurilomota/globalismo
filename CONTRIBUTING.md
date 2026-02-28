# Contribuindo para o Globalismo

Obrigado por contribuir com o Globalismo! Este documento fornece diretrizes para contribuir com o projeto.

## Código de Conduta

Ao participar desta comunidade, você deve seguir o [Código de Conduta](CODE_OF_CONDUCT.md).

## Como Contribuir

### Reportando Bugs

1. Verifique se o bug já foi reportado
2. Crie uma issue com:
   - Descrição clara do bug
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots se aplicável

### Sugerindo Funcionalidades

1. Verifique se a funcionalidade já foi sugerida
2. Descreva a funcionalidade detalhada
3. Explique por que seria útil

### Pull Requests

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Faça suas alterações
4. Execute os testes: `npm run test:run`
5. Execute o lint: `npm run lint`
6. Commit suas mudanças seguindo Conventional Commits
7. Push para a branch
8. Abra um Pull Request

## Conventional Commits

Este projeto usa Conventional Commits com gitmoji:

```
🎨 style: adicionar novos estilos
🔧 chore: tarefas de manutenção
✨ feat: nova funcionalidade
🐛 fix: correção de bug
🧪 test: adicionar testes
📦 build: alterações em build
🚀 refactor: refatoração de código
✏️ docs: documentação
🔒 sec: segurança
🌐 i18n: internacionalização
```

Exemplo:
```
✨ feat: adicionar módulo de newsletter
```

## Style Guide

- Use TypeScript para novos arquivos
- Use Functional Components com React Hooks
- Siga as convenções de nomenclatura do projeto
- Adicione JSDoc em funções exported
- Mantenha a acessibilidade em mente

## Testes

- Execute os testes antes de submeter: `npm run test:run`
- Adicione testes para novas funcionalidades
- Mantenha a cobertura de código

## Commits

- Máximo de 1 linha por commit
- Use gitmoji no início
- Seja descritivo mas conciso

Exemplos:
```
✨ feat: adicionar componente de newsletter
🔧 chore: atualizar dependências
🐛 fix: corrigir erro de renderização
```

## License

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a MIT License.

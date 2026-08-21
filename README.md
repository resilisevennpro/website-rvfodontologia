# RVF Odontologia Estética

Site institucional da RVF Odontologia Estética — Içara, SC.

## Estrutura

Página inicial em formato de árvore de links (destino do bio do Instagram) e duas
landing pages de conversão:

| Rota | Conteúdo |
|---|---|
| `/` | Hub com acesso a lentes, implantes, clínico geral e localização |
| `/lentes` | Landing — lentes em resina |
| `/implantes` | Landing — implantes dentários |

## Stack

Vite · React 18 · TypeScript · Tailwind CSS · shadcn/ui · React Router

## Desenvolvimento

```bash
npm install
npm run dev      # servidor local com HMR
npm run lint     # análise estática
npm run test     # testes (vitest)
npm run build    # build de produção
```

## Conteúdo

Todo dado do cliente vive em `src/content/` — nenhum texto ou informação institucional
é escrito diretamente em componente:

- `site.ts` — dados da clínica, SEO e links de WhatsApp
- `home.ts` — árvore de links da página inicial
- `lentes.ts` / `implantes.ts` — copy das landings

## Documentação do projeto

- `CLAUDE.md` — regras de trabalho, incluindo as restrições de publicidade odontológica
- `PLANO-REFATORACAO.md` — fases, decisões e pendências
- `COPY.md` — copy aprovada

## Deploy

Vercel. O `vercel.json` configura o rewrite de SPA, necessário para que as rotas
funcionem em acesso direto e refresh.

# RVF Odontologia — regras do projeto

## Fluxo de trabalho

- **`npm run build` só antes de commit, ou quando o usuário pedir.** Não rodar build a
  cada alteração de layout ou copy — o feedback visual vem do dev server (`npm run dev`),
  que já tem HMR.
- `npm run lint` pode ser rodado pontualmente nos arquivos alterados.
- Os 3 erros de lint em `src/components/ui/` e `tailwind.config.ts` são **preexistentes**
  (primitivos shadcn e `require()` do Tailwind). Não corrigir junto com outras tarefas.

## Conteúdo

- Nenhum dado de cliente é escrito em componente. Tudo passa por `src/content/`:
  - `site.ts` — dados institucionais, SEO, WhatsApp
  - `home.ts` — árvore de links da página inicial
  - `lentes.ts` / `implantes.ts` — copy das landings
- Pendências reais ficam marcadas com `TODO:` no arquivo de conteúdo, nunca preenchidas
  com dado inventado.

## Rotas espelho de anúncio

`/implantes` e `/implantes/ads` são **a mesma página**, servida em duas rotas. A `/ads`
é a landing dos anúncios do Google; a única diferença permitida entre elas é a mensagem
que abre no WhatsApp, que é como a clínica separa quem veio do anúncio de quem veio do
orgânico.

- As duas rotas renderizam `src/pages/Implantes.tsx`, que recebe `origin` e `seo` como
  props. Qualquer alteração de layout ou copy feita ali já vale para as duas.
- **Nunca duplicar a página** para customizar uma das rotas. Se algo precisar mudar só
  na `/ads`, avisar antes: por definição, elas ficam visualmente idênticas.
- A `/ads` é `noindex` com canonical para `/implantes` e fica **fora do sitemap**. Não é
  página de SEO, é destino de anúncio, e indexá-la faria as duas competirem na busca.
- Novas rotas espelho precisam ser registradas em `MIRRORS`, em `Navbar.tsx`, senão o
  menu não reconhece a página atual.

## Publicidade odontológica (CFO)

A copy do site é regulada. Ao editar textos, manter:

- Sem promessa de resultado ("garantimos", "sorriso perfeito").
- Sem preço, promoção ou contagem regressiva como chamariz.
- Antes e depois exige autorização escrita da paciente + a ressalva de que resultados
  variam (`RESULTS_DISCLAIMER` em `lentes.ts`).
- Especialidade só pode ser citada se registrada no CRO.
- Rodapé sempre com RT + CRO + EPAO (`LEGAL_SIGNATURE` em `site.ts`).

## Identidade visual

- Paleta monocromática oficial: grafite `#1E1E1E`, cinza `#727272`, off-white `#F2EFE8`.
- **O off-white é a base do site** — o "papel". Grafite e cinza entram como destaque:
  botões, blocos de CTA, hero, rodapé, títulos e detalhes. O cinza `#727272` é cor de
  marca, não superfície de leitura; usá-lo como fundo geral deixa a página pesada.
- O cinza `#727272` **não** serve para corpo de texto pequeno (~4.3:1 sobre off-white).
  Usar `--muted-foreground`; o cinza da marca fica em `--brand-gray` para bordas,
  ícones, ênfase de título e texto grande.
- Cards sobre o off-white precisam de **contorno** (`border-foreground/10`), não só de
  sombra — as sombras são discretas de propósito, para não sujar o fundo claro.
- Sobre superfícies grafite (hero, CTA, rodapé), inverter para `text-primary-foreground`;
  a ênfase de título vira `text-primary-foreground/55`.
- Tipografia: Cormorant Garamond (display) + Inter (corpo). A fonte Tropical Avenue da
  ID visual é *personal use only* e **não pode** ser embarcada no site.

## Documentos de referência

- `PLANO-REFATORACAO.md` — fases, pendências e decisões
- `COPY.md` — copy aprovada, com as regras do CFO documentadas

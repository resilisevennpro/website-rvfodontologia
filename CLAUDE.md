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
- O cinza `#727272` **não** serve para corpo de texto pequeno (~4.3:1 sobre off-white).
  Usar `--muted-foreground`; o cinza da marca fica em `--brand-gray` para bordas,
  ícones e texto grande.
- Tipografia: Cormorant Garamond (display) + Inter (corpo). A fonte Tropical Avenue da
  ID visual é *personal use only* e **não pode** ser embarcada no site.

## Documentos de referência

- `PLANO-REFATORACAO.md` — fases, pendências e decisões
- `COPY.md` — copy aprovada, com as regras do CFO documentadas

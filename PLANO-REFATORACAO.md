# Plano de Refatoração — RVF Odontologia

> **Contexto:** este repositório é uma cópia do site da Dra. Gabrielle Leão (outro cliente).
> Todo o conteúdo, identidade visual e estrutura de páginas pertencem a ela e precisam ser
> substituídos. A stack técnica é mantida integralmente.

**Data:** 21/08/2026
**Branch:** `main`

---

## 1. Decisões já tomadas

| Item | Decisão |
|---|---|
| Stack | **Mantida.** Vite + React 18 + TypeScript + Tailwind + shadcn/ui + react-router-dom |
| Layout | **Novo do zero.** Componentes de seção atuais são descartados |
| Arquitetura | **Multi-rota.** Deixa de ser single-page |
| Materiais do cliente | Parciais — o que faltar entra como placeholder marcado `TODO:` |
| Dependências novas | Nenhuma |
| Deploy | **Vercel** |
| Domínio | `https://rvfodontologia.com.br` |
| Repositório | `https://github.com/resilisevenn/website-rvf-odontologia.git` (vazio — primeiro push pendente) |

### Dados do cliente confirmados

| Dado | Valor |
|---|---|
| Nome | RVF Odontologia Estética |
| Instagram | `https://www.instagram.com/rvf.odontologia/` |
| Google Maps | [RVF Odontologia](https://www.google.com/maps/place/RVF+Odontologia/@-28.7136529,-49.3027609,808m/data=!3m2!1e3!4b1!4m6!3m5!1s0x95217f6bc9decd3b:0xa7b594d23d895c7e!8m2!3d-28.7136529!4d-49.300186!16s%2Fg%2F11wtf39s2s) — coordenadas `-28.7136529, -49.300186` (região de Criciúma/SC) |
| Região | **Santa Catarina** (confirmado) |

> **Atenção — mudança de região:** o site antigo é de Brasília-DF. O RVF fica em Santa
> Catarina. Todas as metas `geo.*`, o JSON-LD e a copy precisam refletir a nova
> localidade. Endereço textual completo ainda pendente.

### Identidade visual (recebida em `public/`)

**Paleta oficial** — `public/paleta-de-cores.png`:

| Cor | HEX | HSL | Uso previsto |
|---|---|---|---|
| Grafite | `#1E1E1E` | `0 0% 12%` | Texto principal, fundos escuros, botões primários |
| Cinza médio | `#727272` | `0 0% 45%` | Texto secundário, bordas, estados desabilitados |
| Off-white | `#F2EFE8` | `40 25% 93%` | Fundo padrão do site |

Paleta **monocromática quente**, sem cor de destaque. O contraste `#1E1E1E` sobre
`#F2EFE8` é confortavelmente AAA. Atenção ao `#727272`: sobre off-white fica em ~4.3:1,
então serve para texto grande mas **não** para corpo de texto pequeno — nesses casos usar
grafite com opacidade reduzida.

**Kit de logo** — 18 PNGs (`01-02.png` … `01-18.png`, `01_Prancheta 1.png`), 2250×2250,
fundo transparente. Combinações identificadas:

- **Horizontal** — monograma + "ODONTOLOGIA ESTÉTICA" à direita
- **Vertical/empilhado** — monograma acima, texto centralizado abaixo
- **Composto** — monograma grande com o texto encaixado no contrapunção do "F"
- Cada arranjo em grafite, off-white e cinza — para fundo claro e escuro

Ação da Fase 3: identificar as 3–4 variações realmente usadas, renomeá-las
semanticamente (ex.: `logo-horizontal-grafite.png`) e descartar o resto de `public/`,
que hoje polui a raiz servida.

**Tipografia** — `public/Tropical Avenue Font/tropicalavenuepersonaluseon-xg4dd.otf`

> **🚫 Licença bloqueia o uso.** O nome do arquivo declara `personaluseon` — *personal use
> only*. Um site de clínica é uso comercial, e `@font-face` ainda distribui o arquivo
> publicamente. **A fonte não pode ser embarcada no site.**
>
> O arquivo `.otf` **não deve** ir para o repositório nem para `public/` — remover na Fase 3.

**✅ Decisão tomada:** substituir por webfont de licença aberta.

Par tipográfico de **duas famílias**, com papéis bem separados:

| Papel | Fonte | Onde aparece |
|---|---|---|
| **Display** | **Cormorant Garamond** | Títulos de seção, headlines, nome da clínica, números de destaque |
| **Corpo** | **Inter** | Parágrafos, botões, labels, menu, rodapé, FAQ |
| *Detalhe* | *Cormorant Garamond itálico* | Legendas de antes/depois, citações de depoimentos |

A serifada display de alto contraste é a mais próxima do espírito da Tropical Avenue e do
logo, dando o tom sofisticado nos títulos; a sans neutra garante legibilidade no texto
corrido. O itálico da mesma família cria um terceiro nível de hierarquia sem custo de
carregamento extra.

Regra: **serifada nunca em parágrafo, sans nunca em headline.** Os tokens
`font-display` / `font-body` / `font-accent` já existem em `tailwind.config.ts` e serão
reaproveitados, apenas trocando os valores.

Alternativa registrada para o display: **Playfair Display** — mais encorpada, segura
melhor em corpos pequenos, caso a Cormorant se mostre frágil demais na implementação.

O logo permanece imagem, preservando a Tropical Avenue na assinatura da marca. A
identidade se sustenta pelo logo e pela paleta; a diferença nos títulos é sutil.

> **Pendência aberta (não bloqueia o site):** confirmar com quem criou a ID visual se a
> Tropical Avenue foi licenciada na criação do logo. Se não foi, o problema antecede o
> site e o cliente deve saber.
>
> Se o cliente optar por licenciar a fonte depois, a troca é um commit — a tipografia
> está centralizada no design system da Fase 3.

### Performance: imagens, fontes e terceiros

O PageSpeed mobile de `/implantes` marcava 49 (LCP 10,6 s). As decisões tomadas para
resolver, e o porquê de cada uma:

**Os originais das fotos não ficam em `public/`.** Ficam em `fotos-originais/`,
versionados, e `npm run images` gera as variantes WebP em `public/img/`. O Vite copia
`public/` inteiro para o `dist`: com os originais lá dentro, ~14 MB de arquivos que
nenhuma página referencia iam para o deploy a cada publicação. Foto nova só aparece no
site depois de rodar `npm run images`.

**Não há fallback em JPEG/PNG nas `<picture>`.** O build tem alvo ES2020; todo navegador
capaz de rodar o site suporta WebP (Safari 14+, de 2020). Um fallback só existiria para
navegadores que já não conseguem executar o bundle.

**`onlyAbove` / `onlyBelow` no `<Foto>`.** `hidden lg:block` esconde, mas não cancela o
download: o celular baixava a foto do desktop *e* a do mobile. As duas props restringem
a fonte por `media`, e aí o navegador busca só a que vai exibir.

**A `<picture>` usa `display:contents`.** As classes dos heros misturam layout
(`lg:absolute`, `lg:w-[70%]`) e pintura (`object-cover`, `-scale-x-100`, `mask-image`) na
mesma string. Com `display:contents` a `<picture>` some da árvore de layout e o `<img>`
segue sendo, para o CSS, filho direto do container — foi o que permitiu trocar `<img>`
por `<Foto>` sem reescrever nenhuma classe.

**GTM adiado até interação ou 3 s de idle.** O container puxa ~485 KiB competindo com o
LCP. O `dataLayer` é criado na hora, então nada de evento se perde. Contrapartida
conhecida: sessão que abre e fecha em menos de 3 s sem tocar na tela não registra
pageview — o GA4 vai mostrar menos sessões de bounce imediato. Conversão (clique no
WhatsApp) é interação por definição e não é afetada. **Vale avisar o cliente antes de
ele estranhar o número.**

**`vercel.json` não aceita comentários.** O schema tem `additionalProperties: false`;
chaves `"//"` fazem a Vercel rejeitar o deploy. Por isso o cache de `/img/(.*)`
(`immutable`, 1 ano) está documentado aqui e não no arquivo.

**O rewrite `/(.*)` → `/index.html` não anula o pré-render.** Verificado em produção: o
arquivo estático tem precedência, e `/lentes` e `/implantes` servem o HTML pré-renderizado
com título e canonical próprios.

### Arquitetura de rotas

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | Árvore de links | Página-hub enxuta, mobile-first (destino do bio do Instagram). Logo, nome e 4 acessos: **Lentes** → `/lentes`, **Implantes** → `/implantes`, **Clínico Geral** → WhatsApp, **Localização** → Google Maps. Rodapé com WhatsApp e Instagram |
| `/lentes` | Landing de conversão | Hero, benefícios, antes/depois, processo, prova social, FAQ, CTA WhatsApp |
| `/implantes` | Landing de conversão | Mesma espinha estrutural, com copy e objeções próprias de implante |
| `*` | 404 | Mensagem curta + retorno para `/` |

---

## 2. Inventário do que existe hoje

### Descartar

| Caminho | Motivo |
|---|---|
| `src/components/site/` (14 arquivos) | Seções da Dra. Gabrielle: `Hero`, `About`, `BeforeAfter`, `BookingCTA`, `Clareamento`, `Footer`, `HowItWorks`, `InstagramFeed`, `Navbar`, `RecontornoEstetico`, `Services`, `Testimonials`, `TrustBar`, `WhatsAppFab` |
| `src/assets/` (29 imagens) | Fotos da profissional e casos clínicos do outro cliente — **não podem ser reutilizados** |
| `src/App.css` | CSS legado do template Vite, não usado |
| `src/components/NavLink.tsx` | Acoplado à navegação por âncora da single-page |
| `src/pages/Index.tsx` | Será reescrito como árvore de links |
| `public/favicon.png` | Favicon do outro cliente |

### Manter intacto

- `src/components/ui/` — 46 primitivos shadcn, neutros e reaproveitáveis
- `src/hooks/use-mobile.tsx`, `src/hooks/use-toast.ts`
- `src/lib/utils.ts`
- Toda a configuração de build: `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `postcss.config.js`, `vitest.config.ts`

### Reescrever

- `src/App.tsx` — adicionar as rotas `/lentes` e `/implantes`
- `src/index.css` — tokens de tema (hoje: paleta dourado/creme da Dra. Gabrielle)
- `tailwind.config.ts` — `fontFamily`, `backgroundImage`, `boxShadow` derivados da paleta antiga
- `src/hooks/useReveal.ts` — avaliar se o novo layout usa animação de scroll reveal
- `src/lib/whatsapp.ts` — absorvido por `src/content/site.ts`
- `index.html` — título, metas, OG, canonical, JSON-LD
- `public/robots.txt`, `public/sitemap.xml` — apontam para `dragabrielleleao.com`

### Resquícios rastreados

Referências ao cliente antigo confirmadas em:

- `index.html` — título, description, author, canonical, OG/Twitter, JSON-LD com **2 endereços** (Alameda Shopping/Taguatinga e DF Century Plaza/Águas Claras), telefone `+5561999845810`, Instagram `@dra.gabrielleleao`, `FAQPage` com 5 perguntas
- `src/lib/whatsapp.ts` — número `5561999845810` e mensagem citando "Dra. Gabrielle"
- `src/pages/Index.tsx` — `document.title` e meta description duplicados no `useEffect`
- `public/robots.txt` — `Sitemap: https://dragabrielleleao.com/sitemap.xml`
- `public/sitemap.xml` — URL única do domínio antigo
- `src/components/site/*` — copy e depoimentos ao longo de todos os arquivos

---

## 3. Fases de execução

### Fase 1 — Limpeza

Remover `src/components/site/`, `src/assets/`, `src/App.css`, `src/components/NavLink.tsx` e `public/favicon.png`.

Após a remoção o build quebra intencionalmente (imports órfãos em `Index.tsx`) — a Fase 4 restaura.

**Saída:** repositório sem nenhum ativo do cliente anterior.

---

### Fase 2 — Camada de conteúdo

Criar `src/content/site.ts` como **fonte única de verdade** de todo dado do cliente:

- Nome da clínica, tagline, domínio
- WhatsApp: número + mensagem contextual por origem (`/`, lentes, implantes, clínico geral)
- Instagram, endereço, link do Google Maps, horário de atendimento
- Dados de SEO por rota: title, description, canonical, OG

Criar `src/content/lentes.ts` e `src/content/implantes.ts` com o conteúdo de cada landing (hero, benefícios, etapas do processo, FAQ, depoimentos).

Tudo que ainda não foi fornecido entra como `TODO:` explícito — concentrando as pendências em três arquivos em vez de espalhá-las pelo código.

**Saída:** nenhum dado de cliente hardcoded em componente.

---

### Fase 3 — Design system

Aplicar a identidade recebida em `src/index.css` (tokens HSL em `:root`) e `tailwind.config.ts`:

- Substituir a paleta dourado/creme pelos três tons oficiais (grafite / cinza / off-white)
- Remover os tokens `--gradient-gold`, `--gradient-cream`, `--shadow-gold*` e os
  gradientes radiais dourados aplicados ao `body`
- Sombras neutras, derivadas do grafite — a marca é sóbria, sem brilho
- Tipografia: definir Tropical Avenue para títulos (condicionada à licença) + uma
  sans neutra para corpo, substituindo Playfair/Inter/Cormorant
- Curar o kit de logo: manter as 3–4 variações usadas com nomes semânticos em
  `src/assets/`, remover os 18 PNGs soltos de `public/`

**Saída:** tema monocromático aplicado, sem resquício da paleta dourada.

---

### Fase 4 — Rotas e layout base

- `src/App.tsx`: registrar `/lentes` e `/implantes` acima do catch-all
- `src/components/Seo.tsx`: componente por página, gerenciando `title`, `description`, `canonical`, OG e JSON-LD — eliminando a duplicação atual entre `index.html` e o `useEffect` de `Index.tsx`
- `src/components/WhatsAppFab.tsx`: reescrito, mensagem contextual conforme a rota
- `src/pages/NotFound.tsx`: ajustar copy e link de retorno

**Saída:** build volta a passar; as 3 rotas respondem.

---

### Fase 5 — Página `/` (árvore de links)

Componente leve e mobile-first: card central, logo, nome, botões grandes de toque confortável, rodapé com WhatsApp e Instagram.

Prioridades: peso mínimo de JS/imagem, contraste acessível, alvos de toque ≥ 44px.

**Saída:** hub funcional, pronto para o bio do Instagram.

---

### Fase 6 — Landings `/lentes` e `/implantes`

Seções compartilhadas e **parametrizadas por props**, alimentadas pelos arquivos de conteúdo da Fase 2 — evitando duplicar código entre as duas páginas:

`Hero` · `Beneficios` · `AntesDepois` · `Processo` · `ProvaSocial` · `Faq` · `CtaFinal`

Cada landing monta as seções na ordem que fizer sentido para o seu funil.

**Saída:** duas landings de conversão completas.

---

### Fase 7 — SEO / AEO / GEO

- `index.html`: título, metas, OG/Twitter, canonical, `geo.*` do novo domínio e localidade
- JSON-LD: `Dentist` com o(s) endereço(s) reais do RVF + `FAQPage` por landing
- `public/sitemap.xml`: 3 URLs (`/`, `/lentes`, `/implantes`)
- `public/robots.txt`: atualizar diretiva `Sitemap:` — a lista de crawlers de IA já existente é boa e permanece
- Novo `public/favicon.png` e `apple-touch-icon`

**Saída:** zero referência ao domínio `dragabrielleleao.com`.

---

### Fase 8 — Deploy e verificação

- **Rewrite de SPA** (crítico): com rotas reais, `/lentes` retorna 404 no refresh. Criar `vercel.json` com rewrite de `/(.*)` para `/index.html`
- **Primeiro push:** o repositório remoto está vazio. Adicionar o remote `resilisevenn/website-rvf-odontologia` e publicar a `main`
- **Vercel:** conectar o repositório, confirmar preset Vite (`npm run build` → `dist/`) e apontar o domínio `rvfodontologia.com.br`
- `npm run build` e `npm run lint` limpos
- `npm run test` — `src/test/example.test.ts` é o único teste existente
- **Varredura final:** `grep -ri "gabrielle\|dragabrielleleao\|5561999845810" .` deve retornar apenas este documento
- Conferir responsividade e os links de WhatsApp em dispositivo real

**Saída:** site publicável.

---

## 4. Ordem e paralelismo

```
Fase 1 → Fase 2 → Fase 4 → Fases 5 e 6 → Fase 7 → Fase 8
                     ↑
                  Fase 3 (design system — pode correr em paralelo às Fases 1–2,
                          mas precisa estar pronta antes das Fases 5–6)
```

As Fases 1, 2, 4, 5 e 6 podem avançar com placeholders enquanto os materiais do cliente são reunidos.

---

## 5. Pendências que bloqueiam

| # | Pendência | Bloqueia |
|---|---|---|
| 1 | **Número de WhatsApp** — destino de praticamente todos os CTAs do site | Fase 2 |
| 2 | **Licença web da fonte Tropical Avenue** — se não permitir `@font-face`, adotar substituta do Google Fonts | Fase 3 |
| 3 | Endereço textual completo (rua, número, cidade, CEP) e horário de atendimento | Fases 2 e 7 |
| 4 | Fotos próprias da clínica e casos de antes/depois | Fase 6 |
| 5 | Textos institucionais e depoimentos reais | Fases 2 e 6 |

**Resolvidos:** Instagram · Google Maps · domínio · deploy · repositório · região ·
paleta oficial · kit de logo.

**Itens desejáveis (não bloqueiam):**

- **Logo em SVG** — os PNGs 2250×2250 funcionam, mas SVG escala melhor e pesa menos.
  Exportável do `02.ai` no drive de ID Visual. Fica como melhoria posterior.
- **Favicon dedicado** — recortar o monograma "RVF" isolado de um dos PNGs, em 512×512.
  O subtítulo "ODONTOLOGIA ESTÉTICA" fica ilegível em 32px, então o favicon precisa ser
  só o monograma.

**Nota sobre imagens:** as 29 imagens em `src/assets/` são da Dra. Gabrielle — fotos da
profissional e casos clínicos de pacientes dela. Não há reaproveitamento possível,
nem parcial. Enquanto as fotos do RVF não chegarem, as landings usam placeholders.

---

## 6. Riscos

| Risco | Mitigação |
|---|---|
| Conteúdo residual do outro cliente em produção | Varredura por `grep` na Fase 8 + revisão manual da copy |
| `/lentes` e `/implantes` com 404 no refresh | Rewrite de SPA configurado na Fase 8, testado em preview antes do domínio |
| Duplicação de código entre as duas landings | Seções parametrizadas por props (Fase 6), conteúdo isolado em `src/content/` |
| Título/description divergentes entre `index.html` e React | Centralizados no componente `<Seo>` (Fase 4) |
| Peso da página `/` | Hub deliberadamente enxuto; sem carrossel, sem imagens pesadas |

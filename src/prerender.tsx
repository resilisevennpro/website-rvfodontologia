import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Lentes from "./pages/Lentes";
import Implantes from "./pages/Implantes";
import NotFound from "./pages/NotFound";
import { SEO, CLINIC, OG_IMAGE } from "./content/site";
import { clinicSchema } from "./content/schema";
import { faqSchema, serviceSchema, breadcrumbSchema, graph } from "./content/schema";
import { LENTES } from "./content/lentes";
import { IMPLANTES } from "./content/implantes";

/**
 * Entrada de pré-renderização, usada só no build.
 *
 * O site é uma SPA: sem isto, o HTML servido é uma `div` vazia e todo o
 * conteúdo depende de JavaScript. O Google até renderiza, mas os crawlers de
 * IA (GPTBot, PerplexityBot, ClaudeBot) não executam JS — leriam uma página em
 * branco. O mesmo vale para o preview de link no WhatsApp e no Instagram.
 *
 * Aqui cada rota é renderizada para HTML estático, com as meta tags e o JSON-LD
 * já no `<head>`. O React assume a página depois, no navegador, sem mudança
 * para o visitante.
 */

/** Metadados por rota. Espelham o que o componente `Seo` injeta em runtime. */
const ROUTE_META = {
  "/": {
    ...SEO.home,
    jsonLd: clinicSchema,
  },
  "/lentes": {
    ...SEO.lentes,
    jsonLd: graph(
      clinicSchema,
      serviceSchema({
        path: "/lentes",
        name: "Lentes de resina e porcelana",
        description: SEO.lentes.description,
      }),
      faqSchema("/lentes", LENTES.faq.items),
      breadcrumbSchema("/lentes", "Lentes e Facetas"),
    ),
  },
  "/implantes": {
    ...SEO.implantes,
    jsonLd: graph(
      clinicSchema,
      serviceSchema({
        path: "/implantes",
        name: "Implantes dentários",
        description: SEO.implantes.description,
        procedureType: "https://schema.org/SurgicalProcedure",
      }),
      faqSchema("/implantes", IMPLANTES.faq.items),
      breadcrumbSchema("/implantes", "Implantes"),
    ),
  },
  /* O espelho de anúncios repete o schema da original de propósito: é a mesma
     clínica e o mesmo serviço. O que o mantém fora do índice é o `noindex` e o
     canonical de `SEO.implantesAds`. */
  "/implantes/ads": {
    ...SEO.implantesAds,
    jsonLd: graph(
      clinicSchema,
      serviceSchema({
        path: "/implantes",
        name: "Implantes dentários",
        description: SEO.implantes.description,
        procedureType: "https://schema.org/SurgicalProcedure",
      }),
      faqSchema("/implantes", IMPLANTES.faq.items),
      breadcrumbSchema("/implantes", "Implantes"),
    ),
  },
} as const;

/*
 * Imagem do LCP de cada rota, pré-carregada.
 *
 * O PageSpeed acusava "a solicitação não é detectável no documento inicial": a
 * foto do hero só aparece depois do React hidratar, então o navegador não
 * podia começar a baixá-la durante o parse do HTML. O `preload` com
 * `imagesrcset` antecipa isso e ainda deixa o navegador escolher a mesma
 * variante que o `<Foto>` pediria.
 *
 * Manter em sincronia com o `sizes` do hero em `sections.tsx` e com as
 * larguras de `imagens.json`: divergência aqui faz o navegador baixar uma
 * variante e usar outra, dobrando o custo em vez de reduzi-lo.
 */
const LCP_POR_ROTA: Record<string, { base: string; larguras: number[] }> = {
  "/": { base: "/img/hero-equipe", larguras: [640, 1024] },
  "/lentes": { base: "/img/dr-vinicius-01", larguras: [640, 1024, 1600] },
  "/implantes": { base: "/img/dr-vinicius-02", larguras: [640, 1024, 1600] },
  /* Mesmo hero da original: é a mesma página. */
  "/implantes/ads": { base: "/img/dr-vinicius-02", larguras: [640, 1024, 1600] },
};

const HERO_SIZES = "(min-width: 1024px) 70vw, 100vw";
/* A home é grid de 2 colunas no desktop, não hero de 70%. */
const HOME_SIZES = "(min-width: 1024px) 50vw, 100vw";

function preloadLcp(url: string) {
  const lcp = LCP_POR_ROTA[url];
  if (!lcp) return [];
  return [
    {
      type: "link",
      props: {
        rel: "preload",
        as: "image",
        type: "image/webp",
        imagesrcset: lcp.larguras.map((l) => `${lcp.base}-${l}.webp ${l}w`).join(", "),
        imagesizes: url === "/" ? HOME_SIZES : HERO_SIZES,
        fetchpriority: "high",
      },
    },
  ];
}

/** Escapa o JSON-LD para não fechar o `<script>` cedo demais. */
function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export async function prerender({ url }: { url: string }) {
  /* A árvore espelha a de `App.tsx`: qualquer provider a mais aqui mudaria o
     HTML gerado e daria descasamento na hidratação. */
  const html = renderToString(
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lentes" element={<Lentes />} />
        <Route path="/implantes" element={<Implantes />} />
        <Route
          path="/implantes/ads"
          element={<Implantes origin="implantesAds" seo={SEO.implantesAds} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </StaticRouter>,
  );

  const meta = ROUTE_META[url as keyof typeof ROUTE_META];
  if (!meta) return { html };

  /* Páginas espelho (ex.: /implantes/ads) creditam a landing original em vez
     de disputarem a mesma busca com ela. */
  const canonicalPath = "canonicalPath" in meta ? meta.canonicalPath : meta.path;
  const canonical = `${CLINIC.domain}${canonicalPath}`;
  const noindex = "noindex" in meta && meta.noindex;
  const ogImage = OG_IMAGE;

  return {
    html,
    head: {
      lang: "pt-BR",
      title: meta.title,
      elements: new Set([
        ...preloadLcp(url),
        {
          type: "meta",
          props: {
            name: "robots",
            content: noindex ? "noindex, follow" : "index, follow",
          },
        },
        { type: "meta", props: { name: "description", content: meta.description } },
        { type: "link", props: { rel: "canonical", href: canonical } },
        { type: "meta", props: { property: "og:title", content: meta.title } },
        { type: "meta", props: { property: "og:description", content: meta.description } },
        { type: "meta", props: { property: "og:url", content: canonical } },
        { type: "meta", props: { property: "og:image", content: ogImage } },
        /* Dimensões declaradas: alguns leitores de preview montam o cartão
           antes de baixar a imagem, e sem elas erram o recorte na primeira
           exibição. */
        { type: "meta", props: { property: "og:image:width", content: "1200" } },
        { type: "meta", props: { property: "og:image:height", content: "630" } },
        {
          type: "meta",
          props: { property: "og:image:alt", content: `Equipe da ${CLINIC.name}` },
        },
        { type: "meta", props: { name: "twitter:title", content: meta.title } },
        { type: "meta", props: { name: "twitter:description", content: meta.description } },
        { type: "meta", props: { name: "twitter:image", content: ogImage } },
        /* O conteúdo do script vai em `children`: o plugin escapa valores de
           atributo, mas repassa os filhos crus, que é o necessário para o
           JSON-LD não sair com entidades HTML. */
        {
          type: "script",
          props: { type: "application/ld+json" },
          children: safeJsonLd(meta.jsonLd),
        },
      ]),
    },
  };
}

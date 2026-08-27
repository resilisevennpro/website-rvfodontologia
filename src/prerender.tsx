import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
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
} as const;

/** Escapa o JSON-LD para não fechar o `<script>` cedo demais. */
function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export async function prerender({ url }: { url: string }) {
  /* `QueryClient` novo a cada rota: um cliente compartilhado carregaria estado
     de uma página para a outra durante o build. */
  const queryClient = new QueryClient();

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StaticRouter location={url}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lentes" element={<Lentes />} />
            <Route path="/implantes" element={<Implantes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </StaticRouter>
      </TooltipProvider>
    </QueryClientProvider>,
  );

  const meta = ROUTE_META[url as keyof typeof ROUTE_META];
  if (!meta) return { html };

  const canonical = `${CLINIC.domain}${meta.path}`;
  const ogImage = OG_IMAGE;

  return {
    html,
    head: {
      lang: "pt-BR",
      title: meta.title,
      elements: new Set([
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

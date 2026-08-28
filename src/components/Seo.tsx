import { useEffect } from "react";
import { CLINIC, OG_IMAGE } from "@/content/site";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  /**
   * Canonical diferente da própria rota. Usado por páginas espelho (como
   * /implantes/ads), que repetem o conteúdo de uma landing e precisam creditar
   * a original em vez de disputar a mesma busca com ela.
   */
  canonicalPath?: string;
  /** Mantém a rota fora do índice. Anda junto do `canonicalPath` nos espelhos. */
  noindex?: boolean;
  /** JSON-LD específico da página, injetado como <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown>;
}

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Gerencia title, description, canonical, Open Graph e JSON-LD por rota.
 *
 * Centraliza o que antes vivia duplicado entre index.html e os useEffect das
 * páginas — com múltiplas rotas, essa duplicação divergiria.
 */
export function Seo({ title, description, path, canonicalPath, noindex, jsonLd }: SeoProps) {
  useEffect(() => {
    const url = `${CLINIC.domain}${path}`;
    const canonicalUrl = `${CLINIC.domain}${canonicalPath ?? path}`;

    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);

    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:image"]', "property", "og:image", OG_IMAGE);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", OG_IMAGE);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    /* Sempre reafirma a diretiva: quem navega de /implantes/ads para outra
       rota levaria o `noindex` junto se aqui só criássemos a tag. */
    upsertMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      noindex ? "noindex, follow" : "index, follow",
    );
  }, [title, description, path, canonicalPath, noindex]);

  useEffect(() => {
    if (!jsonLd) return;

    /*
     * O build pré-renderiza o JSON-LD desta rota no `<head>`. Ao hidratar, sem
     * esta checagem, um segundo bloco idêntico seria adicionado e o crawler
     * leria o schema duplicado. Só injeta quando não veio do HTML servido —
     * caso do dev server e da navegação client-side entre rotas.
     */
    const existing = document.head.querySelector<HTMLScriptElement>(
      'script[type="application/ld+json"]',
    );
    if (existing && !existing.dataset.pageSchema) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pageSchema = "true";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [jsonLd]);

  return null;
}

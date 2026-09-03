import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { vitePrerenderPlugin } from "vite-prerender-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    /*
     * Gera HTML estático para cada rota no build. Sem isso o HTML servido é uma
     * `div` vazia: os crawlers de IA não executam JS e leriam a página em
     * branco, e o preview de link no WhatsApp mostraria sempre a home.
     *
     * As rotas saem do `<a href>` do site, então basta o link existir na
     * navegação para a página ser pré-renderizada.
     */
    mode !== "development" &&
      vitePrerenderPlugin({
        renderTarget: "#root",
        prerenderScript: path.resolve(__dirname, "./src/prerender.tsx"),
        /* As landings entram aqui porque a descoberta automática segue `href`,
           e a home navega por `<Link>` do React Router. Rota nova precisa ser
           adicionada nesta lista para ser pré-renderizada. */
        /* `/implantes/ads` é a mesma landing servida ao tráfego pago. Entra no
           pré-render como as demais (o anúncio precisa de HTML pronto), mas fica
           fora do sitemap: é noindex, com canonical para /implantes. */
        additionalPrerenderRoutes: [
          "/drvinicius",
          "/lentes",
          "/implantes",
          "/implantes/ads",
        ],
      }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        /*
         * Separa as dependências do código das páginas.
         *
         * Sem isto o Rollup junta React, o router e o Radix no mesmo chunk da
         * primeira página que os importa — que acabava batizado de `Index` e
         * pesando 275 kB, baixado inteiro também por quem abria só /implantes.
         *
         * Em `vendor`, esse código passa a ser um arquivo estável: muda só
         * quando uma dependência muda, então o cache do visitante sobrevive a
         * cada deploy de copy ou layout.
         */
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));

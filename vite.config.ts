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
        additionalPrerenderRoutes: ["/lentes", "/implantes"],
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));

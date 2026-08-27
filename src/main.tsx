import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;

/*
 * Build pré-renderiza cada rota (ver `prerender.tsx`), então o `#root` já chega
 * com HTML do servidor: aí o React hidrata em vez de recriar a árvore, senão
 * descartaria o conteúdo e desfaria o ganho de SEO.
 *
 * No dev server não há pré-renderização e o nó está vazio, caindo no
 * `createRoot` de sempre.
 */
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />);
} else {
  createRoot(root).render(<App />);
}

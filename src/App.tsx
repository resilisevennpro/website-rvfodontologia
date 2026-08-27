import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
/*
 * Uma rota, um chunk: quem abre /implantes não baixa o código da home nem o de
 * lentes. Antes tudo vinha num arquivo só.
 *
 * Isto não afeta o pré-render: `prerender.tsx` tem a própria árvore de rotas,
 * com imports estáticos. O HTML de cada página continua completo no build, e é
 * ele que aparece enquanto o chunk da rota chega.
 */
const Index = lazy(() => import("./pages/Index.tsx"));
const Lentes = lazy(() => import("./pages/Lentes.tsx"));
const Implantes = lazy(() => import("./pages/Implantes.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

/*
 * Sem `QueryClientProvider`, `TooltipProvider` nem os dois `Toaster`.
 *
 * Vinham do scaffold do Lovable e eram montados em toda página, mas o site não
 * tem uma chamada de `toast()`, um `useQuery` ou um `<Tooltip>` sequer. Só o
 * `sonner` respondia por boa parte do JS que o celular executava antes de a
 * página ficar interativa. Voltam junto com o primeiro recurso que precisar
 * deles.
 */
const App = () => (
  <BrowserRouter>
    {/*
     * `fallback={null}` de propósito: nas landings o HTML pré-renderizado já
     * está na tela, e um spinner apagaria o conteúdo para depois repintá-lo.
     * Nulo, a página pré-renderizada permanece visível até o chunk chegar e o
     * React assumir.
     */}
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lentes" element={<Lentes />} />
        <Route path="/implantes" element={<Implantes />} />
        {/* Novas rotas sempre acima do catch-all "*" */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;

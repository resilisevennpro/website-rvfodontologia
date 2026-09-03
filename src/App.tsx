import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CLINIC, SEO } from "./content/site";
import { DR_VINICIUS_LINKS } from "./content/home";
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
        {/*
         * Variante da home como bio pessoal do Dr. Vinicius: mesma estrutura,
         * com a foto dele, só os links de serviço com landing própria e
         * "Localização" no lugar de "Onde Estamos".
         */}
        <Route
          path="/drvinicius"
          element={
            <Index
              image="/dr-vinicius-01.jpeg"
              imageAlt={CLINIC.responsibleTechnician}
              links={DR_VINICIUS_LINKS}
              seo={SEO.drVinicius}
              showWhatsAppCta={false}
              displayName={CLINIC.responsibleTechnician}
              instagramUrl="https://www.instagram.com/dr.viniciussrodrigues/"
              instagramHandle="@dr.viniciussrodrigues"
            />
          }
        />
        <Route path="/lentes" element={<Lentes />} />
        <Route path="/implantes" element={<Implantes />} />
        {/*
         * Mesma página de implantes, servida para o tráfego pago. Só a mensagem
         * do WhatsApp muda, para a clínica separar quem veio do anúncio de quem
         * veio da busca. Como é o mesmo componente, as duas rotas nunca podem
         * divergir visualmente.
         */}
        <Route
          path="/implantes/ads"
          element={<Implantes origin="implantesAds" seo={SEO.implantesAds} />}
        />
        {/* Novas rotas sempre acima do catch-all "*" */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;

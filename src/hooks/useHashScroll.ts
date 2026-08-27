import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Rolagem para a seção indicada no `#` da URL.
 *
 * O navegador tenta isso sozinho, mas falha quando a URL vem de fora (digitada,
 * ou vinda de um sitelink no Google): ele procura o elemento antes do React
 * montar as seções, não encontra e desiste no topo. Clique interno não sofre
 * disso, porque a página já está montada — por isso a falha é intermitente.
 *
 * Depois de montar ainda há um segundo deslocamento: as fotos entram sem
 * dimensão declarada e empurram o conteúdo. Por isso a posição é reconferida
 * por um tempo curto, em vez de calculada uma vez só.
 */
export function useHashScroll() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    /* `decodeURIComponent`: âncora com acento chega percent-encoded na URL. */
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let settled = 0;

    /*
     * Reconfere a posição por até ~1,2s. Enquanto a seção continuar se movendo
     * (imagem carregando acima dela), reposiciona; depois de três quadros
     * parada, considera assentada e para. Sem laço infinito: o limite de
     * tentativas encerra de qualquer forma.
     */
    let tries = 0;
    let lastTop: number | null = null;

    const tick = () => {
      const el = document.getElementById(id);

      if (el) {
        const top = el.getBoundingClientRect().top;

        if (lastTop !== null && Math.abs(top - lastTop) < 1) {
          settled += 1;
        } else {
          settled = 0;
          /* `block: "start"` respeita o `scroll-mt` da seção, que compensa a
             altura da navbar fixa. */
          el.scrollIntoView({
            behavior: reduced ? "auto" : "smooth",
            block: "start",
          });
        }

        lastTop = top;
        if (settled >= 3) return;
      }

      tries += 1;
      if (tries < 72) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [hash]);
}

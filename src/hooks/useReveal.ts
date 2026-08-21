import { useEffect } from "react";

/**
 * Entrada por rolagem. Observa `.reveal` e `.reveal-stagger`, marcando `.in`
 * quando o elemento entra na viewport.
 *
 * Em `.reveal-stagger`, cada filho recebe `--i` para escalonar o atraso —
 * a cascata é curta (60ms) para não atrasar a leitura.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger");

    els.forEach((el) => {
      if (el.classList.contains("reveal-stagger")) {
        Array.from(el.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty("--i", String(i));
        });
      }
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

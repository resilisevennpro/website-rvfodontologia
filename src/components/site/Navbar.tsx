import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { CLINIC, whatsappLink, type WhatsAppOrigin } from "@/content/site";
import logoOffwhite from "@/assets/logo-horizontal-offwhite.png";
import logoGrafite from "@/assets/logo-horizontal-grafite.png";

const TREATMENTS = [
  { label: "Lentes", to: "/lentes" },
  { label: "Implantes", to: "/implantes" },
];

/**
 * A landing atual não se autolinka nem oferece a landing irmã: no lugar dela
 * entra "Início", devolvendo o visitante à árvore de links.
 */
function linksFor(pathname: string) {
  const current = TREATMENTS.find((t) => t.to === pathname);
  if (!current) return TREATMENTS;
  return [{ label: "Início", to: "/" }, current];
}

export function Navbar({ origin }: { origin: WhatsAppOrigin }) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  /**
   * A barra escurece quando o hero deixa de estar sob ela. Sem hero na página
   * (rotas sem seção de topo), cai no limiar simples de rolagem.
   */
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("[data-hero]");
      const threshold = hero ? hero.getBoundingClientRect().height - 80 : 8;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-primary-foreground/10 bg-primary shadow-soft"
          : "border-foreground/10 bg-background"
      }`}
    >
      {/* `gap` menor no mobile: com o rótulo do botão oculto, o respiro de 6
          somado ao logo e aos links estourava a largura da viewport. */}
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between gap-3 px-5 sm:gap-6 lg:px-8">
        <Link
          to="/"
          aria-label={`${CLINIC.name}, página inicial`}
          className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {/* Duas versões do logo: a barra alterna entre fundo claro e grafite. */}
          <img
            src={scrolled ? logoOffwhite : logoGrafite}
            alt={CLINIC.name}
            className="h-8 w-auto sm:h-10"
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="flex min-w-0 items-center gap-0.5 sm:gap-2"
        >
          {linksFor(pathname).map((link) => {
            const active = pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                aria-current={active ? "page" : undefined}
                /* A cor acompanha o fundo da barra: off-white quando escurecida, grafite no topo. */
                className={`whitespace-nowrap rounded-md px-2 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:px-3 ${
                  scrolled
                    ? `focus-visible:ring-offset-primary ${
                        active
                          ? "font-medium text-primary-foreground"
                          : "text-primary-foreground/70 hover:text-primary-foreground"
                      }`
                    : `focus-visible:ring-offset-background ${
                        active ? "font-medium text-foreground" : "text-foreground/70 hover:text-foreground"
                      }`
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <a
            href={whatsappLink(origin)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Agendar pelo WhatsApp com a ${CLINIC.name}`}
            /* Sobre a barra escurecida o botão inverte, senão grafite sobre grafite.
               No mobile o rótulo some, então o botão vira circular e perde o
               padding lateral de botão com texto: era ele que empurrava a
               barra para fora da viewport. */
            className={`ml-0.5 inline-flex shrink-0 items-center justify-center gap-2 rounded-full p-2.5 text-sm font-medium transition-colors duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:ml-1 sm:px-4 sm:py-2.5 ${
              scrolled
                ? "bg-background text-foreground focus-visible:ring-offset-primary"
                : "bg-primary text-primary-foreground focus-visible:ring-offset-background"
            }`}
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            <span className="hidden sm:inline">Agendar</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

const AGENCY_URL = "https://instagram.com/ojacksondigital";

interface CreditsProps {
  /** Reserva espaço no mobile para o botão flutuante de WhatsApp não cobrir o texto. */
  hasFab?: boolean;
}

/** Barra de crédito da agência, em grafite, fechando todas as páginas. */
export function Credits({ hasFab = false }: CreditsProps) {
  return (
    <div
      className={`bg-primary px-5 pt-5 text-center lg:px-8 lg:pb-5 ${
        hasFab ? "pb-20" : "pb-5"
      }`}
    >
      <p className="text-xs leading-relaxed text-primary-foreground/70">
        Desenvolvido por{" "}
        <a
          href={AGENCY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-foreground underline-offset-4 transition-opacity hover:underline hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          Resili Sevenn
        </a>{" "}
        · 2026 · Todos os direitos reservados
      </p>
    </div>
  );
}

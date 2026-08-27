import { Link } from "react-router-dom";
import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { CLINIC, LEGAL_SIGNATURE, SOCIAL, whatsappLink } from "@/content/site";
import type { WhatsAppOrigin } from "@/content/site";
import { Credits } from "./Credits";

interface FooterProps {
  origin: WhatsAppOrigin;
}

export function Footer({ origin }: FooterProps) {
  const address = [CLINIC.address.street, CLINIC.address.district]
    .filter(Boolean)
    .join(", ");

  return (
    <>
    {/* Fecho grafite: encerra a página com peso e faz par com o hero. */}
    <footer className="bg-primary px-5 pb-12 pt-12 text-primary-foreground lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-2xl">{CLINIC.name}</p>
            <p className="mt-2 max-w-xs text-sm text-primary-foreground/70">{CLINIC.tagline}</p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href={whatsappLink(origin)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/85 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              Falar no WhatsApp
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/85 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
            >
              <Instagram aria-hidden="true" className="size-4" />
              {SOCIAL.instagramHandle}
            </a>
            <a
              href={SOCIAL.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/85 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
            >
              <MapPin aria-hidden="true" className="size-4" />
              {address ? `${address} – ${CLINIC.city}, ${CLINIC.state}` : `${CLINIC.city} – ${CLINIC.state}`}
            </a>
            {/* `openingHoursLabel`, não `openingHours`: este último está no
                formato do schema.org ("Mo-Fr 08:30-18:30"), ilegível na tela. */}
            {CLINIC.openingHoursLabel && (
              <p className="text-primary-foreground/70">{CLINIC.openingHoursLabel}</p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1 text-xs leading-relaxed text-primary-foreground/65">
            {LEGAL_SIGNATURE.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <Link
            to="/"
            className="text-xs text-primary-foreground/65 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </footer>
    <Credits />
    </>
  );
}

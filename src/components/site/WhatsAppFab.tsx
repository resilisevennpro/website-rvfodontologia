import { MessageCircle } from "lucide-react";
import { whatsappLink, type WhatsAppOrigin } from "@/content/site";

/** Botão flutuante de WhatsApp, fixo durante a rolagem. */
export function WhatsAppFab({ origin }: { origin: WhatsAppOrigin }) {
  return (
    <a
      href={whatsappLink(origin)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-elevated transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <MessageCircle aria-hidden="true" className="size-6" />
    </a>
  );
}

import { useReveal } from "@/hooks/useReveal";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
// import { WhatsAppFab } from "@/components/site/WhatsAppFab"; // desativado a pedido
import {
  Audience,
  Benefits,
  Explainer,
  Faq,
  FinalCta,
  Hero,
  CtaButton,
  Objections,
  Process,
  Team,
} from "@/components/site/sections";
import { IMPLANTES } from "@/content/implantes";
import { CLINIC, SEO } from "@/content/site";
// TODO: substituir as artes abstratas por fotos reais da clínica
import heroArt from "@/assets/abstract-implantes.png";
import explainerArt from "@/assets/abstract-clinica.png";
import teamPhoto from "@/assets/hero-equipe.jpg";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${CLINIC.domain}/implantes#faq`,
  mainEntity: IMPLANTES.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/**
 * Ordem própria desta landing: implante é decisão de saúde, com receio de
 * cirurgia e dúvida sobre prazo. As objeções vêm logo após o processo, e a
 * equipe aparece cedo — quem opera importa mais aqui do que em estética.
 */
const Implantes = () => {
  useReveal();

  return (
  <>
    <Seo {...SEO.implantes} jsonLd={jsonLd} />
    <Navbar origin={IMPLANTES.origin} />
    <main>
      <Hero
        content={IMPLANTES}
        image={heroArt}
        secondary={{ label: "Como funciona o tratamento", targetId: "como-funciona" }}
      />
      <Audience content={IMPLANTES} />
      <Explainer content={IMPLANTES} image={explainerArt} />
      <Process content={IMPLANTES} id="como-funciona" cta={{ label: "Agendar avaliação" }} />
      <Objections content={IMPLANTES} />
      <Team image={teamPhoto} />
      <Benefits content={IMPLANTES} />
      <CtaButton origin={IMPLANTES.origin} label="Tirar uma dúvida" />
      <Faq content={IMPLANTES} />
      <FinalCta content={IMPLANTES} />
    </main>
    <Footer origin={IMPLANTES.origin} />
    {/* Botão flutuante desativado a pedido. Para reativar, descomentar:
    <WhatsAppFab origin={IMPLANTES.origin} /> */}
    </>
  );
};

export default Implantes;

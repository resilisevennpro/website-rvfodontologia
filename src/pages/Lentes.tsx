import { useReveal } from "@/hooks/useReveal";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
// import { WhatsAppFab } from "@/components/site/WhatsAppFab"; // desativado a pedido
import {
  Audience,
  BeforeAfter,
  Benefits,
  Comparison,
  Explainer,
  Faq,
  FinalCta,
  Hero,
  CtaButton,
  InlineCta,
  Objections,
  Process,
  Team,
  Testimonials,
} from "@/components/site/sections";
import { LENTES, RESULTS_DISCLAIMER } from "@/content/lentes";
import {
  TESTIMONIALS,
  TESTIMONIALS_DISCLAIMER,
  TESTIMONIALS_SOURCE,
} from "@/content/depoimentos";
import { CLINIC, SEO } from "@/content/site";
// TODO: substituir as artes abstratas por fotos reais da clínica
import heroArt from "@/assets/abstract-lentes.png";
import explainerArt from "@/assets/abstract-clinica.png";
import teamPhoto from "@/assets/hero-equipe.jpg";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${CLINIC.domain}/lentes#faq`,
  mainEntity: LENTES.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/**
 * Ordem própria desta landing: a decisão sobre lentes é estética e passa por
 * ver resultado e escolher material. Por isso antes/depois vem cedo e o
 * comparativo resina x porcelana ocupa lugar de destaque.
 */
const Lentes = () => {
  useReveal();

  return (
  <>
    <Seo {...SEO.lentes} jsonLd={jsonLd} />
    <Navbar origin={LENTES.origin} />
    <main>
      <Hero
        content={LENTES}
        image={heroArt}
        secondary={{ label: "Ver casos da clínica", targetId: "casos" }}
      />
      <Audience content={LENTES} />
      <Explainer content={LENTES} image={explainerArt} />
      <BeforeAfter disclaimer={RESULTS_DISCLAIMER} id="casos" />
      <Testimonials
        id="depoimentos"
        items={TESTIMONIALS}
        disclaimer={TESTIMONIALS_DISCLAIMER}
        source={TESTIMONIALS_SOURCE}
        intro="Avaliações públicas de quem já foi atendido na clínica."
      />
      <InlineCta
        origin={LENTES.origin}
        text="Quer saber se o seu caso tem **indicação para lentes**?"
        label="Falar no WhatsApp"
      />
      <Comparison content={LENTES} />
      <Process content={LENTES} cta={{ label: "Falar no WhatsApp" }} />
      <Objections content={LENTES} />
      <Team image={teamPhoto} />
      <Benefits content={LENTES} />
      <CtaButton origin={LENTES.origin} label="Tirar uma dúvida" />
      <Faq content={LENTES} />
      <FinalCta content={LENTES} />
    </main>
    <Footer origin={LENTES.origin} />
    {/* Botão flutuante desativado a pedido. Para reativar, descomentar:
    <WhatsAppFab origin={LENTES.origin} /> */}
    </>
  );
};

export default Lentes;

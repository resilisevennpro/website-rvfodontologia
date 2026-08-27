import { useReveal } from "@/hooks/useReveal";
import { useHashScroll } from "@/hooks/useHashScroll";
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
  Objections,
  Process,
  Team,
  Testimonials,
} from "@/components/site/sections";
import { LENTES, RESULTS_DISCLAIMER, TEAM_PARAGRAPHS } from "@/content/lentes";
import {
  testimonialsFor,
  TESTIMONIALS_DISCLAIMER,
  TESTIMONIALS_SOURCE,
} from "@/content/depoimentos";
import { CLINIC, SEO } from "@/content/site";
import {
  breadcrumbSchema,
  clinicSchema,
  faqSchema,
  graph,
  serviceSchema,
} from "@/content/schema";
// TODO: substituir as artes abstratas por fotos reais da clínica
/*
 * Reserva: a arte abstrata do hero, usada antes da foto real. Comentada junto
 * com o bloco que a usava, senão o lint acusa import sem uso. Para reverter,
 * descomentar esta linha e o bloco correspondente abaixo.
 *
 * import heroArt from "@/assets/abstract-lentes.png";
 */
/*
 * A arte abstrata do explainer saiu no lugar de uma foto real. Para reverter,
 * descomentar esta linha e voltar `image={explainerArt}` abaixo.
 *
 * import explainerArt from "@/assets/abstract-clinica.png";
 */
/* De `public/`, como as demais fotos: entra no `npm run images`. */
const teamPhoto = "/hero-equipe.jpg";
/* Servida de `public/`: foto real, fora do pipeline de assets do Vite. */
const heroPhoto = "/dr-vinicius-01.jpeg";
/* Vista aproximada de um sorriso em cerâmica: ilustra a translucidez e o
   acabamento que o texto descreve, sem repetir uma foto do antes e depois. */
const explainerPhoto = "/ceramica-dente-branco.jpeg";
/* Seção de diferenciais: macro do acabamento sangrando à direita no desktop.
   No mobile entra o recorte em PNG, colado no topo da seção. */
const benefitsPhoto = "/lentes-1.jpg";
const benefitsPhotoMobile = "/lentes-1-fundotransparente.png";

/* Um grafo por página: o FAQ alimenta o rich result e as respostas de
   assistentes; o serviço e a clínica ancoram a busca local. */
const jsonLd = graph(
  clinicSchema,
  serviceSchema({
    path: "/lentes",
    name: "Lentes de resina e porcelana",
    description: SEO.lentes.description,
  }),
  faqSchema("/lentes", LENTES.faq.items),
  breadcrumbSchema("/lentes", "Lentes e Facetas"),
);

/**
 * Ordem própria desta landing: a decisão sobre lentes é estética e passa por
 * ver resultado e escolher material. Por isso antes/depois vem cedo e o
 * comparativo resina x porcelana ocupa lugar de destaque.
 */
const Lentes = () => {
  useReveal();
  useHashScroll();

  return (
  <>
    <Seo {...SEO.lentes} jsonLd={jsonLd} />
    <Navbar origin={LENTES.origin} />
    <main>
      {/*
        Mesmo layout do hero de implantes: foto real ocupando os 70% da direita,
        dissolvida à esquerda por `mask-image`, com o texto sobre o grafite do
        próprio `section`. A copy é a de lentes.
      */}
      <Hero
        content={LENTES}
        image={heroPhoto}
        stackedImage
        alt={`${CLINIC.responsibleTechnician} no consultório da ${CLINIC.name}`}
        /* No mobile a foto é um bloco estático acima do texto, em 4:3 e sem
           espelho (não há texto por cima para ela "olhar"). A partir do `lg`
           volta a ser o fundo absoluto de 70% à direita. */
        imageClassName="relative block aspect-[4/3] w-full object-cover object-[75%_50%] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:h-full lg:w-[70%] lg:-scale-x-100 lg:[mask-image:linear-gradient(to_left,transparent_0%,black_35%)]"
        /* Véu contínuo, sem parada opaca: quem resolve a emenda é a máscara da
           imagem, e o assunto à direita fica com a luz original. */
        overlayClassName="left-0 bg-gradient-to-r from-primary via-primary/50 via-45% to-transparent to-80%"
        /* Cobre a primeira dobra: 100dvh menos os 5rem da navbar sticky. */
        heightClassName="py-12 lg:py-28 lg:min-h-[min(calc(100dvh-5rem),52rem)]"
        /* Container largo aproxima o texto da borda esquerda; a coluna estreita
           impede que as linhas cheguem sob o assunto da foto. */
        containerClassName="max-w-5xl lg:max-w-7xl"
        contentClassName="max-w-3xl lg:max-w-xl"
        subtitleClassName="lg:max-w-full"
        secondary={{ label: "Ver casos da clínica", targetId: "casos" }}
      />
      {/* Reserva, com a arte abstrata:
      <Hero
        content={LENTES}
        image={heroArt}
        secondary={{ label: "Ver casos da clínica", targetId: "casos" }}
      />
      */}
      <Audience content={LENTES} />
      <Explainer
        content={LENTES}
        image={explainerPhoto}
        alt="Vista aproximada de um sorriso com lentes, mostrando o acabamento e a translucidez dos dentes"
      />
      {/* O CTA fecha a própria seção de casos, depois da ressalva, em vez de
          ocupar um bloco solto entre as seções. */}
      <BeforeAfter
        disclaimer={RESULTS_DISCLAIMER}
        id="casos"
        intro="Casos tratados na clínica, publicados com autorização das pacientes."
        cases={LENTES.cases}
        cta={{ label: "Quero transformar o meu sorriso", origin: LENTES.origin }}
      />
      <Comparison content={LENTES} />
      <Process content={LENTES} cta={{ label: "Quero solicitar uma avaliação" }} />
      {/* Macro sangrando na metade direita, de topo a fundo, com o véu grafite
          entrando pela esquerda: cobrindo a seção inteira o close estouraria. */}
      <Benefits
        content={LENTES}
        image={benefitsPhoto}
        mobileImage={benefitsPhotoMobile}
        alt="Vista aproximada da arcada superior com lentes, mostrando textura e translucidez do acabamento"
        sideImage
      />
      {/*
        Depois das objeções, não junto do antes e depois: em lentes o receio é
        social ("cara de dente falso"), e a resposta da clínica ganha força
        quando vem seguida da confirmação de quem já passou pelo tratamento.

        `testimonialsFor` põe os relatos de lentes à frente. Hoje só o do
        Victor cita facetas; os demais falam de atendimento e ambiente, que é
        prova da clínica e segue valendo aqui, logo depois.
      */}
      <Testimonials
        id="depoimentos"
        items={testimonialsFor("lentes")}
        disclaimer={TESTIMONIALS_DISCLAIMER}
        source={TESTIMONIALS_SOURCE}
        intro="Avaliações públicas de quem já foi atendido na clínica."
      />
      {/* Copy própria desta landing: nomeia quem conduz os casos de lentes.
          O bloco padrão do `Team` segue valendo na home e em implantes. */}
      <Team image={teamPhoto} paragraphs={TEAM_PARAGRAPHS} />
      <CtaButton origin={LENTES.origin} label="Tirar uma dúvida" />
      <Faq content={LENTES} />
      {/* Card estreitado no desktop: são três linhas de texto, e na largura
          cheia da seção o bloco fica vazio nas laterais. */}
      <FinalCta content={LENTES} cardClassName="lg:mx-auto lg:max-w-3xl" />
    </main>
    <Footer origin={LENTES.origin} />
    {/* Botão flutuante desativado a pedido. Para reativar, descomentar:
    <WhatsAppFab origin={LENTES.origin} /> */}
    </>
  );
};

export default Lentes;

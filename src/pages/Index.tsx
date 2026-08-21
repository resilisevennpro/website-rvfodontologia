import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { Seo } from "@/components/Seo";
import { HOME_LINKS } from "@/content/home";
import { Credits } from "@/components/site/Credits";
import { CLINIC, LEGAL_SIGNATURE, SEO, SOCIAL, whatsappLink } from "@/content/site";
import heroImage from "@/assets/hero-equipe.jpg";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${CLINIC.domain}/#clinica`,
  name: CLINIC.name,
  url: CLINIC.domain,
  image: `${CLINIC.domain}/favicon.png`,
  medicalSpecialty: "Dentistry",
  address: {
    "@type": "PostalAddress",
    addressLocality: CLINIC.city,
    addressRegion: CLINIC.state,
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SOCIAL.geo.lat,
    longitude: SOCIAL.geo.lng,
  },
  sameAs: [SOCIAL.instagram],
  hasMap: SOCIAL.maps,
};

const cardClass =
  /* Grafite da marca: os links são a ação principal da home e ancoram a
     coluna de texto sobre o off-white. */
  "group flex w-full items-center justify-between gap-4 rounded-2xl bg-primary px-5 py-3.5 text-left text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const Index = () => (
  <>
    <Seo {...SEO.home} jsonLd={jsonLd} />

    <main className="min-h-screen pb-14 lg:grid lg:min-h-screen lg:grid-cols-2 lg:items-stretch lg:gap-0 lg:pb-0">
      {/* Foto da equipe: topo no mobile, coluna esquerda fixa no desktop.
          object-top preserva os rostos e o logo na parede ao recortar. */}
      <div className="relative lg:sticky lg:top-0 lg:h-screen">
        <img
          src={heroImage}
          alt={`Equipe da ${CLINIC.name}`}
          className="h-[46vh] max-h-[420px] min-h-[260px] w-full object-cover object-top lg:h-full lg:max-h-none lg:object-center"
          width={1214}
          height={1214}
          fetchPriority="high"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent lg:hidden"
        />
      </div>

      <div className="mx-auto w-full max-w-md px-5 lg:mx-0 lg:flex lg:min-h-screen lg:max-w-xl lg:flex-col lg:justify-center lg:px-10 lg:py-16 xl:px-16">
        <h1 className="text-center font-display text-3xl font-medium leading-tight lg:whitespace-nowrap lg:text-left lg:text-[2.1rem] xl:text-[2.6rem]">
          {CLINIC.name}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-balance text-center text-sm leading-relaxed text-muted-foreground lg:mx-0 lg:max-w-md lg:text-base lg:text-left">
          {CLINIC.tagline}
        </p>

        <div className="mt-3 flex justify-center lg:justify-start">
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm py-1 text-sm text-foreground/80 underline-offset-4 transition-colors duration-300 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Instagram aria-hidden="true" className="size-4" />
            {SOCIAL.instagramHandle}
          </a>
        </div>

        <hr aria-hidden="true" className="mt-7 border-foreground/15 lg:mt-9" />

        <nav aria-label="Principais serviços" className="mt-7 lg:mt-9">
          <ul className="flex flex-col gap-2.5">
            {HOME_LINKS.map((link) => {
              const content = (
                <>
                  <span className="min-w-0">
                    <span className="block font-display text-2xl font-semibold leading-tight">
                      {link.label}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-primary-foreground/70">
                      {link.hint}
                    </span>
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-primary-foreground/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </>
              );

              return (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cardClass}
                    >
                      {content}
                    </a>
                  ) : (
                    <Link to={link.href} className={cardClass}>
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-10 flex justify-center lg:justify-start">
          <a
            href={whatsappLink("home")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-[transform,box-shadow,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-card active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            Falar no WhatsApp
          </a>
        </div>

        <footer className="mt-9 space-y-1 text-center text-xs leading-relaxed text-foreground/70 lg:text-left">
          {LEGAL_SIGNATURE.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </footer>
      </div>
    </main>

    <Credits />
  </>
);

export default Index;

import { CLINIC, OG_IMAGE, SOCIAL, WHATSAPP_SECRETARIA_DISPLAY } from "./site";
import { TESTIMONIALS } from "./depoimentos";
import type { FaqItem } from "./types";

/**
 * Schema.org do site.
 *
 * Fica separado da copy porque é dado estruturado para buscadores e assistentes
 * (Google, ChatGPT, Perplexity), não texto de página. A clínica é declarada uma
 * vez e referenciada por `@id` nas demais entidades, que é o que permite ao
 * Google ligar avaliações e FAQ ao mesmo negócio local.
 */

const CLINIC_ID = `${CLINIC.domain}/#clinica`;

/** Endereço postal. Os campos vazios são omitidos até a clínica confirmá-los. */
function postalAddress() {
  const { street, district, zip } = CLINIC.address;

  /* `streetAddress` acumula rua e bairro: o schema.org não tem campo próprio
     para bairro, e `addressLocality` é a cidade. */
  const streetAddress = [street, district].filter(Boolean).join(" - ");

  return {
    "@type": "PostalAddress",
    ...(streetAddress ? { streetAddress } : {}),
    addressLocality: CLINIC.city,
    addressRegion: CLINIC.state,
    ...(zip ? { postalCode: zip } : {}),
    addressCountry: "BR",
  };
}

/**
 * A clínica como negócio local. É a âncora do GEO: sem ela, as landings não
 * têm a quem se referir numa busca por "lentes em Içara".
 */
export const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": CLINIC_ID,
  name: CLINIC.name,
  url: CLINIC.domain,
  image: OG_IMAGE,
  logo: `${CLINIC.domain}/favicon.png`,
  description: CLINIC.tagline,
  medicalSpecialty: "Dentistry",
  priceRange: "$$",
  telephone: WHATSAPP_SECRETARIA_DISPLAY,
  address: postalAddress(),
  geo: {
    "@type": "GeoCoordinates",
    latitude: SOCIAL.geo.lat,
    longitude: SOCIAL.geo.lng,
  },
  /* A clínica atende a região, não só o município sede: `areaServed` é o que
     sustenta a busca local nas cidades vizinhas. */
  areaServed: CLINIC.areaServed.map((name) => ({ "@type": "City", name })),
  sameAs: [SOCIAL.instagram],
  hasMap: SOCIAL.maps,
  ...(CLINIC.openingHours ? { openingHours: CLINIC.openingHours } : {}),
  aggregateRating: aggregateRating(),
  review: reviewSchema(),
};

/**
 * Nota agregada das avaliações do Google. São as mesmas exibidas na seção de
 * depoimentos: todas 5 estrelas, o que torna a média trivial, mas o campo
 * precisa existir para o Google exibir estrelas no resultado.
 */
function aggregateRating() {
  return {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: String(TESTIMONIALS.length),
    bestRating: "5",
    worstRating: "1",
  };
}

/** Avaliações individuais, com o mesmo texto publicado na página. */
function reviewSchema() {
  return TESTIMONIALS.map((item) => ({
    "@type": "Review",
    author: { "@type": "Person", name: item.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    reviewBody: item.quote,
  }));
}

/**
 * FAQ de uma landing, ancorado à clínica. O `about` é o que diz ao assistente
 * que estas respostas são desta clínica, e não conhecimento geral sobre o
 * tratamento — é o que faz a resposta vir citada.
 */
export function faqSchema(path: string, items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${CLINIC.domain}${path}#faq`,
    about: { "@id": CLINIC_ID },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Serviço odontológico de uma landing. Liga o tratamento ao negócio local e à
 * área atendida, que é o que falta hoje para /lentes e /implantes aparecerem
 * em busca com intenção geográfica.
 */
export function serviceSchema({
  path,
  name,
  description,
  /* Lentes são não invasivas; implante é cirúrgico. O valor errado aqui
     descreve mal o tratamento para quem lê o dado estruturado. */
  procedureType = "https://schema.org/NoninvasiveProcedure",
}: {
  path: string;
  name: string;
  description: string;
  procedureType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${CLINIC.domain}${path}#servico`,
    name,
    description,
    procedureType,
    provider: { "@id": CLINIC_ID },
    areaServed: CLINIC.areaServed.map((city) => ({ "@type": "City", name: city })),
    url: `${CLINIC.domain}${path}`,
  };
}

/** Trilha de navegação: ajuda o Google a montar o breadcrumb no resultado. */
export function breadcrumbSchema(path: string, label: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: CLINIC.domain,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${CLINIC.domain}${path}`,
      },
    ],
  };
}

/** Agrupa vários schemas num único bloco JSON-LD. */
export function graph(...nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map(({ "@context": _context, ...node }) => node),
  };
}

/**
 * Fonte única de verdade dos dados institucionais da RVF Odontologia Estética.
 *
 * Nenhum dado de cliente deve ser escrito diretamente em componente — tudo passa
 * por aqui. Itens marcados com TODO aguardam informação real do cliente.
 */

export const CLINIC = {
  name: "RVF Odontologia Estética",
  shortName: "RVF",
  tagline: "Melhoramos a vida de nossos pacientes através do sorriso.",
  city: "Içara",
  state: "SC",
  domain: "https://rvfodontologia.com.br",

  /** Exigência do Código de Ética Odontológica: RT e registro visíveis no site. */
  responsibleTechnician: "Dr. Vinicius Rodrigues",
  cro: "CRO/SC 20.491",
  epao: "EPAO 5107",

  /**
   * Profissionais citados nominalmente na copy. Só entram aqui com registro no
   * CRO: o CFO permite citar especialidade apenas quando registrada.
   */
  professionals: {
    implantodontia: {
      name: "Dr. Vinicius Rodrigues",
      specialty: "Especialista em Implantodontia",
      cro: "CRO/SC 20.491",
    },
    protese: {
      name: "Dr. Ricardo Rodrigues",
      specialty: "Especialista em Prótese Dentária",
      cro: "CRO/SC 7444",
    },
  },

  // TODO: endereço completo (rua, número, bairro, CEP)
  address: {
    street: "",
    district: "",
    zip: "",
  },

  // TODO: horário de atendimento
  openingHours: "",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/rvf.odontologia/",
  instagramHandle: "@rvf.odontologia",
  maps: "https://www.google.com/maps/place/RVF+Odontologia/@-28.7136529,-49.3027609,808m/data=!3m2!1e3!4b1!4m6!3m5!1s0x95217f6bc9decd3b:0xa7b594d23d895c7e!8m2!3d-28.7136529!4d-49.300186!16s%2Fg%2F11wtf39s2s",
  geo: { lat: -28.7136529, lng: -49.300186 },
} as const;

/** TODO: número real do WhatsApp da clínica (formato: 55 + DDD + número). */
export const WHATSAPP_NUMBER = "5548000000000";

/** Mensagem pré-preenchida conforme a origem do clique. */
export const WHATSAPP_MESSAGES = {
  home: "Olá! Vim pelo site e gostaria de mais informações.",
  lentes: "Olá! Vim pelo site e gostaria de saber mais sobre lentes em resina.",
  implantes: "Olá! Vim pelo site e gostaria de saber mais sobre implantes.",
  clinicoGeral: "Olá! Vim pelo site e gostaria de agendar uma consulta de clínico geral.",
  protese: "Olá! Vim pelo site e gostaria de saber mais sobre próteses.",
  canal: "Olá! Vim pelo site e gostaria de saber mais sobre tratamento de canal.",
} as const;

export type WhatsAppOrigin = keyof typeof WHATSAPP_MESSAGES;

export function whatsappLink(origin: WhatsAppOrigin = "home"): string {
  const text = encodeURIComponent(WHATSAPP_MESSAGES[origin]);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Exigência ética do CFO: deve acompanhar qualquer exibição de antes e depois,
 * em qualquer página. Vive aqui, e não na copy de uma landing, porque a regra
 * é do site inteiro.
 */
export const RESULTS_DISCLAIMER =
  "Cada caso é único. Os resultados variam conforme a condição inicial de cada paciente.";

/** Assinatura legal exibida no rodapé de todas as páginas. */
export const LEGAL_SIGNATURE = [
  `${CLINIC.name} · ${CLINIC.city} – ${CLINIC.state}`,
  `RT: ${CLINIC.responsibleTechnician} · ${CLINIC.cro} · ${CLINIC.epao}`,
] as const;

export const SEO = {
  home: {
    title: `${CLINIC.name} | ${CLINIC.city} – ${CLINIC.state}`,
    description:
      "Odontologia em Içara. Lentes, implantes, próteses, tratamento de canal e clínico geral com planejamento individualizado. Agende sua avaliação.",
    path: "/",
  },
  lentes: {
    title: `Lentes em Resina em ${CLINIC.city} | ${CLINIC.name}`,
    description:
      "Lentes em resina com técnica minimamente invasiva em Içara-SC. Planejamento individualizado e acabamento natural. Agende sua avaliação.",
    path: "/lentes",
  },
  implantes: {
    title: `Implantes Dentários em ${CLINIC.city} | ${CLINIC.name}`,
    description:
      "Implantes dentários em Içara-SC. Planejamento individualizado para recuperar mastigação, estética e segurança. Agende sua avaliação.",
    path: "/implantes",
  },
} as const;

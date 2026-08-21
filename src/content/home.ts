import { SOCIAL, whatsappLink } from "./site";

export interface HomeLink {
  label: string;
  hint: string;
  href: string;
  external: boolean;
}

/** Árvore de links da página inicial — destino do bio do Instagram. */
export const HOME_LINKS: HomeLink[] = [
  {
    label: "Lentes em Resina",
    hint: "Harmonia e naturalidade em poucas sessões",
    href: "/lentes",
    external: false,
  },
  {
    label: "Implantes",
    hint: "Recupere a função e a segurança de mastigar",
    href: "/implantes",
    external: false,
  },
  {
    // Sem página própria: o contato vai direto ao WhatsApp, com origem própria
    // para a clínica saber por qual serviço a pessoa chegou.
    label: "Próteses",
    hint: "Reabilitação para quem perdeu um ou mais dentes",
    href: whatsappLink("protese"),
    external: true,
  },
  {
    // "Canal" e não "Endodontia": é o termo que a paciente usa e busca.
    label: "Tratamento de Canal",
    hint: "Alívio da dor preservando o seu dente",
    href: whatsappLink("canal"),
    external: true,
  },
  {
    label: "Clínico Geral",
    hint: "Prevenção, limpeza e tratamentos de rotina",
    href: whatsappLink("clinicoGeral"),
    external: true,
  },
  {
    // TODO: incluir o bairro assim que o endereço completo for confirmado
    label: "Onde Estamos",
    hint: "Içara – SC",
    href: SOCIAL.maps,
    external: true,
  },
];

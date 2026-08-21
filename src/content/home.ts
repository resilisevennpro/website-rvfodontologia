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

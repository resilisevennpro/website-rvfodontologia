import { SOCIAL } from "./site";
import type { Testimonial } from "./types";

/**
 * Ressalva ética do bloco de depoimentos. Relato de paciente é experiência
 * individual: o CFO não permite que a clínica publique expectativa de
 * resultado, então a ressalva acompanha as citações.
 */
export const TESTIMONIALS_DISCLAIMER =
  "Relatos individuais de pacientes. Cada caso é avaliado de forma particular e os resultados variam de pessoa para pessoa.";

/** Origem das avaliações, exibida como prova verificável no rodapé do bloco. */
export const TESTIMONIALS_SOURCE = {
  label: "Avaliações publicadas no Google",
  href: SOCIAL.maps,
};

/**
 * Avaliações públicas do perfil da clínica no Google, todas 5 estrelas.
 *
 * Transcrição: as citações são fiéis ao original, com dois ajustes marcados
 * caso a caso em `edited`. O corte só remove trecho que a clínica não pode
 * publicar (expectativa de resultado) — nunca muda o sentido do relato.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Victor Branco",
    quote:
      "Fiz minhas facetas nessa clínica e estou extremamente satisfeito com o resultado! Desde o atendimento até a finalização do tratamento, tudo foi impecável. Equipe profissional, ambiente acolhedor e um trabalho de altíssima qualidade. Recomendo de olhos fechados!",
  },
  {
    name: "Paula S",
    quote:
      "Profissionais bons, já fiz dois procedimentos na clínica, e tive experiências muito boas. Realizam os procedimentos com paciência, profissionalismo e os resultados ficaram ótimos! Recomendo!",
  },
  {
    name: "Julia Grasso",
    quote:
      "A RVF Odontologia oferece um atendimento de excelência, com profissionais atenciosos, competentes e dedicados. O ambiente é acolhedor e organizado, garantindo conforto e confiança em cada consulta. Recomendo com certeza!",
  },
  {
    name: "Manuele Pellegrin",
    /**
     * Original seguia com "Estou esperando ansiosamente pelo meu novo sorriso!
     * Irão devolver minha autoestima". A frase é expectativa de resultado, que
     * a clínica não pode publicar como chamariz. Mantido só o trecho sobre a
     * experiência de atendimento.
     */
    quote:
      "Ótimo atendimento, clínica impecável, profissionais incríveis, recepção amigável!",
    edited: true,
  },
  {
    name: "Miguel Feltrin Júnior",
    quote:
      "Equipe extremamente qualificada e atendimento de altíssimo nível. Fui muito bem atendido do começo ao fim!",
  },
  {
    /**
     * O print desta avaliação chegou cortado, sem o nome do autor. Publicada
     * como anônima até a clínica confirmar a autoria no perfil do Google.
     * TODO: confirmar o nome e substituir "Paciente da clínica".
     */
    name: "Paciente da clínica",
    quote:
      "Minha experiência na clínica foi excelente! Os profissionais demonstram alto nível técnico e muito cuidado em cada atendimento, transmitindo segurança e confiança. O ambiente é limpo, moderno e acolhedor, o que torna as consultas muito mais confortáveis. O atendimento, desde a recepção até os procedimentos, é atencioso, cordial e eficiente. Recomendo a todos que buscam qualidade e profissionalismo.",
  },
];

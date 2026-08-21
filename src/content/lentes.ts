import type { LandingContent } from "./types";

/**
 * Copy da landing /lentes.
 *
 * Escrita dentro das regras de publicidade do CFO: sem promessa de resultado,
 * sem preço, sem sensacionalismo. Ao editar, manter esses limites.
 */
export const LENTES: LandingContent = {
  origin: "lentes",

  hero: {
    title: "Um sorriso que continua sendo **o seu**",
    subtitle:
      "Lentes em resina desenhadas a partir das proporções do seu rosto — para corrigir forma, cor e alinhamento sem que o resultado pareça artificial.",
    cta: "Agendar avaliação",
  },

  audience: {
    title: "Talvez você **se reconheça** aqui",
    items: [
      "Sente que os dentes têm formatos irregulares ou desproporcionais entre si",
      "Tem espaços entre os dentes que incomodam ao sorrir",
      "Convive com manchas ou escurecimento que o clareamento não resolveu",
      "Percebe desgaste nas bordas dos dentes da frente",
      "Evita sorrir em fotos — e gostaria de parar de pensar nisso",
    ],
  },

  explainer: {
    title: "Uma técnica **conservadora**",
    paragraphs: [
      "As lentes em resina são finas camadas aplicadas diretamente sobre o dente, moldadas e polidas em consultório. Como a aplicação é feita sobre a estrutura existente, na maior parte dos casos preserva-se o dente natural, com pouco ou nenhum desgaste.",
      "O material é trabalhado em camadas, o que permite reproduzir a translucidez e a variação de cor de um dente natural — a diferença entre um sorriso restaurado e um sorriso que aparenta ser artificial.",
    ],
  },

  process: {
    title: "Do primeiro contato **ao resultado**",
    steps: [
      {
        title: "Avaliação",
        body: "Conversamos sobre o que te incomoda e examinamos a saúde bucal. Nem todo caso é indicado para lentes — e, quando não é, dizemos com clareza qual seria o melhor caminho.",
      },
      {
        title: "Planejamento",
        body: "Desenhamos a proposta a partir das proporções do seu rosto e do seu sorriso. Você entende o que será feito antes de qualquer procedimento começar.",
      },
      {
        // TODO: confirmar número típico de sessões com a clínica
        title: "Aplicação",
        body: "A execução acontece em consultório, com ajustes finos de forma, cor e brilho até chegarmos ao acabamento planejado.",
      },
      {
        title: "Acompanhamento",
        body: "Orientamos sobre manutenção e retornos periódicos, que é o que preserva o resultado ao longo do tempo.",
      },
    ],
  },

  benefits: {
    title: "O cuidado está **nos detalhes**",
    items: [
      {
        title: "Planejamento individualizado",
        body: "Nenhum sorriso é copiado de outro. Trabalhamos a partir das proporções do seu rosto.",
      },
      {
        title: "Técnica conservadora",
        body: "Priorizamos preservar estrutura dental sadia sempre que o caso permite.",
      },
      {
        title: "Acabamento natural",
        body: "A resina é trabalhada em camadas para reproduzir translucidez e brilho de dente natural.",
      },
      {
        title: "Transparência",
        body: "Você sabe o que será feito, em quantas sessões e o que esperar, antes de começar.",
      },
    ],
  },

  faq: {
    title: "**Perguntas** frequentes",
    items: [
      {
        question: "As lentes em resina desgastam o dente?",
        answer:
          "Na maior parte dos casos a aplicação é feita sobre a estrutura existente, com pouco ou nenhum desgaste. A avaliação inicial define o que é indicado para o seu caso.",
      },
      {
        question: "Quanto tempo duram?",
        answer:
          "A durabilidade depende de manutenção, higiene e hábitos como bruxismo ou consumo frequente de café e cigarro. Com acompanhamento periódico e os cuidados orientados, o resultado se mantém por vários anos.",
      },
      {
        question: "O procedimento dói?",
        answer:
          "A aplicação é confortável e, na maioria dos casos, não exige anestesia. Se houver necessidade de algum preparo, você é avisada antes.",
      },
      {
        question: "Vocês trabalham com lentes de porcelana também?",
        answer:
          "Sim. Trabalhamos com lentes em resina e em porcelana. Cada material atende melhor a um tipo de caso, e a indicação sai da avaliação — não é uma escolha feita antes de examinar o seu sorriso.",
      },
      {
        question: "Qual a diferença entre lente em resina e lente de porcelana?",
        answer:
          "A resina é aplicada diretamente em consultório, permite ajustes e reparos pontuais e costuma ser mais acessível. A porcelana é confeccionada em laboratório, tem maior resistência a manchas e maior longevidade, exigindo mais sessões. Na avaliação indicamos qual faz mais sentido para o seu caso.",
      },
      {
        question: "Vou precisar de quantas sessões?",
        answer:
          "Definimos na avaliação, conforme o número de dentes envolvidos e a complexidade do caso.",
      },
      {
        question: "Posso escolher a cor?",
        answer:
          "Sim. A cor é definida junto com você no planejamento, sempre buscando harmonia com o tom da sua pele e o restante do sorriso.",
      },
      {
        question: "Preciso fazer clareamento antes?",
        answer:
          "Em muitos casos sim, porque a cor das lentes é definida a partir do tom dos dentes que ficam à vista. Quando o clareamento é indicado, ele entra no planejamento antes da aplicação.",
      },
      {
        question: "Como faço a manutenção?",
        answer:
          "Higiene normal — escova, fio dental e as orientações que passamos na consulta. Além disso, retornos periódicos para polimento e avaliação. É a manutenção que preserva o brilho e a longevidade do trabalho.",
      },
      {
        question: "Posso comer e beber normalmente?",
        answer:
          "Sim. Recomendamos moderação com café, chá preto, vinho tinto e cigarro, que mancham resina ao longo do tempo, e evitar morder objetos duros ou usar os dentes como ferramenta.",
      },
      {
        question: "Tenho bruxismo. Posso fazer lentes?",
        answer:
          "Bruxismo exige atenção, mas não impede o tratamento. Normalmente o plano inclui o controle do bruxismo e o uso de placa de proteção noturna, o que protege tanto os dentes quanto as lentes.",
      },
      {
        question: "É possível remover as lentes depois?",
        answer:
          "Nas técnicas conservadoras, em que há pouco ou nenhum desgaste, é possível remover e retornar à condição anterior. Isso é avaliado caso a caso e explicado antes de começarmos.",
      },
    ],
  },

  objections: {
    title: "O que costumam nos perguntar **antes de decidir**",
    items: [
      {
        quote: "Tenho medo de ficar com cara de dente falso.",
        answer:
          "Esse receio quase sempre vem de trabalhos com proporção e cor mal planejadas. O desenho parte das proporções do seu rosto, e a resina é aplicada em camadas para reproduzir translucidez — é o que separa um resultado natural de um artificial.",
      },
      {
        quote: "Ouvi dizer que estraga o dente.",
        answer:
          "A técnica conservadora trabalha sobre a estrutura existente, com pouco ou nenhum desgaste. O que compromete o dente é o desgaste agressivo de abordagens antigas, não a aplicação em si. A avaliação define o que é indicado no seu caso.",
      },
      {
        quote: "Já tenho restaurações antigas. Ainda dá para fazer?",
        answer:
          "Na maioria dos casos sim. Restaurações antigas costumam ser substituídas ou integradas ao planejamento. O exame inicial mostra o que precisa ser refeito antes.",
      },
    ],
  },

  comparison: {
    title: "**Resina** ou **porcelana**?",
    intro:
      "Trabalhamos com os dois materiais. Cada um atende melhor a um tipo de caso — a indicação sai da avaliação, não de uma preferência definida de antemão.",
    columns: ["Lente em resina", "Lente em porcelana"],
    rows: [
      { label: "Execução", values: ["Direto em consultório", "Confeccionada em laboratório"] },
      { label: "Sessões", values: ["Menos sessões", "Mais sessões"] },
      { label: "Ajustes e reparos", values: ["Pontuais, na cadeira", "Exigem novo trabalho laboratorial"] },
      { label: "Resistência a manchas", values: ["Requer mais manutenção", "Maior resistência"] },
      { label: "Longevidade", values: ["Boa, com manutenção", "Maior"] },
      { label: "Investimento", values: ["Mais acessível", "Mais elevado"] },
    ],
  },

  finalCta: {
    title: "Vamos conversar sobre **o seu caso**?",
    body: "A avaliação é o momento de entender o que é possível — sem compromisso e sem pressa.",
    cta: "Falar no WhatsApp",
  },
};

/** Exigência ética: deve acompanhar qualquer exibição de antes e depois. */
export const RESULTS_DISCLAIMER =
  "Cada caso é único. Os resultados variam conforme a condição inicial de cada paciente.";

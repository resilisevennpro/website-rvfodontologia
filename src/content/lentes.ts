import type { LandingContent } from "./types";
import { CLINIC } from "./site";

/**
 * Variante da seção de equipe para esta landing. O bloco padrão fala da clínica
 * como um todo; aqui a copy nomeia quem conduz os casos de lentes, sem citar
 * especialidade (o CFO só permite a menção quando registrada no CRO, e lentes
 * não é especialidade).
 *
 * Passada como `paragraphs` ao `Team` em `Lentes.tsx`. Sem isso o texto de
 * lentes vazaria para a home e a landing de implantes, que usam o mesmo bloco.
 */
export const TEAM_PARAGRAPHS = [
  `A ${CLINIC.name} reúne uma equipe de cirurgiões-dentistas em ${CLINIC.city}, com áreas de atuação complementares. Na prática, isso significa que o seu caso é discutido por mais de um profissional quando envolve mais de uma especialidade.`,
  `Os casos de lentes são conduzidos pelo ${CLINIC.responsibleTechnician}, com o apoio da equipe quando o plano envolve outras etapas do tratamento.`,
  "O atendimento acontece do diagnóstico à manutenção com a mesma equipe, sem encaminhamento para fora a cada etapa. Além da estética, a clínica faz próteses, tratamento de canal e o acompanhamento de rotina.",
];

/**
 * Copy da landing /lentes.
 *
 * Escrita dentro das regras de publicidade do CFO: sem promessa de resultado,
 * sem preço, sem sensacionalismo. Ao editar, manter esses limites.
 */
export const LENTES: LandingContent = {
  origin: "lentes",

  hero: {
    title: "Um sorriso harmônico que **transmite confiança**",
    subtitle:
      "Lentes em RESINA ou PORCELANA desenhadas a partir das proporções do seu rosto, para corrigir forma, cor e alinhamento sem que o resultado pareça artificial.",
    cta: "Agendar avaliação",
  },

  audience: {
    title: "Talvez você **se reconheça** aqui",
    items: [
      "Sente que os dentes têm formatos irregulares ou desproporcionais entre si",
      "Tem espaços entre os dentes que incomodam ao sorrir",
      "Convive com manchas ou escurecimento que o clareamento não resolveu",
      "Percebe desgaste nas bordas dos dentes da frente",
      "Evita sorrir em fotos e gostaria de parar de pensar nisso",
    ],
    /* Anuncia o bloco seguinte em vez de pedir que a pessoa continue: instruir
       a permanecer denuncia o esforço de retê-la. Também evita "você achou o
       lugar certo", já que autoproclamar superioridade é vetado pelo CFO. */
    outro: "Reconheceu o seu caso?\nEntenda a seguir **como as lentes funcionam**.",
  },

  explainer: {
    title: "Uma técnica **conservadora**",
    paragraphs: [
      "Lentes são finas camadas aplicadas sobre a face do dente para corrigir forma, cor e alinhamento. Trabalhamos com dois materiais: a **resina**, moldada e polida diretamente em consultório, e a **porcelana**, confeccionada em laboratório a partir do planejamento do seu caso.",
      "Nos dois materiais a aplicação é feita sobre a estrutura existente e, na maior parte dos casos, preserva-se o dente natural, com **pouco ou nenhum desgaste**. A resina é trabalhada em camadas na cadeira; a porcelana é caracterizada pelo laboratório antes de ser cimentada.",
      "O que define o resultado é reproduzir a **translucidez** e a **variação de cor** de um dente natural, e essa é a diferença entre um sorriso restaurado e um sorriso que aparenta ser artificial. A escolha entre resina e porcelana sai da avaliação, conforme o seu caso.",
    ],
  },

  process: {
    title: "Do primeiro contato **ao resultado**",
    steps: [
      {
        title: "Avaliação",
        body: "Conversamos sobre o que te incomoda e examinamos a saúde bucal e a estrutura dos dentes. Nem todo caso é indicado para lentes e, quando não é, dizemos com clareza qual seria o melhor caminho.",
      },
      {
        title: "Planejamento",
        body: "Desenhamos a proposta a partir das proporções do seu rosto e do seu sorriso. A cor é definida junto com você, buscando o resultado mais natural possível.",
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

  /**
   * Casos exibidos no antes e depois. Só entram com autorização escrita da
   * paciente. O rótulo descreve o tratamento, nunca identifica a pessoa.
   */
  cases: [
    {
      label:
        /* Fala de autoestima como motivação geral de quem procura, no plural, e
           não como resultado obtido pela paciente da foto: atribuir o ganho ao
           caso exibido seria promessa de resultado atrelada a imagem. */
        "Autoestima e confiança ao sorrir estão entre os motivos que mais trazem pacientes até aqui. O planejamento parte disso, antes de qualquer procedimento.",
      shortLabel: "Arcada superior reabilitada com lentes",
      /* O arquivo já traz o antes e o depois empilhados, então entra inteiro
         no card, sem a grade de dois quadros. */
      combined: "/antes-depois-lentes-4.png",
    },
    {
      label:
        "Cada dente foi trabalhado individualmente, respeitando a translucidez e o brilho de um dente natural. A cor foi definida junto com a paciente no planejamento.",
      shortLabel: "Arcada superior uniformizada com lentes",
      combined: "/antes-depois-insta-2.jpg",
    },
    {
      label:
        /* "Muitas pessoas" mantém o comportamento no genérico. O que se afirma
           do caso é o que foi feito (alinhar, uniformizar o tom) e a harmonia,
           que é aparência: dizer que o tratamento traz confiança à paciente
           seria promessa de resultado atrelada à imagem. */
        "Muitas pessoas evitam sorrir em fotos. Neste caso, de dentes escurecidos e com espaçamentos, alinhamos e uniformizamos em um tom mais claro para trazer harmonia ao sorriso.",
      shortLabel: "Reabilitação da arcada superior com lentes",
      combined: "/antes-depois-insta-1.jpg",
    },
  ],

  benefits: {
    title: "O cuidado está **nos detalhes**",
    items: [
      {
        /*
         * Evita superlativo comparativo ("melhores materiais do mercado"): o
         * CFO veta afirmação de superioridade sem comprovação. A ideia de
         * qualidade fica no acabamento e na procedência, que são verificáveis.
         */
        title: "Atenção ao acabamento",
        body: "Textura, translucidez e brilho são trabalhados dente a dente, com materiais de procedência conhecida. É o acabamento que separa um sorriso natural de um artificial.",
      },
      {
        title: "Você vê o desenho antes",
        body: "O plano do sorriso é apresentado e ajustado com você antes de qualquer procedimento começar.",
      },
      {
        title: "Quando não é indicado, dizemos",
        body: "Nem todo caso pede lentes. Quando outro caminho resolve melhor, é ele que propomos.",
      },
      {
        title: "A manutenção também é aqui",
        body: "Polimento, retornos e ajustes seguem com a mesma equipe que fez o trabalho.",
      },
    ],
  },

  faq: {
    title: "**Perguntas** frequentes",
    items: [
      /*
       * Ordem: primeiro a escolha do material, que é a dúvida de quem chega
       * pela landing; depois o procedimento (desgaste, dor, sessões, cor);
       * então a convivência (durabilidade, manutenção, alimentação); por fim
       * os casos particulares (bruxismo, remoção).
       */
      {
        question: "Qual a diferença entre lente em resina e lente de porcelana?",
        answer:
          "A resina é aplicada diretamente em consultório, permite ajustes e reparos pontuais e costuma ser mais acessível. A porcelana é confeccionada em laboratório, tem maior resistência a manchas e maior longevidade, exigindo mais sessões. Na avaliação indicamos qual faz mais sentido para o seu caso.",
      },
      {
        question: "Quem escolhe o material?",
        answer:
          "A indicação sai da avaliação e é decidida junto com você. Cada material atende melhor a um tipo de caso, então a escolha vem depois de examinar o seu sorriso, não antes.",
      },
      {
        question: "As lentes desgastam o dente?",
        answer:
          "Na maior parte dos casos a aplicação é feita sobre a estrutura existente, com pouco ou nenhum desgaste, tanto em resina quanto em porcelana. A avaliação inicial define o que é indicado para o seu caso.",
      },
      {
        question: "O procedimento dói?",
        answer:
          "A aplicação é confortável e, na maioria dos casos, não exige anestesia. Se houver necessidade de algum preparo, avisamos antes.",
      },
      {
        question: "Vou precisar de quantas sessões?",
        answer:
          "Depende do material e do número de dentes envolvidos. A resina costuma resolver em menos sessões, por ser feita em consultório; a porcelana exige as etapas de laboratório. Definimos isso na avaliação.",
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
        question: "Quanto tempo duram?",
        answer:
          "Depende do material, da higiene e de hábitos como bruxismo ou consumo frequente de café e cigarro. A porcelana tem maior longevidade; a resina se mantém bem com polimento e retornos periódicos. Com os cuidados orientados, o resultado dura vários anos nos dois casos.",
      },
      {
        question: "Como faço a manutenção?",
        answer:
          "Escova, fio dental e as orientações que passamos na consulta, além dos retornos periódicos para avaliação e, no caso da resina, polimento. É a manutenção que preserva o brilho e a longevidade do trabalho.",
      },
      {
        question: "Posso comer e beber normalmente?",
        answer:
          "Sim. Recomendamos moderação com café, chá preto, vinho tinto e cigarro, que mancham as lentes ao longo do tempo, principalmente as de resina, e evitar morder objetos duros ou usar os dentes como ferramenta.",
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
          "Esse receio quase sempre vem de trabalhos com proporção e cor mal planejadas. O desenho parte das proporções do seu rosto, e o material é trabalhado para reproduzir translucidez, e é isso que separa um resultado natural de um artificial.",
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
      "Trabalhamos com os dois materiais. Cada um atende melhor a um tipo de caso, e a indicação sai da avaliação, não de uma preferência definida de antemão.",
    columns: ["Lente em resina", "Lente em porcelana"],
    rows: [
      { label: "Execução", values: ["Direto em consultório", "Confeccionada em laboratório"] },
      { label: "Sessões", values: ["Menos sessões", "Mais sessões"] },
      { label: "Ajustes e reparos", values: ["Pontuais, na cadeira", "Exigem novo trabalho laboratorial"] },
      { label: "Resistência a manchas", values: ["Requer mais manutenção", "Maior resistência"] },
      { label: "Longevidade", values: ["Anos (com manutenção)", "Maior que a resina"] },
      { label: "Investimento", values: ["Mais acessível", "Mais elevado"] },
    ],
  },

  finalCta: {
    title: "Vamos conversar sobre **o seu caso**?",
    body: "A avaliação é o momento de entender o que é possível, sem compromisso e sem pressa.",
    cta: "Falar no WhatsApp",
  },
};

/**
 * A ressalva vale para o site inteiro, então mora em `site.ts`. Reexportada
 * aqui para não quebrar quem já a importava desta landing.
 */
export { RESULTS_DISCLAIMER } from "./site";

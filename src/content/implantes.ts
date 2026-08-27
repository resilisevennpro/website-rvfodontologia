import type { LandingContent } from "./types";

/**
 * Copy da landing /implantes.
 *
 * Escrita dentro das regras de publicidade do CFO: sem promessa de resultado,
 * sem preço, sem sensacionalismo. Ao editar, manter esses limites.
 *
 * Persona: homem/mulher de 45 a 65 anos, região de Criciúma, criterioso com
 * gasto alto. Objeção nº 1 é valor; gatilho dominante é autoridade técnica.
 * A copy é densa de propósito: esse público quer entender o processo antes
 * de decidir. Sem travessão em nenhum texto visível.
 */
export const IMPLANTES: LandingContent = {
  origin: "implantes",

  hero: {
    title: "Volte a comer e sorrir **com confiança**",
    subtitle:
      "O implante devolve o que a ausência do dente tirou: firmeza para mastigar, segurança para falar e naturalidade para sorrir. Reconstruímos de um dente a uma arcada inteira - Içara, SC.",
    cta: "Tirar uma dúvida no WhatsApp",
  },

  audience: {
    title: "Quando o implante **entra em questão**",
    items: [
      "Perdeu um ou mais dentes e sente dificuldade para mastigar",
      "Usa prótese removível e gostaria de uma solução fixa",
      "Usa dentadura e quer voltar a morder com firmeza",
      "Evita alguns alimentos por insegurança ao morder",
      "Percebe que a ausência de um dente está afetando os vizinhos",
      "Passou a recusar convites ou a falar menos por causa disso",
    ],
  },

  explainer: {
    title: "Uma raiz nova, **feita para durar**",
    paragraphs: [
      "**O implante** é um pino de titânio instalado no osso, que cumpre o papel da raiz perdida. Sobre ele é fixada a coroa, a parte visível, feita para se integrar aos dentes vizinhos em cor e formato.",
      "O titânio é biocompatível: o osso se integra a ele ao longo da cicatrização, o que dá ao implante a estabilidade necessária para suportar a mastigação no dia a dia.",
      "O mesmo princípio vale de um dente a uma arcada inteira. Quando falta um dente só, **o implante recebe uma coroa.** Quando faltam muitos, **poucos implantes bem posicionados sustentam uma prótese fixa,** que não sai da boca para higienizar. O que muda é a quantidade e o planejamento, não a lógica do tratamento.",
    ],
  },

  process: {
    title: "As **etapas** do tratamento",
    steps: [
      {
        title: "Avaliação e exames de imagem",
        body: "Na avaliação gratuita, analisamos a saúde bucal e indicamos os exames necessários, contratados à parte. Eles mostram volume e densidade do osso, o que define se o implante pode ser instalado de imediato.",
      },
      {
        title: "Planejamento",
        body: "Definimos posição, quantidade e tipo de implante, junto com o cronograma completo. Você recebe o plano detalhado antes de decidir.",
      },
      {
        title: "Instalação",
        body: "Procedimento realizado em consultório, com anestesia local. A maioria das pacientes retoma a rotina no dia seguinte, seguindo as orientações do pós-operatório.",
      },
      {
        title: "Cicatrização",
        body: "Período de integração entre osso e implante, que é a etapa mais longa do tratamento e varia conforme o caso. Nesse intervalo é possível usar uma solução provisória.",
      },
      {
        title: "Coroa definitiva",
        body: "Instalamos a coroa planejada para se integrar naturalmente ao seu sorriso.",
      },
      {
        title: "Manutenção",
        body: "Retornos periódicos e higiene adequada são o que sustenta a longevidade do implante.",
      },
    ],
  },

  investment: {
    title: "Sobre o investimento, **antes de você perguntar**",
    intro:
      "Implante é uma decisão de orçamento, e faz sentido que essa seja a primeira dúvida. Não dá para dizer um valor aqui: ele depende de quantos implantes, do seu osso e da coroa planejada. Quem responde isso sem examinar está chutando.",
    items: [
      {
        title: "A primeira avaliação é gratuita",
        body: "Você faz a avaliação e entende o seu caso sem pagar nada por isso e sem compromisso de fechar tratamento. Os exames de imagem, quando necessários, são contratados à parte, e você sabe disso antes de qualquer coisa.",
      },
      {
        title: "O plano vem por escrito, com o valor fechado",
        body: "Antes de qualquer procedimento, você recebe o tratamento inteiro detalhado: etapas, prazos e o custo total.",
      },
      {
        title: "Sem surpresa no meio do caminho",
        body: "O que foi combinado na avaliação é o que você paga até a última etapa do tratamento.",
      },
      {
        title: "Parcelamento em mais de 12 vezes",
        body: "As condições são apresentadas junto com o plano, para você decidir com o valor da parcela na mão.",
        // TODO: confirmar nº máximo de parcelas e se há juros
      },
    ],
  },

  benefits: {
    title: "**Por que** tratar aqui",
    items: [
      {
        title: "Cada etapa com o especialista dela",
        body: "A cirurgia é feita por especialista em Implantodontia e a coroa por especialista em Prótese Dentária. Os dois acompanham o seu caso dentro da clínica, sem encaminhamento para fora.",
      },
      {
        title: "Um plano fechado antes de começar",
        body: "Você decide com o tratamento inteiro na mão, com etapas, prazos e valor total, não etapa por etapa.",
      },
      {
        title: "O caminho mais conservador primeiro",
        body: "Implante quando é a melhor solução para o seu caso, não como resposta automática para todo dente ausente.",
      },
      {
        title: "Mastigar bem e parecer natural",
        body: "O implante precisa funcionar e se integrar ao seu sorriso. As duas coisas entram no planejamento desde o primeiro exame.",
      },
    ],
  },

  faq: {
    title: "**Perguntas** frequentes",
    items: [
      {
        question: "Será que eu preciso mesmo de implante?",
        answer:
          "Nem toda ausência de dente pede implante. Existem casos em que uma prótese ou outra solução resolve melhor, e isso aparece na avaliação. Se houver um caminho mais conservador para você, ele entra no plano.",
      },
      {
        question: "Qual a diferença entre implante e prótese removível?",
        answer:
          "O implante é fixo, ancorado no osso, e não sai da boca, o que deixa a mastigação mais próxima da natural. A prótese removível apoia-se sobre a gengiva e precisa ser retirada para higienização.",
      },
      {
        question: "Tenho medo da cirurgia. Dói?",
        answer:
          "A instalação é feita com anestesia local e você não sente dor durante o procedimento. No pós-operatório pode haver desconforto e inchaço por alguns dias, controlados com a medicação orientada. Explicamos cada etapa antes e acompanhamos a recuperação de perto.",
      },
      {
        question: "Me disseram que não tenho osso suficiente. Ainda dá para fazer?",
        answer:
          "Perda óssea é comum após a ausência prolongada de um dente e nem sempre impede o implante. Existem técnicas de enxerto que reconstroem o volume necessário. Só os exames de imagem respondem ao seu caso, e na avaliação indicamos quais são necessários.",
      },
      {
        question: "Uso dentadura. Posso trocar por algo fixo?",
        answer:
          "Na maioria dos casos sim. Poucos implantes bem posicionados podem sustentar uma prótese fixa, que não é removida para higienizar e devolve firmeza para morder. O que define é o volume de osso disponível, e isso aparece nos exames de imagem indicados na avaliação.",
      },
      {
        question: "Implante dura a vida toda?",
        answer:
          "Com higiene adequada e acompanhamento periódico, implantes têm alta taxa de longevidade. Como qualquer estrutura na boca, dependem de manutenção, e por isso os retornos são parte do tratamento.",
      },
      {
        question: "Quanto tempo leva o tratamento completo?",
        answer:
          "Na média, de 3 a 6 meses do início ao fim, contando avaliação, planejamento, instalação, cicatrização e coroa definitiva. O que mais pesa nesse intervalo é o tempo de cicatrização, que varia conforme o caso e a resposta do seu organismo. O cronograma do seu caso é apresentado na avaliação.",
      },
      {
        question: "Fico sem dente durante a cicatrização?",
        answer:
          "Na maioria dos casos é possível usar uma solução provisória no período. Avaliamos essa possibilidade no planejamento.",
      },
      {
        question: "E se o implante não pegar?",
        answer:
          "A integração entre osso e implante é acompanhada em todas as etapas, e é justamente por isso que o planejamento parte dos exames de imagem. Casos de não integração são pouco frequentes e, quando acontecem, existe conduta para refazer. Você não fica sem solução.",
      },
      {
        question: "Sou diabética ou fumante. Posso fazer implante?",
        answer:
          "Essas condições exigem atenção redobrada, mas não são impedimento automático. Diabetes controlada e redução do tabagismo melhoram muito o prognóstico. A avaliação considera seu histórico de saúde completo.",
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
        "Perda de vários dentes na arcada superior, reabilitada com prótese fixa sobre implantes. O paciente voltou a ter dentes em toda a arcada.",
      shortLabel: "Reabilitação da arcada superior sobre implantes",
      /* O "depois" é um arquivo em retrato: o recorte quadrado da seção pega a
         região central da boca, que é onde está o sorriso frontal. */
      before: "/implante-a2.jpeg",
      after: "/implante-d2.png",
    },
    {
      label:
        "Reabilitação da arcada superior. A paciente usava uma prótese desgastada e passou a ter dentes fixos, com forma e cor planejadas.",
      shortLabel: "Reabilitação da arcada superior",
      /*
       * O "antes" é a prótese antiga em uso, não a arcada sem prótese: é a
       * condição real do dia a dia da paciente. Há uma terceira foto sem a
       * prótese (`implante-a1-semdente.jpeg`), deixada de fora de propósito
       * para não inflar a comparação.
       */
      before: "/implante-a1.png",
      after: "/implante-d1.png",
    },
    // TODO: segundo caso, de preferência um implante unitário, para a página
    // não ilustrar só reabilitação total.
  ],

  finalCta: {
    title: "Um plano de tratamento **antes de qualquer decisão**",
    body: "A primeira avaliação é gratuita. Nela examinamos o seu caso e indicamos os exames de imagem necessários para fechar o planejamento, com etapas, prazos e valores.",
    cta: "Agendar minha avaliação",
  },
};

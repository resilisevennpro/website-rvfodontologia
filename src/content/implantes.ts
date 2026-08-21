import type { LandingContent } from "./types";

/**
 * Copy da landing /implantes.
 *
 * Escrita dentro das regras de publicidade do CFO: sem promessa de resultado,
 * sem preço, sem sensacionalismo. Ao editar, manter esses limites.
 */
export const IMPLANTES: LandingContent = {
  origin: "implantes",

  hero: {
    title: "Voltar a mastigar **sem pensar nisso**",
    subtitle:
      "O implante substitui a raiz do dente perdido e devolve função, estabilidade e estética — com planejamento feito a partir da sua estrutura óssea.",
    cta: "Agendar avaliação",
  },

  audience: {
    title: "Quando o implante **entra em questão**",
    items: [
      "Perdeu um ou mais dentes e sente dificuldade para mastigar",
      "Usa prótese removível e gostaria de uma solução fixa",
      "Evita alguns alimentos por insegurança ao morder",
      "Percebe que a ausência de um dente está afetando os vizinhos",
      "Sente incômodo estético com a falta de um dente visível",
    ],
  },

  explainer: {
    title: "Uma raiz nova, **feita para durar**",
    paragraphs: [
      "O implante é um pino de titânio instalado no osso, que cumpre o papel da raiz perdida. Sobre ele é fixada a coroa — a parte visível, feita para se integrar aos dentes vizinhos em cor e formato.",
      "O titânio é biocompatível: o osso se integra a ele ao longo da cicatrização, o que dá ao implante a estabilidade necessária para suportar a mastigação no dia a dia.",
    ],
  },

  process: {
    title: "As **etapas** do tratamento",
    steps: [
      {
        title: "Avaliação e exames de imagem",
        body: "Analisamos a saúde bucal e a estrutura óssea. Os exames mostram volume e densidade do osso — o que define se o implante pode ser instalado de imediato.",
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
        body: "Período de integração entre osso e implante — em geral alguns meses, variando conforme o caso. Nesse intervalo é possível usar uma solução provisória.",
      },
      {
        title: "Coroa definitiva",
        body: "Instalamos a coroa planejada para se integrar naturalmente ao seu sorriso.",
      },
      {
        title: "Manutenção",
        body: "Retornos periódicos e higiene adequada são o que garante a longevidade do implante.",
      },
    ],
  },

  objections: {
    title: "Perguntas que **costumamos ouvir**",
    items: [
      {
        quote: "Tenho medo da cirurgia.",
        answer:
          "O procedimento é feito com anestesia local e você não sente dor durante a instalação. Explicamos cada etapa antes e acompanhamos o pós-operatório de perto.",
      },
      {
        quote: "Me disseram que não tenho osso suficiente.",
        answer:
          "Perda óssea é comum após a ausência prolongada de um dente — e nem sempre impede o implante. Existem técnicas de enxerto que reconstroem o volume necessário. Só a avaliação com exames de imagem responde ao seu caso.",
      },
      {
        quote: "É muito demorado.",
        answer:
          "O tratamento tem etapas e exige tempo de cicatrização, mas a maior parte desse período é de espera, não de consultas. Apresentamos o cronograma real na avaliação.",
      },
    ],
  },

  benefits: {
    title: "**Planejamento** antes de qualquer procedimento",
    items: [
      {
        title: "Diagnóstico com imagem",
        body: "A decisão sobre o implante parte de exames, não de estimativa.",
      },
      {
        title: "Estética e função juntas",
        body: "O implante precisa funcionar bem e parecer natural. As duas coisas entram no planejamento desde o início.",
      },
      {
        title: "Acompanhamento completo",
        body: "Do primeiro exame à manutenção, com a mesma equipe.",
      },
      {
        title: "Clareza sobre prazos",
        body: "Você sabe quantas etapas, quanto tempo e o que esperar de cada fase.",
      },
    ],
  },

  faq: {
    title: "**Perguntas** frequentes",
    items: [
      {
        question: "Implante dói?",
        answer:
          "A instalação é feita com anestesia local e você não sente dor no procedimento. No pós-operatório pode haver desconforto e inchaço por alguns dias, controlados com a medicação orientada.",
      },
      {
        question: "Quanto tempo leva o tratamento completo?",
        answer:
          "Varia conforme o caso, principalmente pelo tempo de cicatrização entre a instalação e a coroa definitiva. O cronograma do seu caso é apresentado na avaliação.",
      },
      {
        question: "Implante dura a vida toda?",
        answer:
          "Com higiene adequada e acompanhamento periódico, implantes têm alta taxa de longevidade. Como qualquer estrutura na boca, dependem de manutenção — por isso os retornos são parte do tratamento.",
      },
      {
        question: "Fico sem dente durante a cicatrização?",
        answer:
          "Na maioria dos casos é possível usar uma solução provisória no período. Avaliamos essa possibilidade no planejamento.",
      },
      {
        question: "Sou diabética ou fumante. Posso fazer implante?",
        answer:
          "Essas condições exigem atenção redobrada, mas não são impedimento automático. Diabetes controlada e redução do tabagismo melhoram muito o prognóstico. A avaliação considera seu histórico de saúde completo.",
      },
      {
        question: "Qual a diferença entre implante e prótese removível?",
        answer:
          "O implante é fixo, ancorado no osso, e não sai da boca — a mastigação fica mais próxima da natural. A prótese removível apoia-se sobre a gengiva e precisa ser retirada para higienização.",
      },
    ],
  },

  finalCta: {
    title: "Descubra o que é possível **no seu caso**",
    body: "A avaliação com exames de imagem é o que responde com precisão às suas dúvidas.",
    cta: "Falar no WhatsApp",
  },
};

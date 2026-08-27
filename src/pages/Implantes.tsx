import { useReveal } from "@/hooks/useReveal";
import { Seo } from "@/components/Seo";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
// import { WhatsAppFab } from "@/components/site/WhatsAppFab"; // desativado a pedido
import {
  Audience,
  BeforeAfter,
  Benefits,
  Explainer,
  Faq,
  FinalCta,
  Hero,
  CtaButton,
  Investment,
  Process,
  Team,
  Testimonials,
} from "@/components/site/sections";
import { IMPLANTES } from "@/content/implantes";
import {
  TESTIMONIALS,
  TESTIMONIALS_DISCLAIMER,
  TESTIMONIALS_SOURCE,
} from "@/content/depoimentos";
import { CLINIC, RESULTS_DISCLAIMER, SEO } from "@/content/site";
/*
 * Reserva: artes abstratas da marca, usadas antes das fotos reais. Comentadas
 * junto com os blocos que as usavam, senão o lint acusa import sem uso. Para
 * reverter, descomentar estas duas linhas e o bloco correspondente abaixo.
 *
 * import heroArt from "@/assets/abstract-implantes.png";
 * import explainerArt from "@/assets/abstract-clinica.png";
 */
/* Servidas de `public/`: fotos reais, fora do pipeline de assets do Vite. */
const equipePhoto = "/dr-vinicius-e-ricardo.png";
const raioXPhoto = "/dr-vinicius-02.jpeg";
const sorrisoPhoto = "/implante-sorrindo-lateral.jpeg";
const protesePhoto = "/arcada-protese.png";
const clinicaPhoto = "/rvf-odontologia-2.jpeg";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${CLINIC.domain}/implantes#faq`,
  mainEntity: IMPLANTES.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/**
 * Copy de autoridade da página. Fica aqui, e não em `implantes.ts`, porque é
 * dado institucional do profissional, não copy da área.
 *
 * Limite do CFO: só se cita especialidade registrada no CRO. Implantodontia e
 * prótese são o que interessa a esta página; os demais cursos do Dr. Vinicius
 * (lentes, facetas, dentística) pertencem a /lentes e diluiriam o foco aqui.
 * Por isso a formação complementar é descrita de forma agrupada, sem listar
 * curso a curso.
 */
// TODO: conferir a redação exata das especialidades como constam no registro
// do CRO antes de publicar.
const { implantodontia, protese } = CLINIC.professionals;
const TEAM_COPY = [
  `O tratamento é conduzido por dois profissionais, cada um na sua especialidade. A cirurgia fica com o **${implantodontia.name}**, **cirurgião-dentista especialista em Implantodontia**, que planeja e instala o implante.`,
  `A coroa, a parte visível que vai sobre o implante, é feita pelo **${protese.name}**, **especialista em Prótese Dentária**. É ele quem cuida do encaixe, da forma e da cor para que o dente se integre aos vizinhos.`,
  "Implante é cirurgia, e você tem o direito de saber quem opera. Os dois acompanham o seu caso dentro da clínica, do primeiro exame à manutenção, sem encaminhamento para fora.",
];

/**
 * Ordem própria desta landing. A persona (45 a 65 anos, criteriosa com gasto
 * alto) decide por autoridade técnica somada a transparência de orçamento.
 *
 * Por decisão do cliente, a equipe fica logo depois do processo e imediatamente
 * antes do investimento: a paciente vê quem opera e, na sequência, o
 * compromisso com o orçamento. Os CTAs sobem de compromisso conforme a página
 * desce.
 */
const Implantes = () => {
  useReveal();

  return (
  <>
    <Seo {...SEO.implantes} jsonLd={jsonLd} />
    <Navbar origin={IMPLANTES.origin} />
    <main>
      {/*
        Hero em teste com foto real. A versão com a arte abstrata da marca fica
        logo abaixo, comentada: para reverter, trocar um bloco pelo outro.

        O assunto da foto está à direita e o texto do hero ocupa a esquerda, que
        é onde o gradiente grafite é mais denso. Por isso o recorte é ancorado à
        direita, para o rosto e a radiografia não ficarem sob o texto.
      */}
      <Hero
        content={IMPLANTES}
        image={raioXPhoto}
        /*
         * A imagem ocupa os 70% da direita; os 30% da esquerda ficam no grafite
         * do próprio `section`, como bloco de cor sob o texto.
         *
         * `-scale-x-100` espelha: na foto original ele olha para fora da página,
         * e espelhado passa a olhar na direção do texto. No mobile a foto volta
         * a cobrir tudo, senão sobraria uma faixa estreita demais para ler.
         */
        /*
         * A própria imagem se dissolve na borda esquerda via `mask-image`, em
         * vez de um véu opaco por cima. É isso que remove a linha vertical: não
         * há borda dura onde a imagem termina, ela já chega transparente ali.
         *
         * A máscara é aplicada ao elemento já espelhado por `-scale-x-100`,
         * então `to_left` na máscara equivale à esquerda da tela.
         */
        stackedImage
        alt={`${CLINIC.responsibleTechnician} analisando uma radiografia panorâmica durante o planejamento de um implante`}
        /* No mobile a foto é um bloco estático acima do texto, em 4:3 e sem
           espelho (não há texto por cima para ela "olhar"). A partir do `lg`
           volta a ser o fundo absoluto de 70% à direita. */
        imageClassName="relative block aspect-[4/3] w-full object-cover object-[75%_50%] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:h-full lg:w-[70%] lg:-scale-x-100 lg:[mask-image:linear-gradient(to_left,transparent_0%,black_35%)]"
        /*
         * Véu suave sobre a largura inteira, só para assentar o texto sobre a
         * foto. Quem resolve a emenda é a máscara da imagem, então aqui não há
         * parada opaca: a transição é contínua da esquerda até o doutor, que
         * fica com a luz original.
         */
        overlayClassName="left-0 bg-gradient-to-r from-primary via-primary/50 via-45% to-transparent to-80%"
        /* Cobre a primeira dobra: 100dvh menos os 5rem da navbar sticky. O
           `dvh` acompanha a barra de endereço no mobile; o teto de 52rem evita
           um hero desproporcional em monitores muito altos. */
        heightClassName="py-12 lg:py-28 lg:min-h-[min(calc(100dvh-5rem),52rem)]"
        /* Container mais largo puxa o texto para perto da borda esquerda, e a
           coluna estreita evita que as linhas cheguem sob o tablet da foto. */
        containerClassName="max-w-5xl lg:max-w-7xl"
        contentClassName="max-w-3xl lg:max-w-xl"
        subtitleClassName="lg:max-w-full"
        secondary={{ label: "Como funciona o tratamento", targetId: "como-funciona" }}
      />
      {/* Reserva, com a arte abstrata:
      <Hero
        content={IMPLANTES}
        image={heroArt}
        secondary={{ label: "Como funciona o tratamento", targetId: "como-funciona" }}
      />
      */}
      <Audience content={IMPLANTES} />
      <Explainer
        content={IMPLANTES}
        image={sorrisoPhoto}
        alt="Prótese fixa sobre implantes instalada na arcada superior, vista de perfil com os dentes em oclusão"
        /*
         * No desktop a foto acompanha a altura do texto, sem proporção própria.
         *
         * `--zoom` e `--shift` são compostas pelo `.zoom-hover`, que já anima
         * `transform` no hover. Um `scale-*`/`translate-*` do Tailwind aqui
         * seria sobrescrito no hover e a imagem saltaria ao passar o mouse.
         *
         * O `object-position` já está no limite (100%), então o resto do
         * deslocamento vem do `--shift`.
         *
         * ATENÇÃO à relação entre os dois: o zoom se distribui para os dois
         * lados, então só metade dele compensa o deslocamento. Para não abrir
         * faixa vazia à esquerda, `--zoom` precisa ser no mínimo
         * `1 + 2 * --shift`. Com shift de 8%, o mínimo é 1.16.
         */
        /* Card em paisagem (4:3) em vez de acompanhar a altura do texto: mais
           largo que alto, sem mexer no zoom nem no recorte da imagem. */
        imageWrapperClassName="aspect-[4/3]"
        /* No mobile o recorte fica mais ao centro; o zoom e o deslocamento à
           direita são só do desktop. */
        imageClassName="size-full object-cover object-[60%_35%] [--zoom:1.15] lg:object-[100%_35%] lg:[--shift:8%] lg:[--zoom:1.2]"
      />
      <Process
        content={IMPLANTES}
        id="como-funciona"
        cta={{ label: "Tirar uma dúvida no WhatsApp" }}
      />
      <Team
        image={equipePhoto}
        alt={`${protese.name} e ${implantodontia.name}, responsáveis pelos casos de implante na ${CLINIC.name}`}
        title={"Quem vai **planejar e operar**"}
        paragraphs={TEAM_COPY}
        fillImage
        /* Preenche a coluna: altura mínima no mobile, onde não há coluna de
           texto ao lado para dar altura, e altura cheia a partir do lg. */
        imageClassName="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-full lg:min-h-[28rem]"
        credentials={[
          {
            role: implantodontia.specialty,
            name: implantodontia.name,
            cro: implantodontia.cro,
          },
          {
            role: protese.specialty,
            name: protese.name,
            cro: protese.cro,
          },
        ]}
      />
      <BeforeAfter
        id="casos"
        disclaimer={RESULTS_DISCLAIMER}
        title={"**Casos** da clínica"}
        intro="Casos tratados na clínica, publicados com autorização das pacientes."
        cases={IMPLANTES.cases}
        cta={{ label: "Quero saber se é possível no meu caso", origin: IMPLANTES.origin }}
      />
      <Testimonials
        id="depoimentos"
        items={TESTIMONIALS}
        disclaimer={TESTIMONIALS_DISCLAIMER}
        source={TESTIMONIALS_SOURCE}
        intro="Avaliações públicas de quem já foi atendido na clínica."
      />
      <Investment content={IMPLANTES} />
      <Benefits
        content={IMPLANTES}
        image={clinicaPhoto}
        alt={`Equipe da ${CLINIC.name} na recepção da clínica em ${CLINIC.city}`}
      />
      <CtaButton origin={IMPLANTES.origin} label="Pedir a avaliação do meu caso" />
      <Faq content={IMPLANTES} />
      <FinalCta
        content={IMPLANTES}
        image={protesePhoto}
        alt="Prótese fixa sobre implantes pronta, antes da instalação"
      />
    </main>
    <Footer origin={IMPLANTES.origin} />
    {/* Botão flutuante desativado a pedido. Para reativar, descomentar:
    <WhatsAppFab origin={IMPLANTES.origin} /> */}
    </>
  );
};

export default Implantes;

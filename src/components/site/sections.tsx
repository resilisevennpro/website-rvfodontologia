import { useEffect, useState } from "react";
import { ArrowDown, Check, MessageCircle, Quote, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { CLINIC, whatsappLink, type WhatsAppOrigin } from "@/content/site";
import type { Benefit, LandingContent, Testimonial } from "@/content/types";
import { SectionTitle } from "./SectionTitle";
import { highlight } from "./highlight";

/**
 * Envelope padrão de seção: largura, respiro vertical e ancoragem opcional.
 * O `scroll-mt` compensa a altura da navbar sticky ao navegar via `#id`.
 *
 * O fundo é sempre o off-white da página. O ritmo vertical vem dos cards e
 * dos blocos grafite de CTA, não de faixas de cor alternadas.
 */
function Section({
  id,
  className = "",
  backdrop,
  children,
}: {
  id?: string;
  className?: string;
  /** Camada de fundo que sangra até as bordas, atrás do conteúdo. */
  backdrop?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 px-5 py-16 lg:px-8 lg:py-20 ${
        backdrop ? "relative overflow-hidden" : ""
      } ${className}`}
    >
      {backdrop}
      <div className={`mx-auto max-w-5xl ${backdrop ? "relative" : ""}`}>{children}</div>
    </section>
  );
}

/**
 * Card padrão sobre o off-white: superfície levemente mais clara, contorno
 * discreto em grafite diluído e sombra suave. É o que dá relevo à página
 * agora que não há mais contraste de fundo entre seções.
 */
const CARD = "rounded-xl border border-foreground/20 bg-card shadow-soft";

/** Resposta ao ponteiro nos cards: elevação curta, sombra e contorno mais firme. */
const CARD_HOVER =
  "transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-foreground/35 hover:shadow-card";

export function Hero({
  content,
  image,
  imageClassName = "absolute inset-0 size-full object-cover",
  overlayClassName = "left-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40",
  heightClassName = "py-20 lg:py-28",
  containerClassName = "max-w-5xl",
  contentClassName = "max-w-3xl",
  subtitleClassName = "",
  stackedImage = false,
  alt,
  secondary,
}: {
  content: LandingContent;
  image?: string;
  /** Enquadramento do fundo. Fotos reais costumam precisar de `object-position`
   *  para o assunto não ficar sob o texto, que ocupa a esquerda. */
  imageClassName?: string;
  /**
   * Véu sobre a imagem. O padrão foi calibrado para as artes abstratas, que já
   * são escuras; fotos claras precisam de um véu mais denso para o texto
   * off-white manter contraste.
   */
  overlayClassName?: string;
  /**
   * Altura do hero. O padrão é o respiro vertical de sempre; uma landing com
   * foto real pode pedir mais altura para a imagem ter espaço de respirar.
   */
  heightClassName?: string;
  /**
   * Largura do container. Alargar aproxima o conteúdo da borda esquerda, já
   * que o container é centralizado.
   */
  containerClassName?: string;
  /**
   * Largura da coluna de texto. Estreitar afasta o texto do assunto da foto,
   * quando ela ocupa o lado direito do hero.
   */
  contentClassName?: string;
  /** Ajuste do subtítulo. Use `max-w-full` quando a coluna já for estreita. */
  subtitleClassName?: string;
  /**
   * No mobile, tira a foto do fundo e a empilha como bloco. Em telas estreitas
   * o texto sobre a imagem compete com o assunto dela; empilhado, os dois
   * ficam legíveis. A partir do `lg` a foto volta a ser fundo.
   */
  stackedImage?: boolean;
  /** Descrição da foto. Só usada quando ela é conteúdo, não fundo decorativo. */
  alt?: string;
  /** CTA secundário que rola para uma seção da própria página. */
  secondary?: { label: string; targetId: string };
}) {
  return (
    /* Fundo grafite garantido: o texto do hero é off-white mesmo sem a arte. */
    <section data-hero className="relative overflow-hidden bg-primary">
      {image && (
        <>
          {/* Em `stackedImage`, a foto é um bloco normal no mobile (acima do
              texto) e só vira fundo absoluto a partir do `lg`. */}
          <img
            src={image}
            alt={stackedImage ? (alt ?? "") : ""}
            aria-hidden={stackedImage && alt ? undefined : "true"}
            className={imageClassName}
            fetchPriority="high"
          />
          {/* Sem `left` próprio: quem define a borda esquerda do véu é o
              `overlayClassName`, para uma landing poder fazer o gradiente
              começar exatamente onde a imagem começa. O véu só existe onde a
              foto é fundo; empilhada, ela não tem texto por cima. */}
          <div
            aria-hidden="true"
            className={`absolute inset-y-0 right-0 ${
              stackedImage ? "hidden lg:block" : ""
            } ${overlayClassName}`}
          />
        </>
      )}
      <div
        className={`relative mx-auto flex flex-col justify-center px-5 lg:px-8 ${containerClassName} ${heightClassName}`}
      >
        <div className={contentClassName}>
          <h1 className="font-display text-4xl font-medium leading-[1.15] text-primary-foreground lg:text-6xl">
            {highlight(content.hero.title, "text-primary-foreground/60 font-semibold")}
          </h1>
          {/* `max-w-full` deixa o subtítulo respeitar uma coluna estreitada por
              `contentClassName`; sem isso o `max-w-2xl` a estouraria. */}
          <p
            className={`mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85 lg:text-lg ${subtitleClassName}`}
          >
            {content.hero.subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappLink(content.origin)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground shadow-card transition-[transform,box-shadow,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-card active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              {content.hero.cta}
            </a>

            {secondary && (
              <a
                href={`#${secondary.targetId}`}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/35 px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                {secondary.label}
                <ArrowDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Audience({
  content,
  id,
}: {
  content: LandingContent;
  id?: string;
}) {
  return (
    <Section id={id}>
      <SectionTitle>{content.audience.title}</SectionTitle>
      <ul className="reveal-stagger mt-8 grid gap-3 sm:grid-cols-2">
        {content.audience.items.map((item) => (
          <li key={item} className={`flex items-start gap-3 p-4 ${CARD} ${CARD_HOVER}`}>
            <Check
              aria-hidden="true"
              strokeWidth={2.5}
              className="mt-px size-5 shrink-0 text-foreground/85"
            />
            <span className="text-sm leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Explainer({
  content,
  image,
  alt,
  imageClassName = "aspect-[4/3] w-full object-cover",
  gridClassName = "lg:grid-cols-2",
  fillImage = false,
  imageWrapperClassName = "",
}: {
  content: LandingContent;
  image?: string;
  /**
   * Descrição da imagem. Sem `alt` a figura é tratada como decorativa, que é o
   * caso das artes abstratas da marca; fotos reais precisam de descrição.
   */
  alt?: string;
  imageClassName?: string;
  /** Proporção entre as colunas. O padrão divide o espaço meio a meio. */
  gridClassName?: string;
  /** Faz a imagem acompanhar a altura da coluna de texto, sem proporção fixa. */
  fillImage?: boolean;
  /** Ajustes no card da imagem, como um teto de altura em `fillImage`. */
  imageWrapperClassName?: string;
}) {
  return (
    <Section>
      {/* `items-stretch` quando a imagem preenche: assim ela acompanha a altura
          da coluna de texto em vez de impor a própria proporção. */}
      <div
        className={`grid gap-10 lg:gap-14 ${
          fillImage ? "items-stretch" : "items-center"
        } ${gridClassName}`}
      >
        {/*
          No mobile a imagem entra entre o título e os parágrafos, então o
          título é renderizado fora do bloco de texto e a imagem recebe
          `order`. A partir do `lg` tudo volta para a coluna da esquerda, na
          ordem natural.
        */}
        <div className="contents lg:block">
          <SectionTitle className="order-1 lg:mb-6">{content.explainer.title}</SectionTitle>
          <div className="order-3 space-y-4 lg:order-none">
            {/* `**trecho**` na copy vira ênfase em grafite, como nos títulos. */}
            {content.explainer.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                {highlight(paragraph, "font-semibold text-foreground")}
              </p>
            ))}
          </div>
        </div>
        {/* Ajustes de altura vão no card, não na imagem: aplicados só na
            imagem, o card manteria a altura do texto e sobraria fundo por
            baixo. */}
        {image && (
          <div
            className={`zoom-hover order-2 overflow-hidden rounded-2xl shadow-card lg:order-none ${
              fillImage ? `h-full ${imageWrapperClassName}` : imageWrapperClassName
            }`}
          >
            <img
              src={image}
              alt={alt ?? ""}
              aria-hidden={alt ? undefined : "true"}
              className={imageClassName}
              loading="lazy"
            />
          </div>
        )}
      </div>
    </Section>
  );
}

export function Process({
  content,
  id,
  cta,
}: {
  content: LandingContent;
  id?: string;
  /** CTA fechando a própria seção, sob a mesma faixa das etapas. */
  cta?: { label: string };
}) {
  return (
    /* Faixa mais clara: separa o processo das seções vizinhas agora que as
       etapas não têm mais caixa própria. */
    <Section id={id} className="bg-card">
      <SectionTitle>{content.process.title}</SectionTitle>
      {/* 3 colunas só quando fecham linhas cheias; senão 2, para não sobrar órfão. */}
      <ol
        className={`reveal-stagger mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 ${
          content.process.steps.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {content.process.steps.map((step, index) => (
          /* Sem caixa: o card claro sobre o off-white quase não se separava do
             fundo. A hierarquia vem do número em grafite e do filete no topo.
             No hover o filete e o número fecham para grafite cheio. */
          <li
            key={step.title}
            className="group border-t-2 border-foreground/85 pt-5 transition-colors duration-300 hover:border-foreground"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-semibold leading-none text-foreground/85 transition-colors duration-300 group-hover:text-foreground lg:text-4xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-bold leading-tight lg:text-2xl">
                {step.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </li>
        ))}
      </ol>
      {cta && (
        <div className="mt-12 flex justify-center">
          <a
            href={whatsappLink(content.origin)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-[transform,box-shadow,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-card active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            {cta.label}
          </a>
        </div>
      )}
    </Section>
  );
}

export function Objections({ content }: { content: LandingContent }) {
  if (!content.objections) return null;

  return (
    <Section>
      <SectionTitle>{content.objections.title}</SectionTitle>
      <div className="reveal-stagger mt-8 grid gap-5 lg:grid-cols-3">
        {content.objections.items.map((item) => (
          <div key={item.quote} className={`p-6 ${CARD} ${CARD_HOVER}`}>
            <Quote aria-hidden="true" className="size-5 text-brand-gray" />
            <p className="mt-3 font-display text-xl font-medium leading-snug">"{item.quote}"</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/**
 * Transparência de orçamento. Nomear o silêncio sobre preço é o que compra
 * credibilidade com quem tem valor como objeção nº 1. O CFO proíbe divulgar
 * valores, então o bloco descreve o método, nunca números.
 */
export function Investment({
  content,
  id,
}: {
  content: LandingContent;
  id?: string;
}) {
  if (!content.investment) return null;
  const { title, intro, items } = content.investment;

  return (
    <Section id={id} className="bg-card">
      <div className="max-w-3xl">
        <SectionTitle>{title}</SectionTitle>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
      </div>
      {/* Cards em grafite: dão peso ao compromisso de transparência e separam
          o bloco do miolo claro da página, no ponto em que a dúvida de preço
          é decidida. Sobre grafite, o texto inverte para primary-foreground. */}
      <ul className="reveal-stagger mt-8 grid gap-5 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <div className="flex items-start gap-3">
              <Check
                aria-hidden="true"
                strokeWidth={2.5}
                className="mt-1 size-5 shrink-0 text-primary-foreground/70"
              />
              <div>
                <h3 className="font-display text-xl font-medium leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                  {item.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/**
 * Carrossel dos diferenciais: um card por vez, avanço automático a cada 5s e
 * navegação manual com contador.
 *
 * O autoplay é feito com `setInterval` sobre a API do embla em vez do plugin
 * oficial, que não é dependência do projeto. Ele pausa quando o ponteiro está
 * sobre o carrossel, quando ele recebe foco pelo teclado e quando a aba sai de
 * foco, para não trocar de card debaixo de quem está lendo.
 */
function BenefitsCarousel({
  items,
  overImage,
}: {
  items: Benefit[];
  overImage: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;
    /* `prefers-reduced-motion`: sem avanço automático, só navegação manual. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      api.scrollNext();
    }, 5000);
    return () => window.clearInterval(id);
  }, [api, paused]);

  const cardClass = overImage
    ? "bg-primary/95 lg:border lg:border-primary-foreground/10"
    : "bg-primary";

  return (
    <div
      /* Sem `reveal`: o hook observa só os elementos existentes na montagem da
         página, e o carrossel entra depois, ficando invisível para sempre. */
      className={`mt-8 ${overImage ? "lg:max-w-md" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        aria-label="Diferenciais da clínica"
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.title}>
              {/* Altura mínima: numa coluna estreita os textos têm tamanhos
                  diferentes, e sem piso o card saltaria a cada troca. */}
              <div
                className={`flex h-full min-h-[11rem] flex-col justify-center rounded-2xl p-6 text-primary-foreground shadow-card ${cardClass}`}
              >
                <h3 className="font-display text-xl font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">
                  {item.body}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Contador e setas: âncora de navegação centralizada sob o card. */}
        <div className="mt-5 flex items-center justify-center gap-4">
          {/* A foto de fundo só existe a partir do `lg`: no mobile o fundo é o
              off-white, então o contador e as setas só invertem para claro no
              desktop, senão sumiriam. */}
          <p
            aria-live="polite"
            className={`font-display text-sm tabular-nums ${
              overImage ? "text-muted-foreground lg:text-primary-foreground/70" : "text-muted-foreground"
            }`}
          >
            {current + 1}/{items.length}
          </p>
          {/* Os botões do shadcn vêm `absolute` com `-left-12`/`-right-12`, que
              os joga para fora da tela no mobile. `!static` e `!inset-auto`
              anulam isso para eles fluírem nesta barra. */}
          <div className="flex items-center gap-2">
            <CarouselPrevious
              className={`!static !inset-auto size-9 !translate-y-0 ${
                overImage
                  ? "lg:border-primary-foreground/25 lg:bg-transparent lg:text-primary-foreground lg:hover:bg-primary-foreground/10 lg:hover:text-primary-foreground"
                  : ""
              }`}
            />
            <CarouselNext
              className={`!static !inset-auto size-9 !translate-y-0 ${
                overImage
                  ? "lg:border-primary-foreground/25 lg:bg-transparent lg:text-primary-foreground lg:hover:bg-primary-foreground/10 lg:hover:text-primary-foreground"
                  : ""
              }`}
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export function Benefits({
  content,
  image,
  alt,
  id,
}: {
  content: LandingContent;
  /** Foto de ambiente. Fundo da seção no desktop, bloco próprio no mobile. */
  image?: string;
  alt?: string;
  id?: string;
}) {
  return (
    /* Com foto, a seção vira o contexto dos cards: no desktop ela é fundo, com
       véu grafite para os cards escuros não se perderem sobre a imagem clara;
       no mobile entra como bloco antes do título, onde texto sobre foto em
       tela estreita ficaria ilegível. */
    <Section
      id={id}
      backdrop={
        image && (
          <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
            {/* `object-right`: o assunto da foto fica à direita, longe da
                coluna de cards. */}
            <img
              src={image}
              alt=""
              className="size-full object-cover object-right"
              loading="lazy"
            />
            {/* Gradiente em vez de véu chapado: grafite quase opaco sob os
                cards, abrindo para a direita para a clínica aparecer. */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/45 via-55% to-primary/10" />
          </div>
        )
      }
      /* Com foto de fundo, respiro vertical maior: o carrossel é compacto, e a
         altura extra é o que dá presença à imagem da clínica. */
      className={image ? "lg:py-28" : ""}
    >
      {/* No mobile a foto é bloco próprio. O recorte é aproximado para os
          rostos ganharem presença no quadro estreito; o `overflow-hidden` do
          container corta o excedente da escala. */}
      {image && (
        <div className="mb-10 overflow-hidden rounded-2xl shadow-card lg:hidden">
          <img
            src={image}
            alt={alt ?? ""}
            aria-hidden={alt ? undefined : "true"}
            className="block aspect-[4/3] w-full scale-125 object-cover"
            loading="lazy"
          />
        </div>
      )}
      <SectionTitle
        className={image ? "lg:text-primary-foreground" : ""}
        emphasisClass={
          image ? "text-brand-gray font-semibold lg:text-primary-foreground/60" : undefined
        }
      >
        {content.benefits.title}
      </SectionTitle>
      {/* Um card por vez, em carrossel: os diferenciais são lidos um a um, e a
          seção deixa de crescer com o número de itens. */}
      <BenefitsCarousel items={content.benefits.items} overImage={Boolean(image)} />
      {/* TODO: inserir números reais (anos de atuação, casos realizados) quando confirmados */}
    </Section>
  );
}

export function Faq({ content, id }: { content: LandingContent; id?: string }) {
  return (
    <Section id={id}>
      <div className="mx-auto max-w-3xl">
        <SectionTitle className="text-center">{content.faq.title}</SectionTitle>
        {/* Painel único: agrupa as perguntas em vez de deixá-las soltas na página. */}
        <Accordion type="single" collapsible className={`mt-8 overflow-hidden ${CARD}`}>
          {content.faq.items.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="border-foreground/25 last:border-0"
            >
              {/* Aberta, a pergunta vira faixa grafite — marca onde o leitor está. */}
              {/* A Cormorant carrega até 700, então aberta e fechada dividem o
                  mesmo peso; o estado aberto se distingue pelo fundo grafite. */}
              <AccordionTrigger className="px-6 text-left font-display text-lg font-bold transition-colors duration-300 ease-out hover:bg-foreground/5 hover:no-underline data-[state=open]:bg-primary data-[state=open]:text-primary-foreground data-[state=open]:hover:bg-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="bg-primary px-6 pb-5 text-sm leading-relaxed text-primary-foreground/80">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

export function FinalCta({
  content,
  image,
  alt,
  imageClassName = "aspect-[4/3] w-full rounded-xl object-cover",
}: {
  content: LandingContent;
  image?: string;
  alt?: string;
  imageClassName?: string;
}) {
  /*
   * Com imagem o bloco vira duas colunas no desktop, texto à esquerda e foto à
   * direita; no mobile a foto sobe para o topo, acima do título, e o texto
   * volta a ser centralizado. Sem imagem, o layout centralizado de sempre.
   */
  const figure = image && (
    <div className="zoom-hover overflow-hidden rounded-xl">
      <img
        src={image}
        alt={alt ?? ""}
        aria-hidden={alt ? undefined : "true"}
        className={imageClassName}
        loading="lazy"
      />
    </div>
  );

  return (
    <Section className="pb-20">
      <div
        className={`rounded-2xl bg-primary px-6 py-12 text-primary-foreground lg:px-12 lg:py-16 ${
          image
            ? "grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12"
            : "text-center"
        }`}
      >
        {/* No mobile a imagem vem antes do texto; no desktop, `lg:order-2`
            manda para a coluna da direita. */}
        {image && <div className="lg:order-2">{figure}</div>}

        <div className={image ? "text-center lg:text-left" : ""}>
          <SectionTitle emphasisClass="text-primary-foreground/60 font-semibold">
            {content.finalCta.title}
          </SectionTitle>
          <p
            className={`mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/80 ${
              image ? "mx-auto lg:mx-0" : "mx-auto"
            }`}
          >
            {content.finalCta.body}
          </p>
          <div className={`mt-8 flex ${image ? "justify-center lg:justify-start" : "justify-center"}`}>
            <a
              href={whatsappLink(content.origin)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-[transform,box-shadow,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-card active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              {content.finalCta.cta}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Comparativo entre materiais/opções de tratamento. */
export function Comparison({ content }: { content: LandingContent }) {
  if (!content.comparison) return null;
  const { title, intro, columns, rows } = content.comparison;

  return (
    <Section>
      <div className="max-w-3xl">
        <SectionTitle>{title}</SectionTitle>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className={`w-full min-w-[34rem] border-collapse overflow-hidden ${CARD}`}>
          {/* Cabeçalho grafite: ancora a tabela e destaca as opções comparadas. */}
          <thead className="bg-primary text-primary-foreground">
            <tr>
              <th scope="col" className="p-4 text-left text-xs font-medium uppercase tracking-wider text-primary-foreground/60">
                {/* coluna dos rótulos */}
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="p-4 text-left font-display text-lg font-medium"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-foreground/10 transition-colors duration-200 last:border-0 hover:bg-foreground/[0.04]"
              >
                <th scope="row" className="p-4 text-left text-sm font-medium text-muted-foreground">
                  {row.label}
                </th>
                {row.values.map((value, i) => (
                  <td key={`${row.label}-${i}`} className="p-4 text-sm leading-relaxed">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/**
 * Botão de CTA solto entre seções, sem card nem texto de apoio. Serve para
 * repetir a saída ao longo da página sem o peso do bloco grafite do
 * `InlineCta`, que fica reservado aos pontos de decisão.
 */
export function CtaButton({
  origin,
  label,
}: {
  origin: WhatsAppOrigin;
  label: string;
}) {
  return (
    <Section className="py-6 lg:py-8">
      <div className="flex justify-center">
        <a
          href={whatsappLink(origin)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-[transform,box-shadow,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-card active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          {label}
        </a>
      </div>
    </Section>
  );
}

/** CTA intermediário, para captar a decisão no meio da página. */
export function InlineCta({
  origin,
  text,
  label,
}: {
  origin: WhatsAppOrigin;
  text: string;
  label: string;
}) {
  return (
    <Section className="py-10 lg:py-12">
      {/*
        Bloco grafite: âncora escura sobre o off-white, separando o CTA do corpo.
        Largura limitada e conteúdo agrupado ao centro — esticado nos 5xl, sobrava
        um vão morto entre a frase e o botão no desktop.
      */}
      <div className="mx-auto flex w-full max-w-2xl flex-col items-start gap-5 rounded-2xl bg-primary px-6 py-7 text-primary-foreground shadow-card sm:w-fit sm:flex-row sm:items-center sm:gap-6 lg:px-8">
        <p className="max-w-sm font-display text-2xl font-medium leading-snug">
          {highlight(text, "text-primary-foreground/60 font-semibold")}
        </p>
        <a
          href={whatsappLink(origin)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground shadow-card transition-[transform,box-shadow,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-card active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          {label}
        </a>
      </div>
    </Section>
  );
}

/**
 * Apresentação institucional da equipe. Sem números até haver dado real.
 *
 * `title` e `paragraphs` permitem que uma landing troque a copy pela versão
 * da sua área. Em /implantes isso é essencial: o gatilho de decisão é
 * autoridade técnica, e o leitor quer saber quem opera antes da parte técnica.
 */
export function Team({
  image,
  alt,
  title = "Quem vai cuidar do **seu sorriso**",
  paragraphs,
  id,
  /**
   * Enquadramento da foto. O padrão quadrado serve à foto de equipe; retratos
   * em orientação paisagem precisam de `object-position` para não cortar o
   * rosto ao serem reduzidos à coluna.
   */
  imageClassName = "aspect-square w-full object-cover",
  fillImage = false,
  credentials = [
    {
      role: "Responsável técnico",
      name: CLINIC.responsibleTechnician,
      cro: CLINIC.cro,
    },
  ],
}: {
  image: string;
  alt?: string;
  title?: string;
  paragraphs?: string[];
  imageClassName?: string;
  /**
   * Faz a foto preencher a coluna inteira, acompanhando a altura do texto.
   * Sem isso a imagem fica centralizada e com sombra, no formato de card.
   */
  fillImage?: boolean;
  /** Registros exibidos como selo. Só entram profissionais com CRO. */
  credentials?: { role: string; name: string; cro: string }[];
  id?: string;
}) {
  const body = paragraphs ?? [
    `A ${CLINIC.name} reúne uma equipe de cirurgiões-dentistas em ${CLINIC.city}, com áreas de atuação complementares. Na prática, isso significa que o seu caso é discutido por mais de um profissional quando envolve mais de uma especialidade.`,
    "O atendimento acontece do diagnóstico à manutenção com a mesma equipe, sem encaminhamento para fora a cada etapa do tratamento. Além da estética, a clínica faz próteses, tratamento de canal e o acompanhamento de rotina.",
  ];

  return (
    <Section id={id}>
      <div
        className={`grid gap-10 lg:grid-cols-2 lg:gap-14 ${
          fillImage ? "items-stretch" : "items-center"
        }`}
      >
        {/* `fillImage`: a foto preenche a coluna e acompanha a altura do texto,
            em vez de flutuar centralizada com cara de card. */}
        <div
          className={
            fillImage
              ? "overflow-hidden rounded-2xl"
              : "zoom-hover rounded-2xl shadow-card"
          }
        >
          <img
            src={image}
            alt={alt ?? `Equipe da ${CLINIC.name}`}
            className={imageClassName}
            loading="lazy"
          />
        </div>
        <div>
          <SectionTitle>{title}</SectionTitle>
          {/* `**trecho**` no texto vira ênfase em grafite: serve para a
              credencial dentro do parágrafo, que se perderia no cinza do corpo. */}
          <div className="mt-6 space-y-4">
            {body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                {highlight(paragraph, "font-semibold text-foreground")}
              </p>
            ))}
          </div>
          {/* Credenciais como selo, não como nota de rodapé: são registro
              público do CFO e o principal redutor de risco percebido nesta
              seção. O contorno grafite separa do corpo do texto sem pedir a
              atenção de um card cheio. */}
          <ul className="mt-7 flex flex-col items-start gap-2">
            {credentials.map((credential) => (
              <li
                key={credential.cro}
                className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-foreground/25 px-4 py-2 text-sm"
              >
                <span className="text-muted-foreground">{credential.role}</span>
                <span aria-hidden="true" className="text-foreground/30">
                  |
                </span>
                <span className="font-medium text-foreground">{credential.name}</span>
                <span className="font-medium text-brand-gray">{credential.cro}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/**
 * Depoimentos em carrossel. As citações vêm das avaliações públicas do Google,
 * transcritas como texto — nunca como print: texto escala no mobile, é lido por
 * leitor de tela e indexado.
 *
 * A ressalva do CFO fecha o bloco, junto do link para o perfil de origem, que é
 * o que torna os relatos verificáveis.
 */
export function Testimonials({
  items,
  disclaimer,
  source,
  id,
  title = "O que dizem as **pacientes**",
  intro,
}: {
  items: Testimonial[];
  disclaimer: string;
  source?: { label: string; href: string };
  id?: string;
  title?: string;
  intro?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;
    /* `prefers-reduced-motion`: sem avanço automático, só navegação manual. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* Mais lento que o carrossel de diferenciais: aqui há texto corrido para
       ler, e trocar em 5s tiraria a citação do meio da leitura. */
    const id = window.setInterval(() => {
      if (document.hidden) return;
      api.scrollNext();
    }, 8000);
    return () => window.clearInterval(id);
  }, [api, paused]);

  /* Um snap por card também no desktop: com 2 por vista, o contador passa a
     contar páginas e não depoimentos, e a conta bate errado no fim do laço. */
  const total = items.length;

  return (
    <Section id={id}>
      <div className="max-w-3xl">
        <SectionTitle>{title}</SectionTitle>
        {intro && (
          <p className="reveal mt-4 text-base leading-relaxed text-muted-foreground">
            {intro}
          </p>
        )}
      </div>

      <div
        /* Sem `reveal`: o hook observa só os elementos presentes na montagem,
           e o conteúdo do carrossel entra depois. */
        className="mt-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          aria-label="Depoimentos de pacientes"
        >
          <CarouselContent className="items-stretch">
            {items.map((item) => (
              <CarouselItem key={item.name} className="sm:basis-1/2">
                {/* Altura mínima: as citações têm comprimentos bem diferentes,
                    e sem piso o card saltaria a cada troca. */}
                <figure
                  className={`flex h-full min-h-[16rem] flex-col p-6 ${CARD}`}
                >
                  <Quote
                    aria-hidden="true"
                    className="size-6 shrink-0 text-brand-gray"
                  />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-5 border-t border-foreground/10 pt-4">
                    <span className="block font-display text-lg font-medium leading-tight">
                      {item.name}
                    </span>
                    <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      {/* A nota é dado da avaliação, não elogio escrito pela
                          clínica. O texto acessível evita ler 5 ícones soltos. */}
                      <span aria-hidden="true" className="flex gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star key={i} className="size-3 fill-current" />
                        ))}
                      </span>
                      <span className="sr-only">5 de 5 estrelas.</span>
                      Avaliação no Google
                    </span>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Contador e setas: mesma âncora de navegação do carrossel de
              diferenciais, centralizada sob os cards. */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <p
              aria-live="polite"
              className="font-display text-sm tabular-nums text-muted-foreground"
            >
              {current + 1}/{total}
            </p>
            {/* Os botões do shadcn vêm `absolute` com `-left-12`/`-right-12`,
                que os joga para fora da tela no mobile. `!static` e
                `!inset-auto` anulam isso para eles fluírem nesta barra. */}
            <div className="flex items-center gap-2">
              <CarouselPrevious className="!static !inset-auto size-9 !translate-y-0" />
              <CarouselNext className="!static !inset-auto size-9 !translate-y-0" />
            </div>
          </div>
        </Carousel>
      </div>

      <p className="reveal mt-6 text-sm leading-relaxed text-muted-foreground">
        {disclaimer}
        {source && (
          <>
            {" "}
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm underline underline-offset-4 transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {source.label}
            </a>
            .
          </>
        )}
      </p>
    </Section>
  );
}

export interface BeforeAfterCase {
  /** Descreve o caso, não a paciente. Ex.: "Reabilitação da arcada superior". */
  label: string;
  /** Descrição curta para o `alt` das imagens. Cai no `label` quando ausente. */
  shortLabel?: string;
  /** Proporção do par, quando o padrão 4:3 não serve às fotos do caso. */
  aspect?: string;
  before?: string;
  after?: string;
}

/**
 * Antes e depois. Exige autorização escrita da paciente e a ressalva ética
 * do CFO, que fica visível abaixo da grade.
 *
 * Um caso sem foto cai no placeholder tracejado, para a seção poder ficar
 * montada enquanto as imagens não chegam.
 */
export function BeforeAfter({
  disclaimer,
  id,
  title = "**Casos** da clínica",
  intro,
  cases = [{ label: "Caso 1" }, { label: "Caso 2" }, { label: "Caso 3" }],
  cta,
}: {
  disclaimer: string;
  id?: string;
  title?: string;
  intro?: string;
  cases?: BeforeAfterCase[];
  /** CTA fechando a seção, depois da ressalva ética. */
  cta?: { label: string; origin: WhatsAppOrigin };
}) {
  return (
    <Section id={id} className="bg-card">
      <div className="max-w-3xl">
        <SectionTitle>{title}</SectionTitle>
        {intro && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p>
        )}
      </div>

      {/* Caso único não vai para grade: sozinho em duas colunas ficaria com
          metade da largura e um vão morto ao lado. */}
      <div
        className={
          cases.length === 1
            ? "reveal-stagger mt-8 max-w-xl"
            : `reveal-stagger mt-8 grid gap-6 sm:grid-cols-2 ${
                cases.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2"
              }`
        }
      >
        {cases.map((item) => (
          <figure key={item.label} className={`h-full p-4 ${CARD}`}>
            {/* Antes e depois lado a lado: a comparação só funciona se as duas
                imagens tiverem o mesmo enquadramento e a mesma altura. */}
            <div className="grid grid-cols-2 gap-2">
              {(["before", "after"] as const).map((moment) => {
                const src = item[moment];
                const caption = moment === "before" ? "Antes" : "Depois";
                return (
                  <div key={moment}>
                    {src ? (
                      <img
                        src={src}
                        alt={`${item.shortLabel ?? item.label}, ${caption.toLowerCase()} do tratamento`}
                        className={`w-full rounded-lg object-cover ${
                          item.aspect ?? "aspect-[4/3] lg:aspect-square"
                        }`}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={`grid place-items-center rounded-lg border border-dashed border-foreground/25 bg-foreground/[0.03] px-3 text-center ${
                          item.aspect ?? "aspect-[4/3] lg:aspect-square"
                        }`}
                      >
                        <span className="text-xs leading-relaxed text-brand-gray">
                          aguardando foto
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-foreground">
              {item.label}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Ressalva ética do CFO: precisa ser legível, não miudinho de rodapé, e
          fica colada às imagens, antes do CTA. */}
      <p className="mt-6 font-accent text-lg font-medium leading-relaxed text-muted-foreground lg:text-xl">
        {disclaimer}
      </p>

      {cta && (
        <div className="mt-10 flex justify-center">
          <a
            href={whatsappLink(cta.origin)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-[transform,box-shadow,opacity] duration-300 ease-out hover:-translate-y-0.5 hover:opacity-95 hover:shadow-card active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            {cta.label}
          </a>
        </div>
      )}
    </Section>
  );
}

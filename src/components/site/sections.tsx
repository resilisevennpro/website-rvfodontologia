import { ArrowDown, Check, MessageCircle, Quote } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CLINIC, whatsappLink, type WhatsAppOrigin } from "@/content/site";
import type { LandingContent } from "@/content/types";
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
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 px-5 py-16 lg:px-8 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-5xl">{children}</div>
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
  secondary,
}: {
  content: LandingContent;
  /** Arte abstrata da marca. TODO: substituir por foto real da clínica. */
  image?: string;
  /** CTA secundário que rola para uma seção da própria página. */
  secondary?: { label: string; targetId: string };
}) {
  return (
    /* Fundo grafite garantido: o texto do hero é off-white mesmo sem a arte. */
    <section data-hero className="relative overflow-hidden bg-primary">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
            fetchPriority="high"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40"
          />
        </>
      )}
      <div className="relative mx-auto max-w-5xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-medium leading-[1.15] text-primary-foreground lg:text-6xl">
            {highlight(content.hero.title, "text-primary-foreground/60 font-semibold")}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85 lg:text-lg">
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

export function Audience({ content }: { content: LandingContent }) {
  return (
    <Section>
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
}: {
  content: LandingContent;
  /** Arte abstrata da marca. TODO: substituir por foto real da clínica. */
  image?: string;
}) {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionTitle>{content.explainer.title}</SectionTitle>
          <div className="mt-6 space-y-4">
            {content.explainer.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        {image && (
          <div className="zoom-hover rounded-2xl shadow-card">
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="aspect-[4/3] w-full object-cover"
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
              <h3 className="font-display text-xl font-semibold leading-tight lg:text-2xl">
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

export function Benefits({ content }: { content: LandingContent }) {
  return (
    <Section>
      <SectionTitle>{content.benefits.title}</SectionTitle>
      {/* Cards em grafite: os diferenciais ganham peso e quebram a sequência
          de blocos claros da página. */}
      <div className="reveal-stagger mt-8 grid gap-5 sm:grid-cols-2">
        {content.benefits.items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <h3 className="font-display text-xl font-medium">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{item.body}</p>
          </div>
        ))}
      </div>
      {/* TODO: inserir números reais (anos de atuação, casos realizados) quando confirmados */}
    </Section>
  );
}

export function Faq({ content }: { content: LandingContent }) {
  return (
    <Section>
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

export function FinalCta({ content }: { content: LandingContent }) {
  return (
    <Section className="pb-20">
      <div className="rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground lg:px-12 lg:py-16">
        <SectionTitle emphasisClass="text-primary-foreground/60 font-semibold">{content.finalCta.title}</SectionTitle>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
          {content.finalCta.body}
        </p>
        <div className="mt-8 flex justify-center">
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

/** Apresentação institucional da equipe. Sem números até haver dado real. */
export function Team({ image }: { image: string }) {
  return (
    <Section>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="zoom-hover rounded-2xl shadow-card">
          <img
            src={image}
            alt={`Equipe da ${CLINIC.name}`}
            className="aspect-square w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <SectionTitle>{"Quem vai cuidar do **seu sorriso**"}</SectionTitle>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            A {CLINIC.name} reúne uma equipe de cirurgiões-dentistas em {CLINIC.city}, com
            áreas de atuação complementares. Na prática, isso significa que o seu caso é
            discutido por mais de um profissional quando envolve mais de uma especialidade.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            O atendimento acontece do diagnóstico à manutenção com a mesma equipe — você
            não é encaminhada para fora a cada etapa do tratamento. Além da estética,
            a clínica faz próteses, tratamento de canal e o acompanhamento de rotina.
          </p>
          {/* TODO: nomes, especialidades registradas e CRO de cada profissional */}
          <p className="mt-6 text-sm text-brand-gray">
            Responsável técnico: {CLINIC.responsibleTechnician} — {CLINIC.cro}
          </p>
        </div>
      </div>
    </Section>
  );
}

/** Antes e depois — exige autorização escrita da paciente e a ressalva ética. */
export function BeforeAfter({ disclaimer, id }: { disclaimer: string; id?: string }) {
  return (
    <Section id={id}>
      <SectionTitle>{"**Casos** da clínica"}</SectionTitle>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="grid aspect-[4/5] place-items-center rounded-xl border border-dashed border-foreground/20 bg-foreground/[0.03] text-center"
          >
            <span className="px-4 text-xs leading-relaxed text-muted-foreground">
              Caso {n}
              <br />
              <span className="text-brand-gray">
                aguardando foto e autorização da paciente
              </span>
            </span>
          </div>
        ))}
      </div>
      {/* Ressalva ética do CFO: precisa ser legível, não miudinho de rodapé. */}
      <p className="mt-6 font-accent text-base leading-relaxed text-muted-foreground lg:text-lg">
        {disclaimer}
      </p>
    </Section>
  );
}

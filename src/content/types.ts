import type { WhatsAppOrigin } from "./site";

export interface Step {
  title: string;
  body: string;
}

export interface Benefit {
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Objection {
  quote: string;
  answer: string;
}

/**
 * Depoimento de paciente. A citação é transcrição de avaliação pública; quando
 * precisa de corte por regra do CFO, `edited` marca isso no arquivo de
 * conteúdo para a alteração ficar rastreável.
 */
export interface Testimonial {
  name: string;
  quote: string;
  /** Citação encurtada em relação ao original. Ver comentário no item. */
  edited?: boolean;
}

export interface ComparisonRow {
  label: string;
  values: [string, string];
}

/**
 * Bloco de transparência de orçamento. O CFO proíbe divulgar preço, então
 * aqui se descreve o método (plano fechado, sem surpresa), nunca valores.
 */
export interface Investment {
  title: string;
  intro: string;
  items: Benefit[];
}

export interface Comparison {
  title: string;
  intro: string;
  columns: [string, string];
  rows: ComparisonRow[];
}

export interface LandingContent {
  origin: WhatsAppOrigin;
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  audience: {
    title: string;
    items: string[];
  };
  explainer: {
    title: string;
    paragraphs: string[];
  };
  process: {
    title: string;
    steps: Step[];
  };
  objections?: {
    title: string;
    items: Objection[];
  };
  investment?: Investment;
  comparison?: Comparison;
  /** Antes e depois. Só com autorização escrita da paciente. */
  cases?: {
    label: string;
    shortLabel?: string;
    aspect?: string;
    before?: string;
    after?: string;
  }[];
  benefits: {
    title: string;
    items: Benefit[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  finalCta: {
    title: string;
    body: string;
    cta: string;
  };
}

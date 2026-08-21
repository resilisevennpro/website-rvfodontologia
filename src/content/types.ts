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

export interface ComparisonRow {
  label: string;
  values: [string, string];
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
  comparison?: Comparison;
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

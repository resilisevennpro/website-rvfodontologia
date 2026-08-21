import { Seo } from "@/components/Seo";
import { LENTES } from "@/content/lentes";
import { SEO } from "@/content/site";

/** Placeholder — a landing completa é construída na Fase 6. */
const Lentes = () => (
  <>
    <Seo {...SEO.lentes} />
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl">{LENTES.hero.title}</h1>
        <p className="mt-4 text-muted-foreground">{LENTES.hero.subtitle}</p>
      </div>
    </main>
  </>
);

export default Lentes;

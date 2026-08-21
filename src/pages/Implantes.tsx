import { Seo } from "@/components/Seo";
import { IMPLANTES } from "@/content/implantes";
import { SEO } from "@/content/site";

/** Placeholder — a landing completa é construída na Fase 6. */
const Implantes = () => (
  <>
    <Seo {...SEO.implantes} />
    <main className="min-h-screen px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl">{IMPLANTES.hero.title}</h1>
        <p className="mt-4 text-muted-foreground">{IMPLANTES.hero.subtitle}</p>
      </div>
    </main>
  </>
);

export default Implantes;

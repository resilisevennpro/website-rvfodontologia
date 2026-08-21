import { highlight } from "./highlight";

/**
 * Título de seção com destaque nas palavras marcadas com `**asteriscos**`
 * na copy. O corpo do título é grafite — a cor principal da marca; a palavra
 * destacada recua para o cinza, mas ganha peso para não perder presença.
 */
export function SectionTitle({
  children,
  className = "",
  /**
   * Cor das palavras destacadas. O cinza sobre off-white é mais claro que o
   * grafite do título, então a ênfase vem compensada por peso (ver `highlight`)
   * — nunca só por cor.
   */
  emphasisClass = "text-brand-gray font-semibold",
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  emphasisClass?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={`reveal font-display text-3xl font-medium leading-tight lg:text-4xl ${className}`}
    >
      {highlight(children, emphasisClass)}
    </Tag>
  );
}

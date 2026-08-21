import type { ReactNode } from "react";

/**
 * Divide um título marcado com `**asteriscos**` e devolve as palavras
 * destacadas envolvidas em <em>, para receberem a cor de ênfase.
 */
export function highlight(text: string, emphasisClass: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className={`not-italic ${emphasisClass}`}>
        {part}
      </em>
    ) : (
      part
    ),
  );
}

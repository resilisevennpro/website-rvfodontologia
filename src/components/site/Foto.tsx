import imagens from "@/content/imagens.json";

/*
 * Imagem responsiva do site.
 *
 * Recebe o caminho da foto como ela é nomeada em `fotos-originais/` (o mesmo
 * caminho que já estava no `src` das <img>) e serve as variantes WebP de
 * `public/img/`, geradas por `npm run images`. O navegador escolhe a largura
 * pelo `sizes`: no celular baixa a de 640, não o arquivo em tamanho integral.
 *
 * Foto nova só aparece depois de `npm run images` — os originais não vão para
 * o deploy, então não há de onde cair de volta.
 *
 * Não há fallback em JPEG/PNG de propósito: o build tem como alvo ES2020, e
 * todo navegador capaz de rodar o site suporta WebP (Safari 14+, 2020).
 */

/*
 * `display:contents` faz a <picture> sumir da árvore de layout: o <img>
 * continua sendo, para o CSS, filho direto do container original.
 *
 * É isso que permite trocar <img> por <Foto> sem tocar em nenhuma classe das
 * chamadas. As classes dos heros misturam layout (`lg:absolute`, `lg:w-[70%]`)
 * e pintura (`object-cover`, `object-[75%_50%]`, `-scale-x-100`, `mask-image`)
 * na mesma string; separá-las entre <picture> e <img> à mão quebraria o
 * enquadramento das landings.
 */
const CONTENTS = "[display:contents]";

/*
 * GIF transparente de 1x1, embutido: zero requisições.
 *
 * Serve de `src` quando a foto é restrita a uma faixa de tela (`onlyAbove`).
 * Fora dessa faixa nenhuma <source> casa, e um <img> sem `src` é HTML inválido
 * — alguns navegadores mostram o ícone de imagem quebrada. Com o pixel o
 * elemento fica válido e invisível, e nada é baixado.
 */
const PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

type Dimensao = { largura: number; altura: number; larguras: number[] };
const catalogo = imagens as Record<string, Dimensao>;

/** `/dr-vinicius-02.jpeg` -> `/img/dr-vinicius-02` */
const base = (src: string) => `/img${src.replace(/\.(jpe?g|png)$/i, "")}`;

/* As larguras vêm do manifesto: são exatamente as que o script gerou. */
function srcSet(src: string, larguras: number[]) {
  return larguras.map((l) => `${base(src)}-${l}.webp ${l}w`).join(", ");
}

/* `src` do <img>: a menor variante. É só o ponto de partida — havendo
   `srcset`, o navegador troca pela largura certa antes de baixar. */
const fallback = (src: string, larguras: number[]) =>
  `${base(src)}-${larguras[0]}.webp`;

export function Foto({
  src,
  alt,
  className,
  wrapperClassName,
  sizes = "100vw",
  priority = false,
  onlyAbove,
  onlyBelow,
  ...rest
}: {
  /** Caminho do original em `public/`, com a extensão. Ex.: `/dr-vinicius-02.jpeg` */
  src: string;
  alt: string;
  className?: string;
  /*
   * Escapatória para classes no <picture>. Raramente necessária: por padrão a
   * <picture> usa `display:contents` e desaparece do layout (ver abaixo).
   */
  wrapperClassName?: string;
  /**
   * Quanto da largura da viewport a imagem ocupa, por breakpoint. É isto que
   * decide qual variante o navegador baixa — o padrão `100vw` faz ele pegar a
   * maior, então vale declarar quando a imagem for menor que a tela.
   */
  sizes?: string;
  /**
   * Para a imagem do LCP (o hero). Tira o `lazy`, que atrasaria justamente a
   * imagem que define a métrica, e sobe a prioridade na fila de rede.
   */
  priority?: boolean;
  /**
   * Para foto que o CSS esconde abaixo de certa largura (`hidden lg:block`).
   * `display:none` não impede o download; restringir a fonte por `media`, sim.
   * Passar o mesmo px do breakpoint usado nas classes.
   */
  onlyAbove?: number;
  /** O inverso de `onlyAbove`, para foto dentro de `lg:hidden`. */
  onlyBelow?: number;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "sizes">) {
  const dim = catalogo[src];
  const media = onlyAbove
    ? `(min-width: ${onlyAbove}px)`
    : onlyBelow
      ? `(max-width: ${onlyBelow - 0.02}px)`
      : undefined;

  /*
   * `width`/`height` só quando o CSS não dita as duas dimensões.
   *
   * Os atributos servem para reservar espaço e evitar o salto de layout, mas o
   * navegador também os usa como proporção padrão (`aspect-ratio: w / h`).
   * Numa foto de fundo (`absolute h-full w-[55%]`) ou com `aspect-*` próprio,
   * essa proporção briga com o CSS e muda o recorte do `object-cover` — foi o
   * que virou o enquadramento da seção de diferenciais de vertical para
   * horizontal.
   *
   * Nesses casos o container já reserva o espaço, então não há CLS a evitar.
   */
  const cssDitaTamanho =
    /\b(absolute|inset-|h-full|size-full|aspect-)/.test(className ?? "") ||
    /* Restrita a uma faixa de tela: fora dela o `src` é o pixel transparente,
       e dimensões de foto o esticariam para 4160x2773. */
    Boolean(media);
  const dimensoes =
    dim && !cssDitaTamanho ? { width: dim.largura, height: dim.altura } : {};

  /*
   * Sem entrada no manifesto a foto não passou pelo `npm run images`. Melhor
   * servir o caminho recebido do que montar URLs de arquivos inexistentes.
   */
  if (!dim) {
    return (
      <picture className={wrapperClassName ?? CONTENTS}>
        <img
          src={src}
          alt={alt}
          className={className}
          loading={priority ? undefined : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          {...rest}
        />
      </picture>
    );
  }

  return (
    <picture className={wrapperClassName ?? CONTENTS}>
      {/*
       * Com `media`, esta é a única fonte: fora da faixa nada casa e o <img>
       * fica no pixel transparente, sem baixar nada. É assim que uma foto de
       * `hidden lg:block` deixa de pesar no celular.
       */}
      <source
        media={media}
        type="image/webp"
        srcSet={srcSet(src, dim.larguras)}
        sizes={sizes}
      />
      <img
        src={media ? PIXEL : fallback(src, dim.larguras)}
        alt={alt}
        className={className}
        sizes={media ? undefined : sizes}
        srcSet={media ? undefined : srcSet(src, dim.larguras)}
        {...dimensoes}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? undefined : "async"}
        {...rest}
      />
    </picture>
  );
}

/*
 * Gera as variantes WebP responsivas de `fotos-originais/` em `public/img/`.
 *
 * Os originais ficam fora de `public/` de propósito: o Vite copia `public/`
 * inteiro para o `dist`, e eles somavam ~14 MB de arquivos que nenhuma página
 * referencia. Versionados aqui, continuam sendo a fonte para regerar as
 * variantes sempre que preciso, sem irem para o deploy.
 *
 * Rodar depois de adicionar ou trocar qualquer foto:
 *
 *   npm run images
 *
 * A saída é determinística — mesmo original, mesmo resultado — então rodar duas
 * vezes não suja o diff. Arquivos já gerados e atualizados são pulados.
 */
import sharp from "sharp";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const origem = path.join(raiz, "fotos-originais");
const destino = path.join(raiz, "public", "img");
const manifesto = path.join(raiz, "src", "content", "imagens.json");

/* As larguras cobrem o mobile (640), o tablet e o desktop comum (1024) e as
   telas densas (1600). Acima disso o ganho visual não paga os bytes. */
/*
 * 400 entra por causa dos antes/depois: são pares lado a lado dentro de um
 * card, e cada foto fica com ~230px no desktop e ~180px no celular. Sem uma
 * variante pequena, a de 640 era a menor opção e o navegador baixava mais que
 * o dobro do necessário.
 */
const LARGURAS = [400, 640, 1024, 1600];
const QUALIDADE = 78;

/*
 * Larguras sob medida para imagens que nunca ocupam a tela inteira.
 *
 * O logo da navbar renderiza a 318px no máximo (h-8/h-10, proporção 5,7:1),
 * mas o original tem 1952px de largura. Gerar 640/1024/1600 para ele seria
 * desperdício: 320 cobre a tela comum e 640 cobre as densas.
 */
const LARGURAS_POR_ARQUIVO = {
  "logo-horizontal-grafite.png": [320, 640],
  "logo-horizontal-offwhite.png": [320, 640],
};

/*
 * `favicon.png` e as `og-*` continuam em `public/`, servidas direto: o
 * navegador pede o favicon no formato declarado no <link>, e os crawlers de
 * rede social (WhatsApp, Instagram) não leem WebP de forma confiável no
 * preview de link. Não passam por aqui.
 */
const IGNORAR = [/^favicon\./, /^og-/];

const EXTENSOES = /\.(jpe?g|png)$/i;

/** `dr-vinicius-02.jpeg` -> `dr-vinicius-02` */
const slug = (arquivo) => arquivo.replace(EXTENSOES, "");

async function listar(dir, prefixo = "") {
  const entradas = await readdir(dir, { withFileTypes: true });
  const arquivos = [];
  for (const entrada of entradas) {
    if (entrada.isDirectory()) {
      arquivos.push(...(await listar(path.join(dir, entrada.name), `${prefixo}${entrada.name}/`)));
    } else if (EXTENSOES.test(entrada.name)) {
      arquivos.push(prefixo + entrada.name);
    }
  }
  return arquivos;
}

/** O derivado só é regerado se o original for mais novo que ele. */
async function precisaGerar(saida, mtimeOriginal) {
  try {
    return (await stat(saida)).mtimeMs < mtimeOriginal;
  } catch {
    return true; // ainda não existe
  }
}

const arquivos = (await listar(origem)).filter(
  (a) => !IGNORAR.some((re) => re.test(path.basename(a))),
);

await mkdir(destino, { recursive: true });

/* Alimenta os atributos `width`/`height` do <Foto>. Sem eles o navegador não
   reserva o espaço da imagem antes de baixá-la, e o layout salta (CLS). */
const dimensoes = {};
let gerados = 0;
let pulados = 0;

for (const arquivo of arquivos) {
  const caminho = path.join(origem, arquivo);
  const meta = await sharp(caminho).metadata();
  const { mtimeMs } = await stat(caminho);

  /*
   * Orientação EXIF.
   *
   * Foto de celular costuma vir gravada "de lado", com uma tag EXIF dizendo
   * como girar na hora de exibir. `lentes-1.jpg`, por exemplo, está salva em
   * 1440x1853 com orientação 8 (girar 90°): o navegador mostra 1853x1440,
   * horizontal.
   *
   * O `sharp` ignora essa tag por padrão e o WebP não a carrega, então sem
   * `.rotate()` a variante sai de fato girada. Os valores 5-8 trocam largura
   * por altura; é o que o `<img>` vai medir depois.
   */
  const girado = meta.orientation >= 5 && meta.orientation <= 8;
  const width = girado ? meta.height : meta.width;
  const height = girado ? meta.width : meta.height;

  const larguras = LARGURAS_POR_ARQUIVO[path.basename(arquivo)] ?? LARGURAS;
  /* Nunca ampliar: variante maior que o original só adiciona bytes. O
     manifesto registra as que existem de fato, e o `<Foto>` anuncia só essas
     no `srcSet` — anunciar uma inexistente daria 404. */
  const geradas = larguras.filter((l) => l <= width);

  dimensoes[`/${arquivo}`] = {
    largura: width,
    altura: height,
    larguras: geradas.length ? geradas : [width],
  };

  const nome = slug(path.basename(arquivo));
  const subpasta = path.dirname(arquivo);
  const pastaSaida = subpasta === "." ? destino : path.join(destino, subpasta);
  await mkdir(pastaSaida, { recursive: true });

  for (const largura of dimensoes[`/${arquivo}`].larguras) {
    const saida = path.join(pastaSaida, `${nome}-${largura}.webp`);
    if (!(await precisaGerar(saida, mtimeMs))) {
      pulados++;
      continue;
    }

    await sharp(caminho)
      /* Aplica a orientação EXIF e a grava nos pixels: o WebP não leva a tag
         adiante, então sem isto a foto sai girada. Sem tag, não faz nada. */
      .rotate()
      .resize({ width: largura, withoutEnlargement: true })
      .webp({ quality: QUALIDADE })
      .toFile(saida);
    gerados++;
  }
}

await writeFile(manifesto, `${JSON.stringify(dimensoes, null, 2)}\n`);

console.log(
  `${arquivos.length} originais · ${gerados} variantes geradas · ${pulados} já atualizadas`,
);
console.log(`Manifesto: ${path.relative(raiz, manifesto)}`);

/**
 * Roda sozinho antes de `npm run dev` e `npm run build`.
 *
 * 1. Mede cada imagem de `public/img/` e grava `src/content/imagens.medidas.json`.
 *    Com a largura e a altura, o navegador reserva o espaço da captura antes de ela carregar
 *    (a página não "pula" enquanto você rola). Trocar uma imagem por outra de resolução maior
 *    não exige mexer em nada: as medidas são refeitas a cada execução.
 * 2. Confere se todo `arquivo: "..."` usado nos módulos existe em `public/img/`
 *    e avisa sobre imagens que ninguém usa.
 */
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

const raiz = path.resolve(import.meta.dirname, "..");
const pastaImg = path.join(raiz, "public", "img");
const pastaModulos = path.join(raiz, "src", "content", "modulos");
const saida = path.join(raiz, "src", "content", "imagens.medidas.json");

const imagens = fs.existsSync(pastaImg)
  ? fs.readdirSync(pastaImg).filter((f) => /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(f)).sort()
  : [];

const medidas = {};
for (const arquivo of imagens) {
  try {
    const { width, height } = imageSize(fs.readFileSync(path.join(pastaImg, arquivo)));
    if (width && height) medidas[arquivo] = [width, height];
  } catch {
    console.warn(`⚠ Não consegui medir public/img/${arquivo} (arquivo corrompido?)`);
  }
}
fs.writeFileSync(saida, JSON.stringify(medidas, null, 2) + "\n");

const usadas = new Set();
if (fs.existsSync(pastaModulos)) {
  for (const f of fs.readdirSync(pastaModulos).filter((n) => n.endsWith(".tsx"))) {
    const texto = fs.readFileSync(path.join(pastaModulos, f), "utf8");
    for (const m of texto.matchAll(/arquivo:\s*"([^"]+)"/g)) usadas.add(m[1]);
  }
}
const faltando = [...usadas].filter((a) => !imagens.includes(a));
const sobrando = imagens.filter((a) => !usadas.has(a));

console.log(`Imagens medidas: ${Object.keys(medidas).length}`);
for (const a of faltando) console.warn(`⚠ FALTA a imagem public/img/${a} (usada em src/content/modulos)`);
for (const a of sobrando) console.warn(`ℹ public/img/${a} não é usada em nenhum módulo`);

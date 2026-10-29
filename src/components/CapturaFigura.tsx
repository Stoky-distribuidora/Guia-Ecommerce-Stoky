import { useState } from "react";
import medidas from "../content/imagens.medidas.json";
import { CONSULTA } from "../content/textos";
import type { Captura } from "../types";
import { Icone } from "./Icone";

/** Endereço de uma imagem de `public/img/`. */
export const caminhoImagem = (arquivo: string) => `${import.meta.env.BASE_URL}img/${arquivo}`;

/** Largura e altura de cada imagem, geradas por `scripts/medir-imagens.mjs` (não edite o JSON à mão). */
const MEDIDAS: Record<string, number[] | undefined> = medidas;

interface Props {
  captura: Captura;
  onAmpliar: (captura: Captura) => void;
}

/** Captura de tela com legenda e botão "Ampliar". Se o arquivo faltar, mostra um aviso no lugar. */
export function CapturaFigura({ captura, onAmpliar }: Props) {
  const [falhou, setFalhou] = useState(false);
  const medida = MEDIDAS[captura.arquivo];
  const panoramica = !!medida && medida[0] / medida[1] >= 1.6;
  const ampliar = () => onAmpliar(captura);

  return (
    <figure className={`shot${panoramica ? " shot-panoramica" : ""}`}>
      <div className={`shot-img${falhou ? " erro" : ""}`} onClick={falhou ? undefined : ampliar}>
        {falhou ? (
          <div className="shot-missing" role="img" aria-label={`Captura de tela indisponível: ${captura.legenda}`}>
            <Icone nome="image" />
            <span>Captura de tela indisponível no momento</span>
          </div>
        ) : (
          <img
            src={caminhoImagem(captura.arquivo)}
            alt={`Captura de tela: ${captura.legenda}`}
            width={medida?.[0]}
            height={medida?.[1]}
            decoding="async"
            onError={() => setFalhou(true)}
          />
        )}
      </div>
      <figcaption>
        <span>{captura.legenda}</span>
        {!falhou && (
          <button type="button" className="btn shot-open" aria-label={`Ampliar imagem: ${captura.legenda}`} onClick={ampliar}>
            <Icone nome="expand" />
            Ampliar
          </button>
        )}
      </figcaption>
    </figure>
  );
}

/** "O que é" e "Para que serve": conteúdo complementar, recolhido por padrão (um clique abre). */
export function DetalhesCaptura({ captura }: { captura: Captura }) {
  const { oQueE, paraQueServe } = captura;
  if (!oQueE && !paraQueServe) return null;
  return (
    <details className="explain-mais">
      <summary>
        <Icone nome="chevron-down" />
        {CONSULTA.detalhes}
      </summary>
      <dl className="explain">
        {oQueE && (
          <div>
            <dt>O que é</dt>
            <dd>{oQueE}</dd>
          </div>
        )}
        {paraQueServe && (
          <div>
            <dt>Para que serve</dt>
            <dd>{paraQueServe}</dd>
          </div>
        )}
      </dl>
    </details>
  );
}

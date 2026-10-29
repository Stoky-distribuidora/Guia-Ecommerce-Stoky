import { useEffect, useRef } from "react";
import { ehOpcional, etapaConcluida } from "../content/navegacao";
import type { Feitos } from "../hooks/useProgresso";
import type { Modulo } from "../types";
import { Icone } from "./Icone";

interface Props {
  modulos: Modulo[];
  indiceAtual: number;
  passoAtualId: string;
  feitos: Feitos;
  onIr: (moduloId: string) => void;
  onIrPasso: (moduloId: string, passoId: string) => void;
}

/**
 * Barra horizontal das etapas e sub-abas.
 * Mostra as etapas principais em círculos e linhas e, logo abaixo, as sub-abas da etapa atual
 * também no mesmo formato visual interativo de círculos e linhas.
 * Ambas as trilhas rolam na horizontal de forma independente e mantêm o item ativo centralizado.
 */
export function Stepper({ modulos, indiceAtual, passoAtualId, feitos, onIr, onIrPasso }: Props) {
  const caixaEtapasRef = useRef<HTMLDivElement>(null);
  const caixaSubRef = useRef<HTMLDivElement>(null);

  const moduloAtual = modulos[indiceAtual];
  const passosDaEtapa = moduloAtual?.passos ?? [];
  const indiceSubAtual = passosDaEtapa.findIndex((p) => p.id === passoAtualId);

  // Mantém a etapa atual visível na trilha principal
  useEffect(() => {
    const caixa = caixaEtapasRef.current;
    const atual = caixa?.querySelector<HTMLElement>('[aria-current="step"]')?.closest("li");
    if (!caixa || !atual) return;
    const alvo = atual.offsetLeft - (caixa.clientWidth - atual.offsetWidth) / 2;
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    caixa.scrollTo({ left: Math.max(0, alvo), behavior });
  }, [indiceAtual]);

  // Mantém o sub-passo atual visível na trilha de sub-abas
  useEffect(() => {
    const caixa = caixaSubRef.current;
    const atual = caixa?.querySelector<HTMLElement>('[aria-current="step"]')?.closest("li");
    if (!caixa || !atual) return;
    const alvo = atual.offsetLeft - (caixa.clientWidth - atual.offsetWidth) / 2;
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    caixa.scrollTo({ left: Math.max(0, alvo), behavior });
  }, [passoAtualId, indiceAtual]);

  return (
    <nav className="stepper" aria-label="Navegação horizontal do guia">
      {/* Nível 1: Etapas principais */}
      <div className="stepper-trilha stepper-etapas" ref={caixaEtapasRef}>
        <ol>
          {modulos.map((m, i) => {
            const atual = i === indiceAtual;
            const concluida = etapaConcluida(m, feitos);
            const estado = atual ? "etapa atual" : concluida ? "concluída" : "";
            return (
              <li key={m.id} className={`st${atual ? " atual" : ""}${concluida ? " feita" : ""}${m.consulta ? " consulta" : ""}`}>
                <button type="button" data-etapa={m.id} aria-current={atual ? "step" : undefined} onClick={() => onIr(m.id)}>
                  <span className="st-bolinha" aria-hidden="true">
                    {concluida ? <Icone nome="check" /> : i + 1}
                  </span>
                  <span className="st-nome">{m.titulo}</span>
                  {estado && <span className="sr-only">{` (${estado})`}</span>}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Nível 2: Sub-abas da etapa atual (círculos e linhas) */}
      {passosDaEtapa.length > 1 && (
        <div className="stepper-sub" aria-label={`Sub-abas de ${moduloAtual.titulo}`}>
          <div className="stepper-sub-header">
            <span className="stepper-sub-badge">Passos da etapa</span>
            <span className="stepper-sub-titulo">{moduloAtual.titulo}</span>
            <span className="stepper-sub-contagem">
              {indiceSubAtual >= 0 ? `${indiceSubAtual + 1} de ${passosDaEtapa.length}` : `${passosDaEtapa.length} passos`}
            </span>
          </div>
          <div className="stepper-trilha stepper-sub-trilha" ref={caixaSubRef}>
            <ol>
              {passosDaEtapa.map((p, i) => {
                const atual = p.id === passoAtualId;
                const concluido = !!feitos[p.id];
                const opcional = ehOpcional(moduloAtual, p);
                const estado = atual ? "passo atual" : concluido ? "concluído" : "";
                return (
                  <li
                    key={p.id}
                    className={`st-sub${atual ? " atual" : ""}${concluido ? " feita" : ""}${opcional ? " consulta" : ""}`}
                  >
                    <button
                      type="button"
                      data-passo={p.id}
                      aria-current={atual ? "step" : undefined}
                      onClick={() => onIrPasso(moduloAtual.id, p.id)}
                    >
                      <span className="st-sub-bolinha" aria-hidden="true">
                        {concluido ? <Icone nome="check" /> : i + 1}
                      </span>
                      <span className="st-sub-nome">{p.titulo}</span>
                      {estado && <span className="sr-only">{` (${estado})`}</span>}
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      )}
    </nav>
  );
}

import type { Modulo, Passo } from "../types";
import { MODULOS } from "./index";

/**
 * Regras de navegação e de progresso do guia (um só lugar, usado por topo, barra de etapas, menu e botões).
 *
 *  - ETAPA  = um módulo (barra horizontal). PASSO = uma tela dentro da etapa.
 *  - Passo PRINCIPAL: faz parte do caminho. Passo OPCIONAL: marcado `consulta: true` dentro de uma etapa do
 *    caminho de compra; o "Próximo" pula esses passos. Numa etapa inteira de consulta (`consulta: true`
 *    no módulo, ex.: "Área do cliente") todos os passos são principais: a etapa é percorrida em ordem.
 *  - Um passo fica CONCLUÍDO quando a pessoa avança dele com "Próximo".
 *  - Uma etapa fica CONCLUÍDA quando todos os seus passos principais estão concluídos.
 *  - A barra do topo mede os passos principais concluídos nas etapas do caminho de compra.
 */

export interface Posicao {
  modulo: Modulo;
  indiceModulo: number;
  passo: Passo;
  indicePasso: number;
}

/** Passo que o "Próximo" pula (consulta dentro de uma etapa do caminho de compra). */
export const ehOpcional = (m: Modulo, p: Passo) => !m.consulta && !!p.consulta;
export const principais = (m: Modulo) => m.passos.filter((p) => !ehOpcional(m, p));
export const opcionais = (m: Modulo) => m.passos.filter((p) => ehOpcional(m, p));

const TODAS: Posicao[] = MODULOS.flatMap((modulo, indiceModulo) =>
  modulo.passos.map((passo, indicePasso) => ({ modulo, indiceModulo, passo, indicePasso })),
);

export const localizarPasso = (id: string): Posicao | undefined => TODAS.find((p) => p.passo.id === id);

/** Primeiro passo principal de uma etapa. */
export const primeiroPasso = (m: Modulo): Posicao => localizarPasso(principais(m)[0].id)!;

export const PRIMEIRO: Posicao = primeiroPasso(MODULOS[0]);

export function proximoPasso(atual: Posicao): Posicao | null {
  const { modulo, passo, indiceModulo } = atual;
  const grupo = ehOpcional(modulo, passo) ? opcionais(modulo) : principais(modulo);
  const i = grupo.indexOf(passo);
  if (i < grupo.length - 1) return localizarPasso(grupo[i + 1].id)!;
  const seguinte = MODULOS[indiceModulo + 1];
  return seguinte ? primeiroPasso(seguinte) : null;
}

export function passoAnterior(atual: Posicao): Posicao | null {
  const { modulo, passo, indiceModulo } = atual;
  const opcional = ehOpcional(modulo, passo);
  const grupo = opcional ? opcionais(modulo) : principais(modulo);
  const i = grupo.indexOf(passo);
  if (i > 0) return localizarPasso(grupo[i - 1].id)!;
  if (opcional) {
    const pr = principais(modulo);
    return localizarPasso(pr[pr.length - 1].id)!; // de uma consulta, volta ao último passo principal
  }
  const anterior = MODULOS[indiceModulo - 1];
  if (!anterior) return null;
  const pr = principais(anterior);
  return localizarPasso(pr[pr.length - 1].id)!;
}

/* ---------- progresso ---------- */
type Feitos = Record<string, boolean>;

export const contagemEtapa = (m: Modulo, feitos: Feitos) => {
  const pr = principais(m);
  return { feitos: pr.filter((p) => feitos[p.id]).length, total: pr.length };
};
export const etapaConcluida = (m: Modulo, feitos: Feitos) => {
  const c = contagemEtapa(m, feitos);
  return c.feitos === c.total;
};

/** Percentual dos passos principais concluídos nas etapas do caminho de compra (sem as de consulta). */
export function percentualCaminho(feitos: Feitos): number {
  const compra = MODULOS.filter((m) => !m.consulta);
  const total = compra.reduce((n, m) => n + principais(m).length, 0);
  const feitosN = compra.reduce((n, m) => n + contagemEtapa(m, feitos).feitos, 0);
  return total ? Math.round((feitosN / total) * 100) : 0;
}

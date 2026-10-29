import type { Modulo, Passo } from "../types";
import { inicio } from "./modulos/00-inicio";
import { acesso } from "./modulos/01-acesso";
import { buscar } from "./modulos/02-buscar";
import { produto } from "./modulos/03-produto";
import { carrinho } from "./modulos/04-carrinho";
import { pedido } from "./modulos/05-pedido";
import { area } from "./modulos/06-area";

/** Passo (ou módulo inteiro) marcado como "só para consultar". */
export const ehConsulta = (m: Modulo, p: Passo) => !!(m.consulta || p.consulta);

/**
 * Dentro de cada módulo, os passos essenciais vêm primeiro e os de consulta depois (cada grupo
 * mantém a ordem em que foi escrito). Menu, numeração e "próximo passo" usam essa ordem final.
 */
const organizar = (m: Modulo): Modulo => ({
  ...m,
  passos: [...m.passos.filter((p) => !ehConsulta(m, p)), ...m.passos.filter((p) => ehConsulta(m, p))],
});

/**
 * A ORDEM desta lista é a ordem do menu lateral. Os módulos de consulta (`consulta: true`)
 * aparecem juntos, no fim, no grupo "Para consultar".
 * Para criar um módulo novo: copie um arquivo de `modulos/`, ajuste e acrescente aqui.
 */
export const MODULOS: Modulo[] = [inicio, acesso, buscar, produto, carrinho, pedido, area].map(organizar);

/** Ids de passo repetidos fazem dois passos compartilharem a mesma conclusão. Avisa no console. */
if (import.meta.env.DEV) {
  const vistos = new Set<string>();
  for (const m of MODULOS) {
    for (const p of m.passos) {
      if (vistos.has(p.id)) console.error(`[guia] id de passo repetido: "${p.id}"`);
      vistos.add(p.id);
    }
  }
}

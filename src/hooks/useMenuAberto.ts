import { useCallback, useEffect, useState } from "react";

const CHAVE = "stoky-guia-menu-v1";

type Abertos = Record<string, boolean>;

function ler(): Abertos {
  try {
    const dado = JSON.parse(localStorage.getItem(CHAVE) || "{}");
    return dado && typeof dado === "object" && !Array.isArray(dado) ? dado : {};
  } catch {
    return {};
  }
}

/**
 * Quais módulos do menu lateral estão abertos (mostrando seus passos).
 * Cada módulo abre e fecha sozinho; o estado é lembrado entre visitas.
 * Na primeira visita, só o módulo atual fica aberto.
 */
export function useMenuAberto(moduloAtual: string, todosIds: string[]) {
  const [abertos, setAbertos] = useState<Abertos>(() => ({ ...ler(), [moduloAtual]: true }));

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(abertos));
    } catch {
      /* sem armazenamento: só não lembra na próxima visita */
    }
  }, [abertos]);

  const alternarModulo = useCallback((id: string) => setAbertos((a) => ({ ...a, [id]: !a[id] })), []);
  const abrirModulo = useCallback((id: string) => setAbertos((a) => (a[id] ? a : { ...a, [id]: true })), []);

  const algumAberto = todosIds.some((id) => abertos[id]);
  /** Se algum módulo está aberto, recolhe todos; senão, abre todos. */
  const alternarTodos = useCallback(
    () => setAbertos(Object.fromEntries(todosIds.map((id) => [id, !algumAberto]))),
    [todosIds, algumAberto],
  );

  return { abertos, alternarModulo, abrirModulo, alternarTodos, algumAberto };
}

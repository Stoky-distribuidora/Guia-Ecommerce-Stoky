import { useCallback, useEffect, useState } from "react";

/** Mesma chave da versão anterior: quem já usou o guia mantém o progresso (os ids dos passos não mudaram). */
const CHAVE = "stoky-guia-v1";

export type Feitos = Record<string, boolean>;

function ler(): Feitos {
  try {
    const dado = JSON.parse(localStorage.getItem(CHAVE) || "{}");
    return dado && typeof dado === "object" && !Array.isArray(dado) ? dado : {};
  } catch {
    return {};
  }
}

/**
 * Passos concluídos, guardados no navegador (localStorage).
 * Um passo é concluído quando a pessoa avança dele com "Próximo" (ver content/navegacao.ts).
 */
export function useProgresso() {
  const [feitos, setFeitos] = useState<Feitos>(ler);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(feitos));
    } catch {
      /* navegação privada ou armazenamento bloqueado: o guia continua funcionando sem salvar */
    }
  }, [feitos]);

  const marcar = useCallback((id: string) => setFeitos((f) => (f[id] ? f : { ...f, [id]: true })), []);
  const reiniciar = useCallback(() => setFeitos({}), []);

  return { feitos, marcar, reiniciar };
}

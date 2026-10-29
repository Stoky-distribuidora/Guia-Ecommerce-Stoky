import type { ReactNode } from "react";
import { Icone, type NomeIcone } from "./Icone";

/** Caixa de destaque: "Dica" (azul) ou "Atenção" (amarela). Ícone e rótulo dizem o tipo, não só a cor. */
export function Destaque({ tipo, children }: { tipo: "dica" | "atencao"; children: ReactNode }) {
  const atencao = tipo === "atencao";
  const icone: NomeIcone = atencao ? "alert" : "bulb";
  return (
    <div className={`tip${atencao ? " warn" : ""}`}>
      <Icone nome={icone} />
      <div>
        <b>{atencao ? "Atenção" : "Dica"}</b>
        <span>{children}</span>
      </div>
    </div>
  );
}

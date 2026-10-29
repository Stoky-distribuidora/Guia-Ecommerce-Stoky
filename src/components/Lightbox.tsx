import { useCallback, useEffect, useRef, useState } from "react";
import type { Captura } from "../types";
import { caminhoImagem } from "./CapturaFigura";
import { Icone } from "./Icone";

/**
 * Ampliação de uma captura de tela, em um <dialog> nativo (o navegador cuida de Esc, foco e fundo inerte).
 * Renderize só quando houver captura; ao fechar, chama `onFechar`.
 *
 * Dois tamanhos: "Ajustar à tela" (cabe inteira) e "Tamanho real" (rolável). O botão só aparece
 * quando a imagem não cabe em tamanho real, por exemplo capturas largas no celular.
 */
export function Lightbox({ captura, onFechar }: { captura: Captura; onFechar: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const palcoRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const [tamanhoReal, setTamanhoReal] = useState(false);
  const [largura, setLargura] = useState<number>();
  const [cabeInteira, setCabeInteira] = useState(true); // o botão só aparece depois de medir a imagem

  useEffect(() => {
    const dialogo = dialogRef.current;
    if (dialogo && !dialogo.open) dialogo.showModal();
    fecharRef.current?.focus();
    document.documentElement.classList.add("no-scroll");
    return () => document.documentElement.classList.remove("no-scroll");
  }, []);

  const calcular = useCallback(() => {
    const img = imgRef.current;
    const palco = palcoRef.current;
    if (!img || !palco || !img.naturalWidth) return;
    const estilo = getComputedStyle(palco);
    const larguraUtil = palco.clientWidth - parseFloat(estilo.paddingLeft) - parseFloat(estilo.paddingRight);
    const alturaUtil = palco.clientHeight - parseFloat(estilo.paddingBottom);
    const ajuste = Math.min(larguraUtil / img.naturalWidth, alturaUtil / img.naturalHeight, 3);
    setLargura(Math.round(img.naturalWidth * (tamanhoReal ? Math.max(1, ajuste) : ajuste)));
    setCabeInteira(ajuste >= 1);
  }, [tamanhoReal]);

  useEffect(() => {
    calcular();
    palcoRef.current?.scrollTo(0, 0);
    addEventListener("resize", calcular);
    return () => removeEventListener("resize", calcular);
  }, [calcular]);

  return (
    <dialog
      className="lightbox"
      id="lightbox"
      ref={dialogRef}
      aria-labelledby="lbCap"
      onClose={onFechar}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
    >
      <div className="lb-bar">
        <p id="lbCap">{captura.legenda}</p>
        <button type="button" className="btn" id="lbMode" hidden={cabeInteira} onClick={() => setTamanhoReal((v) => !v)}>
          {tamanhoReal ? "Ajustar à tela" : "Tamanho real"}
        </button>
        <button type="button" className="btn" id="lbClose" ref={fecharRef} onClick={() => dialogRef.current?.close()}>
          <Icone nome="x" />
          <span>Fechar</span>
        </button>
      </div>
      <div
        className="lb-stage"
        id="lbStage"
        ref={palcoRef}
        tabIndex={0}
        role="group"
        aria-label="Imagem ampliada. Use as setas do teclado para percorrer a imagem."
        onClick={(e) => {
          if (e.target === palcoRef.current) dialogRef.current?.close();
        }}
      >
        <img
          id="lbImg"
          ref={imgRef}
          src={caminhoImagem(captura.arquivo)}
          alt={captura.legenda}
          style={largura ? { width: largura } : undefined}
          onLoad={calcular}
        />
      </div>
    </dialog>
  );
}

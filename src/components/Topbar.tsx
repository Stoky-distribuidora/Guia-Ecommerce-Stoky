import type { RefObject } from "react";
import { MARCA } from "../content/textos";
import { Icone } from "./Icone";

interface Props {
  /** Posição da etapa atual (1 a `totalEtapas`). */
  etapa: number;
  totalEtapas: number;
  /** Percentual dos passos principais concluídos no caminho de compra. */
  percentual: number;
  menuAberto: boolean;
  onAbrirMenu: () => void;
  onInicio: () => void;
  botaoMenuRef: RefObject<HTMLButtonElement | null>;
  /** Desativa o topo enquanto a gaveta do menu (celular) está aberta. */
  inert: boolean;
}

export function Topbar({ etapa, totalEtapas, percentual, menuAberto, onAbrirMenu, onInicio, botaoMenuRef, inert }: Props) {
  return (
    <header className="topbar" inert={inert}>
      <div className="topbar-in">
        <button
          type="button"
          className="btn menu-btn"
          id="menuBtn"
          ref={botaoMenuRef}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-controls="menu"
          aria-expanded={menuAberto}
          onClick={onAbrirMenu}
        >
          <Icone nome="menu" />
          <span>Menu</span>
        </button>
        <div className="brand">
          <b className="brand-name">
            {MARCA.nome} <small>{MARCA.selo}</small>
          </b>
          <span className="brand-sub">{MARCA.subtitulo}</span>
        </div>
        <div className="progress">
          <span id="progTxt" aria-live="polite">{`Etapa ${etapa} de ${totalEtapas}`}</span>
          <div
            className="bar"
            id="progBar"
            role="progressbar"
            aria-label="Caminho de compra concluído"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentual}
            aria-valuetext={`${percentual}% do caminho de compra concluído`}
          >
            <i style={{ width: `${percentual}%` }} />
          </div>
        </div>
        <button type="button" className="btn inicio-btn" id="inicioBtn" aria-label="Voltar ao início do guia" onClick={onInicio}>
          <Icone nome="home" />
          <span>Início</span>
        </button>
      </div>
    </header>
  );
}

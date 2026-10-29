import { Fragment, useEffect, useRef, type RefObject } from "react";
import { ehConsulta } from "../content";
import { contagemEtapa, ehOpcional } from "../content/navegacao";
import { CONSULTA } from "../content/textos";
import type { Feitos } from "../hooks/useProgresso";
import type { Modulo } from "../types";
import { Icone } from "./Icone";

interface Props {
  modulos: Modulo[];
  moduloAtualId: string;
  passoAtualId: string;
  feitos: Feitos;
  /** Etapas abertas (mostrando seus passos). */
  abertos: Record<string, boolean>;
  algumAberto: boolean;
  onAlternarModulo: (id: string) => void;
  onAlternarTodos: () => void;
  /** Sem `passoId`, abre o primeiro passo da etapa. */
  onNavegar: (moduloId: string, passoId?: string) => void;
  onReiniciar: () => void;
  onInicio: () => void;
  /** Gaveta aberta (só faz diferença no celular). */
  gavetaAberta: boolean;
  onFecharGaveta: () => void;
  botaoFecharRef: RefObject<HTMLButtonElement | null>;
  inert: boolean;
}

export function Menu(p: Props) {
  const navRef = useRef<HTMLElement>(null);

  /** Mantém o passo atual visível dentro do menu quando ele tem rolagem própria (desktop). */
  useEffect(() => {
    const nav = navRef.current;
    const botao = nav?.querySelector<HTMLElement>(`[data-go="${p.passoAtualId}"]`);
    if (!nav || !botao || nav.scrollHeight <= nav.clientHeight) return;
    const b = botao.getBoundingClientRect();
    const n = nav.getBoundingClientRect();
    if (b.top < n.top + 8) nav.scrollTop -= n.top + 8 - b.top;
    else if (b.bottom > n.bottom - 8) nav.scrollTop += b.bottom - n.bottom + 8;
  }, [p.passoAtualId]);

  return (
    <nav
      className={`menu${p.gavetaAberta ? " open" : ""}`}
      id="menu"
      ref={navRef}
      aria-label="Etapas do tutorial"
      inert={p.inert}
    >
      <div className="menu-head">
        <p className="menu-title">Etapas</p>
        <div className="menu-actions">
          <button type="button" className="menu-all" id="menuAll" onClick={p.onAlternarTodos}>
            {p.algumAberto ? "Recolher tudo" : "Expandir tudo"}
          </button>
          <button type="button" className="btn menu-close" id="menuClose" ref={p.botaoFecharRef} onClick={p.onFecharGaveta}>
            <Icone nome="x" />
            <span>Fechar</span>
          </button>
        </div>
      </div>

      <button type="button" className="menu-inicio" id="menuInicio" onClick={p.onInicio}>
        <Icone nome="home" />
        <span>
          <strong>Início</strong>
          <small>Voltar ao começo do guia</small>
        </span>
      </button>

      <div id="menuList">
        {p.modulos.map((m, mi) => {
          const c = contagemEtapa(m, p.feitos);
          const completo = c.feitos === c.total;
          const ativo = m.id === p.moduloAtualId;
          const aberto = !!p.abertos[m.id];
          const inicioConsulta = m.passos.findIndex((s) => ehConsulta(m, s));
          /** Rótulo do grupo, mostrado só quando o grupo muda (compra → consulta). */
          const grupo = m.consulta ? CONSULTA.grupoMenu : CONSULTA.grupoCompra;
          const novoGrupo = mi === 0 || !!p.modulos[mi - 1].consulta !== !!m.consulta;
          return (
            <Fragment key={m.id}>
              {novoGrupo && <p className="menu-grupo">{grupo}</p>}
              <div className={`mod${ativo ? " active" : ""}${completo ? " done" : ""}${aberto ? " open" : ""}`}>
                <div className="mod-row">
                  <button
                    type="button"
                    className="mod-btn"
                    data-mod={m.id}
                    aria-current={ativo ? "true" : undefined}
                    onClick={() => p.onNavegar(m.id)}
                  >
                    <span className="mod-num">{completo ? <Icone nome="check" /> : mi + 1}</span>
                    <span>{m.titulo}</span>
                    <span className="mod-count">
                      <span className="sr-only">{`${c.feitos} de ${c.total} passos concluídos`}</span>
                      <span aria-hidden="true">{`${c.feitos}/${c.total}`}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="mod-toggle"
                    data-toggle={m.id}
                    aria-expanded={aberto}
                    aria-controls={`steps-${m.id}`}
                    aria-label={`${aberto ? "Recolher" : "Expandir"} os passos de ${m.titulo}`}
                    onClick={() => p.onAlternarModulo(m.id)}
                  >
                    <Icone nome="chevron-down" />
                  </button>
                </div>
                <div className="mod-steps-wrap" id={`steps-${m.id}`}>
                  <div className="mod-steps-clip">
                    <ol className="mod-steps">
                      {m.passos.map((s, i) => {
                        const feito = !!p.feitos[s.id];
                        const atual = s.id === p.passoAtualId;
                        return (
                          <Fragment key={s.id}>
                            {/* separador entre passos principais e de consulta (etapas só de consulta já ficam no grupo próprio) */}
                            {!m.consulta && i === inicioConsulta && <li className="mod-sep">{CONSULTA.grupoMenu}</li>}
                            <li>
                              <button
                                type="button"
                                data-go={s.id}
                                className={`${feito ? "ok" : ""} ${atual ? "cur" : ""}${ehOpcional(m, s) ? " opc" : ""}`.trim()}
                                aria-current={atual ? "location" : undefined}
                                onClick={() => p.onNavegar(m.id, s.id)}
                              >
                                <span className="ck">{feito ? <Icone nome="check" /> : `${i + 1}.`}</span>
                                <span>
                                  {s.titulo}
                                  {feito && <span className="sr-only"> (concluído)</span>}
                                </span>
                              </button>
                            </li>
                          </Fragment>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>

      <div className="menu-rodape">
        <button type="button" className="menu-reiniciar" id="reiniciarBtn" onClick={p.onReiniciar}>
          Recomeçar o guia
        </button>
      </div>
    </nav>
  );
}

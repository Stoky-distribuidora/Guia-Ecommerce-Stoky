import { MODULOS } from "../content";
import { ehOpcional, opcionais, primeiroPasso, principais, type Posicao } from "../content/navegacao";
import { CONSULTA } from "../content/textos";
import { ehDecisao, type Captura } from "../types";
import { CapturaFigura, DetalhesCaptura } from "./CapturaFigura";
import { Destaque } from "./Destaque";
import { FeedbackPasso } from "./FeedbackPasso";
import { Icone } from "./Icone";

interface Props {
  pos: Posicao;
  anterior: Posicao | null;
  proximo: Posicao | null;
  onIr: (passoId: string) => void;
  /** "Próximo" / "Concluir": o passo atual vira concluído. */
  onAvancar: (proximoId: string | null) => void;
  onAmpliar: (captura: Captura) => void;
}

/** Uma tela do guia: o passo atual, com seu painel de apoio, os passos de consulta da etapa e a navegação. */
export function PassoView({ pos, anterior, proximo, onIr, onAvancar, onAmpliar }: Props) {
  const { modulo, passo, indiceModulo } = pos;
  const decisao = ehDecisao(passo);
  const opcional = ehOpcional(modulo, passo);
  const principaisDaEtapa = principais(modulo);
  const consultasDaEtapa = opcionais(modulo);
  const grupo = opcional ? consultasDaEtapa : principaisDaEtapa;
  const indice = grupo.indexOf(passo);

  const rotuloPasso = opcional ? `Consulta ${indice + 1} de ${grupo.length}` : `Passo ${indice + 1} de ${grupo.length}`;
  const primeiroDaEtapa = !opcional && indice === 0;
  const ultimoPrincipal = !opcional && indice === principaisDaEtapa.length - 1;
  const proximaEtapa = MODULOS[indiceModulo + 1];
  /** Em uma consulta, dá para pular as restantes e seguir para a próxima etapa. */
  const podePular = opcional && indice < grupo.length - 1 && !!proximaEtapa;

  const captura = decisao ? undefined : passo.captura;
  const comoUsar = captura?.comoUsar;
  const dica = decisao ? undefined : passo.dica;
  const aviso = decisao ? undefined : passo.aviso;
  const temPainel = !!(comoUsar || dica || aviso);
  const detalhes = captura ? <DetalhesCaptura captura={captura} /> : null;
  const temDetalhes = !!(captura?.oQueE || captura?.paraQueServe);

  /** Texto pequeno abaixo de "Anterior"/"Próximo": para onde o botão leva. */
  const destino = (alvo: Posicao, sentido: "ant" | "prox") =>
    alvo.indiceModulo !== indiceModulo
      ? `${sentido === "prox" ? "Etapa seguinte" : "Etapa anterior"}: ${alvo.modulo.titulo}`
      : alvo.passo.titulo;

  return (
    <div className="view">
      <article className="tela" aria-labelledby="title">
        <header className="tela-head">
          <p className="tela-meta">
            <span className="chip">{`Etapa ${indiceModulo + 1} de ${MODULOS.length}`}</span>
            <span>{modulo.titulo}</span>
            <span>{rotuloPasso}</span>
            {opcional && <span className="selo">Para consultar</span>}
          </p>
          <h1 id="title" tabIndex={-1}>{passo.titulo}</h1>
          {primeiroDaEtapa && <p className="lead">{modulo.introducao}</p>}
          {primeiroDaEtapa && modulo.precisa && (
            <div className="need">
              <strong>Você vai precisar de:</strong>
              {modulo.precisa.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          )}
          {!decisao && passo.onde && (
            <p className="where">
              <Icone nome="pin" />
              <span>{passo.onde}</span>
            </p>
          )}
        </header>

        <div className={`tela-corpo${temPainel ? " com-painel" : ""}`}>
          <div className="tela-principal">
            {decisao ? (
              <div className="paths">
                {passo.caminhos.map((c) => (
                  <div className="path" key={c.nome}>
                    <h2>{c.nome}</h2>
                    <p className="who">{c.quem}</p>
                    <ol>
                      {c.passos.map((item, i) => (
                        <li key={i}>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {passo.texto}
                {captura && <CapturaFigura key={captura.arquivo} captura={captura} onAmpliar={onAmpliar} />}
                {!temPainel && temDetalhes && detalhes}
              </>
            )}
          </div>

          {temPainel && (
            <aside className="painel" aria-label="Como usar e dicas">
              {comoUsar && (
                <section className="como">
                  <h2>Como usar</h2>
                  {comoUsar}
                </section>
              )}
              {dica && <Destaque tipo="dica">{dica}</Destaque>}
              {aviso && <Destaque tipo="atencao">{aviso}</Destaque>}
              {temDetalhes && detalhes}
            </aside>
          )}
        </div>

        {ultimoPrincipal && consultasDaEtapa.length > 0 && (
          <section className="consultas" aria-labelledby="consultasT">
            <h2 id="consultasT">{CONSULTA.titulo}</h2>
            <p>{CONSULTA.texto}</p>
            <ul>
              {consultasDaEtapa.map((c) => (
                <li key={c.id}>
                  <button type="button" className="btn" data-consulta={c.id} onClick={() => onIr(c.id)}>
                    {c.titulo}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <FeedbackPasso key={pos.passo.id} pos={pos} />

        <nav className="nav-passos" aria-label="Navegação entre passos">
          {anterior ? (
            <button type="button" className="nav-btn" id="btnAnterior" onClick={() => onIr(anterior.passo.id)}>
              <Icone nome="arrow-left" />
              <span>
                <strong>Anterior</strong>
                <small>{destino(anterior, "ant")}</small>
              </span>
            </button>
          ) : (
            <span />
          )}

          {podePular && (
            <button type="button" className="nav-pular" id="btnPular" onClick={() => onAvancar(primeiroPasso(proximaEtapa).passo.id)}>
              Pular para a próxima etapa
            </button>
          )}

          {proximo ? (
            <button type="button" className="nav-btn proximo" id="btnProximo" onClick={() => onAvancar(proximo.passo.id)}>
              <span>
                <strong>Próximo</strong>
                <small>{destino(proximo, "prox")}</small>
              </span>
              <Icone nome="arrow-right" />
            </button>
          ) : (
            <button type="button" className="nav-btn proximo" id="btnConcluir" onClick={() => onAvancar(null)}>
              <span>
                <strong>Concluir</strong>
                <small>Voltar ao início do guia</small>
              </span>
              <Icone nome="check" />
            </button>
          )}
        </nav>
      </article>
    </div>
  );
}

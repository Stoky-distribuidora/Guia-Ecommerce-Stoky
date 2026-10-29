import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SpriteIcones } from "./components/Icone";
import { Lightbox } from "./components/Lightbox";
import { Menu } from "./components/Menu";
import { PassoView } from "./components/PassoView";
import { Stepper } from "./components/Stepper";
import { Topbar } from "./components/Topbar";
import { MODULOS } from "./content";
import {
  localizarPasso,
  passoAnterior,
  percentualCaminho,
  PRIMEIRO,
  primeiroPasso,
  proximoPasso,
  type Posicao,
} from "./content/navegacao";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useMenuAberto } from "./hooks/useMenuAberto";
import { useProgresso } from "./hooks/useProgresso";
import type { Captura } from "./types";

/** Última tela vista: o guia reabre onde a pessoa parou (só quando o endereço não indica um passo). */
const CHAVE_POSICAO = "stoky-guia-pos-v1";

/**
 * O endereço guarda o passo atual: #acesso-3. Também vale o id de uma etapa (#acesso = primeiro passo dela,
 * compatível com os endereços da versão anterior). Desconhecido: última tela vista ou o início.
 */
function posicaoDoEndereco(usarSalva: boolean): Posicao {
  const h = location.hash.slice(1);
  const porPasso = localizarPasso(h);
  if (porPasso) return porPasso;
  const modulo = MODULOS.find((m) => m.id === h);
  if (modulo) return primeiroPasso(modulo);
  if (usarSalva) {
    try {
      const salvo = localizarPasso(localStorage.getItem(CHAVE_POSICAO) ?? "");
      if (salvo) return salvo;
    } catch {
      /* sem armazenamento: começa do início */
    }
  }
  return PRIMEIRO;
}

export default function App() {
  const { feitos, marcar, reiniciar } = useProgresso();
  const [passoId, setPassoId] = useState(() => posicaoDoEndereco(true).passo.id);
  const pos = localizarPasso(passoId) ?? PRIMEIRO;

  const [captura, setCaptura] = useState<Captura | null>(null);
  const [gaveta, setGaveta] = useState(false);

  const celular = useMediaQuery("(max-width: 860px)");
  const todosIds = useMemo(() => MODULOS.map((m) => m.id), []);
  const menu = useMenuAberto(pos.modulo.id, todosIds);
  const { abrirModulo } = menu;

  const mainRef = useRef<HTMLElement>(null);
  const botaoMenuRef = useRef<HTMLButtonElement>(null);
  const botaoFecharRef = useRef<HTMLButtonElement>(null);
  const devolverFocoAoMenu = useRef(false);
  const focarAoChegar = useRef(false);
  const [pedidoNavegacao, setPedidoNavegacao] = useState(0);

  /* ---------- Navegação ---------- */
  const irPara = useCallback(
    (id: string, opcoes: { empilhar?: boolean; focar?: boolean } = {}) => {
      const { empilhar = true, focar = true } = opcoes;
      const destino = localizarPasso(id) ?? PRIMEIRO;
      if (empilhar && location.hash !== `#${destino.passo.id}`) history.pushState(null, "", `#${destino.passo.id}`);
      setPassoId(destino.passo.id);
      abrirModulo(destino.modulo.id);
      setGaveta(false);
      focarAoChegar.current = focar;
      setPedidoNavegacao((n) => n + 1);
    },
    [abrirModulo],
  );

  /** "Próximo", "Pular" e "Concluir": o passo atual vira concluído e a pessoa segue adiante. */
  const avancar = useCallback(
    (destinoId: string | null) => {
      marcar(pos.passo.id);
      irPara(destinoId ?? PRIMEIRO.passo.id);
    },
    [marcar, irPara, pos.passo.id],
  );

  /* Depois que a nova tela foi desenhada: volta ao topo e move o foco para o título do passo. */
  useEffect(() => {
    if (pedidoNavegacao === 0) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (focarAoChegar.current) document.getElementById("title")?.focus({ preventScroll: true });
  }, [pedidoNavegacao]);

  /* Botões Voltar/Avançar do navegador e endereço digitado à mão. */
  useEffect(() => {
    const aoMudarEndereco = () => {
      const alvo = posicaoDoEndereco(false);
      if (alvo.passo.id !== passoId) irPara(alvo.passo.id, { empilhar: false, focar: false });
    };
    addEventListener("hashchange", aoMudarEndereco);
    return () => removeEventListener("hashchange", aoMudarEndereco);
  }, [passoId, irPara]);

  useEffect(() => {
    const hash = `#${passoId}`;
    if (location.hash !== hash) history.replaceState(null, "", hash);
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_POSICAO, passoId);
    } catch {
      /* sem armazenamento: só não reabre onde parou */
    }
  }, [passoId]);

  /* ---------- Gaveta do menu (celular) ---------- */
  const abrirGaveta = () => setGaveta(true);
  const fecharGaveta = useCallback(() => {
    devolverFocoAoMenu.current = true;
    setGaveta(false);
  }, []);

  useEffect(() => {
    if (gaveta) botaoFecharRef.current?.focus();
    else if (devolverFocoAoMenu.current) {
      devolverFocoAoMenu.current = false;
      botaoMenuRef.current?.focus();
    }
  }, [gaveta]);

  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", gaveta);
    return () => document.documentElement.classList.remove("no-scroll");
  }, [gaveta]);

  useEffect(() => {
    if (!celular) setGaveta(false);
  }, [celular]);

  useEffect(() => {
    if (!gaveta) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        fecharGaveta();
        return;
      }
      if (e.key !== "Tab") return;
      const menu = document.getElementById("menu");
      if (!menu) return;
      const focaveis = Array.from(
        menu.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== "hidden");
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (!primeiro || !ultimo) return;
      if (e.shiftKey && (document.activeElement === primeiro || !menu.contains(document.activeElement))) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    addEventListener("keydown", aoTeclar);
    return () => removeEventListener("keydown", aoTeclar);
  }, [gaveta, fecharGaveta]);

  const percentual = useMemo(() => percentualCaminho(feitos), [feitos]);

  const reiniciarGuia = () => {
    if (!confirm("Apagar o seu progresso neste guia e voltar ao início?")) return;
    reiniciar();
    irPara(PRIMEIRO.passo.id);
  };

  return (
    <>
      <SpriteIcones />

      <button
        type="button"
        className="skip"
        id="skip"
        inert={celular && gaveta}
        onClick={() => {
          mainRef.current?.focus();
          mainRef.current?.scrollIntoView({ block: "start" });
        }}
      >
        Ir para o conteúdo
      </button>

      <Topbar
        etapa={pos.indiceModulo + 1}
        totalEtapas={MODULOS.length}
        percentual={percentual}
        menuAberto={gaveta}
        onAbrirMenu={() => (gaveta ? fecharGaveta() : abrirGaveta())}
        onInicio={() => irPara(PRIMEIRO.passo.id)}
        botaoMenuRef={botaoMenuRef}
        inert={celular && gaveta}
      />

      {gaveta && <div className="scrim" id="scrim" aria-hidden="true" onClick={fecharGaveta} />}

      <div className="shell">
        <Menu
          modulos={MODULOS}
          moduloAtualId={pos.modulo.id}
          passoAtualId={pos.passo.id}
          feitos={feitos}
          abertos={menu.abertos}
          algumAberto={menu.algumAberto}
          onAlternarModulo={menu.alternarModulo}
          onAlternarTodos={menu.alternarTodos}
          onNavegar={(moduloId, id) => irPara(id ?? primeiroPasso(MODULOS.find((m) => m.id === moduloId)!).passo.id)}
          onReiniciar={reiniciarGuia}
          onInicio={() => irPara(PRIMEIRO.passo.id)}
          gavetaAberta={gaveta}
          onFecharGaveta={fecharGaveta}
          botaoFecharRef={botaoFecharRef}
          inert={celular && !gaveta}
        />
        <main id="main" ref={mainRef} tabIndex={-1} inert={celular && gaveta}>
          <div className="coluna">
            <Stepper
              modulos={MODULOS}
              indiceAtual={pos.indiceModulo}
              passoAtualId={pos.passo.id}
              feitos={feitos}
              onIr={(moduloId) => irPara(primeiroPasso(MODULOS.find((m) => m.id === moduloId)!).passo.id)}
              onIrPasso={(_moduloId, passoId) => irPara(passoId)}
            />
            <PassoView
              key={pos.passo.id}
              pos={pos}
              anterior={passoAnterior(pos)}
              proximo={proximoPasso(pos)}
              onIr={irPara}
              onAvancar={avancar}
              onAmpliar={setCaptura}
            />
          </div>
        </main>
      </div>

      {captura && <Lightbox captura={captura} onFechar={() => setCaptura(null)} />}
    </>
  );
}

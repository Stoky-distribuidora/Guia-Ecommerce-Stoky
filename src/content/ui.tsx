import type { ReactNode } from "react";

/**
 * Peças para usar DENTRO dos textos dos módulos. Elas imitam o que a pessoa vê no site da Stoky.
 *
 *   Clique em <Verde>Entrar</Verde>             → botão verde
 *   Use <Escuro>Ainda não sou cliente</Escuro>  → botão escuro
 *   Veja <Contorno>Ver carrinho</Contorno>      → botão com contorno
 *   <Etiqueta tipo="nc">NC</Etiqueta>           → etiqueta de produto (nc | ok | low | out | pct)
 *   Aperte <Tecla>Enter</Tecla>                 → tecla do teclado
 *   <Obrigatorio />                             → asterisco vermelho de campo obrigatório
 */

type Filhos = { children: ReactNode };

export const Verde = ({ children }: Filhos) => <span className="ui ui-g">{children}</span>;
export const Escuro = ({ children }: Filhos) => <span className="ui ui-d">{children}</span>;
export const Contorno = ({ children }: Filhos) => <span className="ui ui-o">{children}</span>;

/** nc = nunca comprado · ok = estoque confirmado · low = estoque baixo · out = sem estoque · pct = desconto */
export type TipoEtiqueta = "nc" | "ok" | "low" | "out" | "pct";
export const Etiqueta = ({ tipo, children }: Filhos & { tipo: TipoEtiqueta }) => (
  <span className={`tag t-${tipo}`}>{children}</span>
);

export const Tecla = ({ children }: Filhos) => <kbd>{children}</kbd>;

export const Obrigatorio = () => <strong style={{ color: "#d33" }}>*</strong>;

/**
 * Lista em duas colunas: termo em negrito + explicação.
 *   <Legenda><IconeFiltro tipo="favoritos" /><span>Exibe os produtos favoritos.</span> …</Legenda>
 */
export const Legenda = ({ children, compacta }: Filhos & { compacta?: boolean }) => (
  <div className="legend" style={compacta ? { marginTop: 6 } : undefined}>
    {children}
  </div>
);

export type TipoIconeFiltro = "favoritos" | "sugestoes" | "comprados";

export const IconeFiltro = ({ tipo }: { tipo: TipoIconeFiltro }) => (
  <span
    className={`filtro-icone filtro-${tipo}`}
    style={{ backgroundImage: `url(${import.meta.env.BASE_URL}img/08-busca.jpg)` }}
    aria-hidden="true"
  />
);

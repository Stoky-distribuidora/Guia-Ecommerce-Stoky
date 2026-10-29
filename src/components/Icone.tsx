/**
 * Todos os ícones do guia: traço de 1,75, pontas arredondadas, herdam a cor do texto.
 * Para criar um ícone novo: acrescente um <symbol> abaixo e o nome em `NomeIcone`.
 */
export type NomeIcone =
  | "menu" | "x" | "check" | "circle" | "check-circle" | "pin" | "bulb" | "alert"
  | "arrow-left" | "arrow-right" | "expand" | "image" | "chevron-down" | "home"
  | "copy" | "chat" | "clock" | "external";

export function Icone({ nome, className = "" }: { nome: NomeIcone; className?: string }) {
  return (
    <svg className={`ic ${className}`.trim()} aria-hidden="true" focusable="false">
      <use href={`#i-${nome}`} />
    </svg>
  );
}

/** Define os símbolos uma única vez (renderizado no topo do App). */
export function SpriteIcones() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></symbol>
      <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></symbol>
      <symbol id="i-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /></symbol>
      <symbol id="i-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.8 2.8L16.2 9.5" /></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" /><circle cx="12" cy="10" r="2.3" /></symbol>
      <symbol id="i-bulb" viewBox="0 0 24 24"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" /></symbol>
      <symbol id="i-alert" viewBox="0 0 24 24"><path d="M10.3 4.2L2.6 17.5a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0zM12 9.5v4M12 17h.01" /></symbol>
      <symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6" /></symbol>
      <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
      <symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></symbol>
      <symbol id="i-expand" viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></symbol>
      <symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></symbol>
      <symbol id="i-image" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M3 17l5-5 4 4 3-3 6 6" /></symbol>
      <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></symbol>
      <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11l9-8 9 8M5 9.5V20h5v-6h4v6h5V9.5" /></symbol>
      <symbol id="i-external" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></symbol>
    </svg>
  );
}

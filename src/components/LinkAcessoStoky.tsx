import { useState } from "react";
import { Icone } from "./Icone";

const URL_STOKY = "https://b2b.stoky.com.br/produtos";

export function LinkAcessoStoky() {
  const [copiado, setCopiado] = useState(false);

  async function copiarLink() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(URL_STOKY);
      ok = true;
    } catch {
      // Fallback para navegadores sem permissão de clipboard direta
      try {
        const campo = document.createElement("textarea");
        campo.value = URL_STOKY;
        campo.setAttribute("readonly", "");
        campo.style.cssText = "position:fixed;top:0;left:0;opacity:0";
        document.body.appendChild(campo);
        campo.select();
        ok = document.execCommand("copy");
        campo.remove();
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    }
  }

  return (
    <div className="link-acesso-card" aria-label="Acesso rápido ao e-commerce da Stoky">
      <div className="link-acesso-info">
        <span className="link-acesso-badge">Loja Oficial B2B</span>
        <code className="link-acesso-url">{URL_STOKY}</code>
      </div>
      <div className="link-acesso-acoes">
        <a
          href={URL_STOKY}
          target="_blank"
          rel="noopener noreferrer"
          className="btn link-acesso-btn-abrir"
        >
          <span>Acessar site</span>
          <Icone nome="external" />
        </a>
        <button
          type="button"
          className={`btn link-acesso-btn-copiar${copiado ? " copiado" : ""}`}
          onClick={copiarLink}
          aria-label="Copiar endereço do site"
        >
          <Icone nome={copiado ? "check" : "copy"} />
          <span>{copiado ? "Copiado!" : "Copiar link"}</span>
        </button>
      </div>
    </div>
  );
}


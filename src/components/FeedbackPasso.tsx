import { useState } from "react";
import type { Posicao } from "../content/navegacao";
import { Icone } from "./Icone";

interface Props {
  pos: Posicao;
}

const WHATSAPP_NUMERO = "556530269976";

export function FeedbackPasso({ pos }: Props) {
  const [estado, setEstado] = useState<"idle" | "sim" | "duvida" | "enviado">("idle");
  const [duvidaTexto, setDuvidaTexto] = useState("");

  const etapaNome = `Etapa ${pos.indiceModulo + 1}: ${pos.modulo.titulo}`;
  const passoNome = pos.passo.titulo;

  function enviarWhatsApp() {
    const cabecalho = `Olá! Estou consultando o Guia Stoky B2B na *${etapaNome}* (Passo: *${passoNome}*).`;
    const complemento = duvidaTexto.trim()
      ? `\n\nMinha dúvida é:\n${duvidaTexto.trim()}`
      : `\n\nEstou com uma dúvida sobre este passo e gostaria de ajuda da equipe do e-commerce.`;

    const textoFinal = `${cabecalho}${complemento}`;
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(textoFinal)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setEstado("enviado");
  }

  return (
    <section className="feedback-passo-card" aria-label="Avaliação deste passo">
      {estado === "idle" && (
        <div className="feedback-passo-inicio">
          <p className="feedback-pergunta">Este passo esclareceu sua dúvida?</p>
          <div className="feedback-botoes">
            <button
              type="button"
              className="btn btn-feedback btn-feedback-sim"
              onClick={() => setEstado("sim")}
            >
              <span>👍 Sim, esclareceu</span>
            </button>
            <button
              type="button"
              className="btn btn-feedback btn-feedback-nao"
              onClick={() => setEstado("duvida")}
            >
              <span>👎 Ainda com dúvida</span>
            </button>
          </div>
        </div>
      )}

      {estado === "sim" && (
        <div className="feedback-passo-sucesso">
          <Icone nome="check-circle" className="feedback-sucesso-ic" />
          <span>Que ótimo! Ficamos felizes em ajudar.</span>
          <button
            type="button"
            className="feedback-btn-alterar"
            onClick={() => setEstado("idle")}
          >
            Alterar
          </button>
        </div>
      )}

      {estado === "duvida" && (
        <div className="feedback-passo-formulario">
          <div className="feedback-formulario-topo">
            <span className="feedback-tag">Suporte do e-commerce</span>
            <p className="feedback-formulario-titulo">Qual é a sua dúvida nesta etapa?</p>
            <p className="feedback-formulario-sub">
              Escreva abaixo para enviar ao nosso WhatsApp já com esta etapa identificada:
            </p>
          </div>
          <textarea
            className="feedback-textarea"
            rows={2}
            placeholder="Ex.: Não encontrei a opção na tela, gostaria de entender sobre o prazo..."
            value={duvidaTexto}
            onChange={(e) => setDuvidaTexto(e.target.value)}
          />
          <div className="feedback-formulario-acoes">
            <button
              type="button"
              className="btn btn-whatsapp"
              onClick={enviarWhatsApp}
            >
              <Icone nome="chat" />
              <span>Enviar dúvida no WhatsApp</span>
            </button>
            <button
              type="button"
              className="feedback-btn-cancelar"
              onClick={() => {
                setDuvidaTexto("");
                setEstado("idle");
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {estado === "enviado" && (
        <div className="feedback-passo-sucesso">
          <Icone nome="check" className="feedback-sucesso-ic" />
          <span>Dúvida encaminhada para o WhatsApp do e-commerce! Nossa equipe irá te atender.</span>
          <button
            type="button"
            className="feedback-btn-alterar"
            onClick={() => {
              setDuvidaTexto("");
              setEstado("idle");
            }}
          >
            Nova dúvida
          </button>
        </div>
      )}
    </section>
  );
}


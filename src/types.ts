import type { ReactNode } from "react";

/**
 * Formato do conteúdo do guia. Se algo estiver errado nos arquivos de `src/content/modulos/`,
 * o `npm run build` (ou o editor) aponta o erro antes de publicar.
 */

/** Uma captura de tela com as três explicações que aparecem abaixo dela. */
export interface Captura {
  /** Nome do arquivo dentro de `public/img/`, por exemplo "02-entrar.jpg". */
  arquivo: string;
  /** Texto curto exibido embaixo da imagem e no título da ampliação. */
  legenda: string;
  /** Bloco "O que é". */
  oQueE?: ReactNode;
  /** Bloco "Para que serve". */
  paraQueServe?: ReactNode;
  /** Bloco "Como usar". Costuma ser uma lista (<ul> ou <ol>). */
  comoUsar?: ReactNode;
}

interface PassoBase {
  /**
   * Identificador único do passo. É ele que guarda a conclusão de cada pessoa no navegador.
   * NÃO mude o id de um passo existente (o progresso salvo se perde); pode reordenar à vontade.
   * Para um passo novo, invente um id que ainda não exista, ex.: "carrinho-frete".
   */
  id: string;
  titulo: string;
  /**
   * `true` = passo de CONSULTA: não é preciso para comprar, só para quando surgir a dúvida
   * (ex.: recuperar senha, cupom, etiquetas). Ele vem depois dos passos principais, o botão
   * "Próximo" PULA esses passos, e a pessoa chega neles por "Para consultar" (no fim da etapa)
   * ou pelo menu. Não apaga nada; só muda a posição e o peso.
   */
  consulta?: boolean;
}

/** Passo comum: título, texto e, se quiser, captura, dica e aviso. */
export interface PassoComum extends PassoBase {
  /** Linha com o ícone de localização, ex.: "No canto superior direito da página". */
  onde?: string;
  texto: ReactNode;
  captura?: Captura;
  /** Caixa azul "Dica". */
  dica?: ReactNode;
  /** Caixa amarela "Atenção". */
  aviso?: ReactNode;
}

/** Um caminho dentro de uma decisão ("Qual é o seu caso?"). */
export interface Caminho {
  nome: string;
  quem: string;
  /** Cada item vira um passo numerado dentro do caminho. */
  passos: ReactNode[];
}

/** Passo de decisão: o leitor escolhe o caminho que corresponde ao seu caso. */
export interface PassoDecisao extends PassoBase {
  caminhos: Caminho[];
}

export type Passo = PassoComum | PassoDecisao;

export const ehDecisao = (p: Passo): p is PassoDecisao => "caminhos" in p;

/**
 * Uma ETAPA do guia: aparece na barra horizontal e no menu lateral. A numeração ("Etapa 2 de 7")
 * é automática, pela posição na lista de `content/index.ts`.
 */
export interface Modulo {
  /** Também é o endereço da etapa (#acesso). Evite mudar depois de publicado. */
  id: string;
  /** Nome curto: aparece na barra horizontal, então prefira poucas palavras. */
  titulo: string;
  /** Frase de abertura, mostrada no primeiro passo da etapa. */
  introducao: string;
  /** Lista "Você vai precisar de:" (opcional). */
  precisa?: string[];
  /** `true` = módulo inteiro de consulta (vai para o grupo "Para consultar" do menu). */
  consulta?: boolean;
  passos: Passo[];
}

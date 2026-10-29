import type { Modulo } from "../../types";
import { Contorno, Verde } from "../ui";

/** Finalizar o pedido */
export const pedido: Modulo = {
  id: "pedido",
  titulo: "Finalizar o pedido",
  introducao: "Defina as condições de pagamento e entrega, confira o resumo e envie o pedido.",
  passos: [
    {
      id: "pedido-1",
      titulo: "Pagamento, entrega e envio",
      onde: "Botão “Prosseguir para pagamento” ou “Ir p/ pagamento”",
      texto: (
        <p>
          Preencha as informações de pagamento e entrega. As opções apresentadas dependem do
          cadastro da empresa e do pedido.
        </p>
      ),
      captura: {
        arquivo: "14-checkout.jpg",
        legenda: "Tela de pagamento, com valores ocultos",
        oQueE: "A tela de finalização do pedido.",
        paraQueServe: "Definir pagamento e entrega, registrar observações e confirmar o valor final.",
        comoUsar: (
          <ol>
            <li>
              Em <strong>Forma de pagamento</strong> e <strong>Condição de pagamento</strong>, escolha
              as opções disponíveis para o pedido. Por exemplo, selecione a opção de boleto, se
              estiver disponível para o seu pedido. O valor mínimo para utilizar cada condição aparece
              abaixo da respectiva opção.
            </li>
            <li>
              Em <strong>Tipo de Entrega</strong>, selecione Praça, Entrega, Retira ou
              Transportadora. Em Retira, você busca a compra na loja.
            </li>
            <li>
              Se necessário, registre horário, ponto de referência ou responsável pelo recebimento
              em <strong>Observações de entrega</strong>. Use <strong>Observações do pedido</strong>
              para outras orientações sobre a compra.
            </li>
            <li>
              Se possuir um cupom, informe o código em <strong>Possui um cupom de desconto?</strong>
              e clique em <Contorno>Aplicar</Contorno>.
            </li>
            <li>
              No resumo, confira <strong>Forma de cobrança</strong>, <strong>Parcelamento</strong> e
              <strong> Total</strong>. Depois, clique em <Verde>Enviar pedido</Verde>.
            </li>
            <li>
              Para alterar os produtos, clique em <Verde>← Voltar para o carrinho</Verde> no topo.
            </li>
          </ol>
        ),
      },
      aviso: "O campo Tipo de Entrega é obrigatório. Se faltar alguma informação obrigatória, um aviso em vermelho aparecerá acima do botão de envio.",
    },
    {
      id: "pedido-8",
      titulo: "Confirmação do pedido",
      texto: (
        <p>
          Após o envio, a <strong>confirmação aparece na tela</strong>. Você também pode acompanhar
          o pedido em <strong>Área do cliente › Pedidos</strong>.
        </p>
      ),
      captura: {
        arquivo: "15-confirmacao.jpg",
        legenda: "Confirmação do pedido (dados ocultos)",
        oQueE: "A confirmação de que a Stoky recebeu o pedido.",
        paraQueServe: "Informar o número do pedido e apresentar um resumo das escolhas realizadas.",
        comoUsar: (
          <ul>
            <li>
              A mensagem verde no topo confirma o envio e apresenta o <strong>número do pedido</strong>.
              Guarde esse número para acompanhar o pedido em <strong>Área do cliente › Pedidos</strong>.
            </li>
            <li>
              No resumo, confira cobrança, plano de pagamento, tipo de frete, transportadora e
              observações.
            </li>
            <li>Na lista de produtos, confira valor unitário, quantidade e total de cada item.</li>
            <li>No final, consulte a quantidade de itens, o subtotal e o <strong>total</strong>.</li>
            <li>Clique em <Verde>Voltar para a página inicial</Verde> para retornar à loja.</li>
          </ul>
        ),
      },
    },
  ],
};

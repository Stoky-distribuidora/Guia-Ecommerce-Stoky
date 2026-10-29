import type { Modulo } from "../../types";
import { Contorno, Verde } from "../ui";

/** Montar o carrinho */
export const carrinho: Modulo = {
  id: "carrinho",
  titulo: "Montar o carrinho",
  introducao: "Reúna os produtos desejados e revise itens, quantidades e valores antes de enviar o pedido.",
  passos: [
    {
      id: "carrinho-2",
      titulo: "Abra e confira o carrinho",
      onde: "Ícone de carrinho no topo, ao lado de Área do cliente",
      texto: (
        <>
          <p>
            O painel lateral apresenta os produtos, a forma de cobrança e o <strong>Total do
            pedido</strong>.
          </p>
          <ul>
            <li>Clique em <Contorno>Ver carrinho</Contorno> para revisar todos os detalhes.</li>
            <li>Clique em <Verde>Ir p/ pagamento</Verde> para prosseguir diretamente.</li>
          </ul>
        </>
      ),
      captura: {
        arquivo: "12-painel.jpg",
        legenda: "Painel lateral do carrinho (valores ocultos)",
        oQueE: "Um resumo do carrinho aberto na lateral, sem sair da página atual.",
        paraQueServe: "Conferir e ajustar o pedido enquanto você continua comprando.",
        comoUsar: (
          <ul>
            <li>
              No topo, confira o número do carrinho, a <strong>Cobrança</strong> e o
              <strong> Plano</strong> de pagamento. Use o seletor ao lado para alterar essas opções.
            </li>
            <li>Cada item apresenta código, etiquetas, preço e <strong>Total</strong> da linha.</li>
            <li>Ajuste as quantidades ou use a <strong>lixeira</strong> para remover um produto.</li>
            <li>No rodapé, o <strong>Total Pedido</strong> reúne o valor de todos os itens.</li>
            <li>Para fechar o painel, clique no <strong>X</strong>.</li>
          </ul>
        ),
      },
      dica: "O carrinho é salvo automaticamente. Ao retornar ao site, os produtos adicionados continuam disponíveis.",
    },
    {
      id: "carrinho-3",
      titulo: "Revise e finalize o carrinho",
      onde: "Página “Ver carrinho”",
      texto: <p>Revise o pedido, adicione produtos por código e escolha como deseja prosseguir.</p>,
      captura: {
        arquivo: "13-carrinho.jpg",
        legenda: "Página “Ver carrinho” (valores ocultos)",
        oQueE: "A página completa para revisar o carrinho antes do pagamento.",
        paraQueServe: "Ajustar o pedido, incluir itens e escolher entre finalizar, continuar comprando ou salvar o orçamento.",
        comoUsar: (
          <ul>
            <li>
              Em <strong>Esqueceu de algum produto?</strong>, informe o código e a quantidade e
              clique em <Verde>Adicionar</Verde> para incluir um item diretamente no carrinho.
            </li>
            <li>
              Em <strong>Produtos no seu orçamento</strong>, confira os itens, os preços e os totais.
              Ajuste as quantidades ou remova um produto pela lixeira.
            </li>
            <li>
              Para remover vários itens, selecione os produtos e clique em
              <Contorno> Remover selecionados</Contorno>. Para excluir todos, use
              <Contorno> Limpar carrinho</Contorno>.
            </li>
            <li>No <strong>Resumo do pedido</strong>, confira o total dos itens e o total do pedido.</li>
            <li>
              Na parte inferior, você encontra as opções para <Contorno>Salvar como orçamento</Contorno>,
              <Contorno> Continuar comprando</Contorno>, <Verde>Prosseguir para pagamento</Verde> ou
              baixar o carrinho em uma <strong>planilha</strong>.
            </li>
          </ul>
        ),
      },
      dica: "Os carrinhos salvos como orçamento ficam disponíveis em Área do cliente › Orçamentos.",
    },
  ],
};

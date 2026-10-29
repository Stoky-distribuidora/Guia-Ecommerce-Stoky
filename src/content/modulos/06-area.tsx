import type { Modulo } from "../../types";
import { Contorno, Verde } from "../ui";

/** Área do cliente */
export const area: Modulo = {
  id: "area",
  titulo: "Área do cliente",
  consulta: true,
  introducao: "Acompanhe pedidos, consulte notas fiscais e boletos, retome orçamentos e gerencie os dados da sua conta.",
  passos: [
    {
      id: "area-1",
      titulo: "Conheça a Área do cliente",
      onde: "Canto superior direito",
      texto: <p>Clique em <Contorno>Área do cliente</Contorno> para abrir o menu com os recursos da sua conta.</p>,
      captura: {
        arquivo: "16-menu-area.jpg",
        legenda: "Menu da Área do cliente aberto",
        oQueE: "O menu de acesso aos recursos disponíveis para a sua empresa.",
        paraQueServe: "Centralizar a consulta de compras, documentos, dados cadastrais e outros serviços.",
        comoUsar: (
          <ul>
            <li>
              <strong>Loja e Filial</strong> indicam a empresa e a filial utilizadas no momento.
            </li>
            <li>
              <strong>Minha Conta, Orçamentos, Pedidos, Notas Fiscais e Boletos</strong> são
              apresentados nas próximas telas desta etapa.
            </li>
            <li>
              <strong>Avisos</strong> reúne atualizações sobre compras e finanças.
              <strong> Dashboard</strong> apresenta resumos visuais quando estão configurados para o
              seu perfil.
            </li>
            <li>
              Em <strong>Relatórios</strong> e <strong>Campanhas Comerciais</strong>, consulte as
              informações e as ações comerciais disponíveis para a sua empresa.
            </li>
            <li>
              No <strong>SAC</strong>, abra e acompanhe tickets sobre pedidos ou notas fiscais. No
              <strong> FAQ</strong>, pesquise dúvidas, dicas, artigos e tutoriais.
            </li>
            <li>
              Para sair do site, clique em <strong>Deslogar</strong>, especialmente ao utilizar um
              computador compartilhado.
            </li>
          </ul>
        ),
      },
    },
    {
      id: "area-3",
      titulo: "Minha conta",
      texto: <p>Atualize seus dados cadastrais, altere a senha e consulte as empresas vinculadas ao seu acesso.</p>,
      captura: {
        arquivo: "22-minha-conta.jpg",
        legenda: "Minha Conta (dados pessoais ocultos)",
        oQueE: "A página com o perfil do usuário, a alteração de senha e as empresas vinculadas.",
        paraQueServe: "Manter os dados atualizados e gerenciar o acesso à conta.",
        comoUsar: (
          <ul>
            <li>
              Use o <strong>menu à esquerda</strong> para acessar diretamente Pedidos, Notas Fiscais,
              Boletos e os demais recursos.
            </li>
            <li>
              Em <strong>Meu perfil</strong>, consulte nome, CNPJ/CPF, nascimento, WhatsApp e e-mail.
              Para solicitar alterações cadastrais, utilize o link indicado na tela.
            </li>
            <li>
              Em <strong>Redefinir senha</strong>, informe a senha atual, digite a nova senha duas
              vezes e clique em <Verde>Alterar Senha</Verde>.
            </li>
            <li>
              Em <strong>Clientes vinculados</strong>, consulte as empresas que você pode atender
              pelo site, com código, endereço, CNPJ e data de início do relacionamento.
            </li>
          </ul>
        ),
      },
    },
    {
      id: "area-5",
      titulo: "Orçamentos",
      texto: (
        <p>
          Consulte os carrinhos salvos com <strong>Salvar como orçamento</strong> e o carrinho que
          você está montando.
        </p>
      ),
      captura: {
        arquivo: "18-orcamentos.jpg",
        legenda: "Meus orçamentos (dados ocultos)",
        oQueE: "A lista de compras montadas e salvas para decisão posterior.",
        paraQueServe: "Retomar uma compra sem pesquisar novamente todos os produtos.",
        comoUsar: (
          <ol>
            <li>
              Nos filtros, informe o período, a Situação, a Origem ou o número do orçamento e clique
              em <Verde>Pesquisar</Verde>.
            </li>
            <li>
              Na legenda, consulte a origem de cada orçamento: Site, Callcenter, Representante ou Outros.
            </li>
            <li>A aba <strong>Meu carrinho</strong> identifica o carrinho que você está montando.</li>
            <li>
              Em cada orçamento, clique em <Verde>Visualizar</Verde> para consultar os itens ou em
              <Verde> Editar</Verde> para alterá-los. Em <Contorno>+ Ações</Contorno>, você pode
              baixar o PDF ou duplicar o orçamento.
            </li>
            <li>Use o campo <strong>Criação</strong> para alterar a ordem da lista.</li>
          </ol>
        ),
      },
    },
    {
      id: "area-6",
      titulo: "Pedidos",
      texto: <p>Consulte os pedidos enviados, confira seus itens e repita compras quando necessário.</p>,
      captura: {
        arquivo: "17-pedidos.jpg",
        legenda: "Meus pedidos (dados ocultos)",
        oQueE: "A lista dos pedidos enviados pela sua empresa.",
        paraQueServe: "Acompanhar compras, consultar itens e repetir pedidos.",
        comoUsar: (
          <ol>
            <li>
              Selecione o <strong>Mês/Ano</strong> e, quando houver mais de uma opção, a
              <strong> Filial</strong>. Clique em <Verde>Pesquisar</Verde>.
            </li>
            <li>
              Cada Card apresenta o número do pedido, iniciado por P-, a quantidade de itens, a
              origem e o total.
            </li>
            <li>Clique em <Verde>Visualizar</Verde> para consultar todos os produtos do pedido.</li>
            <li>Clique em <Verde>Duplicar</Verde> para criar um pedido com os mesmos itens.</li>
            <li>Em <Contorno>+ Ações</Contorno>, baixe o PDF do pedido.</li>
          </ol>
        ),
      },
    },
    {
      id: "area-7",
      titulo: "Notas fiscais",
      texto: <p>Consulte as notas fiscais das suas compras e baixe os arquivos disponíveis.</p>,
      captura: {
        arquivo: "19-notas.jpg",
        legenda: "Notas fiscais (dados ocultos)",
        oQueE: "A lista das notas fiscais emitidas para a sua empresa.",
        paraQueServe: "Baixar o DANFE em PDF para conferência e o XML para o contador ou sistema de gestão.",
        comoUsar: (
          <ol>
            <li>
              Informe o período em <strong>Data inicial</strong> e <strong>Data final</strong> ou o
              <strong> Número</strong> da nota. Clique em <Verde>Pesquisar</Verde>.
            </li>
            <li>Selecione a nota fiscal desejada.</li>
            <li>
              Clique em <Contorno>DANFE</Contorno> para baixar o PDF ou em <Contorno>XML</Contorno>
              para baixar o arquivo XML.
            </li>
            <li>Cada Card apresenta número, quantidade de itens, data, filial e total da nota.</li>
          </ol>
        ),
      },
    },
    {
      id: "area-8",
      titulo: "Boletos",
      texto: <p>Consulte os boletos em aberto, os vencimentos e os valores.</p>,
      captura: {
        arquivo: "20-boletos.jpg",
        legenda: "Boletos (dados ocultos)",
        oQueE: "A lista dos boletos da sua empresa.",
        paraQueServe: "Identificar os pagamentos pendentes e baixar os boletos.",
        comoUsar: (
          <ol>
            <li>
              Quando houver mais de uma opção, selecione a <strong>Filial</strong> e clique
              em <Verde>Pesquisar</Verde>.
            </li>
            <li>Cada Card apresenta número, tipo de cobrança, <strong>vencimento</strong> e total.</li>
            <li><strong>Vencido há</strong>, em vermelho, indica há quantos dias o boleto venceu.</li>
            <li>Clique no ícone de download à direita para baixar o boleto.</li>
            <li>Use o campo <strong>Vencimento</strong> para alterar a ordem da lista.</li>
          </ol>
        ),
      },
    },
  ],
};

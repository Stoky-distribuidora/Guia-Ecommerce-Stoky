import type { Modulo } from "../../types";
import { Contorno, Escuro, Etiqueta, Obrigatorio, Verde } from "../ui";

/** Entrar no site */
export const acesso: Modulo = {
  id: "acesso",
  titulo: "Entrar no site",
  introducao: "Entre com seu acesso, solicite a liberação para uma empresa já cliente ou cadastre uma nova empresa.",
  passos: [
    {
      id: "acesso-1",
      titulo: "Entre ou cadastre-se",
      onde: "No canto superior direito da página",
      texto: <p>Clique em <strong>Entre ou cadastre-se</strong>. A janela apresenta as opções de acesso e cadastro.</p>,
      captura: {
        arquivo: "02-entrar.jpg",
        legenda: "Janela “Entre ou cadastre-se”",
        oQueE: "A janela de acesso ao site e de início dos cadastros.",
        paraQueServe: "Identificar o usuário e apresentar os preços e as condições disponíveis para a empresa.",
        comoUsar: (
          <ul>
            <li>
              Se você já possui acesso, preencha <strong>CNPJ ou e-mail</strong> e
              <strong> Senha</strong> e clique em <Verde>Entrar</Verde>.
            </li>
            <li>Use o controle ao lado do campo <strong>Senha</strong> para conferir o que digitou.</li>
            <li>
              Em <strong>Esqueceu sua senha?</strong>, solicite a recuperação do acesso pelo e-mail.
            </li>
            <li>
              Clique em <Escuro>Sou cliente mas ainda não tenho acesso</Escuro> se sua empresa já
              compra com a Stoky, mas você ainda não utiliza o site.
            </li>
            <li>
              Clique em <Escuro>Ainda não sou cliente</Escuro> para cadastrar uma nova empresa.
            </li>
            <li>Para fechar a janela, clique no <strong>X</strong>.</li>
          </ul>
        ),
      },
    },
    {
      id: "acesso-3",
      titulo: "Cliente sem acesso: dados do usuário",
      onde: "Botão “Sou cliente mas ainda não tenho acesso”",
      texto: (
        <p>
          Na janela <strong>Solicitação de acesso</strong>, informe os dados da pessoa que utilizará
          o site.
        </p>
      ),
      captura: {
        arquivo: "03-acesso-1.jpg",
        legenda: "Solicitação de acesso: Dados do usuário",
        oQueE: "O formulário para quem já compra com a Stoky e deseja utilizar o site pela primeira vez.",
        paraQueServe: "Criar o usuário que será vinculado ao cadastro da empresa.",
        comoUsar: (
          <ol>
            <li>
              Preencha <strong>Nome</strong> e <strong>Email</strong>. Os campos
              com <Obrigatorio /> são obrigatórios.
            </li>
            <li>Se desejar, informe também data de nascimento, WhatsApp ou celular e CPF.</li>
            <li>Em <strong>Senha (opcional)</strong>, você já pode definir sua senha.</li>
            <li>Clique em <Escuro>Vincular cliente(s)</Escuro> para continuar.</li>
          </ol>
        ),
      },
    },
    {
      id: "acesso-4",
      titulo: "Cliente sem acesso: vincule a empresa",
      texto: (
        <p>
          Vincule seu usuário ao cadastro da empresa. Se você atende mais de uma empresa, informe os
          CNPJs correspondentes.
        </p>
      ),
      captura: {
        arquivo: "03-acesso-2.jpg",
        legenda: "Solicitação de acesso: Vincular clientes",
        oQueE: "A etapa que relaciona o usuário à empresa que já compra com a Stoky.",
        paraQueServe: "Identificar o cadastro que a equipe da Stoky deve liberar para o seu acesso.",
        comoUsar: (
          <ol>
            <li>
              Digite o <strong>CNPJ</strong> da empresa.
            </li>
            <li>Clique em <Verde>Consultar</Verde> para localizar o cadastro.</li>
            <li>
              Selecione <strong>Eu aceito e concordo</strong> com os Termos e Condições de Uso e o
              Termo de Tratamento de Dados. Clique nos nomes dos documentos para lê-los.
            </li>
            <li>
              Clique em <Verde>Enviar</Verde>. O botão é ativado após a aceitação dos termos.
            </li>
            <li>Para corrigir os dados do usuário, clique em <Contorno>← Voltar</Contorno>.</li>
          </ol>
        ),
      },
      dica: "Após a equipe da Stoky liberar o seu acesso, você receberá um e-mail informando a liberação. Em seguida, basta entrar no site com seu CNPJ ou e-mail e senha.",
    },
    {
      id: "acesso-5",
      titulo: "Cadastro de nova empresa",
      onde: "Botão “Ainda não sou cliente”",
      texto: (
        <p>
          Na página <strong>Cadastro de Revendedor</strong>, informe os dados da empresa, o endereço
          e os contatos.
        </p>
      ),
      captura: {
        arquivo: "04-cadastro-1.jpg",
        legenda: "Cadastro de Revendedor: Dados da Empresa",
        oQueE: "O cadastro destinado a empresas que ainda não compram com a Stoky.",
        paraQueServe: "Enviar os dados da empresa para análise e liberação do acesso.",
        comoUsar: (
          <ol>
            <li>
              Informe os dados da empresa: <strong>nome fantasia, CNPJ, razão social e data de
              fundação</strong>. Se a empresa possuir <strong>inscrição municipal</strong>, informe
              também esse dado.
            </li>
            <li>
              No endereço, comece pelo <strong>CEP</strong> e informe a rua, o número, o bairro, o
              estado, a cidade e, por último, o complemento.
            </li>
            <li>Preencha os dados de contato: telefone, WhatsApp e e-mail da empresa.</li>
            <li>
              Selecione <strong>Eu aceito e concordo</strong> com os Termos e Condições de Uso e o
              Termo de Tratamento de Dados.
            </li>
            <li>
              Clique em <Verde>Prosseguir</Verde>. O botão é ativado após a aceitação dos termos.
            </li>
          </ol>
        ),
      },
      dica: "Os campos com * são obrigatórios. O comprovante do CNPJ pode ajudar a conferir razão social e data de fundação.",
    },
    {
      id: "acesso-6",
      titulo: "Dados do sócio",
      texto: <p>Informe os dados do <strong>sócio responsável</strong> pela empresa para concluir o cadastro.</p>,
      captura: {
        arquivo: "05-cadastro-2.jpg",
        legenda: "Cadastro de Revendedor: Dados do Sócio",
        oQueE: "A segunda parte do cadastro, com a identificação e o contato do sócio responsável.",
        paraQueServe: "Identificar o responsável pela empresa.",
        comoUsar: (
          <ol>
            <li>
              Preencha as informações solicitadas: <strong>Nome e CPF</strong>. Os campos
              com <Obrigatorio /> são obrigatórios.
            </li>
            <li>Preencha os dados de contato: celular e e-mail.</li>
            <li>Confirme a aceitação dos <strong>Termos e Condições</strong>.</li>
            <li>
              Clique em <Verde>Enviar</Verde>. Para corrigir os dados da empresa,
              use <Contorno>Voltar</Contorno>.
            </li>
          </ol>
        ),
      },
      dica: "Após o envio, a equipe da Stoky analisará os dados cadastrais. Assim que o acesso for liberado, você receberá um e-mail informando a liberação para entrar no site e iniciar suas compras.",
    },
    {
      id: "acesso-7",
      titulo: "Acesso realizado",
      texto: (
        <p>
          Após entrar, a opção <Contorno>Área do cliente</Contorno> substitui “Entre ou cadastre-se”,
          e os preços passam a aparecer nos produtos.
        </p>
      ),
      captura: {
        arquivo: "07-logado.jpg",
        legenda: "Página inicial após o acesso",
        oQueE: "A página inicial com o acesso da empresa já identificado.",
        paraQueServe: "Consultar preços, adicionar produtos ao carrinho e iniciar o pedido.",
        comoUsar: (
          <ul>
            <li>
              Em <strong>Área do cliente</strong>, consulte pedidos, notas fiscais, boletos e dados
              da conta. Esses recursos são apresentados na Etapa 7.
            </li>
            <li>
              No ícone do carrinho, o número em vermelho indica quantos produtos foram adicionados.
            </li>
            <li>
              Os Cards apresentam os preços da empresa e, quando houver, o percentual de desconto,
              como <Etiqueta tipo="pct">-18%</Etiqueta>.
            </li>
          </ul>
        ),
      },
    },
    {
      id: "acesso-8",
      consulta: true,
      titulo: "Recupere sua senha",
      onde: "Na janela de entrada, abaixo do campo Senha",
      texto: <p>Solicite um código de recuperação para criar uma nova senha.</p>,
      captura: {
        arquivo: "06-senha.jpg",
        legenda: "Janela “Esqueceu sua senha?”",
        oQueE: "O recurso de recuperação de acesso.",
        paraQueServe: "Enviar um código ao seu e-mail para que você crie uma nova senha.",
        comoUsar: (
          <ol>
            <li>Na janela de entrada, clique em <strong>Esqueceu sua senha?</strong></li>
            <li>Digite o <strong>CNPJ ou e-mail</strong> utilizado para acessar o site.</li>
            <li>Clique em <Verde>Enviar email com código de recuperação de senha</Verde>.</li>
            <li>
              Abra o e-mail da Stoky, copie o código recebido e informe-o no campo de recuperação.
            </li>
            <li>Siga as instruções para criar a nova senha.</li>
          </ol>
        ),
      },
      dica: "Se o e-mail não estiver na caixa de entrada, verifique as pastas de spam ou lixo eletrônico.",
    },
  ],
};

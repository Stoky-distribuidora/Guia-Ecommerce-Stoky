import type { Modulo } from "../../types";
import { LinkAcessoStoky } from "../../components/LinkAcessoStoky";
import { Contorno, Verde } from "../ui";

/** Boas-vindas */
export const inicio: Modulo = {
  id: "inicio",
  titulo: "Boas-vindas",
  introducao: "Este guia apresenta o caminho para fazer pedidos no site da Stoky. Avance pelas etapas ou use o menu para consultar um assunto específico.",
  precisa: ["Computador ou celular com internet", "CNPJ da empresa", "E-mail corporativo ou de contato"],
  passos: [
    {
      id: "inicio-1",
      titulo: "Acesse o site da Stoky",
      texto: (
        <>
          <p>No navegador, acesse o endereço oficial do e-commerce da Stoky:</p>
          <LinkAcessoStoky />
          <p>
            Você pode consultar os produtos antes de entrar, mas os <strong>preços só aparecem
            após o acesso</strong>. Até lá, o site mostra o aviso <Verde>Faça login ou cadastre-se
            para visualizar os preços</Verde>.
          </p>
          <p>
            Use <strong>Próximo</strong> para avançar e marcar a tela atual como concluída. Para
            revisar um assunto, utilize <strong>Anterior</strong> ou o menu de etapas.
          </p>
        </>
      ),
      captura: {
        arquivo: "01-inicio.jpg",
        legenda: "Página inicial antes de entrar no site",
        oQueE: "A página inicial da loja Stoky, com os produtos disponíveis para consulta.",
        paraQueServe: "Apresentar a loja e dar acesso à pesquisa, aos departamentos e à entrada do site.",
        comoUsar: (
          <ul>
            <li>
              No canto superior direito, clique em <Contorno>Entre ou cadastre-se</Contorno> para
              acessar sua conta ou iniciar um cadastro.
            </li>
            <li>Em <strong>Buscar por...</strong>, pesquise um produto pelo nome ou código.</li>
            <li>
              Na faixa de departamentos, escolha uma área, como Agropecuária, Automotivo ou
              Construção, para ver os produtos correspondentes.
            </li>
            <li>
              Na coluna à esquerda, acesse Lançamentos, Promoções, Mais Vendidos e as categorias
              de produtos.
            </li>
            <li>
              Na barra superior, consulte Produtos, dúvidas sobre o site, Fale Conosco e Catálogo.
            </li>
          </ul>
        ),
      },
    },
  ],
};

import type { Modulo } from "../../types";
import { Etiqueta, Verde } from "../ui";

/** Página do produto */
export const produto: Modulo = {
  id: "produto",
  titulo: "Página do produto",
  introducao: "Consulte fotos, informações comerciais e dados técnicos antes de adicionar o produto ao carrinho.",
  passos: [
    {
      id: "produto-2",
      titulo: "Confira os detalhes do produto",
      texto: (
        <p>
          Clique no nome ou na foto de um Card para abrir a página do produto. As principais
          informações ficam na parte superior.
        </p>
      ),
      captura: {
        arquivo: "10-produto.jpg",
        legenda: "Parte superior da página do produto",
        oQueE: "A página com os detalhes comerciais e as fotos do produto.",
        paraQueServe: "Confirmar se o produto atende às suas necessidades antes da compra.",
        comoUsar: (
          <ul>
            <li>
              O <strong>caminho de navegação</strong> no topo indica a localização do produto na
              loja. Clique em um departamento ou categoria para consultar itens relacionados.
            </li>
            <li>
              Nas <strong>fotos</strong>, clique nas miniaturas para alternar a imagem. Clique duas
              vezes na imagem principal para ampliá-la e mais duas vezes para retornar.
            </li>
            <li>
              Confira <strong>nome, código, marca, departamento e categoria</strong>. Os links
              permitem localizar outros produtos do mesmo grupo.
            </li>
            <li>
              A etiqueta <Etiqueta tipo="nc">NC</Etiqueta> identifica um produto que sua empresa
              nunca comprou. O percentual, como <Etiqueta tipo="pct">-15%</Etiqueta>, indica o
              desconto aplicado.
            </li>
            <li>
              O botão <Verde>?</Verde>, no canto superior direito, apresenta orientações sobre os
              recursos da página.
            </li>
          </ul>
        ),
      },
    },
    {
      id: "produto-4",
      consulta: true,
      titulo: "Consulte a ficha técnica",
      texto: (
        <p>
          Role a página até <strong>Ficha técnica</strong> para consultar embalagem, unidade,
          códigos, peso e classificação fiscal.
        </p>
      ),
      captura: {
        arquivo: "11-ficha.jpg",
        legenda: "Informações do produto e Ficha técnica",
        oQueE: "A seção com a descrição e os dados técnicos do produto.",
        paraQueServe: "Esclarecer dúvidas antes da compra e consultar dados para estoque ou nota fiscal.",
        comoUsar: (
          <ul>
            <li>
              <strong>Embalagem</strong> e <strong>Unidade</strong> indicam como o produto é
              comercializado. Por exemplo, UN significa unidade.
            </li>
            <li><strong>Caixa fechada</strong> informa a quantidade de itens na embalagem fechada.</li>
            <li><strong>Cód. barras</strong> apresenta o código EAN do produto.</li>
            <li><strong>Cód. fabricante</strong> apresenta a referência do fabricante.</li>
            <li><strong>Peso bruto e líquido</strong> são informados em quilos.</li>
            <li><strong>Class. fiscal (NCM)</strong> apresenta o código utilizado na nota fiscal.</li>
          </ul>
        ),
      },
    },
  ],
};

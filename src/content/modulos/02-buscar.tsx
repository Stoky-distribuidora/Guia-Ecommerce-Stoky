import type { Modulo } from "../../types";
import { IconeFiltro, Legenda, Tecla } from "../ui";

/** Encontrar produtos */
export const buscar: Modulo = {
  id: "buscar",
  titulo: "Encontrar produtos",
  introducao: "Pesquise pelo nome ou código, navegue pelos departamentos e utilize os filtros para encontrar os produtos desejados.",
  passos: [
    {
      id: "buscar-1",
      titulo: "Pesquise e selecione produtos",
      onde: "Campo “Buscar por...” no topo da página",
      texto: (
        <p>
          Digite o nome do produto, como <em>torneira</em>, ou seu código. Pressione
          <Tecla> Enter</Tecla> ou clique no botão de pesquisa.
        </p>
      ),
      captura: {
        arquivo: "08-busca.jpg",
        legenda: "Resultado da busca por “torneira”",
        oQueE: "A lista de produtos encontrados na pesquisa.",
        paraQueServe: "Comparar produtos, consultar preços e disponibilidade e selecionar quantidades.",
        comoUsar: (
          <ul>
            <li>
              <strong>Cada Card apresenta as principais informações do produto</strong>, como foto,
              nome, código, embalagem, preço e disponibilidade em estoque.
            </li>
            <li>
              Produtos identificados como <strong>Produto Indisponível</strong> não estão
              disponíveis para compra no momento.
            </li>
            <li>
              Em <strong>Quantidade</strong>, utilize os botões <Tecla>+</Tecla> para aumentar e <Tecla>−</Tecla> para diminuir. A quantidade selecionada é adicionada ao carrinho automaticamente.
            </li>
            <li>
              <strong>Filtros rápidos:</strong>
              <Legenda compacta>
                <IconeFiltro tipo="favoritos" />
                <span>Exibe os produtos adicionados aos favoritos.</span>
                <IconeFiltro tipo="sugestoes" />
                <span>Apresenta sugestões de produtos recomendados para a sua empresa.</span>
                <IconeFiltro tipo="comprados" />
                <span>Exibe produtos já adquiridos nos últimos 30, 60, 90 ou 180 dias.</span>
              </Legenda>
            </li>
            <li>
              Utilize a <strong>ordenação</strong> para alterar a sequência dos produtos e
              <strong> Limpar filtros</strong> para remover os filtros aplicados.
            </li>
            <li>
              Na coluna à esquerda, <strong>filtre os produtos por categoria ou marca</strong>. O
              número entre parênteses indica quantos produtos da busca pertencem a cada opção.
            </li>
            <li>Em <strong>Visualização</strong>, alterne entre exibição em lista ou grade ou acesse a compra rápida.</li>
          </ul>
        ),
      },
      dica: "Para uma busca mais precisa, informe o código do produto. Para apagar o termo pesquisado, clique no X dentro do campo.",
    },
    {
      id: "buscar-2",
      titulo: "Navegue por departamentos e marcas",
      onde: "“Todos os departamentos”, na faixa verde, e coluna da esquerda",
      texto: (
        <p>
          Use <strong>Todos os departamentos</strong> para navegar por áreas da loja. Na coluna à
          esquerda, selecione <strong>Categorias</strong> e <strong>Marcas</strong> para restringir
          os resultados.
        </p>
      ),
      captura: {
        arquivo: "09-departamentos.jpg",
        legenda: "Menu “Todos os departamentos” aberto",
        oQueE: "A lista de departamentos da loja.",
        paraQueServe: "Encontrar produtos por tipo quando você não sabe o nome ou o código exato.",
        comoUsar: (
          <ol>
            <li>Clique em <strong>Todos os departamentos</strong>, na faixa verde.</li>
            <li>Escolha um departamento, como <strong>Hidráulica</strong> ou <strong>Tintas</strong>.</li>
            <li>Para consultar todos os produtos do departamento, clique em <strong>+ Ver Tudo</strong>.</li>
          </ol>
        ),
      },
    },
  ],
};

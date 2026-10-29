# Guia de Compras Stoky B2B

Passo a passo interativo para clientes comprarem no site da Stoky. Feito em React + Vite + TypeScript.

## Comandos

```bash
npm install        # só na primeira vez (baixa as dependências)
npm run dev        # abre o guia para você editar; atualiza sozinho ao salvar
npm run build      # confere os arquivos e gera a versão para publicar em dist/
npm run verificar  # só confere os arquivos (imagens que faltam, erros de digitação)
```

### Rodando com Docker Compose

Para subir o tutorial em um container leve com Nginx:

```bash
docker compose up -d --build   # compila e inicia o container em segundo plano
docker compose ps              # confere se o container está rodando
docker compose down            # para e remove o container
```

* **Acesso local:** `http://localhost:8085`
* **Acesso de outros computadores da rede:** `http://<SEU_IP>:8085` (ex.: `http://192.168.88.9:8085`)
* **Trocar a porta:** defina a variável `PORT` (ex.: `PORT=80 docker compose up -d`).

**Para publicar:** rode `npm run build` e envie **tudo que está dentro de `dist/`** (o `index.html` e a pasta `img/`).
O `index.html` é um arquivo único e também abre com duplo clique, sem servidor.

> A pasta `originais/` guarda prints sem desfoque, com dados de clientes reais. Ela **não** vai para o `dist/`.
> Não envie essa pasta para nenhum servidor.

## Onde mexer em cada coisa

| Quero mudar…                                   | Arquivo                                   |
| ---------------------------------------------- | ----------------------------------------- |
| Texto, passos, dicas, avisos, explicações      | `src/content/modulos/*.tsx`               |
| Trocar uma imagem                              | `public/img/` (veja abaixo)               |
| Ordem dos módulos no menu                      | `src/content/index.ts`                    |
| Cores, fonte, espaçamentos                     | `src/styles/tokens.css`                   |
| Aparência de uma parte (menu, cartões, topo…)  | `src/styles/` (um arquivo por assunto)    |

## Trocar ou acrescentar uma imagem

1. Coloque o arquivo em `public/img/` (JPG, PNG ou WebP).
2. No passo, aponte para ele pelo nome:

```tsx
captura: {
  arquivo: "02-entrar.jpg",           // nome do arquivo em public/img/
  legenda: "Janela “Entre ou cadastre-se”",
  oQueE: "A porta de entrada do site.",
  paraQueServe: "Confirmar quem você é.",
  comoUsar: (
    <ul>
      <li>Preencha o <strong>CNPJ/CPF</strong> e clique em <Verde>Entrar</Verde>.</li>
    </ul>
  ),
},
```

- **Substituir uma imagem** por outra melhor: salve com o **mesmo nome** em `public/img/`. Nada mais a fazer
  (o tamanho é medido sozinho a cada `npm run dev` / `npm run build`).
- Se o nome do arquivo estiver errado, o `npm run dev` e o `npm run build` avisam: `FALTA a imagem public/img/...`.
- Se a imagem não carregar para o cliente, o guia mostra um aviso no lugar, sem quebrar a página.
- Para aparecer inteira e nítida na ampliação, use imagens com pelo menos ~1200 px de largura.
- **Dados de clientes nas imagens:** desfoque antes de colocar em `public/img/`.

## Editar uma explicação, dica ou aviso

Tudo fica em `src/content/modulos/`, um arquivo por módulo. Cada passo é um bloco assim:

```tsx
{
  id: "carrinho-2",                         // NÃO mude (veja "Regra do id")
  titulo: "Abra o carrinho",
  onde: "Ícone de carrinho no topo",        // opcional: linha com o ícone de localização
  texto: <p>Abre um painel lateral com os produtos.</p>,
  captura: { ... },                         // opcional
  dica: "O carrinho é salvo automaticamente.",   // opcional: caixa azul
  aviso: "Este campo é obrigatório.",            // opcional: caixa amarela
},
```

Dentro dos textos você pode usar estas peças:

| Escreva                                        | Aparece                                  |
| ---------------------------------------------- | ---------------------------------------- |
| `<strong>texto</strong>`                       | negrito                                  |
| `<Verde>Entrar</Verde>`                        | botão verde do site                      |
| `<Escuro>Ainda não sou cliente</Escuro>`       | botão escuro do site                     |
| `<Contorno>Ver carrinho</Contorno>`            | botão com contorno                       |
| `<Etiqueta tipo="ok">NORMAL</Etiqueta>`        | etiqueta de produto (`nc` `ok` `low` `out` `pct`) |
| `<Tecla>Enter</Tecla>`                         | tecla do teclado                         |
| `<Obrigatorio />`                              | asterisco vermelho de campo obrigatório  |
| `<ul><li>…</li></ul>` / `<ol>`                 | lista com marcadores / numerada          |

Se usar uma peça que não foi importada, o editor (ou o `npm run build`) mostra o erro; basta acrescentá-la na linha
`import { … } from "../ui";` do topo do arquivo.

**Como a captura aparece:** a imagem fica no conteúdo principal. Quando há espaço, o bloco "Como usar",
as dicas e os avisos formam um painel à direita; em telas estreitas, tudo fica empilhado. "O que é" e
"Para que serve" ficam recolhidos em um bloco expansível. O código desse layout está em
`src/styles/tela.css` e `src/styles/capturas.css`.

### Navegação e progresso

O guia mostra um passo por vez. A barra horizontal e o menu lateral representam as mesmas 7 etapas e
permitem acesso direto a qualquer conteúdo. Os botões "Anterior" e "Próximo" percorrem os passos da
etapa e seguem para a etapa vizinha. Ao avançar com "Próximo", o passo atual é concluído; navegar sem
avançar não altera o progresso.

O cabeçalho mostra a etapa atual. A barra de progresso mede os passos principais concluídos no caminho
de compra, sem incluir os conteúdos de consulta. Cada etapa fica concluída quando todos os seus passos
principais foram concluídos.

### Caminho de compra × Para consultar

Nem tudo precisa ser lido por quem está chegando. Cada passo pode ser marcado como **consulta**:

```tsx
{
  id: "pedido-6",
  consulta: true,          // ← só para quando surgir a dúvida (cupom, recuperar senha, etiquetas…)
  titulo: "Tem cupom de desconto?",
  ...
}
```

- Os passos **sem** a marca são o caminho de compra e aparecem primeiro.
- Os marcados com `consulta: true` aparecem depois, com um separador próprio no menu. Eles continuam
  acessíveis pelo menu e pelos atalhos ao final do último passo principal da etapa.
- O botão "Próximo" percorre o grupo atual: no fluxo principal, pula os passos de consulta; dentro de
  uma consulta, segue para a próxima consulta da mesma etapa.
- Para um **módulo inteiro** de consulta (como "Área do cliente"), coloque `consulta: true` no módulo.
  Ele vai para o grupo "Para consultar" do menu, no fim, e seus passos são percorridos em ordem.
- A ordem final é automática: essenciais primeiro, consulta depois, cada grupo na ordem em que você escreveu.
- A marca não altera o `id`, então o progresso de quem já usou o guia continua valendo.
- Os textos da faixa e dos grupos estão em `src/content/textos.ts` (`CONSULTA`).

### "O que é" e "Para que serve"

Ficam recolhidos num item "O que é e para que serve" junto de cada captura (um clique abre).
"Como usar" fica sempre à vista. Para mudar o rótulo do item, edite `CONSULTA.detalhes` em `src/content/textos.ts`.

### Acrescentar um passo

Copie um bloco de passo, cole no lugar desejado e dê um **`id` novo e único** (ex.: `"carrinho-frete"`).
Não precisa mexer em mais nada: numeração, menu, barra de progresso e totais se ajustam sozinhos.

### Passo de decisão ("Qual é o seu caso?")

Em vez de `texto`, use `caminhos` (veja o passo `acesso-2` em `01-acesso.tsx`).

### Acrescentar um módulo

1. Copie um arquivo de `src/content/modulos/` e ajuste `id`, `titulo`, `introducao` e `passos`.
2. Importe e inclua na lista de `src/content/index.ts` (a ordem da lista é a ordem do menu).

## Regra do id (importante)

O `id` de cada passo é o que guarda a conclusão de cada cliente no navegador dele.

- **Pode** reordenar, renomear o título, reescrever o texto, trocar a imagem.
- **Não mude** o `id` de um passo que já foi publicado: quem já o concluiu perderia essa marcação.
- Para remover um passo, apague o bloco (as marcações antigas dele são ignoradas).
- O `id` do **módulo** vira o endereço da etapa (`#acesso`). Evite mudar depois de publicado.
- O `id` do **passo** também vira seu endereço (`#acesso-3`), permitindo compartilhar uma tela específica.

## O que o guia lembra no navegador de cada pessoa

- `stoky-guia-v1`: passos concluídos (a mesma chave da versão anterior em HTML).
- `stoky-guia-menu-v1`: quais módulos do menu estavam abertos.
- `stoky-guia-pos-v1`: último passo aberto, usado para retomar o guia quando o endereço não indicar um passo.

## Estrutura do projeto

```
public/img/            imagens (capturas de tela)
src/content/           TUDO que é texto: módulos, textos fixos, peças para usar nos textos
src/components/        telas e peças do guia (menu, passo atual, ampliação…)
src/hooks/             progresso salvo, menu aberto/recolhido e detecção do tamanho da tela
src/styles/            CSS, um arquivo por assunto (tokens.css = cores e medidas)
scripts/               mede as imagens e confere se alguma está faltando
backup-html/           a versão anterior, em HTML puro (só para consulta)
originais/             prints sem desfoque (NÃO publicar)
```

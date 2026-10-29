import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

/**
 * O build gera UM arquivo `dist/index.html` (JS e CSS embutidos) mais as pastas `img/`.
 * Assim o guia continua abrindo com duplo clique, sem servidor, como a versão em HTML puro.
 * `base: "./"` deixa os caminhos relativos: funciona em qualquer pasta ou subendereço.
 */
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
});

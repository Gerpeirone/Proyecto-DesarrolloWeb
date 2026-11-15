import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Convierte una ruta relativa a este archivo en una ruta absoluta.
 * @method resolver
 * @param {string} ruta - Ruta relativa a la carpeta frontend.
 * @return {string} Ruta absoluta en el sistema de archivos.
 */
const resolver = (ruta) => fileURLToPath(new URL(ruta, import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@api": resolver("./src/api"),
      "@components": resolver("./src/components"),
      "@data": resolver("./src/data"),
      "@pages": resolver("./src/pages"),
      "@styles": resolver("./src/styles"),
      "@utils": resolver("./src/utils"),
      "@imagenes": resolver("../imagenes"),
    },
  },
  server: {
    fs: { allow: [".."] },
  },
  build: {
    outDir: "../app",
    emptyOutDir: true,
  },
});

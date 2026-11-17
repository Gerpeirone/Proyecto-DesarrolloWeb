import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  publicDir: "../imagenes",
  resolve: {
    alias: {
      "@api": path.resolve("./src/api"),
      "@components": path.resolve("./src/components"),
      "@data": path.resolve("./src/data"),
      "@pages": path.resolve("./src/pages"),
      "@styles": path.resolve("./src/styles"),
      "@utils": path.resolve("./src/utils"),
    },
  },
  build: {
    outDir: "../app",
    emptyOutDir: true,
  },
});

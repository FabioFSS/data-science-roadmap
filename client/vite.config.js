import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
  },
  server: {
    // Durante o desenvolvimento (`npm run dev`), o Vite roda em uma porta
    // separada do backend. Esse proxy redireciona chamadas /api para o
    // servidor Express, para que o fetch('/api/...') funcione igual em
    // dev e em produção sem precisar mudar nada no código.
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});

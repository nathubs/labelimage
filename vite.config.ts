import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { VarletImportResolver } from "@varlet/import-resolver";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    components({
      resolvers: [VarletImportResolver()],
    }),
    autoImport({
      resolvers: [VarletImportResolver({ autoImport: true })],
    }),
  ],
  base: "/label-image/",
  build:{
    outDir:"./docs",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Ensure imports like "@varlet/ui/es/..." resolve correctly to node_modules
      '@varlet/ui': path.resolve(__dirname, 'node_modules/@varlet/ui'),
    },
  },
  optimizeDeps: {
    // pre-bundle varlet snackbar style so rollup can find it during build
    include: [
      '@varlet/ui/es/snackbar/style/index',
      '@varlet/ui/es/paper/style/index',
      '@varlet/ui/es/button/style/index'
    ],
  },
});

// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { libInjectCss } from "vite-plugin-lib-inject-css"

export default defineConfig({
  plugins: [
    react(),
    // dts({ include: "lib", insertTypesEntry(true) }),
    libInjectCss()
  ],
  build: {
    // do not copy the contents of the public folder to the dist folder
    copyPublicDir: false,
    lib: {
      // this is the file that exports our components
      entry: resolve(__dirname, "src/index.ts"),
      name: "CabricEditor",
      fileName: "cabric-editor",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
})
// vite.config.ts
import { defineConfig } from "file:///app/node_modules/vite/dist/node/index.js";
import react from "file:///app/node_modules/@vitejs/plugin-react/dist/index.js";
import unocss from "file:///app/node_modules/unocss/dist/vite.mjs";
import autoImport from "file:///app/node_modules/unplugin-auto-import/dist/vite.mjs";
import { fileURLToPath } from "node:url";
var __vite_injected_original_import_meta_url = "file:///app/vite.config.ts";
var srcDir = fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url));
var vite_config_default = defineConfig({
  plugins: [
    unocss(),
    react(),
    autoImport({
      imports: ["react"],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/hooks", "src/stores", "src/components/**"]
    })
  ],
  resolve: {
    alias: {
      "~/": `${srcDir}/`
    }
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHVub2NzcyBmcm9tIFwidW5vY3NzL3ZpdGVcIjtcbmltcG9ydCBhdXRvSW1wb3J0IGZyb20gXCJ1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlXCI7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5cbmNvbnN0IHNyY0RpciA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vc3JjXCIsIGltcG9ydC5tZXRhLnVybCkpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdW5vY3NzKCksXG4gICAgcmVhY3QoKSxcbiAgICBhdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcInJlYWN0XCJdLFxuICAgICAgZHRzOiBcInNyYy9hdXRvLWltcG9ydHMuZC50c1wiLFxuICAgICAgZGlyczogW1wic3JjL2hvb2tzXCIsIFwic3JjL3N0b3Jlc1wiLCBcInNyYy9jb21wb25lbnRzLyoqXCJdXG4gICAgfSlcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIn4vXCI6IGAke3NyY0Rpcn0vYFxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgcG9ydDogNTE3MyxcbiAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgIHdhdGNoOiB7XG4gICAgICB1c2VQb2xsaW5nOiB0cnVlXG4gICAgfVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOEwsU0FBUyxvQkFBb0I7QUFDM04sT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLHFCQUFxQjtBQUprRixJQUFNLDJDQUEyQztBQU1qSyxJQUFNLFNBQVMsY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBRTlELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQSxNQUNULFNBQVMsQ0FBQyxPQUFPO0FBQUEsTUFDakIsS0FBSztBQUFBLE1BQ0wsTUFBTSxDQUFDLGFBQWEsY0FBYyxtQkFBbUI7QUFBQSxJQUN2RCxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxHQUFHLE1BQU07QUFBQSxJQUNqQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

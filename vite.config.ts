import { defineConfig, loadEnv } from "vite";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import htmlPlugin from "vite-plugin-index-html";
import pluginExternal from "vite-plugin-external";
import pkgJson from "./package.json";
// import { visualizer } from "rollup-plugin-visualizer";

const version = pkgJson.version;
const appName = pkgJson.name.split("/").pop();
const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const isDev = mode === "development";
  const env = loadEnv(mode, __dirname);
  const PORT = Number(env.VITE_APP_PORT) || 5173;
  const isCdn = Boolean(process.env.CDN_DOMAIN);
  const outDir = isCdn ? `dist/${appName}/${version}` : "dist";
  const base = isCdn ? `${process.env.CDN_DOMAIN}${outDir}/` : "/";

  return {
    base,
    envDir: __dirname,
    define: {
      APP_NAME: JSON.stringify(appName),
      VITE_LOWCODE_PORT: JSON.stringify(env.VITE_LOWCODE_PORT),
      VERSION: JSON.stringify(version),
      PUBLISH_DATE: JSON.stringify(
        new Date()
          .toLocaleString("sv-SE", { timeZone: "Asia/Shanghai" })
          .replace(" ", "T") + "+0800",
      ),
    },
    plugins: [
      react(),
      htmlPlugin({
        input: "src/main.tsx",
        preserveEntrySignatures: "exports-only",
      }),
      pluginExternal({
        externals: {
          react: "React",
          "react-dom": "ReactDOM",
          antd: "antd",
          dayjs: "dayjs",
        },
      }),
      // visualizer({
      //   filename: "dist/stats.html",
      //   open: true,
      //   gzipSize: true,
      //   brotliSize: true,
      // }),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: isDev
      ? {
          port: PORT,
          open: `https://dev.yuntooai.com:${PORT}`,
          strictPort: true,
          host: "dev.yuntooai.com",
          https: await (
            await fetch("https://g.yuntooai.com/cert/dev.json")
          ).json(),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
              "X-Requested-With, Content-Type, Authorization",
          },
        }
      : undefined,
    build: {
      outDir,
      target: "esnext",
      rollupOptions: {
        output: {
          format: "es",
          entryFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].css`,
        },
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom", "antd", "dayjs"],
    },
    // build: {
    //   target: "esnext",
    //   outDir: "dist",
    //   sourcemap: true,
    //   lib: {
    //     entry: "./src/main.tsx",
    //     formats: ["es"],
    //     fileName: "index",
    //   },
    //   rollupOptions: {
    //     preserveEntrySignatures: "exports-only",
    //     output: {
    //       // manualChunks: {
    //       //   router: ["react-router"],
    //       //   icons: ["@ant-design/icons"],
    //       // },
    //       // chunkFileNames: `assets/[name].js`,
    //       entryFileNames: `assets/[name].js`,
    //       assetFileNames: `assets/[name].css`,
    //     },
    //   },
    // },
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
  };
});

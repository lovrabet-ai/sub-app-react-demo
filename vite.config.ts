import { defineConfig, loadEnv } from "vite";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import htmlPlugin from "vite-plugin-index-html";
import pluginExternal from "vite-plugin-external";
import Pages from "vite-plugin-pages";
import pkgJson from "./package.json";

const version = pkgJson.version;
const appName = pkgJson.name.split("/").pop();
const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, __dirname);
  const PORT = Number(env.VITE_APP_PORT) || 5173;
  const isCdn = Boolean(process.env.CDN_DOMAIN);
  const outDir = isCdn ? `dist/${appName}/${version}` : "dist";
  const base = isCdn ? `${process.env.CDN_DOMAIN}${outDir}/` : "/";

  return {
    base,
    envDir: __dirname,
    plugins: [
      react(),
      Pages({
        dirs: "src/pages",
        extensions: ["tsx"],
        routeStyle: "remix", // 使用 remix 风格，更好兼容 React Router v6
        importMode: "sync", // 使用同步导入避免 Suspense 问题
      }),
      htmlPlugin({
        input: "/src/main.tsx", // 使用绝对路径避免嵌套路由问题
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
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    // 可选配置：提供https自签名证书及跨域访问能力
    // 因为接口域名为 runtime.lovrabet.com 存在跨域，服务端配置了允许 dev.lovrabet.com 的跨域请求，从而实现本地开发能够正常请求接口
    // 这些配置不是必须的，你也可以使用 proxy 等任意手段自行处理跨域问题
    server: {
      port: PORT,
      open: `https://dev.lovrabet.com:${PORT}`,
      strictPort: true,
      host: "dev.lovrabet.com",
      https: await (await fetch("https://g.yuntooai.com/cert/lovrabet-dev.json")).json(),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, Content-Type, Authorization",
      },
    },
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
  };
});

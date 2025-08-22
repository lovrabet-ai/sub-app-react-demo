import React from "react";
import { createRoot } from "react-dom/client";
import { isInIcestark } from "@ice/stark-app";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import App from "./router";
import "./style.css";

// 可选：根据 isInIcestark() 判断当前的运行环境，可同时兼容独立使用和嵌入使用
if (!isInIcestark()) {
  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>,
    );
  }
}

// 关键：暴露 mount 供主应用加载时调用
export function mount({
  container,
  customProps,
}: {
  container: HTMLElement;
  customProps: object;
}) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <ConfigProvider locale={zhCN}>
        <App {...customProps} />
      </ConfigProvider>
    </React.StrictMode>,
  );
  return root;
}

// 关键：暴露 unmount 供主应用卸载时调用
export function unmount({ container }: { container: HTMLElement }) {
  // React 18 中不再需要手动卸载，但为了兼容性保留
  const root = (container as any)._reactRoot;
  if (root) {
    root.unmount();
  }
}

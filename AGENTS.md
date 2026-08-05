# Lovrabet React 子应用开发规范

本仓库既是可直接运行的 Demo，也是 `rabetbase project create` 的模板真源。以下规则同样适用于由模板创建的业务项目。

## 页面工程

- 使用 React 18 函数组件、Hooks、TypeScript、Ant Design 5 和 React Router 6。
- 页面放在 `src/pages/`，沿用 `vite-plugin-pages` 文件路由；共享组件放在 `src/components/`。
- 页面必须处理 loading、empty 和 error；避免循环单条查询及旧请求覆盖新请求。

## 数据接入

- Lovrabet 数据统一从 `src/api/client.ts` 导出的 `lovrabetClient` 调用，不在页面中重复创建客户端或散落裸 `fetch`。
- 直接克隆本仓时可使用内置 Demo 配置；CLI 创建或绑定真实应用后，`src/api/api.ts` 由 `rabetbase api pull` 生成，不手工猜测 AppCode、Dataset 和 alias。
- 调用前先核对 Dataset 的 `source`、字段和 operations，优先使用实际开放的 Instant API；复杂能力按 `rabetbase` Skill 的数据 API 指南选择 Custom SQL 或 BFF。
- 页面原始行导出使用 WebAPI `excelExport`；Agent 调用 `lovrabet` CLI 时由 Agent 处理结构化结果导出，两者不得混写。

## 微前端不变量

- 保留 `src/main.tsx` 的独立渲染以及 `mount` / `unmount` 生命周期。
- 保留 `src/router/index.tsx` 的 `getBasename()` 适配。
- 保留 `vite.config.ts` 的 ES module、external、CDN 目录和 iStark 接入约定。
- 修改完成至少执行 `npm run build`，并检查独立运行和主应用嵌入场景。

# Rabetbase React 子应用快速开始

本文面向通过 `rabetbase project create` 初始化出来的 React 微前端项目，也适用于直接克隆本模板源码进行本地调试。

目标是在 20 分钟内完成：

1. 启动本地开发环境；
2. 确认当前模板内置页面；
3. 拉取 Lovrabet SDK 模型配置；
4. 构建产物并接入 Lovrabet 主应用；
5. 理解如何继续二次开发。

## 1. 环境准备

请先确认本机具备：

- Node.js 20+
- `rabetbase` CLI
- 需要访问真实数据时，已完成 `rabetbase auth login`

```bash
npm install -g @lovrabet/rabetbase-cli
rabetbase --help
```

如果需要拉取 API 配置：

```bash
rabetbase auth login
```

## 2. 创建或打开项目

### 方式 A：通过 CLI 创建新项目

```bash
rabetbase project create my-sub-app --appcode app-xxxx
cd my-sub-app
```

说明：

- `--appcode` 可省略；省略后在创建好的项目目录内执行 `rabetbase config set appcode app-xxxx`。
- 有 AppCode 时，CLI 会尝试自动拉取 `src/api/api.ts`。
- 如果自动拉取失败，后续手动执行 `rabetbase api pull` 即可。

### 方式 B：直接调试模板源码

```bash
cd sub-app-react-demo
npm install
```

## 3. 本地启动

```bash
rabetbase run start
```

默认访问地址：

```text
https://dev.lovrabet.com:5173
```

如需切换端口：

```bash
PORT=3000 rabetbase run start
```

当前模板内置页面如下：

| 页面     | 路由           | 说明                                                 |
| -------- | -------------- | ---------------------------------------------------- |
| 首页     | `/`            | Prompt 开发入口、项目状态、Agent 场景示例和 MCP 配置 |
| SDK 演示 | `/sdk-demo`    | 展示模型列表、查询、新增、更新、删除等 SDK 调用方式  |
| 工作台   | `/workbench`   | 常见工作台页面示例                                   |
| 数据看板 | `/dashboard`   | 指标和图表展示示例                                   |
| 数据大屏 | `/data-screen` | 全屏数据展示示例                                     |

> 旧文档中提到的 `/hello-world`、`/chart-fetch`、`/intro` 已不是当前模板页面。请以 `src/pages` 目录为准。

日常开发时，推荐在 Claude Code、Cursor、Codex 等 Agent 环境中直接描述目标，例如：

```text
请基于当前 Lovrabet 数据模型新增一个客户跟进工作台页面。
页面需要包含筛选区、列表、详情抽屉和新增表单。
数据读写请使用项目里的 @lovrabet/sdk 客户端。
```

Agent 会根据项目中的 `rabetbase` 能力完成模型同步、页面开发、构建检查和主应用接入建议。

## 4. 拉取 SDK 模型配置

如果项目是通过 `rabetbase project create` 创建的，且 `src/api/api.ts` 还不是你的应用配置，执行：

```bash
rabetbase config set appcode app-xxxx
rabetbase api pull
```

如果你是直接克隆模板源码，且当前目录还没有 `.rabetbase.json`，执行：

```bash
rabetbase project init --appcode app-xxxx
rabetbase api pull
```

拉取后重点检查：

- `src/api/api.ts` 中的 AppCode 是否正确；
- `models` 是否包含你需要的数据模型；
- 每个模型的 `alias` 是否符合代码中的调用方式。

业务页面中统一从 `src/api/client.ts` 引入客户端：

```typescript
import { lovrabetClient } from "@/api/client";

const models = lovrabetClient.getModelList();

const result = await lovrabetClient.models.requirements.filter({
  currentPage: 1,
  pageSize: 20,
});
```

实际模型名以 `src/api/api.ts` 生成结果为准。

## 5. 新增页面

模板使用 `vite-plugin-pages`，无需手写路由表。

```text
src/pages/customer/index.tsx  ->  /customer
src/pages/customer/[id].tsx   ->  /customer/:id
src/pages/report/month.tsx    ->  /report/month
```

新增页面后：

1. 本地访问对应路由确认渲染正常；
2. 如果独立运行时需要左侧菜单入口，修改 `src/layouts/MainLayout.tsx`；
3. 如果要在 Lovrabet 主应用中挂菜单，发布后在页面配置里使用同一个路由路径。

## 6. 构建产物

```bash
rabetbase run build
```

默认产物：

```text
dist/assets/main.js
dist/assets/main.css
```

如果你希望产物带版本目录并自动生成 CDN base：

```bash
CDN_DOMAIN=https://your-cdn.com/ rabetbase run build
```

构建后检查：

- `dist/` 目录已生成；
- `main.js` 是 ES module 产物；
- `main.css` 可被外部访问；
- CDN 上的 JS/CSS URL 可以在浏览器中直接打开。

## 7. 接入 Lovrabet 主应用

在 Lovrabet 应用的页面配置中新增页面，示例：

```text
页面名称：SDK Demo
路由路径：/sdk-demo
微应用唯一标识：sub-app-react-demo
资源加载方式：import
资源加载列表：
  https://your-cdn.com/path/to/assets/main.js
  https://your-cdn.com/path/to/assets/main.css
```

配置规则：

- `路由路径` 必须和 `src/pages` 生成的路由一致。
- Vite 项目必须选择 `import` 加载方式。
- 同一份构建产物可以挂多个页面，例如 `/sdk-demo`、`/dashboard`、`/data-screen`。
- 多个页面属于同一个微前端时，建议使用同一个微应用唯一标识。

验证方式：

1. 主应用菜单能看到新页面；
2. 点击菜单后页面正常渲染；
3. 浏览器控制台没有资源加载或跨域错误；
4. SDK 页面能正常读取当前登录态有权限的数据。

## 8. 改造已有 React 项目

如果你不是从模板开始，而是要改造已有 React + Vite 项目，最少需要补齐：

1. `@ice/stark-app` 依赖；
2. `src/main.tsx` 中的 `mount` / `unmount` 导出；
3. `src/router/index.tsx` 中的 `getBasename()`；
4. Vite 构建产物使用 ES module；
5. Lovrabet 页面配置中使用 `import` 加载方式；
6. 需要调用平台数据时，引入 `@lovrabet/sdk` 并生成 `src/api/api.ts`。

建议直接对照本模板的 `src/main.tsx`、`src/router/index.tsx`、`vite.config.ts` 修改，而不是从旧的 Hello World 示例复制代码。

## 常见问题

### 本地打不开 `https://dev.lovrabet.com:5173`

先确认命令是否正常运行；如果端口冲突，换端口启动：

```bash
PORT=3000 rabetbase run start
```

### SDK 页面没有模型

执行：

```bash
rabetbase api pull
```

然后检查 `src/api/api.ts` 是否生成了当前应用的模型配置。

### 主应用里页面空白

优先检查：

- 页面资源是否选择 `import`；
- JS/CSS URL 是否可访问；
- 路由路径是否和 `src/pages` 生成路径一致；
- CDN 是否返回了正确的 `Content-Type`。

### 本地独立运行有侧边栏，嵌入主应用后没有侧边栏

这是预期行为。`MainLayout` 会在 icestark 环境下只渲染页面内容，由 Lovrabet 主应用提供外层导航。

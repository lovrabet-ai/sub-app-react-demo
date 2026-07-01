[项目更新记录](./CHANGELOG.md)

# Rabetbase React 微前端模板

这是 `rabetbase project create` 使用的 React 项目模板，用于演示如何把一个 React 18 + Vite 应用接入 Lovrabet 主应用，并通过 `@lovrabet/sdk` 调用平台数据模型。

这个模板的日常使用方式不是让开发者记住一组命令，而是在 Claude Code、Cursor、Codex 等 Agent 环境里直接描述开发目标。`rabetbase` 提供项目配置、模型同步、构建检查、菜单接入等能力，Agent 根据你的 Prompt 调用这些能力完成开发任务。

这个模板适合以下场景：

- 本地独立开发一个 Lovrabet 子应用；
- 构建后以 icestark 微前端方式嵌入 Lovrabet 主应用；
- 让 Agent 基于 `rabetbase` 能力刷新 SDK 模型配置；
- 基于已有页面案例，用 Prompt 继续二次开发。

## 在线文库

README 只说明模板本地运行方式。完整的 Agent 开发流程、Prompt 示例、SDK 使用方式和发布路径，以飞书文库为准。

- [Rabetbase CLI 文库首页](https://qizhiyuntu.feishu.cn/wiki/EaApwb1Wpi2j0ykAkhNcya0ZnEh)
- [入门与上手](https://qizhiyuntu.feishu.cn/wiki/T5gJwrcQqixLCikNYO2caZYDnsc)
- [核心研发能力](https://qizhiyuntu.feishu.cn/wiki/S71hw5c2HiwyoHkLgyecKrI8n3M)
- [系统页面开发：用 SDK 完成业务页面](https://qizhiyuntu.feishu.cn/wiki/XCdWwnN7ViYOc0knRu8c411uneh)
- [TypeScript SDK 文档](https://qizhiyuntu.feishu.cn/wiki/B1PLw34AwiDtNmkCAlCcO3T2ngh)

## 技术栈

- `@lovrabet/sdk`：Lovrabet TypeScript SDK 与模型客户端。
- React 18 + TypeScript：页面开发与类型约束。
- React Router v6：页面路由。
- Ant Design v5：企业级 UI 组件。
- Vite v7：本地开发与生产构建。
- `@ice/stark-app`：icestark 微前端运行环境识别与 basename 适配。
- `vite-plugin-pages`：基于 `src/pages` 的文件系统路由。
- ECharts：图表和数据大屏示例。

## 目录结构

```text
.
├── src/
│   ├── api/
│   │   ├── api.ts        # CLI 生成的 SDK 模型配置
│   │   └── client.ts     # 统一导出的 Lovrabet SDK 客户端
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── pages/
│   │   ├── index.tsx
│   │   ├── sdk-demo/index.tsx
│   │   ├── workbench/index.tsx
│   │   ├── dashboard/index.tsx
│   │   └── data-screen/index.tsx
│   ├── router/index.tsx
│   ├── utils/api.ts
│   ├── main.tsx
│   └── style.css
├── docs/
│   ├── quick-start.md
│   └── API_RULE_CHANGE.md
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 内置页面

项目使用 `vite-plugin-pages`，路由由 `src/pages` 下的文件自动生成。

| 文件                              | 路由           | 用途                                       |
| --------------------------------- | -------------- | ------------------------------------------ |
| `src/pages/index.tsx`             | `/`            | Prompt 开发入口、项目状态和 Agent 场景示例 |
| `src/pages/sdk-demo/index.tsx`    | `/sdk-demo`    | `@lovrabet/sdk` 模型列表和数据操作示例     |
| `src/pages/workbench/index.tsx`   | `/workbench`   | 工作台类业务页面示例                       |
| `src/pages/dashboard/index.tsx`   | `/dashboard`   | 数据看板示例                               |
| `src/pages/data-screen/index.tsx` | `/data-screen` | 数据大屏示例                               |

新增页面时，在 `src/pages` 下添加 `.tsx` 文件即可。例如 `src/pages/customer/index.tsx` 会生成 `/customer` 路由。

## 快速开始

### 环境要求

- Node.js 20+
- 已安装 `rabetbase` CLI；需要拉取真实 API 配置时还需要完成登录

```bash
npm install -g @lovrabet/rabetbase-cli
rabetbase --help
```

模板本身不内置 `rabetbase` 依赖，`rabetbase run start` 等命令依赖全局 CLI。

### 通过模板创建项目

把 `YOUR_APP_CODE` 替换为当前应用的 AppCode。

```bash
rabetbase project create my-sub-app --appcode YOUR_APP_CODE
cd my-sub-app
rabetbase run start
```

如果是直接克隆本仓库调试模板源码，需要先安装依赖：

```bash
npm install
rabetbase run start
```

本地服务默认打开：

```text
https://dev.lovrabet.com:5173
```

需要换端口时可执行 `PORT=3000 rabetbase run start`。

### 拉取 SDK 配置

`project create` 传入 AppCode 时，CLI 会尝试自动生成 `src/api/api.ts`。如果创建时没有传 AppCode，需要先在项目内补充 AppCode，再拉取 API 配置：

```bash
rabetbase config set appcode YOUR_APP_CODE
rabetbase api pull
```

如果你是直接克隆模板源码，且当前目录还没有 `.rabetbase.json`，先执行：

```bash
rabetbase project init --appcode YOUR_APP_CODE
rabetbase api pull
```

项目统一从 `src/api/client.ts` 导出 SDK 客户端：

```typescript
import { lovrabetClient } from "@/api/client";

const models = lovrabetClient.getModelList();
const data = await lovrabetClient.models.requirements.filter({
  currentPage: 1,
  pageSize: 20,
});
```

模型别名来自生成后的 `src/api/api.ts`，实际使用前请以该文件为准。

## 开发说明

### 本地脚本

仓库脚本统一通过 CLI 运行：

```bash
rabetbase run start
rabetbase run build
rabetbase run preview
```

底层脚本定义在 `package.json`，目前对应 Vite 的 `start`、`build`、`preview`。

### 微前端入口

`src/main.tsx` 同时支持独立运行和嵌入运行：

- 独立运行时，`isInIcestark()` 为 false，应用渲染到 `#root`；
- 被 Lovrabet 主应用加载时，导出 `mount` / `unmount` 生命周期；
- React root 会缓存到容器上，避免重复创建 root。

`src/router/index.tsx` 会读取 icestark 的 `getBasename()`，因此同一份构建产物可以适配 Lovrabet 页面配置中的 basename。

### 构建产物

```bash
rabetbase run build
```

默认产物：

```text
dist/assets/main.js
dist/assets/main.css
```

需要版本化 CDN 路径时：

```bash
CDN_DOMAIN=https://your-cdn.com/ rabetbase run build
```

构建目录会变成 `dist/<package-name>/<version>/`，Vite `base` 也会指向对应 CDN 地址。

## 接入 Lovrabet 主应用

构建产物上传到 CDN 或静态资源服务器后，在 Lovrabet 应用中配置页面：

```text
页面名称：SDK Demo
路由路径：/sdk-demo
微应用唯一标识：sub-app-react-demo
资源加载方式：import
资源加载列表：
  https://your-cdn.com/path/to/assets/main.js
  https://your-cdn.com/path/to/assets/main.css
```

注意事项：

- 路由路径必须和 `src/pages` 生成的路由一致。
- Vite 构建产物必须选择 `import` 加载方式。
- 同一个微前端的多个 Lovrabet 页面可以复用同一组 JS/CSS 资源。
- 如果页面内部还有子路由，保留 `getBasename()` 适配逻辑。

## 常见任务

### 新增页面

```text
src/pages/customer/index.tsx  ->  /customer
src/pages/customer/[id].tsx   ->  /customer/:id
```

如果独立运行时也要在左侧菜单展示该页面，需要同步修改 `src/layouts/MainLayout.tsx`。

### 调用 Lovrabet 数据

优先使用 `src/api/client.ts` 导出的 SDK 客户端。只有 SDK 未覆盖的自定义运行态请求，才使用 `src/utils/api.ts` 自行封装。

### 嵌入时隐藏本地布局

`MainLayout` 已经在 icestark 环境下只返回 `<Outlet />`，因此嵌入 Lovrabet 主应用后不会重复显示本地侧边栏和顶部栏。

## 常见问题

1. 端口被占用：执行 `PORT=3000 rabetbase run start`。
2. HTTPS 证书获取失败：检查是否能访问 `https://g.yuntooai.com/cert/lovrabet-dev.json`。
3. 路由不生效：确认页面位于 `src/pages` 下，并使用 `.tsx` 后缀。
4. SDK 调用失败：执行 `rabetbase api pull`，并检查 `src/api/api.ts` 是否包含正确 AppCode 和模型别名。
5. 嵌入后页面空白：确认 Lovrabet 页面使用 `import` 加载，并指向构建后的 `main.js` 与 `main.css`。

## 更多文档

- [Rabetbase CLI 文库首页](https://qizhiyuntu.feishu.cn/wiki/EaApwb1Wpi2j0ykAkhNcya0ZnEh)
- [系统页面开发：用 SDK 完成业务页面](https://qizhiyuntu.feishu.cn/wiki/XCdWwnN7ViYOc0knRu8c411uneh)
- [TypeScript SDK 文档](https://qizhiyuntu.feishu.cn/wiki/B1PLw34AwiDtNmkCAlCcO3T2ngh)
- [快速开始](./docs/quick-start.md)
- [API 规则变更说明](./docs/API_RULE_CHANGE.md)
- [更新记录](./CHANGELOG.md)

[📝 项目更新记录 CHANGELOG](./CHANGELOG.md)

> ⚠️ **注意**：本项目会阶段性更新，如果 `git pull` 以后无法运行，可以删除 `node_modules` 之后重新 `npm install`

# Lovrabet SDK React 演示项目

这是一个完整的 React 微前端演示项目，展示了如何在现代 React 应用中集成 Lovrabet SDK，以及如何使用 icestark 微前端方案嵌入到 Lovrabet 主应用中。

## 技术栈

- **@lovrabet/sdk** - Lovrabet 官方 SDK，支持现代化客户端实例管理
- **React 18** - 稳定的 React 版本，支持并发特性
- **TypeScript** - 类型安全的 JavaScript 超集
- **React Router v6** - 现代化的路由解决方案
- **Ant Design v5** - 企业级 UI 设计语言
- **Vite v7** - 下一代前端构建工具
- **@ice/stark-app** - 阿里飞冰微前端框架
- **ECharts** - 数据可视化图表库
- **vite-plugin-pages** - 基于文件系统的约定式路由

## 项目结构

```
├── src/
│   ├── api/            # SDK 配置和客户端
│   │   ├── api.ts      # CLI 生成的 SDK 配置文件
│   │   └── client.ts   # SDK 客户端实例
│   ├── layouts/        # 布局组件
│   │   └── MainLayout.tsx  # 主布局（包含侧边栏、头部、面包屑等）
│   ├── pages/          # 页面组件（基于文件系统自动路由）
│   │   ├── index.tsx           # 首页 - 项目概述和二开说明（/ 路由）
│   │   ├── intro/              # 介绍页面
│   │   │   └── index.tsx       # 介绍页（/intro 路由）
│   │   ├── sdk-demo/           # SDK 演示页面
│   │   │   └── index.tsx       # SDK 调用演示（/sdk-demo 路由）
│   │   ├── workbench/          # 工作台页面
│   │   │   └── index.tsx       # 工作台（/workbench 路由）
│   │   ├── dashboard/          # 数据看板页面
│   │   │   └── index.tsx       # 数据看板（/dashboard 路由）
│   │   └── data-screen/        # 数据大屏页面
│   │       └── index.tsx       # 数据大屏（/data-screen 路由）
│   ├── router/         # 路由配置（自动生成）
│   │   └── index.tsx   # 路由配置，使用 vite-plugin-pages 自动生成
│   ├── utils/          # 工具函数
│   │   └── api.ts      # API 请求封装
│   ├── main.tsx        # 微前端应用入口（导出 mount/unmount）
│   ├── style.css       # 全局样式
│   └── vite-env.d.ts   # Vite 类型定义
├── docs/               # 项目文档
│   ├── quick-start.md      # 快速开始指南
│   └── API_RULE_CHANGE.md  # API 变更指南
├── vite.config.ts      # Vite 配置文件（含微前端配置）
├── tsconfig.json       # TypeScript 配置
├── CHANGELOG.md        # 更新记录
└── package.json        # 项目依赖
```

## 功能特性

### 核心功能

- 🎯 **SDK 调用演示** - 展示 @lovrabet/sdk 的核心 CRUD 操作方法，支持动态选择数据模型
- 🏠 **项目概述页** - 清晰介绍项目目的、功能和技术栈，包含完整的二开说明
- 💼 **工作台** - 展示工作台页面示例，包含统计卡片、任务列表、进度跟踪等
- 📊 **数据看板** - 数据可视化看板，展示各类业务指标和图表
- 📈 **数据大屏** - 大屏数据展示页面，适合数据大屏场景
- 📖 **介绍页** - 项目介绍和说明页面

### 技术特性

- 🚀 **自动路由生成** - 基于 `vite-plugin-pages` 的文件系统约定式路由，零配置开发
- 🔌 **微前端支持** - 通过 `@ice/stark-app` 实现与主应用的无缝集成
- 📱 **响应式设计** - 支持桌面端和移动端，自适应布局
- 🎨 **现代化 UI** - 基于 Ant Design v5 的美观界面，包含完整的布局系统
- ⚡ **极速构建** - Vite v7 + ES Modules，开发体验极佳
- 🔒 **HTTPS 开发环境** - 开发环境自动配置 HTTPS，解决跨域问题
- 📦 **外部依赖优化** - React、Ant Design 等通过 CDN 加载，减小包体积
- 🌐 **CDN 部署支持** - 支持版本化 CDN 部署，便于多版本管理

## 快速开始

### 环境前置

执行 `rabetbase run` 相关命令前，请先确保本机已安装 Node.js 20+ 与 `rabetbase` CLI。

> 说明：本项目 `package.json` 不内置 `rabetbase` 依赖，README 中的 `rabetbase run` 为全局 CLI 调用。

```bash
npm install -g @lovrabet/rabetbase-cli
# 或
bun install -g @lovrabet/rabetbase-cli

rabetbase --help
```

### 安装依赖

```bash
npm install
```

研发态本地脚本统一通过 `rabetbase run` 执行。

### 开发模式

```bash
rabetbase run start
```

应用将在 `https://dev.lovrabet.com:5173` 启动（配置了HTTPS证书）

> 💡 **说明**：`https://dev.lovrabet.com:${port}` 中 port 不限于 5173 端口，任意端口号都支持跨域。可以通过环境变量 `PORT` 自定义端口号。

### 微前端核心配置

项目包含完整的微前端配置 (`vite.config.ts`)：

- **icestark 集成**: 通过 `vite-plugin-index-html` 实现微前端打包
- **外部依赖**: React、ReactDOM、Ant Design、dayjs 通过 CDN 加载，减小包体积
- **ES Modules 输出**: 支持主应用动态加载，Tree Shaking 友好
- **HTTPS 支持**: 开发环境自动获取 HTTPS 证书，解决跨域问题
- **路径别名**: `@` 指向 `src` 目录
- **约定式路由**: 使用 `vite-plugin-pages` 实现基于文件系统的自动路由生成
- **CDN 部署**: 支持版本化 CDN 部署（通过 `CDN_DOMAIN` 环境变量配置）

### 构建生产版本

```bash
rabetbase run build
```

### 预览生产版本

```bash
rabetbase run preview
```

## 开发指南

### SDK 集成使用

项目展示了如何正确集成和使用 @lovrabet/sdk：

1. **SDK 配置文件** (`src/api/api.ts`)：
   - 通过 Rabetbase CLI 自动生成
   - 包含应用代码和模型配置
   - 自动注册到 SDK 的配置管理器

2. **客户端实例** (`src/api/client.ts`)：
   - 导入配置文件执行注册
   - 使用 `createClient()` 创建客户端实例
   - 导出供整个应用使用

3. **SDK 调用示例** (`src/pages/sdk-demo/index.tsx`)：
   - 动态获取可用的数据模型列表
   - 展示 `filter()` 查询数据（支持分页、排序、筛选）
   - 展示 `getOne()` 获取单条记录
   - 展示 `create()` 创建新数据
   - 展示 `update()` 更新数据
   - 展示 `delete()` 删除数据
   - 包含完整的错误处理和加载状态

**典型使用模式**：

```typescript
import { lovrabetClient } from "@/api/client";

// 获取可用的数据模型列表
const models = lovrabetClient.getModelList();

// 使用 filter 查询数据（推荐）
const data = await lovrabetClient.models.Requirements.filter({
  currentPage: 1,
  pageSize: 20,
  orderBy: "createdAt",
  orderDirection: "desc",
});

// 获取单条记录
const item = await lovrabetClient.models.Requirements.getOne("record-id");

// 创建新数据
const newItem = await lovrabetClient.models.Requirements.create({
  title: "需求标题",
  description: "需求描述",
});

// 更新数据
await lovrabetClient.models.Requirements.update("record-id", {
  title: "更新后的标题",
});

// 删除数据
await lovrabetClient.models.Requirements.delete("record-id");
```

### 微前端集成要点

1. **入口文件配置** (`src/main.tsx`)：
   - 导出 `mount` 和 `unmount` 生命周期函数
   - 使用 `isInIcestark()` 判断运行环境
   - 支持接收主应用传递的 `customProps`

2. **自动路由配置** (`src/router/index.tsx`)：
   - 使用 `vite-plugin-pages` 实现基于文件系统的约定式路由
   - 使用 `getBasename()` 获取动态 basename
   - 支持微应用内部路由跳转和嵌套路由

3. **构建配置** (`vite.config.ts`)：
   - 使用 `vite-plugin-pages` 实现自动路由生成
   - 使用 `vite-plugin-index-html` 插件支持微前端打包
   - 配置 ES modules 输出格式，支持 Tree Shaking
   - 外部化公共依赖减小包体积，CDN 友好
   - HTTPS 开发环境，解决跨域问题

### 约定式路由使用指南

基于 `vite-plugin-pages` 的文件系统路由，支持以下约定：

**当前路由映射**：

- `src/pages/index.tsx` → `/` （首页 - 项目概述和二开说明）
- `src/pages/intro/index.tsx` → `/intro` （介绍页）
- `src/pages/sdk-demo/index.tsx` → `/sdk-demo` （SDK 调用演示）
- `src/pages/workbench/index.tsx` → `/workbench` （工作台）
- `src/pages/dashboard/index.tsx` → `/dashboard` （数据看板）
- `src/pages/data-screen/index.tsx` → `/data-screen` （数据大屏）

**路由规则**：

- 文件路由：`src/pages/about.tsx` → `/about`
- 目录路由：`src/pages/user/index.tsx` → `/user`
- 嵌套路由：`src/pages/user/profile.tsx` → `/user/profile`
- 动态路由：`src/pages/user/[id].tsx` → `/user/:id`
- 索引路由：`src/pages/index.tsx` → `/`（根路径）

**布局系统**：

- 所有页面都包裹在 `MainLayout` 中（在 `src/router/index.tsx` 中配置）
- 在微前端环境中，`MainLayout` 会自动隐藏，只渲染页面内容
- 独立运行时，显示完整的布局（侧边栏、头部、面包屑等）

**新增页面**：
只需在 `src/pages/` 目录下创建 `.tsx` 文件或目录，路由会自动生成，无需手动配置。

### 样式规范

- 优先使用 Ant Design 组件
- 自定义样式使用 CSS 或 styled-components
- 响应式设计支持移动端

## 部署

### 构建生产版本

```bash
rabetbase run build
```

构建产物会输出到 `dist/` 目录（或根据 `CDN_DOMAIN` 环境变量输出到版本化目录）。

### CDN 部署

项目支持两种部署方式：

#### 方式一：标准部署

```bash
rabetbase run build
# 将 dist/ 目录内容上传到您的 CDN
```

#### 方式二：版本化 CDN 部署

```bash
CDN_DOMAIN=https://your-cdn.com rabetbase run build
# 构建产物会输出到 dist/sub-app-react-demo/1.0.0/
# 便于多版本管理和回滚
```

### 部署平台

项目使用 Vite 构建，可以部署到任何静态文件服务器：

- **CDN 服务**：阿里云 OSS、腾讯云 COS、AWS S3 等
- **静态托管**：Vercel、Netlify、GitHub Pages
- **自建服务器**：Nginx、Apache 等

### 主应用集成

构建完成后，需要在 Lovrabet 主应用中配置页面：

1. 访问页面配置：`https://app.lovrabet.com/app/{appCode}/pages/`
2. 配置路由路径（必须与代码中的路由一致）
3. 选择资源加载方式：`import`（Vite 项目必须选择此方式）
4. 配置资源加载列表：
   - `https://your-cdn.com/path/to/assets/main.js`
   - `https://your-cdn.com/path/to/assets/main.css`

详细步骤请参考 [快速开始指南](./docs/quick-start.md)。

## 开发注意事项

### 环境要求

- Node.js >= 16
- npm >= 7 或 yarn >= 1.22 或 pnpm >= 7

### 常见问题

1. **端口被占用**：修改 `.env` 文件中的 `PORT` 环境变量，或使用 `PORT=3000 rabetbase run start`
2. **HTTPS 证书获取失败**：检查网络连接，确保能访问 `https://g.yuntooai.com/cert/lovrabet-dev.json`
3. **路由不生效**：确保页面文件在 `src/pages/` 目录下，且文件扩展名为 `.tsx`
4. **SDK 调用失败**：检查 `src/api/api.ts` 是否正确配置，确保已通过 Rabetbase CLI 生成

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 组件使用函数式组件 + Hooks
- 优先使用 Ant Design 组件

## 文档链接

- [快速开始指南](./docs/quick-start.md) - 详细的接入和开发指南
- [API 变更指南](./docs/API_RULE_CHANGE.md) - API 地址规则变更说明
- [更新记录](./CHANGELOG.md) - 项目更新历史

## 相关资源

- [Lovrabet 开放平台](https://open.lovrabet.com)
- [CLI 前端脚手架文档](https://open.lovrabet.com/docs/lovrabet-cli/)
- [TypeScript SDK 文档](https://open.lovrabet.com/docs/category/lovrabet-node-sdk)
- [OpenAPI 文档](https://open.lovrabet.com/docs/category/openapi)

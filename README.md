[📝 项目更新记录 CHANGELOG](./CHANGELOG.md)

注意：本项目会阶段性更新，如果git pull以后无法运行，可以删除 node_modules之后重新 npm install

# Vite React 微前端子应用

这是一个使用 Vite 构建的 React 微前端子应用示例。

演示如何使用 icestark 微前端方案进行最小化改造，使其能够嵌入 Lovrabet 生产的应用中混合使用。

## 技术栈

- **React 18** - 稳定的 React 版本，支持并发特性
- **React Router v7** - 现代化的路由解决方案
- **Ant Design v5** - 企业级 UI 设计语言
- **Vite v7** - 下一代前端构建工具
- **icestark** - 阿里飞冰微前端框架
- **ECharts** - 数据可视化图表库

## 项目结构

```
├── src/
│   ├── components/     # 通用组件
│   │   └── ApiUrlDisplay.tsx
│   ├── layouts/        # 布局组件
│   │   └── MainLayout.tsx
│   ├── pages/          # 页面组件（基于文件系统自动路由）
│   │   ├── index.tsx           # 首页（/ 路由）
│   │   ├── table-display.tsx   # 表格展示（/table-display 路由）
│   │   └── chart-fetch/        # 图表页面目录
│   │       └── index.tsx       # 图表展示（/chart-fetch 路由）
│   ├── router/         # 路由配置（自动生成）
│   │   └── index.tsx
│   ├── utils/          # 工具函数
│   │   └── api.ts      # API 请求封装
│   ├── main.tsx        # 微前端应用入口
│   ├── style.css       # 全局样式
│   └── vite-env.d.ts   # Vite 类型定义
├── docs/               # 项目文档
│   └── API_RULE_CHANGE.md  # API 变更指南
├── vite.config.ts      # Vite 配置文件（含微前端配置）
├── tsconfig.json       # TypeScript 配置
├── CHANGELOG.md        # 更新记录
└── package.json        # 项目依赖
```

## 功能特性

- 🚀 **自动路由生成** - 基于文件系统的约定式路由，零配置开发
- 👋 **首页展示** - Hello World 示例页面，展示微前端集成
- 📊 **数据图表** - 真实API调用的 ECharts 饼图，展示字段类型分布
- 📋 **数据表格** - 支持分页、排序、筛选的动态数据表格
- 🔌 **微前端支持** - 通过 icestark 实现与主应用的无缝集成
- 📱 **响应式设计** - 支持桌面端和移动端，自适应布局
- 🎨 **现代化 UI** - 基于 Ant Design v5 的美观界面
- ⚡ **极速构建** - Vite v7 + ES Modules，开发体验极佳

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run start
```

应用将在 `https://dev.lovrabet.com:5173` 启动（配置了HTTPS证书）
说明：https://dev.lovrabet.com:${port} port不限5173端口，任意端口号都支持跨域

### 微前端核心配置

项目包含完整的微前端配置 (`vite.config.ts`)：

- **icestark 集成**: 通过 `vite-plugin-index-html` 实现微前端打包
- **外部依赖**: React、ReactDOM、Ant Design 通过 CDN 加载
- **ES Modules 输出**: 支持主应用动态加载
- **HTTPS 支持**: 开发环境配置 HTTPS 证书，解决跨域问题
- **路径别名**: `@` 指向 `src` 目录

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 开发指南

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

**文件路由映射**：

- `src/pages/index.tsx` → `/` （首页）
- `src/pages/table-display.tsx` → `/table-display`
- `src/pages/chart-fetch/index.tsx` → `/chart-fetch`
- `src/pages/user/profile.tsx` → `/user/profile`

**动态路由**：

- `src/pages/[id].tsx` → `/:id`
- `src/pages/user/[userId]/profile.tsx` → `/user/:userId/profile`

**嵌套路由**：

- 使用目录结构创建嵌套路由
- 支持 `layout.tsx` 文件作为嵌套布局

**新增页面**：
只需在 `src/pages/` 目录下创建 `.tsx` 文件，路由会自动生成，无需手动配置。

### 样式规范

- 优先使用 Ant Design 组件
- 自定义样式使用 CSS 或 styled-components
- 响应式设计支持移动端

## 部署

项目使用 Vite 构建，可以部署到任何静态文件服务器：

- Vercel
- Netlify
- GitHub Pages
- 阿里云 OSS
- 腾讯云 COS

## 文档链接

- [开发者手册 quick-start](./docs/quick-start.md)
- [更新记录 CHANGELOG](./CHANGELOG.md)

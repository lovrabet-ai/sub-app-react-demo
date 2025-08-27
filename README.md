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
│   ├── layouts/        # 布局组件
│   │   └── MainLayout.tsx
│   ├── pages/          # 页面组件
│   │   ├── HelloWorld.tsx   # Hello World 示例页面
│   │   └── ChartFetch.tsx   # 数据图表页面（含真实API调用）
│   ├── router/         # 路由配置
│   │   └── index.tsx
│   ├── main.tsx        # 微前端应用入口
│   └── style.css       # 全局样式
├── vite.config.ts      # Vite 配置文件（含微前端配置）
├── tsconfig.json       # TypeScript 配置
└── package.json        # 项目依赖
```

## 功能特性

- 👋 **Hello World** - 基础示例页面，展示微前端集成
- 📊 **数据图表** - 真实API调用示例，展示客户状态分布饼图
- 🔌 **微前端支持** - 通过 icestark 实现与主应用的无缝集成
- 📱 **响应式设计** - 支持桌面端和移动端
- 🎨 **现代化 UI** - 基于 Ant Design 的美观界面

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm run start
```

应用将在 `https://dev.yuntooai.com:5173` 启动（配置了HTTPS证书）

### 微前端核心配置

项目包含完整的微前端配置 (`vite.config.ts`)：

- **icestark 集成**: 通过 `vite-plugin-index-html` 实现微前端打包
- **外部依赖**: React、ReactDOM、Ant Design 通过 CDN 加载
- **ES Modules 输出**: 支持主应用动态加载
- **HTTPS 支持**: 开发环境配置 HTTPS 证书，解决跨域问题
- **路径别名**: `@` 指向 `src` 目录

### 构建生产版本

```bash
pnpm run build
```

### 预览生产版本

```bash
pnpm run preview
```

## 开发指南

### 微前端集成要点

1. **入口文件配置** (`src/main.tsx`)：
   - 导出 `mount` 和 `unmount` 生命周期函数
   - 使用 `isInIcestark()` 判断运行环境
   - 支持接收主应用传递的 `customProps`

2. **路由配置** (`src/router/index.tsx`)：
   - 使用 `getBasename()` 获取动态 basename
   - 支持微应用内部路由跳转

3. **构建配置** (`vite.config.ts`)：
   - 使用 `vite-plugin-index-html` 插件
   - 配置 ES modules 输出格式
   - 外部化公共依赖减小包体积

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

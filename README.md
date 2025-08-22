# Vite React SPA 应用

这是一个使用 Vite 构建的 React 单页应用（SPA）。

演示如何使用 icestark 微前端方案进行最小化改造，使其能够嵌入 Lovrabet 生产的应用中混合使用。

## 技术栈

- **React 18** - 稳定的 React 版本，支持并发特性
- **React Router v7** - 现代化的路由解决方案
- **Ant Design v5** - 企业级 UI 设计语言
- **Vite v6** - 下一代前端构建工具
- **TypeScript** - 类型安全的 JavaScript

## 项目结构

```
├── src/
│   ├── components/     # 可复用组件
│   ├── layouts/        # 布局组件
│   │   └── MainLayout.tsx
│   ├── pages/          # 页面组件
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   └── Settings.tsx
│   ├── router/         # 路由配置
│   │   └── index.tsx
│   ├── main.tsx        # 应用入口
│   └── style.css       # 全局样式
├── vite.config.ts      # Vite 配置文件
├── tsconfig.json       # TypeScript 配置
└── package.json        # 项目依赖
```

## 功能特性

- 🏠 **首页** - 欢迎页面，展示应用概览和技术栈
- 👥 **关于我们** - 团队介绍和项目信息
- ⚙️ **设置** - 系统配置和个性化选项
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

应用将在 `http://localhost:5173` 启动

### Vite 配置

项目包含完整的 Vite 配置 (`vite.config.ts`)：

- **React 插件**: 支持 JSX 和热重载
- **路径别名**: `@` 指向 `src` 目录
- **开发服务器**: 自动打开浏览器，支持热重载
- **构建优化**: 代码分割和手动分块
- **CSS 预处理**: 支持 Less 等预处理器

### 构建生产版本

```bash
pnpm run build
```

### 预览生产版本

```bash
pnpm run preview
```

## 开发指南

### 添加新页面

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/router/index.tsx` 中添加路由配置
3. 在 `src/layouts/MainLayout.tsx` 中添加菜单项

### 组件开发

- 可复用组件放在 `src/components/` 目录
- 使用 TypeScript 进行类型检查
- 遵循 Ant Design 设计规范

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

## 许可证

MIT License

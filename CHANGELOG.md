# Changelog

## Unreleased

### Changed

- Select the matching HTTPS development hostname and certificate for ID and Mainland China projects from `.rabetbase.json` during local development and preview.

## 2.5.0 - 2026-08-21

### Changed

- Align the project-template version with Rabetbase CLI 2.5.0.
- Clarify that `rabetbase api pull` preserves existing TypeScript and that Agents merge returned model facts into existing API files.
- Remove stale SDK authentication and model-access examples from the browser client scaffold.

## 2026-08-20

### Default UI copy is English

Template chrome, sample pages, Ant Design locale, README, and quick start now default to English. Generated `src/api/api.ts` model names still come from the platform app.

## 2026-06-30

### 更新初始化项目说明

同步刷新 README 和快速开始文档，使初始化后的项目介绍与当前模板代码一致。

**变更**：

- 移除旧 `/hello-world`、`/chart-fetch`、`/intro` 实操路径，改为当前 `src/pages` 自动路由页面。
- 统一本地启动、构建、预览命令为 `rabetbase run start/build/preview`。
- 补充 `rabetbase project create`、`rabetbase config set appcode`、`rabetbase workspace init`、`rabetbase api pull` 的使用时机。
- 补充 SDK 配置、微前端接入、CDN 产物和 Lovrabet 主应用页面配置说明。
- 重做首页为 Prompt 开发入口，展示 AppCode 状态、Agent 场景示例、内置页面入口、主应用接入检查清单和 MCP 配置。

## 2025-11-30

### 📝 完善项目文档

全面更新 README.md，使其准确反映当前项目状态。

**变更**：

- **项目结构更新**：更新为当时目录结构，包含页面示例和数据展示页面
- **功能特性完善**：分为核心功能和技术特性两部分，详细描述各页面功能
- **SDK 使用指南**：更新为实际的 SDK 调用方式（filter、getOne、create、update、delete），添加动态获取模型列表说明
- **路由说明更新**：更新为当前实际的路由映射，补充布局系统说明
- **部署指南完善**：添加 CDN 部署的两种方式（标准部署和版本化部署），补充主应用集成步骤
- **新增开发注意事项**：添加环境要求、常见问题、代码规范等章节
- **添加相关资源链接**：补充 Lovrabet 开放平台和相关文档链接

## 2025-09-14

### 🔧 实现自动路由生成

引入 `vite-plugin-pages` 插件，基于文件系统自动生成路由配置。

**变更**：

- 新增 `vite-plugin-pages` 依赖
- 路由配置改用虚拟模块 `~react-pages`
- `HelloWorld.tsx` → `index.tsx` 作为默认首页

**使用**：

- `src/pages/index.tsx` → `/`
- `src/pages/table-display.tsx` → `/table-display`
- `src/pages/chart-fetch/index.tsx` → `/chart-fetch` (目录结构)

支持文件和目录两种结构，新增页面只需在 `src/pages/` 下创建文件，无需手动配置路由。

## 2025-09-12

### 全面切换www.lovrabet.com域名

Lovrabet启用新品牌域名 Lovrabet.com，并为了简化API架构，我们将原有的 `smartapi/dbapi` 双调用方式统一为单一 api 接口，同时迁移域名并简化URL路径结构。

快速替换指南：

将所有的
`https://api.yuntooai.com/smartapi/runtime/[tenantCode]/`
`https://api.yuntooai.com/dbapi/runtime/[tenantCode]/`
批量替换为
`https://runtime.lovrabet.com/api/`

详情可查看 [Lovrabet API 地址规则变更通知](./docs/API_RULE_CHANGE.md)

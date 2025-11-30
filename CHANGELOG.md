# 更新记录

## 2025-11-30

### 📝 完善项目文档

全面更新 README.md，使其准确反映当前项目状态。

**变更**：

- **项目结构更新**：更新为实际目录结构，包含所有现有页面（intro、workbench、dashboard、data-screen 等）
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

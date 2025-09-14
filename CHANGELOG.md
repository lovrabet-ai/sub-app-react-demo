# 更新记录

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

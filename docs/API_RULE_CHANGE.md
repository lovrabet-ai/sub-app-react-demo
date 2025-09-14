# Lovrabet API 地址规则变更通知

## 📢 重要变更通知

**生效日期**：2025-09-12
**影响范围**：所有调用 Lovrabet API 的合作商和开发者

**变更概要**：为了简化API架构，我们将原有的 smartapi/dbapi 双调用方式统一为单一 api 接口，同时迁移域名并简化URL路径结构。

**快速替换指南**：开发者需要将所有的 
- `https://api.yuntooai.com/smartapi/runtime/[tenantCode]/` 
- `https://api.yuntooai.com/dbapi/runtime/[tenantCode]/` 

批量替换为 `https://runtime.lovrabet.com/api/`

---

## 🔄 API 地址规则变更

### 原规则（已废弃）

```diff
- https://api.yuntooai.com/{callMethod}/runtime/{tenant}/{appCode}/{datasetCode}/{apiName}
```

**参数说明**：

- <span style="color: red">~~`callMethod`: API调用类型（smartapi/dbapi）~~</span> ❌ **已删除**
- <span style="color: red">~~`runtime`: 固定前缀，运行时标识~~</span> ❌ **已删除**
- <span style="color: red">~~`tenant`: 租户名称~~</span> ❌ **已删除**
- `appCode`: 应用代码
- `datasetCode`: 数据集代码
- `apiName`: 接口名称

**示例**：

```diff
- https://api.yuntooai.com/dbapi/runtime/yuntoo/app-f4c03acb/6c6c94a6ef064fe898cfa895fe5a38f5/getList
```

### 新规则（当前生效）

```diff
+ https://runtime.lovrabet.com/api/{appCode}/{datasetCode}/{apiName}
```

**参数说明**：

- <span style="color: green">**`api`: 固定前缀（所有API统一使用）**</span> ✅ **新增**
- `appCode`: 应用代码（格式：app-{应用ID}）
- `datasetCode`: 数据集唯一标识
- `apiName`: 具体的API接口名

**示例**：

```diff
+ https://runtime.lovrabet.com/api/app-c4055413/76a873945291498498737bc85677983d/getList
```

---

## 📋 变更对比

| 项目           | 原规则              | 新规则             | 说明           |
| -------------- | ------------------- | ------------------ | -------------- |
| **URL结构**    | 6个路径段           | 4个路径段          | 简化URL结构    |
| **调用方式**   | smartapi/dbapi 区分 | 统一使用 api       | 简化调用方式   |
| **固定前缀**   | runtime             | api                | 更直观的前缀   |
| **租户标识**   | 需要租户名称        | 已包含在应用代码中 | 减少参数复杂度 |
| **应用代码**   | app-{id}            | app-{id}           | 保持不变       |
| **数据集代码** | 保持不变            | 保持不变           | 保持不变       |
| **接口名称**   | 保持不变            | 保持不变           | 保持不变       |

---

## 🛠️ 需要修改的地方

### 1. API请求地址更新

**原代码**：

```diff
const apiUrl =
- "/dbapi/runtime/yuntoo/app-f4c03acb/6c6c94a6ef064fe898cfa895fe5a38f5/getList";
const response = await fetch(`https://api.yuntooai.com${apiUrl}`);
```

**新代码**：

```diff
const apiUrl =
+ "/api/app-c4055413/76a873945291498498737bc85677983d/getList";
const response = await fetch(`https://runtime.lovrabet.com${apiUrl}`);
```

### 2. 配置文件更新

如果你有配置文件存储API地址模板，需要更新：

**原模板**：

```diff
{
- "apiTemplate": "/{callMethod}/runtime/{tenant}/{appCode}/{datasetCode}/{apiName}"
}
```

**新模板**：

```diff
{
+ "apiTemplate": "/api/{appCode}/{datasetCode}/{apiName}"
}
```

### 3. API解析逻辑更新

如果你的代码中有解析API地址的逻辑：

**原解析逻辑**：

```diff
const urlParts = apiUrl.split("/");
- const callMethod = urlParts[1]; // smartapi/dbapi
- const runtime = urlParts[2]; // runtime
- const tenant = urlParts[3]; // 租户名称
- const appCode = urlParts[4]; // 应用代码
- const datasetCode = urlParts[5]; // 数据集代码
- const apiName = urlParts[6]; // 接口名称
```

**新解析逻辑**：

```diff
const urlParts = apiUrl.split("/");
+ const apiPrefix = urlParts[1]; // api (固定)
+ const appCode = urlParts[2]; // 应用代码
+ const datasetCode = urlParts[3]; // 数据集代码
+ const apiName = urlParts[4]; // 接口名称
```

---

## ⚠️ 重要提醒

### 1. 兼容性说明

- 旧格式API地址将在 **2024年12月31日** 后停止支持
- 请务必在此日期前完成所有API地址的更新

### 2. 测试验证

更新API地址后，请务必进行以下验证：

- ✅ 接口调用正常
- ✅ 数据返回格式一致
- ✅ 权限验证通过
- ✅ 错误处理正常

### 3. 权限说明

- 新规则下的权限验证机制保持不变
- 仍需要在 `app.lovrabet.com` 中登录获取权限
- 跨域请求仍需要配置 `credentials: 'include'`

---

## 🔗 获取新API地址

### 方式一：从管理后台获取

1. 访问：`https://app.lovrabet.com/app/{你的appCode}/admin/dataset`
2. 找到对应的数据集
3. 复制新格式的API地址

### 方式二：API地址转换

如果你有原格式的API地址，可以按以下规则转换：

**转换规则**：

```diff
- 原: https://api.yuntooai.com/{callMethod}/runtime/{tenant}/{appCode}/{datasetCode}/{apiName}
+ 新: https://runtime.lovrabet.com/api/{appCode}/{datasetCode}/{apiName}
```

**转换示例**：

```diff
- 原: https://api.yuntooai.com/dbapi/runtime/yuntoo/app-f4c03acb/6c6c94a6ef064fe898cfa895fe5a38f5/getList
+ 新: https://runtime.lovrabet.com/api/app-f4c03acb/6c6c94a6ef064fe898cfa895fe5a38f5/getList
```

---

## 📝 更新检查清单

请在完成API地址更新后，使用以下清单进行检查：

- [ ] 所有API请求地址已更新为新格式
- [ ] 相关配置文件已更新
- [ ] API地址解析逻辑已修改
- [ ] 本地环境测试通过
- [ ] 生产环境验证通过
- [ ] 错误处理逻辑正常
- [ ] 权限验证功能正常
- [ ] 用户文档已更新（如有）

---

_最后更新时间：2024年9月12日_
_版本：v2.0_

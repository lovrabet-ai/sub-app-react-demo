# Lovrabet子应用接入指南 - React 18 + Vite 实操版

> 🎯 **目标**：通过实际操作完成React项目接入Lovrabet平台  
> 📦 **官方代码**：https://github.com/lovrabet-ai/sub-app-react-demo  
> ⏱️ **预计时间**：30分钟完成完整体验

---

## 🚀 场景一：Hello World 实操（10min）

**目标**：下载官方代码，本地运行验证，构建部署，集成到主应用

### Step 1: 下载GitHub仓库
```bash
git clone https://github.com/lovrabet-ai/sub-app-react-demo.git
cd sub-app-react-demo
git checkout main
```

### Step 2: 本地安装和运行
```bash
# 安装依赖
npm i

# 本地运行查看效果
npm start
```

**本地验证**：
- 浏览器打开 https://dev.yuntooai.com:5173/hello-world
- 确认Hello World页面正常显示
- 检查控制台无报错信息

![本地终端运行](https://i.yuntooai.com/u/AZjq66VncACe2C_z8m9_Qg.png)

### Step 3: 构建产物
```bash
# 构建微前端产物
npm run build
```

**构建验证**：
- 检查 `dist/` 目录生成
- 确认存在 `dist/assets/main.js` 文件（ES modules格式）
- 确认存在 `dist/assets/main.css` 样式文件

![本地构建产物](https://i.yuntooai.com/u/AZjq8hJFcACYdK1TnupxaA.png)


### Step 4: 上传构建产物到CDN

#### 选项A：使用业务方已有CDN
```bash
# 将 dist/ 目录内容上传到您的CDN
# 例如：https://your-cdn.com/react-hello-world/
```

#### 选项B：使用Lovrabet临时CDN服务（仅供功能体验）
```bash
# 联系Lovrabet的技术支持获取临时CDN上传地址
```

**CDN验证**：
- 确认可访问：`https://your-cdn.com/dist/assets/main.js`
- 确认可访问：`https://your-cdn.com/dist/assets/main.css`

### Step 5: 到Lovrabet主应用中集成Hello World页面
在Lovrabet平台配置页面：

```
页面配置：
├── 页面名称: Hello World Demo
├── 路由路径: /hello-world
├── 微应用唯一标识: react-hello-world
├── 资源加载方式: import
└── 资源加载列表: 
  ├── https://your-cdn.com/dist/assets/main.js
  └── https://your-cdn.com/dist/assets/main.css
```

**集成验证**：
- 主应用菜单出现"Hello World Demo"
- 点击菜单能正常显示页面
- 页面功能与本地运行效果一致



#### 5.1 新增页面
访问菜单配置链接：https://app.yuntooai.com/app/app-f4c03acb/pages/
![](https://i.yuntooai.com/u/AZjrKSOvcACyPcNb4irCUA.png)

#### 5.2 配置路由
![hello-world页面集成到主应用中](https://i.yuntooai.com/u/AZjq-EX5cACZF-TKk4EvTw.png)

### step 6：验证页面运行效果
**✅ 场景一完成标志**：主应用中能正常访问Hello World页面

https://app-f4c03acb.app.yuntooai.com/hello-world
helloworld运行时页面: https://app-f4c03acb.app.yuntooai.com/hello-world
![helloworld运行时页面](https://i.yuntooai.com/u/AZjq_pSDcACOdA8Me_CFFQ.png)

---

## 📊 场景二：数据图表页面实操（10min）

**目标**：体验带真实数据接口和图表的完整功能

### Step 1: 查看图表页面代码
```bash
# 项目已包含 ChartFetch.tsx 页面
# 使用真实 API：https://api.yuntooai.com/dbapi/runtime/yuntoo/app-f4c03acb/6c6c94a6ef064fe898cfa895fe5a38f5/getList
cat src/pages/ChartFetch.tsx
```


### Step 2: 本地运行验证
```bash
# 项目已安装echarts依赖
npm start
```

**本地验证**：
- 浏览器访问 https://dev.yuntooai.com:5173/chart-fetch
- 确认饼图显示客户状态分布（活跃、正常、流失）

### Step 3: 构建更新的产物
```bash
# 重新构建包含图表功能的版本
npm run build
```

**构建验证**：
- `dist/assets/main.js` 包含echarts
- `dist/assets/main.css` 样式文件更新
- 注意：React、Ant Design已外部化，体积较小

### Step 4: 重新上传到CDN
```bash
# 将更新后的 dist/ 内容重新上传
# 覆盖之前的文件或使用新的路径
```

### Step 5: 到Lovrabet主应用中集成ChartFetch页面

**页面2：数据图表入口**
```
├── 页面名称: 数据图表
├── 路由路径: /chart-fetch  
├── 资源加载方式: import
└── 资源加载列表: 
  ├── https://your-cdn.com/sub-app-react-demo/assets/main.js
  └── https://your-cdn.com/sub-app-react-demo/assets/main.css
```

访问链接：https://app.yuntooai.com/app/app-f4c03acb/preview
![chart-fetch页面集成到主应用中](https://i.yuntooai.com/u/AZjq9nKvcACEawJpHIM4Gg.png)

**集成验证**：
- 主应用出现两个菜单项
- "Hello World"菜单 → 显示Hello World页面
- "数据图表"菜单 → 显示图表页面，数据正常加载

**✅ 场景二完成标志**：两个菜单都能正常工作，图表数据正常显示

![](https://i.yuntooai.com/u/AZjrAvi8cACGVAKkuXXkkQ.png)

---

## 🔧 场景三：改造已有项目（20min）

**目标**：将您现有的React项目改造为微前端，直接请求真实的业务接口，实现无缝集成到Lovrabet平台

### 改造已有项目流程
1. **分析现有项目** → 确定改造范围和接口依赖
2. **修改入口文件** → 添加微前端生命周期函数
3. **配置构建工具** → 修改vite.config.js支持ES modules
4. **封装API调用** → 统一请求方式，直接调用真实接口
5. **本地开发测试** → 验证功能完整性
6. **构建部署** → 生成ES modules格式产物
7. **平台配置** → 配置多个页面入口
8. **生产验证** → 确保集成效果符合预期

### 官方配置参数详解

根据Lovrabet官方文档，配置页面时需要理解以下关键参数：

#### 1. 路由路径 (path)
```
说明：应用实际访问时链接url中的path部分
示例：
  - 配置"/hello-world"，访问链接是 https://app-f4c03acb.app.yuntooai.com/hello-world
  - 配置 "/chart-fetch"，访问链接是 https://app-f4c03acb.app.yuntooai.com/chart-fetch
要求：需要保证在整个应用中唯一，配置时会自动生成
注意：微应用中也存在前端路由的情况需要对应
```

#### 2. 微应用唯一标识
```
说明：标记页面所属的源码微应用，多个页面可能属于同一个源码微应用
默认：如不填写，则实际运行时会将"路由路径（path）"作为应用标识
```

#### 3. Basename
```
说明：指定微应用接收的basename，微应用包含前端路由的场景下需要使用
默认：如不填写，则默认"路由路径（path）"即作为basename
```

#### 4. 资源加载方式
```
script（默认）：通过HTML <script /> 标签加载微应用脚本资源，使用angular CLI和 vue CLI构建的产品默认选`script`;
fetch：通过window.fetch 加载并缓存脚本资源，沙箱模式下使用;
import：加载ES modules 类型微应用的方式，通过vite构建的工程需要使用这种方式;
```

### Step 1: 改造现有项目结构

#### 1.1 修改入口文件

```jsx
// src/main.jsx - 改造为微前端入口
import React from 'react'
import { createRoot } from 'react-dom/client'
import { isInIcestark } from '@ice/stark-app'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import App from './router'  // 注意：App实际上是路由组件
import './style.css'

// 判断是否在微前端环境中运行
if (!isInIcestark()) {
  const container = document.getElementById('root')
  if (container) {
    const root = createRoot(container)
    root.render(
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    )
  }
}

// 关键：暴露 mount 供主应用加载时调用
export function mount({ container, customProps }) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <ConfigProvider locale={zhCN}>
        <App {...customProps} />
      </ConfigProvider>
    </React.StrictMode>
  )
  return root
}

// 关键：暴露 unmount 供主应用卸载时调用
export function unmount({ container }) {
  // React 18 中不再需要手动卸载，但为了兼容性保留
  const root = container._reactRoot
  if (root) {
    root.unmount()
  }
}
```

#### 1.2 配置Vite构建
```javascript
// vite.config.js - 微前端构建配置
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
plugins: [react()],

// 开发服务器配置
server: {
  port: 5173,
  cors: true,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
},

// 生产构建配置 - ES modules格式
build: {
  lib: {
    entry: './src/main.jsx',
    name: 'YourAppName',  // 替换为您的应用名称
    fileName: 'main',
    formats: ['es']  // 生成ES modules格式
  },
  rollupOptions: {
    output: {
      entryFileNames: 'main.js',
      assetFileNames: 'assets/[name].[ext]'
    }
  }
}
})
```

### Step 2: 直接请求真实接口

#### 2.2 API请求封装（核心配置）

**🔑 关键点：跨域请求必须配置 `credentials: 'include'` 来携带Cookie**

```javascript
// 简单封装 apiRequest - 这是最简单有效的实现
const apiRequest = async (path, options = {}) => {
  const response = await fetch(`https://api.yuntooai.com${path}`, {
    credentials: 'include', // 关键配置：跨域请求携带Cookie
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  return response.json();
};

// 使用示例
const fetchUserData = async () => {
  try {
    const data = await apiRequest('/dbapi/runtime/yuntoo/app-f4c03acb/6c6c94a6ef064fe898cfa895fe5a38f5/getList', {
      method: 'POST',
      body: JSON.stringify({ pageSize: 10, currentPage: 1 })
    });
    
    if (data.success) {
      console.log('数据获取成功:', data.data);
    }
  } catch (error) {
    console.error('请求失败:', error);
  }
};
```

### Step 3: 路由配置

```jsx
// src/router/index.jsx - 路由配置文件
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { getBasename } from '@ice/stark-app'
import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/Dashboard'
import UserManagement from '../pages/UserManagement'
import OrderList from '../pages/OrderList'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: 'users',
          element: <UserManagement />,
        },
        {
          path: 'orders',
          element: <OrderList />,
        },
      ],
    },
  ],
  {
    // 关键：通过 getBasename() 获取到微应用运行时的 basename 并传入
    basename: getBasename() || '/',
  }
)

const AppRouter = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
```

### Step 4: 本地开发、测试、集成到主应用

同场景一和场景二的操作

## 🛠️ 常见问题和解决方案

### 改造相关问题

**问题1：现有项目路由冲突**
**解决**：
- 确保BrowserRouter使用正确的basename
- 检查路由配置与平台配置的路径匹配
- 使用相对路径而非绝对路径

**问题2：接口请求失败**
**解决**：
- 检查API地址配置是否正确
- 验证接口的CORS配置

### 构建部署问题

**问题4：构建后资源加载失败**
**解决**：
- 确保选择import加载方式
- 检查CDN地址是否正确
- 验证资源文件是否完整上传
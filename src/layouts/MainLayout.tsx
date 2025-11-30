import React, { useState } from "react";
import { isInIcestark } from "@ice/stark-app";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Layout,
  Menu,
  theme,
  Button,
  Breadcrumb,
  Avatar,
  Space,
  Dropdown,
} from "antd";
import type { MenuProps } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  ApiOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RocketOutlined,
  UserOutlined,
  SunOutlined,
  MoonOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

// 路由配置，用于生成面包屑
const routeConfig = [
  { path: "/", title: "首页" },
  { path: "/workbench", title: "工作台" },
  { path: "/dashboard", title: "数据看板" },
  { path: "/sdk-demo", title: "SDK 演示" },
  { path: "/data-screen", title: "数据大屏" },
];

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, colorBgLayout },
  } = theme.useToken();

  // 菜单收起/展开状态
  const [collapsed, setCollapsed] = useState(false);
  // 菜单是否完全隐藏
  const [menuHidden, setMenuHidden] = useState(false);

  const menuItems: MenuProps["items"] = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "首页（二开说明）",
    },
    {
      key: "/sdk-demo",
      icon: <ApiOutlined />,
      label: "SDK 演示",
    },
    {
      key: "page-examples",
      icon: <FileTextOutlined />,
      label: "页面案例",
      children: [
        {
          key: "/workbench",
          icon: <DashboardOutlined />,
          label: "工作台",
        },
        {
          key: "/dashboard",
          icon: <DashboardOutlined />,
          label: "数据看板",
        },
        {
          key: "/data-screen",
          icon: <BarChartOutlined />,
          label: "数据大屏",
        },
      ],
    },
    {
      key: "docs",
      icon: <FileTextOutlined />,
      label: "参考文档",
      children: [
        {
          key: "https://open.lovrabet.com/docs/lovrabet-cli/",
          icon: <FileTextOutlined />,
          label: "CLI 前端脚手架",
        },
        {
          key: "https://open.lovrabet.com/docs/category/lovrabet-node-sdk",
          icon: <FileTextOutlined />,
          label: "TypeScript SDK",
        },
        {
          key: "https://open.lovrabet.com/docs/category/java-opensdk",
          icon: <FileTextOutlined />,
          label: "Java SDK",
        },
        {
          key: "https://open.lovrabet.com/docs/category/openapi",
          icon: <FileTextOutlined />,
          label: "OpenAPI",
        },
      ],
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    // 如果是外部链接（以 http:// 或 https:// 开头），在新标签页打开
    if (key.startsWith("http://") || key.startsWith("https://")) {
      window.open(key, "_blank", "noopener,noreferrer");
    } else {
      navigate(key);
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const toggleMenuHidden = () => {
    setMenuHidden(!menuHidden);
    // 如果隐藏菜单，同时收起菜单
    if (!menuHidden) {
      setCollapsed(true);
    }
  };

  // 生成面包屑
  const getBreadcrumbItems = () => {
    const items: any[] = [{ title: "首页" }];
    const currentRoute = routeConfig.find((r) => r.path === location.pathname);
    if (currentRoute && currentRoute.path !== "/") {
      items.push({ title: currentRoute.title });
    }
    return items;
  };

  // 用户菜单
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "个人中心",
      icon: <UserOutlined />,
    },
    {
      key: "settings",
      label: "系统设置",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "退出登录",
      danger: true,
    },
  ];

  // 可选：根据isInIcestark()判断当前运行环境，被嵌入时，不渲染layout布局
  if (isInIcestark()) {
    return (
      <div style={{ padding: "16px 20px" }}>
        <Outlet />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      {!menuHidden && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={220}
          style={{
            background: "#fafafa",
            boxShadow: "2px 0 8px 0 rgba(29,35,41,.05)",
            borderRight: "1px solid #f0f0f0",
          }}
        >
          {/* 系统标题 */}
          <div
            style={{
              height: 64,
              padding: collapsed ? "16px 8px" : "16px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              borderBottom: "1px solid #f0f0f0",
              background: "#fff",
            }}
          >
            {!collapsed ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <RocketOutlined style={{ color: "#1890ff", fontSize: 20 }} />
                <span
                  style={{ fontSize: 16, fontWeight: 600, color: "#262626" }}
                >
                  Lovrabet System
                </span>
              </div>
            ) : (
              <RocketOutlined style={{ color: "#1890ff", fontSize: 24 }} />
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            style={{
              height: "calc(100vh - 64px)",
              borderRight: 0,
              background: "#fafafa",
            }}
            theme="light"
            className="custom-menu"
          />
        </Sider>
      )}
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px 0 rgba(29,35,41,.05)",
            borderBottom: "1px solid #f0f0f0",
            height: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button
              type="text"
              icon={
                menuHidden ? (
                  <MenuUnfoldOutlined />
                ) : collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={menuHidden ? toggleMenuHidden : toggleCollapsed}
              style={{
                fontSize: 16,
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            {menuHidden && (
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={toggleMenuHidden}
                style={{
                  fontSize: 14,
                  height: 32,
                }}
              >
                显示菜单
              </Button>
            )}
            {/* 面包屑导航 */}
            <Breadcrumb
              items={getBreadcrumbItems()}
              style={{ marginLeft: menuHidden ? 0 : 16 }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* 主题切换 */}
            <Button
              type="text"
              icon={<SunOutlined />}
              style={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            {/* 用户信息 */}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space
                style={{
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: 4,
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f5f5f5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  style={{ background: "#1890ff" }}
                />
                <span style={{ fontSize: 14, color: "#262626" }}>管理员</span>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: 8,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

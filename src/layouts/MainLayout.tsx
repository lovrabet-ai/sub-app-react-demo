import React from "react";
import { isInIcestark } from "@ice/stark-app";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import {
  SmileOutlined,
  PieChartOutlined,
  TableOutlined,
  FolderOutlined,
  RocketOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/",
      icon: <SmileOutlined />,
      label: "Hello World",
    },
    {
      key: "/dashboard",
      icon: <SmileOutlined />,
      label: "Dashboard静态模板",
    },
    {
      key: "/sdk-demo",
      icon: <FolderOutlined />,
      label: "Lovrabet SDK使用案例",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // 可选：根据isInIcestark()判断当前运行环境，被嵌入时，不渲染layout布局
  if (isInIcestark()) {
    return (
      <div style={{ padding: "16px 20px" }}>
        <Outlet />
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: colorBgContainer,
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            textAlign: "center",
          }}
        >
          <img src="/vite.svg" alt="logo" />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ height: "100%", borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{ padding: "0 24px", fontSize: "18px", fontWeight: "bold" }}
          >
            React SPA 应用
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              margin: "16px 0",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

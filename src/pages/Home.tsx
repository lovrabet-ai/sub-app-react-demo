import React from "react";
import { Typography, Card, Row, Col, Statistic, Button, Space } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div>
      <Title level={2}>欢迎来到 React SPA 应用</Title>
      <Paragraph>
        这是一个使用 React 18、React Router v7、Ant Design v5 和 Vite v6
        构建的现代化单页应用。
      </Paragraph>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数量"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="文档数量"
              value={93}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="配置项" value={15} prefix={<SettingOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 24 }}>
        <Title level={3}>技术栈</Title>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card size="small">
              <div style={{ textAlign: "center" }}>
                <Title level={4}>React 18</Title>
                <Paragraph>稳定的 React 版本，支持并发特性</Paragraph>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <div style={{ textAlign: "center" }}>
                <Title level={4}>React Router v7</Title>
                <Paragraph>现代化的路由解决方案</Paragraph>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <div style={{ textAlign: "center" }}>
                <Title level={4}>Ant Design v5</Title>
                <Paragraph>企业级 UI 设计语言</Paragraph>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small">
              <div style={{ textAlign: "center" }}>
                <Title level={4}>Vite v6</Title>
                <Paragraph>下一代前端构建工具</Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      <Card style={{ marginTop: 24 }}>
        <Title level={3}>快速开始</Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Paragraph>
            点击左侧菜单可以导航到不同的页面，体验完整的应用功能。
          </Paragraph>
          <Space>
            <Button
              type="primary"
              onClick={() => window.open("https://react.dev", "_blank")}
            >
              学习 React
            </Button>
            <Button onClick={() => window.open("https://ant.design", "_blank")}>
              查看 Ant Design
            </Button>
            <Button onClick={() => window.open("https://vitejs.dev", "_blank")}>
              了解 Vite
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default Home;

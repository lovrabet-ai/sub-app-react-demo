import React from 'react';
import { Typography, Card, Row, Col, Space, Tag, Divider } from 'antd';
import {
  ApiOutlined,
  RocketOutlined,
  CodeOutlined,
  ExperimentOutlined,
  BulbOutlined,
  ToolOutlined,
  CloudServerOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

function HomePage() {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 项目概述 */}
        <Card>
          <Title level={2}>
            <RocketOutlined style={{ color: '#1890ff' }} /> Lovrabet SDK React 演示项目
          </Title>
          <Paragraph style={{ fontSize: 16, color: '#666' }}>
            这是一个专门用于演示和测试 <Text strong>@lovrabet/sdk</Text> 功能的 React 应用。
            项目展示了如何在现代 React 应用中集成和使用 Lovrabet SDK 进行数据操作。
          </Paragraph>
        </Card>

        {/* 核心功能 */}
        <Card title={<><BulbOutlined /> 核心功能</>} size="small">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card size="small" style={{ height: '100%', background: '#f6ffed' }}>
                <ApiOutlined style={{ fontSize: 24, color: '#52c41a', marginBottom: 8 }} />
                <Title level={4} style={{ margin: '8px 0' }}>SDK 调用演示</Title>
                <Text type="secondary">
                  展示 SDK 的 CRUD 操作方法，包括数据获取、创建、更新和删除
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card size="small" style={{ height: '100%', background: '#e6f7ff' }}>
                <CloudServerOutlined style={{ fontSize: 24, color: '#1890ff', marginBottom: 8 }} />
                <Title level={4} style={{ margin: '8px 0' }}>API 集成</Title>
                <Text type="secondary">
                  演示如何配置和使用 Lovrabet Runtime API 进行数据交互
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card size="small" style={{ height: '100%', background: '#fff2e8' }}>
                <ExperimentOutlined style={{ fontSize: 24, color: '#fa8c16', marginBottom: 8 }} />
                <Title level={4} style={{ margin: '8px 0' }}>微前端集成</Title>
                <Text type="secondary">
                  支持作为子应用集成到 Lovrabet 主应用的微前端架构中
                </Text>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* 技术栈 */}
        <Card title={<><ToolOutlined /> 技术栈</>} size="small">
          <Row gutter={[24, 16]}>
            <Col xs={24} md={12}>
              <Title level={5}>前端技术</Title>
              <Space wrap>
                <Tag color="blue">React 18</Tag>
                <Tag color="green">TypeScript</Tag>
                <Tag color="purple">Vite</Tag>
                <Tag color="cyan">Ant Design 5</Tag>
              </Space>
              <Paragraph style={{ marginTop: 8, color: '#666' }}>
                使用现代化的前端技术栈，提供优秀的开发体验和用户体验
              </Paragraph>
            </Col>
            <Col xs={24} md={12}>
              <Title level={5}>SDK 集成</Title>
              <Space wrap>
                <Tag color="orange">@lovrabet/sdk</Tag>
                <Tag color="red">Runtime API</Tag>
                <Tag color="geekblue">icestark</Tag>
                <Tag color="magenta">微前端</Tag>
              </Space>
              <Paragraph style={{ marginTop: 8, color: '#666' }}>
                集成 Lovrabet SDK 和微前端框架，支持灵活的应用架构
              </Paragraph>
            </Col>
          </Row>
        </Card>

        {/* 页面导航 */}
        <Card title={<><CodeOutlined /> 功能页面</>} size="small">
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={8}>
              <Text strong>SDK 演示</Text>
              <br />
              <Text type="secondary">查看 SDK 的核心调用方法和代码示例</Text>
            </Col>
            <Col xs={24} sm={8}>
              <Text strong>表格展示</Text>
              <br />
              <Text type="secondary">展示数据表格的渲染和交互功能</Text>
            </Col>
            <Col xs={24} sm={8}>
              <Text strong>图表获取</Text>
              <br />
              <Text type="secondary">演示图表数据的获取和可视化展示</Text>
            </Col>
          </Row>
        </Card>

        <Divider />

        {/* 项目信息 */}
        <Card size="small" style={{ background: '#fafafa' }}>
          <Text type="secondary">
            💡 <strong>提示：</strong>
            本项目主要用于 SDK 功能验证和演示，帮助开发者快速了解如何在 React 应用中使用 Lovrabet SDK。
            所有代码示例都经过实际测试，可以直接参考使用。
          </Text>
        </Card>
      </Space>
    </div>
  );
}

export default HomePage;
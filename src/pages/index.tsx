import React from 'react';
import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

function HelloWorld() {
  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Hello World 👋</Title>
        <Paragraph>
          欢迎使用 Lovrabet 子应用系统！这是一个基于 React 18 + Vite + icestark 的微前端示例项目。
        </Paragraph>
        <Paragraph>
          该示例展示了如何快速将 React 应用集成到 Lovrabet 主应用中。
        </Paragraph>
        <Paragraph>
          <strong>技术栈：</strong>
        </Paragraph>
        <ul>
          <li>React 18 - 现代化的前端框架</li>
          <li>Vite - 快速的构建工具</li>
          <li>Ant Design 5 - 企业级UI组件库</li>
          <li>icestark - 微前端框架</li>
        </ul>
      </Card>
    </div>
  );
}

export default HelloWorld;
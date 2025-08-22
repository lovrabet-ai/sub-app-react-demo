import React from "react";
import { Typography, Card, Row, Col, Avatar, List, Tag, Space } from "antd";
import {
  TeamOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "张三",
      role: "前端开发工程师",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      skills: ["React", "TypeScript", "Vite"],
    },
    {
      name: "李四",
      role: "UI/UX 设计师",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      skills: ["Figma", "Ant Design", "用户体验"],
    },
    {
      name: "王五",
      role: "后端开发工程师",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      skills: ["Node.js", "Express", "数据库"],
    },
  ];

  const features = [
    "稳定的 React 18 架构",
    "响应式设计，支持移动端",
    "TypeScript 类型安全",
    "Ant Design 企业级 UI 组件",
    "Vite 快速构建和热重载",
    "React Router v7 路由管理",
  ];

  return (
    <div>
      <Title level={2}>关于我们</Title>
      <Paragraph>
        我们是一个专注于前端技术创新的团队，致力于为用户提供最佳的数字体验。
      </Paragraph>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={16}>
          <Card title="项目介绍" style={{ marginBottom: 24 }}>
            <Paragraph>
              这是一个使用最新技术栈构建的现代化单页应用（SPA）。我们选择了业界领先的技术：
            </Paragraph>
            <List
              dataSource={features}
              renderItem={(item) => (
                <List.Item>
                  <Tag color="blue">{item}</Tag>
                </List.Item>
              )}
            />
          </Card>

          <Card title="技术优势">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card size="small" title="性能优化">
                  <Paragraph>
                    使用 Vite 构建工具，提供极快的开发体验和生产构建速度。
                  </Paragraph>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="类型安全">
                  <Paragraph>
                    全面使用 TypeScript，提供完整的类型检查和智能提示。
                  </Paragraph>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="组件化">
                  <Paragraph>
                    基于 Ant Design 组件库，提供丰富的 UI 组件和设计规范。
                  </Paragraph>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="路由管理">
                  <Paragraph>
                    使用 React Router v7，提供现代化的路由解决方案。
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="团队成员" extra={<TeamOutlined />}>
            <List
              dataSource={teamMembers}
              renderItem={(member) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={member.avatar} />}
                    title={member.name}
                    description={member.role}
                  />
                  <Space>
                    {member.skills.map((skill) => (
                      <Tag key={skill} color="green">
                        {skill}
                      </Tag>
                    ))}
                  </Space>
                </List.Item>
              )}
            />
          </Card>

          <Card title="联系我们" style={{ marginTop: 24 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Paragraph>
                <GithubOutlined /> GitHub: github.com/your-org
              </Paragraph>
              <Paragraph>
                <LinkedinOutlined /> LinkedIn: linkedin.com/company/your-company
              </Paragraph>
              <Paragraph>📧 Email: contact@yourcompany.com</Paragraph>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;

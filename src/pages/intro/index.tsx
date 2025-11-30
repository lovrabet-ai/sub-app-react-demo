import React from "react";
import {
  Typography,
  Card,
  Row,
  Col,
  Space,
  Tag,
  Divider,
  Button,
  Steps,
  Alert,
} from "antd";
import {
  RocketOutlined,
  ToolOutlined,
  ApiOutlined,
  CloudServerOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  LinkOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  CodeOutlined,
  SettingOutlined,
  SyncOutlined,
  BuildOutlined,
  BulbOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function IntroPage() {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      {/* 欢迎横幅 */}
      <Card
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
        }}
      >
        <Row align="middle" gutter={24}>
          <Col xs={24} md={16}>
            <Title level={1} style={{ color: "#fff", margin: 0 }}>
              <RocketOutlined /> 欢迎使用 Lovrabet BaaS 开发体系
            </Title>
            <Paragraph
              style={{
                color: "#fff",
                fontSize: 16,
                marginTop: 16,
                marginBottom: 0,
              }}
            >
              完整的工具链让您快速构建企业级应用：
              <Text strong style={{ color: "#fff" }}>
                CLI 脚手架
              </Text>{" "}
              +{" "}
              <Text strong style={{ color: "#fff" }}>
                SDK 数据访问
              </Text>{" "}
              +{" "}
              <Text strong style={{ color: "#fff" }}>
                MCP AI 辅助
              </Text>
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <Space>
              <Button
                type="primary"
                size="large"
                icon={<PlayCircleOutlined />}
                href="https://open.lovrabet.com/docs/lovrabet-cli/quickstart"
                target="_blank"
                style={{
                  background: "#fff",
                  color: "#667eea",
                  border: "none",
                }}
              >
                快速开始
              </Button>
              <Button
                size="large"
                icon={<FileTextOutlined />}
                href="https://open.lovrabet.com"
                target="_blank"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                查看文档
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Lovrabet 面向技术人员的开放平台能做什么 */}
      <Card style={{ marginTop: 24 }}>
        <Title level={2}>
          <BulbOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          Lovrabet 面向技术人员的开放平台能做什么
        </Title>
        <Paragraph style={{ fontSize: 16, color: "#666" }}>
          Lovrabet 开放平台为技术人员提供完整的二次开发能力，让您能够基于
          Lovrabet 的 AI 能力构建企业级应用。
        </Paragraph>
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <div style={{ textAlign: "center" }}>
                <ToolOutlined
                  style={{ fontSize: 48, color: "#1890ff", marginBottom: 16 }}
                />
                <Title level={4}>快速创建项目</Title>
                <Paragraph>
                  使用 CLI 工具一键创建标准化的前端项目，自动配置路由、构建工具等
                </Paragraph>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <div style={{ textAlign: "center" }}>
                <ApiOutlined
                  style={{ fontSize: 48, color: "#52c41a", marginBottom: 16 }}
                />
                <Title level={4}>简化数据访问</Title>
                <Paragraph>
                  通过 SDK 轻松访问 Lovrabet 平台的数据，支持类型安全的 API
                  调用
                </Paragraph>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <div style={{ textAlign: "center" }}>
                <RobotOutlined
                  style={{ fontSize: 48, color: "#fa8c16", marginBottom: 16 }}
                />
                <Title level={4}>AI 辅助开发</Title>
                <Paragraph>
                  通过 MCP 让 AI 深度理解您的数据结构，实现智能代码生成
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 为什么需要二次开发 */}
      <Card style={{ marginTop: 24 }}>
        <Title level={2}>
          <QuestionCircleOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          为什么需要二次开发
        </Title>
        <Paragraph style={{ fontSize: 16, color: "#666", marginBottom: 24 }}>
          虽然 Lovrabet 平台提供了强大的 AI
          能力，但在某些场景下，您仍然需要进行二次开发来满足特定的业务需求。
        </Paragraph>

        <Alert
          message="以下场景必须通过二次开发才能实现"
          type="info"
          style={{ marginBottom: 24 }}
        />

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card size="small" style={{ height: "100%" }}>
              <Title level={4}>
                <CodeOutlined style={{ color: "#1890ff", marginRight: 8 }} />
                1. 复杂业务逻辑
              </Title>
              <Paragraph>
                当业务逻辑超出平台标准能力时，需要自定义开发：
              </Paragraph>
              <ul>
                <li>
                  <strong>批量操作</strong>：批量修改、批量导入导出等
                </li>
                <li>
                  <strong>复杂校验</strong>：写入数据表之前有复杂的业务逻辑校验
                </li>
                <li>
                  <strong>特殊算法</strong>：字段值有特殊算法处理，例如加盐的
                  MD5 加密
                </li>
              </ul>
              <div style={{ marginTop: 16, padding: 12, background: "#f5f5f5", borderRadius: 4 }}>
                <Text code>
                  {`// 示例：复杂业务逻辑
if (data.password) {
  data.password = md5(data.password + salt);
}
// 自定义校验逻辑
validateBusinessRules(data);`}
                </Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ height: "100%" }}>
              <Title level={4}>
                <BuildOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                2. 个性化页面设计
              </Title>
              <Paragraph>
                需要定制化的页面展示和交互：
              </Paragraph>
              <ul>
                <li>
                  <strong>数据大屏</strong>：可视化数据展示，实时监控
                </li>
                <li>
                  <strong>自定义 UI</strong>：独特的页面设计和交互体验
                </li>
                <li>
                  <strong>特殊布局</strong>：不符合标准模板的页面结构
                </li>
              </ul>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ height: "100%" }}>
              <Title level={4}>
                <CloudServerOutlined
                  style={{ color: "#fa8c16", marginRight: 8 }}
                />
                3. H5、小程序开发
              </Title>
              <Paragraph>
                移动端应用开发需求：
              </Paragraph>
              <Alert
                message="当前 Lovrabet 体系暂不支持 H5/小程序开发（计划 2026 年 Q2 可支持）"
                type="warning"
                style={{ marginTop: 16 }}
              />
              <Paragraph style={{ marginTop: 16 }}>
                如需开发 H5 或小程序，需要通过二次开发实现。
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card size="small" style={{ height: "100%" }}>
              <Title level={4}>
                <SyncOutlined style={{ color: "#eb2f96", marginRight: 8 }} />
                4. 其他扩展需求
              </Title>
              <Paragraph>其他需要自定义开发的场景：</Paragraph>
              <ul>
                <li>
                  <strong>第三方集成</strong>：与外部系统对接
                </li>
                <li>
                  <strong>行业算法</strong>：特定行业的业务算法
                </li>
                <li>
                  <strong>特殊功能</strong>：平台未提供的功能模块
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 三个核心工具 */}
      <Card style={{ marginTop: 24 }}>
        <Title level={2}>
          <ThunderboltOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          三个核心工具
        </Title>
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{
                border: "2px solid #1890ff",
                height: "100%",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <ToolOutlined style={{ fontSize: 64, color: "#1890ff" }} />
              </div>
              <Title level={3} style={{ textAlign: "center" }}>
                Lovrabet CLI
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                脚手架工具，快速创建和管理前端应用项目
              </Paragraph>
              <Divider />
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                  <Text>一键创建项目</Text>
                </div>
                <div>
                  <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                  <Text>自动生成 API 配置</Text>
                </div>
                <div>
                  <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                  <Text>菜单智能同步</Text>
                </div>
              </Space>
              <div style={{ marginTop: 16, textAlign: "center" }}>
                <Button
                  type="primary"
                  href="https://open.lovrabet.com/docs/category/lovrabet-cli"
                  target="_blank"
                >
                  查看文档 <LinkOutlined />
                </Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{
                border: "2px solid #52c41a",
                height: "100%",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <ApiOutlined style={{ fontSize: 64, color: "#52c41a" }} />
              </div>
              <Title level={3} style={{ textAlign: "center" }}>
                Lovrabet SDK
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                Node.js SDK，简化前端 API 集成和数据访问
              </Paragraph>
              <Divider />
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                  <Text>类型安全的 API</Text>
                </div>
                <div>
                  <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                  <Text>自动处理认证</Text>
                </div>
                <div>
                  <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                  <Text>支持复杂查询</Text>
                </div>
              </Space>
              <div style={{ marginTop: 16, textAlign: "center" }}>
                <Button
                  type="primary"
                  href="https://open.lovrabet.com/docs/category/lovrabet-node-sdk"
                  target="_blank"
                >
                  查看文档 <LinkOutlined />
                </Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{
                border: "2px solid #fa8c16",
                height: "100%",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 16 }}>
                <RobotOutlined style={{ fontSize: 64, color: "#fa8c16" }} />
              </div>
              <Title level={3} style={{ textAlign: "center" }}>
                Lovrabet MCP
              </Title>
              <Paragraph style={{ textAlign: "center" }}>
                AI 辅助开发服务，让 AI 深度理解您的数据结构
              </Paragraph>
              <Divider />
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                  <Text>智能代码生成</Text>
                </div>
                <div>
                  <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                  <Text>理解业务上下文</Text>
                </div>
                <div>
                  <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 8 }} />
                  <Text>提升开发效率</Text>
                </div>
              </Space>
              <div style={{ marginTop: 16, textAlign: "center" }}>
                <Button
                  type="primary"
                  href="https://open.lovrabet.com/docs/mcp/intro"
                  target="_blank"
                >
                  查看文档 <LinkOutlined />
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 5分钟快速开始 */}
      <Card style={{ marginTop: 24 }}>
        <Title level={2}>
          <PlayCircleOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          5 分钟快速开始
        </Title>
        <Steps
          direction="vertical"
          size="small"
          items={[
            {
              title: "安装 CLI 工具",
              description: (
                <div>
                  <Text code>npm install -g @lovrabet/cli</Text>
                </div>
              ),
              icon: <SettingOutlined />,
            },
            {
              title: "创建项目",
              description: (
                <div>
                  <Text code>lovrabet create my-app</Text>
                </div>
              ),
              icon: <BuildOutlined />,
            },
            {
              title: "生成 API 配置",
              description: (
                <div>
                  <Text code>lovrabet api pull --appcode your-app-code</Text>
                </div>
              ),
              icon: <SyncOutlined />,
            },
            {
              title: "开始开发",
              description: (
                <div>
                  <Text code>cd my-app && npm start</Text>
                </div>
              ),
              icon: <RocketOutlined />,
            },
          ]}
        />
      </Card>

      {/* Bilibili 视频 */}
      <Card style={{ marginTop: 24 }}>
        <Title level={2}>
          <PlayCircleOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          视频教程
        </Title>
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%", // 16:9 aspect ratio
            height: 0,
            overflow: "hidden",
            borderRadius: 8,
            background: "#000",
            marginTop: 16,
          }}
        >
          <iframe
            src="//player.bilibili.com/player.html?isOutside=true&aid=115291971391698&bvid=BV1rBn2zvE8W&cid=32740478316&p=1"
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          ></iframe>
        </div>
      </Card>

      {/* 文档和资源 */}
      <Card style={{ marginTop: 24 }}>
        <Title level={2}>
          <FileTextOutlined style={{ color: "#1890ff", marginRight: 8 }} />
          文档和资源
        </Title>
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <FileTextOutlined style={{ fontSize: 32, color: "#1890ff" }} />
              <Title level={4}>CLI 文档</Title>
              <Paragraph>
                <a
                  href="https://open.lovrabet.com/docs/category/lovrabet-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  查看完整文档 <LinkOutlined />
                </a>
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <FileTextOutlined style={{ fontSize: 32, color: "#52c41a" }} />
              <Title level={4}>SDK 文档</Title>
              <Paragraph>
                <a
                  href="https://open.lovrabet.com/docs/category/lovrabet-node-sdk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  查看完整文档 <LinkOutlined />
                </a>
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <FileTextOutlined style={{ fontSize: 32, color: "#fa8c16" }} />
              <Title level={4}>MCP 文档</Title>
              <Paragraph>
                <a
                  href="https://open.lovrabet.com/docs/mcp/intro"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  查看完整文档 <LinkOutlined />
                </a>
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default IntroPage;


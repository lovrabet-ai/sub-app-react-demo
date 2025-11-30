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
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

function HomePage() {
  return (
    <div style={{ padding: "24px", maxWidth: "1400px", margin: "0 auto" }}>
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

      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", marginTop: 24 }}
      >
        {/* 为什么需要二次开发 */}
        <Card>
          <Title level={2} style={{ marginBottom: 24 }}>
            <BulbOutlined style={{ color: "#1890ff" }} /> 为什么需要二次开发？
          </Title>
          <Alert
            message="AI + 人类：各展所长的协作模式"
            description={
              <Paragraph style={{ marginBottom: 0 }}>
                <Text strong>我们的设计理念</Text>：Lovrabet
                不是要替代人类开发者，而是成为你的得力助手。 AI 处理 80%
                的标准功能，你专注 20% 的核心价值。
              </Paragraph>
            }
            type="info"
            showIcon
            style={{ marginBottom: 24 }}
          />

          <Title level={3} style={{ marginBottom: 16 }}>
            🔴 暂时（截止 2025-11-30）无法通过 AI 实现，需要二次开发的场景
          </Title>
          <Paragraph style={{ fontSize: 15, color: "#666", marginBottom: 24 }}>
            以下场景是 Lovrabet AI 当前无法覆盖的，必须通过扩展开发来实现：
          </Paragraph>

          <Row gutter={[16, 16]}>
            {/* 场景一：复杂业务逻辑 */}
            <Col xs={24} md={12}>
              <Card
                size="small"
                style={{
                  background: "#fefefe",
                  border: "2px solid #999999",
                  height: "100%",
                }}
                hoverable
              >
                <Title level={4} style={{ marginTop: 0, color: "#fa8c16" }}>
                  <CodeOutlined /> 场景一：复杂业务逻辑
                </Title>
                <Paragraph style={{ fontSize: 14, lineHeight: 1.8 }}>
                  <Text strong>典型需求：</Text>
                </Paragraph>
                <ul
                  style={{
                    fontSize: 13,
                    lineHeight: 2,
                    color: "#666",
                    paddingLeft: 20,
                    marginBottom: 16,
                  }}
                >
                  <li>
                    <Text strong>批量数据操作</Text> -
                    批量修改多条记录，每条记录需要不同的业务规则校验
                  </li>
                  <li>
                    <Text strong>复杂数据校验</Text> -
                    写入数据表之前需要执行复杂的业务逻辑校验（如跨表验证、条件判断等）
                  </li>
                  <li>
                    <Text strong>特殊算法处理</Text> -
                    字段值需要特殊算法处理，例如加盐的 MD5
                    加密、自定义哈希算法等
                  </li>
                  <li>
                    <Text strong>数据转换</Text> -
                    写入前需要复杂的数据格式转换、计算、关联处理
                  </li>
                </ul>
                <Alert
                  message="计划支持"
                  description={
                    <div>
                      <Text>
                        Lovrabet 体系计划在 <Text strong>2025 年 12月</Text>
                        通过边缘函数支持
                      </Text>
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          在此之前，需要通过扩展开发来实现复杂业务逻辑。
                        </Text>
                      </div>
                    </div>
                  }
                  type="warning"
                  showIcon
                  style={{ marginTop: 8 }}
                />
              </Card>
            </Col>

            {/* 场景二：个性化页面设计 */}
            <Col xs={24} md={12}>
              <Card
                size="small"
                style={{
                  background: "#f0f9ff",
                  border: "2px solid #91d5ff",
                  height: "100%",
                }}
                hoverable
              >
                <Title level={4} style={{ marginTop: 0, color: "#1890ff" }}>
                  <CloudServerOutlined /> 场景二：个性化页面设计
                </Title>
                <Paragraph style={{ fontSize: 14, lineHeight: 1.8 }}>
                  <Text strong>典型需求：</Text>
                </Paragraph>
                <ul
                  style={{
                    fontSize: 13,
                    lineHeight: 2,
                    color: "#666",
                    paddingLeft: 20,
                    marginBottom: 16,
                  }}
                >
                  <li>
                    <Text strong>数据大屏</Text> -
                    全屏数据可视化大屏，包含实时图表、动画效果、自定义布局
                  </li>
                  <li>
                    <Text strong>定制化 UI</Text> -
                    特殊的交互设计，如拖拽式看板、可视化网络图、3D 展示等
                  </li>
                  <li>
                    <Text strong>专业组件</Text> - 需要集成专业 UI 库（如
                    ECharts、G6、Three.js 等）
                  </li>
                  <li>
                    <Text strong>品牌定制</Text> -
                    完全符合企业品牌风格的页面设计
                  </li>
                </ul>
                <Alert
                  message="计划支持"
                  description={
                    <div>
                      <Text>
                        Lovrabet 体系计划在 <Text strong>2025 年 12月</Text>到
                        <Text strong>2026 年 Q1</Text> 陆续升级支持
                      </Text>
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          在此之前，需要通过扩展开发来实现个性化页面设计。
                        </Text>
                      </div>
                    </div>
                  }
                  type="warning"
                  showIcon
                  style={{ marginTop: 8 }}
                />
              </Card>
            </Col>

            {/* 场景三：H5、小程序 */}
            <Col xs={24} md={12}>
              <Card
                size="small"
                style={{
                  background: "#f6ffed",
                  border: "2px solid #b7eb8f",
                  height: "100%",
                }}
                hoverable
              >
                <Title level={4} style={{ marginTop: 0, color: "#52c41a" }}>
                  <ThunderboltOutlined /> 场景三：H5、小程序
                </Title>
                <Paragraph style={{ fontSize: 14, lineHeight: 1.8 }}>
                  <Text strong>当前限制：</Text>
                </Paragraph>
                <ul
                  style={{
                    fontSize: 13,
                    lineHeight: 2,
                    color: "#666",
                    paddingLeft: 20,
                    marginBottom: 16,
                  }}
                >
                  <li>
                    <Text strong>workbench、大屏等页面</Text>{" "}
                    B端管理后台的workbench工作台首页之类
                  </li>
                  <li>
                    <Text strong>H5 应用</Text> - 移动端 H5
                    页面，需要响应式设计和移动端优化
                  </li>
                  <li>
                    <Text strong>微信小程序</Text> -
                    微信小程序开发，需要符合小程序规范
                  </li>
                  <li>
                    <Text strong>其他小程序</Text> - 支付宝、抖音等平台小程序
                  </li>
                  <li>
                    <Text strong>原生 App</Text> - React Native、Flutter
                    等跨平台应用
                  </li>
                </ul>
                <Alert
                  message="计划支持"
                  description={
                    <div>
                      <div>
                        <Text>
                          workbench体系计划在 <Text strong>2025 年 12月</Text>{" "}
                          支持
                        </Text>
                        <br />
                        <Text>
                          H5、小程序体系计划在 <Text strong>2026 年 Q2</Text>{" "}
                          支持 H5 和小程序开发。
                        </Text>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          在此之前，需要通过扩展开发来实现移动端应用。
                        </Text>
                      </div>
                    </div>
                  }
                  type="warning"
                  showIcon
                  style={{ marginTop: 8 }}
                />
              </Card>
            </Col>

            {/* 场景四：其他扩展场景 */}
            <Col xs={24} md={12}>
              <Card
                size="small"
                style={{
                  background: "#f9f0ff",
                  border: "2px solid #d3adf7",
                  height: "100%",
                }}
                hoverable
              >
                <Title level={4} style={{ marginTop: 0, color: "#722ed1" }}>
                  <ToolOutlined /> 场景四：其他扩展需求
                </Title>
                <Paragraph style={{ fontSize: 14, lineHeight: 1.8 }}>
                  <Text strong>其他常见场景：</Text>
                </Paragraph>
                <ul
                  style={{
                    fontSize: 13,
                    lineHeight: 2,
                    color: "#666",
                    paddingLeft: 20,
                    marginBottom: 0,
                  }}
                >
                  <li>
                    <Text strong>第三方系统集成</Text> -
                    与企业现有系统例如用友、金蝶、SAP等系统深度集成
                  </li>
                  <li>
                    <Text strong>行业专属算法</Text> -
                    接入自研的风控模型、诊断流程等专业算法
                  </li>
                  <li>
                    <Text strong>复杂审批流程</Text> -
                    多级审批、条件路由、会签等复杂工作流
                  </li>
                </ul>
                <Alert
                  message="计划支持"
                  description={
                    <div>
                      <Text>
                        Lovrabet 体系计划在 <Text strong>2025 年 Q1</Text>
                        陆续支持工作流引擎、审批引擎等复杂业务逻辑。
                      </Text>
                      <div style={{ marginTop: 8 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          在此之前，需要通过扩展开发来实现其他扩展需求。
                        </Text>
                      </div>
                    </div>
                  }
                  type="warning"
                  showIcon
                  style={{ marginTop: 8 }}
                />
              </Card>
            </Col>
          </Row>
        </Card>

        {/* 核心工具链 */}
        <Card>
          <Title level={2} style={{ marginBottom: 24 }}>
            <ToolOutlined style={{ color: "#1890ff" }} /> 三大核心工具
          </Title>
          <Row gutter={[16, 16]}>
            {/* CLI */}
            <Col xs={24} md={8}>
              <Card
                size="small"
                style={{ height: "100%", border: "2px solid #e6f7ff" }}
                hoverable
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  <div>
                    <ThunderboltOutlined
                      style={{
                        fontSize: 32,
                        color: "#1890ff",
                        marginBottom: 8,
                      }}
                    />
                    <Title level={4} style={{ margin: "8px 0" }}>
                      Lovrabet CLI
                    </Title>
                    <Text type="secondary">
                      脚手架工具，一键创建项目、生成 API 配置、同步菜单
                    </Text>
                  </div>
                  <Space wrap>
                    <Tag color="blue">项目创建</Tag>
                    <Tag color="green">API 生成</Tag>
                    <Tag color="orange">菜单同步</Tag>
                  </Space>
                  <div>
                    <Text strong>核心命令：</Text>
                    <div
                      style={{
                        marginTop: 8,
                        fontFamily: "monospace",
                        fontSize: 12,
                        background: "#f5f5f5",
                        padding: 8,
                        borderRadius: 4,
                      }}
                    >
                      <div>lovrabet create</div>
                      <div>lovrabet api pull</div>
                      <div>lovrabet menu sync</div>
                    </div>
                  </div>
                  <Button
                    type="link"
                    icon={<LinkOutlined />}
                    href="https://open.lovrabet.com/docs/lovrabet-cli"
                    target="_blank"
                    style={{ padding: 0 }}
                  >
                    查看 CLI 文档 →
                  </Button>
                </Space>
              </Card>
            </Col>

            {/* SDK */}
            <Col xs={24} md={8}>
              <Card
                size="small"
                style={{ height: "100%", border: "2px solid #f6ffed" }}
                hoverable
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  <div>
                    <ApiOutlined
                      style={{
                        fontSize: 32,
                        color: "#52c41a",
                        marginBottom: 8,
                      }}
                    />
                    <Title level={4} style={{ margin: "8px 0" }}>
                      Lovrabet SDK
                    </Title>
                    <Text type="secondary">
                      数据访问层，提供类型安全的 CRUD 操作和复杂查询
                    </Text>
                  </div>
                  <Space wrap>
                    <Tag color="green">TypeScript</Tag>
                    <Tag color="cyan">三种认证</Tag>
                    <Tag color="purple">复杂查询</Tag>
                  </Space>
                  <div>
                    <Text strong>核心特性：</Text>
                    <div
                      style={{
                        marginTop: 8,
                        fontFamily: "monospace",
                        fontSize: 12,
                        background: "#f5f5f5",
                        padding: 8,
                        borderRadius: 4,
                      }}
                    >
                      <div>• 类型安全</div>
                      <div>• 环境自适应</div>
                      <div>• 复杂过滤查询</div>
                    </div>
                  </div>
                  <Button
                    type="link"
                    icon={<LinkOutlined />}
                    href="https://open.lovrabet.com/docs/category/lovrabet-node-sdk"
                    target="_blank"
                    style={{ padding: 0 }}
                  >
                    查看 SDK 文档 →
                  </Button>
                </Space>
              </Card>
            </Col>

            {/* MCP */}
            <Col xs={24} md={8}>
              <Card
                size="small"
                style={{ height: "100%", border: "2px solid #fff2e8" }}
                hoverable
              >
                <Space
                  direction="vertical"
                  size="middle"
                  style={{ width: "100%" }}
                >
                  <div>
                    <RobotOutlined
                      style={{
                        fontSize: 32,
                        color: "#fa8c16",
                        marginBottom: 8,
                      }}
                    />
                    <Title level={4} style={{ margin: "8px 0" }}>
                      MCP Server
                    </Title>
                    <Text type="secondary">
                      AI 辅助开发，让 AI 理解你的业务数据结构，自动生成代码
                    </Text>
                  </div>
                  <Space wrap>
                    <Tag color="orange">AI 辅助</Tag>
                    <Tag color="red">智能生成</Tag>
                    <Tag color="magenta">效率提升</Tag>
                  </Space>
                  <div>
                    <Text strong>核心价值：</Text>
                    <div
                      style={{
                        marginTop: 8,
                        fontFamily: "monospace",
                        fontSize: 12,
                        background: "#f5f5f5",
                        padding: 8,
                        borderRadius: 4,
                      }}
                    >
                      <div>• 理解业务数据</div>
                      <div>• 自动生成代码</div>
                      <div>• 节省 50-80% 时间</div>
                    </div>
                  </div>
                  <Button
                    type="link"
                    icon={<LinkOutlined />}
                    href="https://open.lovrabet.com/docs/mcp/intro"
                    target="_blank"
                    style={{ padding: 0 }}
                  >
                    查看 MCP 文档 →
                  </Button>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* 开发流程指引 */}
        <Card>
          <Title level={2} style={{ marginBottom: 24 }}>
            <CodeOutlined style={{ color: "#1890ff" }} /> 5 分钟快速上手
          </Title>
          <Steps
            direction="vertical"
            size="small"
            items={[
              {
                title: "安装 CLI 并创建项目",
                description: (
                  <div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        background: "#f5f5f5",
                        padding: "8px 12px",
                        borderRadius: 4,
                        marginBottom: 8,
                      }}
                    >
                      npm install -g @lovrabet/cli
                      <br />
                      lovrabet create my-app
                    </div>
                    <Text type="secondary">
                      CLI 会自动生成项目结构、安装依赖、配置路由
                    </Text>
                  </div>
                ),
                icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
              },
              {
                title: "拉取 API 配置",
                description: (
                  <div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        background: "#f5f5f5",
                        padding: "8px 12px",
                        borderRadius: 4,
                        marginBottom: 8,
                      }}
                    >
                      cd my-app
                      <br />
                      lovrabet api pull --appcode your-app-code
                    </div>
                    <Text type="secondary">
                      自动扫描数据集，生成 SDK 配置文件和 TypeScript 类型
                    </Text>
                  </div>
                ),
                icon: <SyncOutlined style={{ color: "#1890ff" }} />,
              },
              {
                title: "配置 MCP（推荐）",
                description: (
                  <div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        background: "#f5f5f5",
                        padding: "8px 12px",
                        borderRadius: 4,
                        marginBottom: 8,
                      }}
                    >
                      {`{
  "mcpServers": {
    "lovrabet-dataset": {
      "command": "npx",
      "args": ["-y", "@lovrabet/dataset-mcp-server"],
      "env": {
        "DEFAULT_APP_CODE": "your-app-code"
      }
    }
  }
}`}
                    </div>
                    <Text type="secondary">
                      配置后，AI 工具（Claude、Cursor）就能理解你的业务数据
                    </Text>
                  </div>
                ),
                icon: <SettingOutlined style={{ color: "#fa8c16" }} />,
              },
              {
                title: "开始开发",
                description: (
                  <div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        background: "#f5f5f5",
                        padding: "8px 12px",
                        borderRadius: 4,
                        marginBottom: 8,
                      }}
                    >
                      lovrabet start
                      <br /># 或使用 AI 生成代码
                    </div>
                    <Text type="secondary">
                      启动开发服务器，使用 SDK 进行数据操作，或让 AI
                      帮你生成代码
                    </Text>
                  </div>
                ),
                icon: <PlayCircleOutlined style={{ color: "#722ed1" }} />,
              },
              {
                title: "同步菜单并部署",
                description: (
                  <div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        background: "#f5f5f5",
                        padding: "8px 12px",
                        borderRadius: 4,
                        marginBottom: 8,
                      }}
                    >
                      lovrabet menu sync
                      <br />
                      lovrabet build
                    </div>
                    <Text type="secondary">
                      一键同步菜单到主系统，构建生产版本并部署
                    </Text>
                  </div>
                ),
                icon: <BuildOutlined style={{ color: "#eb2f96" }} />,
              },
            ]}
          />

          {/* 视频教程 */}
          <div style={{ marginTop: 32 }}>
            <Title level={4} style={{ marginBottom: 16 }}>
              视频教程
            </Title>
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%", // 16:9 宽高比
                height: 0,
                overflow: "hidden",
                borderRadius: 8,
                background: "#000",
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
              />
            </div>
          </div>
        </Card>

        {/* 典型使用场景 */}
        <Card>
          <Title level={2} style={{ marginBottom: 24 }}>
            <CloudServerOutlined style={{ color: "#1890ff" }} /> 典型使用场景
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card
                size="small"
                style={{ background: "#f6ffed", border: "1px solid #b7eb8f" }}
              >
                <Title level={4} style={{ marginTop: 0 }}>
                  <CheckCircleOutlined style={{ color: "#52c41a" }} />{" "}
                  快速原型开发
                </Title>
                <Paragraph>
                  使用 CLI 一键创建项目，自动生成 API 配置，5
                  分钟内搭建完整的应用框架。 适合快速验证业务想法、构建 MVP
                  产品。
                </Paragraph>
                <Text code>lovrabet create → lovrabet api pull → 开始开发</Text>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                size="small"
                style={{ background: "#e6f7ff", border: "1px solid #91d5ff" }}
              >
                <Title level={4} style={{ marginTop: 0 }}>
                  <CheckCircleOutlined style={{ color: "#1890ff" }} /> AI
                  辅助开发
                </Title>
                <Paragraph>
                  配置 MCP 后，直接告诉 AI 你的需求，AI
                  理解数据结构后自动生成准确的代码。
                  复杂查询、数据关联、完整组件，一句话搞定。
                </Paragraph>
                <Text code>配置 MCP → 对话生成代码 → 一次通过</Text>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                size="small"
                style={{ background: "#fff2e8", border: "1px solid #ffd591" }}
              >
                <Title level={4} style={{ marginTop: 0 }}>
                  <CheckCircleOutlined style={{ color: "#fa8c16" }} />{" "}
                  微前端扩展
                </Title>
                <Paragraph>
                  作为子应用独立开发，使用 <Text code>lovrabet menu sync</Text>{" "}
                  一键同步到主系统。 保持代码独立，享受微前端架构的所有优势。
                </Paragraph>
                <Text code>独立开发 → menu sync → 无缝集成</Text>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                size="small"
                style={{ background: "#f9f0ff", border: "1px solid #d3adf7" }}
              >
                <Title level={4} style={{ marginTop: 0 }}>
                  <CheckCircleOutlined style={{ color: "#722ed1" }} />{" "}
                  企业级应用
                </Title>
                <Paragraph>
                  SDK 提供三种认证模式，支持服务端和浏览器环境。
                  完整的类型定义、复杂查询、SQL API，满足企业级应用的所有需求。
                </Paragraph>
                <Text code>多环境支持 → 类型安全 → 生产就绪</Text>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* 工具链优势对比 */}
        <Card>
          <Title level={2} style={{ marginBottom: 24 }}>
            <ThunderboltOutlined style={{ color: "#1890ff" }} /> 工具链优势
          </Title>
          <Alert
            message="完整的开发工具链，让开发效率提升 80%+"
            description={
              <div>
                <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                  <Col xs={24} sm={12} md={6}>
                    <div style={{ textAlign: "center" }}>
                      <Title level={2} style={{ color: "#52c41a", margin: 0 }}>
                        96%
                      </Title>
                      <Text type="secondary">项目初始化效率提升</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <div style={{ textAlign: "center" }}>
                      <Title level={2} style={{ color: "#1890ff", margin: 0 }}>
                        95%
                      </Title>
                      <Text type="secondary">API 集成效率提升</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <div style={{ textAlign: "center" }}>
                      <Title level={2} style={{ color: "#fa8c16", margin: 0 }}>
                        75%
                      </Title>
                      <Text type="secondary">CRUD 开发效率提升</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <div style={{ textAlign: "center" }}>
                      <Title level={2} style={{ color: "#eb2f96", margin: 0 }}>
                        98%
                      </Title>
                      <Text type="secondary">菜单配置效率提升</Text>
                    </div>
                  </Col>
                </Row>
              </div>
            }
            type="success"
            showIcon
            style={{ marginBottom: 16 }}
          />
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card
                size="small"
                style={{ background: "#fffbe6", border: "1px solid #ffe58f" }}
              >
                <Title level={5} style={{ marginTop: 0 }}>
                  ❌ 没有工具链
                </Title>
                <ul style={{ color: "#666", paddingLeft: 20 }}>
                  <li>从零搭建项目，配置路由、构建工具</li>
                  <li>查文档，手写 HTTP 请求代码</li>
                  <li>AI 不理解业务，生成的代码不可用</li>
                  <li>手动配置菜单，容易遗漏</li>
                  <li>需要自己搭建开发服务器</li>
                </ul>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                size="small"
                style={{ background: "#f6ffed", border: "1px solid #b7eb8f" }}
              >
                <Title level={5} style={{ marginTop: 0 }}>
                  ✅ 有完整工具链
                </Title>
                <ul style={{ color: "#666", paddingLeft: 20 }}>
                  <li>
                    <Text code>lovrabet create</Text> 一键创建项目
                  </li>
                  <li>
                    <Text code>lovrabet api pull</Text> 自动生成 API 配置
                  </li>
                  <li>MCP 让 AI 深度理解数据结构</li>
                  <li>
                    <Text code>lovrabet menu sync</Text> 一键同步菜单
                  </li>
                  <li>
                    <Text code>lovrabet start</Text> 热更新开发服务器
                  </li>
                </ul>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* 快速链接和资源 */}

        {/* 提示信息 */}
        <Alert
          message="💡 提示"
          description={
            <div>
              <Text>
                本项目是使用 Lovrabet CLI 创建的演示项目，展示了完整的 BaaS
                开发体系。 所有代码示例都经过实际测试，可以直接参考使用。
              </Text>
              <div style={{ marginTop: 12 }}>
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    href="https://open.lovrabet.com/docs/lovrabet-cli/quickstart"
                    target="_blank"
                  >
                    开始使用 CLI
                  </Button>
                  <Button
                    size="small"
                    href="https://open.lovrabet.com"
                    target="_blank"
                  >
                    查看完整文档
                  </Button>
                </Space>
              </div>
            </div>
          }
          type="info"
          showIcon
        />
      </Space>
    </div>
  );
}

export default HomePage;

/**
 * Title: Rabetbase 开发指南
 */
import React from "react";
import { Typography, Card, Row, Col, Button, Tabs, Alert, Space, Tag } from "antd";
import {
  CodeOutlined,
  RobotOutlined,
  ToolOutlined,
  BookOutlined,
  ArrowRightOutlined,
  CopyOutlined,
  CheckOutlined,
  RocketOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

// 可复制的代码块
function CopyableCode({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text type="secondary">{label}</Text>
        <Button
          type="primary"
          size="small"
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleCopy}
        >
          {copied ? "已复制" : "复制"}
        </Button>
      </div>
      <pre
        style={{
          background: "#1e1e1e",
          borderRadius: 8,
          padding: "16px 20px",
          margin: 0,
          fontFamily: "'JetBrains Mono', 'Monaco', monospace",
          fontSize: 13,
          lineHeight: 1.6,
          color: "#e4e4e7",
          overflowX: "auto",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

// 从 api.ts 提取 appCode
function getAppCodeFromApi(content: string): string | null {
  const match =
    content.match(/LOVRABET_APP_CODE\s*=\s*["']([^"']+)["']/) ||
    content.match(/appCode:\s*["']([^"']+)["']/);
  return match ? match[1] : null;
}

function HomePage() {
  const [appCode, setAppCode] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadAppCode = async () => {
      try {
        const modules = import.meta.glob("/src/api/*.ts", {
          query: "?raw",
          import: "default",
        });
        const apiPath = "/src/api/api.ts";

        if (apiPath in modules) {
          const content = await modules[apiPath]();
          const code = getAppCodeFromApi(content as string);
          setAppCode(code);
        }
      } catch (err) {
        console.error("加载 api.ts 失败:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAppCode();
  }, []);

  // 检查是否已配置
  const isNotSet = appCode === "NOT-SET" || appCode === null;
  const displayAppCode = isNotSet ? "your-app-code" : appCode;

  const mcpConfig = `{
  "mcpServers": {
    "lovrabet-dataset": {
      "command": "npx",
      "args": ["-y", "@lovrabet/dataset-mcp-server"],
      "env": {
        "LOVRABET_APP_CODE": "${displayAppCode}"
      }
    }
  }
}`;

  const cliCode = `# 拉取最新 API 配置
lovrabet api pull

# 微前端子应用同步菜单
lovrabet menu sync`;

  const configTabs = [
    {
      key: "mcp",
      label: (
        <span>
          <RobotOutlined /> MCP 配置
        </span>
      ),
      children: (
        <div>
          <Paragraph>Claude Desktop 配置：</Paragraph>
          <Paragraph style={{ fontSize: 12, color: "#666" }}>
            配置文件路径：
            <br />
            macOS: ~/Library/Application
            Support/Claude/claude_desktop_config.json
            <br />
            Windows: %APPDATA%/Claude/claude_desktop_config.json
          </Paragraph>
          <CopyableCode code={mcpConfig} label="claude_desktop_config.json" />

          <Paragraph style={{ marginTop: 16 }}>Cursor 配置：</Paragraph>
          <Paragraph style={{ fontSize: 12, color: "#666" }}>
            设置 → MCP → 添加服务器
          </Paragraph>
          <CopyableCode
            code={`// Cursor MCP 配置
{
  "mcpServers": {
    "lovrabet-dataset": {
      "command": "npx",
      "args": ["-y", "@lovrabet/dataset-mcp-server"],
      "env": {
        "LOVRABET_APP_CODE": "${displayAppCode}"
      }
    }
  }
}`}
            label="Cursor MCP 配置"
          />

          <Paragraph style={{ marginTop: 16 }}>
            Claude Code (VS Code 扩展)：
          </Paragraph>
          <CopyableCode
            code={`claude mcp add lovrabet-dataset npx @lovrabet/dataset-mcp-server@latest -e LOVRABET_APP_CODE=${displayAppCode}`}
            label="Claude Code 终端命令"
          />

          <Button
            type="link"
            href="https://open.lovrabet.com/docs/mcp/intro"
            target="_blank"
          >
            查看完整文档 <ArrowRightOutlined />
          </Button>
        </div>
      ),
    },
    {
      key: "cli",
      label: (
        <span>
          <ToolOutlined /> CLI 命令
        </span>
      ),
      children: (
        <div>
          <Paragraph>常用 CLI 命令：</Paragraph>
          <CopyableCode code={cliCode} label="终端命令" />
          <Button
            type="link"
            href="https://open.lovrabet.com/docs/lovrabet-cli/quickstart"
            target="_blank"
          >
            查看完整文档 <ArrowRightOutlined />
          </Button>
        </div>
      ),
    },
  ];

  const docLinks = [
    {
      title: "入门指南",
      icon: <RocketOutlined />,
      links: [
        {
          label: "5 分钟上手指引",
          url: "https://open.lovrabet.com/docs/guides/step-guide",
        },
        {
          label: "开发者工具全景",
          url: "https://open.lovrabet.com/docs/guides/toolchain",
        },
        { label: "常见问题", url: "https://open.lovrabet.com/docs/guides/faq" },
      ],
    },
    {
      title: "开发文档",
      icon: <BookOutlined />,
      links: [
        {
          label: "TypeScript SDK",
          url: "https://open.lovrabet.com/docs/lovrabet-sdk/intro",
        },
        {
          label: "Java SDK",
          url: "https://open.lovrabet.com/docs/java-opensdk/quickstart",
        },
        {
          label: "OpenAPI",
          url: "https://open.lovrabet.com/docs/openapi/intro",
        },
        { label: "MCP", url: "https://open.lovrabet.com/docs/mcp/intro" },
        {
          label: "Backend Function",
          url: "https://open.lovrabet.com/docs/guides/best-practices",
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      {/* 标题区 */}
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <Title level={2} style={{ margin: 0 }}>
              Rabetbase 开发指南
            </Title>
            <Paragraph style={{ color: "#666", marginTop: 8, marginBottom: 0 }}>
              基于 Lovrabet 平台的后端即服务（BaaS）
            </Paragraph>
          </div>
          <Space size="middle">
            <a
              href="https://open.lovrabet.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rabetbase官网
            </a>
            <a
              href="https://open.lovrabet.com/docs/changelog"
              target="_blank"
              rel="noopener noreferrer"
            >
              更新日志
            </a>
            {!isNotSet && appCode && (
              <a
                href={`https://app.lovrabet.com/app/${appCode}/data/intro/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                应用配置后台
              </a>
            )}
          </Space>
        </div>
      </div>

      {/* Rabetbase 介绍卡片 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[24, 16]} align="middle">
          <Col xs={24} lg={16}>
            <Title level={3} style={{ marginBottom: 12 }}>
              什么是 Rabetbase？
            </Title>
            <Paragraph style={{ fontSize: 15, marginBottom: 16, color: "#595959" }}>
              <strong>Rabetbase 是 Lovrabet 面向技术岗位的开发者平台。</strong>
              <br />
              Lovrabet 工作台让业务人员用 AI 生成管理系统，但有些个性化需求（如小程序、ERP 对接、复杂业务逻辑）需要开发者介入。
              Rabetbase 把 Lovrabet 平台的数据能力开放出来，让开发者专注于写业务逻辑。
            </Paragraph>
            <Space wrap>
              <Button
                size="small"
                href="https://open.lovrabet.com/docs/category/openapi"
                target="_blank"
              >
                OpenAPI
              </Button>
              <Button
                size="small"
                href="https://open.lovrabet.com/docs/category/lovrabet-node-sdk"
                target="_blank"
              >
                TypeScript SDK
              </Button>
              <Button
                size="small"
                href="https://open.lovrabet.com/docs/category/java-opensdk"
                target="_blank"
              >
                Java SDK
              </Button>
              <Button
                size="small"
                href="https://open.lovrabet.com/docs/mcp/intro"
                target="_blank"
              >
                MCP
              </Button>
              <Button
                size="small"
                href="https://open.lovrabet.com/docs/lovrabet-cli/"
                target="_blank"
              >
                CLI 工具
              </Button>
            </Space>
          </Col>
          <Col xs={24} lg={8}>
            <div
              style={{
                background: "#f5f5f5",
                borderRadius: 8,
                padding: 20,
              }}
            >
              <Text style={{ fontSize: 14, display: "block", marginBottom: 12 }}>
                <strong>核心价值：</strong>
              </Text>
              <ul style={{ color: "#595959", margin: 0, paddingLeft: 20, fontSize: 14 }}>
                <li style={{ marginBottom: 8 }}>AI 自动理解业务模型</li>
                <li style={{ marginBottom: 8 }}>现成的 API 和 SDK</li>
                <li style={{ marginBottom: 8 }}>开发效率提升 2~5 倍</li>
                <li>你只需要专注写业务逻辑</li>
              </ul>
            </div>
          </Col>
        </Row>
      </Card>

      {/* 未配置提示 */}
      {isNotSet && !loading && (
        <Alert
          type="warning"
          icon={<ExclamationCircleOutlined />}
          message="项目尚未配置 AppCode"
          description={
            <div style={{ marginTop: 8 }}>
              <Paragraph style={{ marginBottom: 8 }}>
                请先执行以下命令初始化项目（替换{" "}
                <code>&lt;your-app-code&gt;</code> 为你的应用代码）：
              </Paragraph>
              <CopyableCode
                code={`# 1. 设置 AppCode
lovrabet config set app <your-app-code>

# 2. 拉取 API 配置
lovrabet api pull`}
                label="初始化命令"
              />
              <Paragraph style={{ marginBottom: 0 }}>
                执行完成后刷新页面即可。
              </Paragraph>
            </div>
          }
          style={{ marginBottom: 24 }}
        />
      )}

      {/* 配置代码 */}
      <Card style={{ marginBottom: 24 }}>
        <Tabs items={configTabs} />
      </Card>

      {/* 文档链接 */}
      <Row gutter={16}>
        {docLinks.map((section) => (
          <Col xs={24} md={12} key={section.title}>
            <Card style={{ height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                {section.icon}
                <Title level={4} style={{ margin: 0 }}>
                  {section.title}
                </Title>
              </div>
              {section.links.map((link) => (
                <div key={link.label}>
                  <Button
                    type="link"
                    href={link.url}
                    target="_blank"
                    style={{ padding: "8px 0" }}
                  >
                    {link.label} <ArrowRightOutlined />
                  </Button>
                </div>
              ))}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;

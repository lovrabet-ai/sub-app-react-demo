/**
 * Title: 子应用启动台
 */
import React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Card, Space, Tag, Typography } from "antd";
import {
  ApiOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
  BarChartOutlined,
  BookOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  CloudUploadOutlined,
  CodeOutlined,
  CopyOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  LinkOutlined,
  PlayCircleOutlined,
  RocketOutlined,
  SettingOutlined,
  ToolOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import styles from "./index.module.css";

const { Title, Paragraph, Text } = Typography;

interface CopyableCodeProps {
  code: string;
  label: string;
  compact?: boolean;
}

function CopyableCode({ code, label, compact = false }: CopyableCodeProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("复制失败:", err);
    }
  };

  return (
    <div
      className={`${styles.copyBlock} ${
        compact ? styles.copyBlockCompact : ""
      }`}
    >
      <div className={styles.copyHeader}>
        <Text type="secondary">{label}</Text>
        <Button
          size="small"
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleCopy}
          className={styles.copyButton}
        >
          {copied ? "已复制" : "复制"}
        </Button>
      </div>
      <pre className={styles.copyPre}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function getAppCodeFromApi(content: string): string | null {
  const match =
    content.match(/RABETBASE_APP_CODE\s*=\s*["']([^"']+)["']/) ||
    content.match(/LOVRABET_APP_CODE\s*=\s*["']([^"']+)["']/) ||
    content.match(/appCode:\s*["']([^"']+)["']/);
  return match ? match[1] : null;
}

const feishuDocs = {
  root: "https://qizhiyuntu.feishu.cn/wiki/EaApwb1Wpi2j0ykAkhNcya0ZnEh",
  onboarding:
    "https://qizhiyuntu.feishu.cn/wiki/T5gJwrcQqixLCikNYO2caZYDnsc",
  core: "https://qizhiyuntu.feishu.cn/wiki/S71hw5c2HiwyoHkLgyecKrI8n3M",
  systemPageSdk:
    "https://qizhiyuntu.feishu.cn/wiki/XCdWwnN7ViYOc0knRu8c411uneh",
  sdk: "https://qizhiyuntu.feishu.cn/wiki/B1PLw34AwiDtNmkCAlCcO3T2ngh",
};

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

  const isConfigured = !loading && appCode !== null && appCode !== "NOT-SET";
  const displayAppCode = isConfigured ? appCode : "your-app-code";
  const statusLabel = loading ? "读取中" : isConfigured ? "已配置" : "待配置";

  const setupPrompt = `请帮我检查当前 Lovrabet React 子应用的项目配置。
确认 AppCode、.rabetbase.json、SDK 模型文件和 src/api/client.ts 是否完整。
如果缺少配置，请按当前项目情况补齐，并告诉我可以用于页面开发的数据模型。`;

  const agentSurfaces = ["Claude Code", "Cursor", "Codex"];

  const docLinks = [
    {
      title: "Rabetbase CLI 文库",
      description: "从上手路径进入完整研发能力目录。",
      url: feishuDocs.root,
      icon: <BookOutlined />,
    },
    {
      title: "系统页面开发",
      description: "用 SDK 开发列表页、详情页、表单和看板。",
      url: feishuDocs.systemPageSdk,
      icon: <CodeOutlined />,
    },
    {
      title: "TypeScript SDK",
      description: "查看模型客户端、数据读写和类型使用方式。",
      url: feishuDocs.sdk,
      icon: <ApiOutlined />,
    },
  ];

  const taskGuides = [
    {
      title: "刚创建项目",
      description: "确认项目结构、AppCode、SDK 模型和本地启动方式。",
      action: "查看入门与上手",
      url: feishuDocs.onboarding,
      icon: <RocketOutlined />,
    },
    {
      title: "开发客户列表页",
      description: "让 Agent 基于数据模型生成筛选、表格、详情和表单。",
      action: "查看页面开发",
      url: feishuDocs.systemPageSdk,
      icon: <CodeOutlined />,
    },
    {
      title: "调用 SDK 读写数据",
      description: "确认模型别名、字段类型、filter、getOne 和写入接口。",
      action: "查看 SDK 文档",
      url: feishuDocs.sdk,
      icon: <ApiOutlined />,
    },
    {
      title: "做统计和看板",
      description: "把客户活跃度、跟进转化和销售机会做成指标视图。",
      action: "查看核心能力",
      url: feishuDocs.core,
      icon: <BarChartOutlined />,
    },
    {
      title: "封装服务端逻辑",
      description: "把稳定的写入、校验或聚合操作沉淀成可复用能力。",
      action: "查看核心能力",
      url: feishuDocs.core,
      icon: <DeploymentUnitOutlined />,
    },
    {
      title: "构建并发布",
      description: "检查构建产物、页面配置、菜单、路由和主应用接入。",
      action: "查看发布路径",
      url: feishuDocs.core,
      icon: <CloudUploadOutlined />,
    },
  ];

  const promptCards = [
    {
      title: "检查项目上下文",
      description:
        "让 Agent 识别 AppCode、项目配置和 SDK 模型，后续开发不再手动查接口。",
      icon: <SettingOutlined />,
      tags: ["项目配置", "模型同步"],
      prompt: setupPrompt,
      commands: [
        "rabetbase project init",
        "rabetbase config get",
        "rabetbase api pull",
      ],
      docUrl: feishuDocs.onboarding,
      docLabel: "入门与上手",
    },
    {
      title: "开发客户列表页",
      description:
        "用真实 CRM 场景描述页面目标，让 Agent 生成列表、筛选和详情交互。",
      icon: <PlayCircleOutlined />,
      tags: ["页面开发", "SDK 接入"],
      prompt: `请在当前 React 子应用里开发一个客户列表页。
页面需要支持按客户名称、负责人、客户等级和最近跟进时间筛选。
列表展示客户名称、联系人、负责人、客户等级、最近跟进时间和状态。
点击客户后打开详情抽屉，详情数据和列表数据都使用 @lovrabet/sdk。`,
      commands: [
        "rabetbase api pull",
        "rabetbase dataset list",
        "rabetbase dataset detail",
      ],
      docUrl: feishuDocs.systemPageSdk,
      docLabel: "系统页面开发",
    },
    {
      title: "接入客户编辑表单",
      description: "在列表页基础上补齐新增、编辑和字段校验，形成完整业务闭环。",
      icon: <CodeOutlined />,
      tags: ["表单开发", "写入校验"],
      prompt: `请给客户列表页增加新增客户和编辑客户能力。
先确认客户模型里可写字段、必填字段和选项字段。
表单需要包含客户名称、联系人、联系电话、客户等级、负责人和备注。
提交后使用 @lovrabet/sdk 写入数据，并刷新列表。`,
      commands: [
        "rabetbase dataset detail",
        "rabetbase dataset operations",
        "rabetbase api pull",
      ],
      docUrl: feishuDocs.sdk,
      docLabel: "TypeScript SDK",
    },
    {
      title: "改造销售看板",
      description: "把示例看板变成客户活跃度、跟进转化和销售机会分析页。",
      icon: <DashboardOutlined />,
      tags: ["二次开发", "统计看板"],
      prompt: `请把 /dashboard 改造成销售客户看板。
先读取当前 SDK 模型配置，确认客户、跟进记录和销售机会可用字段。
页面展示客户总数、本周新增客户、待跟进客户、销售机会金额和最近跟进列表。
不要写死模拟接口，优先使用项目里的 SDK 客户端。`,
      commands: [
        "rabetbase api pull",
        "rabetbase dataset detail",
        "rabetbase run build",
      ],
      docUrl: feishuDocs.systemPageSdk,
      docLabel: "系统页面开发",
    },
    {
      title: "发布接入主应用",
      description:
        "让 Agent 检查构建产物、Lovrabet 主应用接入方式、菜单和路由配置。",
      icon: <DeploymentUnitOutlined />,
      tags: ["构建检查", "主应用接入"],
      prompt: `请检查这个 React 子应用是否可以接入 Lovrabet 主应用。
确认构建产物、页面路由、basename、菜单同步和 import 加载配置。
如果发现缺口，请直接修复或列出需要我确认的项。`,
      commands: [
        "rabetbase run build",
        "rabetbase run preview",
        "rabetbase menu sync",
      ],
      docUrl: feishuDocs.core,
      docLabel: "核心研发能力",
    },
  ];

  const pageEntries = [
    {
      title: "SDK 演示",
      path: "/sdk-demo",
      description:
        "集中验证 filter、getOne、create、update、delete 等 SDK 调用。",
      icon: <ApiOutlined />,
      tags: ["SDK", "API"],
    },
    {
      title: "工作台",
      path: "/workbench",
      description: "面向日常运营的概览页结构，适合扩展成业务人员首页。",
      icon: <DashboardOutlined />,
      tags: ["运营", "概览"],
    },
    {
      title: "数据看板",
      path: "/dashboard",
      description: "用图表和指标卡展示业务数据，适合作为管理驾驶舱起点。",
      icon: <DatabaseOutlined />,
      tags: ["图表", "指标"],
    },
    {
      title: "数据大屏",
      path: "/data-screen",
      description: "全屏展示型页面示例，适合投屏、会议室和实时监控场景。",
      icon: <BarChartOutlined />,
      tags: ["大屏", "实时"],
    },
  ];

  const integrationSteps = [
    "让 Agent 确认当前项目上下文里已有 AppCode。",
    "让 Agent 刷新 SDK 类型，保持本地模型与平台数据模型一致。",
    "让 Agent 构建并检查可发布到 CDN 的静态产物。",
    "在 Lovrabet 主应用新增或更新页面，选择 import 接入方式。",
    "让 Agent 核对菜单、路由、basename 和主应用访问路径。",
  ];

  return (
    <main className={styles.homepage}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Tag color="blue" icon={<RocketOutlined />}>
            Agent-first Rabetbase Template
          </Tag>
          <Title level={1} className={styles.heroTitle}>
            用 Agent 开发 Lovrabet React 子应用
          </Title>
          <Paragraph className={styles.heroText}>
            这是可运行的 React 微前端模板。描述页面目标，Agent
            会读取项目上下文、调用 SDK、改页面并完成构建检查。
          </Paragraph>
          <div className={styles.surfaceRow}>
            {agentSurfaces.map((name) => (
              <Tag key={name}>{name}</Tag>
            ))}
          </div>
          <Space size={12} wrap className={styles.heroActions}>
            <Link to="/sdk-demo">
              <Button type="primary" icon={<ApiOutlined />}>
                查看 SDK 演示
              </Button>
            </Link>
            <Button
              href={feishuDocs.systemPageSdk}
              target="_blank"
              rel="noopener noreferrer"
              icon={<BookOutlined />}
            >
              页面开发文档
            </Button>
            <Button
              href={feishuDocs.sdk}
              target="_blank"
              rel="noopener noreferrer"
              icon={<LinkOutlined />}
            >
              SDK 文档
            </Button>
            {isConfigured && appCode && (
              <Button
                href={`https://app.lovrabet.com/app/${appCode}/data/intro/`}
                target="_blank"
                icon={<AppstoreOutlined />}
              >
                应用配置后台
              </Button>
            )}
          </Space>
        </div>

        <aside className={styles.statusPanel}>
          <div className={styles.statusHeader}>
            <div>
              <Text type="secondary">项目状态</Text>
              <Title level={2}>项目上下文</Title>
            </div>
            <Tag
              color={
                loading ? "processing" : isConfigured ? "success" : "warning"
              }
            >
              {statusLabel}
            </Tag>
          </div>
          <div className={styles.statusCode}>
            <Text type="secondary">AppCode</Text>
            <strong>{loading ? "读取中" : displayAppCode}</strong>
          </div>
          <div className={styles.statusGrid}>
            <div>
              <Text type="secondary">API 文件</Text>
              <strong>src/api/api.ts</strong>
            </div>
            <div>
              <Text type="secondary">路由模式</Text>
              <strong>src/pages 自动路由</strong>
            </div>
            <div>
              <Text type="secondary">SDK 客户端</Text>
              <strong>src/api/client.ts</strong>
            </div>
            <div>
              <Text type="secondary">推荐下一步</Text>
              <strong>开发客户列表页</strong>
            </div>
          </div>
          <div className={styles.statusLinks}>
            <Button
              block
              href={feishuDocs.systemPageSdk}
              target="_blank"
              rel="noopener noreferrer"
              icon={<BookOutlined />}
            >
              系统页面开发文档
            </Button>
            <Button
              block
              href={feishuDocs.root}
              target="_blank"
              rel="noopener noreferrer"
              icon={<LinkOutlined />}
            >
              Rabetbase 文库首页
            </Button>
          </div>
        </aside>
      </section>

      {!loading && !isConfigured && (
        <Alert
          type="warning"
          showIcon
          icon={<WarningOutlined />}
          className={styles.setupAlert}
          message="项目尚未配置 AppCode"
          description={
            <div className={styles.alertBody}>
              <Paragraph>
                直接把下面这段话发给 Claude Code、Cursor 或 Codex。Agent
                会根据项目情况补齐配置并刷新 SDK 模型。
              </Paragraph>
              <CopyableCode
                code={setupPrompt}
                label="可直接输入的 Prompt"
                compact
              />
            </div>
          }
        />
      )}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <Text type="secondary">飞书文库导航</Text>
            <Title level={2}>按任务选择下一步</Title>
          </div>
        </div>
        <div className={styles.taskGrid}>
          {taskGuides.map((item) => (
            <a
              key={item.title}
              className={styles.taskCard}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.iconBox}>{item.icon}</span>
              <span>
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </span>
              <em>
                {item.action} <ArrowRightOutlined />
              </em>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <Text type="secondary">在线文库</Text>
            <Title level={2}>常用入口</Title>
          </div>
        </div>
        <div className={styles.docGrid}>
          {docLinks.map((item) => (
            <a
              key={item.title}
              className={styles.docCard}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.routeIcon}>{item.icon}</span>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
              <em>
                打开文档 <ArrowRightOutlined />
              </em>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <Text type="secondary">AI 开发方式</Text>
            <Title level={2}>直接输入这些 Prompt</Title>
          </div>
          <Button
            href={feishuDocs.systemPageSdk}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ToolOutlined />}
          >
            查看页面开发文档
          </Button>
        </div>
        <div className={styles.promptGrid}>
          {promptCards.map((item) => (
            <Card key={item.title} className={styles.promptCard}>
              <div className={styles.cardHeading}>
                <span className={styles.iconBox}>{item.icon}</span>
                <div>
                  <Title level={3}>{item.title}</Title>
                  <Paragraph>{item.description}</Paragraph>
                </div>
              </div>
              <div className={styles.tagRow}>
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <div className={styles.commandList}>
                <Text type="secondary">AI 可能调用</Text>
                <div>
                  {item.commands.map((command) => (
                    <Text code key={command}>
                      {command}
                    </Text>
                  ))}
                </div>
              </div>
              <CopyableCode
                code={item.prompt}
                label="可直接输入的 Prompt"
                compact
              />
              <Button
                type="link"
                href={item.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineDocLink}
              >
                {item.docLabel} <ArrowRightOutlined />
              </Button>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <Text type="secondary">页面示例</Text>
            <Title level={2}>内置页面入口</Title>
          </div>
        </div>
        <div className={styles.pageGrid}>
          {pageEntries.map((entry) => (
            <Card key={entry.path} className={styles.routeCard}>
              <div className={styles.routeIcon}>{entry.icon}</div>
              <Title level={3}>{entry.title}</Title>
              <Paragraph>{entry.description}</Paragraph>
              <div className={styles.tagRow}>
                {entry.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <Link className={styles.routeLink} to={entry.path}>
                打开页面 <ArrowRightOutlined />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <Card className={styles.sectionCard}>
          <div className={styles.cardTitleLine}>
            <CloudUploadOutlined />
            <Title level={2}>接入主应用检查清单</Title>
          </div>
          <ol className={styles.checkList}>
            {integrationSteps.map((step) => (
              <li key={step}>
                <CheckCircleOutlined />
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card className={styles.sectionCard}>
          <div className={styles.cardTitleLine}>
            <ToolOutlined />
            <Title level={2}>Agent 开发提示</Title>
          </div>
          <Paragraph className={styles.mutedText}>
            日常开发时，直接描述业务页面、数据来源、交互方式和验收标准。
            Agent 会结合当前项目配置、SDK 模型和飞书文库完成实现。
          </Paragraph>
          <CopyableCode
            code={`请基于当前 Lovrabet React 子应用开发客户列表页。
先确认可用的客户数据模型和字段。
页面需要包含筛选、表格、详情抽屉和新增表单。
数据读写使用项目里的 @lovrabet/sdk，并在完成后运行构建检查。`}
            label="推荐起步 Prompt"
            compact
          />
        </Card>
      </section>
    </main>
  );
}

export default HomePage;

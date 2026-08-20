/**
 * Title: Sub-app launch pad
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
      console.error("Copy failed:", err);
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
          {copied ? "Copied" : "Copy"}
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
        console.error("Failed to load api.ts:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAppCode();
  }, []);

  const isConfigured = !loading && appCode !== null && appCode !== "NOT-SET";
  const displayAppCode = isConfigured ? appCode : "your-app-code";
  const statusLabel = loading ? "Loading" : isConfigured ? "Ready" : "Needs setup";

  const setupPrompt = `Please check the current Lovrabet React sub-app project setup.
Confirm that AppCode, .rabetbase.json, SDK model files, and src/api/client.ts are complete.
If anything is missing, fill it in for this project and tell me which data models I can use for page development.`;

  const agentSurfaces = ["Claude Code", "Cursor", "Codex"];

  const docLinks = [
    {
      title: "Rabetbase CLI docs",
      description: "Start from onboarding and open the full developer catalog.",
      url: feishuDocs.root,
      icon: <BookOutlined />,
    },
    {
      title: "System page development",
      description: "Build list, detail, form, and dashboard pages with the SDK.",
      url: feishuDocs.systemPageSdk,
      icon: <CodeOutlined />,
    },
    {
      title: "TypeScript SDK",
      description: "See model clients, data reads/writes, and TypeScript usage.",
      url: feishuDocs.sdk,
      icon: <ApiOutlined />,
    },
  ];

  const taskGuides = [
    {
      title: "Just created the project",
      description: "Confirm project structure, AppCode, SDK models, and local start.",
      action: "Open onboarding",
      url: feishuDocs.onboarding,
      icon: <RocketOutlined />,
    },
    {
      title: "Build a customer list page",
      description: "Have the agent generate filters, a table, details, and forms from models.",
      action: "Open page development",
      url: feishuDocs.systemPageSdk,
      icon: <CodeOutlined />,
    },
    {
      title: "Read and write with the SDK",
      description: "Confirm model aliases, field types, filter, getOne, and write APIs.",
      action: "Open SDK docs",
      url: feishuDocs.sdk,
      icon: <ApiOutlined />,
    },
    {
      title: "Build stats and dashboards",
      description: "Turn customer activity, follow-up conversion, and opportunities into metrics.",
      action: "Open core capabilities",
      url: feishuDocs.core,
      icon: <BarChartOutlined />,
    },
    {
      title: "Extract server-side logic",
      description: "Turn stable writes, validation, or aggregation into reusable capabilities.",
      action: "Open core capabilities",
      url: feishuDocs.core,
      icon: <DeploymentUnitOutlined />,
    },
    {
      title: "Build and publish",
      description: "Check build artifacts, page config, menus, routes, and host-app integration.",
      action: "Open the publish path",
      url: feishuDocs.core,
      icon: <CloudUploadOutlined />,
    },
  ];

  const promptCards = [
    {
      title: "Inspect project context",
      description:
        "Have the agent identify AppCode, project config, and SDK models so later work does not look up APIs by hand.",
      icon: <SettingOutlined />,
      tags: ["Project setup", "Model sync"],
      prompt: setupPrompt,
      commands: [
        "rabetbase project init",
        "rabetbase config get",
        "rabetbase api pull",
      ],
      docUrl: feishuDocs.onboarding,
      docLabel: "Onboarding",
    },
    {
      title: "Build a customer list page",
      description:
        "Describe a real CRM page and have the agent generate the list, filters, and detail interactions.",
      icon: <PlayCircleOutlined />,
      tags: ["Page development", "SDK"],
      prompt: `Please build a customer list page in this React sub-app.
The page should filter by customer name, owner, customer tier, and last follow-up time.
The table should show customer name, contact, owner, customer tier, last follow-up time, and status.
Clicking a customer opens a detail drawer. Use @lovrabet/sdk for both list and detail data.`,
      commands: [
        "rabetbase api pull",
        "rabetbase dataset list",
        "rabetbase dataset detail",
      ],
      docUrl: feishuDocs.systemPageSdk,
      docLabel: "System page development",
    },
    {
      title: "Add a customer edit form",
      description: "Add create, edit, and field validation on top of the list page to close the loop.",
      icon: <CodeOutlined />,
      tags: ["Forms", "Write validation"],
      prompt: `Please add create-customer and edit-customer to the customer list page.
First confirm writable, required, and option fields on the customer model.
The form should include customer name, contact, phone, customer tier, owner, and notes.
Submit with @lovrabet/sdk and refresh the list.`,
      commands: [
        "rabetbase dataset detail",
        "rabetbase dataset operations",
        "rabetbase api pull",
      ],
      docUrl: feishuDocs.sdk,
      docLabel: "TypeScript SDK",
    },
    {
      title: "Turn the dashboard into sales analytics",
      description: "Replace the sample dashboard with customer activity, follow-up conversion, and opportunity metrics.",
      icon: <DashboardOutlined />,
      tags: ["Customization", "Analytics"],
      prompt: `Please turn /dashboard into a sales customer dashboard.
First read the current SDK model config and confirm usable fields on customers, follow-ups, and opportunities.
Show total customers, new customers this week, customers pending follow-up, opportunity amount, and a recent follow-up list.
Do not hardcode mock APIs. Prefer the project's SDK client.`,
      commands: [
        "rabetbase api pull",
        "rabetbase dataset detail",
        "rabetbase run build",
      ],
      docUrl: feishuDocs.systemPageSdk,
      docLabel: "System page development",
    },
    {
      title: "Publish into the host app",
      description:
        "Have the agent check build artifacts, Lovrabet host-app integration, menus, and routes.",
      icon: <DeploymentUnitOutlined />,
      tags: ["Build check", "Host app"],
      prompt: `Please check whether this React sub-app can be loaded into the Lovrabet host app.
Confirm build artifacts, page routes, basename, menu sync, and import loading config.
If anything is missing, fix it or list the items I need to confirm.`,
      commands: [
        "rabetbase run build",
        "rabetbase run preview",
        "rabetbase menu sync",
      ],
      docUrl: feishuDocs.core,
      docLabel: "Core capabilities",
    },
  ];

  const pageEntries = [
    {
      title: "SDK demo",
      path: "/sdk-demo",
      description:
        "Exercise filter, getOne, create, update, and delete SDK calls in one place.",
      icon: <ApiOutlined />,
      tags: ["SDK", "API"],
    },
    {
      title: "Workbench",
      path: "/workbench",
      description: "An operations overview layout that can grow into a business home page.",
      icon: <DashboardOutlined />,
      tags: ["Operations", "Overview"],
    },
    {
      title: "Dashboard",
      path: "/dashboard",
      description: "Charts and metric cards for business data, a starting point for a management cockpit.",
      icon: <DatabaseOutlined />,
      tags: ["Charts", "Metrics"],
    },
    {
      title: "Data screen",
      path: "/data-screen",
      description: "A full-screen display example for projection, meeting rooms, and live monitoring.",
      icon: <BarChartOutlined />,
      tags: ["Display", "Realtime"],
    },
  ];

  const integrationSteps = [
    "Have the agent confirm AppCode is already in the current project context.",
    "Have the agent refresh SDK types so local models match the platform.",
    "Have the agent build and check static artifacts that can be published to CDN.",
    "Create or update a page in the Lovrabet host app using the import loading mode.",
    "Have the agent verify menus, routes, basename, and the host-app URL.",
  ];

  return (
    <main className={styles.homepage}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Tag color="blue" icon={<RocketOutlined />}>
            Agent-first Rabetbase Template
          </Tag>
          <Title level={1} className={styles.heroTitle}>
            Build Lovrabet React sub-apps with an agent
          </Title>
          <Paragraph className={styles.heroText}>
            This is a runnable React micro-frontend template. Describe the page goal; the agent
            reads project context, calls the SDK, edits pages, and runs build checks.
          </Paragraph>
          <div className={styles.surfaceRow}>
            {agentSurfaces.map((name) => (
              <Tag key={name}>{name}</Tag>
            ))}
          </div>
          <Space size={12} wrap className={styles.heroActions}>
            <Link to="/sdk-demo">
              <Button type="primary" icon={<ApiOutlined />}>
                Open the SDK demo
              </Button>
            </Link>
            <Button
              href={feishuDocs.systemPageSdk}
              target="_blank"
              rel="noopener noreferrer"
              icon={<BookOutlined />}
            >
              Page development docs
            </Button>
            <Button
              href={feishuDocs.sdk}
              target="_blank"
              rel="noopener noreferrer"
              icon={<LinkOutlined />}
            >
              SDK docs
            </Button>
            {isConfigured && appCode && (
              <Button
                href={`https://app.lovrabet.com/app/${appCode}/data/intro/`}
                target="_blank"
                icon={<AppstoreOutlined />}
              >
                App admin
              </Button>
            )}
          </Space>
        </div>

        <aside className={styles.statusPanel}>
          <div className={styles.statusHeader}>
            <div>
              <Text type="secondary">Project status</Text>
              <Title level={2}>Project context</Title>
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
            <strong>{loading ? "Loading" : displayAppCode}</strong>
          </div>
          <div className={styles.statusGrid}>
            <div>
              <Text type="secondary">API file</Text>
              <strong>src/api/api.ts</strong>
            </div>
            <div>
              <Text type="secondary">Routing</Text>
              <strong>src/pages file-based routes</strong>
            </div>
            <div>
              <Text type="secondary">SDK client</Text>
              <strong>src/api/client.ts</strong>
            </div>
            <div>
              <Text type="secondary">Suggested next step</Text>
              <strong>Build a customer list page</strong>
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
              System page development docs
            </Button>
            <Button
              block
              href={feishuDocs.root}
              target="_blank"
              rel="noopener noreferrer"
              icon={<LinkOutlined />}
            >
              Rabetbase docs home
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
          message="AppCode is not configured yet"
          description={
            <div className={styles.alertBody}>
              <Paragraph>
                Paste the prompt below into Claude Code, Cursor, or Codex. The agent
                will complete setup for this project and refresh SDK models.
              </Paragraph>
              <CopyableCode
                code={setupPrompt}
                label="Prompt you can paste"
                compact
              />
            </div>
          }
        />
      )}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <Text type="secondary">Feishu wiki</Text>
            <Title level={2}>Pick the next task</Title>
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
            <Text type="secondary">Docs</Text>
            <Title level={2}>Common entry points</Title>
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
                Open docs <ArrowRightOutlined />
              </em>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <Text type="secondary">AI workflow</Text>
            <Title level={2}>Paste these prompts</Title>
          </div>
          <Button
            href={feishuDocs.systemPageSdk}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ToolOutlined />}
          >
            Open page development docs
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
                <Text type="secondary">The agent may run</Text>
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
                label="Prompt you can paste"
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
            <Text type="secondary">Sample pages</Text>
            <Title level={2}>Built-in page entry points</Title>
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
                Open page <ArrowRightOutlined />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <Card className={styles.sectionCard}>
          <div className={styles.cardTitleLine}>
            <CloudUploadOutlined />
            <Title level={2}>Host-app integration checklist</Title>
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
            <Title level={2}>Agent development tips</Title>
          </div>
          <Paragraph className={styles.mutedText}>
            For day-to-day work, describe the business page, data source, interactions, and acceptance criteria.
            The agent will implement it using the current project config, SDK models, and Feishu docs.
          </Paragraph>
          <CopyableCode
            code={`Please build a customer list page on this Lovrabet React sub-app.
First confirm the available customer data model and fields.
The page should include filters, a table, a detail drawer, and a create form.
Use the project's @lovrabet/sdk for reads and writes, then run a build check.`}
            label="Recommended starter prompt"
            compact
          />
        </Card>
      </section>
    </main>
  );
}

export default HomePage;

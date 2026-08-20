import React from "react";
import { useNavigate } from "react-router-dom";
import DemoPageContainer from "@/components/demo-page-container/DemoPageContainer";
import styles from "./index.module.css";
import {
  DashboardOutlined,
  ApiOutlined,
  BarChartOutlined,
  FileTextOutlined,
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const mockData = {
  statistics: [
    {
      title: "Today visits",
      value: "1,256",
      icon: <UserOutlined />,
      trend: "+12.5%",
    },
    {
      title: "Pending orders",
      value: "89",
      icon: <ShoppingOutlined />,
      trend: "+8.3%",
    },
    {
      title: "Monthly revenue",
      value: "$896K",
      icon: <DollarOutlined />,
      trend: "+15.6%",
    },
    {
      title: "Completion rate",
      value: "89.5%",
      icon: <TrophyOutlined />,
      trend: "+3.2%",
    },
  ],
  quickActions: [
    {
      key: "/sdk-demo",
      title: "SDK demo",
      desc: "See SDK usage examples",
      icon: <ApiOutlined />,
    },
    {
      key: "/dashboard",
      title: "Dashboard",
      desc: "View business metrics",
      icon: <DashboardOutlined />,
    },
    {
      key: "/data-screen",
      title: "Data screen",
      desc: "Visual data display",
      icon: <BarChartOutlined />,
    },
    {
      key: "https://open.lovrabet.com",
      title: "Docs",
      desc: "Open the full documentation",
      icon: <FileTextOutlined />,
      external: true,
    },
  ],
  recentAccess: [
    { name: "SDK demo", path: "/sdk-demo", time: "2 hours ago" },
    { name: "Dashboard", path: "/dashboard", time: "5 hours ago" },
    { name: "Data screen", path: "/data-screen", time: "1 day ago" },
  ],
  todos: [
    {
      title: "Finish SDK integration docs",
      priority: "High",
      status: "pending",
      date: "2025-01-15",
    },
    {
      title: "Improve data-screen performance",
      priority: "Medium",
      status: "progress",
      date: "2025-01-20",
    },
    {
      title: "Update API docs",
      priority: "Low",
      status: "pending",
      date: "2025-01-25",
    },
  ],
  announcements: [
    {
      title: "SDK v1.1.22 released",
      content: "Added filter API support for complex queries",
      time: "2025-01-10",
    },
    {
      title: "CLI v1.1.15 update",
      content: "Improved menu sync, including non-ASCII menu names",
      time: "2025-01-08",
    },
    {
      title: "Docs center update",
      content: "Added API guides and best practices",
      time: "2025-01-05",
    },
  ],
};

const Workbench: React.FC = () => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    if (status === "done")
      return <CheckCircleOutlined style={{ color: "#34c759" }} />;
    if (status === "progress")
      return <ClockCircleOutlined style={{ color: "#007aff" }} />;
    return <ExclamationCircleOutlined style={{ color: "#ff9500" }} />;
  };

  const getPriorityClass = (priority: string) => {
    const map: Record<string, string> = { High: "high", Medium: "medium", Low: "low" };
    return map[priority] || "low";
  };

  return (
    <DemoPageContainer>
      <div className={styles.page}>
        {/* 欢迎区 */}
        <div className={styles.welcome}>
          <h2>Workbench</h2>
          <p>Welcome back. This is your development workbench.</p>
        </div>

        {/* 统计数据 - Bento Grid */}
        <div className={styles.bentoGrid}>
          {mockData.statistics.map((item, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statLabel}>{item.title}</div>
              <div className={styles.statValue}>{item.value}</div>
              <div className={styles.statTrend}>{item.trend} vs yesterday</div>
            </div>
          ))}
        </div>

        <div className={styles.row}>
          {/* 快捷操作 */}
          <div className={styles.card}>
            <div className={styles.cardHead}>Quick actions</div>
            <div className={styles.cardBody}>
              <div className={styles.actions}>
                {mockData.quickActions.map((item) => (
                  <div
                    key={item.key}
                    className={styles.actionItem}
                    onClick={() =>
                      item.external
                        ? window.open(item.key, "_blank")
                        : navigate(item.key)
                    }
                  >
                    <div className={styles.actionIcon}>{item.icon}</div>
                    <div className={styles.actionTitle}>{item.title}</div>
                    <div className={styles.actionDesc}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 最近访问 */}
          <div className={styles.card}>
            <div className={styles.cardHead}>Recent</div>
            <div className={styles.cardBody}>
              {mockData.recentAccess.map((item, i) => (
                <div
                  key={i}
                  className={styles.listItem}
                  onClick={() => navigate(item.path)}
                >
                  <div className={styles.listMain}>
                    <div className={styles.listAvatar}>
                      <FileTextOutlined />
                    </div>
                    <div>
                      <div className={styles.listName}>{item.name}</div>
                      <div className={styles.listTime}>{item.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 待办事项 */}
          <div className={styles.card}>
            <div className={styles.cardHead}>To-do</div>
            <div className={styles.cardBody}>
              {mockData.todos.map((item, i) => (
                <div key={i} className={styles.todoItem}>
                  <div className={styles.todoHeader}>
                    {getStatusIcon(item.status)}
                    <span className={styles.todoTitle}>{item.title}</span>
                    <span
                      className={`${styles.todoTag} ${styles.todoTag[getPriorityClass(item.priority)]}`}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <div className={styles.todoDate}>Due: {item.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 系统公告 */}
          <div className={styles.card}>
            <div className={styles.cardHead}>Announcements</div>
            <div className={styles.cardBody}>
              {mockData.announcements.map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineTitle}>{item.title}</div>
                  <div className={styles.timelineContent}>{item.content}</div>
                  <div className={styles.timelineTime}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DemoPageContainer>
  );
};

export default Workbench;

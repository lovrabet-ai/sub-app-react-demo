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
      title: "今日访问",
      value: "1,256",
      icon: <UserOutlined />,
      trend: "+12.5%",
    },
    {
      title: "待处理订单",
      value: "89",
      icon: <ShoppingOutlined />,
      trend: "+8.3%",
    },
    {
      title: "本月收入",
      value: "¥89.6万",
      icon: <DollarOutlined />,
      trend: "+15.6%",
    },
    {
      title: "完成率",
      value: "89.5%",
      icon: <TrophyOutlined />,
      trend: "+3.2%",
    },
  ],
  quickActions: [
    {
      key: "/sdk-demo",
      title: "SDK 演示",
      desc: "查看 SDK 使用示例",
      icon: <ApiOutlined />,
    },
    {
      key: "/dashboard",
      title: "数据看板",
      desc: "查看业务数据统计",
      icon: <DashboardOutlined />,
    },
    {
      key: "/data-screen",
      title: "数据大屏",
      desc: "可视化数据展示",
      icon: <BarChartOutlined />,
    },
    {
      key: "https://open.lovrabet.com",
      title: "查看文档",
      desc: "访问完整文档",
      icon: <FileTextOutlined />,
      external: true,
    },
  ],
  recentAccess: [
    { name: "SDK 演示", path: "/sdk-demo", time: "2 小时前" },
    { name: "数据看板", path: "/dashboard", time: "5 小时前" },
    { name: "数据大屏", path: "/data-screen", time: "1 天前" },
  ],
  todos: [
    {
      title: "完成 SDK 集成文档",
      priority: "高",
      status: "pending",
      date: "2025-01-15",
    },
    {
      title: "优化数据大屏性能",
      priority: "中",
      status: "progress",
      date: "2025-01-20",
    },
    {
      title: "更新 API 文档",
      priority: "低",
      status: "pending",
      date: "2025-01-25",
    },
  ],
  announcements: [
    {
      title: "SDK v1.1.22 版本发布",
      content: "新增 filter 接口支持，支持复杂条件查询",
      time: "2025-01-10",
    },
    {
      title: "CLI v1.1.15 版本更新",
      content: "优化菜单同步功能，支持中文菜单名",
      time: "2025-01-08",
    },
    {
      title: "文档中心更新",
      content: "新增 API 使用指南和最佳实践",
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
    const map: Record<string, string> = { 高: "high", 中: "medium", 低: "low" };
    return map[priority] || "low";
  };

  return (
    <DemoPageContainer>
      <div className={styles.page}>
        {/* 欢迎区 */}
        <div className={styles.welcome}>
          <h2>工作台</h2>
          <p>欢迎回来，这里是您的开发工作台</p>
        </div>

        {/* 统计数据 - Bento Grid */}
        <div className={styles.bentoGrid}>
          {mockData.statistics.map((item, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statLabel}>{item.title}</div>
              <div className={styles.statValue}>{item.value}</div>
              <div className={styles.statTrend}>{item.trend} 较昨日</div>
            </div>
          ))}
        </div>

        <div className={styles.row}>
          {/* 快捷操作 */}
          <div className={styles.card}>
            <div className={styles.cardHead}>快捷操作</div>
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
            <div className={styles.cardHead}>最近访问</div>
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
            <div className={styles.cardHead}>待办事项</div>
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
                  <div className={styles.todoDate}>截止：{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 系统公告 */}
          <div className={styles.card}>
            <div className={styles.cardHead}>系统公告</div>
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

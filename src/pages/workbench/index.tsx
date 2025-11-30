import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Space,
  Button,
  List,
  Avatar,
  Tag,
  Progress,
  Timeline,
  Empty,
} from "antd";
import {
  RocketOutlined,
  DashboardOutlined,
  ApiOutlined,
  BarChartOutlined,
  FileTextOutlined,
  SettingOutlined,
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

// Mock 数据
const mockData = {
  // 统计数据
  statistics: [
    {
      title: "今日访问",
      value: 1256,
      prefix: <UserOutlined />,
      color: "#1890ff",
      trend: "+12.5%",
    },
    {
      title: "待处理订单",
      value: 89,
      prefix: <ShoppingOutlined />,
      color: "#52c41a",
      trend: "+8.3%",
    },
    {
      title: "本月收入",
      value: 896523,
      prefix: <DollarOutlined />,
      color: "#fa8c16",
      suffix: "元",
      trend: "+15.6%",
    },
    {
      title: "完成率",
      value: 89.5,
      prefix: <TrophyOutlined />,
      color: "#eb2f96",
      suffix: "%",
      trend: "+3.2%",
    },
  ],

  // 快捷操作
  quickActions: [
    {
      key: "/sdk-demo",
      title: "SDK 演示",
      icon: <ApiOutlined />,
      description: "查看 SDK 使用示例",
      color: "#1890ff",
    },
    {
      key: "/dashboard",
      title: "数据看板",
      icon: <DashboardOutlined />,
      description: "查看业务数据统计",
      color: "#52c41a",
    },
    {
      key: "/data-screen",
      title: "数据大屏",
      icon: <BarChartOutlined />,
      description: "可视化数据展示",
      color: "#fa8c16",
    },
    {
      key: "https://open.lovrabet.com",
      title: "查看文档",
      icon: <FileTextOutlined />,
      description: "访问完整文档",
      color: "#722ed1",
      external: true,
    },
  ],

  // 最近访问
  recentAccess: [
    { name: "SDK 演示", path: "/sdk-demo", time: "2 小时前" },
    { name: "数据看板", path: "/dashboard", time: "5 小时前" },
    { name: "数据大屏", path: "/data-screen", time: "1 天前" },
  ],

  // 待办事项
  todos: [
    {
      id: 1,
      title: "完成 SDK 集成文档",
      priority: "high",
      status: "pending",
      dueDate: "2025-01-15",
    },
    {
      id: 2,
      title: "优化数据大屏性能",
      priority: "medium",
      status: "in-progress",
      dueDate: "2025-01-20",
    },
    {
      id: 3,
      title: "更新 API 文档",
      priority: "low",
      status: "pending",
      dueDate: "2025-01-25",
    },
  ],

  // 系统公告
  announcements: [
    {
      id: 1,
      title: "SDK v1.1.22 版本发布",
      content: "新增 filter 接口支持，支持复杂条件查询",
      time: "2025-01-10",
      type: "update",
    },
    {
      id: 2,
      title: "CLI v1.1.15 版本更新",
      content: "优化菜单同步功能，支持中文菜单名",
      time: "2025-01-08",
      type: "feature",
    },
    {
      id: 3,
      title: "文档中心更新",
      content: "新增 API 使用指南和最佳实践",
      time: "2025-01-05",
      type: "info",
    },
  ],
};

const Workbench: React.FC = () => {
  const navigate = useNavigate();
  const [todos] = useState(mockData.todos);

  const handleQuickAction = (action: any) => {
    if (action.external) {
      window.open(action.key, "_blank");
    } else {
      navigate(action.key);
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: "red",
      medium: "orange",
      low: "blue",
    };
    return colors[priority] || "default";
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed") {
      return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
    }
    if (status === "in-progress") {
      return <ClockCircleOutlined style={{ color: "#1890ff" }} />;
    }
    return <ExclamationCircleOutlined style={{ color: "#fa8c16" }} />;
  };

  const getAnnouncementIcon = (type: string) => {
    const icons: Record<string, any> = {
      update: <RocketOutlined style={{ color: "#1890ff" }} />,
      feature: <TrophyOutlined style={{ color: "#52c41a" }} />,
      info: <FileTextOutlined style={{ color: "#fa8c16" }} />,
    };
    return icons[type] || <FileTextOutlined />;
  };

  return (
    <div>
      {/* 欢迎区域 */}
      <Card
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          marginBottom: 24,
        }}
      >
        <Row align="middle" gutter={24}>
          <Col xs={24} md={16}>
            <Title level={2} style={{ color: "#fff", margin: 0 }}>
              <RocketOutlined /> 工作台
            </Title>
            <Paragraph style={{ color: "#fff", fontSize: 16, marginTop: 8, marginBottom: 0 }}>
              欢迎回来！这里是您的开发工作台，可以快速访问常用功能和查看系统状态。
            </Paragraph>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: "right" }}>
            <Space>
              <Button
                type="primary"
                size="large"
                icon={<FileTextOutlined />}
                href="https://open.lovrabet.com"
                target="_blank"
                style={{
                  background: "#fff",
                  color: "#667eea",
                  border: "none",
                }}
              >
                查看文档
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 统计数据 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {mockData.statistics.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={
                  <span style={{ color: stat.color, marginRight: 8 }}>
                    {stat.prefix}
                  </span>
                }
                suffix={stat.suffix}
                valueStyle={{ color: stat.color, fontSize: 24, fontWeight: "bold" }}
              />
              <div style={{ marginTop: 8, fontSize: 12, color: "#52c41a" }}>
                {stat.trend} 较昨日
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        {/* 快捷操作 */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <RocketOutlined style={{ color: "#1890ff" }} />
                <span>快捷操作</span>
              </Space>
            }
            style={{ height: "100%" }}
          >
            <Row gutter={[12, 12]}>
              {mockData.quickActions.map((action) => (
                <Col xs={12} sm={12} key={action.key}>
                  <Card
                    hoverable
                    onClick={() => handleQuickAction(action)}
                    style={{
                      textAlign: "center",
                      cursor: "pointer",
                      border: `1px solid ${action.color}20`,
                    }}
                    bodyStyle={{ padding: 16 }}
                  >
                    <div
                      style={{
                        fontSize: 32,
                        color: action.color,
                        marginBottom: 8,
                      }}
                    >
                      {action.icon}
                    </div>
                    <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                      {action.title}
                    </div>
                    <div style={{ fontSize: 12, color: "#666" }}>
                      {action.description}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* 最近访问 */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ClockCircleOutlined style={{ color: "#1890ff" }} />
                <span>最近访问</span>
              </Space>
            }
            style={{ height: "100%" }}
          >
            {mockData.recentAccess.length > 0 ? (
              <List
                dataSource={mockData.recentAccess}
                renderItem={(item) => (
                  <List.Item
                    style={{ cursor: "pointer", padding: "12px 0" }}
                    onClick={() => navigate(item.path)}
                    actions={[
                      <Button
                        type="link"
                        icon={<ArrowRightOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(item.path);
                        }}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            background: "#1890ff",
                          }}
                          icon={<FileTextOutlined />}
                        />
                      }
                      title={item.name}
                      description={
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {item.time}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="暂无访问记录" />
            )}
          </Card>
        </Col>

        {/* 待办事项 */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ExclamationCircleOutlined style={{ color: "#fa8c16" }} />
                <span>待办事项</span>
                <Tag color="red">{todos.filter((t) => t.status === "pending").length}</Tag>
              </Space>
            }
            style={{ height: "100%" }}
          >
            {todos.length > 0 ? (
              <List
                dataSource={todos}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={getStatusIcon(item.status)}
                      title={
                        <Space>
                          <span>{item.title}</span>
                          <Tag color={getPriorityColor(item.priority)}>
                            {item.priority === "high"
                              ? "高"
                              : item.priority === "medium"
                                ? "中"
                                : "低"}
                          </Tag>
                        </Space>
                      }
                      description={
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            截止日期：{item.dueDate}
                          </Text>
                          <div style={{ marginTop: 8 }}>
                            <Progress
                              percent={
                                item.status === "completed"
                                  ? 100
                                  : item.status === "in-progress"
                                    ? 50
                                    : 0
                              }
                              size="small"
                              status={
                                item.status === "completed" ? "success" : "active"
                              }
                            />
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="暂无待办事项" />
            )}
          </Card>
        </Col>

        {/* 系统公告 */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <FileTextOutlined style={{ color: "#1890ff" }} />
                <span>系统公告</span>
              </Space>
            }
            style={{ height: "100%" }}
          >
            <Timeline
              items={mockData.announcements.map((announcement) => ({
                dot: getAnnouncementIcon(announcement.type),
                children: (
                  <div>
                    <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                      {announcement.title}
                    </div>
                    <div style={{ color: "#666", fontSize: 13, marginBottom: 4 }}>
                      {announcement.content}
                    </div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {announcement.time}
                    </Text>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Workbench;


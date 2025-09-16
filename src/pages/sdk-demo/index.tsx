import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Space,
  Typography,
  Alert,
  Input,
  Form,
  Modal,
  message,
  Row,
  Col,
  Tag,
  Empty,
  Badge,
  Tooltip,
  Select,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  CalendarOutlined,
  FlagOutlined,
  BugOutlined,
  BulbOutlined,
  RocketOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { lovrabetClient } from "../../api/client";

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;
const { Option } = Select;

interface Requirement {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in_progress" | "done" | "cancelled";
  assignee?: string;
  created_at: string;
  type: "feature" | "bug" | "improvement";
  [key: string]: any;
}

const RequirementCard: React.FC<{ requirement: Requirement }> = ({
  requirement,
}) => {
  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "#52c41a",
      medium: "#faad14",
      high: "#ff7a45",
      urgent: "#f5222d",
    };
    return colors[priority as keyof typeof colors] || "#d9d9d9";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "#d9d9d9",
      in_progress: "#1890ff",
      done: "#52c41a",
      cancelled: "#f5222d",
    };
    return colors[status as keyof typeof colors] || "#d9d9d9";
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      feature: <RocketOutlined />,
      bug: <BugOutlined />,
      improvement: <BulbOutlined />,
    };
    return icons[type as keyof typeof icons] || <FlagOutlined />;
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: "待处理",
      in_progress: "进行中",
      done: "已完成",
      cancelled: "已取消",
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getPriorityText = (priority: string) => {
    const texts = {
      low: "低",
      medium: "中",
      high: "高",
      urgent: "紧急",
    };
    return texts[priority as keyof typeof texts] || priority;
  };

  return (
    <Card
      hoverable
      style={{
        marginBottom: 16,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid #f0f0f0",
        transition: "all 0.3s ease",
      }}
      styles={{ body: { padding: "20px" } }}
      actions={[
        <Tooltip title="查看详情" key="view">
          <EyeOutlined style={{ color: "#1890ff" }} />
        </Tooltip>,
        <Tooltip title="编辑" key="edit">
          <EditOutlined style={{ color: "#52c41a" }} />
        </Tooltip>,
        <Tooltip title="删除" key="delete">
          <DeleteOutlined style={{ color: "#ff4d4f" }} />
        </Tooltip>,
      ]}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${getPriorityColor(requirement.priority)}15, ${getPriorityColor(requirement.priority)}25)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: getPriorityColor(requirement.priority),
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          {getTypeIcon(requirement.type)}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 8,
            }}
          >
            <Text
              strong
              style={{
                fontSize: 16,
                color: "#262626",
                display: "block",
                lineHeight: 1.4,
              }}
            >
              {requirement.title ||
                requirement.name ||
                requirement.requirement_name ||
                `需求 ${requirement.id || "N/A"}`}
            </Text>
            <div
              style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 12 }}
            >
              <Tag
                color={getPriorityColor(requirement.priority)}
                style={{ margin: 0, borderRadius: 4 }}
              >
                {getPriorityText(requirement.priority)}
              </Tag>
            </div>
          </div>

          <Paragraph
            ellipsis={{ rows: 2 }}
            style={{
              margin: 0,
              marginBottom: 16,
              color: "#595959",
              lineHeight: 1.5,
              fontSize: 14,
            }}
          >
            {requirement.description ||
              requirement.content ||
              requirement.details ||
              "暂无描述信息"}
          </Paragraph>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Space size="large">
              <Badge
                color={getStatusColor(requirement.status)}
                text={
                  <Text style={{ fontSize: 13, color: "#8c8c8c" }}>
                    {getStatusText(requirement.status)}
                  </Text>
                }
              />

              {(requirement.assignee || requirement.owner) && (
                <Space size={6}>
                  <UserOutlined style={{ fontSize: 13, color: "#8c8c8c" }} />
                  <Text style={{ fontSize: 13, color: "#8c8c8c" }}>
                    {requirement.assignee || requirement.owner}
                  </Text>
                </Space>
              )}

              <Space size={6}>
                <CalendarOutlined style={{ fontSize: 13, color: "#8c8c8c" }} />
                <Text style={{ fontSize: 13, color: "#8c8c8c" }}>
                  {requirement.created_at || requirement.createTime
                    ? new Date(
                        requirement.created_at || requirement.createTime,
                      ).toLocaleDateString("zh-CN")
                    : "未知时间"}
                </Text>
              </Space>
            </Space>
          </div>
        </div>
      </div>
    </Card>
  );
};

const SdkDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 页面加载时获取需求列表
  useEffect(() => {
    loadRequirements();
  }, []);

  // 获取需求列表
  const loadRequirements = async () => {
    setLoading(true);
    try {
      const data = await lovrabetClient.models.Requirements.getList({
        currentPage: 1,
        pageSize: 20,
      });

      setRequirements(data.tableData || []);
      message.success(`获取到 ${data.tableData?.length || 0} 条需求`);
    } catch (error: any) {
      message.error(`获取失败: ${error.message}`);
      console.error("获取需求失败:", error);
    } finally {
      setLoading(false);
    }
  };

  // 创建新需求
  const handleCreateRequirement = async (values: any) => {
    setLoading(true);
    try {
      const newReq = await lovrabetClient.models.Requirements.create({
        ...values,
        priority: values.priority || "medium",
        status: "pending",
        type: values.type || "feature",
        created_at: new Date().toISOString(),
      });

      message.success("创建成功！");
      setModalVisible(false);
      form.resetFields();
      // 刷新需求列表
      loadRequirements();
    } catch (error: any) {
      message.error(`创建失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <Title level={2} style={{ margin: 0, color: "#262626" }}>
            🚀 需求管理系统
          </Title>
          <Paragraph
            style={{ margin: "8px 0 0", color: "#8c8c8c", fontSize: 16 }}
          >
            基于新版 Lovrabet SDK 构建的需求管理演示
          </Paragraph>
        </div>

        <Alert
          message="SDK 功能演示"
          description={
            <div>
              <p style={{ margin: "8px 0" }}>展示新版 SDK 的核心功能：</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>client.models.Requirements.getList() - 获取需求列表</li>
                <li>client.models.Requirements.create() - 创建新需求</li>
                <li>自动配置加载和多种认证方式支持</li>
                <li>现代化的卡片式 UI 展示</li>
              </ul>
            </div>
          }
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Card
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>操作面板</span>
              <div>
                <Space>
                  <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    loading={loading}
                    onClick={loadRequirements}
                  >
                    刷新数据
                  </Button>
                  <Button
                    icon={<PlusOutlined />}
                    loading={loading}
                    onClick={() => setModalVisible(true)}
                  >
                    创建需求
                  </Button>
                </Space>
              </div>
            </div>
          }
          style={{ marginBottom: 24 }}
        >
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card
                size="small"
                style={{ textAlign: "center", background: "#f6ffed" }}
              >
                <div
                  style={{ color: "#52c41a", fontSize: 24, fontWeight: "bold" }}
                >
                  {requirements.length}
                </div>
                <div style={{ color: "#8c8c8c" }}>总需求数</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                size="small"
                style={{ textAlign: "center", background: "#e6f7ff" }}
              >
                <div
                  style={{ color: "#1890ff", fontSize: 24, fontWeight: "bold" }}
                >
                  {
                    requirements.filter((r) => r.status === "in_progress")
                      .length
                  }
                </div>
                <div style={{ color: "#8c8c8c" }}>进行中</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                size="small"
                style={{ textAlign: "center", background: "#fff2e8" }}
              >
                <div
                  style={{ color: "#fa8c16", fontSize: 24, fontWeight: "bold" }}
                >
                  {
                    requirements.filter(
                      (r) => r.priority === "high" || r.priority === "urgent",
                    ).length
                  }
                </div>
                <div style={{ color: "#8c8c8c" }}>高优先级</div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                size="small"
                style={{ textAlign: "center", background: "#f6ffed" }}
              >
                <div
                  style={{ color: "#52c41a", fontSize: 24, fontWeight: "bold" }}
                >
                  {requirements.filter((r) => r.status === "done").length}
                </div>
                <div style={{ color: "#8c8c8c" }}>已完成</div>
              </Card>
            </Col>
          </Row>
        </Card>

        <Card
          title={`需求列表 (${requirements.length})`}
          loading={loading}
          style={{ borderRadius: 8 }}
        >
          {requirements.length > 0 ? (
            <Row gutter={[16, 0]}>
              {requirements.map((requirement) => (
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={8}
                  key={requirement.id}
                >
                  <RequirementCard requirement={requirement} />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="暂无需求数据，点击上方按钮获取或创建数据"
            />
          )}
        </Card>

        <Modal
          title="创建新需求"
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            form.resetFields();
          }}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateRequirement}
            style={{ marginTop: 16 }}
          >
            <Form.Item
              name="title"
              label="需求标题"
              rules={[{ required: true, message: "请输入需求标题" }]}
            >
              <Input placeholder="请输入需求标题" />
            </Form.Item>

            <Form.Item
              name="description"
              label="需求描述"
              rules={[{ required: true, message: "请输入需求描述" }]}
            >
              <Input.TextArea rows={4} placeholder="请详细描述需求内容" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item name="priority" label="优先级" initialValue="medium">
                  <Select>
                    <Option value="low">低</Option>
                    <Option value="medium">中</Option>
                    <Option value="high">高</Option>
                    <Option value="urgent">紧急</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="type" label="类型" initialValue="feature">
                  <Select>
                    <Option value="feature">功能</Option>
                    <Option value="bug">缺陷</Option>
                    <Option value="improvement">改进</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="assignee" label="负责人">
                  <Input placeholder="请输入负责人" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
              <Space>
                <Button
                  onClick={() => {
                    setModalVisible(false);
                    form.resetFields();
                  }}
                >
                  取消
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  创建需求
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default SdkDemo;

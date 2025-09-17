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
  Empty,
  Table,
  Tag,
} from "antd";
import { PlusOutlined, ReloadOutlined, ApiOutlined } from "@ant-design/icons";
import { lovrabetClient } from "../../api/client";

const { Title, Paragraph, Text } = Typography;

interface Requirement {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  [key: string]: any;
}

const SdkDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadRequirements();
  }, []);

  // 获取需求列表 - SDK 核心调用
  const loadRequirements = async () => {
    setLoading(true);
    try {
      const data = await lovrabetClient.models.Requirements.getList({
        currentPage: 1,
        pageSize: 20,
      });
      setRequirements(data.tableData || []);
    } catch (error: any) {
      message.error(`获取失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 创建新需求 - SDK 核心调用
  const handleCreateRequirement = async (values: any) => {
    setLoading(true);
    try {
      await lovrabetClient.models.Requirements.create({
        title: values.title,
        project_id: 6,
        type_id: 1,
        creator_id: 81,
        priority: "low",
        description: values.description,
        status: "new",
        created_at: new Date().toISOString(),
      });
      message.success("创建成功！");
      setModalVisible(false);
      form.resetFields();
      loadRequirements();
    } catch (error: any) {
      message.error(`创建失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 表格列定义
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: Requirement) =>
        text || record.name || record.requirement_name || `需求 ${record.id}`,
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      render: (text: string, record: Requirement) =>
        text || record.content || record.details || "暂无描述",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "done"
              ? "green"
              : status === "pending"
                ? "orange"
                : "blue"
          }
        >
          {status || "未知"}
        </Tag>
      ),
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string, record: Requirement) => {
        const dateStr = date || record.createTime;
        return dateStr ? new Date(dateStr).toLocaleDateString("zh-CN") : "未知";
      },
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>
        <ApiOutlined /> Lovrabet SDK 调用演示
      </Title>
      <Paragraph style={{ color: "#666", marginBottom: 24 }}>
        重点展示 SDK 的核心调用方法，简化 UI 界面突出代码逻辑
      </Paragraph>

      <Alert
        message="SDK 核心调用展示"
        description={
          <div style={{ margin: "8px 0" }}>
            <Text code>lovrabetClient.models.Requirements.getList()</Text> -
            获取数据列表
            <br />
            <Text code>lovrabetClient.models.Requirements.create()</Text> -
            创建新数据
          </div>
        }
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* 操作按钮 */}
        <Card title="操作面板" size="small">
          <Space>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              loading={loading}
              onClick={loadRequirements}
            >
              获取数据列表
            </Button>
            <Button
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              创建新数据
            </Button>
            <Text type="secondary">数据条数: {requirements.length}</Text>
          </Space>
        </Card>

        {/* 代码展示 */}
        <Card title="SDK 调用代码" size="small">
          <Text strong>1. 获取数据列表：</Text>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "12px",
              borderRadius: "4px",
              margin: "8px 0",
            }}
          >
            {`const data = await lovrabetClient.models.Requirements.getList({
  currentPage: 1,
  pageSize: 20,
});
setRequirements(data.tableData || []);`}
          </pre>

          <Text strong>2. 创建新数据：</Text>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "12px",
              borderRadius: "4px",
              margin: "8px 0",
            }}
          >
            {`await lovrabetClient.models.Requirements.create({
  title: values.title,
  description: values.description,
  status: "pending",
  created_at: new Date().toISOString(),
});`}
          </pre>
        </Card>

        {/* 数据表格 */}
        <Card title={`数据列表 (${requirements.length} 条)`} size="small">
          <Table
            columns={columns}
            dataSource={requirements}
            loading={loading}
            rowKey="id"
            size="small"
            pagination={{ pageSize: 10, showSizeChanger: false }}
            locale={{
              emptyText: (
                <Empty
                  description="暂无数据，点击上方按钮获取数据"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ),
            }}
          />
        </Card>
      </Space>

      {/* 简化的创建弹窗 */}
      <Modal
        title="创建新数据"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateRequirement}>
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: "请输入描述" }]}
          >
            <Input.TextArea rows={3} placeholder="请输入描述" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button onClick={() => setModalVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                创建
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SdkDemo;

import React, { useState } from "react";
import {
  Card,
  Button,
  Space,
  Typography,
  Alert,
  Divider,
  Input,
  Form,
  Modal,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { client } from "../../api/api";

const { Title, Paragraph, Text } = Typography;

const NewSdkDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 演示：获取需求列表
  const handleGetRequirements = async () => {
    setLoading(true);
    try {
      const data = await client.entities.Requirements.list({
        currentPage: 1,
        pageSize: 5,
      });
      setResults({ action: "获取需求列表", data });
      message.success("获取成功！");
    } catch (error: any) {
      message.error(`获取失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 演示：创建新需求
  const handleCreateRequirement = async (values: any) => {
    setLoading(true);
    try {
      const data = await client.entities.Requirements.create(values);
      setResults({ action: "创建需求", data });
      message.success("创建成功！");
      setModalVisible(false);
      form.resetFields();
    } catch (error: any) {
      message.error(`创建失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 演示：获取项目列表
  const handleGetProjects = async () => {
    setLoading(true);
    try {
      const data = await client.entities.Projects.list({
        currentPage: 1,
        pageSize: 10,
      });
      setResults({ action: "获取项目列表", data });
      message.success("获取成功！");
    } catch (error: any) {
      message.error(`获取失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 演示：批量创建
  const handleBulkCreateDemo = async () => {
    setLoading(true);
    try {
      const demoData = [
        {
          title: "演示需求 1",
          description: "这是一个演示需求",
          priority: "medium",
          status: "todo",
        },
        {
          title: "演示需求 2",
          description: "这是另一个演示需求",
          priority: "high",
          status: "todo",
        },
      ];

      const data = await client.entities.Requirements.bulkCreate(demoData);
      setResults({ action: "批量创建需求", data });
      message.success("批量创建成功！");
    } catch (error: any) {
      message.error(`批量创建失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 演示：测试连接
  const handleTestConnection = async () => {
    setLoading(true);
    try {
      const isConnected = await client.testConnection();
      setResults({
        action: "测试连接",
        data: { connected: isConnected, config: client.getConfig() },
      });
      message.success(isConnected ? "连接成功！" : "连接失败！");
    } catch (error: any) {
      message.error(`测试失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <Title level={2}>
        🚀 新版 Lovrabet SDK 演示
      </Title>

      <Paragraph>
        这是使用新版 <Text code>createClient</Text> API 的演示页面。
        新版 SDK 支持更灵活的配置和更统一的调用方式。
      </Paragraph>

      <Alert
        message="新 SDK 特性"
        description={
          <ul>
            <li>通过 createClient() 创建客户端实例</li>
            <li>支持动态实体访问 (client.entities.EntityName)</li>
            <li>支持多种鉴权方式 (token, accessKey+secretKey)</li>
            <li>统一的错误处理和配置管理</li>
            <li>保持向后兼容性</li>
          </ul>
        }
        type="info"
        showIcon
        style={{ marginBottom: "24px" }}
      />

      <Card title="SDK 操作演示" style={{ marginBottom: "24px" }}>
        <Space wrap>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            loading={loading}
            onClick={handleGetRequirements}
          >
            获取需求列表
          </Button>

          <Button
            icon={<PlusOutlined />}
            loading={loading}
            onClick={() => setModalVisible(true)}
          >
            创建需求
          </Button>

          <Button
            icon={<EyeOutlined />}
            loading={loading}
            onClick={handleGetProjects}
          >
            获取项目列表
          </Button>

          <Button
            icon={<PlusOutlined />}
            loading={loading}
            onClick={handleBulkCreateDemo}
          >
            批量创建演示
          </Button>

          <Button loading={loading} onClick={handleTestConnection}>
            测试连接
          </Button>
        </Space>
      </Card>

      {results && (
        <Card title={`操作结果: ${results.action}`}>
          <pre
            style={{
              backgroundColor: "#f5f5f5",
              padding: "16px",
              borderRadius: "4px",
              overflow: "auto",
              maxHeight: "400px",
            }}
          >
            {JSON.stringify(results.data, null, 2)}
          </pre>
        </Card>
      )}

      {/* 创建需求的模态框 */}
      <Modal
        title="创建新需求"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateRequirement}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入需求标题" }]}
          >
            <Input placeholder="请输入需求标题" />
          </Form.Item>

          <Form.Item
            label="描述"
            name="description"
          >
            <Input.TextArea placeholder="请输入需求描述" rows={4} />
          </Form.Item>

          <Form.Item
            label="优先级"
            name="priority"
            initialValue="medium"
          >
            <Input placeholder="high, medium, low" />
          </Form.Item>

          <Form.Item
            label="状态"
            name="status"
            initialValue="todo"
          >
            <Input placeholder="todo, in_progress, done" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                创建
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Divider />

      <Card title="代码示例" size="small">
        <Title level={4}>基本用法</Title>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
{`import { createClient } from '@lovrabet/sdk';

// 创建客户端
const client = createClient({
  appCode: 'app-c4c89304',
  env: 'online',
  entities: {
    Requirements: {
      tableName: 'requirements',
      datasetId: 'dataset-id-123'
    }
  }
});

// 使用客户端
const requirements = await client.entities.Requirements.list();
const newReq = await client.entities.Requirements.create({
  title: 'New Requirement',
  description: 'Description here'
});`}
        </pre>
      </Card>
    </div>
  );
};

export default NewSdkDemo;
import React, { useState } from "react";
import {
  Typography,
  Card,
  Form,
  Switch,
  Select,
  InputNumber,
  Button,
  Space,
  Divider,
  message,
  Row,
  Col,
} from "antd";
import { SaveOutlined, ReloadOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async (values: any) => {
    setLoading(true);
    // 模拟保存操作
    await new Promise((resolve) => setTimeout(resolve, 1000));
    message.success("设置已保存");
    setLoading(false);
  };

  const handleReset = () => {
    form.resetFields();
    message.info("设置已重置");
  };

  return (
    <div>
      <Title level={2}>系统设置</Title>
      <Paragraph>在这里您可以配置应用的各种参数和偏好设置。</Paragraph>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          theme: "light",
          language: "zh-CN",
          notifications: true,
          autoSave: true,
          fontSize: 14,
          pageSize: 10,
        }}
      >
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Card title="外观设置" style={{ marginBottom: 24 }}>
              <Form.Item label="主题模式" name="theme">
                <Select>
                  <Option value="light">浅色主题</Option>
                  <Option value="dark">深色主题</Option>
                  <Option value="auto">跟随系统</Option>
                </Select>
              </Form.Item>

              <Form.Item label="字体大小" name="fontSize">
                <InputNumber min={12} max={20} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="语言" name="language">
                <Select>
                  <Option value="zh-CN">简体中文</Option>
                  <Option value="en-US">English</Option>
                  <Option value="ja-JP">日本語</Option>
                </Select>
              </Form.Item>
            </Card>

            <Card title="功能设置">
              <Form.Item
                label="启用通知"
                name="notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="自动保存"
                name="autoSave"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item label="页面大小" name="pageSize">
                <Select>
                  <Option value={10}>10 条/页</Option>
                  <Option value={20}>20 条/页</Option>
                  <Option value={50}>50 条/页</Option>
                  <Option value={100}>100 条/页</Option>
                </Select>
              </Form.Item>
            </Card>
          </Col>

          <Col span={12}>
            <Card title="性能设置" style={{ marginBottom: 24 }}>
              <Form.Item
                label="启用缓存"
                name="enableCache"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item label="压缩级别" name="compressionLevel">
                <Select>
                  <Option value="low">低压缩</Option>
                  <Option value="medium">中等压缩</Option>
                  <Option value="high">高压缩</Option>
                </Select>
              </Form.Item>

              <Form.Item label="预加载" name="preload" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Card>

            <Card title="安全设置">
              <Form.Item
                label="启用 HTTPS"
                name="enableHttps"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item label="会话超时（分钟）" name="sessionTimeout">
                <InputNumber min={5} max={480} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="启用双因素认证"
                name="enable2FA"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Card>
          <Space>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={loading}
              htmlType="submit"
            >
              保存设置
            </Button>
            <Button icon={<ReloadOutlined />} onClick={handleReset}>
              重置设置
            </Button>
          </Space>
        </Card>
      </Form>
    </div>
  );
};

export default Settings;

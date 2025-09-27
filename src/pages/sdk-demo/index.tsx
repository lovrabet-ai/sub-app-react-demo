import React, { useState, useEffect } from "react";
import { Button, Table, Card, Typography, Space, message, Select } from "antd";
import { ApiOutlined } from "@ant-design/icons";
import { lovrabetClient } from "../../api/client";

const { Title, Paragraph } = Typography;

export default function SdkDemo() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');

  /**
   * 加载可用的数据模型列表
   */
  useEffect(() => {
    try {
      const models = lovrabetClient.getModelList();
      setModelList(models);
      // 默认选择第一个模型
      if (models.length > 0) {
        setSelectedModel(models[0]);
      }
    } catch (error) {
      console.error('获取模型列表失败:', error);
      message.error('获取模型列表失败');
    }
  }, []);

  /**
   * 语法糖模式 - 最优雅的调用方式
   */
  const loadDataWithSyntaxSugar = async () => {
    if (!selectedModel) {
      message.warning('请先选择一个数据模型');
      return;
    }

    setLoading(true);

    try {
      // 1. 直接通过模型名访问 - 最优雅的方式
      const response = await lovrabetClient.models[selectedModel].getList({
        currentPage: 1,
        pageSize: 10,
      });

      processResponse(response, "语法糖模式调用成功！");
    } catch (error: any) {
      handleError(error, "语法糖模式");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 正常调用模式 - 编程式调用方式
   */
  const loadDataWithNormalMode = async () => {
    if (!selectedModel) {
      message.warning('请先选择一个数据模型');
      return;
    }

    setLoading(true);

    try {
      // 1. 先获取模型实例
      const model = lovrabetClient.getModel(selectedModel);

      // 2. 调用模型方法
      const response = await model.getList({
        currentPage: 1,
        pageSize: 10,
      });

      processResponse(response, "正常模式调用成功！");
    } catch (error: any) {
      handleError(error, "正常模式");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理响应数据
   */
  const processResponse = (response: any, successMessage: string) => {
    // 处理返回的数据
    setData(response.tableData || []);

    // 动态生成表格列
    if (response.tableColumns) {
      const tableColumns = response.tableColumns.map((column: any) => ({
        title: column.title || column.dataIndex,
        dataIndex: column.dataIndex,
        key: column.dataIndex,
      }));
      setColumns(tableColumns);
    }

    message.success(successMessage);
  };

  /**
   * 处理错误
   */
  const handleError = (error: any, mode: string) => {
    console.error(`${mode}加载失败:`, error);
    message.error(`${mode}加载失败: ${error.message}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* 标题 */}
      <Title level={2}>
        <ApiOutlined /> Lovrabet SDK 简单演示
      </Title>

      <Paragraph style={{ color: "#666", marginBottom: 24 }}>
        演示 Lovrabet SDK 的两种调用方式。对比体验语法糖模式和正常模式的差异。
        <br />
        <strong>注意：</strong>代码示例中的 "Requirements" 是假设已经存在的数据模型名称，实际使用时请根据下拉框中的可用模型进行选择。
      </Paragraph>

      {/* 数据模型选择 */}
      <Card title="选择数据模型" size="small" style={{ marginBottom: 16 }}>
        <Space>
          <Select
            placeholder="选择要查询的数据模型"
            style={{ width: 250 }}
            value={selectedModel}
            onChange={setSelectedModel}
            options={modelList.map(model => ({
              label: model,
              value: model,
            }))}
          />
          <Button
            type="primary"
            loading={loading}
            onClick={loadDataWithSyntaxSugar}
            icon={<ApiOutlined />}
            disabled={!selectedModel}
          >
            🍬 语法糖模式查询
          </Button>
          <Button
            loading={loading}
            onClick={loadDataWithNormalMode}
            icon={<ApiOutlined />}
            disabled={!selectedModel}
          >
            🔧 正常模式查询
          </Button>
        </Space>
      </Card>

      {/* 代码示例 */}
      <Card title="两种调用方式对比" size="small" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          {/* 语法糖模式 */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#1890ff' }}>
              🍬 语法糖模式（推荐）
            </div>
            <pre style={{
              background: "#f0f8ff",
              padding: "12px",
              borderRadius: "4px",
              margin: 0,
              fontSize: "13px",
              border: "1px solid #1890ff"
            }}>
              {`// 一行代码搞定！
const response = await lovrabetClient
  .models.${selectedModel || 'Requirements'}.getList({
    currentPage: 1,
    pageSize: 10
  });`}
            </pre>
          </div>

          {/* 正常模式 */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#666' }}>
              🔧 正常模式
            </div>
            <pre style={{
              background: "#f5f5f5",
              padding: "12px",
              borderRadius: "4px",
              margin: 0,
              fontSize: "13px",
              border: "1px solid #d9d9d9"
            }}>
              {`// 分步骤调用
const model = lovrabetClient
  .getModel('${selectedModel || 'Requirements'}');

const response = await model.getList({
  currentPage: 1,
  pageSize: 10
});`}
            </pre>
          </div>
        </div>
      </Card>

      {/* 数据表格 */}
      {data.length > 0 && (
        <Card title="数据结果" size="small">
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(_, index) => index?.toString() || "0"}
            pagination={false}
            size="small"
            scroll={{ x: true }}
          />
        </Card>
      )}
    </div>
  );
}

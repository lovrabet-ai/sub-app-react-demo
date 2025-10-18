import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Card,
  Typography,
  Space,
  message,
  Select,
  Input,
  Tag,
} from "antd";
import { ApiOutlined } from "@ant-design/icons";
import { lovrabetClient } from "../../api/client";
import { SortOrder } from "@lovrabet/sdk";

const { Title, Paragraph } = Typography;

export default function SdkDemo() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [modelList, setModelList] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectOptions, setSelectOptions] = useState<any[]>([]);
  const [codeField, setCodeField] = useState<string>("id");
  const [labelField, setLabelField] = useState<string>("");

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
      console.error("获取模型列表失败:", error);
      message.error("获取模型列表失败");
    }
  }, []);

  /**
   * 语法糖模式 - 最优雅的调用方式
   */
  const loadDataWithSyntaxSugar = async () => {
    if (!selectedModel) {
      message.warning("请先选择一个数据模型");
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
      message.warning("请先选择一个数据模型");
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
   * 获取下拉选项
   */
  const loadSelectOptions = async () => {
    if (!selectedModel) {
      message.warning("请先选择一个数据模型");
      return;
    }

    if (!codeField || !labelField) {
      message.warning("请输入 code 和 label 字段名");
      return;
    }

    setLoading(true);
    setSelectOptions([]);

    try {
      const options = await lovrabetClient.models[
        selectedModel
      ].getSelectOptions({
        code: codeField,
        label: labelField,
      });

      setSelectOptions(options);
      message.success(`成功获取 ${options.length} 个下拉选项`);
      console.log("下拉选项数据:", options);
    } catch (error: any) {
      console.error("获取下拉选项失败:", error);
      message.error(`获取下拉选项失败: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
        <strong>注意：</strong>代码示例中的 "Requirements"
        是假设已经存在的数据模型名称，实际使用时请根据下拉框中的可用模型进行选择。
      </Paragraph>

      {/* 数据模型选择 */}
      <Card title="选择数据模型" size="small" style={{ marginBottom: 16 }}>
        <Space>
          <Select
            placeholder="选择要查询的数据模型"
            style={{ width: 250 }}
            value={selectedModel}
            onChange={setSelectedModel}
            options={modelList.map((model) => ({
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
        <div style={{ display: "flex", gap: "16px" }}>
          {/* 语法糖模式 */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#1890ff",
              }}
            >
              🍬 语法糖模式（推荐）
            </div>
            <pre
              style={{
                background: "#f0f8ff",
                padding: "12px",
                borderRadius: "4px",
                margin: 0,
                fontSize: "13px",
                border: "1px solid #1890ff",
              }}
            >
              {`// 一行代码搞定！
const response = await lovrabetClient
  .models.${selectedModel || "Requirements"}.getList({
    currentPage: 1,
    pageSize: 10
  });`}
            </pre>
          </div>

          {/* 正常模式 */}
          <div style={{ flex: 1 }}>
            <div
              style={{ fontWeight: "bold", marginBottom: "8px", color: "#666" }}
            >
              🔧 正常模式
            </div>
            <pre
              style={{
                background: "#f5f5f5",
                padding: "12px",
                borderRadius: "4px",
                margin: 0,
                fontSize: "13px",
                border: "1px solid #d9d9d9",
              }}
            >
              {`// 分步骤调用
const model = lovrabetClient
  .getModel('${selectedModel || "Requirements"}');

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
        <Card title="数据结果" size="small" style={{ marginBottom: 16 }}>
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

      {/* 获取下拉选项 */}
      <Card title="📋 获取下拉选项" size="small" style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ color: "#666" }}>
            用于获取数据表的下拉选项数据，适用于 Select、Radio、Checkbox
            等表单组件（仅 WebAPI 模式支持）
          </div>

          {/* 显示可用字段 */}
          {columns.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: "#666", marginRight: 8 }}>
                可用字段（点击快速填入）：
              </span>
              <Space wrap size={[4, 4]}>
                {columns.map((column: any) => (
                  <Tag
                    key={column.dataIndex}
                    color="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (!codeField) {
                        setCodeField(column.dataIndex);
                        message.success(
                          `已填入 Code 字段: ${column.dataIndex}`,
                        );
                      } else if (!labelField) {
                        setLabelField(column.dataIndex);
                        message.success(
                          `已填入 Label 字段: ${column.dataIndex}`,
                        );
                      } else {
                        message.info("Code 和 Label 已填写，如需更换请先清空");
                      }
                    }}
                  >
                    {column.dataIndex}
                  </Tag>
                ))}
              </Space>
            </div>
          )}

          <Space wrap>
            <span>Code 字段：</span>
            <Input
              placeholder="用作选项值的字段名"
              value={codeField}
              onChange={(e) => setCodeField(e.target.value)}
              style={{ width: 200 }}
              allowClear
            />
            <span>Label 字段：</span>
            <Input
              placeholder="用作显示文本的字段名"
              value={labelField}
              onChange={(e) => setLabelField(e.target.value)}
              style={{ width: 200 }}
              allowClear
            />
            <Button
              type="primary"
              loading={loading}
              onClick={loadSelectOptions}
              icon={<ApiOutlined />}
              disabled={!selectedModel || !codeField || !labelField}
            >
              获取选项
            </Button>
          </Space>

          <pre
            style={{
              background: "#f5f5f5",
              padding: "12px",
              borderRadius: "4px",
              margin: "8px 0 0 0",
              fontSize: "13px",
              border: "1px solid #d9d9d9",
            }}
          >
            {`// 调用示例
const options = await lovrabetClient
  .models.${selectedModel || "Requirements"}.getSelectOptions({
    code: "${codeField || "id"}",
    label: "${labelField || "name"}"
  });

// 返回格式：[{ label: "显示文本", value: "选项值" }]`}
          </pre>
        </Space>
      </Card>

      {/* 下拉选项结果 */}
      {selectOptions.length > 0 && (
        <Card
          title={`下拉选项结果（共 ${selectOptions.length} 个）`}
          size="small"
        >
          <pre
            style={{
              background: "#f5f5f5",
              padding: "12px",
              borderRadius: "4px",
              margin: 0,
              fontSize: "13px",
              maxHeight: "400px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(selectOptions, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
}

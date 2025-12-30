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

const { Title, Paragraph, Text } = Typography;

export default function SdkDemo() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [modelList, setModelList] = useState<
    Array<{
      value: string;
      label: string;
      alias?: string;
      name?: string;
      datasetCode: string;
    }>
  >([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectOptions, setSelectOptions] = useState<any[]>([]);
  const [codeField, setCodeField] = useState<string>("id");
  const [labelField, setLabelField] = useState<string>("");

  // 获取选中模型的信息（用于代码示例展示 alias）
  const selectedModelInfo = modelList.find((m) => m.value === selectedModel);

  /**
   * 加载可用的数据模型列表
   */
  useEffect(() => {
    try {
      // 使用 getModelListDetails 获取人类友好的模型列表
      const models = lovrabetClient.getModelListDetails();
      setModelList(models);
      // 默认选择第一个模型
      if (models.length > 0) {
        setSelectedModel(models[0].value);
      }
    } catch (error) {
      console.error("获取模型列表失败:", error);
      message.error("获取模型列表失败");
    }
  }, []);

  /**
   * 使用 filter 接口查询数据
   */
  const loadData = async () => {
    if (!selectedModel) {
      message.warning("请先选择一个数据模型");
      return;
    }

    setLoading(true);

    try {
      // 使用 filter 接口进行查询
      const response = await lovrabetClient.models[selectedModel].filter({
        currentPage: 1,
        pageSize: 10,
      });

      processResponse(response, "查询成功！");
    } catch (error: any) {
      handleError(error, "查询");
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理响应数据
   */
  const processResponse = (response: any, successMessage: string) => {
    try {
      // filter 接口返回的数据结构
      const tableData = response?.tableData || response?.data || [];

      // 确保 tableData 是数组
      if (!Array.isArray(tableData)) {
        console.error("返回的数据不是数组格式:", tableData);
        message.error("返回数据格式错误，请检查 API 响应");
        return;
      }

      setData(tableData);

      // 优先使用 tableColumns 配置
      if (response?.tableColumns && Array.isArray(response.tableColumns)) {
        // 如果有 tableColumns，优先使用它
        const tableColumns = response.tableColumns.map((column: any) => ({
          title:
            column.title || column.dataIndex || column.key || String(column),
          dataIndex: column.dataIndex || column.key || String(column),
          key: column.dataIndex || column.key || String(column),
        }));
        setColumns(tableColumns);
      } else if (tableData.length > 0) {
        // 如果没有 tableColumns，从第一条数据中提取字段名作为列
        const firstRow = tableData[0];
        if (firstRow && typeof firstRow === "object") {
          const tableColumns = Object.keys(firstRow).map((key) => ({
            title: key,
            dataIndex: key,
            key: key,
          }));
          setColumns(tableColumns);
        }
      } else {
        // 如果没有数据也没有列定义，清空列
        setColumns([]);
      }

      message.success(successMessage);
    } catch (error: any) {
      console.error("处理响应数据失败:", error);
      message.error(`处理数据失败: ${error.message}`);
    }
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
  const handleError = (error: any, action: string) => {
    console.error(`${action}失败:`, error);
    message.error(`${action}失败: ${error.message}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      {/* 标题 */}
      <Title level={2}>
        <ApiOutlined /> Lovrabet SDK 简单演示
      </Title>

      <Paragraph style={{ color: "#666", marginBottom: 24 }}>
        演示 Lovrabet SDK 的 <Text strong>filter</Text> 接口使用方法。filter
        接口支持复杂条件查询、字段选择、多字段排序等功能。
        <br />
        <strong>注意：</strong>代码示例中的 "Requirements"
        是假设已经存在的数据模型名称，实际使用时请根据下拉框中的可用模型进行选择。
      </Paragraph>

      {/* 数据模型选择 */}
      <Card title="选择数据模型" size="small" style={{ marginBottom: 16 }}>
        <Space>
          <Select
            placeholder="选择要查询的数据模型"
            style={{ width: 350 }}
            value={selectedModel}
            onChange={setSelectedModel}
            showSearch
            optionFilterProp="label"
            options={modelList}
          />
          <Button
            type="primary"
            loading={loading}
            onClick={loadData}
            icon={<ApiOutlined />}
            disabled={!selectedModel}
          >
            查询数据
          </Button>
        </Space>
      </Card>

      {/* 代码示例 */}
      <Card title="代码示例" size="small" style={{ marginBottom: 16 }}>
        <pre
          style={{
            background: "#f0f8ff",
            padding: "16px",
            borderRadius: "4px",
            margin: 0,
            fontSize: "13px",
            border: "1px solid #1890ff",
            overflow: "auto",
          }}
        >
          {`// ========== 方式一：标准 dataset_code 模式（推荐 AI/LLM 使用）==========
const response = await lovrabetClient
  .models['${selectedModel || "dataset_xxx"}'].filter({
    currentPage: 1,
    pageSize: 10
  });
${
  selectedModelInfo?.alias
    ? `
// ========== 方式二：人类友好的 alias 模式 ==========
const response = await lovrabetClient
  .models.${selectedModelInfo.alias}.filter({
    currentPage: 1,
    pageSize: 10
  });
`
    : ""
}
// ========== 完整查询示例（所有参数均为可选）==========
const response = await lovrabetClient
  .models['${selectedModel || "dataset_xxx"}'].filter({
    // where: 条件查询（可选）
    // where: {
    //   age: { $gte: 18 },
    //   status: { $eq: 'active' }
    // },

    // select: 字段选择（可选）
    // select: ['id', 'name', 'age'],

    // orderBy: 排序（可选）
    // orderBy: [{ createTime: 'desc' }],

    // 分页参数（必需）
    currentPage: 1,
    pageSize: 10
  });

// 其他可用参数（仅示例，以实际字段为准）：
// - where: 支持 $eq, $ne, $gte, $lte, $in, $contain, $startWith, $endWith 等操作符
// - where: 支持 $and, $or 逻辑组合
// - select: 数组形式，指定返回的字段
// - orderBy: 数组形式，支持多字段排序 [{ field1: 'desc' }, { field2: 'asc' }]`}
        </pre>
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
            {`// ========== 方式一：标准 dataset_code 模式（推荐 AI/LLM 使用）==========
const options = await lovrabetClient
  .models['${selectedModel || "dataset_xxx"}'].getSelectOptions({
    code: "${codeField || "id"}",
    label: "${labelField || "name"}"
  });
${
  selectedModelInfo?.alias
    ? `
// ========== 方式二：人类友好的 alias 模式 ==========
const options = await lovrabetClient
  .models.${selectedModelInfo.alias}.getSelectOptions({
    code: "${codeField || "id"}",
    label: "${labelField || "name"}"
  });
`
    : ""
}
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

      {/* API 参考文档 */}
      <Card size="small" style={{ marginTop: 24, background: "#f5f5f5" }}>
        <Paragraph style={{ margin: 0, textAlign: "center" }}>
          <Text type="secondary">
            API 详细参考使用手册：{" "}
            <a
              href="https://open.lovrabet.com/docs/category/lovrabet-node-sdk/api-usage"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1890ff" }}
            >
              https://open.lovrabet.com/docs/category/lovrabet-node-sdk/api-usage
            </a>
          </Text>
        </Paragraph>
      </Card>
    </div>
  );
}

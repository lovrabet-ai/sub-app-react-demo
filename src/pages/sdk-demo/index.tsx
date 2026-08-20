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
import {
  ApiOutlined,
  CheckOutlined,
  CopyOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { lovrabetClient } from "@/api/client";
import DemoPageContainer from "@/components/demo-page-container/DemoPageContainer";

const { Title, Paragraph, Text } = Typography;

interface CollapsibleCodeBlockProps {
  title: string;
  code: string;
  accent?: boolean;
  defaultExpanded?: boolean;
  maxHeight?: number;
}

function CollapsibleCodeBlock({
  title,
  code,
  accent = false,
  defaultExpanded = false,
  maxHeight,
}: CollapsibleCodeBlockProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
      message.error("Failed to copy code");
    }
  };

  return (
    <div
      style={{
        border: `1px solid ${accent ? "#1890ff" : "#d9d9d9"}`,
        borderRadius: 6,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          padding: "10px 12px",
          background: accent ? "#f0f8ff" : "#fafafa",
          borderBottom: expanded
            ? `1px solid ${accent ? "#1890ff" : "#d9d9d9"}`
            : "none",
        }}
      >
        <Text strong>{title}</Text>
        <Space size={8}>
          <Button
            size="small"
            icon={copied ? <CheckOutlined /> : <CopyOutlined />}
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            size="small"
            icon={expanded ? <UpOutlined /> : <DownOutlined />}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </Space>
      </div>
      {expanded && (
        <pre
          style={{
            background: accent ? "#f0f8ff" : "#f5f5f5",
            padding: "16px",
            margin: 0,
            fontSize: "13px",
            maxHeight,
            overflow: "auto",
          }}
        >
          {code}
        </pre>
      )}
    </div>
  );
}

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

  const filterCodeExample = `// ========== Mode 1: standard dataset_code (recommended for AI/LLM) ==========
const response = await lovrabetClient
  .models['${selectedModel || "dataset_xxx"}'].filter({
    currentPage: 1,
    pageSize: 10
  });
${
  selectedModelInfo?.alias
    ? `
// ========== Mode 2: human-friendly alias ==========
const response = await lovrabetClient
  .models.${selectedModelInfo.alias}.filter({
    currentPage: 1,
    pageSize: 10
  });
`
    : ""
}
// ========== Full query example (all params optional except paging) ==========
const response = await lovrabetClient
  .models['${selectedModel || "dataset_xxx"}'].filter({
    // where: conditions (optional)
    // where: {
    //   age: { $gte: 18 },
    //   status: { $eq: 'active' }
    // },

    // select: fields (optional)
    // select: ['id', 'name', 'age'],

    // orderBy: sort (optional)
    // orderBy: [{ createTime: 'desc' }],

    // paging (required)
    currentPage: 1,
    pageSize: 10
  });

// Other params (examples only; use real fields):
// - where: operators such as $eq, $ne, $gte, $lte, $in, $contain, $startWith, $endWith
// - where: $and / $or combinations
// - select: array of fields to return
// - orderBy: multi-field sort, e.g. [{ field1: 'desc' }, { field2: 'asc' }]`;

  const selectOptionsCodeExample = `// ========== Mode 1: standard dataset_code (recommended for AI/LLM) ==========
const options = await lovrabetClient
  .models['${selectedModel || "dataset_xxx"}'].getSelectOptions({
    code: "${codeField || "id"}",
    label: "${labelField || "name"}"
  });
${
  selectedModelInfo?.alias
    ? `
// ========== Mode 2: human-friendly alias ==========
const options = await lovrabetClient
  .models.${selectedModelInfo.alias}.getSelectOptions({
    code: "${codeField || "id"}",
    label: "${labelField || "name"}"
  });
`
    : ""
}
// Return shape: [{ label: "display text", value: "option value" }]`;

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
      console.error("Failed to load model list:", error);
      message.error("Failed to load model list");
    }
  }, []);

  /**
   * 使用 filter 接口查询数据
   */
  const loadData = async () => {
    if (!selectedModel) {
      message.warning("Select a data model first");
      return;
    }

    setLoading(true);

    try {
      // 使用 filter 接口进行查询
      const response = await lovrabetClient.models[selectedModel].filter({
        currentPage: 1,
        pageSize: 10,
      });

      processResponse(response, "Query succeeded");
    } catch (error: any) {
      handleError(error, "Query");
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
        console.error("Returned data is not an array:", tableData);
        message.error("Unexpected response shape. Check the API payload.");
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
          // 处理对象/数组类型的值，避免 React Error #31
          render: (value: any) => {
            if (value === null || value === undefined) {
              return "-";
            }
            if (typeof value === "object") {
              return JSON.stringify(value);
            }
            return String(value);
          },
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
            // 处理对象/数组类型的值，避免 React Error #31
            render: (value: any) => {
              if (value === null || value === undefined) {
                return "-";
              }
              if (typeof value === "object") {
                return JSON.stringify(value);
              }
              return String(value);
            },
          }));
          setColumns(tableColumns);
        }
      } else {
        // 如果没有数据也没有列定义，清空列
        setColumns([]);
      }

      message.success(successMessage);
    } catch (error: any) {
      console.error("Failed to process response:", error);
      message.error(`Failed to process data: ${error.message}`);
    }
  };

  /**
   * 获取下拉选项
   */
  const loadSelectOptions = async () => {
    if (!selectedModel) {
      message.warning("Select a data model first");
      return;
    }

    if (!codeField || !labelField) {
      message.warning("Enter both code and label field names");
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
      message.success(`Loaded ${options.length} select options`);
      console.log("Select options:", options);
    } catch (error: any) {
      console.error("Failed to load select options:", error);
      message.error(`Failed to load select options: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理错误
   */
  const handleError = (error: any, action: string) => {
    console.error(`${action} failed:`, error);
    message.error(`${action} failed: ${error.message}`);
  };

  return (
    <DemoPageContainer>
      <div>
        {/* 标题 */}
        <Title level={2}>
          <ApiOutlined /> Lovrabet SDK demo
        </Title>

        <Paragraph style={{ color: "#666", marginBottom: 24 }}>
          Demo of the Lovrabet SDK <Text strong>filter</Text> API. Filter
          supports complex conditions, field selection, and multi-field sort.
          <br />
          <strong>Note:</strong> sample code may mention "Requirements"
          as a placeholder model name. Pick a real model from the dropdown.
        </Paragraph>

        {/* 数据模型选择 */}
        <Card title="Select a data model" size="small" style={{ marginBottom: 16 }}>
          <Space>
            <Select
              placeholder="Choose a data model to query"
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
              Query data
            </Button>
          </Space>
        </Card>

        {/* 数据表格 */}
        {data.length > 0 && (
          <Card title="Results" size="small" style={{ marginBottom: 16 }}>
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

        {/* 代码示例 */}
        <Card title="Code sample" size="small" style={{ marginBottom: 16 }}>
          <CollapsibleCodeBlock
            title="filter query code"
            code={filterCodeExample}
            accent
            defaultExpanded
          />
        </Card>

        {/* 获取下拉选项 */}
        <Card title="Select options" size="small" style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ color: "#666" }}>
              Load dropdown options from a data table for Select, Radio, or Checkbox.
              WebAPI mode only.
            </div>

            {/* 显示可用字段 */}
            {columns.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: "#666", marginRight: 8 }}>
                  Available fields (click to fill):
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
                            `Filled code field: ${column.dataIndex}`,
                          );
                        } else if (!labelField) {
                          setLabelField(column.dataIndex);
                          message.success(
                            `Filled label field: ${column.dataIndex}`,
                          );
                        } else {
                          message.info(
                            "Code and label are already set. Clear them first to change.",
                          );
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
              <span>Code field:</span>
              <Input
                placeholder="Field used as the option value"
                value={codeField}
                onChange={(e) => setCodeField(e.target.value)}
                style={{ width: 200 }}
                allowClear
              />
              <span>Label field:</span>
              <Input
                placeholder="Field used as the display text"
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
                Load options
              </Button>
            </Space>

            <CollapsibleCodeBlock
              title="getSelectOptions code"
              code={selectOptionsCodeExample}
              defaultExpanded
            />
          </Space>
        </Card>

        {/* 下拉选项结果 */}
        {selectOptions.length > 0 && (
          <Card
            title={`Select options (${selectOptions.length})`}
            size="small"
          >
            <CollapsibleCodeBlock
              title="Select options JSON"
              code={JSON.stringify(selectOptions, null, 2)}
              defaultExpanded
              maxHeight={400}
            />
          </Card>
        )}

        {/* API 参考文档 */}
        <Card size="small" style={{ marginTop: 24, background: "#f5f5f5" }}>
          <Paragraph style={{ margin: 0, textAlign: "center" }}>
            <Text type="secondary">
              Developer docs:{" "}
              <a
                href="https://qizhiyuntu.feishu.cn/wiki/CMfxw6l2li01EVkBTcBcshD3nSe"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1890ff" }}
              >
                https://qizhiyuntu.feishu.cn/wiki/CMfxw6l2li01EVkBTcBcshD3nSe
              </a>
            </Text>
          </Paragraph>
        </Card>
      </div>
    </DemoPageContainer>
  );
}

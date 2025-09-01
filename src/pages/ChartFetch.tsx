import React, { useState, useEffect } from "react";
import { Card, Spin, Alert, Typography, Tag, Divider } from "antd";
import ReactECharts from "echarts-for-react";

const { Title, Paragraph } = Typography;

const API_URL =
  "/smartapi/runtime/xiaoyou/app-e9ced742/9725f8d5308d456e9a6d4789a0a7be6f/getList";

// API URL 解析组件
const ApiUrlDisplay = () => {
  const urlParts = API_URL.split('/');
  const callMethod = urlParts[1]; // smartapi or dbapi
  const runtime = urlParts[2]; // runtime
  const tenant = urlParts[3]; // xiaoyou
  const appCode = urlParts[4]; // app-e9ced742
  const datasetCode = urlParts[5]; // 9725f8d5308d456e9a6d4789a0a7be6f
  const apiName = urlParts[6]; // getList

  return (
    <div style={{ marginTop: "24px", padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
      <Title level={4} style={{ marginBottom: "18px" }}>API 接口解析</Title>
      <div style={{ marginBottom: "18px", fontSize: "16px" }}>
        <Tag color="blue" style={{ fontSize: "14px", padding: "4px 8px" }}>{callMethod}</Tag>
        <span style={{ margin: "0 4px" }}>/</span>
        <Tag color="green" style={{ fontSize: "14px", padding: "4px 8px" }}>{runtime}</Tag>
        <span style={{ margin: "0 4px" }}>/</span>
        <Tag color="orange" style={{ fontSize: "14px", padding: "4px 8px" }}>{tenant}</Tag>
        <span style={{ margin: "0 4px" }}>/</span>
        <Tag color="purple" style={{ fontSize: "14px", padding: "4px 8px" }}>{appCode}</Tag>
        <span style={{ margin: "0 4px" }}>/</span>
        <Tag color="red" style={{ fontSize: "14px", padding: "4px 8px" }}>{datasetCode}</Tag>
        <span style={{ margin: "0 4px" }}>/</span>
        <Tag color="cyan" style={{ fontSize: "14px", padding: "4px 8px" }}>{apiName}</Tag>
      </div>
      <Divider style={{ margin: "18px 0" }} />
      <div style={{ fontSize: "14px", color: "#666", lineHeight: "1.8" }}>
        <div style={{ marginBottom: "8px" }}><Tag color="blue">调用方式</Tag> {callMethod} - API调用类型 (smartapi/dbapi)</div>
        <div style={{ marginBottom: "8px" }}><Tag color="green">固定前缀</Tag> {runtime} - 运行时标识</div>
        <div style={{ marginBottom: "8px" }}><Tag color="orange">租户名称</Tag> {tenant} - 租户标识</div>
        <div style={{ marginBottom: "8px" }}><Tag color="purple">应用代码</Tag> {appCode} - 应用唯一标识</div>
        <div style={{ marginBottom: "8px" }}><Tag color="red">数据集代码</Tag> {datasetCode} - 数据集唯一标识</div>
        <div style={{ marginBottom: "8px" }}><Tag color="cyan">接口名称</Tag> {apiName} - 具体的API接口名</div>
      </div>
      
      <Divider style={{ margin: "20px 0" }} />
      <div style={{ fontSize: "14px", color: "#d46b08", background: "#fff7e6", padding: "12px", borderRadius: "6px", border: "1px solid #ffd591" }}>
        <Title level={5} style={{ color: "#d46b08", marginBottom: "12px" }}>⚠️ 常见问题说明</Title>
        <div style={{ lineHeight: "1.8" }}>
          <div style={{ marginBottom: "8px" }}>
            <Tag color="warning" size="small">无权限</Tag>
            如果接口返回无权限，请先确认是否是自己有权限的应用，在 <code>app.yuntooai.com</code> 是否已经登录
          </div>
          <div style={{ marginBottom: "8px" }}>
            <Tag color="error" size="small">跨域问题</Tag>
            出现跨域错误，确保项目运行在 <code>dev.yuntooai.com</code> 域名下
          </div>
        </div>
      </div>
    </div>
  );
};

// 简单封装 apiRequest
const apiRequest = async (path: string, options: RequestInit = {}) => {
  const response = await fetch(`https://api.yuntooai.com${path}`, {
    credentials: "include", // 关键配置：跨域请求携带Cookie
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  return response.json();
};

function ChartFetch() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // 获取客户数据
    const fetchData = async () => {
      try {
        setLoading(true);
        // 数据统计接口
        const data = await apiRequest(API_URL, {
          method: "POST",
          body: JSON.stringify({ pageSize: 20, currentPage: 1 }),
        });

        if (data.success) {
          // 根据新的API格式，统计tableColumns中的字段类型分布
          const typeMap = {};
          data.data.tableColumns.forEach((column) => {
            const title = column.title || "未知字段";
            const dataIndex = column.dataIndex || "未知类型";
            // 按字段类型前缀分类（如 TEXT_, RADIO_, SELECT_ 等）
            const typePrefix = dataIndex.split("_")[0] || "其他";
            typeMap[typePrefix] = (typeMap[typePrefix] || 0) + 1;
          });

          // 转换为饼图数据格式
          const pieData = Object.keys(typeMap).map((key) => ({
            name:
              key === "TEXT"
                ? "文本字段"
                : key === "RADIO"
                  ? "单选字段"
                  : key === "SELECT"
                    ? "下拉选择"
                    : key === "NUMBER"
                      ? "数字字段"
                      : key === "DATE"
                        ? "日期字段"
                        : key,
            value: typeMap[key],
          }));

          setChartData(pieData);
        }
      } catch (err) {
        console.error("数据获取失败:", err);
        setError(err.message || "数据字段信息加载失败");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 饼图配置
  const getOption = () => ({
    title: {
      text: "数据字段类型分布",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "字段类型",
        type: "pie",
        radius: "50%",
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={2}>数据字段统计图表</Title>
        <Paragraph>
          这是一个从真实API获取数据并展示的饼图示例，展示了数据表字段类型的分布情况。
        </Paragraph>
      </Card>

      <Card style={{ marginTop: "24px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spin size="large" tip="正在加载字段统计数据..." />
          </div>
        ) : error ? (
          <Alert
            message="字段统计数据加载失败"
            description={error}
            type="error"
            showIcon
          />
        ) : (
          <>
            <ReactECharts
              option={getOption()}
              style={{ height: "400px" }}
              notMerge={true}
              lazyUpdate={true}
            />
            <ApiUrlDisplay />
          </>
        )}
      </Card>
    </div>
  );
}

export default ChartFetch;

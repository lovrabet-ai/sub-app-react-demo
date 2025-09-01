import React, { useState, useEffect } from "react";
import { Card, Spin, Alert, Typography } from "antd";
import ReactECharts from "echarts-for-react";
import ApiUrlDisplay from "../components/ApiUrlDisplay";
import { apiRequest } from "../utils/api";

const { Title, Paragraph } = Typography;

const API_URL =
  "/dbapi/runtime/yuntoo/app-c4055413/76a873945291498498737bc85677983d/getList";


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
          // 字段类型名称映射
          const typeNameMap: Record<string, string> = {
            TEXT: "文本字段",
            RADIO: "单选字段",
            SELECT: "下拉选择",
            NUMBER: "数字字段",
            DATE: "日期字段",
          };

          // 根据新的API格式，统计tableColumns中的字段类型分布
          const typeMap: Record<string, number> = {};
          data.data.tableColumns.forEach((column: any) => {
            const dataIndex = column.dataIndex || "未知类型";
            // 按字段类型前缀分类（如 TEXT_, RADIO_, SELECT_ 等）
            const typePrefix = dataIndex.split("_")[0] || "其他";
            typeMap[typePrefix] = (typeMap[typePrefix] || 0) + 1;
          });

          // 转换为饼图数据格式
          const pieData = Object.keys(typeMap).map((key) => ({
            name: typeNameMap[key] || key,
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
        <Paragraph>数据来源：{API_URL}</Paragraph>
        <Paragraph>
          访问请先确保：1. app.yuntooai.com已登录 2.应用有权限 3. 接口有权限
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
            <ApiUrlDisplay apiUrl={API_URL} />
          </>
        )}
      </Card>
    </div>
  );
}

export default ChartFetch;

import React, { useState, useEffect } from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  ShoppingOutlined,
  DollarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import DemoPageContainer from "@/components/demo-page-container/DemoPageContainer";

const { Title } = Typography;

// Mock 数据
const mockData = {
  // 顶部统计卡片
  statistics: [
    {
      title: "Total users",
      value: 125680,
      prefix: <UserOutlined />,
      suffix: "",
      trend: { value: 12.5, isUp: true },
      color: "#1890ff",
    },
    {
      title: "Orders today",
      value: 3521,
      prefix: <ShoppingOutlined />,
      suffix: "",
      trend: { value: 8.3, isUp: true },
      color: "#52c41a",
    },
    {
      title: "Total sales",
      value: 8965234,
      prefix: <DollarOutlined />,
      suffix: "",
      trend: { value: 15.6, isUp: true },
      color: "#fa8c16",
    },
    {
      title: "Activity",
      value: 89.5,
      prefix: <TrophyOutlined />,
      suffix: "%",
      trend: { value: 3.2, isUp: false },
      color: "#eb2f96",
    },
  ],

  // 销售趋势数据
  salesTrend: {
    dates: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    values: [
      3200, 4500, 3800, 5200, 6100, 5800, 7200, 6800, 7900, 8500, 9200, 9800,
    ],
  },

  // 地区分布数据
  regionDistribution: [
    { name: "East", value: 35 },
    { name: "South", value: 28 },
    { name: "North", value: 22 },
    { name: "Southwest", value: 10 },
    { name: "Northwest", value: 5 },
  ],

  // 产品分类数据
  productCategory: {
    categories: ["Electronics", "Apparel", "Food", "Home", "Beauty", "Other"],
    values: [3200, 2800, 2400, 1800, 1500, 1200],
  },

  // 实时订单数据
  realtimeOrders: [
    { time: "10:00", count: 45 },
    { time: "11:00", count: 52 },
    { time: "12:00", count: 68 },
    { time: "13:00", count: 55 },
    { time: "14:00", count: 72 },
    { time: "15:00", count: 61 },
    { time: "16:00", count: 78 },
    { time: "17:00", count: 85 },
  ],
};

const DataScreen: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 销售趋势折线图配置
  const salesTrendOption = {
    backgroundColor: "transparent",
    title: {
      text: "Sales trend",
      left: "center",
      top: 10,
      textStyle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "#1890ff",
      textStyle: { color: "#fff" },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: mockData.salesTrend.dates,
      axisLine: { lineStyle: { color: "#4a90e2" } },
      axisLabel: { color: "#fff" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#4a90e2" } },
      axisLabel: { color: "#fff" },
      splitLine: { lineStyle: { color: "rgba(74, 144, 226, 0.2)" } },
    },
    series: [
      {
        name: "Sales",
        type: "line",
        data: mockData.salesTrend.values,
        smooth: true,
        lineStyle: { color: "#1890ff", width: 3 },
        itemStyle: { color: "#1890ff" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(24, 144, 255, 0.5)" },
              { offset: 1, color: "rgba(24, 144, 255, 0.1)" },
            ],
          },
        },
      },
    ],
  };

  // 地区分布饼图配置
  const regionPieOption = {
    backgroundColor: "transparent",
    title: {
      text: "Regional mix",
      left: "center",
      top: 10,
      textStyle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "#1890ff",
      textStyle: { color: "#fff" },
      formatter: "{a} <br/>{b}: {c}% ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: "middle",
      textStyle: { color: "#fff" },
    },
    series: [
      {
        name: "Regional mix",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["40%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#0a1929",
          borderWidth: 2,
        },
        label: {
          show: true,
          color: "#fff",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: "bold",
          },
        },
        data: mockData.regionDistribution.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: ["#1890ff", "#52c41a", "#fa8c16", "#eb2f96", "#722ed1"][
              index
            ],
          },
        })),
      },
    ],
  };

  // 产品分类柱状图配置
  const productBarOption = {
    backgroundColor: "transparent",
    title: {
      text: "Sales by category",
      left: "center",
      top: 10,
      textStyle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "#1890ff",
      textStyle: { color: "#fff" },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: mockData.productCategory.categories,
      axisLine: { lineStyle: { color: "#4a90e2" } },
      axisLabel: { color: "#fff", rotate: 45 },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#4a90e2" } },
      axisLabel: { color: "#fff" },
      splitLine: { lineStyle: { color: "rgba(74, 144, 226, 0.2)" } },
    },
    series: [
      {
        name: "Sales",
        type: "bar",
        data: mockData.productCategory.values,
        itemStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#52c41a" },
              { offset: 1, color: "#1890ff" },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  // 实时订单折线图配置
  const realtimeOrderOption = {
    backgroundColor: "transparent",
    title: {
      text: "Live order trend",
      left: "center",
      top: 10,
      textStyle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "#1890ff",
      textStyle: { color: "#fff" },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: mockData.realtimeOrders.map((item) => item.time),
      axisLine: { lineStyle: { color: "#4a90e2" } },
      axisLabel: { color: "#fff" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#4a90e2" } },
      axisLabel: { color: "#fff" },
      splitLine: { lineStyle: { color: "rgba(74, 144, 226, 0.2)" } },
    },
    series: [
      {
        name: "Orders",
        type: "line",
        data: mockData.realtimeOrders.map((item) => item.count),
        smooth: true,
        lineStyle: { color: "#fa8c16", width: 3 },
        itemStyle: { color: "#fa8c16" },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(250, 140, 22, 0.5)" },
              { offset: 1, color: "rgba(250, 140, 22, 0.1)" },
            ],
          },
        },
      },
    ],
  };

  return (
    <DemoPageContainer variant="bleed">
      <div
        style={{
          minHeight: "calc(100vh - 112px)",
          background: "linear-gradient(135deg, #0a1929 0%, #1a2332 100%)",
          padding: "24px",
          color: "#fff",
          borderRadius: 0,
        }}
      >
        {/* 顶部标题栏 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <Title level={2} style={{ color: "#fff", margin: 0 }}>
            Data screen
          </Title>
          <div style={{ fontSize: 16, color: "#4a90e2" }}>
            {currentTime.toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
        </div>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {mockData.statistics.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                style={{
                  background: "rgba(24, 144, 255, 0.1)",
                  border: "1px solid rgba(24, 144, 255, 0.3)",
                  borderRadius: 8,
                }}
                bodyStyle={{ padding: 20 }}
              >
                <Statistic
                  title={
                    <span style={{ color: "#fff", fontSize: 14 }}>
                      {stat.title}
                    </span>
                  }
                  value={stat.value}
                  prefix={
                    <span style={{ color: stat.color, marginRight: 8 }}>
                      {stat.prefix}
                    </span>
                  }
                  suffix={
                    <span style={{ color: "#fff", fontSize: 14 }}>
                      {stat.suffix}
                    </span>
                  }
                  valueStyle={{
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                />
                <div style={{ marginTop: 8, fontSize: 12, color: "#4a90e2" }}>
                  {stat.trend.isUp ? (
                    <ArrowUpOutlined style={{ color: "#52c41a" }} />
                  ) : (
                    <ArrowDownOutlined style={{ color: "#ff4d4f" }} />
                  )}
                  <span
                    style={{
                      color: stat.trend.isUp ? "#52c41a" : "#ff4d4f",
                      marginLeft: 4,
                    }}
                  >
                    {stat.trend.value}%
                  </span>
                  <span style={{ color: "#8c8c8c", marginLeft: 8 }}>
                    vs last month
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 图表区域 */}
        <Row gutter={[16, 16]}>
          {/* 销售趋势 */}
          <Col xs={24} lg={16}>
            <Card
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(24, 144, 255, 0.3)",
                borderRadius: 8,
              }}
              bodyStyle={{ padding: 16 }}
            >
              <ReactECharts
                option={salesTrendOption}
                style={{ height: "400px", width: "100%" }}
              />
            </Card>
          </Col>

          {/* 地区分布 */}
          <Col xs={24} lg={8}>
            <Card
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(24, 144, 255, 0.3)",
                borderRadius: 8,
              }}
              bodyStyle={{ padding: 16 }}
            >
              <ReactECharts
                option={regionPieOption}
                style={{ height: "400px", width: "100%" }}
              />
            </Card>
          </Col>

          {/* 产品分类 */}
          <Col xs={24} lg={12}>
            <Card
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(24, 144, 255, 0.3)",
                borderRadius: 8,
              }}
              bodyStyle={{ padding: 16 }}
            >
              <ReactECharts
                option={productBarOption}
                style={{ height: "350px", width: "100%" }}
              />
            </Card>
          </Col>

          {/* 实时订单 */}
          <Col xs={24} lg={12}>
            <Card
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(24, 144, 255, 0.3)",
                borderRadius: 8,
              }}
              bodyStyle={{ padding: 16 }}
            >
              <ReactECharts
                option={realtimeOrderOption}
                style={{ height: "350px", width: "100%" }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </DemoPageContainer>
  );
};

export default DataScreen;

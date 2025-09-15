import React from 'react';
import { Row, Col, Card, Statistic, Typography, Table, Progress, Space } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  // 模拟数据
  const topCardsData = [
    { title: '个人销售成交额', value: 120565, color: '#5B8FF9', unit: '' },
    { title: '成交订单数', value: 352100, color: '#FF6B6B', unit: '' },
    { title: '分销商收入', value: 596850, color: '#FFB800', unit: '' },
    { title: '个人销售成交额', value: 7982991, color: '#5AD8A6', unit: '' },
    { title: '分销商收入', value: 27890.00, color: '#999', unit: '' }
  ];

  // 市场占率折线图配置
  const marketShareOption = {
    title: { text: '市场占率', left: 20, top: 10, textStyle: { fontSize: 16, fontWeight: 'bold' } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['商场一', '商场二'], right: 20, top: 10 },
    grid: { left: 40, right: 40, bottom: 40, top: 60 },
    xAxis: {
      type: 'category',
      data: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '商场一',
        type: 'line',
        data: [620, 750, 900, 620, 450, 400],
        smooth: true,
        lineStyle: { color: '#5B8FF9' },
        areaStyle: { color: 'rgba(91, 143, 249, 0.1)' }
      },
      {
        name: '商场二',
        type: 'line',
        data: [650, 600, 400, 800, 300, 250],
        smooth: true,
        lineStyle: { color: '#5AD8A6' },
        areaStyle: { color: 'rgba(90, 216, 166, 0.1)' }
      }
    ]
  };

  // 市场数据柱状图配置
  const marketDataOption = {
    title: { text: '市场数据', left: 20, top: 10, textStyle: { fontSize: 16, fontWeight: 'bold' } },
    tooltip: { trigger: 'axis' },
    legend: { data: ['商场一', '商场二'], right: 20, top: 10 },
    grid: { left: 40, right: 40, bottom: 40, top: 60 },
    xAxis: {
      type: 'category',
      data: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '商场一',
        type: 'bar',
        data: [400, 500, 900, 200, 300, 600],
        itemStyle: { color: '#5B8FF9' }
      },
      {
        name: '商场二',
        type: 'bar',
        data: [300, 800, 400, 500, 400, 500],
        itemStyle: { color: '#5AD8A6' }
      }
    ]
  };

  // 客户转换漏斗图配置
  const funnelOption = {
    title: { text: '客户转换漏斗', left: 'center', top: 10, textStyle: { fontSize: 16, fontWeight: 'bold' } },
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}%' },
    series: [
      {
        name: '客户转换',
        type: 'funnel',
        left: '10%',
        top: '60',
        width: '80%',
        height: '60%',
        data: [
          { value: 10, name: '商场二', itemStyle: { color: '#5AD8A6' } },
          { value: 10, name: '商场一', itemStyle: { color: '#5B8FF9' } },
          { value: 10, name: '商场三', itemStyle: { color: '#FFB800' } },
          { value: 10, name: '商场四', itemStyle: { color: '#FF6B6B' } },
          { value: 10, name: '商场五', itemStyle: { color: '#9270CA' } }
        ],
        label: { show: true, position: 'inside' }
      }
    ]
  };

  // 客户分布饼图配置
  const pieOption = {
    title: { text: '客户分布', left: 'center', top: 10, textStyle: { fontSize: 16, fontWeight: 'bold' } },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', right: 20, top: 'middle' },
    series: [
      {
        name: '客户分布',
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['40%', '60%'],
        data: [
          { value: 20, name: '商场二', itemStyle: { color: '#5B8FF9' } },
          { value: 20, name: '商场一', itemStyle: { color: '#FF6B6B' } },
          { value: 20, name: '商场三', itemStyle: { color: '#FFB800' } },
          { value: 30, name: '商场四', itemStyle: { color: '#5AD8A6' } },
          { value: 10, name: '商场五', itemStyle: { color: '#9270CA' } }
        ]
      }
    ]
  };

  // 市场趋势面积图配置
  const trendOption = {
    title: { text: '市场趋势', left: 20, top: 10, textStyle: { fontSize: 16, fontWeight: 'bold' } },
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 40, bottom: 40, top: 60 },
    xAxis: {
      type: 'category',
      data: ['数据1', '数据2', '数据3', '数据4', '数据5', '数据6']
    },
    yAxis: { type: 'value' },
    series: [
      {
        type: 'line',
        data: [400, 350, 300, 622, 400, 700],
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 107, 107, 0.8)' },
              { offset: 1, color: 'rgba(255, 107, 107, 0.1)' }
            ]
          }
        },
        lineStyle: { color: '#FF6B6B' }
      }
    ]
  };

  // 销售明细表格数据
  const salesDetailData = [
    { key: '1', name: '用户满意度', branch: '45122', city: '广州', status: '已装' },
    { key: '2', name: '用户满意度', branch: '43122', city: '广州', status: '已装' },
    { key: '3', name: '用户满意度', branch: '45122', city: '广州', status: '已装' },
    { key: '4', name: '用户满意度', branch: '45122', city: '广州', status: '已装' },
    { key: '5', name: '用户满意度', branch: '45122', city: '广州', status: '已装' },
    { key: '6', name: '用户满意度', branch: '45122', city: '广州', status: '已装' },
    { key: '7', name: '用户满意度', branch: '45122', city: '广州', status: '已装' },
    { key: '8', name: '用户满意度', branch: '45122', city: '广州', status: '已装' }
  ];

  const salesColumns = [
    { title: '分销商用户名', dataIndex: 'name', key: 'name' },
    { title: '分销商名称', dataIndex: 'branch', key: 'branch' },
    { title: '分销商等级', dataIndex: 'city', key: 'city' },
    { title: '覆盖地域', dataIndex: 'status', key: 'status' }
  ];

  return (
    <div style={{ padding: '16px', backgroundColor: '#fff', minHeight: '100vh' }}>
      {/* 顶部数据卡片 */}
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={4}>
          <div style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
            <Statistic
              title="个人销售成交额"
              value={120565}
              valueStyle={{ color: '#5B8FF9', fontSize: '20px' }}
            />
          </div>
        </Col>
        <Col span={4}>
          <div style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
            <Statistic
              title="成交订单数"
              value={352100}
              valueStyle={{ color: '#FF6B6B', fontSize: '20px' }}
            />
          </div>
        </Col>
        <Col span={4}>
          <div style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
            <Statistic
              title="分销商收入"
              value={596850}
              valueStyle={{ color: '#FFB800', fontSize: '20px' }}
            />
          </div>
        </Col>
        <Col span={4}>
          <div style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
            <Statistic
              title="个人销售成交额"
              value={7982991}
              valueStyle={{ color: '#5AD8A6', fontSize: '20px' }}
            />
          </div>
        </Col>
        <Col span={8}>
          <div style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
            <Statistic
              title="分销商收入"
              value={27890.00}
              valueStyle={{ color: '#999', fontSize: '24px' }}
              suffix={<ArrowUpOutlined style={{ color: '#52C41A' }} />}
            />
          </div>
        </Col>
      </Row>

      {/* 第二行 - 图表区域 */}
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col span={8}>
          <div style={{ padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px', height: '400px' }}>
            <ReactECharts option={marketShareOption} style={{ height: '360px' }} />
          </div>
        </Col>
        <Col span={4}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '400px', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px', flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>个人销售额</div>
              <Statistic
                value={352100}
                valueStyle={{ color: '#5B8FF9', fontSize: '28px' }}
                suffix={
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#52C41A', fontSize: '14px' }}>+85%</span>
                    <ArrowUpOutlined style={{ color: '#52C41A' }} />
                  </div>
                }
              />
              <div style={{ marginTop: '8px', color: '#999', fontSize: '12px' }}>
                目标完成：4,825,000
              </div>
            </div>
            <div style={{ padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px', flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>本月目标销售额</div>
              <Statistic
                value={7982991}
                valueStyle={{ color: '#FF6B6B', fontSize: '28px' }}
                suffix={
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#52C41A', fontSize: '14px' }}>+21%</span>
                    <ArrowUpOutlined style={{ color: '#52C41A' }} />
                  </div>
                }
              />
              <div style={{ marginTop: '8px', color: '#999', fontSize: '12px' }}>
                目标完成：33,555,000
              </div>
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px', height: '400px' }}>
            <ReactECharts option={marketDataOption} style={{ height: '360px' }} />
          </div>
        </Col>
      </Row>

      {/* 第三行 - 底部图表 */}
      <Row gutter={16}>
        <Col span={6}>
          <div style={{ padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px', height: '350px' }}>
            <ReactECharts option={funnelOption} style={{ height: '310px' }} />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px', height: '350px' }}>
            <ReactECharts option={pieOption} style={{ height: '310px' }} />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px', height: '350px' }}>
            <ReactECharts option={trendOption} style={{ height: '310px' }} />
          </div>
        </Col>
        <Col span={6}>
          <div style={{ padding: '12px', backgroundColor: '#fafafa', borderRadius: '8px', height: '350px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>销售明细</span>
              <div style={{ fontSize: '12px', color: '#999' }}>
                1-20 共 41 条 &lt; &gt;
              </div>
            </div>
            <div style={{ height: '280px', overflow: 'hidden' }}>
              <Table
                dataSource={salesDetailData}
                columns={salesColumns.map(col => ({
                  ...col,
                  width: col.key === 'name' ? 60 : col.key === 'branch' ? 50 : col.key === 'city' ? 40 : 40
                }))}
                size="small"
                pagination={false}
                scroll={{ y: 250, x: 'max-content' }}
                style={{ fontSize: '11px' }}
                showHeader={true}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
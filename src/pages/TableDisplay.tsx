import React, { useState, useEffect } from "react";
import { Card, Spin, Alert, Typography, Table } from "antd";
import ApiUrlDisplay from "../components/ApiUrlDisplay";
import { apiRequest } from "../utils/api";

const { Title, Paragraph } = Typography;

const API_URL =
  "/dbapi/runtime/yuntoo/app-c4055413/76a873945291498498737bc85677983d/getList";

function TableDisplay() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0,
  });

  const fetchData = async (page: number = 1, size: number = 20) => {
    try {
      setLoading(true);
      // 数据表格接口
      const data = await apiRequest(API_URL, {
        method: "POST",
        body: JSON.stringify({ pageSize: size, currentPage: page }),
      });

      if (data.success) {
        // 设置表格数据
        setTableData(data.data.tableData || []);

        // 设置分页信息
        setPagination({
          current: data.data.paging?.currentPage || page,
          pageSize: data.data.paging?.pageSize || size,
          total: data.data.paging?.totalCount || 0,
        });

        // 根据 tableColumns 动态生成表格列配置
        if (data.data.tableColumns && data.data.tableColumns.length > 0) {
          const tableColumns = data.data.tableColumns.map((column: any) => ({
            title: column.title || column.dataIndex,
            dataIndex: column.dataIndex,
            key: column.dataIndex,
            width: 150,
            ellipsis: true,
            render: (text: any) => {
              // 处理复杂数据类型的显示
              if (Array.isArray(text) && text.length > 0 && text[0]?.label) {
                return text.map((item: any) => item.label).join(", ");
              }
              if (typeof text === "object" && text !== null) {
                return JSON.stringify(text);
              }
              return text;
            },
          }));
          setColumns(tableColumns);
        }
      }
    } catch (err: any) {
      console.error("数据获取失败:", err);
      setError(err.message || "表格数据加载失败");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTableChange = (paginationConfig: any) => {
    fetchData(paginationConfig.current, paginationConfig.pageSize);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={2}>数据表格展示</Title>
        <Paragraph>
          这是一个从真实API获取数据并展示的表格示例，展示了接口返回的tableData中的所有数据。
        </Paragraph>
        <Paragraph>数据来源：{API_URL}</Paragraph>
        <Paragraph>
          访问请先确保：1. app.yuntooai.com已登录 2.应用有权限 3. 接口有权限
        </Paragraph>
      </Card>

      <Card style={{ marginTop: "24px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spin size="large" tip="正在加载表格数据..." />
          </div>
        ) : error ? (
          <Alert
            message="表格数据加载失败"
            description={error}
            type="error"
            showIcon
          />
        ) : (
          <>
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={{
                ...pagination,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
                pageSizeOptions: ["10", "20", "50", "100"],
              }}
              scroll={{ x: 1200 }}
              onChange={handleTableChange}
              rowKey={(record, index) => `${record.id || index}`}
              size="middle"
            />
            <ApiUrlDisplay apiUrl={API_URL} />
          </>
        )}
      </Card>
    </div>
  );
}

export default TableDisplay;

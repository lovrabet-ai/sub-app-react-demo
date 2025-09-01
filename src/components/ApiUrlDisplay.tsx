import React from "react";
import { Typography, Tag, Divider } from "antd";

const { Title } = Typography;

interface ApiUrlDisplayProps {
  apiUrl: string;
}

const ApiUrlDisplay: React.FC<ApiUrlDisplayProps> = ({ apiUrl }) => {
  const urlParts = apiUrl.split("/");
  const callMethod = urlParts[1]; // smartapi or dbapi
  const runtime = urlParts[2]; // runtime
  const tenant = urlParts[3]; // tenant name
  const appCode = urlParts[4]; // app code
  const datasetCode = urlParts[5]; // dataset code
  const apiName = urlParts[6]; // api name

  return (
    <div
      style={{
        marginTop: "24px",
        padding: "20px",
        background: "#f5f5f5",
        borderRadius: "8px",
      }}
    >
      <Title level={4} style={{ marginBottom: "18px" }}>
        API 接口解析
      </Title>
      <div style={{ marginBottom: "18px", fontSize: "16px" }}>
        <Tag color="blue" style={{ fontSize: "14px", padding: "4px 8px" }}>
          {callMethod}
        </Tag>
        <span style={{ margin: "0 4px" }}>/</span>
        <Tag color="green" style={{ fontSize: "14px", padding: "4px 8px" }}>
          {runtime}
        </Tag>
        <span style={{ margin: "0 4px" }}>/</span>
        <Tag color="orange" style={{ fontSize: "14px", padding: "4px 8px" }}>
          {tenant}
        </Tag>
        <span style={{ margin: "0 4px" }}>/</span>
        <Tag color="purple" style={{ fontSize: "14px", padding: "4px 8px" }}>
          {appCode}
        </Tag>
        <span style={{ margin: "0 4px" }}>/</span>
        <Tag color="red" style={{ fontSize: "14px", padding: "4px 8px" }}>
          {datasetCode}
        </Tag>
        <span style={{ margin: "0 4px" }}>/</span>
        <Tag color="cyan" style={{ fontSize: "14px", padding: "4px 8px" }}>
          {apiName}
        </Tag>
      </div>
      <Divider style={{ margin: "18px 0" }} />
      <div style={{ fontSize: "14px", color: "#666", lineHeight: "1.8" }}>
        <div style={{ marginBottom: "8px" }}>
          <Tag color="blue">调用方式</Tag> {callMethod} - API调用类型
          (smartapi/dbapi)
        </div>
        <div style={{ marginBottom: "8px" }}>
          <Tag color="green">固定前缀</Tag> {runtime} - 运行时标识
        </div>
        <div style={{ marginBottom: "8px" }}>
          <Tag color="orange">租户名称</Tag> {tenant} - 租户标识
        </div>
        <div style={{ marginBottom: "8px" }}>
          <Tag color="purple">应用代码</Tag> {appCode} - 应用唯一标识
        </div>
        <div style={{ marginBottom: "8px" }}>
          <Tag color="red">数据集代码</Tag> {datasetCode} - 数据集唯一标识
        </div>
        <div style={{ marginBottom: "8px" }}>
          <Tag color="cyan">接口名称</Tag> {apiName} - 具体的API接口名
        </div>
      </div>

      <Divider style={{ margin: "20px 0" }} />
      <div
        style={{
          fontSize: "14px",
          color: "#d46b08",
          background: "#fff7e6",
          padding: "12px",
          borderRadius: "6px",
          border: "1px solid #ffd591",
        }}
      >
        <Title level={5} style={{ color: "#d46b08", marginBottom: "12px" }}>
          ⚠️ 常见问题说明
        </Title>
        <div style={{ lineHeight: "1.8" }}>
          <div style={{ marginBottom: "8px" }}>
            <Tag color="warning">无权限</Tag>
            如果接口返回无权限，请先确认是否是自己有权限的应用，在{" "}
            <code>app.yuntooai.com</code> 是否已经登录
          </div>
          <div style={{ marginBottom: "8px" }}>
            <Tag color="error">跨域问题</Tag>
            出现跨域错误，确保项目运行在 <code>dev.yuntooai.com</code> 域名下
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiUrlDisplay;
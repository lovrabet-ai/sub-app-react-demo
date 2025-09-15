import React, { useState, useEffect } from 'react';
import { createClient } from '@lovrabet/sdk';
import { LOVRABET_APP_CODE } from '../../api/api';

// 创建使用 Cookie 认证的客户端（不传入 token 或 API keys）
const cookieClient = createClient({
  appCode: LOVRABET_APP_CODE,
  env: 'online',

  // 不传入任何认证信息，将使用 Cookie 认证
  entities: {
    Requirements: {
      tableName: "requirements",
      datasetId: "d26ed512e878461ca97d287a47606fd3",
    },
    Projects: {
      tableName: "projects",
      datasetId: "c6e55d6720b84ffcb21698b0a04ccd23",
    }
  },
});

const CookieAuthDemo: React.FC = () => {
  const [requirements, setRequirements] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('使用 Cookie 认证获取数据...');

      // 测试连接
      const isConnected = await cookieClient.testConnection();
      console.log('连接测试结果:', isConnected);

      // 获取需求列表
      const requirementsData = await cookieClient.entities.Requirements.list({
        pageSize: 5
      });
      console.log('需求数据:', requirementsData);
      setRequirements(requirementsData.tableData || []);

      // 获取项目列表
      const projectsData = await cookieClient.entities.Projects.list({
        pageSize: 5
      });
      console.log('项目数据:', projectsData);
      setProjects(projectsData.tableData || []);

    } catch (err: any) {
      console.error('Cookie 认证请求失败:', err);
      setError(err.message || '请求失败');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cookie 认证测试</h1>
      <p>这个页面测试使用 Cookie 认证（无需传入 token 或 API keys）</p>

      <button onClick={fetchData} disabled={loading}>
        {loading ? '加载中...' : '重新获取数据'}
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          错误: {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <h2>需求列表 (Cookie Auth)</h2>
          {requirements.length > 0 ? (
            <ul>
              {requirements.map((req, index) => (
                <li key={index}>
                  {JSON.stringify(req, null, 2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>暂无数据</p>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h2>项目列表 (Cookie Auth)</h2>
          {projects.length > 0 ? (
            <ul>
              {projects.map((proj, index) => (
                <li key={index}>
                  {JSON.stringify(proj, null, 2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>暂无数据</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieAuthDemo;
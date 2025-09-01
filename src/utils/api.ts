// 简单封装 apiRequest
export const apiRequest = async (path: string, options: RequestInit = {}) => {
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
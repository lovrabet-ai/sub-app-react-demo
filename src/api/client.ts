/**
 * Lovrabet SDK 客户端实例
 *
 * 这个文件负责创建和导出统一的客户端实例，供整个应用使用
 * 通过导入 './api' 文件来自动执行配置注册
 */

import { createClient } from "@lovrabet/sdk";
import "./api"; // 导入配置文件，执行 registerModels() 注册

/**
 * 主要的客户端实例
 * 使用最简洁的方式创建：无参数调用，自动使用已注册的 'default' 配置
 */
export const lovrabetClient = createClient();

/**
 * 使用示例：
 *
 * // 在组件中使用
 * import { lovrabetClient } from '@/api/client';
 *
 * // 获取数据列表
 * const requirements = await lovrabetClient.models.Requirements.getList({
 *   currentPage: 1,
 *   pageSize: 20
 * });
 *
 * // 获取单条记录
 * const requirement = await lovrabetClient.models.Requirements.getOne('123');
 *
 * // 创建新记录
 * const newRequirement = await lovrabetClient.models.Requirements.create({
 *   title: '新需求',
 *   description: '需求描述'
 * });
 */

/**
 * 其他创建客户端的方式（根据需要选择）：
 *
 * 1. 明确指定配置名称：
 * export const lovrabetClient = createClient('default');
 *
 * 2. 使用其他已注册的配置：
 * export const devClient = createClient('dev');
 * export const prodClient = createClient('prod');
 *
 * 3. 直接传入配置对象：
 * import { LOVRABET_MODELS_CONFIG } from './api';
 * export const lovrabetClient = createClient(LOVRABET_MODELS_CONFIG);
 *
 * 4. 通过 ClientConfig 指定配置名和其他选项：
 * export const lovrabetClient = createClient({
 *   modelConfigName: 'default',
 *   token: 'custom-token',
 *   env: 'daily'
 * });
 *
 * 5. 多项目支持示例：
 * export const projectAClient = createClient('project-a');
 * export const projectBClient = createClient('project-b');
 */

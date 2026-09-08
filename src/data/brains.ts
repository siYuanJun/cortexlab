/* ============================================================
   大脑应用数据
   用于大脑适配实验室的可拖拽卡片
   ============================================================ */

export interface BrainData {
  id: string
  name: string
  nameEn: string
  icon: string
  description: string
  techStack: string[]
  taskTypes: { id: string; name: string; description: string }[]
  status: 'production' | 'beta' | 'experimental' | 'concept'
  statusLabel: string
  color: string
  glowColor: string
  adapterSteps: string[]
  repoPath?: string
}

export const BRAINS: BrainData[] = [
  {
    id: 'ontology',
    name: '本体建模大脑',
    nameEn: 'Ontology Brain',
    icon: '🧠',
    description:
      '输入业务文档，六环流水线产出本体 Schema + 实例 + RAG 代码 + 评测报告。当前主力大脑，已完成实例补给接入和环⑥评测修复。',
    techStack: ['Python', '六环流水线', 'LLM (DeepSeek)', 'OpenClaw/CoPaw'],
    taskTypes: [
      { id: 'design-ontology', name: '本体建模', description: '输入业务文档，产出 Schema/实例/RAG/评测' },
      { id: 'validate-ontology', name: '本体校验', description: '校验本体 JSON 结构合法性' },
    ],
    status: 'production',
    statusLabel: '已上线',
    color: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.5)',
    adapterSteps: [
      '继承 BaseBrain，实现 on_task 路由 design-ontology / validate-ontology',
      '写 brain.yaml：id=ontology, task_types 声明两种任务',
      'LLM 环境变量桥接（LLM_GATEWAY_URL → LLM_BASE_URL，必须在 import pipeline 之前）',
      '产物收集：8 个标准产物文件，通过 artifacts 声明',
      'exit code 映射：0→success, 1→error, 2→failed(保留产物), 3→partial',
      'Dockerfile：FROM worker-sdk-python，pip install 业务依赖，CMD agentteams-sdk run',
      'BrainInterfaceTester 7 项合规检查全过',
    ],
    repoPath: 'ontology-brain/',
  },
  {
    id: 'autologic',
    name: 'Auto Logic 大脑',
    nameEn: 'Auto Logic Brain',
    icon: '⚡',
    description:
      '概念设计：通用逻辑推理大脑，负责任务拆解、逻辑推理、流程编排。非真实项目，仅作为"未来可扩展大脑"的示例。当前数字员工的默认思维能力由 Manager 运行时直接提供，不需要单独的 Auto Logic 大脑。',
    techStack: ['Python', 'CoPaw', 'AgentScope', 'LLM'],
    taskTypes: [
      { id: 'logic-reasoning', name: '逻辑推理', description: '通用任务的逻辑推理与拆解' },
      { id: 'task-planning', name: '任务规划', description: '复杂任务的步骤编排与执行' },
    ],
    status: 'concept',
    statusLabel: '概念设计',
    color: '#b8941f',
    glowColor: 'rgba(184, 148, 31, 0.5)',
    adapterSteps: [
      '参考 ontology-brain 模式：继承 BaseBrain + brain.yaml + Dockerfile',
      'task_types 声明 logic-reasoning / task-planning',
      '推理结果通过 self.sdk.llm.chat 调用 LLM',
      '任务分发通过 Matrix 消息通知对应 Worker',
    ],
  },
  {
    id: 'legal',
    name: '法务大脑',
    nameEn: 'Legal Brain',
    icon: '⚖️',
    description:
      '合同审查、法律文书生成、法规检索。输入合同文档，输出风险点、修改建议、合规报告。',
    techStack: ['Python', '法律 NLP', 'LLM', '向量检索'],
    taskTypes: [
      { id: 'contract-review', name: '合同审查', description: '审查合同风险点，输出修改建议' },
      { id: 'legal-research', name: '法规检索', description: '检索相关法律法规和判例' },
    ],
    status: 'concept',
    statusLabel: '概念设计',
    color: '#4a9d8f',
    glowColor: 'rgba(74, 157, 143, 0.5)',
    adapterSteps: [
      '参考 ontology-brain 模式：继承 BaseBrain + brain.yaml + Dockerfile',
      'task_types 声明 contract-review / legal-research',
      '法务知识库通过 MinIO 存储，self.sdk.files 访问',
      'LLM 调用走 self.sdk.llm.chat，自动经 Higress 网关',
      '审查结果通过 artifacts 交付，Matrix 消息通知人类',
    ],
  },
  {
    id: 'finance',
    name: '财务大脑',
    nameEn: 'Finance Brain',
    icon: '💰',
    description:
      '财务报表分析、预算编制、税务计算、风险预警。输入财务数据，输出分析报告和决策建议。',
    techStack: ['Python', 'pandas', '财务模型', 'LLM'],
    taskTypes: [
      { id: 'report-analysis', name: '报表分析', description: '分析财务报表，输出洞察' },
      { id: 'budget-planning', name: '预算编制', description: '辅助编制预算和预测' },
    ],
    status: 'concept',
    statusLabel: '概念设计',
    color: '#e8d5a3',
    glowColor: 'rgba(232, 213, 163, 0.4)',
    adapterSteps: [
      '继承 BaseBrain，实现 on_task',
      '财务数据通过 self.sdk.kv 存储结构化数据',
      '报表生成后通过 self.sdk.files.save 写入 MinIO',
      '人类可通过 Matrix 消息实时干预分析方向',
    ],
  },
  {
    id: 'code',
    name: '代码大脑',
    nameEn: 'Code Brain',
    icon: '💻',
    description:
      '代码审查、重构建议、Bug 修复、测试生成。输入代码仓库，输出审查报告和可执行的修改方案。',
    techStack: ['Python', '代码分析', 'LLM', 'AST 解析'],
    taskTypes: [
      { id: 'code-review', name: '代码审查', description: '审查代码质量、安全、性能' },
      { id: 'refactor', name: '重构建议', description: '输出可执行的重构方案' },
    ],
    status: 'concept',
    statusLabel: '概念设计',
    color: '#8b7d5c',
    glowColor: 'rgba(139, 125, 92, 0.5)',
    adapterSteps: [
      '代码仓库通过 self.sdk.files 访问（MinIO 存储）',
      'AST 解析在 Worker 本地执行，无状态',
      '审查结果通过 Matrix 消息实时推送',
      '可与 GitHub skill 集成，直接操作 PR',
    ],
  },
  {
    id: 'data',
    name: '数据分析大脑',
    nameEn: 'Data Analysis Brain',
    icon: '📊',
    description:
      '数据清洗、可视化、统计分析、洞察生成。输入数据集，输出分析报告、图表和业务建议。',
    techStack: ['Python', 'pandas', 'matplotlib', 'LLM', 'ECharts'],
    taskTypes: [
      { id: 'data-cleaning', name: '数据清洗', description: '清洗和预处理数据' },
      { id: 'insight-generation', name: '洞察生成', description: '生成数据分析报告和业务建议' },
    ],
    status: 'concept',
    statusLabel: '概念设计',
    color: '#2d6b5f',
    glowColor: 'rgba(45, 107, 95, 0.5)',
    adapterSteps: [
      '数据集通过 self.sdk.files 读写',
      '图表生成后保存为 PNG，通过 artifacts 交付',
      'LLM 生成自然语言洞察，self.sdk.llm.chat',
      '人类可通过 Matrix 消息指定分析维度',
    ],
  },
]

export const getBrain = (id: string): BrainData | undefined =>
  BRAINS.find((b) => b.id === id)

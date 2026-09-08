/* ============================================================
   SDK 分层架构数据
   用于 SDK 核心解剖视图
   ============================================================ */

export interface SdkLayer {
  id: string
  name: string
  nameEn: string
  level: number // 1=最上层(大脑), 4=最底层(平台)
  color: string
  glowColor: string
  description: string
  components: {
    name: string
    description: string
    file?: string
  }[]
  keyInterfaces: string[]
}

export const SDK_LAYERS: SdkLayer[] = [
  {
    id: 'brain-layer',
    name: '大脑应用层',
    nameEn: 'Brain Application Layer',
    level: 1,
    color: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.4)',
    description:
      '开发者编写的业务大脑。每个大脑 = 一个继承 BaseBrain 的 Python 包 + brain.yaml + Dockerfile。大脑只关心业务逻辑，平台能力全部通过 self.sdk 调用。这是 SDK 的"用户层"——开发者只需要接触这一层。',
    components: [
      { name: 'OntologyBrain', description: '本体建模大脑，六环流水线', file: 'ontology-brain/src/main.py' },
      { name: 'Auto Logic', description: '默认逻辑推理大脑', file: 'manager/agent/copaw-manager-agent/' },
      { name: 'LegalBrain (概念)', description: '法务大脑，合同审查', },
      { name: 'FinanceBrain (概念)', description: '财务大脑，报表分析', },
      { name: 'CodeBrain (概念)', description: '代码大脑，审查重构', },
    ],
    keyInterfaces: ['BaseBrain.on_task()', 'brain.yaml', 'Dockerfile'],
  },
  {
    id: 'core-layer',
    name: 'SDK 核心层',
    nameEn: 'SDK Core Layer',
    level: 2,
    color: '#b8941f',
    glowColor: 'rgba(184, 148, 31, 0.4)',
    description:
      'SDK 的核心接口定义。BaseBrain 定义大脑的生命周期回调；WorkerSDK 是五大平台能力的统一入口；TaskContext/TaskResult 封装任务的输入输出格式。这一层是纯接口定义，不含平台特定实现，保证大脑的平台无关性。',
    components: [
      { name: 'BaseBrain', description: '大脑基类，on_task 必填，on_message/on_startup/on_shutdown/on_health_check 可选', file: 'core/base_brain.py' },
      { name: 'WorkerSDK', description: '能力入口：llm / communication / files / kv / shared 五大能力', file: 'core/sdk.py' },
      { name: 'TaskContext', description: '任务上下文：task_id / task_type / input / room_id / requester', file: 'core/task_context.py' },
      { name: 'TaskResult', description: '任务结果：status / output / artifacts / metadata / error_message', file: 'core/task_result.py' },
      { name: 'Exceptions', description: 'SDKError / ConfigError / LLMError / StorageError / CommunicationError', file: 'core/exceptions.py' },
    ],
    keyInterfaces: ['BaseBrain', 'WorkerSDK', 'TaskContext', 'TaskResult', 'TaskStatus'],
  },
  {
    id: 'runtime-layer',
    name: '运行时层',
    nameEn: 'Runtime Layer',
    level: 3,
    color: '#4a9d8f',
    glowColor: 'rgba(74, 157, 143, 0.4)',
    description:
      'SDK 的执行引擎。dispatcher 从 Matrix 接收任务并分发给大脑；brain_runner 管理大脑生命周期；protocol 定义任务状态机；health 定期上报健康。运行时对大脑开发者透明——不需要手动管理，SDK CLI run 启动后自动运行。',
    components: [
      { name: 'dispatcher', description: '任务分发器，从 Matrix 接收任务，路由到对应大脑', file: 'runtime/dispatcher.py' },
      { name: 'brain_runner', description: '大脑运行器，管理启动/执行/关闭/异常恢复', file: 'runtime/brain_runner.py' },
      { name: 'protocol', description: '任务状态机：pending → submitted → running → success/failed', file: 'runtime/protocol.py' },
      { name: 'health', description: '健康检查，定期上报 Manager', file: 'runtime/health.py' },
      { name: 'CLI (agentteams-sdk)', description: '命令行入口：check（7项合规检查）/ run（启动大脑）', file: 'cli/main.py' },
    ],
    keyInterfaces: ['agentteams-sdk check', 'agentteams-sdk run', 'TaskStatus 状态机'],
  },
  {
    id: 'adapter-layer',
    name: '平台适配层',
    nameEn: 'Platform Adapter Layer',
    level: 4,
    color: '#2d6b5f',
    glowColor: 'rgba(45, 107, 95, 0.4)',
    description:
      '将 AgentTeams 平台的特定能力转换为 SDK 标准接口。这是保证大脑可移植的关键——同一个大脑可以在 AgentTeams 上运行，也可以在其他平台上运行（只需换适配层）。SDK 运行时启动时自动注入各适配层实现。',
    components: [
      { name: 'LLM Adapter', description: 'Higress AI 网关 → self.sdk.llm.chat/chat_stream/embed', file: 'adapters/agentteams/llm.py' },
      { name: 'Communication Adapter', description: 'Matrix (Tuwunel) → self.sdk.communication.send_message/send_file/send_progress', file: 'adapters/agentteams/communication.py' },
      { name: 'Storage Adapter', description: 'MinIO/OSS → self.sdk.files.save/read/list/exists/delete', file: 'adapters/agentteams/storage.py' },
      { name: 'KV Adapter', description: 'MinIO KV/Redis → self.sdk.kv.set/get/delete/has', file: 'adapters/agentteams/kv.py' },
      { name: 'Shared Adapter', description: '共享能力层（文档生成/浏览器等，规划中）', file: 'adapters/agentteams/shared.py' },
    ],
    keyInterfaces: ['LLMInterface', 'CommunicationInterface', 'FileStorageInterface', 'KVStorageInterface', 'SharedCapabilityInterface'],
  },
  {
    id: 'platform-layer',
    name: '平台基础设施层',
    nameEn: 'Platform Infrastructure Layer',
    level: 5,
    color: '#6b6558',
    glowColor: 'rgba(107, 101, 88, 0.4)',
    description:
      'AgentTeams 平台的底层基础设施。SDK 不直接接触这一层，全部通过适配层间接访问。这一层保证了系统的可运维性和可扩展性。',
    components: [
      { name: 'Matrix (Tuwunel)', description: 'IM 通信总线，所有 Agent 和人类在同一个 Room', },
      { name: 'Higress', description: 'AI 网关，LLM 代理 + MCP Server 托管 + Consumer 鉴权', },
      { name: 'MinIO / OSS', description: '对象存储，所有配置和状态的集中存储', },
      { name: 'Kubernetes', description: '容器编排，operator 管理 Worker/Manager/Team/Human CRD', },
      { name: 'Element Web', description: 'Matrix 客户端，人类交互界面', },
    ],
    keyInterfaces: ['Matrix Client-Server API', 'Higress Console API', 'MinIO S3 API', 'K8s CRD'],
  },
]

// SDK 适配五步流程（用于 React Flow 节点图）
export const ADAPTER_FLOW = [
  {
    id: 'step1',
    title: '继承 BaseBrain',
    description: '创建大脑类，继承 BaseBrain，实现 on_task 回调',
    code: `class MyBrain(BaseBrain):
    async def on_task(self, ctx):
        ...`,
      color: '#d4af37',
  },
  {
    id: 'step2',
    title: '写 brain.yaml',
    description: '声明大脑 id/name/version/task_types/runtime/sdk_version',
    code: `id: my-brain
name: 我的大脑
version: 1.0.0
runtime: python
sdk_version: ">=0.1.0,<1.0.0"
task_types:
  - id: do-thing
    name: 做事情`,
      color: '#b8941f',
  },
  {
    id: 'step3',
    title: '调用 self.sdk',
    description: '通过 SDK 调用平台能力：llm/communication/files/kv',
    code: `# 不需要自己实现，全部通过 self.sdk
resp = await self.sdk.llm.chat("...")
await self.sdk.send_message("进度 50%")
await self.sdk.files.save("out.json", data)`,
      color: '#4a9d8f',
  },
  {
    id: 'step4',
    title: '7 项合规检查',
    description: 'BrainInterfaceTester 验证大脑符合 SDK 规范',
    code: `from agentteams_sdk.testing import BrainInterfaceTester
tester = BrainInterfaceTester(MyBrain, ".")
# 7/7 PASS 才能上线`,
      color: '#6bb5a5',
  },
  {
    id: 'step5',
    title: 'Docker 打包上线',
    description: 'FROM worker-sdk-python，pip install，CMD agentteams-sdk run',
    code: `FROM agentteams/worker-sdk-python:0.1
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["agentteams-sdk", "run", "."]`,
      color: '#8b7d5c',
  },
]

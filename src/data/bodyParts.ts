/* ============================================================
   数字员工人体部位数据
   每个部位 = 人体隐喻 + 对应技术组件 + 代码示例 + 文件路径
   ============================================================ */

export interface BodyPartData {
  id: string
  name: string
  nameEn: string
  metaphor: string
  tech: string[]
  color: string
  glowColor: string
  description: string
  codeExample?: string
  files?: string[]
  // 3D 位置（用于 Three.js 标注定位）
  position: [number, number, number]
  // 3D 尺寸
  scale?: [number, number, number]
}

export const BODY_PARTS: BodyPartData[] = [
  // ========== 头部：大脑系统 ==========
  {
    id: 'cortex',
    name: '大脑皮层',
    nameEn: 'Cerebral Cortex',
    metaphor: '各个专业大脑应用——数字员工的专业思维能力',
    tech: ['ontology-brain', 'Auto Logic', '法务大脑', '财务大脑', '代码大脑'],
    color: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.5)',
    description:
      '大脑皮层是数字员工的专业能力层。每个大脑 = 一个继承 BaseBrain 的 Python 包，加载到 Worker 后 Worker 就是该大脑（灵魂附体），不是"通用 Agent + 工具"。当前已适配 ontology-brain（本体建模）和 Auto Logic（默认嵌入），未来可通过拖拽方式无限扩展。',
    codeExample: `# 每个大脑只需继承 BaseBrain 并实现 on_task
from agentteams_sdk import BaseBrain, TaskContext, TaskResult

class OntologyBrain(BaseBrain):
    async def on_task(self, ctx: TaskContext) -> TaskResult:
        if ctx.task_type == "design-ontology":
            return await self._design(ctx)
        if ctx.task_type == "validate-ontology":
            return await self._validate(ctx)
        return TaskResult.error(f"不支持: {ctx.task_type}")`,
    files: [
      'ontology-brain/src/main.py',
      'ontology-brain/brain.yaml',
      'AgentTeams/manager/agent/worker-agent/',
    ],
    position: [0, 3.2, 0],
    scale: [1.6, 1.0, 1.4],
  },
  {
    id: 'skull',
    name: '颅骨 / SDK 核心层',
    nameEn: 'Skull / SDK Core',
    metaphor: '包裹和保护大脑的骨骼——SDK 核心接口，所有大脑的通用骨架',
    tech: ['BaseBrain', 'WorkerSDK', 'TaskContext', 'TaskResult', 'TaskStatus'],
    color: '#b8941f',
    glowColor: 'rgba(184, 148, 31, 0.5)',
    description:
      'SDK 核心层是所有大脑的通用骨架。BaseBrain 定义了大脑必须实现的 on_task 回调；WorkerSDK 提供五大平台能力（llm/communication/files/kv/shared）；TaskContext 封装任务上下文；TaskResult 统一返回格式。大脑开发者只需要关心业务逻辑，平台能力全部通过 self.sdk 调用。',
    codeExample: `from agentteams_sdk import BaseBrain, WorkerSDK, TaskContext, TaskResult

# BaseBrain: 大脑基类，__init__(sdk=None) 注入 SDK 实例
# WorkerSDK: 能力入口，五大能力全部通过 self.sdk 调用
class MyBrain(BaseBrain):
    async def on_task(self, ctx: TaskContext) -> TaskResult:
        # ctx.task_id / ctx.task_type / ctx.input / ctx.room_id
        llm_resp = await self.sdk.llm.chat("...")      # LLM 调用
        await self.sdk.send_message("进度 50%")          # 通信
        await self.sdk.files.save("out.json", b"...")    # 文件存储
        return TaskResult.success(output="done", artifacts=[...])`,
    files: [
      'extensions/worker-sdk/src/agentteams_sdk/core/base_brain.py',
      'extensions/worker-sdk/src/agentteams_sdk/core/sdk.py',
      'extensions/worker-sdk/src/agentteams_sdk/core/task_context.py',
      'extensions/worker-sdk/src/agentteams_sdk/core/task_result.py',
    ],
    position: [0, 3.6, 0],
    scale: [1.8, 1.2, 1.6],
  },
  {
    id: 'brainstem',
    name: '脑干 / 运行时',
    nameEn: 'Brain Stem / Runtime',
    metaphor: '连接大脑和脊柱的生命中枢——任务分发与大脑运行器',
    tech: ['dispatcher', 'brain_runner', 'protocol', 'health'],
    color: '#4a9d8f',
    glowColor: 'rgba(74, 157, 143, 0.5)',
    description:
      '运行时是 SDK 的执行引擎。dispatcher 负责从 Matrix 接收任务并分发给对应大脑；brain_runner 管理大脑的生命周期（启动/执行/关闭/健康检查）；protocol 定义任务状态机（pending → submitted → running → success/failed）；health 定期上报健康状态。运行时对大脑开发者透明，不需要手动管理。',
    files: [
      'extensions/worker-sdk/src/agentteams_sdk/runtime/dispatcher.py',
      'extensions/worker-sdk/src/agentteams_sdk/runtime/brain_runner.py',
      'extensions/worker-sdk/src/agentteams_sdk/runtime/protocol.py',
      'extensions/worker-sdk/src/agentteams_sdk/runtime/health.py',
    ],
    position: [0, 2.6, 0],
    scale: [0.8, 0.6, 0.8],
  },

  // ========== 脊柱：通信系统 ==========
  {
    id: 'spine',
    name: '脊柱 / Matrix 通信总线',
    nameEn: 'Spine / Matrix Bus',
    metaphor: '贯穿全身的神经中枢——所有 Agent 和人类在同一个 Matrix Room 通信',
    tech: ['Matrix 协议', 'Tuwunel (conduwuit fork)', 'Element Web', 'appservice'],
    color: '#e8d5a3',
    glowColor: 'rgba(232, 213, 163, 0.4)',
    description:
      'Matrix 是数字员工的神经系统。Human + Manager + Worker 全部在同一个 Room 中，人类可以看到一切并随时干预。Tuwunel 是 Matrix Homeserver（conduwuit 的 fork，用 CONDUWUIT_ 环境变量前缀）。神经脉冲 = Matrix 消息流转，任务下发、进度上报、产物交付全部通过 Matrix 消息完成。',
    codeExample: `# 通过 SDK 发送消息（自动走 Matrix）
await self.sdk.send_message("任务开始执行...")
await self.sdk.send_progress("正在建模...", percent=42)
await self.sdk.send_file("schema.json", schema_bytes)

# 消息全部在 Matrix Room 中，人类可见可干预`,
    files: [
      'helm/agentteams/templates/matrix/',
      'manager/scripts/init/setup-matrix.sh',
      'extensions/worker-sdk/src/agentteams_sdk/communication/',
    ],
    position: [0, 1.0, 0],
    scale: [0.35, 3.0, 0.35],
  },

  // ========== 胸腔：核心器官 ==========
  {
    id: 'heart',
    name: '心脏 / Manager 调度中枢',
    nameEn: 'Heart / Manager',
    metaphor: '全身的动力源——Manager 接收人类任务，拆解后分发给 Worker 大脑',
    tech: ['qwenpaw (默认)', 'openclaw', 'CoPaw Manager', 'AGENTTEAMS_MANAGER_RUNTIME'],
    color: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.5)',
    description:
      'Manager 是数字员工的心脏和调度中枢。人类在 Matrix Room 下发任务，Manager 理解任务意图，拆解后分发给合适的 Worker 大脑执行。Manager 支持两种运行时：qwenpaw（Python QwenPaw，默认，通过 copaw channels send CLI 走 Matrix）和 openclaw（Node.js OpenClaw，通过 message 工具模式）。Manager 还负责质量门把控、产物收集、人类干预协调。',
    files: [
      'manager/Dockerfile',
      'manager/Dockerfile.qwenpaw',
      'manager/scripts/init/start-manager-agent.sh',
      'manager/agent/AGENTS.md',
      'manager/agent/copaw-manager-agent/',
    ],
    position: [-0.5, 0.8, 0.3],
    scale: [0.7, 0.7, 0.6],
  },
  {
    id: 'lungs',
    name: '肺 / Higress AI 网关',
    nameEn: 'Lungs / Higress Gateway',
    metaphor: '呼吸器官——LLM 调用的进出通道，所有 AI 推理流量的网关',
    tech: ['Higress', 'AI Gateway', 'Consumer key-auth', 'MCP Server', 'LLM 路由'],
    color: '#4a9d8f',
    glowColor: 'rgba(74, 157, 143, 0.5)',
    description:
      'Higress 是数字员工的肺，负责所有 LLM 调用的"呼吸"。所有 Worker 通过统一的 Higress 网关调用 LLM，使用 Consumer key-auth 令牌（一个 token 同时用于 LLM 和 MCP Server 访问）。Higress 还负责 MCP Server 托管、路由管理、限流熔断。Manager 控制每个 Worker 的权限和配额。Auth 插件首次配置后约 40 秒激活。',
    files: [
      'manager/scripts/init/setup-higress.sh',
      'design/higress-console-api.yaml',
      'helm/agentteams/templates/gateway/',
    ],
    position: [0.5, 1.0, 0.3],
    scale: [0.6, 0.8, 0.5],
  },
  {
    id: 'stomach',
    name: '胃 / MinIO 对象存储',
    nameEn: 'Stomach / MinIO Storage',
    metaphor: '消化器官——所有 Agent 配置和状态的集中存储，Worker 无状态',
    tech: ['MinIO', 'OSS', '对象存储', 'mc CLI', 'bucket=agentteams-storage'],
    color: '#8b7d5c',
    glowColor: 'rgba(139, 125, 92, 0.5)',
    description:
      'MinIO 是数字员工的胃和消化系统，负责所有文件和状态的"消化存储"。所有 Agent 配置、产物、状态全部存在 MinIO（或云 OSS），Worker 是无状态的——可以随时销毁和重建。大脑产物通过 self.sdk.files.save() 写入 MinIO，Manager 通过统一路径收集。bucket 名为 agentteams-storage，prefix 为 shared/。',
    codeExample: `# 通过 SDK 读写文件（自动走 MinIO）
await self.sdk.files.save("tasks/task-001/output/schema.json", data_bytes)
exists = await self.sdk.files.exists("tasks/task-001/output/schema.json")
data = await self.sdk.files.read("tasks/task-001/output/schema.json")

# Worker 无状态：销毁重建不丢失数据，全部在 MinIO`,
    files: [
      'helm/agentteams/templates/storage/',
      'extensions/worker-sdk/src/agentteams_sdk/storage/',
    ],
    position: [0, 0.2, 0.3],
    scale: [0.8, 0.6, 0.6],
  },
  {
    id: 'liver',
    name: '肝脏 / 平台适配层',
    nameEn: 'Liver / Adapter Layer',
    metaphor: '代谢器官——将平台特定能力转换为 SDK 标准接口，保证大脑可移植',
    tech: ['agentteams adapters', 'LLM adapter', 'Storage adapter', 'Communication adapter', 'KV adapter'],
    color: '#2d6b5f',
    glowColor: 'rgba(45, 107, 95, 0.5)',
    description:
      '适配层是数字员工的肝脏，负责"代谢转换"——将 AgentTeams 平台的特定能力（Matrix 通信、MinIO 存储、Higress LLM）转换为 SDK 标准接口。这保证了大脑的平台无关性：同一个大脑可以在 AgentTeams 上运行，也可以在其他平台上运行（只需换适配层）。SDK 运行时启动时自动注入各适配层实现，大脑开发者不需要关心底层平台。',
    files: [
      'extensions/worker-sdk/src/agentteams_sdk/adapters/agentteams/',
      'extensions/worker-sdk/src/agentteams_sdk/adapters/base.py',
      'extensions/worker-sdk/src/agentteams_sdk/llm/interface.py',
      'extensions/worker-sdk/src/agentteams_sdk/storage/interface.py',
      'extensions/worker-sdk/src/agentteams_sdk/communication/interface.py',
    ],
    position: [0.6, 0.3, 0.1],
    scale: [0.5, 0.5, 0.4],
  },

  // ========== 四肢：执行与支撑 ==========
  {
    id: 'hands',
    name: '双手 / Worker 执行端',
    nameEn: 'Hands / Worker Runtime',
    metaphor: '执行任务的手——加载大脑后 Worker 就是该大脑，灵魂附体执行具体工作',
    tech: ['openclaw (默认)', 'copaw', 'hermes', 'deepseek-harness', 'openhuman'],
    color: '#e8d5a3',
    glowColor: 'rgba(232, 213, 163, 0.5)',
    description:
      'Worker 是数字员工的双手，实际执行任务。Worker 加载大脑后就是该大脑本身（灵魂附体），不是"通用 Agent + 工具"。支持 5 种运行时：openclaw（Node.js/OpenClaw，默认）、copaw（Python/AgentScope）、hermes（Python/hermes-worker）、deepseek-harness（实验性）、openhuman（Rust 原生 Matrix）。Worker 无状态，可随时销毁重建。',
    codeExample: `# Worker 运行时由 CRD spec.runtime 指定
# 5 种运行时可选：
# - openclaw:    Node.js / OpenClaw（默认，主力）
# - copaw:       Python / AgentScope via CoPaw
# - hermes:      Python / hermes-worker
# - deepseek-harness: Node.js / DeepSeek Harness（实验性）
# - openhuman:   Rust / openhuman-core（原生 Matrix）

# 大脑加载后 Worker = 大脑，灵魂附体
# Worker 无状态，销毁重建自由`,
    files: [
      'worker/Dockerfile',
      'copaw/Dockerfile',
      'hermes/',
      'deepseek-harness/',
      'openhuman/',
      'agentteams-controller/api/v1beta1/',
    ],
    position: [-1.8, 0.5, 0],
    scale: [0.5, 1.2, 0.4],
  },
  {
    id: 'legs',
    name: '双腿 / K8s 基础设施',
    nameEn: 'Legs / Kubernetes Infra',
    metaphor: '支撑全身的骨骼和腿——Kubernetes operator + Helm chart，承载所有组件',
    tech: ['Kubernetes operator', 'Helm chart', 'Docker Compose', 'CRD (Worker/Manager/Team/Human)', 'agt CLI'],
    color: '#6b6558',
    glowColor: 'rgba(107, 101, 88, 0.5)',
    description:
      'Kubernetes 是数字员工的骨骼和双腿，支撑整个系统站立。agentteams-controller 是 Go 编写的 Kubernetes operator，负责 reconcile Worker/Manager/Team/Human 四种 CRD。生产部署用 Helm chart（Higress/Tuwunel/MinIO/controller/Manager CR 一站式），本地安装用 Docker Compose 脚本。agt CLI 烘焙在 Manager/Worker 镜像中，用于运维操作。',
    files: [
      'agentteams-controller/',
      'helm/agentteams/',
      'install/agentteams-install.sh',
      'Makefile',
    ],
    position: [0, -1.8, 0],
    scale: [1.2, 1.0, 0.8],
  },

  // ========== 感知与防御 ==========
  {
    id: 'senses',
    name: '五官 / 感知输入',
    nameEn: 'Senses / Input',
    metaphor: '感知外界的五官——业务文档输入、人类语音/文字交互、LLM 感知',
    tech: ['业务文档 (.md)', '人类 Matrix 消息', 'LLM 感知', 'Element Web 界面'],
    color: '#6bb5a5',
    glowColor: 'rgba(107, 181, 165, 0.5)',
    description:
      '五官是数字员工感知外界的入口。业务文档（.md）是主要的知识输入；人类通过 Element Web（Matrix 客户端）在 Room 中用文字/语音与数字员工交互；LLM 是深层感知器官，理解自然语言和文档内容。所有感知输入最终通过 Matrix 消息和 Higress LLM 网关进入系统。',
    position: [0, 4.0, 0],
    scale: [1.0, 0.4, 1.0],
  },
  {
    id: 'immune',
    name: '免疫系统 / 安全与质量门',
    nameEn: 'Immune / Security & Quality Gate',
    metaphor: '防御疾病的免疫系统——凭据管理、质量门、7 项合规检查、反作弊',
    tech: ['Consumer key-auth', '质量门 (PASS/WARN/FAIL)', 'BrainInterfaceTester 7 项', '反作弊暗卷', '凭据零落盘'],
    color: '#b8941f',
    glowColor: 'rgba(184, 148, 31, 0.5)',
    description:
      '免疫系统保护数字员工免受"疾病"侵害。Consumer key-auth 统一令牌管理（一个 token 同时用于 LLM 和 MCP）；质量门在每环结束时检查（PASS/WARN/FAIL 三级）；BrainInterfaceTester 对大脑做 7 项合规断言（has_required_methods/subclass_of_base_brain/brain_yaml_valid/directory_structure/dockerfile_from_sdk_base/on_task_returns_result/no_direct_platform_calls）；反作弊暗卷检测数据泄露。所有凭据通过环境变量注入，零落盘。',
    codeExample: `# 7 项合规检查（BrainInterfaceTester）
from agentteams_sdk.testing import BrainInterfaceTester
tester = BrainInterfaceTester(MyBrain, brain_dir=".")
tester.assert_has_method("on_task")           # 1. 有必填方法
tester.assert_subclass_of_base_brain()         # 2. 继承 BaseBrain
tester.assert_brain_yaml_valid()                # 3. brain.yaml 合法
tester.assert_directory_structure()              # 4. 目录结构合规
tester.assert_dockerfile_from_sdk_base()        # 5. Dockerfile FROM 含 worker-sdk
tester.assert_on_task_returns_result()           # 6. on_task 返回 TaskResult
tester.assert_no_direct_platform_calls()         # 7. 不直连平台组件`,
    files: [
      'extensions/worker-sdk/src/agentteams_sdk/testing/brain_tester.py',
      'ontology-brain/tests/test_brain_interface.py',
    ],
    position: [0, -0.5, -0.5],
    scale: [2.0, 0.3, 2.0],
  },
]

export const getBodyPart = (id: string): BodyPartData | undefined =>
  BODY_PARTS.find((p) => p.id === id)

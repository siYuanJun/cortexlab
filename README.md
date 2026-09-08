# CortexLab · 数字员工大脑架构实验室

> 大脑能力的可视化、编排与分发平台。用人体隐喻展示 AgentTeams SDK 的架构、大脑适配流程和可扩展设计。

## 服务的开源项目

CortexLab 服务于 [AgentTeams](https://github.com/agentscope-ai/AgentTeams) —— 一个开源的多 Agent 协作运行时平台，采用 Manager-Workers 架构，通过 Matrix 房间实现人在环路的透明任务协作。

- **AgentTeams GitHub**：https://github.com/agentscope-ai/AgentTeams
- **CortexLab 的角色**：AgentTeams 生态的大脑架构可视化与实验平台，让开发者看清大脑如何被创建、如何融入数字员工、如何被多宿主接入

## 项目定位

面向**大脑开发者**的架构探索工具——通过具象化的人体隐喻，让开发者直观理解：

- 数字员工的全身解剖（每个器官 = 一个技术组件）
- SDK 适配五步流程（从继承 BaseBrain 到 Docker 上线）
- 大脑零件库拖拽安装（未来可扩展的插件化概念）
- SDK 五层架构深度解析（大脑应用层 → 核心层 → 运行时 → 适配层 → 平台层）
- 产品蓝图与未来发展（多宿主接入、大脑设计器、大脑海市场）

## 三大视图

### 1. 🧍 人体架构视图
- 3D 程序化数字员工人体（Three.js + React Three Fiber）
- 13 个解剖部位，每个对应一个技术组件
- 点击部位查看详情：隐喻说明、技术组件、代码示例、关键文件
- 血液粒子流动画（沿脊柱的神经脉冲）
- 神经连线（大脑到各器官的发光连线）
- 可旋转、缩放、自动旋转

**人体-技术映射**：
| 人体部位 | 技术组件 |
|---------|---------|
| 大脑皮层 | 各个专业大脑应用（ontology-brain, Auto Logic...） |
| 颅骨 | SDK 核心层（BaseBrain/WorkerSDK/TaskContext/TaskResult） |
| 脑干 | 运行时（dispatcher/brain_runner/protocol/health） |
| 脊柱 | Matrix 通信总线（Tuwunel） |
| 心脏 | Manager 调度中枢（qwenpaw/openclaw） |
| 肺 | Higress AI 网关 |
| 胃 | MinIO 对象存储 |
| 肝脏 | 平台适配层 |
| 双手 | Worker 执行端（5 种运行时） |
| 双腿 | Kubernetes 基础设施 |
| 五官 | 感知输入（文档/人类交互/LLM） |
| 免疫系统 | 安全与质量门（7 项合规检查/反作弊） |

### 2. 🧪 大脑实验室视图
- SDK 适配五步流程节点图（React Flow）
- 大脑零件库（6 个大脑卡片，可拖拽）
- 数字员工大脑插槽（拖拽安装概念演示）
- 选中大脑查看详情：技术栈、任务类型、适配步骤
- 已安装大脑统计

### 3. 🔬 SDK 解剖视图
- 五层架构可展开卡片
- 数据流向图
- 每层组件详情（名称、描述、文件路径）
- 关键接口标签
- 最小大脑模板代码（brain.yaml + src/main.py）
- 自检命令

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript + Vite |
| 3D 渲染 | Three.js + @react-three/fiber + @react-three/drei |
| 节点编辑器 | @xyflow/react (React Flow) |
| 动画 | Framer Motion |
| 状态管理 | Zustand |
| 样式 | Tailwind CSS v4 |

## 快速开始

```bash
# 安装依赖
cd cortexlab
npm install

# 启动开发服务器
npm run dev
# 访问 http://localhost:5173

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
cortexlab/
├── src/
│   ├── main.tsx                    # 入口
│   ├── App.tsx                     # 主应用（视图切换）
│   ├── index.css                   # 全局样式（Tailwind + 自定义主题）
│   ├── store/
│   │   └── useStore.ts             # Zustand 状态管理
│   ├── data/
│   │   ├── bodyParts.ts            # 人体部位数据（13 个部位）
│   │   ├── brains.ts               # 大脑应用数据（6 个大脑）
│   │   └── sdkLayers.ts            # SDK 五层架构 + 适配五步流程
│   ├── components/
│   │   ├── Navbar.tsx              # 顶部导航
│   │   ├── DetailPanel.tsx         # 右侧详情面板
│   │   └── three/
│   │       └── DigitalHuman.tsx    # 3D 数字员工人体
│   └── views/
│       ├── BodyView.tsx            # 人体架构视图
│       ├── LabView.tsx             # 大脑实验室视图
│       └── SdkView.tsx             # SDK 解剖视图
├── index.html
├── vite.config.ts
├── package.json
└── README.md
```

## 扩展指南

### 添加新的大脑卡片
编辑 `src/data/brains.ts`，在 `BRAINS` 数组中添加新对象：

```typescript
{
  id: 'my-brain',
  name: '我的大脑',
  nameEn: 'My Brain',
  icon: '🧠',
  description: '...',
  techStack: ['Python', '...'],
  taskTypes: [{ id: 'do-thing', name: '做事情', description: '...' }],
  status: 'concept',  // production | beta | experimental | concept
  statusLabel: '概念设计',
  color: '#ff0000',
  glowColor: 'rgba(255,0,0,0.5)',
  adapterSteps: ['步骤1', '步骤2', ...],
}
```

### 添加新的人体部位
编辑 `src/data/bodyParts.ts`，在 `BODY_PARTS` 数组中添加新对象，并在 `DigitalHuman.tsx` 的 `geometry` 中添加对应的几何体。

## 设计参考

- 3D 人体交互：[Meteorkid/skeleton-anatomy](https://github.com/Meteorkid/skeleton-anatomy)、[hpfrei/body-anatomy-3d-viewer](https://github.com/hpfrei/body-anatomy-3d-viewer)
- 节点编辑器：[React Flow (xyflow)](https://reactflow.dev/)
- 3D 引擎：[React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## License

MIT

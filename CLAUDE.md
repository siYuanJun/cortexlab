# CortexLab · 数字员工大脑架构实验室

> 大脑能力的可视化、编排与分发平台。

## 项目定位

CortexLab 是大脑能力的可视化、编排与分发平台。

- **大脑是独立的专业能力单元**，不绑定单一宿主
- **数字员工是最完整的宿主**（提供完整人体：手脚+神经+心脏+循环），但不是唯一宿主
- **多宿主接入**：SDK（数字员工）、MCP Server（Claude Code/CodeX/Cursor）、REST API（传统应用）
- **三阶段演进**：真实大脑海 → 多宿主接入+大脑设计器 → 大脑海市场+编排分发

## 技术栈

- React 19 + TypeScript + Vite
- Three.js + @react-three/fiber + @react-three/drei（3D 数字员工人体）
- @xyflow/react（React Flow，大脑实验室节点编辑器）
- framer-motion（动画）
- zustand（状态管理）
- Tailwind CSS v4
- Neo Kinpaku 设计系统（金箔 #d4af37 / 铜绿 #4a9d8f / 漆黑 #0d0b08）

## 项目结构

```
cortexlab/
├── src/
│   ├── components/          # 通用组件（Navbar/DetailPanel/Icons）
│   │   └── three/           # 3D 组件（DigitalHuman）
│   ├── views/               # 四个视图
│   │   ├── BodyView.tsx     # 人体架构（3D 数字员工全身解剖）
│   │   ├── LabView.tsx      # 大脑实验室（React Flow 节点编辑器）
│   │   ├── SdkView.tsx      # SDK 解剖（五层架构深度解析）
│   │   └── BlueprintView.tsx # 项目蓝图（产品架构与未来发展）
│   ├── data/                # 数据文件
│   │   ├── bodyParts.ts     # 13 个人体部位
│   │   ├── brains.ts        # 6 个大脑（ontology 真实，其余概念）
│   │   └── sdkLayers.ts     # 5 层 SDK 架构
│   ├── store/               # Zustand 状态管理
│   ├── index.css            # Neo Kinpaku 设计令牌
│   ├── App.tsx              # 主应用
│   └── main.tsx             # 入口
├── .claude/
│   ├── agents/               # 7 人团队角色定义
│   └── skills/cortexlab-orchestrator/ # 团队编排器
├── docs/                     # 文档（产品/架构/指南/知识库）
└── package.json
```

## Harness 团队（7 人标准团队）

本项目配备 7 人 Harness 团队，垂直于 CortexLab 项目。团队成员定义在 `.claude/agents/`，编排规则在 `.claude/skills/cortexlab-orchestrator/SKILL.md`。

### 团队成员

| 角色 | 文件 | 职责 |
|------|------|------|
| cortexlab-lead | `.claude/agents/cortexlab-lead.md` | 编排者：调度、拆分、整合、worktree 并行 |
| cortexlab-engineer | `.claude/agents/cortexlab-engineer.md` | 工程手：React/Three.js 开发、构建、部署 |
| cortexlab-acceptor | `.claude/agents/cortexlab-acceptor.md` | 验收官：独立验收，逐条 PASS/FAIL |
| cortexlab-pm | `.claude/agents/cortexlab-pm.md` | 产品经理：需求、PRD、优先级、验收标准 |
| cortexlab-content-creator | `.claude/agents/cortexlab-content-creator.md` | 内容生产者：文档、架构图、教程 |
| cortexlab-content-reviewer | `.claude/agents/cortexlab-content-reviewer.md` | 审校官：内容质量、数据准确性、一致性 |
| cortexlab-knowledge-keeper | `.claude/agents/cortexlab-knowledge-keeper.md` | 知识蒸馏者：方法论、避坑、决策记录 |

### 触发规则（命中即进入团队模式）

- 规划 / 调度 / 总览 / 推进 / 分配 / 排期 / 下一步 → **cortexlab-lead**
- SDK / 代码 / 构建 / 镜像 / docker / git / 依赖 / 环境 / 安装 / 3D / React → **cortexlab-engineer**
- 验收 / 测试 / 终验 / pass / 验证 / 跑通 → **cortexlab-acceptor**
- 产品 / PRD / 需求 / 方案 / 优先级 / 验收标准 / 能力边界 → **cortexlab-pm**
- 写文档 / 文档 / 说明 / 教程 / 规范 / README / 大纲 / 架构图 → **cortexlab-content-creator**
- 审稿 / 审校 / 合规 / 一致性 / 质检 → **cortexlab-content-reviewer**
- 沉淀 / 蒸馏 / 记下来 / 知识库 / 避坑 / 方法论 / 复盘 → **cortexlab-knowledge-keeper**
- 模糊 / 跨多角色 → **cortexlab-lead** 拆子任务分派

### 核心铁律

1. **管流程的不管质量，管质量的不管流程**——lead 只管调度，acceptor 只管验收，不越权
2. **执行和验收分离**——执行角色不能自己验收，必须由 acceptor（或独立检查）验收
3. **不伪造数据**——所有产出可追溯，测试结果必须真实，文档命令必须实测过
4. **文件交接**——角色间通过指定路径的文件交接，不靠对话上下文传递
5. **遇到阻碍先自行修复**，修复不了才上报，不轻易卡住
6. **团队定义是稳定基础设施**，不随每次开发任务变更
7. **国内环境适配是硬约束**——构建必须带镜像源参数（NPM_REGISTRY 等）
8. **大脑独立有价值**——不绑定单一宿主，数字员工是最完整宿主但不是唯一

## 常用命令

```bash
# 开发
npm run dev

# 构建
npm run build

# TypeScript 检查
npx tsc --noEmit

# 国内镜像源构建
NPM_REGISTRY=https://registry.npmmirror.com/ npm run build
```

## 团队维护记录

### 2026-09-08 · 团队初始化
- 创建 7 人标准团队（lead/engineer/acceptor/pm/content-creator/content-reviewer/knowledge-keeper）
- 创建编排器 skill（路由表 + Phase 流程 + 数据传递协议 + Worktree 调度）
- 创建根目录 CLAUDE.md（触发规则 + 路由表 + 项目定位）
- 项目同时完成：BlueprintView 项目蓝图视图（第4个导航），展示产品架构与未来发展

## 变更记录

| 日期 | 变更 | 影响 |
|------|------|------|
| 2026-09-08 | 项目初始化 + 3D 数字员工人体 + 三视图 + Neo Kinpaku 主题 | 基础版本 |
| 2026-09-08 | 3D 人体完全重写（真实人体比例 + HumanOutline 轮廓 + 左右对称） | 人体从"球棍堆叠"变为"可辨识人形" |
| 2026-09-08 | Auto Logic 从"已上线(默认)"改为"概念设计"（用户纠正：真实大脑只有 ontology） | 数据准确性 |
| 2026-09-08 | 新增 BlueprintView 项目蓝图视图（第4个导航） | 产品架构与未来发展可视化 |
| 2026-09-08 | 初始化 Harness 7 人团队 + 编排器 + CLAUDE.md | 团队协作基础设施 |

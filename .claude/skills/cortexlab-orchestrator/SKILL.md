---
name: cortexlab-orchestrator
description: CortexLab 团队编排器。包含路由表、Phase 流程、数据传递协议、错误处理、Worktree 并行调度。是团队协作的核心引擎。
version: 1.0.0
---

# CortexLab 团队编排器

## 概述

本编排器是 CortexLab 项目多 Agent 团队的核心引擎。它定义了团队如何接收任务、如何拆分、如何分配、如何并行执行、如何验收、如何整合交付。

**团队成员**（7人标准团队）：
- `cortexlab-lead` — 编排者（调度、拆分、整合）
- `cortexlab-engineer` — 工程手（React/Three.js 开发）
- `cortexlab-acceptor` — 验收官（独立验收）
- `cortexlab-pm` — 产品经理（需求、PRD、优先级）
- `cortexlab-content-creator` — 内容生产者（文档、架构图、教程）
- `cortexlab-content-reviewer` — 审校官（内容质量、数据准确性）
- `cortexlab-knowledge-keeper` — 知识蒸馏者（方法论、避坑、决策记录）

## 路由表（哪类指令 → 哪个成员）

| 指令类型 | 主责成员 | 协作成员 | 说明 |
|---------|---------|---------|------|
| 规划/调度/总览/推进/分配/排期/下一步 | lead | 全员 | 编排者负责，不越权做质量 |
| 开发/代码/构建/镜像/docker/git/依赖/环境/安装/3D/React | engineer | lead, acceptor | 工程手负责开发，acceptor 独立验收 |
| 验收/测试/终验/pass/验证/跑通 | acceptor | lead, engineer | 验收官独立验收，不参与开发 |
| 产品/PRD/需求/方案/优先级/验收标准/能力边界 | pm | lead, engineer | 产品经理定义需求，不做技术决策 |
| 写文档/文档/说明/教程/规范/README/大纲/架构图 | content-creator | pm, engineer, content-reviewer | 内容生产者写文档，审校官审校 |
| 审稿/审校/合规/一致性/质检 | content-reviewer | content-creator, lead | 审校官独立审校，不生产内容 |
| 沉淀/蒸馏/记下来/知识库/避坑/方法论/复盘 | knowledge-keeper | 全员 | 知识蒸馏者沉淀可复用能力资产 |
| 模糊/跨多角色 | lead | 按需分派 | 编排者拆子任务分别派，最后整合 |

## Phase 流程（标准任务执行流程）

### Phase 0：需求理解（lead + pm）
1. lead 接收用户任务，用目标七问法理解需求
2. 需求不明确时，lead 或 pm 向用户确认
3. pm 输出需求摘要（目标、范围、验收标准）
4. lead 评估任务复杂度，决定是否需要拆分

**产出**：`docs/internal/harness-tasks/<任务ID>/00-需求摘要.md`

### Phase 1：任务拆分（lead）
1. lead 将任务拆分为可独立执行的子任务
2. 每个子任务标注：主责成员、输入、输出、验收标准、依赖关系
3. 无依赖的子任务标记为可并行（进入 worktree）
4. 有依赖的子任务标记执行顺序

**产出**：`docs/internal/harness-tasks/<任务ID>/01-任务拆分.md`

### Phase 2：并行执行（各成员，worktree 并行）
1. lead 创建 worktree 分支，分配给各成员
2. 各成员在独立 worktree 中执行任务
3. 执行过程中遇到阻碍先自行修复，修复不了上报 lead
4. 完成后提交产出物 + 自测报告

**产出**：各成员的代码/文档 + `docs/internal/harness-tasks/<任务ID>/02-<成员>-产出.md`

### Phase 3：验收（acceptor + content-reviewer）
1. lead 汇总所有产出，提交验收请求
2. acceptor 验收功能和技术质量（逐条 PASS/FAIL）
3. content-reviewer 验收文档和内容质量（逐条问题）
4. 不通过的退回原成员修复，修复后重新验收
5. 全部通过后进入整合阶段

**产出**：`docs/internal/harness-tasks/<任务ID>/03-验收报告.md`

### Phase 4：整合交付（lead）
1. lead 合并所有 worktree 分支，解决冲突
2. lead 整合产出物，确保逻辑连贯、风格统一
3. lead 运行最终验证（构建通过、无控制台错误）
4. lead 向用户交付成果，说明完成情况、已知问题、后续建议

**产出**：最终交付物 + `docs/internal/harness-tasks/<任务ID>/04-交付说明.md`

### Phase 5：知识沉淀（knowledge-keeper）
1. knowledge-keeper 回顾整个任务过程
2. 蒸馏可复用的能力资产（决策、方法论、避坑、模板）
3. 写入知识库 `docs/knowledge/`
4. 更新知识地图 MOC.md

**产出**：知识库更新 + `docs/internal/harness-tasks/<任务ID>/05-知识沉淀.md`

## 数据传递协议

### 文件交接（不靠对话上下文）
- 所有跨成员协作必须通过指定路径的文件交接
- 任务输入：`docs/internal/harness-tasks/<任务ID>/input/`
- 任务产出：`docs/internal/harness-tasks/<任务ID>/output/<成员>/`
- 最终交付：项目根目录或指定交付路径

### 消息格式
- 任务分配：`[任务分配] <子任务ID> → <成员> | 目标：... | 输入：... | 输出：... | 验收：... | 截止：...`
- 完成提交：`[完成提交] <子任务ID> ← <成员> | 产出：... | 自测：... | 已知问题：... | 后续建议：...`
- 验收结果：`[验收结果] <子任务ID> | 结论：PASS/FAIL | 不通过项：... | 修复建议：...`
- 阻碍上报：`[阻碍上报] <子任务ID> ← <成员> | 问题：... | 已尝试：... | 需要：...`

## Worktree 并行调度

### 何时使用 worktree
- 任务拆分为 2 个以上无依赖的子任务时
- 子任务涉及不同文件区域，冲突概率低时
- 需要缩短关键路径时

### Worktree 流程
1. lead 创建主分支 `feature/<任务ID>`
2. 为每个并行子任务创建 worktree：`git worktree add ../cortexlab-<子任务ID> -b feature/<任务ID>-<子任务ID>`
3. 各成员在独立 worktree 中开发
4. 完成后 lead 合并：先合并到主分支，解决冲突，再删除 worktree
5. 全部合并后运行完整构建验证

### 冲突处理
- 合并冲突由 lead 协调解决
- 涉及同一文件的冲突，lead 请相关成员一起决定保留哪部分
- 解决冲突后必须重新运行构建和验收

## 错误处理

### 成员任务失败
- lead 分析原因：能力问题？资源问题？需求问题？
- 能力问题：换成员或提供指导
- 资源问题：协调资源（依赖、环境、时间）
- 需求问题：退回 pm 重新明确需求

### 验收不通过
- 退回原成员修复，写明不通过项和修复建议
- 严重问题（数据错误、安全漏洞）立即上报 lead，暂停后续工作
- 同一任务连续 2 次验收不通过，lead 重新评估任务拆分或成员分配

### 进度延期
- lead 评估影响范围，调整优先级或增加并行资源
- 必要时上报用户，说明延期原因和新的预计完成时间
- 不隐瞒进度问题，早发现早上报

### 成员间冲突
- lead 作为仲裁者决策，以项目目标为最高准则
- 技术冲突：以可运行、可维护、符合项目规范为准
- 产品冲突：以 pm 的产品决策为准（pm 决策需基于用户需求）

## 团队维护机制

### 何时更新团队定义
- 项目技术栈发生重大变化
- 新增角色职责或角色职责变化
- 路由表失效（某类指令不再路由到原角色）
- 项目规模变化需要调整团队分级

### 定期对齐
- 每完成一个大任务后，lead 回顾团队协作效率
- 每月（或每 5 个大任务）做一次团队复盘，更新路由表和流程
- knowledge-keeper 沉淀团队协作的方法论

## 质量门（团队就绪标准）

- [ ] `.claude/agents/` 每个角色都有定义文件（含 `model: opus`）
- [ ] 编排器 skill 含路由表 + Phase 流程 + 数据传递协议 + 错误处理 + Worktree 调度
- [ ] 根目录 `CLAUDE.md` 含触发规则 + 路由表 + 团队维护记录 + 变更记录
- [ ] pm 有产品定位和需求框架（已在角色文件中定义）
- [ ] knowledge-keeper 有沉淀目标目录（`docs/knowledge/`）
- [ ] 团队规模与项目复杂度匹配（7人标准团队，适合中等规模长期维护项目）
- [ ] 所有角色文件 frontmatter 合法（name/description/model）

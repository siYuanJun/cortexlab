import { motion } from 'framer-motion'
import {
  IconBrain, IconCpu, IconScale, IconChart, IconCode, IconDatabase,
  IconLayers, IconPlug, IconNetwork, IconHeart, IconHand, IconEye,
  IconCheck, IconArrowRight, IconPackage, IconTerminal, IconGit,
  IconShield, IconSearch, IconDot,
} from '../components/Icons'

/* ============================================================
   项目蓝图视图 — CortexLab 产品架构与未来发展
   Neo Kinpaku 风格
   ============================================================ */

/* ---- 宿主卡片 ---- */
function HostCard({ icon: Icon, name, desc, method, color }: {
  icon: typeof IconBrain; name: string; desc: string; method: string; color: string
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="panel p-4 flex-1 min-w-[180px]"
      style={{ borderColor: `${color}44`, borderRadius: '2px' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 flex items-center justify-center" style={{ background: `${color}15`, borderRadius: '2px' }}>
          <Icon size={18} style={{ color }} />
        </div>
        <span className="text-sm font-medium" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)' }}>{name}</span>
      </div>
      <p className="text-[11px] leading-relaxed mb-2" style={{ color: 'var(--ks-muted)' }}>{desc}</p>
      <div className="flex items-center gap-1.5">
        <span className="tag" style={{ color, borderColor: `${color}44`, background: `${color}10` }}>{method}</span>
      </div>
    </motion.div>
  )
}

/* ---- 大脑卡片 ---- */
function BrainChip({ icon: Icon, name, color, status }: {
  icon: typeof IconBrain; name: string; color: string; status: string
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="panel px-3 py-2 flex items-center gap-2"
      style={{ borderColor: `${color}33`, borderRadius: '2px', background: `${color}08` }}
    >
      <Icon size={16} style={{ color, flexShrink: 0 }} />
      <span className="text-[12px] font-medium" style={{ color: 'var(--ks-text)' }}>{name}</span>
      <span className="tag ml-auto" style={{ fontSize: '9px', padding: '1px 5px', color, borderColor: `${color}44`, background: `${color}10` }}>{status}</span>
    </motion.div>
  )
}

/* ---- 阶段卡片 ---- */
function PhaseCard({ num, title, desc, items, color, active }: {
  num: string; title: string; desc: string; items: string[]; color: string; active?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="panel p-5 flex-1 relative"
      style={{
        borderColor: active ? color : 'var(--ks-rule)',
        borderRadius: '2px',
        background: active ? `${color}08` : 'var(--ks-raised)',
      }}
    >
      <div className="absolute -top-3 -left-3 w-10 h-10 flex items-center justify-center text-lg font-bold"
        style={{ background: color, color: 'var(--ks-dark-ink)', borderRadius: '2px', fontFamily: 'var(--ks-font-display)' }}>
        {num}
      </div>
      <h3 className="text-base font-medium mb-1 mt-2" style={{ color, fontFamily: 'var(--ks-font-display)' }}>{title}</h3>
      <p className="text-[11px] leading-relaxed mb-3" style={{ color: 'var(--ks-muted)' }}>{desc}</p>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <IconCheck size={12} style={{ color, marginTop: 2, flexShrink: 0 }} />
            <span className="text-[11px]" style={{ color: 'var(--ks-text)' }}>{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ---- 团队角色卡片 ---- */
function TeamRoleCard({ icon: Icon, name, role, desc, color }: {
  icon: typeof IconBrain; name: string; role: string; desc: string; color: string
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="panel p-3"
      style={{ borderRadius: '2px', borderColor: `${color}33` }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon size={16} style={{ color, flexShrink: 0 }} />
        <span className="text-[12px] font-medium" style={{ color: 'var(--ks-champagne)' }}>{name}</span>
      </div>
      <div className="text-[10px] mb-1" style={{ color, fontFamily: 'var(--ks-font-mono)', letterSpacing: '0.05em' }}>{role}</div>
      <p className="text-[10px] leading-relaxed" style={{ color: 'var(--ks-muted)' }}>{desc}</p>
    </motion.div>
  )
}

/* ============================================================
   主视图
   ============================================================ */
export default function BlueprintView() {
  const brains = [
    { icon: IconBrain, name: 'ontology-brain', color: '#d4af37', status: '真实' },
    { icon: IconCpu, name: 'Auto Logic', color: '#b8941f', status: '概念' },
    { icon: IconScale, name: '法务大脑', color: '#4a9d8f', status: '概念' },
    { icon: IconChart, name: '财务大脑', color: '#e8d5a3', status: '概念' },
    { icon: IconCode, name: '代码大脑', color: '#8b7d5c', status: '概念' },
    { icon: IconDatabase, name: '数据大脑', color: '#2d6b5f', status: '概念' },
  ]

  const hosts = [
    { icon: IconHeart, name: 'AgentTeams 数字员工', desc: '最完整宿主：手脚(Worker)+神经(Matrix)+心脏(Manager)+循环(存储/网关)', method: 'SDK 嵌入', color: '#d4af37' },
    { icon: IconTerminal, name: 'Claude Code / CodeX', desc: '编程时调用专业大脑做审查、分析、生成', method: 'MCP Server', color: '#4a9d8f' },
    { icon: IconCode, name: 'Cursor / IDE', desc: '编辑器内嵌入领域专家，辅助编码', method: 'MCP / 插件', color: '#6bb5a5' },
    { icon: IconNetwork, name: '传统 Web / App', desc: '业务系统通过 API 调用大脑做决策判断', method: 'REST API', color: '#b8941f' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 overflow-y-auto"
      style={{ background: 'var(--ks-lacquer)' }}
    >
      <div className="max-w-6xl mx-auto px-8 py-8">

        {/* ===== 标题区 ===== */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 pb-6"
          style={{ borderBottom: '1px solid var(--ks-rule-strong)' }}
        >
          <div className="text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: 'var(--ks-kinpaku)', fontFamily: 'var(--ks-font-mono)' }}>
            Product Blueprint · 产品蓝图
          </div>
          <h1 className="text-3xl font-light mb-3" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)', letterSpacing: '-0.01em' }}>
            CortexLab · 大脑能力的<span style={{ color: 'var(--ks-kinpaku)' }}>可视化、编排与分发平台</span>
          </h1>
          <p className="text-sm leading-relaxed max-w-3xl" style={{ color: 'var(--ks-muted)' }}>
            大脑是独立的专业能力单元，不绑定单一宿主。数字员工是最完整的宿主（提供完整人体），
            但同一个大脑也可以通过 MCP / API / SDK 被 Claude Code、CodeX、Cursor、传统应用等多种宿主接入。
            CortexLab 是大脑海的控制台——看清、理解、设计、编排、分发。
          </p>
        </motion.div>

        {/* ===== 第一部分：架构关系图 ===== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6" style={{ background: 'var(--ks-kinpaku)' }} />
            <h2 className="text-xl font-light" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)' }}>
              架构关系 · 一次编写，多端接入
            </h2>
          </div>

          {/* 大脑海中心区 */}
          <div className="panel p-6 mb-6" style={{ borderRadius: '2px', background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(13,11,8,1) 100%)' }}>
            <div className="flex items-center gap-2 mb-4">
              <IconLayers size={18} style={{ color: 'var(--ks-kinpaku)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)' }}>大脑海 · Brain Ocean</span>
              <span className="tag tag-gold ml-2">可扩展</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {brains.map((b, i) => (
                <BrainChip key={i} {...b} />
              ))}
            </div>
            <div className="mt-4 pt-3 flex items-center gap-2 text-[11px]" style={{ borderTop: '1px solid var(--ks-rule)', color: 'var(--ks-faint)' }}>
              <IconDot size={8} style={{ color: 'var(--ks-kinpaku)' }} />
              每个大脑 = 继承 BaseBrain 的 Python 包 + brain.yaml 元数据 + Docker 镜像。写一次，多端接入。
            </div>
          </div>

          {/* 适配层 */}
          <div className="flex items-center justify-center mb-6">
            <div className="panel px-6 py-3 flex items-center gap-4" style={{ borderRadius: '2px', borderColor: 'var(--ks-patina)' }}>
              <IconPlug size={16} style={{ color: 'var(--ks-patina)' }} />
              <span className="text-[12px]" style={{ color: 'var(--ks-text)' }}>适配层 · Adapter Layer</span>
              <div className="flex gap-2">
                <span className="tag tag-patina">SDK</span>
                <span className="tag tag-patina">MCP Server</span>
                <span className="tag tag-patina">REST API</span>
              </div>
            </div>
          </div>

          {/* 多宿主 */}
          <div className="flex gap-3 flex-wrap">
            {hosts.map((h, i) => (
              <HostCard key={i} {...h} />
            ))}
          </div>
        </section>

        {/* ===== 第二部分：核心闭环 ===== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6" style={{ background: 'var(--ks-patina)' }} />
            <h2 className="text-xl font-light" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)' }}>
              核心闭环 · 设计 → 接入 → 运行 → 观察 → 优化
            </h2>
          </div>

          <div className="panel p-6" style={{ borderRadius: '2px' }}>
            <div className="flex items-center justify-between gap-2">
              {[
                { icon: IconBrain, label: '设计大脑', desc: '定义能力/接口/配置' },
                { icon: IconPlug, label: '多宿主接入', desc: 'SDK/MCP/API 一键生成' },
                { icon: IconHeart, label: '运行', desc: '数字员工/Claude/API 执行' },
                { icon: IconEye, label: '观察', desc: 'CortexLab 可视化监控' },
                { icon: IconShield, label: '优化', desc: '数据反馈迭代大脑' },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-center flex-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center flex-1"
                  >
                    <div className="w-12 h-12 flex items-center justify-center mb-2"
                      style={{ background: `var(--ks-${i % 2 === 0 ? 'kinpaku' : 'patina'})12`, border: `1px solid var(--ks-${i % 2 === 0 ? 'kinpaku' : 'patina'})44`, borderRadius: '2px' }}>
                      <step.icon size={22} style={{ color: `var(--ks-${i % 2 === 0 ? 'kinpaku' : 'patina'})` }} />
                    </div>
                    <span className="text-[12px] font-medium mb-0.5" style={{ color: 'var(--ks-champagne)' }}>{step.label}</span>
                    <span className="text-[10px]" style={{ color: 'var(--ks-faint)' }}>{step.desc}</span>
                  </motion.div>
                  {i < arr.length - 1 && (
                    <IconArrowRight size={16} className="flex-shrink-0 mx-1" style={{ color: 'var(--ks-graphite-2)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 第三部分：三阶段演进 ===== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6" style={{ background: '#b8941f' }} />
            <h2 className="text-xl font-light" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)' }}>
              三阶段演进路线
            </h2>
          </div>

          <div className="flex gap-4">
            <PhaseCard
              num="Ⅰ"
              title="真实大脑海"
              desc="从展示假数据到接入 AgentTeams 平台真实大脑数据"
              color="#d4af37"
              active
              items={[
                '从 AgentTeams API 拉取真实大脑列表',
                '每个大脑展示能力边界/task_types/运行状态',
                '标注可接入的宿主类型（数字员工/MCP/API）',
                '人体视图作为最完整宿主的展示场景',
              ]}
            />
            <PhaseCard
              num="Ⅱ"
              title="多宿主接入 + 大脑设计器"
              desc="从展示到设计，同一个大脑多端运行"
              color="#4a9d8f"
              items={[
                '宿主切换视图：同一大脑在数字员工/Claude(MCP)/API 下的运行对比',
                'MCP Server 自动生成：把大脑能力暴露给外部工具',
                '大脑设计器：定义能力 → 生成 SDK包+MCP骨架+API端点+Docker镜像',
                '人体作为设计画布：安装设计好的大脑看完整效果',
              ]}
            />
            <PhaseCard
              num="Ⅲ"
              title="大脑海市场 + 编排分发"
              desc="从单大脑设计到多大脑协同与生态分发"
              color="#b8941f"
              items={[
                '大脑海市场：浏览/搜索/组合大脑，类似 MCP Registry',
                '多大脑协同编排：一个任务中多个大脑分工（法务审+财务算+代码改）',
                '一键分发：发布到 AgentTeams / MCP Registry / API 网关',
                'Agent 辅助设计：Agent 根据需求自动推荐/生成/优化大脑',
              ]}
            />
          </div>
        </section>

        {/* ===== 第四部分：Harness 团队 ===== */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6" style={{ background: '#8b7d5c' }} />
            <h2 className="text-xl font-light" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)' }}>
              Harness 团队 · 7 人标准团队
            </h2>
          </div>

          <div className="panel p-5 mb-4" style={{ borderRadius: '2px' }}>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ks-muted)' }}>
              团队垂直于 CortexLab 项目，前缀 <span className="tag tag-gold" style={{ fontSize: '10px' }}>cortexlab-</span>。
              工作模式：你一个小想法 → lead 拆分 → 多角色 worktree 并行 → 各自完成 → acceptor 独立验收 → lead 整合交付。
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <TeamRoleCard icon={IconGit} name="lead 编排者" role="cortexlab-lead" desc="调度、任务拆分、整合交付、worktree 并行调度" color="#d4af37" />
            <TeamRoleCard icon={IconCode} name="engineer 工程手" role="cortexlab-engineer" desc="React/Three.js 开发、环境、依赖、构建部署" color="#4a9d8f" />
            <TeamRoleCard icon={IconCheck} name="acceptor 验收官" role="cortexlab-acceptor" desc="独立验收：构建通过、交互正常、数据真实、视觉达标" color="#b8941f" />
            <TeamRoleCard icon={IconSearch} name="pm 产品经理" role="cortexlab-pm" desc="需求→PRD、验收标准、优先级、与 AgentTeams 对接规划" color="#6bb5a5" />
            <TeamRoleCard icon={IconPackage} name="content-creator" role="cortexlab-content" desc="文档、架构图、教程、展示内容产出" color="#e8d5a3" />
            <TeamRoleCard icon={IconShield} name="content-reviewer" role="cortexlab-reviewer" desc="文档质量、数据准确性、一致性、合规审校" color="#8b7d5c" />
            <TeamRoleCard icon={IconLayers} name="knowledge-keeper" role="cortexlab-knowledge" desc="方法论沉淀、设计决策记录、避坑清单维护" color="#2d6b5f" />
            <TeamRoleCard icon={IconBrain} name="你 · 产品 owner" role="human" desc="提出想法、确认方向、验收最终成果、决定优先级" color="#d4af37" />
          </div>
        </section>

        {/* ===== 底部：核心原则 ===== */}
        <section className="mb-8">
          <div className="panel p-6" style={{ borderRadius: '2px', borderColor: 'var(--ks-rule-strong)', background: 'linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(13,11,8,1) 100%)' }}>
            <div className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--ks-kinpaku)', fontFamily: 'var(--ks-font-mono)' }}>
              Core Principles · 核心原则
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {[
                '大脑独立有价值——专业能力封装，不绑定任何特定宿主',
                '数字员工是最完整宿主——提供完整人体，最佳展示载体，但不是唯一',
                '多宿主开放生态——MCP/API/SDK 多种接入，让大脑能力被广泛使用',
                'CortexLab 是大脑海控制台——看清、理解、设计、编排、分发',
                '人体是核心交互界面——最形象的展示和设计画布',
                '真实价值优先——不是花里胡哨，要真正帮助理解和设计大脑系统',
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-2">
                  <IconDot size={8} className="mt-1.5 flex-shrink-0" style={{ color: 'var(--ks-kinpaku)' }} />
                  <span className="text-[12px] leading-relaxed" style={{ color: 'var(--ks-text)' }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  )
}

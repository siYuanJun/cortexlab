import { motion, AnimatePresence } from 'framer-motion'
import { BODY_PARTS, getBodyPart, type BodyPartData } from '../data/bodyParts'
import { useCortexStore } from '../store/useStore'
import { IconArrowRight, IconPackage, IconChevronDown } from './Icons'

/* ============================================================
   详情面板 — Neo Kinpaku
   ============================================================ */

function PartDetail({ part }: { part: BodyPartData }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="h-full flex flex-col"
    >
      {/* 头部 */}
      <div className="flex items-start gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid var(--ks-rule)' }}>
        <div
          className="w-2.5 h-2.5 mt-1.5 flex-shrink-0"
          style={{
            background: part.color,
            boxShadow: `0 0 10px ${part.glowColor}`,
            borderRadius: '1px',
          }}
        />
        <div className="flex-1">
          <h2 className="text-base font-medium" style={{ color: part.color, fontFamily: 'var(--ks-font-display)', letterSpacing: '0.01em' }}>
            {part.name}
          </h2>
          <p className="text-[10px] mt-0.5" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)', letterSpacing: '0.08em' }}>
            {part.nameEn}
          </p>
        </div>
      </div>

      {/* 隐喻 */}
      <div className="panel p-3 mb-4">
        <div className="text-[10px] mb-1.5 uppercase tracking-[0.15em]" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)' }}>
          人体隐喻
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ks-text)' }}>{part.metaphor}</p>
      </div>

      {/* 描述 */}
      <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--ks-muted)' }}>{part.description}</p>

      {/* 技术组件 */}
      <div className="mb-4">
        <div className="text-[10px] mb-2 uppercase tracking-[0.15em]" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)' }}>
          对应技术组件
        </div>
        <div className="flex flex-wrap gap-1.5">
          {part.tech.map((t, i) => (
            <span key={i} className="tag tag-gold">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* 代码示例 */}
      {part.codeExample && (
        <div className="mb-4">
          <div className="text-[10px] mb-2 uppercase tracking-[0.15em]" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)' }}>
            代码示例
          </div>
          <pre className="code-block text-[11px] max-h-48 overflow-y-auto">{part.codeExample}</pre>
        </div>
      )}

      {/* 关键文件 */}
      {part.files && part.files.length > 0 && (
        <div>
          <div className="text-[10px] mb-2 uppercase tracking-[0.15em]" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)' }}>
            关键文件
          </div>
          <div className="space-y-1">
            {part.files.map((f, i) => (
              <div
                key={i}
                className="text-[11px] px-2.5 py-1.5 flex items-center gap-2 transition-colors"
                style={{
                  fontFamily: 'var(--ks-font-mono)',
                  color: 'var(--ks-muted)',
                  background: 'var(--ks-lacquer-deep)',
                  border: '1px solid var(--ks-rule)',
                  borderRadius: '2px',
                }}
              >
                <IconPackage size={12} style={{ color: 'var(--ks-kinpaku-deep)', flexShrink: 0 }} />
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

/* ============================================================
   默认视图 — 部位导航列表
   ============================================================ */
function PartNavigator() {
  const { setSelectedPart } = useCortexStore()

  const categories = [
    {
      name: '头部 · 大脑系统',
      color: '#d4af37',
      parts: BODY_PARTS.filter((p) => ['skull', 'cortex', 'brainstem', 'senses'].includes(p.id)),
    },
    {
      name: '脊柱 · 通信系统',
      color: '#e8d5a3',
      parts: BODY_PARTS.filter((p) => ['spine'].includes(p.id)),
    },
    {
      name: '胸腔 · 核心器官',
      color: '#4a9d8f',
      parts: BODY_PARTS.filter((p) => ['heart', 'lungs', 'stomach', 'liver'].includes(p.id)),
    },
    {
      name: '四肢 · 执行与支撑',
      color: '#8b7d5c',
      parts: BODY_PARTS.filter((p) => ['hands', 'legs'].includes(p.id)),
    },
    {
      name: '防御 · 免疫系统',
      color: '#b8941f',
      parts: BODY_PARTS.filter((p) => ['immune'].includes(p.id)),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto pr-1"
    >
      <div className="mb-5 pb-4" style={{ borderBottom: '1px solid var(--ks-rule)' }}>
        <h2 className="text-lg font-medium mb-1" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)' }}>
          数字员工解剖图
        </h2>
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--ks-muted)' }}>
          点击 3D 人体部位或下方列表，查看该部位对应的技术组件、代码示例和关键文件。
        </p>
      </div>

      {categories.map((cat) => (
        <div key={cat.name} className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-1.5 h-1.5"
              style={{ background: cat.color, borderRadius: '1px' }}
            />
            <span className="text-[10px] font-medium uppercase tracking-[0.15em]" style={{ color: cat.color, fontFamily: 'var(--ks-font-mono)' }}>
              {cat.name}
            </span>
          </div>
          <div className="space-y-1">
            {cat.parts.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPart(p.id)}
                className="w-full text-left panel px-3 py-2 transition-all group hover:border-gold"
                style={{ borderRadius: '2px' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] transition-colors" style={{ color: 'var(--ks-text)' }}>
                    {p.name}
                  </span>
                  <IconArrowRight size={12} className="transition-all opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0" style={{ color: p.color }} />
                </div>
                <p className="text-[10px] mt-0.5 line-clamp-1" style={{ color: 'var(--ks-faint)' }}>{p.metaphor}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}

/* ============================================================
   详情面板主组件
   ============================================================ */
export default function DetailPanel() {
  const { selectedPart, setSelectedPart } = useCortexStore()
  const part = selectedPart ? getBodyPart(selectedPart) : null

  return (
    <div className="h-full flex flex-col p-4" style={{ background: 'var(--ks-lacquer)', borderLeft: '1px solid var(--ks-rule)' }}>
      <AnimatePresence mode="wait">
        {part ? (
          <div key="detail" className="flex-1 flex flex-col">
            <button
              onClick={() => setSelectedPart(null)}
              className="self-start text-[11px] mb-3 flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: 'var(--ks-muted)', fontFamily: 'var(--ks-font-mono)' }}
            >
              <IconChevronDown size={12} style={{ transform: 'rotate(90deg)' }} />
              返回部位列表
            </button>
            <div className="flex-1 overflow-y-auto pr-1">
              <PartDetail part={part} />
            </div>
          </div>
        ) : (
          <div key="nav" className="flex-1">
            <PartNavigator />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

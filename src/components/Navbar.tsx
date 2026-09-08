import { motion } from 'framer-motion'
import { useCortexStore, type ViewType } from '../store/useStore'
import { IconBody, IconLab, IconLayers, IconBrain, IconGit, IconDot, IconNetwork } from './Icons'

/* ============================================================
   顶部导航栏 — Neo Kinpaku
   ============================================================ */

const NAV_ITEMS: { id: ViewType; label: string; icon: typeof IconBody; desc: string }[] = [
  { id: 'body', label: '人体架构', icon: IconBody, desc: '数字员工全身解剖' },
  { id: 'lab', label: '大脑实验室', icon: IconLab, desc: 'SDK 适配 + 拖拽扩展' },
  { id: 'sdk', label: 'SDK 解剖', icon: IconLayers, desc: '五层架构深度解析' },
  { id: 'blueprint', label: '项目蓝图', icon: IconNetwork, desc: '产品架构与未来发展' },
]

export default function Navbar() {
  const { currentView, setView } = useCortexStore()

  return (
    <header
      className="h-14 flex items-center justify-between px-6 relative z-20"
      style={{
        background: 'var(--ks-lacquer-deep)',
        borderBottom: '1px solid var(--ks-rule)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className="w-8 h-8 flex items-center justify-center"
            style={{
              background: 'var(--ks-kinpaku)',
              borderRadius: '2px',
              color: 'var(--ks-dark-ink)',
            }}
          >
            <IconBrain size={18} />
          </div>
          <div
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse-gold"
            style={{ background: 'var(--ks-patina)' }}
          />
        </div>
        <div>
          <h1 className="text-sm font-medium leading-tight" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)', letterSpacing: '0.02em' }}>
            CortexLab
            <span className="text-[10px] ml-2" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-body)' }}>
              数字员工大脑架构实验室
            </span>
          </h1>
          <p className="text-[9px] tracking-[0.18em] uppercase" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)' }}>
            AgentTeams SDK · Brain Architecture Explorer
          </p>
        </div>
      </div>

      {/* 导航 */}
      <nav className="flex items-center gap-0.5" style={{ background: 'var(--ks-lacquer)', border: '1px solid var(--ks-rule)', borderRadius: '2px', padding: '3px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = currentView === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="relative px-4 py-1.5 text-[13px] font-medium transition-all flex items-center gap-2"
              style={{ borderRadius: '2px', color: isActive ? 'var(--ks-kinpaku)' : 'var(--ks-muted)' }}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0"
                  style={{
                    background: 'oklch(78% 0.12 82 / 0.1)',
                    border: '1px solid var(--ks-rule-strong)',
                    borderRadius: '2px',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <Icon size={15} />
                <span>{item.label}</span>
              </span>
            </button>
          )
        })}
      </nav>

      {/* 右侧状态 */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)' }}>
          <IconDot size={8} style={{ color: 'var(--ks-patina)' }} />
          SDK v0.1.0
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] transition-colors flex items-center gap-1.5 hover:opacity-80"
          style={{ color: 'var(--ks-muted)' }}
        >
          <IconGit size={14} />
          <span style={{ fontFamily: 'var(--ks-font-mono)', letterSpacing: '0.05em' }}>GitHub</span>
        </a>
      </div>
    </header>
  )
}

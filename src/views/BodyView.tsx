import { motion } from 'framer-motion'
import DigitalHuman from '../components/three/DigitalHuman'
import DetailPanel from '../components/DetailPanel'

/* ============================================================
   人体架构视图 — Neo Kinpaku
   ============================================================ */
export default function BodyView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex overflow-hidden"
    >
      {/* 左侧 3D 人体 */}
      <div className="flex-1 relative">
        <DigitalHuman />

        {/* 左上角标题覆盖 */}
        <div className="absolute top-5 left-5 z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="text-[10px] uppercase tracking-[0.2em] mb-1.5" style={{ color: 'var(--ks-kinpaku)', fontFamily: 'var(--ks-font-mono)' }}>
              Digital Employee Anatomy
            </div>
            <h2 className="text-2xl font-light mb-1" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)', letterSpacing: '0.01em' }}>
              数字员工<span style={{ color: 'var(--ks-kinpaku)' }}>全身解剖</span>
            </h2>
            <p className="text-[11px] max-w-md leading-relaxed" style={{ color: 'var(--ks-muted)' }}>
              每一个器官对应一个技术组件 —— 大脑是 SDK，神经是 Matrix，心脏是 Manager，手脚是 Worker
            </p>
          </motion.div>
        </div>

        {/* 右上角统计 */}
        <div className="absolute top-5 right-5 z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="panel px-4 py-3 space-y-2"
            style={{ borderRadius: '2px', minWidth: '140px' }}
          >
            <div className="flex items-center justify-between gap-6">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)' }}>解剖部位</span>
              <span className="text-sm font-medium" style={{ color: 'var(--ks-kinpaku)', fontFamily: 'var(--ks-font-display)' }}>13</span>
            </div>
            <div className="h-px" style={{ background: 'var(--ks-rule)' }} />
            <div className="flex items-center justify-between gap-6">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)' }}>技术组件</span>
              <span className="text-sm font-medium" style={{ color: 'var(--ks-patina)', fontFamily: 'var(--ks-font-display)' }}>50+</span>
            </div>
            <div className="h-px" style={{ background: 'var(--ks-rule)' }} />
            <div className="flex items-center justify-between gap-6">
              <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)' }}>大脑运行时</span>
              <span className="text-sm font-medium" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)' }}>5</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 右侧详情面板 */}
      <div className="w-[360px] overflow-hidden" style={{ borderLeft: '1px solid var(--ks-rule)' }}>
        <DetailPanel />
      </div>
    </motion.div>
  )
}

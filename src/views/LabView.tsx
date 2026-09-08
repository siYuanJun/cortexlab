import { useCallback, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  type Node,
  type Edge,
  type Connection,
  type NodeProps,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { motion, AnimatePresence } from 'framer-motion'
import { BRAINS, type BrainData } from '../data/brains'
import { ADAPTER_FLOW } from '../data/sdkLayers'
import { useCortexStore } from '../store/useStore'
import { IconBrain, IconCpu, IconScale, IconChart, IconCode, IconDatabase, IconPlug, IconLab, IconSearch } from '../components/Icons'

/* 大脑图标映射 */
const BRAIN_ICONS: Record<string, typeof IconBrain> = {
  ontology: IconBrain,
  autologic: IconCpu,
  legal: IconScale,
  finance: IconChart,
  code: IconCode,
  data: IconDatabase,
}

/* ============================================================
   自定义节点 —— SDK 适配步骤节点
   ============================================================ */
function StepNode({ data }: NodeProps) {
  const step = data.step as (typeof ADAPTER_FLOW)[number]
  const index = data.index as number
  return (
    <div
      className="px-4 py-3 rounded-sm border-2 min-w-[180px] max-w-[220px]"
      style={{
        background: 'rgba(13, 18, 32, 0.95)',
        borderColor: step.color,
        boxShadow: `0 0 20px ${step.color}33`,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: step.color }} />
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          style={{ background: step.color, color: '#060913' }}
        >
          {index}
        </span>
        <span className="text-sm font-bold" style={{ color: step.color }}>
          {step.title}
        </span>
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed">{step.description}</p>
      <Handle type="source" position={Position.Right} style={{ background: step.color }} />
    </div>
  )
}

/* ============================================================
   自定义节点 —— 数字员工大脑插槽节点
   ============================================================ */
function BrainSlotNode({ data }: NodeProps) {
  const { installedBrains } = useCortexStore()
  const installed = installedBrains.includes(data.brainId as string)
  const brain = BRAINS.find((b) => b.id === data.brainId)

  return (
    <div
      className="px-5 py-4 rounded-sm border-2 min-w-[200px] text-center transition-all"
      style={{
        background: installed
          ? `linear-gradient(135deg, ${brain?.color}22 0%, ${brain?.color}11 100%)`
          : 'rgba(13, 18, 32, 0.95)',
        borderColor: installed ? brain?.color : '#334155',
        boxShadow: installed ? `0 0 30px ${brain?.glowColor}` : 'none',
      }}
    >
      <div className="mb-2 flex justify-center">
        {installed && brain ? (
          (() => { const Icon = BRAIN_ICONS[brain.id] || IconBrain; return <Icon size={28} style={{ color: brain.color }} /> })()
        ) : (
          <IconPlug size={28} style={{ color: '#6b6558' }} />
        )}
      </div>
      <div className="text-sm font-bold" style={{ color: installed ? brain?.color : '#64748b' }}>
        {installed ? brain?.name : '空插槽'}
      </div>
      <div className="text-[10px] text-slate-500 mt-1">
        {installed ? `${brain?.statusLabel} · 已激活` : '拖拽大脑卡片到此处安装'}
      </div>
    </div>
  )
}

const nodeTypes = {
  step: StepNode,
  brainSlot: BrainSlotNode,
}

/* ============================================================
   初始节点和边 —— SDK 适配五步流程
   ============================================================ */
const initialNodes: Node[] = ADAPTER_FLOW.map((step, i) => ({
  id: `step-${i + 1}`,
  type: 'step',
  position: { x: i * 240, y: 80 },
  data: { step, index: i + 1 },
}))

// 大脑插槽节点（放在流程下方）
const brainSlotNodes: Node[] = [
  { id: 'slot-1', type: 'brainSlot', position: { x: 100, y: 320 }, data: { brainId: 'ontology', label: '插槽 1' } },
  { id: 'slot-2', type: 'brainSlot', position: { x: 340, y: 320 }, data: { brainId: 'autologic', label: '插槽 2' } },
  { id: 'slot-3', type: 'brainSlot', position: { x: 580, y: 320 }, data: { brainId: '', label: '插槽 3' } },
  { id: 'slot-4', type: 'brainSlot', position: { x: 820, y: 320 }, data: { brainId: '', label: '插槽 4' } },
]

const initialEdges: Edge[] = ADAPTER_FLOW.slice(0, -1).map((_, i) => ({
  id: `e-${i + 1}-${i + 2}`,
  source: `step-${i + 1}`,
  target: `step-${i + 2}`,
  animated: true,
  style: { stroke: '#00e5ff', strokeWidth: 2 },
}))

/* ============================================================
   大脑卡片（可拖拽）
   ============================================================ */
function BrainCard({ brain, onSelect }: { brain: BrainData; onSelect: (b: BrainData) => void }) {
  const { installedBrains, uninstallBrain } = useCortexStore()
  const isInstalled = installedBrains.includes(brain.id)

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, brainId: string) => {
    event.dataTransfer.setData('application/reactflow', brainId)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`panel p-3 cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] ${
        isInstalled ? 'ring-1' : ''
      }`}
      style={{
        borderColor: isInstalled ? brain.color : undefined,
        boxShadow: isInstalled ? `0 0 15px ${brain.glowColor}` : undefined,
      }}
      draggable
      onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, brain.id)}
      onClick={() => onSelect(brain)}
    >
      <div className="flex items-start gap-2.5">
        {(() => { const Icon = BRAIN_ICONS[brain.id] || IconBrain; return <Icon size={22} style={{ color: brain.color, flexShrink: 0, marginTop: 2 }} /> })()}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold" style={{ color: brain.color }}>
              {brain.name}
            </span>
            <span
              className={`tag ${
                brain.status === 'production'
                  ? 'tag-green'
                  : brain.status === 'beta'
                    ? 'tag-cyan'
                    : brain.status === 'experimental'
                      ? 'tag-orange'
                      : 'tag-purple'
              }`}
            >
              {brain.statusLabel}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{brain.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {brain.techStack.slice(0, 3).map((t, i) => (
              <span key={i} className="text-[10px] text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      {isInstalled && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            uninstallBrain(brain.id)
          }}
          className="mt-2 w-full text-[10px] text-warning hover:text-red-300 py-1 rounded border border-red-900/50 hover:border-red-700 transition-colors"
        >
          卸载大脑
        </button>
      )}
    </motion.div>
  )
}

/* ============================================================
   大脑实验室视图
   ============================================================ */
export default function LabView() {
  const [nodes, setNodes, onNodesChange] = useNodesState([...initialNodes, ...brainSlotNodes])
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedBrain, setSelectedBrain] = useState<BrainData | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { installBrain, installedBrains } = useCortexStore()

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  )

  // 拖拽到画布
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const brainId = event.dataTransfer.getData('application/reactflow')
      if (!brainId || !wrapperRef.current) return

      installBrain(brainId)

      // 找到第一个空插槽，更新为该大脑
      setNodes((nds) => {
        const emptySlot = nds.find((n) => n.type === 'brainSlot' && !n.data.brainId)
        if (emptySlot) {
          return nds.map((n) =>
            n.id === emptySlot.id ? { ...n, data: { ...n.data, brainId } } : n,
          )
        }
        return nds
      })
    },
    [installBrain, setNodes],
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex overflow-hidden"
    >
      {/* 左侧：大脑零件库 */}
      <div className="w-[300px] border-r border-slate-800/60  flex flex-col">
        <div className="p-4 border-b border-slate-800/60">
          <h3 className="text-sm font-medium mb-1 flex items-center gap-2" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)' }}>
            <IconLab size={16} style={{ color: 'var(--ks-kinpaku)' }} />
            大脑零件库
          </h3>
          <p className="text-[11px] text-slate-500">拖拽大脑卡片到右侧插槽安装</p>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {BRAINS.map((brain) => (
            <BrainCard key={brain.id} brain={brain} onSelect={setSelectedBrain} />
          ))}
        </div>
        <div className="p-3 border-t border-slate-800/60">
          <div className="text-[11px] text-slate-500 text-center">
            已安装 <span className="text-gold font-bold">{installedBrains.length}</span> / {BRAINS.length} 个大脑
          </div>
        </div>
      </div>

      {/* 中间：React Flow 画布 */}
      <div className="flex-1 relative" ref={wrapperRef}>
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <h2 className="text-lg font-bold text-slate-100">
            SDK 适配<span className="glow-purple">五步流程</span>
          </h2>
          <p className="text-[11px] text-slate-500">从继承 BaseBrain 到 Docker 上线，每一步都是标准化的</p>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} color="#1e2a45" />
          <Controls showInteractive={false} />
          <MiniMap
            nodeColor={(n) => (n.type === 'step' ? '#00e5ff' : '#a855f7')}
            maskColor="rgba(6, 9, 19, 0.8)"
            pannable
            zoomable
          />
        </ReactFlow>

        {/* 插槽区域标签 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="panel px-4 py-2 text-center">
            <span className="text-xs text-slate-400">
              上方是适配流程 · 下方是<span className="text-patina font-medium">数字员工大脑插槽</span>（拖拽安装）
            </span>
          </div>
        </div>
      </div>

      {/* 右侧：选中大脑详情 */}
      <div className="w-[320px] border-l border-slate-800/60  overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedBrain ? (
            <motion.div
              key={selectedBrain.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full flex flex-col p-4 overflow-y-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedBrain.icon}</span>
                <div>
                  <h3 className="text-base font-bold" style={{ color: selectedBrain.color }}>
                    {selectedBrain.name}
                  </h3>
                  <p className="text-[11px] text-slate-500">{selectedBrain.nameEn}</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">{selectedBrain.description}</p>

              <div className="mb-4">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">技术栈</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedBrain.techStack.map((t, i) => (
                    <span key={i} className="tag tag-cyan">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">任务类型</div>
                <div className="space-y-2">
                  {selectedBrain.taskTypes.map((tt, i) => (
                    <div key={i} className="panel p-2.5">
                      <div className="text-xs font-semibold text-slate-200">{tt.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{tt.id}</div>
                      <p className="text-[11px] text-slate-400 mt-1">{tt.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">适配步骤</div>
                <div className="space-y-1.5">
                  {selectedBrain.adapterSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5"
                        style={{ background: selectedBrain.color, color: '#060913' }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-[11px] text-slate-400 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="mb-4 opacity-30"><IconSearch size={40} style={{ color: 'var(--ks-muted)' }} /></div>
              <h3 className="text-sm font-semibold text-slate-400 mb-2">选择一个大脑查看详情</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                点击左侧零件库中的大脑卡片，查看它的技术栈、任务类型和适配步骤
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

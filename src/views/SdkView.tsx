import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SDK_LAYERS, type SdkLayer } from '../data/sdkLayers'
import { IconPackage, IconChevronDown } from '../components/Icons'

/* ============================================================
   单层卡片
   ============================================================ */
function LayerCard({
  layer,
  isExpanded,
  onToggle,
}: {
  layer: SdkLayer
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      layout
      className="panel overflow-hidden cursor-pointer transition-all hover:border-slate-600"
      style={{
        borderColor: isExpanded ? layer.color : undefined,
        boxShadow: isExpanded ? `0 0 30px ${layer.glowColor}` : undefined,
      }}
      onClick={onToggle}
    >
      {/* 头部 */}
      <div className="flex items-center gap-4 p-4">
        {/* 层级编号 */}
        <div
          className="w-12 h-12 rounded-sm flex items-center justify-center text-xl font-bold flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${layer.color}33 0%, ${layer.color}11 100%)`,
            border: `1px solid ${layer.color}`,
            color: layer.color,
          }}
        >
          L{layer.level}
        </div>

        {/* 标题和描述 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold" style={{ color: layer.color }}>
              {layer.name}
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">{layer.nameEn}</span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{layer.description}</p>
        </div>

        {/* 组件数量 */}
        <div className="text-right flex-shrink-0">
          <div className="text-lg font-bold" style={{ color: layer.color }}>
            {layer.components.length}
          </div>
          <div className="text-[10px] text-slate-500">组件</div>
        </div>

        {/* 展开箭头 */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
          style={{ color: 'var(--ks-faint)' }}
        >
          <IconChevronDown size={14} />
        </motion.div>
      </div>

      {/* 展开内容 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 border-t border-slate-800/60">
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{layer.description}</p>

              {/* 关键接口 */}
              <div className="mb-4">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">关键接口</div>
                <div className="flex flex-wrap gap-1.5">
                  {layer.keyInterfaces.map((iface, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-1 rounded"
                      style={{
                        background: `${layer.color}15`,
                        border: `1px solid ${layer.color}44`,
                        color: layer.color,
                      }}
                    >
                      {iface}
                    </span>
                  ))}
                </div>
              </div>

              {/* 组件列表 */}
              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">组件详情</div>
              <div className="grid grid-cols-1 gap-2">
                {layer.components.map((comp, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-sm border border-slate-800 hover:border-slate-700 transition-colors "
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-slate-200">{comp.name}</span>
                      {comp.file && (
                        <span className="text-[10px] text-slate-600 font-mono">{comp.file}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{comp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ============================================================
   SDK 解剖视图
   ============================================================ */
export default function SdkView() {
  const [expandedLayer, setExpandedLayer] = useState<string | null>('core-layer')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex overflow-hidden"
    >
      {/* 左侧：五层架构列表 */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          {/* 标题 */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-100 mb-2">
              SDK <span className="glow-cyan">五层架构</span>深度解析
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              从大脑应用到平台基础设施，每一层各司其职。点击任一层展开查看组件详情。
              核心设计原则：<span className="text-gold">平台无关核心 + 平台适配层</span>
              ，保证大脑可移植、可扩展。
            </p>
          </div>

          {/* 架构流向图 */}
          <div className="panel p-4 mb-6">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-3">数据流向</div>
            <div className="flex items-center justify-between gap-2">
              {SDK_LAYERS.map((layer, i) => (
                <div key={layer.id} className="flex items-center flex-1">
                  <div
                    className="flex-1 text-center py-2 px-1 rounded-sm text-[10px] font-semibold truncate"
                    style={{
                      background: `${layer.color}15`,
                      border: `1px solid ${layer.color}44`,
                      color: layer.color,
                    }}
                  >
                    {layer.name.replace('层', '')}
                  </div>
                  {i < SDK_LAYERS.length - 1 && (
                    <div className="text-slate-600 mx-1 text-xs">→</div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-[10px] text-slate-600 mt-2 text-center">
              大脑调用 self.sdk → 核心接口 → 运行时分发 → 适配层转换 → 平台基础设施执行
            </div>
          </div>

          {/* 五层卡片 */}
          <div className="space-y-3">
            {SDK_LAYERS.map((layer) => (
              <LayerCard
                key={layer.id}
                layer={layer}
                isExpanded={expandedLayer === layer.id}
                onToggle={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 右侧：SDK 核心代码示例 */}
      <div className="w-[380px] border-l border-slate-800/60  overflow-y-auto p-5">
        <h3 className="text-sm font-medium mb-4 flex items-center gap-2" style={{ color: 'var(--ks-champagne)', fontFamily: 'var(--ks-font-display)' }}>
          <IconPackage size={16} style={{ color: 'var(--ks-kinpaku)' }} />
          最小大脑模板
        </h3>
        <p className="text-[11px] text-slate-500 mb-4">
          一个完整的大脑只需要这些代码。继承 BaseBrain，实现 on_task，通过 self.sdk 调用平台能力。
        </p>

        <pre className="code-block text-[11px] mb-6 leading-relaxed">{`# brain.yaml
id: my-brain
name: 我的大脑
version: 1.0.0
runtime: python
sdk_version: ">=0.1.0,<1.0.0"
entrypoint: src/main.py
task_types:
  - id: do-thing
    name: 做事情
    description: 示例任务`}</pre>

        <pre className="code-block text-[11px] leading-relaxed">{`# src/main.py
from agentteams_sdk import (
    BaseBrain, WorkerSDK,
    TaskContext, TaskResult
)

class MyBrain(BaseBrain):
    """我的数字员工大脑。"""

    async def on_task(
        self, ctx: TaskContext
    ) -> TaskResult:
        # ctx.task_id / ctx.task_type
        # ctx.input / ctx.room_id

        # 调用平台能力（全部通过 self.sdk）
        resp = await self.sdk.llm.chat(
            "分析这些文档..."
        )
        await self.sdk.send_message(
            "进度 50%"
        )
        await self.sdk.files.save(
            "result.json",
            resp.encode()
        )

        return TaskResult.success(
            output="任务完成",
            artifacts=[{
                "name": "result.json",
                "path": "output/result.json"
            }],
            metadata={"quality": "good"}
        )`}</pre>

        <div className="mt-6 panel p-3">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">自检命令</div>
          <pre className="code-block text-[11px]">{`# 7 项合规检查
agentteams-sdk check .

# 启动大脑
agentteams-sdk run .`}</pre>
        </div>
      </div>
    </motion.div>
  )
}

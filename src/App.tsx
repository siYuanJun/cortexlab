import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import BodyView from './views/BodyView'
import LabView from './views/LabView'
import SdkView from './views/SdkView'
import BlueprintView from './views/BlueprintView'
import { useCortexStore } from './store/useStore'

/* ============================================================
   CortexLab · 数字员工大脑架构实验室
   主应用组件
   ============================================================ */
export default function App() {
  const { currentView } = useCortexStore()

  return (
    <div className="w-full h-full flex flex-col bg-[#060913] text-slate-100 overflow-hidden">
      {/* 背景网格 */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* 顶部导航 */}
      <Navbar />

      {/* 主内容区 */}
      <main className="flex-1 flex overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentView === 'body' && <BodyView key="body" />}
          {currentView === 'lab' && <LabView key="lab" />}
          {currentView === 'sdk' && <SdkView key="sdk" />}
          {currentView === 'blueprint' && <BlueprintView key="blueprint" />}
        </AnimatePresence>
      </main>
    </div>
  )
}

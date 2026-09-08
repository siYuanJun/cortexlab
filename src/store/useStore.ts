import { create } from 'zustand'

export type ViewType = 'body' | 'lab' | 'sdk' | 'blueprint'

export interface BodyPartState {
  selectedPart: string | null
  hoveredPart: string | null
}

interface CortexState {
  // 视图
  currentView: ViewType
  setView: (v: ViewType) => void

  // 人体部位
  selectedPart: string | null
  hoveredPart: string | null
  setSelectedPart: (id: string | null) => void
  setHoveredPart: (id: string | null) => void

  // 大脑实验室
  installedBrains: string[]
  installBrain: (id: string) => void
  uninstallBrain: (id: string) => void

  // UI
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
}

export const useCortexStore = create<CortexState>((set) => ({
  currentView: 'body',
  setView: (v) => set({ currentView: v }),

  selectedPart: null,
  hoveredPart: null,
  setSelectedPart: (id) => set({ selectedPart: id }),
  setHoveredPart: (id) => set({ hoveredPart: id }),

  installedBrains: ['ontology', 'autologic'],
  installBrain: (id) =>
    set((s) => ({
      installedBrains: s.installedBrains.includes(id)
        ? s.installedBrains
        : [...s.installedBrains, id],
    })),
  uninstallBrain: (id) =>
    set((s) => ({
      installedBrains: s.installedBrains.filter((b) => b !== id),
    })),

  sidebarOpen: true,
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
}))

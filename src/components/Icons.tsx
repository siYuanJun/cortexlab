import type { SVGProps, ReactElement } from 'react'

/* ============================================================
   Neo Kinpaku 图标系统
   所有图标统一 24x24 viewBox，stroke 风格，无填充
   ============================================================ */

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number
}

function Base({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  )
}

/* ---- 导航视图 ---- */
export const IconBody = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="5" r="2.5" />
    <path d="M12 7.5v5" />
    <path d="M8 10l4 2.5 4-2.5" />
    <path d="M10 12.5L9 20" />
    <path d="M14 12.5l1 7.5" />
  </Base>
)

export const IconLab = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 3h6" />
    <path d="M10 3v6L5 19a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 19l-5-10V3" />
    <path d="M7.5 15h9" />
  </Base>
)

export const IconLayers = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2l10 6-10 6L2 8l10-6z" />
    <path d="M2 14l10 6 10-6" />
    <path d="M2 11l10 6 10-6" />
  </Base>
)

/* ---- 人体部位 ---- */
export const IconBrain = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v.5A2.5 2.5 0 0 0 5 7.5 2.5 2.5 0 0 0 6 12a2.5 2.5 0 0 0 1 4.5A2.5 2.5 0 0 0 10 19V4.5A2.5 2.5 0 0 0 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v.5A2.5 2.5 0 0 1 19 7.5a2.5 2.5 0 0 1-1 4.5 2.5 2.5 0 0 1-1 4.5A2.5 2.5 0 0 1 14 19V4.5A2.5 2.5 0 0 1 14.5 2z" />
  </Base>
)

export const IconSkull = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2a8 8 0 0 0-8 8c0 2.5 1.3 4.5 3 5.7V19a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3.3c1.7-1.2 3-3.2 3-5.7a8 8 0 0 0-8-8z" />
    <circle cx="9" cy="11" r="1.5" />
    <circle cx="15" cy="11" r="1.5" />
    <path d="M10 16h4" />
  </Base>
)

export const IconSpine = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v18" />
    <rect x="9" y="3" width="6" height="3" rx="1" />
    <rect x="9" y="8" width="6" height="3" rx="1" />
    <rect x="9" y="13" width="6" height="3" rx="1" />
    <rect x="9" y="18" width="6" height="3" rx="1" />
  </Base>
)

export const IconHeart = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
  </Base>
)

export const IconLung = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v6" />
    <path d="M12 9c-1 0-2 .5-2 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V9a5 5 0 0 1 5-5c1.5 0 3 1 3 2" />
    <path d="M12 9c1 0 2 .5 2 2v6a3 3 0 0 0 3 3 3 3 0 0 0 3-3V9a5 5 0 0 0-5-5c-1.5 0-3 1-3 2" />
  </Base>
)

export const IconStomach = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 4h4v3a4 4 0 0 1-4 4v-7z" />
    <path d="M10 7c0 3-2 5-4 5v3a6 6 0 0 0 6 6h2a6 6 0 0 0 6-6V8a4 4 0 0 0-4-4h-2" />
  </Base>
)

export const IconLiver = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </Base>
)

export const IconHand = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 11V5a1.5 1.5 0 0 1 3 0v5" />
    <path d="M10 10V3.5a1.5 1.5 0 0 1 3 0V10" />
    <path d="M13 10V5a1.5 1.5 0 0 1 3 0v8" />
    <path d="M16 9a1.5 1.5 0 0 1 3 0v6a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6v-2a1.5 1.5 0 0 1 3 0" />
  </Base>
)

export const IconLeg = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 3h4v6l2 4v5a2 2 0 0 1-2 2h-1v-5h-2v5H8a2 2 0 0 1-2-2v-5l2-4V3z" />
  </Base>
)

export const IconEye = (p: IconProps) => (
  <Base {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </Base>
)

export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </Base>
)

/* ---- 技术/大脑 ---- */
export const IconCpu = (p: IconProps) => (
  <Base {...p}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </Base>
)

export const IconChip = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 9h6v6H9z" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
  </Base>
)

export const IconNetwork = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <path d="M12 7v4M12 11L6 17M12 11l6 6" />
  </Base>
)

export const IconPlug = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 2v6M15 2v6" />
    <path d="M6 8h12v3a6 6 0 0 1-12 0V8z" />
    <path d="M12 17v5" />
  </Base>
)

export const IconCode = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 6l-6 6 6 6" />
    <path d="M16 6l6 6-6 6" />
    <path d="M14 4l-4 16" />
  </Base>
)

export const IconDatabase = (p: IconProps) => (
  <Base {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
    <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
  </Base>
)

export const IconScale = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v18" />
    <path d="M5 7h14" />
    <path d="M5 7l-3 7a3 3 0 0 0 6 0L5 7z" />
    <path d="M19 7l-3 7a3 3 0 0 0 6 0l-3-7z" />
    <path d="M8 21h8" />
  </Base>
)

export const IconChart = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 3v18h18" />
    <path d="M7 15l4-4 3 3 5-6" />
  </Base>
)

/* ---- UI 通用 ---- */
export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12l5 5L20 7" />
  </Base>
)

export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Base>
)

export const IconChevronDown = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 9l6 6 6-6" />
  </Base>
)

export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Base>
)

export const IconPlus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
)

export const IconMinus = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
)

export const IconDrag = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="6" r="1" />
    <circle cx="15" cy="6" r="1" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="9" cy="18" r="1" />
    <circle cx="15" cy="18" r="1" />
  </Base>
)

export const IconSearch = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Base>
)

export const IconDot = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
  </Base>
)

export const IconTerminal = (p: IconProps) => (
  <Base {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 9l3 3-3 3" />
    <path d="M12 15h6" />
  </Base>
)

export const IconPackage = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
    <path d="M3 7l9 5 9-5" />
    <path d="M12 12v10" />
  </Base>
)

export const IconGit = (p: IconProps) => (
  <Base {...p}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="6" cy="18" r="2.5" />
    <circle cx="18" cy="12" r="2.5" />
    <path d="M6 8.5v7" />
    <path d="M8.5 6H13a3 3 0 0 1 3 3v.5" />
  </Base>
)

/* ---- 部位图标映射 ---- */
export const PART_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  'brain-cortex': IconBrain,
  skull: IconSkull,
  brainstem: IconCpu,
  spine: IconSpine,
  heart: IconHeart,
  lungs: IconLung,
  stomach: IconStomach,
  liver: IconLiver,
  hands: IconHand,
  legs: IconLeg,
  senses: IconEye,
  immune: IconShield,
}

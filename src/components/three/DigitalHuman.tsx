import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Float, Line, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { BODY_PARTS, type BodyPartData } from '../../data/bodyParts'
import { useCortexStore } from '../../store/useStore'

/* ============================================================
   人体比例常量（y 轴向上，原点在脚底中心）
   总高 ≈ 5.6，头占 1/7
   ============================================================ */
const H = {
  foot: 0,
  ankle: 0.3,
  knee: 1.5,
  pelvis: 2.7,
  waist: 3.1,
  chest: 3.6,
  nipple: 3.9,
  shoulder: 4.4,
  neck: 4.7,
  chin: 4.9,
  nose: 5.15,
  crown: 5.55,
}

/* ============================================================
   半透明人体轮廓 —— 纯视觉，不可点击
   用线框材质勾勒人形，让器官有"身体"可依
   ============================================================ */
function HumanOutline() {
  const mat = (
    <meshBasicMaterial
      color="#d4af37"
      wireframe
      transparent
      opacity={0.05}
    />
  )

  return (
    <group>
      {/* 头部 */}
      <mesh position={[0, H.neck + 0.4, 0]}>
        <sphereGeometry args={[0.38, 24, 24]} />
        {mat}
      </mesh>
      {/* 下颌/脖子 */}
      <mesh position={[0, H.neck - 0.05, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.35, 16]} />
        {mat}
      </mesh>
      {/* 躯干（胸腔+腹腔） */}
      <mesh position={[0, (H.pelvis + H.shoulder) / 2, 0]}>
        <capsuleGeometry args={[0.42, 1.3, 8, 20]} />
        {mat}
      </mesh>
      {/* 骨盆 */}
      <mesh position={[0, H.pelvis - 0.1, 0]}>
        <sphereGeometry args={[0.38, 20, 16]} />
        {mat}
      </mesh>
      {/* 左大腿 */}
      <mesh position={[-0.18, (H.knee + H.pelvis) / 2, 0]} rotation={[0, 0, 0.06]}>
        <capsuleGeometry args={[0.14, 0.95, 8, 16]} />
        {mat}
      </mesh>
      {/* 右大腿 */}
      <mesh position={[0.18, (H.knee + H.pelvis) / 2, 0]} rotation={[0, 0, -0.06]}>
        <capsuleGeometry args={[0.14, 0.95, 8, 16]} />
        {mat}
      </mesh>
      {/* 左小腿 */}
      <mesh position={[-0.16, (H.ankle + H.knee) / 2, 0]}>
        <capsuleGeometry args={[0.11, 0.9, 8, 16]} />
        {mat}
      </mesh>
      {/* 右小腿 */}
      <mesh position={[0.16, (H.ankle + H.knee) / 2, 0]}>
        <capsuleGeometry args={[0.11, 0.9, 8, 16]} />
        {mat}
      </mesh>
      {/* 左上臂 */}
      <mesh position={[-0.45, 3.7, 0]} rotation={[0, 0, 0.12]}>
        <capsuleGeometry args={[0.09, 0.7, 8, 16]} />
        {mat}
      </mesh>
      {/* 右上臂 */}
      <mesh position={[0.45, 3.7, 0]} rotation={[0, 0, -0.12]}>
        <capsuleGeometry args={[0.09, 0.7, 8, 16]} />
        {mat}
      </mesh>
      {/* 左前臂 */}
      <mesh position={[-0.5, 2.7, 0]} rotation={[0, 0, 0.06]}>
        <capsuleGeometry args={[0.075, 0.65, 8, 16]} />
        {mat}
      </mesh>
      {/* 右前臂 */}
      <mesh position={[0.5, 2.7, 0]} rotation={[0, 0, -0.06]}>
        <capsuleGeometry args={[0.075, 0.65, 8, 16]} />
        {mat}
      </mesh>
    </group>
  )
}

/* ============================================================
   单个身体部位的 3D 网格
   ============================================================ */
interface BodyPartMeshProps {
  part: BodyPartData
  isSelected: boolean
  isHovered: boolean
  onClick: () => void
  onPointerOver: () => void
  onPointerOut: () => void
}

function BodyPartMesh({
  part,
  isSelected,
  isHovered,
  onClick,
  onPointerOver,
  onPointerOut,
}: BodyPartMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // 根据部位 id 选择几何体和变换
  const { geometry, position, rotation, scale } = useMemo(() => {
    switch (part.id) {
      case 'skull':
        return {
          geometry: <sphereGeometry args={[0.38, 32, 32]} />,
          position: [0, H.neck + 0.4, 0] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1, 1.05, 1] as [number, number, number],
        }
      case 'cortex':
        return {
          geometry: <sphereGeometry args={[0.26, 24, 24]} />,
          position: [0, H.neck + 0.42, 0] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1, 0.9, 1.1] as [number, number, number],
        }
      case 'brainstem':
        return {
          geometry: <cylinderGeometry args={[0.08, 0.12, 0.25, 12]} />,
          position: [0, H.neck + 0.15, 0] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1, 1, 1] as [number, number, number],
        }
      case 'spine':
        return {
          geometry: <cylinderGeometry args={[0.05, 0.07, 1.8, 10]} />,
          position: [0, (H.pelvis + H.neck) / 2, -0.28] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1, 1, 1] as [number, number, number],
        }
      case 'heart':
        return {
          geometry: <sphereGeometry args={[0.14, 20, 20]} />,
          position: [-0.12, H.nipple, 0.05] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1, 1.1, 0.9] as [number, number, number],
        }
      case 'lungs':
        return {
          geometry: <capsuleGeometry args={[0.13, 0.45, 8, 16]} />,
          position: [0.16, H.nipple + 0.1, 0] as [number, number, number],
          rotation: [0, 0, -0.08] as [number, number, number],
          scale: [1, 1, 0.7] as [number, number, number],
        }
      case 'stomach':
        return {
          geometry: <sphereGeometry args={[0.16, 20, 20]} />,
          position: [0.05, H.waist + 0.1, 0.08] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1.1, 0.9, 1] as [number, number, number],
        }
      case 'liver':
        return {
          geometry: <sphereGeometry args={[0.15, 20, 20]} />,
          position: [0.18, H.waist + 0.25, 0.05] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1.3, 0.7, 0.9] as [number, number, number],
        }
      case 'hands':
        // 双手 = 左右前臂组合
        return {
          geometry: <capsuleGeometry args={[0.085, 0.6, 8, 16]} />,
          position: [0.62, (H.waist + H.chest) / 2, 0] as [number, number, number],
          rotation: [0, 0, -0.12] as [number, number, number],
          scale: [1, 1, 1] as [number, number, number],
        }
      case 'legs':
        return {
          geometry: <capsuleGeometry args={[0.11, 0.9, 8, 16]} />,
          position: [0.16, (H.ankle + H.knee) / 2, 0] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1, 1, 1] as [number, number, number],
        }
      case 'senses':
        return {
          geometry: <sphereGeometry args={[0.06, 16, 16]} />,
          position: [0, H.nose, 0.38] as [number, number, number],
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1, 1, 1] as [number, number, number],
        }
      case 'immune':
        // 免疫系统 = 围绕身体的半透明光环
        return {
          geometry: <torusGeometry args={[0.7, 0.015, 12, 64]} />,
          position: [0, H.chest, 0] as [number, number, number],
          rotation: [Math.PI / 2, 0, 0] as [number, number, number],
          scale: [1, 1.3, 1] as [number, number, number],
        }
      default:
        return {
          geometry: <sphereGeometry args={[0.2, 16, 16]} />,
          position: part.position,
          rotation: [0, 0, 0] as [number, number, number],
          scale: [1, 1, 1] as [number, number, number],
        }
    }
  }, [part.id, part.position])

  // 呼吸/脉冲动画
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const pulse = 1 + Math.sin(t * 1.8 + position[1] * 0.5) * 0.015
    const targetScale = isSelected ? 1.2 : isHovered || hovered ? 1.1 : 1
    meshRef.current.scale.set(
      scale[0] * pulse * targetScale,
      scale[1] * pulse * targetScale,
      scale[2] * pulse * targetScale,
    )
  })

  const emissiveIntensity = isSelected ? 1.0 : isHovered || hovered ? 0.7 : 0.25
  const opacity = isSelected ? 0.9 : isHovered || hovered ? 0.75 : 0.5

  // hands 和 legs 需要渲染左右对称的两个
  if (part.id === 'hands') {
    return (
      <group>
        {[-1, 1].map((side) => (
          <group key={side}>
            {/* 上臂 */}
            <mesh position={[side * 0.45, 3.7, 0]} rotation={[0, 0, side * 0.12]}
              onClick={(e) => { e.stopPropagation(); onClick() }}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onPointerOver(); document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { setHovered(false); onPointerOut(); document.body.style.cursor = 'auto' }}
            >
              <capsuleGeometry args={[0.09, 0.7, 8, 16]} />
              <meshPhysicalMaterial color={part.color} emissive={part.color} emissiveIntensity={emissiveIntensity} transparent opacity={opacity} roughness={0.3} metalness={0.6} clearcoat={0.8} />
            </mesh>
            {/* 前臂 */}
            <mesh position={[side * 0.5, 2.7, 0]} rotation={[0, 0, side * 0.06]}
              onClick={(e) => { e.stopPropagation(); onClick() }}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onPointerOver(); document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { setHovered(false); onPointerOut(); document.body.style.cursor = 'auto' }}
            >
              <capsuleGeometry args={[0.075, 0.65, 8, 16]} />
              <meshPhysicalMaterial color={part.color} emissive={part.color} emissiveIntensity={emissiveIntensity} transparent opacity={opacity} roughness={0.3} metalness={0.6} clearcoat={0.8} />
            </mesh>
          </group>
        ))}
        {(isSelected || isHovered || hovered) && (
          <Html position={[0, 3.0, 0.5]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
            <div style={{
              background: 'rgba(13, 11, 8, 0.95)',
              border: `1px solid ${part.color}`,
              borderRadius: '2px',
              padding: '3px 10px',
              whiteSpace: 'nowrap',
              fontSize: '11px',
              fontFamily: 'var(--ks-font-mono)',
              color: part.color,
              boxShadow: `0 0 16px ${part.glowColor}`,
            }}>{part.name}</div>
          </Html>
        )}
      </group>
    )
  }

  if (part.id === 'legs') {
    return (
      <group>
        {[-1, 1].map((side) => (
          <group key={side}>
            {/* 大腿 */}
            <mesh position={[side * 0.18, (H.knee + H.pelvis) / 2, 0]} rotation={[0, 0, side * 0.06]}
              onClick={(e) => { e.stopPropagation(); onClick() }}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onPointerOver(); document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { setHovered(false); onPointerOut(); document.body.style.cursor = 'auto' }}
            >
              <capsuleGeometry args={[0.14, 0.95, 8, 16]} />
              <meshPhysicalMaterial color={part.color} emissive={part.color} emissiveIntensity={emissiveIntensity} transparent opacity={opacity} roughness={0.3} metalness={0.6} clearcoat={0.8} />
            </mesh>
            {/* 小腿 */}
            <mesh position={[side * 0.16, (H.ankle + H.knee) / 2, 0]}
              onClick={(e) => { e.stopPropagation(); onClick() }}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onPointerOver(); document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { setHovered(false); onPointerOut(); document.body.style.cursor = 'auto' }}
            >
              <capsuleGeometry args={[0.11, 0.9, 8, 16]} />
              <meshPhysicalMaterial color={part.color} emissive={part.color} emissiveIntensity={emissiveIntensity} transparent opacity={opacity} roughness={0.3} metalness={0.6} clearcoat={0.8} />
            </mesh>
          </group>
        ))}
        {(isSelected || isHovered || hovered) && (
          <Html position={[0, H.knee, 0.4]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
            <div style={{
              background: 'rgba(13, 11, 8, 0.95)',
              border: `1px solid ${part.color}`,
              borderRadius: '2px',
              padding: '3px 10px',
              whiteSpace: 'nowrap',
              fontSize: '11px',
              fontFamily: 'var(--ks-font-mono)',
              color: part.color,
              boxShadow: `0 0 16px ${part.glowColor}`,
            }}>{part.name}</div>
          </Html>
        )}
      </group>
    )
  }

  if (part.id === 'lungs') {
    // 左右肺
    return (
      <group>
        {[-1, 1].map((side) => (
          <mesh key={side}
            ref={side === 1 ? meshRef : undefined}
            position={[side * 0.16, H.nipple + 0.1, 0]}
            rotation={[0, 0, side * -0.08]}
            onClick={(e) => { e.stopPropagation(); onClick() }}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onPointerOver(); document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { setHovered(false); onPointerOut(); document.body.style.cursor = 'auto' }}
          >
            <capsuleGeometry args={[0.13, 0.45, 8, 16]} />
            <meshPhysicalMaterial color={part.color} emissive={part.color} emissiveIntensity={emissiveIntensity} transparent opacity={opacity} roughness={0.3} metalness={0.6} clearcoat={0.8} />
          </mesh>
        ))}
        {(isSelected || isHovered || hovered) && (
          <Html position={[0, H.nipple + 0.5, 0.4]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
            <div style={{
              background: 'rgba(13, 11, 8, 0.95)', border: `1px solid ${part.color}`, borderRadius: '2px',
              padding: '3px 10px', whiteSpace: 'nowrap', fontSize: '11px', fontFamily: 'var(--ks-font-mono)',
              color: part.color, boxShadow: `0 0 16px ${part.glowColor}`,
            }}>{part.name}</div>
          </Html>
        )}
      </group>
    )
  }

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick() }}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onPointerOver(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); onPointerOut(); document.body.style.cursor = 'auto' }}
      >
        {geometry}
        <meshPhysicalMaterial
          color={part.color}
          emissive={part.color}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.6}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          wireframe={part.id === 'immune' || part.id === 'spine'}
        />
      </mesh>

      {/* 外发光线框 */}
      <mesh scale={1.03}>
        {geometry}
        <meshBasicMaterial
          color={part.color}
          wireframe
          transparent
          opacity={isSelected ? 0.5 : isHovered || hovered ? 0.3 : 0.12}
        />
      </mesh>

      {/* 名称标签 */}
      {(isSelected || isHovered || hovered) && (
        <Html position={[0, 0.35, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(13, 11, 8, 0.95)',
            border: `1px solid ${part.color}`,
            borderRadius: '2px',
            padding: '3px 10px',
            whiteSpace: 'nowrap',
            fontSize: '11px',
            fontFamily: 'var(--ks-font-mono)',
            letterSpacing: '0.05em',
            color: part.color,
            boxShadow: `0 0 16px ${part.glowColor}`,
          }}>
            {part.name}
          </div>
        </Html>
      )}
    </group>
  )
}

/* ============================================================
   血液粒子流 —— 沿脊柱的能量粒子
   ============================================================ */
function BloodParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 80

  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const spd = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const y = H.pelvis + Math.random() * (H.neck - H.pelvis)
      const angle = Math.random() * Math.PI * 2
      const radius = 0.04 + Math.random() * 0.1
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(angle) * radius - 0.1

      // 金箔到铜绿渐变
      const t = (y - H.pelvis) / (H.neck - H.pelvis)
      col[i * 3] = 0.83 - t * 0.54
      col[i * 3 + 1] = 0.69 - t * 0.07
      col[i * 3 + 2] = 0.22 + t * 0.34

      spd[i] = 0.2 + Math.random() * 0.5
    }
    return { positions: pos, colors: col, speeds: spd }
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta * 0.6
      if (arr[i * 3 + 1] > H.neck) {
        arr[i * 3 + 1] = H.pelvis
        const angle = Math.random() * Math.PI * 2
        const radius = 0.04 + Math.random() * 0.1
        arr[i * 3] = Math.cos(angle) * radius
        arr[i * 3 + 2] = Math.sin(angle) * radius - 0.1
      }
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ============================================================
   神经脉冲连线 —— 从大脑到各器官
   ============================================================ */
function NeuralConnections() {
  const brainPos = new THREE.Vector3(0, H.neck + 0.4, 0)
  const organs = [
    { pos: new THREE.Vector3(-0.12, H.nipple, 0.1), color: '#d4af37' },
    { pos: new THREE.Vector3(0.16, H.nipple + 0.1, 0.1), color: '#4a9d8f' },
    { pos: new THREE.Vector3(0.05, H.waist + 0.1, 0.1), color: '#b8941f' },
    { pos: new THREE.Vector3(0.62, H.waist + 0.3, 0), color: '#e8d5a3' },
    { pos: new THREE.Vector3(0.16, H.knee, 0), color: '#6b6558' },
  ]

  return (
    <group>
      {organs.map((o, i) => (
        <Line
          key={i}
          points={[brainPos, o.pos]}
          color={o.color}
          lineWidth={0.5}
          transparent
          opacity={0.25}
          dashed
          dashSize={0.12}
          gapSize={0.08}
        />
      ))}
    </group>
  )
}

/* ============================================================
   3D 场景内容
   ============================================================ */
function Scene() {
  const { selectedPart, hoveredPart, setSelectedPart, setHoveredPart } = useCortexStore()

  return (
    <>
      {/* 灯光 —— 金箔+铜绿+暖白 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 6, 4]} intensity={1.5} color="#d4af37" />
      <pointLight position={[-4, 3, -4]} intensity={0.8} color="#4a9d8f" />
      <pointLight position={[0, -2, 3]} intensity={0.4} color="#e8d5a3" />
      <spotLight
        position={[0, 7, 3]}
        angle={0.6}
        penumbra={1}
        intensity={2}
        color="#f5f0e6"
        castShadow
      />

      {/* 人体整体缓慢浮动 */}
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.2}>
        <group position={[0, -0.3, 0]}>
          {/* 半透明人体轮廓 */}
          <HumanOutline />

          {/* 所有可点击部位 */}
          {BODY_PARTS.map((part) => (
            <BodyPartMesh
              key={part.id}
              part={part}
              isSelected={selectedPart === part.id}
              isHovered={hoveredPart === part.id}
              onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
              onPointerOver={() => setHoveredPart(part.id)}
              onPointerOut={() => setHoveredPart(null)}
            />
          ))}

          {/* 血液粒子 */}
          <BloodParticles />

          {/* 神经连线 */}
          <NeuralConnections />
        </group>
      </Float>

      {/* 环境粒子 */}
      <Sparkles count={50} scale={[6, 7, 6]} size={1.5} speed={0.2} color="#d4af37" opacity={0.25} />

      {/* 地面 */}
      <mesh position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3, 64]} />
        <meshBasicMaterial color="#0d0b08" transparent opacity={0.8} />
      </mesh>
      <gridHelper args={[8, 16, '#2a2520', '#151210']} position={[0, -0.34, 0]} />
    </>
  )
}

/* ============================================================
   3D 数字员工人体主组件
   ============================================================ */
export default function DigitalHuman() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 2.2, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0d0b08']} />
        <fog attach="fog" args={['#0d0b08', 7, 14]} />
        <Scene />
        <OrbitControls
          enablePan={false}
          minDistance={4}
          maxDistance={10}
          target={[0, 2.2, 0]}
          minPolarAngle={Math.PI * 0.2}
          maxPolarAngle={Math.PI * 0.8}
          autoRotate
          autoRotateSpeed={0.4}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

      {/* 左下角提示 */}
      <div className="absolute bottom-4 left-4 text-[11px] space-y-1 pointer-events-none" style={{ color: 'var(--ks-faint)', fontFamily: 'var(--ks-font-mono)' }}>
        <div>拖拽旋转 · 滚轮缩放 · 点击部位查看详情</div>
        <div style={{ color: 'var(--ks-disabled)' }}>数字员工 = 大脑(SDK) + 神经(Matrix) + 心脏(Manager) + 手脚(Worker)</div>
      </div>
    </div>
  )
}

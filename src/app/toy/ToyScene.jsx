"use client"

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useMemo } from 'react'

export default function ToyScene() {
  return (
    <Canvas camera={{ position: [20, 20, 20], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <OrbitControls enableDamping dampingFactor={0.1} />
    </Canvas>
  )
}

function Scene() {
  const gridSize = 10
  const spacing = 1.2
  const baseSize = 1

  const buildings = useMemo(() => {
    const b = []
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const height = Math.random() * 5 + 0.5
        b.push({ x: i * spacing, z: j * spacing, height })
      }
    }
    return b
  }, [gridSize, spacing])

  return (
    <group position={[-(gridSize * spacing)/2, 0, -(gridSize * spacing)/2]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
      {buildings.map((b, idx) => (
        <mesh key={idx} position={[b.x, b.height/2, b.z]} castShadow receiveShadow>
          <boxGeometry args={[baseSize, b.height, baseSize]} />
          <meshStandardMaterial color="#555" metalness={0.1} roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}
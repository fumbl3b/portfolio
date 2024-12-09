"use client"

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ToyScene() {
  const [pressedKeys, setPressedKeys] = useState(new Set())
  const [fov, setFov] = useState(50)
  const [buildings, setBuildings] = useState(() => generateBuildings())
  const [laser, setLaser] = useState(null) // {start: Vector3, end: Vector3}

  // Key & wheel handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
      }
      const newSet = new Set(pressedKeys)
      newSet.add(e.key)
      setPressedKeys(newSet)
    }

    const handleKeyUp = (e) => {
      const newSet = new Set(pressedKeys)
      newSet.delete(e.key)
      setPressedKeys(newSet)
    }

    const handleWheel = (e) => {
      const zoomSpeed = 1
      if (e.deltaY < 0) {
        setFov((prev) => Math.max(10, prev - zoomSpeed))
      } else {
        setFov((prev) => Math.min(100, prev + zoomSpeed))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [pressedKeys])

  const handlePointerDown = (e) => {
    e.stopPropagation()
    shootLaser({ buildings, setBuildings, setLaser })
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas 
        camera={{ position: [0, 20, 20], fov: fov }}
        onPointerDown={handlePointerDown}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Scene buildings={buildings} />
        </Suspense>
        <CameraController pressedKeys={pressedKeys} fov={fov} />
        <GlobalRefs />
        {laser && <LaserBeam start={laser.start} end={laser.end} />}
      </Canvas>
      <KeyHUD pressedKeys={pressedKeys} />
    </div>
  )
}

function CameraController({ pressedKeys, fov }) {
  const { camera } = useThree()

  const pitch = useRef(-Math.PI / 4) // look down 45°
  const yaw = useRef(0)

  useEffect(() => {
    camera.rotation.order = 'YXZ'
    camera.rotation.x = pitch.current
    camera.rotation.y = yaw.current
    camera.rotation.z = 0
  }, [camera])

  useEffect(() => {
    camera.fov = fov
    camera.updateProjectionMatrix()
  }, [fov, camera])

  useFrame(() => {
    let moveX = 0
    let moveZ = 0

    const moveSpeed = 0.2
    const turnSpeed = 0.02

    if (pressedKeys.has('ArrowLeft')) {
      yaw.current -= turnSpeed
    }
    if (pressedKeys.has('ArrowRight')) {
      yaw.current += turnSpeed
    }

    if (pressedKeys.has('w') || pressedKeys.has('W') || pressedKeys.has('ArrowUp')) {
      moveZ -= moveSpeed
    }
    if (pressedKeys.has('s') || pressedKeys.has('S') || pressedKeys.has('ArrowDown')) {
      moveZ += moveSpeed
    }
    if (pressedKeys.has('a') || pressedKeys.has('A')) {
      moveX -= moveSpeed
    }
    if (pressedKeys.has('d') || pressedKeys.has('D')) {
      moveX += moveSpeed
    }

    camera.rotation.y = yaw.current
    camera.rotation.x = pitch.current
    camera.rotation.z = 0

    const forward = new THREE.Vector3(0, 0, -1)
    const right = new THREE.Vector3(1, 0, 0)
    forward.applyEuler(camera.rotation)
    right.applyEuler(camera.rotation)
    forward.y = 0
    right.y = 0
    forward.normalize()
    right.normalize()

    camera.position.add(forward.clone().multiplyScalar(moveZ))
    camera.position.add(right.clone().multiplyScalar(moveX))
  })

  return null
}

function Scene({ buildings }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>
      {buildings.map((b) => (
        <mesh
          key={b.id}
          position={[b.x, b.height / 2, b.z]}
          castShadow
          receiveShadow
          userData={{ id: b.id }}
        >
          <boxGeometry args={[b.width, b.height, b.depth]} />
          <meshStandardMaterial color={b.color} metalness={0.1} roughness={0.8} />
        </mesh>
      ))}
    </group>
  )
}

function LaserBeam({ start, end }) {
  const direction = new THREE.Vector3().subVectors(end, start)
  const length = direction.length()
  const midpoint = start.clone().add(direction.clone().multiplyScalar(0.5))
  const up = new THREE.Vector3(0, 1, 0)
  const quat = new THREE.Quaternion().setFromUnitVectors(up, direction.clone().normalize())

  return (
    <mesh position={midpoint} quaternion={quat}>
      <cylinderGeometry args={[0.3, 0.3, length, 8]} />
      <meshBasicMaterial color="red" />
    </mesh>
  )
}

function KeyHUD({ pressedKeys }) {
  const keyStyle = (key) => ({
    display: 'inline-block',
    width: '20px',
    height: '20px',
    lineHeight: '20px',
    margin: '2px',
    textAlign: 'center',
    borderRadius: '3px',
    backgroundColor: pressedKeys.has(key) || pressedKeys.has(key.toLowerCase())
      ? '#555'
      : '#ccc'
  })

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      background: 'rgba(255,255,255,0.8)',
      padding: '10px',
      borderRadius: '8px',
      fontFamily: 'sans-serif',
      fontSize: '12px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '5px' }}>Movement Keys</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
        <div style={keyStyle('W')}>W</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={keyStyle('A')}>A</div>
        <div style={keyStyle('S')}>S</div>
        <div style={keyStyle('D')}>D</div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '5px' }}>Arrow Keys</div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
        <div style={keyStyle('ArrowUp')}>&uarr;</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={keyStyle('ArrowLeft')}>&larr;</div>
        <div style={keyStyle('ArrowDown')}>&darr;</div>
        <div style={keyStyle('ArrowRight')}>&rarr;</div>
      </div>
    </div>
  )
}

function generateBuildings() {
  const gridSize = 10
  const spacing = 2
  const b = []
  const halfGrid = gridSize / 2
  const shades = ['#333', '#444', '#555', '#666', '#777']
  let id = 0
  for (let i = -halfGrid; i < halfGrid; i++) {
    for (let j = -halfGrid; j < halfGrid; j++) {
      const height = Math.random() * 5 + 2
      const width = 1 + Math.random() * 2
      const depth = 1 + Math.random() * 2
      const color = shades[Math.floor(Math.random() * shades.length)]
      b.push({
        id: id++,
        x: i * spacing,
        z: j * spacing,
        height,
        width,
        depth,
        color
      })
    }
  }
  return b
}

function shootLaser({ buildings, setBuildings, setLaser }) {
  const { camera, scene } = getCurrentScene()

  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera({ x: 0, y: 0 }, camera)
  
  const allMeshes = scene.children[0].children // plane + buildings
  const buildingMeshes = allMeshes.filter(obj => obj.isMesh && obj.geometry.type === 'BoxGeometry')
  const intersects = raycaster.intersectObjects(buildingMeshes, true)

  if (intersects.length > 0) {
    const hit = intersects[0]
    const buildingId = hit.object.userData.id
    setBuildings(prev => prev.filter(b => b.id !== buildingId))
    showLaserBeam(camera, hit.point, setLaser)
  } else {
    // No direct hit: find the closest building within a radius
    const radius = 2.0
    const forward = new THREE.Vector3(0,0,-1).applyEuler(camera.rotation).normalize()
    const camPos = camera.position.clone()

    let closestDistAlong = Infinity
    let chosenBuilding = null

    for (const b of buildings) {
      const buildingCenter = new THREE.Vector3(b.x, b.height/2, b.z)
      // Vector from camera to building
      const toBuilding = buildingCenter.clone().sub(camPos)
      // Check if building is in front of camera
      const forwardDot = toBuilding.dot(forward)
      if (forwardDot <= 0) continue // behind or at camera, ignore

      // Distance perpendicular to forward line
      // Project toBuilding onto forward: proj = forward * (forwardDot)
      const proj = forward.clone().multiplyScalar(forwardDot)
      const perp = toBuilding.clone().sub(proj) // perpendicular vector
      const perpDist = perp.length()

      // If building is within radius and along the line
      if (perpDist < radius && forwardDot < closestDistAlong) {
        closestDistAlong = forwardDot
        chosenBuilding = b
      }
    }

    let end
    if (chosenBuilding) {
      setBuildings(prev => prev.filter(b => b.id !== chosenBuilding.id))
      end = new THREE.Vector3(chosenBuilding.x, chosenBuilding.height / 2, chosenBuilding.z)
    } else {
      // No building even in radius, just shoot beam forward
      end = camPos.clone().add(forward.clone().multiplyScalar(10))
    }
    showLaserBeam(camera, end, setLaser)
  }
}

function showLaserBeam(camera, endPoint, setLaser) {
  const start = camera.position.clone()
  setLaser({ start, end: endPoint.clone() })
  setTimeout(() => setLaser(null), 200)
}

// Global refs
let globalCamera = null
let globalScene = null
function getCurrentScene() {
  return { camera: globalCamera, scene: globalScene }
}

function GlobalRefs() {
  const { camera, scene } = useThree()
  useEffect(() => {
    globalCamera = camera
    globalScene = scene
  }, [camera, scene])
  return null
}
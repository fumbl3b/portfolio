"use client"
import ToyScene from './ToyScene'

export default function ToyPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h1 style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, color: 'white', padding: '10px' }}>
        Toy City
      </h1>
      <ToyScene />
    </div>
  )
}
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 800 }) {
  const points = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 200
      const y = (Math.random() - 0.5) * 200
      const z = (Math.random() - 0.5) * 200
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    points.current.rotation.y += 0.001
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.4}
      />
    </points>
  )
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0A0A0F]">
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  )
}

"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"

function Furnace() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.5, 3.5, 32, 1, true]} />
        <meshStandardMaterial
          color="#8b4513"
          metalness={0.6}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.0, 1.3, 3.6, 32]} />
        <meshStandardMaterial
          color="#1a0a00"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh ref={glowRef} position={[0, -0.5, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={2}
          transparent
          opacity={0.4}
        />
      </mesh>

      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        const x = Math.cos(angle) * 1.35
        const z = Math.sin(angle) * 1.35
        return (
          <mesh key={i} position={[x, 0.5, z]}>
            <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
            <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
          </mesh>
        )
      })}

      <RoboticArm />
      <HeatParticles />
    </group>
  )
}

function RoboticArm() {
  const armRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (armRef.current) {
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
      armRef.current.position.y = 2.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={armRef} position={[0, 2.2, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.15, 1.5, 0.15]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -1.0, 0]}>
        <coneGeometry args={[0.06, 0.3, 8]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

function HeatParticles() {
  const count = 200
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: Math.random() * 3 - 1.5,
      z: (Math.random() - 0.5) * 2,
      speed: 0.005 + Math.random() * 0.015,
      scale: 0.02 + Math.random() * 0.04,
    }))
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    particles.forEach((p, i) => {
      p.y += p.speed
      if (p.y > 2) p.y = -1.5
      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.setScalar(p.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#f97316"
        emissive="#f97316"
        emissiveIntensity={3}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  )
}

export default function FurnaceScene() {
  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-surface-400/30 bg-surface-100">
      <Canvas
        camera={{ position: [4, 3, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#0a0b0f"]} />
        <fog attach="fog" args={["#0a0b0f", 8, 20]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} color="#f97316" intensity={5} distance={10} />
        <pointLight position={[3, 5, 3]} color="#fff" intensity={0.5} />
        <spotLight position={[0, 6, 0]} angle={0.4} penumbra={1} color="#f97316" intensity={2} />
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <Furnace />
        </Float>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

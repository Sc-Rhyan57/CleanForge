"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const STAGES = [
  { name: "Detecção", color: "#ef4444", desc: "Sensor térmico IR mapeia incrustações", icon: "🔍" },
  { name: "Posicionamento", color: "#f59e0b", desc: "Braço robótico alinha com o canal", icon: "🤖" },
  { name: "Limpeza", color: "#3b82f6", desc: "Jato de ar comprimido a 3.5 bar", icon: "💨" },
  { name: "Verificação", color: "#22c55e", desc: "Sensor confirma remoção completa", icon: "✅" },
]

export default function CleaningSimulation() {
  const [stage, setStage] = useState(0)
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const crustsRef = useRef<{ x: number; y: number; rx: number; ry: number; rot: number; opacity: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    crustsRef.current = Array.from({ length: 18 }, () => ({
      x: 100 + Math.random() * (canvas.width - 220),
      y: 50 + Math.random() * (canvas.height - 100),
      rx: 8 + Math.random() * 18,
      ry: 4 + Math.random() * 10,
      rot: Math.random() * Math.PI,
      opacity: 0.5 + Math.random() * 0.5,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, "#1a0a00")
      grad.addColorStop(1, "#0a0a0a")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      ctx.strokeStyle = "#333"
      ctx.lineWidth = 2
      ctx.strokeRect(60, 30, w - 120, h - 60)
      ctx.fillStyle = "#1a1a1a"
      ctx.fillRect(60, 30, w - 120, h - 60)

      const wallGrad = ctx.createLinearGradient(60, 30, 60, h - 30)
      wallGrad.addColorStop(0, "#8b4513")
      wallGrad.addColorStop(0.5, "#a0522d")
      wallGrad.addColorStop(1, "#8b4513")
      ctx.fillStyle = wallGrad
      ctx.fillRect(60, 30, 20, h - 60)
      ctx.fillRect(w - 80, 30, 20, h - 60)

      const removedRatio = running && stage >= 2 ? progress / 100 : 0
      crustsRef.current.forEach(c => {
        const finalOpacity = c.opacity * Math.max(0, 1 - removedRatio)
        if (finalOpacity <= 0.01) return
        ctx.globalAlpha = finalOpacity
        ctx.fillStyle = `rgb(180, 120, 60)`
        ctx.beginPath()
        ctx.ellipse(c.x, c.y, c.rx, c.ry, c.rot, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1

      if (running && stage === 0) {
        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        const scanY = (progress / 100) * (h - 60) + 30
        for (let y = 30; y < scanY; y += 15) {
          ctx.beginPath()
          ctx.moveTo(80, y)
          ctx.lineTo(w - 80, y)
          ctx.stroke()
        }
        ctx.setLineDash([])

        ctx.fillStyle = "rgba(239, 68, 68, 0.08)"
        ctx.fillRect(60, 30, w - 120, scanY - 30)
      }

      if (running && (stage === 1 || stage === 2)) {
        const armX = 80 + (progress / 100) * (w - 180)
        ctx.fillStyle = "#555"
        ctx.fillRect(armX - 5, 10, 10, h * 0.35)
        ctx.fillStyle = "#888"
        ctx.beginPath()
        ctx.arc(armX, 10 + h * 0.35, 10, 0, Math.PI * 2)
        ctx.fill()

        if (stage === 2) {
          for (let i = 0; i < 8; i++) {
            const alpha = 0.2 + Math.random() * 0.5
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(armX, 10 + h * 0.35 + 10)
            ctx.lineTo(armX + (Math.random() - 0.5) * 60, 10 + h * 0.35 + 30 + Math.random() * 60)
            ctx.stroke()
          }
        }
      }

      if (running && stage === 3) {
        const scanY = (progress / 100) * (h - 60) + 30
        ctx.strokeStyle = "#22c55e"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(60, scanY)
        ctx.lineTo(w - 60, scanY)
        ctx.stroke()
        ctx.fillStyle = "rgba(34, 197, 94, 0.04)"
        ctx.fillRect(60, 30, w - 120, scanY - 30)
      }

      ctx.fillStyle = "#f59e0b"
      ctx.font = "bold 10px monospace"
      ctx.fillText("1100°C", w - 65, h - 8)
      const tempGrad = ctx.createLinearGradient(w - 40, h - 55, w - 40, h - 15)
      tempGrad.addColorStop(0, "#ef4444")
      tempGrad.addColorStop(0.5, "#f59e0b")
      tempGrad.addColorStop(1, "#22c55e")
      ctx.fillStyle = tempGrad
      ctx.fillRect(w - 42, h - 55, 5, 35)
    }

    draw()
    const interval = setInterval(draw, 80)
    return () => clearInterval(interval)
  }, [stage, progress, running])

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          if (stage < 3) {
            setStage(s => s + 1)
            return 0
          }
          setRunning(false)
          return 100
        }
        return p + 1.5
      })
    }, 50)
    return () => clearInterval(interval)
  }, [running, stage])

  const startSimulation = useCallback(() => {
    crustsRef.current = crustsRef.current.map(c => ({ ...c, opacity: 0.5 + Math.random() * 0.5 }))
    setStage(0)
    setProgress(0)
    setRunning(true)
  }, [])

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden border border-surface-400/30 glow-orange">
        <canvas ref={canvasRef} width={700} height={350} className="w-full h-auto" />
        <div className="absolute top-3 left-3 glass rounded-lg px-3 py-1.5 text-[10px] font-heading">
          <span className="text-gray-400">Simulação </span>
          <span className="text-brand-500 font-bold">Tempo Real</span>
        </div>
        {!running && stage === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/70 backdrop-blur-sm">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startSimulation}
              className="bg-brand-500 text-black font-heading font-bold px-8 py-3 rounded-xl text-sm glow-orange"
            >
              ▶ Iniciar Simulação
            </motion.button>
          </div>
        )}
        {!running && stage === 3 && progress === 100 && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/70 backdrop-blur-sm">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-3">
              <div className="text-5xl">✅</div>
              <p className="text-sm font-heading text-white">Limpeza Concluída com Sucesso</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startSimulation}
                className="bg-surface-300 text-white font-heading px-5 py-2 rounded-lg text-xs border border-surface-400"
              >
                ↻ Repetir Simulação
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {STAGES.map((s, i) => (
          <motion.div
            key={s.name}
            className={`rounded-lg p-3 text-center transition-all border ${
              i === stage && running
                ? "border-brand-500 bg-brand-500/10"
                : i < stage || (!running && stage === 3)
                ? "border-surface-400/50 bg-surface-200/50"
                : "border-surface-400/20 bg-surface-100/30"
            }`}
            animate={i === stage && running ? { scale: [1, 1.02, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-[10px] font-heading font-bold text-white truncate">{s.name}</div>
            <div className="text-[8px] text-gray-500 mt-0.5 line-clamp-2">{s.desc}</div>
            {i === stage && running && (
              <div className="mt-2 h-1 bg-surface-400 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: s.color, width: `${progress}%` }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

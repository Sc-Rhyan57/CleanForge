"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Activity, Thermometer, Wind, Gauge, AlertTriangle, CheckCircle2, Zap } from "lucide-react"

const generateData = () => ({
  temp1: 1050 + Math.random() * 100,
  temp2: 980 + Math.random() * 120,
  pressure: 3.2 + Math.random() * 0.6,
  flowRate: 85 + Math.random() * 15,
  armAngle: Math.floor(Math.random() * 120),
  progress: 0,
  status: "Operando" as string,
})

export default function ScadaDashboard() {
  const [data, setData] = useState(generateData)
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([
    "[14:23:01] Sistema inicializado",
    "[14:23:05] Sensores térmicos calibrados",
    "[14:23:08] Braço robótico em posição HOME",
  ])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const chartData = useRef<number[]>(Array(40).fill(1080))

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateData()
      setData(newData)
      chartData.current = [...chartData.current.slice(1), newData.temp1]
      setProgress(p => {
        const next = p + Math.random() * 3
        if (next >= 100) {
          setLogs(prev => [...prev.slice(-8), `[${new Date().toLocaleTimeString("pt-BR")}] Ciclo completo — canal limpo`])
          return 0
        }
        return next
      })
    }, 800)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    ctx.strokeStyle = "rgba(249,115,22,0.1)"
    ctx.lineWidth = 0.5
    for (let y = 0; y < h; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    const points = chartData.current
    const step = w / (points.length - 1)
    const min = 950
    const max = 1200

    const gradient = ctx.createLinearGradient(0, 0, 0, h)
    gradient.addColorStop(0, "rgba(249,115,22,0.3)")
    gradient.addColorStop(1, "rgba(249,115,22,0)")

    ctx.beginPath()
    ctx.moveTo(0, h)
    points.forEach((v, i) => {
      const x = i * step
      const y = h - ((v - min) / (max - min)) * h
      if (i === 0) ctx.lineTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.lineTo(w, h)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.beginPath()
    points.forEach((v, i) => {
      const x = i * step
      const y = h - ((v - min) / (max - min)) * h
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.strokeStyle = "#f97316"
    ctx.lineWidth = 2
    ctx.stroke()

    const lastY = h - ((points[points.length - 1] - min) / (max - min)) * h
    ctx.beginPath()
    ctx.arc(w, lastY, 4, 0, Math.PI * 2)
    ctx.fillStyle = "#f97316"
    ctx.fill()
    ctx.beginPath()
    ctx.arc(w, lastY, 8, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(249,115,22,0.3)"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [data])

  const gauges = [
    { icon: Thermometer, label: "Forno 4", value: `${data.temp1.toFixed(0)}°C`, color: "text-red-400", bg: "bg-red-500/10" },
    { icon: Thermometer, label: "Forno 5", value: `${data.temp2.toFixed(0)}°C`, color: "text-orange-400", bg: "bg-orange-500/10" },
    { icon: Gauge, label: "Pressão", value: `${data.pressure.toFixed(1)} bar`, color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: Wind, label: "Fluxo Ar", value: `${data.flowRate.toFixed(0)}%`, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ]

  return (
    <div className="bg-surface-100 rounded-lg overflow-hidden text-sm" style={{ minHeight: 420 }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-surface-400/50 bg-surface-200/50">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-500" />
          <span className="font-heading font-bold text-xs text-gray-300">SCADA — Painel de Controle</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
        </div>
      </div>

      <div className="p-3 space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {gauges.map((g, i) => (
            <motion.div
              key={i}
              className={`${g.bg} rounded-lg p-2.5 border border-surface-400/30`}
              animate={{ opacity: [0.8, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            >
              <g.icon className={`w-3.5 h-3.5 ${g.color} mb-1`} />
              <div className={`font-heading font-bold text-sm ${g.color}`}>{g.value}</div>
              <div className="text-[9px] text-gray-500 mt-0.5">{g.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-surface-200/50 rounded-lg p-3 border border-surface-400/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-gray-400 font-heading">TEMPERATURA EM TEMPO REAL</span>
            <span className="text-[10px] text-brand-400 font-mono">{data.temp1.toFixed(0)}°C</span>
          </div>
          <canvas ref={canvasRef} width={500} height={80} className="w-full h-auto rounded" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-surface-200/50 rounded-lg p-3 border border-surface-400/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-400 font-heading">PROGRESSO DE LIMPEZA</span>
              <span className="text-[10px] text-brand-400 font-mono">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-surface-400 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              {progress > 0 ? (
                <Zap className="w-3 h-3 text-brand-400" />
              ) : (
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              )}
              <span className="text-[9px] text-gray-500">
                {progress > 0 ? "Jato ativo — removendo incrustações" : "Aguardando próximo ciclo"}
              </span>
            </div>
          </div>

          <div className="bg-surface-200/50 rounded-lg p-3 border border-surface-400/30">
            <div className="flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-3 h-3 text-gray-500" />
              <span className="text-[10px] text-gray-400 font-heading">LOG DE OPERAÇÕES</span>
            </div>
            <div className="space-y-1 max-h-[72px] overflow-y-auto">
              {logs.slice(-5).map((log, i) => (
                <div key={i} className="text-[9px] font-mono text-gray-500 leading-tight">{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

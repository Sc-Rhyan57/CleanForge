"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const hotspots = [
  { id: "door", x: 15, y: 45, label: "Poken Door", desc: "300mm diâmetro, 470mm profundidade. Abertura com sistema automático.", color: "#f59e0b" },
  { id: "arm", x: 50, y: 28, label: "Braço Robótico", desc: "6 eixos, alcance 1-5m, rotação 120°. Posicionamento autônomo.", color: "#3b82f6" },
  { id: "sensor", x: 78, y: 18, label: "Sensor Térmico IR", desc: "Mapeamento infravermelho em tempo real. Precisão de 0.1°C.", color: "#22c55e" },
  { id: "crust", x: 55, y: 65, label: "Incrustação (CaO)", desc: "Finos de cal fundidos aderidos às paredes do canal.", color: "#ef4444" },
  { id: "wall", x: 28, y: 72, label: "Refratário", desc: "Revestimento cerâmico protegido — zero contato com água.", color: "#8b5cf6" },
]

export default function FurnaceDiagram() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <div className="relative aspect-[4/3] rounded-xl border border-surface-400/30 overflow-hidden bg-gradient-to-b from-surface-200 to-surface">
      <svg viewBox="0 0 400 300" className="w-full h-full">
        <defs>
          <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a0a00" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>
          <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b4513" />
            <stop offset="100%" stopColor="#a0522d" />
          </linearGradient>
          <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <rect x="80" y="40" width="240" height="220" rx="4" fill="url(#fg)" stroke="#333" strokeWidth="2" />
        <rect x="80" y="40" width="240" height="220" fill="url(#hg)" />
        <rect x="80" y="40" width="15" height="220" fill="url(#wg)" />
        <rect x="305" y="40" width="15" height="220" fill="url(#wg)" />
        <rect x="60" y="120" width="35" height="40" rx="4" fill="#333" stroke="#555" strokeWidth="1" />
        <circle cx="78" cy="140" r="8" fill="#1a1a1a" stroke="#666" strokeWidth="1" />
        <g>
          <line x1="200" y1="50" x2="200" y2="120" stroke="#555" strokeWidth="3" />
          <circle cx="200" cy="120" r="6" fill="#888" stroke="#999" strokeWidth="1" />
          <line x1="200" y1="126" x2="200" y2="180" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" opacity="0.5" />
        </g>
        {[
          { cx: 150, cy: 180, rx: 20, ry: 8 },
          { cx: 220, cy: 160, rx: 15, ry: 6 },
          { cx: 180, cy: 200, rx: 25, ry: 10 },
          { cx: 260, cy: 190, rx: 18, ry: 7 },
        ].map((c, i) => (
          <ellipse key={i} {...c} fill="#b47838" opacity={0.5 + i * 0.1} />
        ))}
        <rect x="300" y="50" width="8" height="8" rx="2" fill="#22c55e" opacity="0.8" />
        <line x1="304" y1="58" x2="200" y2="120" stroke="#22c55e" strokeWidth="0.5" strokeDasharray="3" opacity="0.3" />
        <text x="200" y="25" textAnchor="middle" fill="#444" fontSize="10" fontFamily="monospace">
          Corte Transversal — Canal do Forno
        </text>
      </svg>

      {hotspots.map(h => (
        <motion.button
          key={h.id}
          className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          onMouseEnter={() => setActive(h.id)}
          onMouseLeave={() => setActive(null)}
          whileHover={{ scale: 1.5 }}
        >
          <span
            className="block w-full h-full rounded-full animate-pulse"
            style={{ backgroundColor: h.color, boxShadow: `0 0 12px ${h.color}50` }}
          />
        </motion.button>
      ))}

      {active && (() => {
        const h = hotspots.find(h => h.id === active)!
        return (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute glass rounded-lg p-3 pointer-events-none z-10 max-w-[220px]"
            style={{ left: `${Math.min(h.x, 60)}%`, top: `${h.y + 8}%` }}
          >
            <div className="font-heading font-bold text-xs" style={{ color: h.color }}>{h.label}</div>
            <div className="text-[10px] text-gray-400 mt-1 leading-relaxed">{h.desc}</div>
          </motion.div>
        )
      })()}
    </div>
  )
}

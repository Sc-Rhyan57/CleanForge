"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Shield, Timer, DollarSign, Users, Zap, ThermometerSun, Wrench } from "lucide-react"

const manual = [
  { icon: ThermometerSun, label: "1100°C de exposição direta", severity: "critical" },
  { icon: Wrench, label: "Marreta 5kg + lança pressurizada", severity: "high" },
  { icon: Timer, label: "4 horas por ciclo completo", severity: "high" },
  { icon: Users, label: "4 operadores necessários", severity: "medium" },
  { icon: AlertTriangle, label: "Risco de lesão ergonômica", severity: "critical" },
  { icon: DollarSign, label: "Alto custo com EPIs especiais", severity: "medium" },
]

const automated = [
  { icon: Shield, label: "Zero exposição humana ao calor", benefit: "high" },
  { icon: Zap, label: "Jato de ar — sem contato hídrico", benefit: "high" },
  { icon: Timer, label: "45 minutos por ciclo", benefit: "high" },
  { icon: Users, label: "1 técnico supervisiona 4 fornos", benefit: "medium" },
  { icon: Shield, label: "Zero risco ergonômico", benefit: "high" },
  { icon: DollarSign, label: "ROI em 8 meses", benefit: "medium" },
]

export default function BeforeAfter() {
  const [view, setView] = useState<"manual" | "auto">("manual")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2 p-1 rounded-xl bg-surface-200/50 border border-surface-400/30 max-w-xs mx-auto">
        <button
          onClick={() => setView("manual")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-heading font-bold transition-all ${
            view === "manual" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "text-gray-500 hover:text-gray-300"
          }`}
        >
          ⚠ Manual
        </button>
        <button
          onClick={() => setView("auto")}
          className={`flex-1 py-2.5 rounded-lg text-xs font-heading font-bold transition-all ${
            view === "auto" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-gray-500 hover:text-gray-300"
          }`}
        >
          ✦ Automatizado
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 gap-3"
        >
          {(view === "manual" ? manual : automated).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: view === "manual" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                view === "manual"
                  ? "border-red-500/20 bg-red-500/5 hover:bg-red-500/10"
                  : "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10"
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${view === "manual" ? "text-red-400" : "text-emerald-400"}`} />
              <span className="text-sm text-gray-300">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

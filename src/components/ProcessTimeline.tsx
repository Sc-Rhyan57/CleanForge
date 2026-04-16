"use client"

import { motion } from "framer-motion"

const steps = [
  {
    num: "01",
    title: "Detecção Térmica",
    desc: "Sensores infravermelhos mapeiam as incrustações de CaO em tempo real, identificando zonas de acúmulo com precisão milimétrica.",
    tech: "Sensor IR • 0.1°C precisão",
    color: "#ef4444",
  },
  {
    num: "02",
    title: "Posicionamento Robótico",
    desc: "Braço articulado de 6 eixos se posiciona automaticamente no canal do poken door, com alcance de 1 a 5 metros de profundidade.",
    tech: "6 eixos • 120° angular",
    color: "#f59e0b",
  },
  {
    num: "03",
    title: "Limpeza por Ar Comprimido",
    desc: "Jato de ar pressurizado a 3.5 bar remove as incrustações sem utilizar água, preservando 100% do revestimento refratário.",
    tech: "3.5 bar • Zero água",
    color: "#3b82f6",
  },
  {
    num: "04",
    title: "Verificação e Validação",
    desc: "Segundo scan térmico confirma remoção completa. Dados enviados ao SCADA para registro e análise histórica.",
    tech: "Scan duplo • Log SCADA",
    color: "#22c55e",
  },
]

export default function ProcessTimeline() {
  return (
    <div className="relative space-y-0">
      <div className="absolute left-[23px] top-8 bottom-8 w-px bg-gradient-to-b from-red-500 via-blue-500 to-emerald-500 opacity-30" />
      {steps.map((step, i) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
          className="relative pl-16 py-6 group"
        >
          <div
            className="absolute left-3 top-8 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center text-[8px] font-bold font-heading bg-surface"
            style={{ borderColor: step.color, color: step.color }}
          >
            {step.num}
          </div>
          <div className="p-5 rounded-xl border border-surface-400/30 bg-surface-100/50 hover:bg-surface-200/50 hover:border-surface-400/60 transition-all">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading font-bold text-base" style={{ color: step.color }}>{step.title}</h3>
              <span className="text-[9px] font-mono text-gray-500 bg-surface-300/50 px-2 py-0.5 rounded">{step.tech}</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

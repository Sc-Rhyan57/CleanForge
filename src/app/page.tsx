"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import dynamic from "next/dynamic"
import AnimatedSection from "@/components/AnimatedSection"
import NumberCounter from "@/components/NumberCounter"
import ProcessTimeline from "@/components/ProcessTimeline"
import BeforeAfter from "@/components/BeforeAfter"
import MacbookFrame from "@/components/MacbookFrame"
import { ArrowDown, Flame, ShieldCheck, Clock, Factory, Cpu, Zap, Globe2, ChevronRight, AlertTriangle, Thermometer, Wind, Eye, RotateCcw, Layers } from "lucide-react"
import { useRef } from "react"

const GridLines = dynamic(() => import("@/components/GridLines"), { ssr: false })
const ParticleField = dynamic(() => import("@/components/ParticleField"), { ssr: false })
const FurnaceScene = dynamic(() => import("@/components/FurnaceScene"), { ssr: false, loading: () => <div className="w-full h-[500px] bg-surface-100 rounded-xl animate-pulse" /> })
const ScadaDashboard = dynamic(() => import("@/components/ScadaDashboard"), { ssr: false })
const CleaningSimulation = dynamic(() => import("@/components/CleaningSimulation"), { ssr: false })
const FurnaceDiagram = dynamic(() => import("@/components/FurnaceDiagram"), { ssr: false })
const GlobeVisualization = dynamic(() => import("@/components/GlobeVisualization"), { ssr: false })

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

function CanalSpecs() {
  return (
    <div className="relative rounded-2xl border border-surface-400/40 overflow-hidden bg-surface-100/60 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-surface-400/30 bg-surface-200/50">
        <Layers className="w-4 h-4 text-brand-500" />
        <span className="font-heading font-bold text-xs text-gray-300 uppercase tracking-widest">Especificações Técnicas — Forno MK4</span>
      </div>

      {/* Diagrama SVG do canal em corte */}
      <div className="p-6">
        <svg viewBox="0 0 480 320" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wallGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3b1a" />
              <stop offset="50%" stopColor="#a0522d" />
              <stop offset="100%" stopColor="#7c3b1a" />
            </linearGradient>
            <linearGradient id="innerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a0800" />
              <stop offset="60%" stopColor="#2a0e00" />
              <stop offset="100%" stopColor="#ff4400" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="heatGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6600" stopOpacity="0" />
              <stop offset="100%" stopColor="#ff4400" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="heatCore" cx="50%" cy="100%" r="60%">
              <stop offset="0%" stopColor="#ff6600" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="40" y="20" width="50" height="280" fill="url(#wallGrad)" rx="4" />
          <rect x="390" y="20" width="50" height="280" fill="url(#wallGrad)" rx="4" />

          {/* Refratário interno */}
          <rect x="90" y="20" width="20" height="280" fill="#5a3010" opacity="0.8" />
          <rect x="370" y="20" width="20" height="280" fill="#5a3010" opacity="0.8" />

          <rect x="110" y="20" width="260" height="280" fill="url(#innerGrad)" />
          <rect x="110" y="20" width="260" height="280" fill="url(#heatGrad)" />

          <ellipse cx="240" cy="300" rx="130" ry="40" fill="url(#heatCore)" />

          <rect x="195" y="200" width="30" height="100" fill="#4a2010" rx="3" />
          <rect x="255" y="200" width="30" height="100" fill="#4a2010" rx="3" />
          <rect x="180" y="195" width="60" height="12" fill="#5a2810" rx="2" />
          <rect x="240" y="195" width="60" height="12" fill="#5a2810" rx="2" />
          
          <ellipse cx="140" cy="120" rx="22" ry="10" fill="#c8834a" opacity="0.85" />
          <ellipse cx="145" cy="155" rx="18" ry="8" fill="#bf7840" opacity="0.7" />
          <ellipse cx="138" cy="185" rx="15" ry="7" fill="#d08850" opacity="0.9" />
          <ellipse cx="340" cy="110" rx="20" ry="9" fill="#c8834a" opacity="0.8" />
          <ellipse cx="345" cy="148" rx="16" ry="7" fill="#bf7840" opacity="0.75" />
          <ellipse cx="338" cy="178" rx="19" ry="8" fill="#d08850" opacity="0.85" />
          <ellipse cx="200" cy="195" rx="25" ry="7" fill="#c07840" opacity="0.7" />
          <ellipse cx="285" cy="190" rx="22" ry="6" fill="#c07840" opacity="0.65" />

          <rect x="30" y="138" width="120" height="8" fill="#555" rx="4" />
          <rect x="148" y="134" width="60" height="16" fill="#3b82f6" rx="3" filter="url(#glow)" />

          <line x1="208" y1="142" x2="340" y2="120" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.8" />
          <line x1="208" y1="142" x2="338" y2="155" stroke="#93c5fd" strokeWidth="1" strokeDasharray="5,5" opacity="0.6" />
          <line x1="208" y1="142" x2="200" y2="180" stroke="#bfdbfe" strokeWidth="1" strokeDasharray="4,6" opacity="0.4" />

          <rect x="20" y="128" width="28" height="30" fill="#888" rx="3" stroke="#aaa" strokeWidth="1" />
          <circle cx="34" cy="143" r="10" fill="#666" stroke="#999" strokeWidth="1.5" />
          <text x="9" y="118" fill="#f97316" fontSize="8" fontFamily="monospace" fontWeight="bold">Ø300mm</text>
          <line x1="20" y1="128" x2="20" y2="120" stroke="#f97316" strokeWidth="0.8" opacity="0.6" />
          <line x1="48" y1="128" x2="48" y2="120" stroke="#f97316" strokeWidth="0.8" opacity="0.6" />

          <line x1="460" y1="20" x2="460" y2="300" stroke="#444" strokeWidth="0.8" />
          <line x1="455" y1="20" x2="465" y2="20" stroke="#444" strokeWidth="0.8" />
          <line x1="455" y1="300" x2="465" y2="300" stroke="#444" strokeWidth="0.8" />
          <text x="465" y="165" fill="#888" fontSize="8" fontFamily="monospace">1–5m</text>
          <text x="462" y="175" fill="#888" fontSize="8" fontFamily="monospace">prof.</text>

          <path d="M 208 142 L 340 90 A 140 140 0 0 1 340 195 Z" fill="#f97316" opacity="0.06" />
          <path d="M 208 142 L 340 90" stroke="#f97316" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.4" />
          <path d="M 208 142 L 340 195" stroke="#f97316" strokeWidth="0.8" strokeDasharray="4,3" opacity="0.4" />
          <text x="310" y="132" fill="#f97316" fontSize="8" fontFamily="monospace" opacity="0.9">120°</text>

          <text x="180" y="260" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="bold" opacity="0.8">1100°C</text>
          <text x="178" y="272" fill="#888" fontSize="7" fontFamily="monospace">temperatura interna</text>

          <rect x="100" y="295" width="8" height="8" fill="#c8834a" rx="1" />
          <text x="112" y="303" fill="#888" fontSize="7" fontFamily="monospace">Incrustação CaO</text>
          <rect x="200" y="295" width="8" height="8" fill="#3b82f6" rx="1" />
          <text x="212" y="303" fill="#888" fontSize="7" fontFamily="monospace">Braço + Jato de Ar</text>
          <rect x="310" y="295" width="8" height="8" fill="#5a3010" rx="1" />
          <text x="322" y="303" fill="#888" fontSize="7" fontFamily="monospace">Refratário</text>
        </svg>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: "Diâmetro da Abertura", value: "300 mm", sub: "Poken in door", color: "text-brand-400" },
            { label: "Profundidade do Canal", value: "470 mm", sub: "Limitador de ângulo", color: "text-blue-400" },
            { label: "Alcance do Material", value: "1 – 5 m", sub: "Incrustação vertical", color: "text-red-400" },
          ].map((m, i) => (
            <div key={i} className="rounded-xl border border-surface-400/30 bg-surface-200/40 p-3 text-center">
              <div className={`font-heading font-bold text-lg ${m.color}`}>{m.value}</div>
              <div className="text-[10px] font-heading text-gray-300 mt-0.5">{m.label}</div>
              <div className="text-[9px] text-gray-500">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FornoPokensTable() {
  const fornos = [
    { name: "Forno 4", cubas: 2, pokensTotal: 36, porCuba: 18, freq: "2× por semana", status: "Crítico", cor: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
    { name: "Forno 5", cubas: 2, pokensTotal: 48, porCuba: 24, freq: "A cada 15 dias", status: "Ativo", cor: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  ]
  return (
    <div className="rounded-2xl border border-surface-400/40 overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-surface-400/30 bg-surface-200/50">
        <Factory className="w-4 h-4 text-brand-500" />
        <span className="font-heading font-bold text-xs text-gray-300 uppercase tracking-widest">Dados Operacionais — Fornos Verticais</span>
      </div>
      <div className="p-5 space-y-4">
        {fornos.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`rounded-xl border p-4 ${f.bg}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`font-heading font-bold text-base ${f.cor}`}>{f.name}</span>
              <span className={`text-[10px] font-heading font-bold px-2.5 py-1 rounded-full border ${f.bg}`}>{f.status}</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { l: "Cubas", v: f.cubas },
                { l: "Total de Portas", v: f.pokensTotal },
                { l: "Por Cuba", v: f.porCuba },
                { l: "Frequência", v: f.freq },
              ].map((d, j) => (
                <div key={j} className="text-center">
                  <div className={`font-heading font-bold text-lg ${f.cor}`}>{d.v}</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">{d.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="rounded-xl border border-brand-500/20 bg-brand-500/5 p-4 flex items-center justify-between">
          <div>
            <span className="font-heading font-bold text-sm text-brand-400">Total Geral</span>
            <p className="text-[10px] text-gray-500 mt-0.5">Ambos os fornos combinados</p>
          </div>
          <div className="text-right">
            <span className="font-heading font-bold text-2xl text-gradient">84</span>
            <p className="text-[10px] text-gray-500">poken in doors</p>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-[10px] text-gray-500 mb-2 font-heading">Distribuição visual — Poken Doors por forno</p>
          <div className="space-y-3">
            {[
              { label: "Forno 4", total: 36, color: "#ef4444" },
              { label: "Forno 5", total: 48, color: "#f97316" },
            ].map((f) => (
              <div key={f.label}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[9px] font-heading text-gray-400 w-14">{f.label}</span>
                  <div className="flex flex-wrap gap-1">
                    {Array.from({ length: f.total }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.015 }}
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: f.color, opacity: 0.7 + (i % 3) * 0.1 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RiscosErgonomicos() {
  const riscos = [
    {
      titulo: "Abertura da Tampa",
      icon: "🔨",
      peso: "20 kg",
      desc: "Tampa metálica resistente ao calor com sistema de cunha. Requer marreta de 5 kg e força manual com ambos os membros superiores.",
      nivel: 90,
      cor: "#ef4444",
    },
    {
      titulo: "Manipulação da Lança",
      icon: "💪",
      peso: "3,5 bar",
      desc: "Flexão e extensão de ombros com jato pressurizado. Manutenção de postura forçada com leve flexão anterior do tronco.",
      nivel: 80,
      cor: "#f97316",
    },
    {
      titulo: "Estresse Térmico",
      icon: "🌡️",
      peso: "1100°C",
      desc: "Canal a 1100°C a poucos centímetros do operador. EPI obrigatório: macacão JGB + luvas Korion + botas de cano longo.",
      nivel: 95,
      cor: "#dc2626",
    },
    {
      titulo: "Postura Cervical",
      icon: "🧍",
      peso: "Isométrica",
      desc: "Flexão cervical acentuada e contração isométrica prolongada da musculatura estabilizadora ao longo de toda a atividade.",
      nivel: 70,
      cor: "#f59e0b",
    },
  ]

  return (
    <div className="space-y-3">
      {riscos.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl border border-surface-400/30 bg-surface-100/50 p-4 hover:bg-surface-200/50 transition-all"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl mt-0.5">{r.icon}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-heading font-bold text-sm text-white">{r.titulo}</span>
                <span className="font-heading font-bold text-xs px-2 py-0.5 rounded" style={{ color: r.cor, backgroundColor: r.cor + "20" }}>{r.peso}</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-2">{r.desc}</p>
              {/* Barra de risco */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-gray-500 w-16">Nível risco</span>
                <div className="flex-1 h-1.5 bg-surface-400 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.nivel}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: r.cor }}
                  />
                </div>
                <span className="text-[9px] font-heading font-bold" style={{ color: r.cor }}>{r.nivel}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function IncrustaçãoDiagram() {
  return (
    <div className="rounded-2xl border border-surface-400/40 bg-surface-100/50 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-surface-400/30 bg-surface-200/50 flex items-center gap-3">
        <Eye className="w-4 h-4 text-brand-500" />
        <span className="font-heading font-bold text-xs text-gray-300 uppercase tracking-widest">Como se forma a incrustação</span>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            {
              step: "01",
              formula: "CaCO₃",
              nome: "Calcário",
              desc: "Matéria-prima entra no topo do forno vertical",
              icon: "⛰️",
              cor: "#94a3b8",
            },
            {
              step: "02",
              formula: "→ CaO + CO₂",
              nome: "Descarbonatação",
              desc: "A 900°C+ ocorre a decomposição térmica. Finos se desprendem.",
              icon: "🔥",
              cor: "#f97316",
            },
            {
              step: "03",
              formula: "CaO fundido",
              nome: "Incrustação",
              desc: "Finos de cal fundem e depositam nas paredes do canal entre as cubas",
              icon: "🟫",
              cor: "#d97706",
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-xl border border-surface-400/30 bg-surface-200/40 p-3 text-center"
            >
              {i < 2 && (
                <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-brand-500/60 font-bold text-lg">→</div>
              )}
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-mono text-xs font-bold mb-1" style={{ color: s.cor }}>{s.formula}</div>
              <div className="font-heading font-bold text-[11px] text-white mb-1">{s.nome}</div>
              <p className="text-[10px] text-gray-500 leading-snug">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 flex gap-3 items-start">
          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-heading font-bold text-amber-400 mb-0.5">Restrição Crítica</p>
            <p className="text-[10px] text-gray-400 leading-relaxed">O refratário interno do canal <strong className="text-white">não pode ter contato direto com água</strong>. A solução deve usar exclusivamente jato de ar comprimido para deslocar as incrustações sem danificar o revestimento cerâmico.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SolucaoTecnica() {
  const componentes = [
    {
      num: "A",
      titulo: "Sistema de Abertura Automática",
      desc: "Atuador pneumático substitui a marreta de 5 kg. Remove e reposiciona a tampa de 20 kg com sistema de cunha de forma segura e repetível.",
      specs: ["Força: 200 N·m", "Tempo: < 15s", "Zero intervenção humana"],
      cor: "#f59e0b",
      icon: "🔩",
    },
    {
      num: "B",
      titulo: "Braço Robótico 6 Eixos",
      desc: "Braço articulado posicionado na plataforma. Insere a lança de inox ½\" pelo poken door com controle de profundidade de 1 a 5 m e variação angular de 120°.",
      specs: ["Alcance: 1–5 m", "Ângulo: 120°", "Posicionamento: ±2 mm"],
      cor: "#3b82f6",
      icon: "🤖",
    },
    {
      num: "C",
      titulo: "Jato de Ar Comprimido",
      desc: "Substitui completamente a água pressurizada. Pressão de 3,5 bar aplicada diretamente sobre as incrustações de CaO sem contato com o refratário.",
      specs: ["Pressão: 3,5 bar", "Sem água", "100% seguro ao refratário"],
      cor: "#06b6d4",
      icon: "💨",
    },
    {
      num: "D",
      titulo: "Sensores Térmicos IR",
      desc: "Câmera infravermelha mapeia em tempo real as regiões com incrustação antes e após a limpeza, validando a remoção completa acima das colunas.",
      specs: ["Precisão: 0,1°C", "Mapeamento em tempo real", "Validação automática"],
      cor: "#22c55e",
      icon: "📡",
    },
    {
      num: "E",
      titulo: "Integração SCADA",
      desc: "Painel de controle centralizado com registro histórico, agendamento automático por forno, alertas e análise preditiva de acúmulo.",
      specs: ["Dashboard em tempo real", "Registro histórico", "Agendamento automático"],
      cor: "#8b5cf6",
      icon: "🖥️",
    },
  ]

  return (
    <div className="space-y-3">
      {componentes.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="flex gap-4 p-4 rounded-xl border border-surface-400/30 bg-surface-100/50 hover:bg-surface-200/50 transition-all group"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 font-heading font-bold border"
            style={{ backgroundColor: c.cor + "15", borderColor: c.cor + "40", color: c.cor }}
          >
            {c.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[9px] font-heading font-bold px-1.5 py-0.5 rounded" style={{ color: c.cor, backgroundColor: c.cor + "20" }}>MOD. {c.num}</span>
              <span className="font-heading font-bold text-sm text-white">{c.titulo}</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed mb-2">{c.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {c.specs.map((s, j) => (
                <span key={j} className="text-[9px] font-mono bg-surface-300/50 border border-surface-400/30 px-2 py-0.5 rounded text-gray-400">{s}</span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function ROISection() {
  const metricas = [
    { antes: "~4 horas", depois: "~45 min", label: "Tempo por ciclo completo", reducao: "81%" },
    { antes: "4 operadores", depois: "1 técnico", label: "Pessoal por operação", reducao: "75%" },
    { antes: "2× / semana", depois: "Autônomo", label: "Forno 4 — frequência", reducao: "—" },
    { antes: "Alta exposição", depois: "Zero", label: "Risco térmico e ergonômico", reducao: "100%" },
  ]

  return (
    <div className="rounded-2xl border border-surface-400/40 bg-surface-100/50 overflow-hidden">
      <div className="px-5 py-3.5 border-b border-surface-400/30 bg-surface-200/50 flex items-center gap-3">
        <Zap className="w-4 h-4 text-brand-500" />
        <span className="font-heading font-bold text-xs text-gray-300 uppercase tracking-widest">Antes × Depois — Comparativo Real</span>
      </div>
      <div className="p-5 space-y-3">
        {metricas.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl overflow-hidden border border-surface-400/20"
          >
            <div className="px-3 py-1.5 bg-surface-300/40 border-b border-surface-400/20">
              <span className="text-[10px] text-gray-400 font-heading">{m.label}</span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-surface-400/20">
              <div className="px-3 py-2.5 text-center bg-red-500/5">
                <div className="text-[9px] text-red-400/70 font-heading mb-0.5">ANTES</div>
                <div className="font-heading font-bold text-sm text-red-300">{m.antes}</div>
              </div>
              <div className="px-3 py-2.5 text-center bg-brand-500/10">
                <div className="text-[9px] text-brand-400/70 font-heading mb-0.5">REDUÇÃO</div>
                <div className="font-heading font-bold text-sm text-brand-400">{m.reducao}</div>
              </div>
              <div className="px-3 py-2.5 text-center bg-emerald-500/5">
                <div className="text-[9px] text-emerald-400/70 font-heading mb-0.5">DEPOIS</div>
                <div className="font-heading font-bold text-sm text-emerald-300">{m.depois}</div>
              </div>
            </div>
          </motion.div>
        ))}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-brand-500/10 to-amber-500/10 border border-brand-500/20 flex items-center justify-between">
          <div>
            <p className="font-heading font-bold text-sm text-white">Retorno do Investimento</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Baseado em redução de mão de obra + EPI + afastamentos</p>
          </div>
          <div className="text-right">
            <div className="font-heading font-bold text-3xl text-gradient">8</div>
            <div className="text-[10px] text-gray-400">meses</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const heroWords = ["Limpeza", "de", "Fornos", "100%", "Automatizada"]
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <div className="relative min-h-screen bg-surface overflow-x-hidden noise-overlay">
      <ParticleField />
      <GridLines />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <Flame className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-white">CleanForge</span>
              <span className="text-[9px] text-gray-500 block -mt-0.5">by Lhoist — Matozinhos</span>
            </div>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-xs text-gray-400 font-heading">
            {[
              { label: "Problema", id: "problema" },
              { label: "Dados Técnicos", id: "dados" },
              { label: "Solução", id: "solucao" },
              { label: "Simulação", id: "simulacao" },
              { label: "Resultados", id: "resultados" },
            ].map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="hover:text-brand-400 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <span className="text-[10px] text-gray-500 hidden sm:block font-mono">Hackathon 2025</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </motion.div>
        </div>
      </nav>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 pb-24 px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-brand-500/8 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-[120px]" />
        </div>
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-500/20 bg-brand-500/5"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-xs font-heading text-brand-400 tracking-wide">Hackathon Lhoist 2025 — Matozinhos, MG</span>
          </motion.div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight">
            {heroWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className={`inline-block mr-3 ${i >= 3 ? "text-gradient" : "text-white"}`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-body"
          >
            Operadores expostos a <span className="text-brand-400 font-semibold">1100°C</span>, marreta de 5 kg e sobrecarga ergonômica severa.
            O <span className="text-white font-semibold">CleanForge</span> automatiza a limpeza dos canais dos fornos verticais — sem água, sem risco, sem esforço humano.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#simulacao">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(249,115,22,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-brand-500 to-brand-600 text-black font-heading font-bold px-10 py-4 rounded-xl text-sm flex items-center gap-2"
              >
                Ver Simulação ao Vivo <ChevronRight className="w-4 h-4" />
              </motion.button>
            </a>
            <a href="#dados">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-surface-400 bg-surface-200/50 text-white font-heading font-medium px-10 py-4 rounded-xl text-sm hover:bg-surface-300/50 transition-colors flex items-center gap-2"
              >
                Dados Técnicos <Layers className="w-4 h-4 text-brand-400" />
              </motion.button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="grid grid-cols-4 gap-6 max-w-xl mx-auto pt-10"
          >
            {[
              { icon: Flame, val: "1100°C", label: "Temp. Interna" },
              { icon: Factory, val: "84", label: "Poken Doors" },
              { icon: ShieldCheck, val: "Zero", label: "Risco Humano" },
              { icon: Clock, val: "8 meses", label: "ROI" },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <s.icon className="w-5 h-5 text-brand-500/60 mx-auto mb-2 group-hover:text-brand-400 transition-colors" />
                <div className="font-heading font-bold text-xl text-gradient">{s.val}</div>
                <div className="text-[10px] text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 }}>
            <ArrowDown className="w-5 h-5 text-gray-500" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <MacbookFrame>
              <ScadaDashboard />
            </MacbookFrame>
          </AnimatedSection>
        </div>
      </section>

      {/* ── O PROBLEMA ── */}
      <section id="problema" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">O Problema</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Condições <span className="text-gradient">Extremas de Trabalho</span>
              </h2>
              <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
                A limpeza dos canais entre as cubas dos fornos verticais de fluxo paralelo regenerativo expõe os operadores a uma combinação perigosa de calor extremo, esforço físico intenso e posturas forçadas — de duas a quatro vezes por semana.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-10 mb-12">
            <AnimatedSection delay={0.1}>
              <FurnaceDiagram />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <RiscosErgonomicos />
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2}>
            <IncrustaçãoDiagram />
          </AnimatedSection>
        </div>
      </section>

      <section id="dados" className="py-24 px-6 bg-surface-100/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">Dados Técnicos</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Estrutura dos <span className="text-gradient">Fornos MK4</span>
              </h2>
              <p className="text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
                Fornos verticais de fluxo paralelo regenerativo com duas cubas interligadas por canal central — o alvo da limpeza.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <AnimatedSection delay={0.1}>
              <CanalSpecs />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <FornoPokensTable />
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.6}>
            <div className="rounded-2xl border border-surface-400/30 bg-surface-100/50 p-6">
              <h3 className="font-heading font-bold text-base text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Restrições Operacionais que Guiam a Solução
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { icon: "🚫", titulo: "Sem água no refratário", desc: "O choque térmico entre água e o refratário a 1100°C pode causar danos irreversíveis ao revestimento interno." },
                  { icon: "📐", titulo: "Acesso limitado", desc: "A plataforma com as poken doors é acessada por escada metálica com espaço restrito — impossibilita equipamentos grandes." },
                  { icon: "✅", titulo: "Remoção total obrigatória", desc: "As incrustações acima das colunas e no fosso central devem ser 100% removidas para garantir eficiência do forno." },
                ].map((r, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl bg-surface-200/40 border border-surface-400/20">
                    <span className="text-xl">{r.icon}</span>
                    <div>
                      <p className="font-heading font-bold text-xs text-white mb-1">{r.titulo}</p>
                      <p className="text-[10px] text-gray-400 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">Comparação</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Manual vs <span className="text-gradient">Automatizado</span>
              </h2>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <BeforeAfter />
          </AnimatedSection>
        </div>
      </section>

      <section id="solucao" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">A Solução</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Sistema <span className="text-gradient">CleanForge</span>
              </h2>
              <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
                Cinco módulos integrados que eliminam completamente a presença humana durante a operação de limpeza, respeitando todas as restrições do processo.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-10">
            <AnimatedSection delay={0.3}>
              <SolucaoTecnica />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <div className="max-w-xl">
                  <ProcessTimeline />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="simulacao" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">Demonstração</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Simulação <span className="text-gradient">Interativa</span>
              </h2>
              <p className="text-gray-400 mt-5 max-w-xl mx-auto">
                Veja o sistema operando em tempo real — clique para iniciar o ciclo completo de limpeza automatizada.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-8">
            <AnimatedSection delay={0.1}>
              <CleaningSimulation />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <MacbookFrame>
                <ScadaDashboard />
              </MacbookFrame>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section id="3d" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">Visualização</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Modelo <span className="text-gradient">3D do Forno</span>
              </h2>
              <p className="text-gray-400 mt-5 max-w-xl mx-auto">
                Visualização interativa do forno com braço robótico, partículas de calor e sensores. Arraste para rotacionar.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <FurnaceScene />
          </AnimatedSection>
        </div>
      </section>
      
      <section id="resultados" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">Resultados</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Impacto <span className="text-gradient">Mensurável</span>
              </h2>
              <p className="text-gray-400 mt-5 max-w-xl mx-auto">
                Números baseados nos dados reais de operação dos Fornos 4 e 5 da unidade de Matozinhos.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
            <NumberCounter end={100} suffix="%" label="Redução de Risco" sublabel="Exposição térmica zero" />
            <NumberCounter end={81} suffix="%" label="Mais Rápido" sublabel="4h → 45 min por ciclo" duration={1.8} />
            <NumberCounter end={75} suffix="%" label="Menos Pessoal" sublabel="4 operadores → 1 técnico" duration={1.5} />
            <NumberCounter end={8} suffix=" meses" label="ROI" sublabel="Retorno do investimento" duration={1} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            <AnimatedSection delay={0.1}>
              <ROISection />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                <div className="rounded-2xl border border-surface-400/40 bg-surface-100/50 overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-surface-400/30 bg-surface-200/50 flex items-center gap-3">
                    <RotateCcw className="w-4 h-4 text-brand-500" />
                    <span className="font-heading font-bold text-xs text-gray-300 uppercase tracking-widest">Replicabilidade</span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">
                      O CleanForge foi projetado para ser replicável em <strong className="text-white">todos os fornos verticais de fluxo paralelo regenerativo</strong> da planta — não apenas os Fornos 4 e 5.
                    </p>
                    <div className="space-y-2">
                      {[
                        "Módulo compacto para acesso por escada",
                        "Adaptável a diferentes diâmetros de poken door",
                        "Configuração por software para cada forno",
                        "Operação remota — 1 técnico por turno",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-[11px] text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Factory, title: "Replicável", desc: "Todos os fornos verticais da planta." },
                    { icon: Cpu, title: "SCADA", desc: "Integração e histórico em tempo real." },
                    { icon: Clock, title: "24/7", desc: "Ciclos autônomos fora do horário." },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4, borderColor: "rgba(249,115,22,0.3)" }}
                      className="p-4 rounded-xl border border-surface-400/30 bg-surface-100/50 transition-all text-center"
                    >
                      <item.icon className="w-6 h-6 text-brand-500/70 mx-auto mb-2" />
                      <h3 className="font-heading font-bold text-xs text-white">{item.title}</h3>
                      <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-10">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">Presença Global</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Lhoist no <span className="text-gradient">Mundo</span>
              </h2>
              <p className="text-gray-400 mt-4 max-w-lg mx-auto text-sm">
                Mais de 130 anos de história. A solução desenvolvida em Matozinhos tem potencial para impactar operações em todo o grupo global.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection delay={0.1}>
              <GlobeVisualization />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Forno 4 — MK4", specs: "36 poken doors (18/cuba) — 2× por semana" },
                    { label: "Forno 5 — MK5", specs: "48 poken doors (24/cuba) — a cada 15 dias" },
                    { label: "Condições extremas", specs: "1100°C interno, ângulo 120°, CaO fundido" },
                    { label: "Restrição de projeto", specs: "Sem água, preservar refratário, acesso por escada" },
                  ].map((block, i) => (
                    <div key={i} className="p-4 rounded-xl border border-surface-400/30 bg-surface-100/50">
                      <div className="font-heading font-bold text-xs text-brand-400 mb-1.5">{block.label}</div>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{block.specs}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl border border-brand-500/20 bg-brand-500/5">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="text-brand-400 font-heading font-bold">Brasil:</span> presente há 21 anos nos estados de Minas Gerais, Goiás, Espírito Santo e Rio de Janeiro. A unidade de Matozinhos é referência para adoção de inovações no grupo.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-500/5 via-transparent to-transparent" />
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            <h2 className="font-heading text-4xl md:text-6xl font-bold">
              Pronto para <span className="text-gradient">Eliminar o Risco?</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              CleanForge transforma a limpeza de fornos em um processo seguro, eficiente e totalmente replicável — sem nenhum operador exposto ao calor.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <a
                href="https://cleanforge-chi.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500 to-brand-600 text-black font-heading font-bold px-12 py-5 rounded-xl text-base glow-orange"
              >
                Conhecer o Projeto Completo <ChevronRight className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </AnimatedSection>
      </section>

      <footer className="border-t border-surface-400/20 py-10 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <Flame className="w-4 h-4 text-black" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-white">CleanForge</span>
              <span className="text-[9px] text-gray-500 block">Automação Industrial — Lhoist Brasil</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 font-mono">Hackathon Lhoist 2025 • Matozinhos, MG</p>
            <p className="text-[10px] text-gray-600 mt-0.5">Forno 4 (36 poken doors) + Forno 5 (48 poken doors)</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-600">CaCO₃ → CaO + CO₂</p>
            <p className="text-[10px] text-gray-600 mt-0.5">Sem água • Sem risco • Sem parada</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

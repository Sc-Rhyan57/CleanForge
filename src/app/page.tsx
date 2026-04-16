"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import AnimatedSection from "@/components/AnimatedSection"
import NumberCounter from "@/components/NumberCounter"
import ProcessTimeline from "@/components/ProcessTimeline"
import BeforeAfter from "@/components/BeforeAfter"
import MacbookFrame from "@/components/MacbookFrame"
import { ArrowDown, Flame, ShieldCheck, Clock, Factory, Cpu, Zap, Globe2, ChevronRight } from "lucide-react"

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

export default function Home() {
  const heroWords = ["Limpeza", "de", "Fornos", "100%", "Automatizada"]

  return (
    <div className="relative min-h-screen bg-surface overflow-x-hidden noise-overlay">
      <ParticleField />
      <GridLines />

      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <Flame className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-white">CleanForge</span>
              <span className="text-[9px] text-gray-500 block -mt-0.5">by Lhoist</span>
            </div>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-xs text-gray-400 font-heading">
            {["Problema", "Solução", "Simulação", "3D", "Métricas"].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="hover:text-brand-400 transition-colors relative group"
              >
                {item}
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

      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-24 px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-brand-500/8 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
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
            Eliminamos a exposição humana a <span className="text-brand-400 font-semibold">1100°C</span>. Sistema robótico inteligente
            para limpeza de canais em fornos verticais — sem água, sem risco, sem esforço.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#simulação">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(249,115,22,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-brand-500 to-brand-600 text-black font-heading font-bold px-10 py-4 rounded-xl text-sm flex items-center gap-2"
              >
                Ver Simulação ao Vivo <ChevronRight className="w-4 h-4" />
              </motion.button>
            </a>
            <a href="#3d">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-surface-400 bg-surface-200/50 text-white font-heading font-medium px-10 py-4 rounded-xl text-sm hover:bg-surface-300/50 transition-colors flex items-center gap-2"
              >
                Visualização 3D <Globe2 className="w-4 h-4 text-brand-400" />
              </motion.button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto pt-10"
          >
            {[
              { icon: Flame, val: "1100°C", label: "Temperatura Interna" },
              { icon: Factory, val: "84", label: "Poken Doors" },
              { icon: ShieldCheck, val: "Zero", label: "Risco Humano" },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <s.icon className="w-5 h-5 text-brand-500/60 mx-auto mb-2 group-hover:text-brand-400 transition-colors" />
                <div className="font-heading font-bold text-2xl text-gradient">{s.val}</div>
                <div className="text-[10px] text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

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

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <MacbookFrame>
              <ScadaDashboard />
            </MacbookFrame>
          </AnimatedSection>
        </div>
      </section>

      <section id="problema" className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">O Problema</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Condições <span className="text-gradient">Extremas</span>
              </h2>
              <p className="text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
                Operadores expostos a temperaturas de 1100°C, marretas de 5kg, sobrecarga ergonômica severa.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-10">
            <AnimatedSection delay={0.1}>
              <FurnaceDiagram />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                {[
                  { icon: Flame, title: "Estresse Térmico", desc: "Operador a poucos centímetros de canais a 1100°C com macacão JGB, luvas Korion e botas de cano longo.", stat: "1100°C", color: "text-red-400" },
                  { icon: Zap, title: "Sobrecarga Física", desc: "Marreta de 5kg + lança pressurizada (3.5 bar). Flexão repetida de tronco e membros superiores.", stat: "5kg", color: "text-orange-400" },
                  { icon: Clock, title: "Baixa Eficiência", desc: "Forno 4: 36 portas, 2x/semana. Forno 5: 48 portas, a cada 15 dias. Tampa de 20kg.", stat: "84 portas", color: "text-blue-400" },
                  { icon: ShieldCheck, title: "Risco Ocupacional", desc: "Flexão cervical, contração isométrica prolongada, movimentos repetitivos em calor extremo.", stat: "Alto", color: "text-purple-400" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4 p-5 rounded-xl border border-surface-400/30 bg-surface-100/50 hover:bg-surface-200/50 transition-all group cursor-default"
                  >
                    <item.icon className={`w-6 h-6 flex-shrink-0 ${item.color} mt-0.5`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-sm text-white">{item.title}</span>
                        <span className="text-xs font-heading font-bold text-brand-400">{item.stat}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
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
          <AnimatedSection delay={0.1}>
            <BeforeAfter />
          </AnimatedSection>
        </div>
      </section>

      <section id="solução" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/[0.02] to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">A Solução</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Processo em <span className="text-gradient">4 Etapas</span>
              </h2>
              <p className="text-gray-400 mt-5 max-w-xl mx-auto leading-relaxed">
                Sistema robótico com sensores térmicos IR, braço de 6 eixos e jato de ar comprimido.
              </p>
            </div>
          </AnimatedSection>
          <div className="max-w-2xl mx-auto">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <section id="simulação" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">Demonstração</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Simulação <span className="text-gradient">Interativa</span>
              </h2>
              <p className="text-gray-400 mt-5 max-w-xl mx-auto">
                Veja o sistema operando em tempo real — clique para iniciar o ciclo completo.
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
                Visualização interativa do forno com braço robótico, partículas de calor e sensores.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <FurnaceScene />
          </AnimatedSection>
        </div>
      </section>

      <section id="métricas" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-xs font-heading font-bold text-brand-500 uppercase tracking-[0.2em]">Resultados</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4">
                Impacto <span className="text-gradient">Mensurável</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <NumberCounter end={100} suffix="%" label="Redução de Risco" sublabel="Exposição térmica zero" />
            <NumberCounter end={80} suffix="%" label="Mais Produtividade" sublabel="De 4h para 45min" duration={1.8} />
            <NumberCounter end={75} suffix="%" label="Menos Custo" sublabel="1 técnico / 4 fornos" duration={1.5} />
            <NumberCounter end={8} suffix=" meses" label="ROI" sublabel="Retorno do investimento" duration={1} />
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-16 grid md:grid-cols-3 gap-5">
              {[
                { icon: Factory, title: "Replicabilidade", desc: "Adaptável a todos os fornos verticais tipo fluxo paralelo regenerativo da planta." },
                { icon: Cpu, title: "Integração SCADA", desc: "Dados em tempo real com registro histórico, análise preditiva e agendamento." },
                { icon: Clock, title: "Operação 24/7", desc: "Sistema autônomo permite limpeza fora do horário comercial, sem paradas." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6, borderColor: "rgba(249,115,22,0.3)" }}
                  className="p-6 rounded-xl border border-surface-400/30 bg-surface-100/50 transition-all"
                >
                  <item.icon className="w-8 h-8 text-brand-500/70 mb-4" />
                  <h3 className="font-heading font-bold text-base text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
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
            </div>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection delay={0.1}>
              <GlobeVisualization />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Forno 4", specs: "36 poken doors (18/cuba) — 2x/semana" },
                    { label: "Forno 5", specs: "48 poken doors (24/cuba) — a cada 15 dias" },
                    { label: "Condições", specs: "1100°C interno, ângulo 120°, CaO fundido" },
                    { label: "Restrições", specs: "Sem água, preservar refratário, acesso por escada" },
                  ].map((block, i) => (
                    <div key={i} className="p-4 rounded-xl border border-surface-400/30 bg-surface-100/50">
                      <div className="font-heading font-bold text-xs text-brand-400 mb-2">{block.label}</div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{block.specs}</p>
                    </div>
                  ))}
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
              CleanForge transforma a limpeza de fornos em um processo seguro, eficiente e replicável.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <a
                href="https://hackathon.deco.page"
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
              <span className="text-[9px] text-gray-500 block">Automação Industrial</span>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-mono">Hackathon Lhoist 2025 • Matozinhos, MG</span>
        </div>
      </footer>
    </div>
  )
}

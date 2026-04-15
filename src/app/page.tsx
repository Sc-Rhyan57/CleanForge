"use client";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  ThermometerSun,
  Bot,
  ArrowRight,
  Factory,
  Gauge,
  Clock,
  Users,
  Repeat,
  Target,
  ChevronDown,
} from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import DotPattern from "@/components/magicui/dot-pattern";
import NumberTicker from "@/components/magicui/number-ticker";
import { MacbookComponent } from "@/components/ui/macbook";
import WordFadeIn from "@/components/ui/word-fade-in";
import { Highlight } from "@/components/ui/hero-highlight";
import Globe from "@/components/globe";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const metrics = [
  { icon: Clock, value: 75, suffix: "%", label: "Redução no tempo de execução" },
  { icon: Shield, value: 100, suffix: "%", label: "Eliminação de exposição térmica" },
  { icon: Gauge, value: 3, suffix: "x", label: "Aumento de produtividade" },
  { icon: Repeat, value: 100, suffix: "%", label: "Replicável em todos os fornos" },
];

const steps = [
  {
    icon: Bot,
    title: "Posicionamento Autônomo",
    description:
      "O braço robótico se alinha automaticamente ao poken in door utilizando sensores de proximidade e visão computacional.",
  },
  {
    icon: Zap,
    title: "Limpeza Inteligente",
    description:
      "Jato de ar comprimido a alta pressão remove o material incrustado com variação angular de 120° e profundidade de até 5m.",
  },
  {
    icon: ThermometerSun,
    title: "Monitoramento Térmico",
    description:
      "Sensores infravermelhos monitoram a temperatura em tempo real, protegendo o refratário e garantindo eficiência.",
  },
  {
    icon: Target,
    title: "Abertura Automatizada",
    description:
      "Sistema pneumático remove as tampas metálicas de 20kg sem esforço humano, eliminando o uso de marretas.",
  },
];

const faqItems = [
  {
    q: "O sistema pode danificar o refratário?",
    a: "Não. O CleanForge utiliza jato de ar comprimido calibrado com sensores de pressão que garantem a remoção do material sem contato direto com água ou impacto mecânico no refratário.",
  },
  {
    q: "Funciona nos Fornos 4 e 5 de Matozinhos?",
    a: "Sim. O sistema é dimensionado para operar em todos os poken in doors (36 no Forno 4 e 48 no Forno 5), com adaptação automática ao layout de cada cuba.",
  },
  {
    q: "Como o equipamento é transportado até a plataforma?",
    a: "O robô é compacto e modular, projetado para ser deslocado por escadas metálicas e espaços limitados. O sistema de trilhos permite fixação permanente na plataforma.",
  },
  {
    q: "Qual a frequência de manutenção do robô?",
    a: "Manutenção preventiva trimestral. Componentes expostos ao calor possuem blindagem cerâmica com vida útil de 12 meses.",
  },
  {
    q: "É necessário um operador durante a limpeza?",
    a: "O sistema opera de forma autônoma após a programação da rotina. Um operador monitora remotamente via painel de controle, sem exposição ao ambiente do forno.",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-x-hidden relative">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] -z-50"
        )}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <BlurFade delay={0.1}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-amber-500 flex items-center justify-center">
                <Factory className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                CleanForge
              </span>
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
              <a href="#solucao" className="hover:text-white transition-colors">Solução</a>
              <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
              <a href="#metricas" className="hover:text-white transition-colors">Métricas</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>
          </BlurFade>
          <BlurFade delay={0.3}>
            <a
              href="#contato"
              className="px-4 py-2 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
            >
              Fale Conosco
            </a>
          </BlurFade>
        </div>
      </nav>

      <div className="overflow-hidden w-full">
        <MacbookComponent
          title={
            <div className="flex flex-col items-center justify-center px-4 mt-16">
              <BlurFade delay={0.2}>
                <div className="flex mb-4">
                  <div className="group rounded-full border border-brand-500/20 bg-brand-500/10 text-base transition-all ease-in hover:bg-brand-500/20 shadow-lg">
                    <span className="inline-flex items-center justify-center px-4 py-1.5 text-sm text-brand-300">
                      <Zap className="mr-2 w-4 h-4" />
                      Hackathon Lhoist 2025
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </span>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.3}>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-center bg-gradient-to-br from-white via-white to-neutral-500 bg-clip-text text-transparent mb-4 leading-tight">
                  CleanForge
                </h1>
              </BlurFade>

              <BlurFade delay={0.4}>
                <p className="text-xl sm:text-2xl md:text-3xl text-neutral-400 font-medium text-center max-w-2xl">
                  Limpeza autônoma de fornos industriais.{" "}
                  <span className="text-white">Zero risco humano.</span>
                </p>
              </BlurFade>

              <BlurFade delay={0.5}>
                <div className="flex flex-row items-center justify-center mt-8 gap-3">
                  <a
                    href="#solucao"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    Ver Solução
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#como-funciona"
                    className="px-6 py-3 rounded-xl border border-neutral-700 text-neutral-300 font-medium hover:bg-surface-100 transition-colors"
                  >
                    Como Funciona
                  </a>
                </div>
              </BlurFade>
            </div>
          }
          src="/images/dashboard-screen.png"
          showGradient={true}
          outro={
            <div className="flex flex-col items-center justify-center mb-10 sm:mb-20 md:mb-0">
              <BlurFade delay={0.25} inView>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-10 sm:mt-20 text-center px-4">
                  Desenvolvido para a{" "}
                  <Highlight className="font-bold">
                    Lhoist Brasil
                  </Highlight>
                </h2>
              </BlurFade>
              <BlurFade delay={0.35} inView>
                <p className="text-neutral-400 mt-4 text-center max-w-xl px-4">
                  Unidade de Matozinhos — Minas Gerais
                </p>
              </BlurFade>
            </div>
          }
        />
      </div>

      <section id="solucao" className="py-20 sm:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
                O Problema
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-4">
                Limpeza manual de fornos:{" "}
                <span className="text-gradient">insegura e ineficiente</span>
              </h2>
              <p className="text-neutral-400 mt-6 max-w-3xl mx-auto text-lg">
                Operadores expostos a temperaturas de até 1.100°C, manipulando equipamentos pesados em posições ergonomicamente prejudiciais. Marretas de 5kg, lanças metálicas e vestimentas especiais que amplificam a carga térmica.
              </p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ThermometerSun,
                title: "1.100°C",
                desc: "Temperatura interna dos canais durante a operação de limpeza",
              },
              {
                icon: Users,
                title: "84 Poken in Doors",
                desc: "Total de pontos de acesso nos Fornos 4 e 5 que exigem limpeza periódica",
              },
              {
                icon: Shield,
                title: "Alto Risco",
                desc: "Sobrecarga física, estresse térmico e movimentos repetitivos prejudiciais",
              },
            ].map((item, i) => (
              <BlurFade key={i} delay={0.2 + i * 0.1} inView>
                <div className="glass rounded-2xl p-8 hover:border-brand-500/20 transition-all group">
                  <item.icon className="w-8 h-8 text-brand-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-neutral-400">{item.desc}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-20 sm:py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
                A Solução
              </span>
              <WordFadeIn
                words="Sistema Robótico Autônomo CleanForge"
                className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-4"
                inView
              />
              <p className="text-neutral-400 mt-6 max-w-3xl mx-auto text-lg">
                Um braço robótico inteligente que realiza a limpeza completa dos canais sem nenhuma exposição humana ao ambiente do forno.
              </p>
            </div>
          </BlurFade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <BlurFade key={i} delay={0.2 + i * 0.15} inView>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-8 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl group-hover:bg-brand-500/10 transition-colors" />
                  <div className="flex items-start gap-4 relative">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-brand-400" />
                    </div>
                    <div>
                      <div className="text-xs text-brand-400 font-semibold mb-1">
                        ETAPA {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-neutral-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="metricas" className="py-20 sm:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
                Impacto
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mt-4">
                Resultados que{" "}
                <span className="text-gradient">transformam</span>
              </h2>
            </div>
          </BlurFade>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <BlurFade key={i} delay={0.2 + i * 0.1} inView>
                <div className="glass rounded-2xl p-6 text-center group hover:border-brand-500/20 transition-all">
                  <m.icon className="w-8 h-8 text-brand-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl sm:text-4xl font-display font-black text-gradient">
                    <NumberTicker value={m.value} suffix={m.suffix} />
                  </div>
                  <p className="text-neutral-400 text-sm mt-2">{m.label}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <BlurFade delay={0.1} inView>
              <span className="text-brand-400 text-sm font-semibold tracking-widest uppercase">
                Presença Global
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold mt-4">
                Lhoist: <span className="text-gradient">130+ anos</span> de excelência
              </h2>
              <p className="text-neutral-400 mt-4 text-lg leading-relaxed">
                Presente no Brasil há 21 anos nos estados de Minas Gerais, Goiás, Espírito Santo e Rio de Janeiro. Uma empresa global dedicada à produção de cal e minerais, comprometida com inovação e sustentabilidade.
              </p>
            </BlurFade>
          </div>
          <div className="flex-1 flex justify-center">
            <Globe className="opacity-80" speed={1.5} />
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 sm:py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold">
                Perguntas Frequentes
              </h2>
              <p className="text-neutral-400 mt-3">
                Tire suas dúvidas sobre o sistema CleanForge
              </p>
            </div>
          </BlurFade>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, i) => (
              <BlurFade key={i} delay={0.15 + i * 0.05} inView>
                <AccordionItem
                  value={`item-${i}`}
                  className="border-neutral-800 rounded-xl mb-3"
                >
                  <AccordionTrigger className="text-left text-sm sm:text-base hover:no-underline px-4 py-4 rounded-xl hover:bg-surface-100 transition-all">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-neutral-400 px-4">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </BlurFade>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contato" className="py-20 sm:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade delay={0.1} inView>
            <div className="glass rounded-3xl p-12 sm:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-amber-500/10 pointer-events-none" />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold">
                  Pronto para{" "}
                  <span className="text-gradient">transformar</span>
                  <br />
                  sua operação?
                </h2>
                <p className="text-neutral-400 mt-6 text-lg max-w-xl mx-auto">
                  Entre em contato para saber como o CleanForge pode eliminar riscos e aumentar a produtividade na sua planta industrial.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:contato@cleanforge.com.br"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-500 to-amber-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 text-lg"
                  >
                    Solicitar Demonstração
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <footer className="border-t border-neutral-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-amber-500 flex items-center justify-center">
              <Factory className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-display font-bold text-sm">CleanForge</span>
          </div>
          <p className="text-neutral-500 text-xs text-center">
            Solução desenvolvida para o Hackathon Lhoist 2025 — Automação de limpeza de fornos industriais.
          </p>
        </div>
      </footer>
    </main>
  );
}

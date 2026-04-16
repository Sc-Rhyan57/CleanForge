"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface Props {
  end: number
  suffix?: string
  prefix?: string
  label: string
  sublabel?: string
  duration?: number
}

export default function NumberCounter({ end, suffix = "", prefix = "", label, sublabel, duration = 2 }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6 rounded-xl border border-surface-400/30 bg-surface-100/50 hover:bg-surface-200/50 transition-all group"
    >
      <div className="font-heading text-4xl font-bold text-gradient group-hover:scale-110 transition-transform">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm text-gray-300 mt-2 font-heading">{label}</div>
      {sublabel && <div className="text-[10px] text-gray-500 mt-1">{sublabel}</div>}
    </motion.div>
  )
}

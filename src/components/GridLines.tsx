"use client"

import { motion } from "framer-motion"

export default function GridLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg animate-grid-flow" />

      {[15, 35, 55, 75, 90].map((left, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px"
          style={{ left: `${left}%` }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.06, scaleY: 1 }}
          transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent via-brand-500/20 to-transparent" />
        </motion.div>
      ))}

      {[20, 40, 60, 80].map((top, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${top}%` }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.04, scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5 + i * 0.2, ease: "easeOut" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-brand-500/15 to-transparent" />
        </motion.div>
      ))}

      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent blur-[1px]"
        initial={{ top: "-2px" }}
        animate={{ top: "100%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-brand-400/20 to-transparent blur-[1px]"
        initial={{ left: "-2px" }}
        animate={{ left: "100%" }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 3 }}
      />

      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-surface to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface to-transparent" />
    </div>
  )
}

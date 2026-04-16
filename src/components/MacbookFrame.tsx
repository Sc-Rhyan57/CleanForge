"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

export default function MacbookFrame({ children, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`perspective-[2000px] ${className}`}
    >
      <div className="relative mx-auto max-w-4xl">
        <div className="rounded-t-2xl bg-gradient-to-b from-[#2a2a30] to-[#1a1a1f] p-[2px]">
          <div className="rounded-t-2xl bg-[#1a1a1f] pt-3 pb-0 px-3">
            <div className="flex items-center gap-2 mb-3 px-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-8">
                <div className="bg-[#0f0f13] rounded-md px-4 py-1.5 text-center">
                  <span className="text-[10px] text-gray-500 font-mono">cleanforge.lhoist.com</span>
                </div>
              </div>
            </div>
            <div className="rounded-t-lg overflow-hidden bg-surface">
              {children}
            </div>
          </div>
        </div>
        <div className="relative h-5 bg-gradient-to-b from-[#2a2a30] to-[#3a3a40] rounded-b-lg">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#4a4a50] rounded-b-full" />
        </div>
        <div className="h-1 bg-gradient-to-b from-[#3a3a40] to-[#2a2a30] mx-4 rounded-b-lg" />
      </div>
    </motion.div>
  )
}

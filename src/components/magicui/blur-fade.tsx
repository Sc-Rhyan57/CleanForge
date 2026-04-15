"use client";
import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
  duration?: number;
}

export default function BlurFade({
  children,
  className,
  delay = 0,
  inView = false,
  duration = 0.5,
}: BlurFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const shouldAnimate = inView ? isInView : true;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
      animate={shouldAnimate ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
      transition={{ delay, duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

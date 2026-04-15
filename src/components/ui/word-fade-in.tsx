"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function WordFadeIn({
  words,
  className,
  delay = 0.15,
  inView = false,
}: {
  words: string;
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldAnimate = inView ? isInView : true;
  const wordArray = words.split(" ");

  return (
    <motion.h2 ref={ref} className={cn("flex flex-wrap justify-center gap-x-2", className)}>
      {wordArray.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={shouldAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: i * delay, duration: 0.4 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

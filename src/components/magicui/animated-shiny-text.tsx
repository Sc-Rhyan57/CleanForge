"use client";
import { cn } from "@/lib/utils";

export default function AnimatedShinyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex animate-pulse bg-gradient-to-r from-brand-300 via-white to-brand-300 bg-[length:200%_100%] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}

"use client";
import { useEffect, useRef, CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left";
  delay?: number;
  style?: CSSProperties;
}

export default function ScrollReveal({ children, className = "", direction = "up", delay = 0, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${direction === "left" ? "reveal-left" : "reveal"} ${className}`}
         style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}>
      {children}
    </div>
  );
}

"use client";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type Stat = { value: number; suffix: string; label: string };
function StatNumber({ value, suffix, label }: Stat) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [count, setCount] = useState(value);
  useEffect(() => {
    if (!visible || reduced) return;
    const controls = animate(0, value, { duration: 1.7, ease: "easeOut", onUpdate: (v) => setCount(Math.round(v)) });
    return () => controls.stop();
  }, [visible, value, reduced]);
  return <div ref={ref} className="py-3 text-center"><p aria-label={`${value.toLocaleString("en-US")}${suffix}`} className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl"><span aria-hidden="true">{count.toLocaleString("en-US")}{suffix}</span></p><p className="mt-2 text-xs text-muted-foreground sm:text-sm">{label}</p></div>;
}
export function StatsBar({ items }: { items: Stat[] }) { return <section aria-label="University in numbers" className="border-b bg-brand-tint"><div className="home-container grid grid-cols-2 gap-y-5 py-8 sm:grid-cols-4 sm:divide-x sm:divide-primary/15">{items.map(item => <StatNumber key={item.label} {...item}/>)}</div></section>; }

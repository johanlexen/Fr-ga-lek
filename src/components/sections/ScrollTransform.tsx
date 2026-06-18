"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const STAGES = [
  { src: "/visuals/orb.png", label: "A single seed", sub: "One ambient core" },
  { src: "/visuals/crystal.png", label: "becomes structure", sub: "Data crystallises" },
  { src: "/visuals/device.png", label: "becomes a device", sub: "Form follows thought" },
  { src: "/visuals/panels.png", label: "becomes a system", sub: "A world of surfaces" },
];

export function ScrollTransform() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const trackProgress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section ref={ref} className="relative h-[480vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {STAGES.map((s, i) => (
            <Stage key={s.src} index={i} total={STAGES.length} progress={trackProgress} {...s} />
          ))}
        </div>

        {/* progress rail */}
        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-3">
          {STAGES.map((_, i) => (
            <Pip key={i} index={i} total={STAGES.length} progress={trackProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stage({
  index,
  total,
  progress,
  src,
  label,
  sub,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  src: string;
  label: string;
  sub: string;
}) {
  const seg = 1 / total;
  const center = index * seg + seg / 2;
  const win = seg * 0.9;

  const opacity = useTransform(
    progress,
    [center - win, center - win / 2, center + win / 2, center + win],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    progress,
    [center - win, center, center + win],
    [0.6, 1, 1.5]
  );
  const rotate = useTransform(progress, [center - win, center + win], [-18, 18]);
  const blur = useTransform(
    progress,
    [center - win, center - win / 2, center + win / 2, center + win],
    [16, 0, 0, 16]
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.div
      style={{ opacity, scale, rotate, filter }}
      className="absolute flex flex-col items-center"
    >
      <div className="relative aspect-square w-[260px] overflow-hidden rounded-[2rem] border border-white/10 shadow-glow sm:w-[380px]">
        <Image src={src} alt={label} fill sizes="380px" className="object-cover" />
        <div className="absolute -inset-8 -z-10 rounded-full bg-aurora-grad opacity-30 blur-[80px]" />
      </div>
      <motion.div style={{ opacity }} className="mt-10 text-center">
        <div className="font-display text-3xl font-bold sm:text-5xl">{label}</div>
        <div className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-aurora-cyan">
          {sub}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Pip({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const seg = 1 / total;
  const active = useTransform(
    progress,
    [index * seg, index * seg + seg / 2, (index + 1) * seg],
    [0.2, 1, 0.2]
  );
  const width = useTransform(active, [0.2, 1], [10, 34]);

  return (
    <motion.span
      style={{ opacity: active, width }}
      className="h-1.5 rounded-full bg-aurora-grad"
    />
  );
}

"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

/* ============================ tile shell ============================ */
function Cell({
  name,
  hint,
  children,
  className,
}: {
  name: string;
  hint: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur transition-colors duration-300 hover:border-white/25",
        className
      )}
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden">
        {children}
      </div>
      <div className="border-t border-white/10 px-4 py-3">
        <div className="font-mono text-[11px] uppercase tracking-wider text-aurora-cyan">
          {name}
        </div>
        <div className="mt-0.5 text-xs text-white/45">{hint}</div>
      </div>
    </div>
  );
}

/* ============================== demos =============================== */

// 1. Reveal
function DemoReveal() {
  const [k, setK] = useState(0);
  return (
    <div className="cursor-pointer" onMouseEnter={() => setK((v) => v + 1)}>
      <motion.div
        key={k}
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="h-14 w-28 rounded-lg bg-aurora-grad"
      />
    </div>
  );
}

// 2. Stagger
function DemoStagger() {
  const container: Variants = {
    rest: {},
    hover: { transition: { staggerChildren: 0.07 } },
  };
  const item: Variants = {
    rest: { y: 0, opacity: 0.4 },
    hover: { y: -10, opacity: 1 },
  };
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={container}
      className="flex cursor-pointer gap-2"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          variants={item}
          className="h-12 w-3 rounded-full bg-aurora-violet"
        />
      ))}
    </motion.div>
  );
}

// 3. Rotate
function DemoRotate() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="h-16 w-16 rounded-xl border-2 border-aurora-cyan/70"
      style={{ borderTopColor: "transparent", borderRightColor: "transparent" }}
    />
  );
}

// 4. Scale pulse
function DemoScale() {
  return (
    <motion.div
      animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      className="h-14 w-14 rounded-full bg-aurora-magenta shadow-glow"
    />
  );
}

// 5. Morph
function DemoMorph() {
  return (
    <motion.div
      animate={{ borderRadius: ["30% 70% 70% 30%", "60% 40% 30% 70%", "30% 70% 70% 30%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="h-16 w-16 bg-aurora-grad"
    />
  );
}

// 6. Parallax (pointer)
function DemoParallax() {
  const x = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 12 });
  const x0 = useTransform(sx, (v) => v * 40);
  const x1 = useTransform(sx, (v) => v * 24);
  const x2 = useTransform(sx, (v) => v * 12);
  const layers = [x0, x1, x2];
  return (
    <div
      className="relative h-full w-full cursor-pointer"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      }}
      onMouseLeave={() => x.set(0)}
    >
      {layers.map((mx, i) => (
        <motion.div
          key={i}
          style={{ x: mx }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
        >
          <div
            className="rounded-full bg-white/5"
            style={{ width: 30 + i * 34, height: 30 + i * 34 }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// 7. Scroll-linked ring (pinned-style progress)
function DemoScrollRing() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  return (
    <svg ref={ref} viewBox="0 0 100 100" className="h-20 w-20 -rotate-90">
      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
      <motion.circle
        cx="50"
        cy="50"
        r="42"
        fill="none"
        stroke="url(#g)"
        strokeWidth="6"
        strokeLinecap="round"
        pathLength={1}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#E879F9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 8. Magnetic
function DemoMagnetic() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 12 });
  const sy = useSpring(y, { stiffness: 200, damping: 12 });
  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.5);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div style={{ x: sx, y: sy }} className="h-14 w-14 rounded-full bg-white" />
    </div>
  );
}

// 9. Spotlight
function DemoSpotlight() {
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const bg = useTransform(
    [x, y],
    ([lx, ly]) => `radial-gradient(circle at ${lx}% ${ly}%, rgba(167,139,250,0.5), transparent 60%)`
  );
  return (
    <div
      className="relative h-full w-full cursor-pointer"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width) * 100);
        y.set(((e.clientY - r.top) / r.height) * 100);
      }}
    >
      <motion.div className="absolute inset-0" style={{ background: bg }} />
      <div className="absolute inset-0 flex items-center justify-center font-display text-lg text-white/30">
        hover me
      </div>
    </div>
  );
}

// 10. Perspective flip
function DemoFlip() {
  return (
    <div className="perspective-near cursor-pointer">
      <motion.div
        className="relative h-16 w-24 preserve-3d"
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-aurora-cyan/80 backface-hidden font-display text-sm text-ink">
          FRONT
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-aurora-magenta/80 font-display text-sm text-ink backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          BACK
        </div>
      </motion.div>
    </div>
  );
}

// 11. Floating
function DemoFloat() {
  return (
    <div className="relative h-full w-full">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-8 w-8 rounded-full bg-aurora-grad"
          style={{ left: `${20 + i * 28}%`, top: "40%" }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}
    </div>
  );
}

// 12. Particles
function DemoParticles() {
  const dots = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="relative h-full w-full">
      {dots.map((i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{ left: `${(i * 53) % 100}%`, top: `${(i * 31) % 100}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

// 13. Text reveal (chars)
function DemoText() {
  const word = "AURORA";
  const [k, setK] = useState(0);
  return (
    <div
      className="flex cursor-pointer font-display text-2xl font-bold"
      onMouseEnter={() => setK((v) => v + 1)}
    >
      {word.split("").map((c, i) => (
        <motion.span
          key={`${k}-${i}`}
          initial={{ y: 30, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

// 14. Card stacking
function DemoStack() {
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest" className="relative h-20 w-20 cursor-pointer">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={{
            rest: { y: i * -4, rotate: 0, x: 0 },
            hover: { y: i * -10, rotate: (i - 1) * 8, x: (i - 1) * 14 },
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 rounded-xl border border-white/15 bg-ink-200"
          style={{ zIndex: 3 - i }}
        />
      ))}
    </motion.div>
  );
}

// 15. Depth transition
function DemoDepth() {
  return (
    <motion.div
      className="perspective cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          variants={{ rest: { z: 0, opacity: 0.3 }, hover: { z: i * 60, opacity: 1 } }}
          transition={{ duration: 0.6 }}
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-aurora-violet/50"
          style={{ transformStyle: "preserve-3d" }}
        />
      ))}
    </motion.div>
  );
}

// 16. Draw SVG path
function DemoDraw() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  return (
    <svg ref={ref} viewBox="0 0 120 60" className="h-20 w-28">
      <motion.path
        d="M5 50 Q 30 5 55 35 T 115 12"
        fill="none"
        stroke="#5EEAD4"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

// 17. Count up
function DemoCount() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const loop = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * 98));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [inView]);
  return (
    <div ref={ref} className="font-display text-5xl font-bold tabular-nums text-aurora">
      {n}%
    </div>
  );
}

// 18. Gradient shift
function DemoGradient() {
  return (
    <motion.div
      className="h-16 w-28 rounded-xl"
      style={{
        backgroundImage: "linear-gradient(90deg,#22D3EE,#A78BFA,#E879F9,#22D3EE)",
        backgroundSize: "300% 100%",
      }}
      animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  );
}

// 19. Blur in
function DemoBlur() {
  const [k, setK] = useState(0);
  return (
    <div className="cursor-pointer font-display text-xl font-semibold" onMouseEnter={() => setK((v) => v + 1)}>
      <motion.span
        key={k}
        initial={{ filter: "blur(14px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="inline-block"
      >
        in focus
      </motion.span>
    </div>
  );
}

// 20. Spring drag
function DemoDrag() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        drag
        dragConstraints={{ left: -40, right: 40, top: -30, bottom: 30 }}
        dragElastic={0.6}
        whileDrag={{ scale: 1.2 }}
        className="flex h-14 w-14 cursor-grab items-center justify-center rounded-full bg-white text-[10px] font-medium text-ink active:cursor-grabbing"
      >
        drag
      </motion.div>
    </div>
  );
}

// 21. Marquee
function DemoMarquee() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex w-max animate-marquee gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="font-display text-lg font-bold text-white/30">
            SPATIAL · MOTION · DEPTH ·
          </span>
        ))}
      </div>
    </div>
  );
}

// 22. Ripple on click
function DemoRipple() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  return (
    <div
      className="relative h-full w-full cursor-pointer"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const id = Date.now();
        setRipples((p) => [...p, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
        setTimeout(() => setRipples((p) => p.filter((x) => x.id !== id)), 800);
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-xs text-white/30">
        click me
      </div>
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full border border-aurora-cyan"
            style={{ left: r.x, top: r.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.8 }}
            animate={{ width: 160, height: 160, x: -80, y: -80, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// 23. Wave bars
function DemoWave() {
  return (
    <div className="flex items-end gap-1.5">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-2 rounded-full bg-aurora-grad"
          animate={{ height: [8, 40, 8] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

// 24. Glitch / skew
function DemoGlitch() {
  return (
    <motion.div
      className="font-display text-2xl font-bold"
      animate={{ skewX: [0, 12, -8, 0], x: [0, 4, -3, 0] }}
      transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.5 }}
    >
      <span className="text-aurora-cyan">GL</span>
      <span className="text-aurora-magenta">ITCH</span>
    </motion.div>
  );
}

/* ============================= section ============================= */
const DEMOS: { name: string; hint: string; el: ReactNode }[] = [
  { name: "Reveal", hint: "fade + blur rise", el: <DemoReveal /> },
  { name: "Stagger", hint: "sequenced children", el: <DemoStagger /> },
  { name: "Rotate", hint: "infinite spin", el: <DemoRotate /> },
  { name: "Scale", hint: "breathing pulse", el: <DemoScale /> },
  { name: "Morph", hint: "blob shape-shift", el: <DemoMorph /> },
  { name: "Parallax", hint: "pointer depth", el: <DemoParallax /> },
  { name: "Scroll Ring", hint: "in-view path draw", el: <DemoScrollRing /> },
  { name: "Magnetic", hint: "cursor attraction", el: <DemoMagnetic /> },
  { name: "Spotlight", hint: "mouse-follow light", el: <DemoSpotlight /> },
  { name: "Perspective", hint: "3D card flip", el: <DemoFlip /> },
  { name: "Floating", hint: "layered levitation", el: <DemoFloat /> },
  { name: "Particles", hint: "twinkle field", el: <DemoParticles /> },
  { name: "Text Reveal", hint: "char cascade", el: <DemoText /> },
  { name: "Card Stack", hint: "fan on hover", el: <DemoStack /> },
  { name: "Depth", hint: "z-translation", el: <DemoDepth /> },
  { name: "Path Draw", hint: "SVG stroke", el: <DemoDraw /> },
  { name: "Count Up", hint: "eased counter", el: <DemoCount /> },
  { name: "Gradient", hint: "animated fill", el: <DemoGradient /> },
  { name: "Blur In", hint: "focus pull", el: <DemoBlur /> },
  { name: "Spring Drag", hint: "elastic physics", el: <DemoDrag /> },
  { name: "Marquee", hint: "infinite ticker", el: <DemoMarquee /> },
  { name: "Ripple", hint: "click feedback", el: <DemoRipple /> },
  { name: "Waveform", hint: "audio bars", el: <DemoWave /> },
  { name: "Glitch", hint: "skew distortion", el: <DemoGlitch /> },
];

export function MotionShowcase() {
  return (
    <section id="motion" className="relative py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-aurora-violet">
            The motion system — {DEMOS.length} primitives
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
            Every frame, <span className="text-aurora">on purpose</span>
          </h2>
          <p className="mt-5 text-white/55">
            A living catalogue. Hover, click and drag — each tile is a real,
            interruptible Framer Motion animation, not a video.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {DEMOS.map((d, i) => (
            <Reveal key={d.name} delay={(i % 4) * 0.06} distance={30}>
              <Cell name={d.name} hint={d.hint}>
                {d.el}
              </Cell>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

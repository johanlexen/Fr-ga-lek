"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type Variants,
} from "framer-motion";
import {
  useRef,
  type ReactNode,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shared easing — cinematic, slightly overshooting curve              */
/* ------------------------------------------------------------------ */
export const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

/**
 * Clamp a scroll-progress input range into [0,1]. Framer Motion accelerates
 * scroll-linked transforms onto a native ScrollTimeline, whose keyframe
 * offsets must stay within [0,1] and be non-decreasing. Ranges that dip below
 * 0 or past 1 throw "offsets must be monotonically non-decreasing".
 */
export const clampUnit = (arr: number[]) =>
  arr.map((v) => Math.max(0, Math.min(1, v)));

type Direction = "up" | "down" | "left" | "right" | "none";

const offsetFor = (d: Direction, distance: number) => {
  switch (d) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/* ------------------------------------------------------------------ */
/* 1. Reveal — fade + directional slide when scrolled into view        */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  direction = "up",
  distance = 40,
  delay = 0,
  duration = 0.9,
  once = true,
  className,
  blur = true,
}: {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  blur?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-12% 0px -12% 0px" });
  const offset = offsetFor(direction, distance);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset, filter: blur ? "blur(12px)" : "none" }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : undefined
      }
      transition={{ duration, delay, ease: EASE_CINEMATIC }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 2 + 3. Stagger container & items                                    */
/* ------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  gap = 0.09,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px" });

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: 0.05 } },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_CINEMATIC },
  },
};

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. TextReveal — word-by-word cinematic mask reveal                  */
/* ------------------------------------------------------------------ */
export function TextReveal({
  text,
  className,
  delay = 0,
  once = true,
  as: Tag = "div",
}: {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-15% 0px" });
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      ref={ref as never}
      className={cn("flex flex-wrap", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.28em] inline-block overflow-hidden py-[0.05em]"
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : undefined}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.055,
              ease: EASE_CINEMATIC,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Magnetic — element drifts toward the cursor                      */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.4,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Tilt — 3D perspective tilt that tracks the pointer               */
/* ------------------------------------------------------------------ */
export function Tilt({
  children,
  className,
  max = 14,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const glareBg = useTransform(
    [gx, gy],
    ([lx, ly]) =>
      `radial-gradient(circle at ${lx}% ${ly}%, rgba(255,255,255,0.18), transparent 55%)`
  );

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
    gx.set(px * 100);
    gy.set(py * 100);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("perspective relative", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Float — gentle infinite levitation                               */
/* ------------------------------------------------------------------ */
export function Float({
  children,
  className,
  amplitude = 14,
  duration = 6,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 8. Parallax — translate based on scroll progress through viewport   */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  speed = 120,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 9. Spotlight — radial light that follows the cursor over a surface  */
/* ------------------------------------------------------------------ */
export function Spotlight({
  children,
  className,
  color = "rgba(167,139,250,0.18)",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  const background = useTransform(
    [x, y],
    ([lx, ly]) =>
      `radial-gradient(380px circle at ${lx}px ${ly}px, ${color}, transparent 70%)`
  );

  return (
    <div
      onPointerMove={onMove}
      className={cn("group relative overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
}

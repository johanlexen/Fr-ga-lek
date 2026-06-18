"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic, EASE_CINEMATIC } from "@/components/motion/primitives";

const ENTER_DELAY = 2.3; // wait out the preloader

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-driven cinematic exit: the whole scene recedes & blurs as you leave
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const deviceScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const haze = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const sceneBlur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const sceneFilter = useTransform(sceneBlur, (b) => `blur(${b}px)`);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] min-h-[680px] items-center justify-center overflow-hidden"
    >
      {/* layered product render — the protagonist */}
      <motion.div
        style={{ y: deviceY, scale: deviceScale, filter: sceneFilter }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.18, filter: "blur(24px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.2, delay: ENTER_DELAY, ease: EASE_CINEMATIC }}
          className="relative h-full w-full"
        >
          <Image
            src="/visuals/hero-monolith.png"
            alt="The Aurora device — an obsidian glass monolith glowing from within"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90"
          />
          {/* darken edges so type stays legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/70" />
          <div className="absolute inset-0 vignette" />
        </motion.div>
      </motion.div>

      {/* drifting haze that intensifies on scroll */}
      <motion.div
        aria-hidden
        style={{ opacity: haze }}
        className="absolute inset-0 bg-radial-fade"
      />

      {/* floating depth particles */}
      <Particles />

      {/* copy layer */}
      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: ENTER_DELAY + 0.2, ease: EASE_CINEMATIC }}
          className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/70 backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-aurora-cyan" />
          Introducing spatial computing, reimagined
        </motion.div>

        {/* title — two lines, masked rise */}
        <h1 className="font-display text-[clamp(2.6rem,9vw,6.5rem)] font-bold leading-[0.95] tracking-tight">
          <MaskLine delay={ENTER_DELAY + 0.35}>The operating system</MaskLine>
          <MaskLine delay={ENTER_DELAY + 0.5}>
            <span className="text-aurora">for the next dimension</span>
          </MaskLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: ENTER_DELAY + 0.9, ease: EASE_CINEMATIC }}
          className="mx-auto mt-7 max-w-xl text-pretty text-base text-white/60 sm:text-lg"
        >
          AURORA OS dissolves the screen. Your apps, data and ideas become
          objects in space — fluid, weightless, and impossibly fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: ENTER_DELAY + 1.1, ease: EASE_CINEMATIC }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Magnetic strength={0.4}>
            <Button size="lg" variant="aurora">
              Watch the reveal
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Magnetic>
          <Button size="lg" variant="ghost">
            Explore the system
          </Button>
        </motion.div>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: ENTER_DELAY + 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-white/70"
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function MaskLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden py-[0.04em]">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: EASE_CINEMATIC }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Cheap, deterministic floating particle field for parallax depth. */
function Particles() {
  const dots = Array.from({ length: 26 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    return {
      left: `${(r * 100).toFixed(2)}%`,
      top: `${(((seed * 7) % 233280) / 233280) * 100}%`,
      size: 1 + (i % 3),
      dur: 6 + (i % 7),
      delay: (i % 5) * 0.6,
    };
  });

  return (
    <div aria-hidden className="absolute inset-0 z-[5]">
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
          animate={{ y: [0, -22, 0], opacity: [0.1, 0.7, 0.1] }}
          transition={{
            duration: d.dur,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

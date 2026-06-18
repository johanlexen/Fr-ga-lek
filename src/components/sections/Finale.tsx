"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic, TextReveal, EASE_CINEMATIC } from "@/components/motion/primitives";

export function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // The giant wordmark scales up and parts as it crosses the viewport
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.25]);
  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.04em", "0.06em"]);
  const glow = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden py-32"
    >
      {/* expanding light core */}
      <motion.div
        aria-hidden
        style={{ opacity: glow, y: bgY }}
        className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora-grad opacity-40 blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <TextReveal
          as="p"
          text="The screen had a good run."
          className="justify-center font-mono text-sm uppercase tracking-[0.3em] text-aurora-cyan"
        />

        <motion.h2
          style={{ scale, letterSpacing }}
          className="mt-8 font-display text-[clamp(3rem,16vw,12rem)] font-bold leading-[0.85]"
        >
          <span className="block text-aurora">WELCOME</span>
          <span className="block">TO SPACE</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: EASE_CINEMATIC }}
          className="mx-auto mt-10 max-w-lg text-lg text-white/55"
        >
          AURORA OS is a fiction — but every pixel, transition and frame on this
          page is real, hand-built frontend. Imagine what it does for something
          that ships.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, delay: 0.15, ease: EASE_CINEMATIC }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Magnetic strength={0.5}>
            <Button size="lg" variant="aurora">
              Enter the dimension
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Magnetic>
          <Button size="lg" variant="outline">
            Replay from the top
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-sm text-white/40 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-aurora-grad blur-[5px] opacity-70" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          <span className="font-display font-semibold text-white/70">AURORA OS</span>
        </div>
        <p className="text-center">
          A frontend showcase · Next.js · TypeScript · Tailwind · Framer Motion ·
          shadcn/ui · Higgsfield
        </p>
        <p className="font-mono text-xs">Motion as the protagonist.</p>
      </div>
    </footer>
  );
}

"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { Magnetic } from "@/components/motion/primitives";
import { Button } from "@/components/ui/button";

const LINKS = ["Story", "Spatial", "Ecosystem", "Motion"];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-1/2 top-4 z-50 w-[min(1100px,calc(100%-2rem))] -translate-x-1/2"
    >
      <nav
        className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
          scrolled ? "glass shadow-glow" : "border border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-aurora-grad blur-[6px] opacity-70" />
            <span className="relative h-3 w-3 rounded-full bg-white" />
          </span>
          <span className="font-display text-sm font-semibold tracking-wide">
            AURORA<span className="text-white/40">OS</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="rounded-full px-3.5 py-1.5 text-sm text-white/60 transition-colors duration-200 hover:bg-white/5 hover:text-white"
            >
              {l}
            </a>
          ))}
        </div>

        <Magnetic strength={0.5}>
          <Button size="sm" variant="aurora">
            Request access
          </Button>
        </Magnetic>
      </nav>
    </motion.header>
  );
}

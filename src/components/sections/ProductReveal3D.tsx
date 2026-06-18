"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Tilt, Float, Reveal, Parallax } from "@/components/motion/primitives";

const SPECS = [
  { label: "Field of view", value: "118°" },
  { label: "Latency", value: "4ms" },
  { label: "Pixels / eye", value: "11.6M" },
  { label: "Spatial anchors", value: "∞" },
];

export function ProductReveal3D() {
  return (
    <section id="spatial" className="relative py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-20 max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-aurora-violet">
            The device
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-6xl">
            Engineered to <span className="text-aurora">disappear</span>
          </h2>
          <p className="mt-5 text-white/55">
            A single slab of obsidian glass. Hover to feel the weight — it tracks
            your pointer in real perspective.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* floating, tiltable device with layered depth */}
          <div className="relative flex items-center justify-center">
            {/* parallax light disc behind */}
            <Parallax speed={70} className="absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full bg-aurora-grad opacity-30 blur-[90px]" />
            </Parallax>

            <Float amplitude={18} duration={7}>
              <Tilt max={16} className="w-[300px] sm:w-[360px]">
                <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 shadow-glow">
                  <Image
                    src="/visuals/crystal.png"
                    alt="Aurora data core — a glowing crystalline lattice"
                    fill
                    sizes="360px"
                    className="object-cover"
                  />
                  {/* moving sheen */}
                  <motion.div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
                    }}
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                  />
                </div>
              </Tilt>
            </Float>

            {/* layered drop shadow */}
            <div className="absolute -bottom-6 h-10 w-2/3 rounded-[50%] bg-black/60 blur-2xl" />
          </div>

          {/* spec grid */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            {SPECS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.1}
                className="bg-ink/40 p-8 backdrop-blur"
              >
                <div className="font-display text-4xl font-bold text-aurora sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-white/50">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

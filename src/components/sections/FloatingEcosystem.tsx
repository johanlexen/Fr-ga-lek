"use client";

import Image from "next/image";
import { Float, Parallax, Reveal, TextReveal } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

type Node = {
  src: string;
  alt: string;
  className: string;
  size: number;
  speed: number;
  amp: number;
  dur: number;
  blur?: boolean;
};

const NODES: Node[] = [
  { src: "/visuals/orb.png", alt: "Ambient core", className: "left-[4%] top-[14%]", size: 120, speed: 160, amp: 18, dur: 7 },
  { src: "/visuals/crystal.png", alt: "Data core", className: "right-[6%] top-[8%]", size: 150, speed: 240, amp: 22, dur: 9 },
  { src: "/visuals/device.png", alt: "Spatial device", className: "left-[10%] bottom-[12%]", size: 130, speed: 90, amp: 14, dur: 6, blur: true },
  { src: "/visuals/orb.png", alt: "Satellite module", className: "right-[14%] bottom-[16%]", size: 90, speed: 320, amp: 26, dur: 8 },
  { src: "/visuals/panels.png", alt: "Interface layer", className: "left-[40%] top-[6%]", size: 170, speed: 200, amp: 16, dur: 10, blur: true },
];

export function FloatingEcosystem() {
  return (
    <section id="ecosystem" className="relative min-h-[120svh] overflow-hidden py-32">
      {/* floating object field */}
      <div aria-hidden className="absolute inset-0">
        {NODES.map((n, i) => (
          <Parallax key={i} speed={n.speed} className={cn("absolute", n.className)}>
            <Float amplitude={n.amp} duration={n.dur} delay={i * 0.4}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-white/10 shadow-glow",
                  n.blur && "opacity-70 blur-[2px]"
                )}
                style={{ width: n.size, height: n.size }}
              >
                <Image src={n.src} alt={n.alt} fill sizes="170px" className="object-cover" />
              </div>
            </Float>
          </Parallax>
        ))}
      </div>

      {/* center message */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-aurora-cyan">
            The ecosystem
          </span>
        </Reveal>
        <TextReveal
          as="h2"
          text="Not a screen. A weather system for your work."
          className="mt-5 justify-center font-display text-4xl font-bold leading-[1.05] sm:text-6xl"
        />
        <Reveal delay={0.3} className="mt-6 max-w-xl text-white/55">
          Cores, surfaces and agents drift around you at their own depth and
          tempo — always present, never in the way. Move, and the whole system
          parallaxes with you.
        </Reveal>
      </div>
    </section>
  );
}

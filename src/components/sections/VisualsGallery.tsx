"use client";

import Image from "next/image";
import { Reveal, Tilt, Parallax, Spotlight } from "@/components/motion/primitives";
import { cn } from "@/lib/utils";

const SHOTS = [
  { src: "/visuals/scene.png", title: "The Chamber", tag: "Cinematic scene", span: "sm:col-span-2 sm:row-span-2", ratio: "aspect-[16/10]" },
  { src: "/visuals/crystal.png", title: "Data Core", tag: "Abstract object", span: "", ratio: "aspect-square" },
  { src: "/visuals/orb.png", title: "Ambient Module", tag: "Product render", span: "", ratio: "aspect-square" },
  { src: "/visuals/panels.png", title: "Spatial Layers", tag: "Interface study", span: "sm:col-span-2", ratio: "aspect-[16/7]" },
  { src: "/visuals/device.png", title: "The Device", tag: "Hero mockup", span: "", ratio: "aspect-[4/5]" },
];

export function VisualsGallery() {
  return (
    <section id="visuals" className="relative py-32 sm:py-44">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto mb-16 max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-aurora-cyan">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-aurora-cyan" />
            Generated with Higgsfield
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold sm:text-6xl">
            Visuals from <span className="text-aurora">another studio</span>
          </h2>
          <p className="mt-5 text-white/55">
            No stock photography. Every render here was generated for this page —
            Apple keynote meets science-fiction film.
          </p>
        </Reveal>

        <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:grid-cols-3">
          {SHOTS.map((s, i) => (
            <Reveal
              key={s.src}
              delay={(i % 3) * 0.08}
              className={cn(s.span)}
            >
              <Parallax speed={i % 2 === 0 ? 36 : -28} className="h-full">
                <Tilt max={9} glare className="h-full">
                  <Spotlight className="h-full rounded-3xl border border-white/10">
                    <div className={cn("relative w-full overflow-hidden rounded-3xl", s.ratio)}>
                      <Image
                        src={s.src}
                        alt={`${s.title} — ${s.tag}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 p-5">
                        <div className="font-display text-lg font-semibold">{s.title}</div>
                        <div className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                          {s.tag}
                        </div>
                      </div>
                    </div>
                  </Spotlight>
                </Tilt>
              </Parallax>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

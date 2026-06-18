"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { clampUnit } from "@/components/motion/primitives";

const CHAPTERS = [
  {
    kicker: "01 — Presence",
    title: "It doesn't open. It arrives.",
    body: "No windows. No dock. AURORA materialises around you the moment you look, and dissolves the instant you look away.",
  },
  {
    kicker: "02 — Depth",
    title: "Every app has a place in space.",
    body: "Pin a timeline to your left, a canvas ahead, a model overhead. Spatial memory does the filing for you.",
  },
  {
    kicker: "03 — Flow",
    title: "Thought-speed interaction.",
    body: "Gaze to target, pinch to act, speak to compose. The interface keeps up with the idea, not the other way round.",
  },
  {
    kicker: "04 — Continuum",
    title: "One system. Every surface.",
    body: "Start on the desk, continue in the air, finish on the wall. The same session follows you, frame-perfect.",
  },
];

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Device transforms across the whole track
  const rotateY = useTransform(scrollYProgress, [0, 1], [-22, 28]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -8]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    [0.7, 1.05, 0.95, 1.3]
  );
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "-12%", "8%"]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.9, 0.5]);

  return (
    <section ref={ref} id="story" className="relative h-[420vh]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-2">
          {/* text column — chapters crossfade */}
          <div className="relative order-2 h-[40vh] lg:order-1 lg:h-[50vh]">
            {CHAPTERS.map((c, i) => (
              <Chapter
                key={c.kicker}
                index={i}
                total={CHAPTERS.length}
                progress={scrollYProgress}
                {...c}
              />
            ))}
          </div>

          {/* device column — transforms in faux-3D */}
          <div className="perspective order-1 flex items-center justify-center lg:order-2">
            <motion.div
              style={{ rotateY, rotateX, scale, x, transformStyle: "preserve-3d" }}
              className="relative aspect-[4/5] w-[78%] max-w-sm"
            >
              <motion.div
                aria-hidden
                style={{ opacity: glow }}
                className="absolute -inset-10 rounded-[3rem] bg-aurora-grad blur-[80px]"
              />
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-glow">
                <Image
                  src="/visuals/device.png"
                  alt="Aurora spatial device rotating through its capabilities"
                  fill
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-aurora-violet/10 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter({
  index,
  total,
  progress,
  kicker,
  title,
  body,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  kicker: string;
  title: string;
  body: string;
}) {
  // Each chapter owns a slice of the scroll track and fades through it.
  const seg = 1 / total;
  const start = index * seg;
  const opacity = useTransform(
    progress,
    clampUnit([start - 0.04, start + 0.06, start + seg - 0.06, start + seg]),
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    clampUnit([start, start + seg]),
    [40, -40]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <span className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-aurora-cyan">
        {kicker}
      </span>
      <h3 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
        {title}
      </h3>
      <p className="mt-5 max-w-md text-base text-white/55 sm:text-lg">{body}</p>
    </motion.div>
  );
}
